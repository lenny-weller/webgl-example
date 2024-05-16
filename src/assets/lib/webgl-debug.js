/**
 * Given a WebGL context returns a wrapped context that calls
 * gl.getError after every command and calls a function if the
 * result is not gl.NO_ERROR.
 *
 * @param {!WebGLRenderingContext} ctx The webgl context to
 *        wrap.
 * @param {!function(err, funcName, args): void} opt_onErrorFunc
 *        The function to call when gl.getError returns an
 *        error. If not specified the default function calls
 *        console.log with a message.
 */
export const makeDebugContext = function (ctx, opt_onErrorFunc) {
  init(ctx);
  opt_onErrorFunc =
    opt_onErrorFunc ||
    function (err, functionName, args) {
      // apparently we can't do args.join(",");
      var argStr = "";
      for (var ii = 0; ii < args.length; ++ii) {
        argStr +=
          (ii == 0 ? "" : ", ") +
          glFunctionArgToString(functionName, ii, args[ii]);
      }
      log(
        "WebGL error " +
          glEnumToString(err) +
          " in " +
          functionName +
          "(" +
          argStr +
          ")"
      );
    };

  // Holds booleans for each GL error so after we get the error ourselves
  // we can still return it to the client app.
  var glErrorShadow = {};

  // Makes a function that calls a WebGL function and then calls getError.
  function makeErrorWrapper(ctx, functionName) {
    return function () {
      var result = ctx[functionName].apply(ctx, arguments);
      var err = ctx.getError();
      if (err != 0) {
        glErrorShadow[err] = true;
        opt_onErrorFunc(err, functionName, arguments);
      }
      return result;
    };
  }

  // Make a an object that has a copy of every property of the WebGL context
  // but wraps all functions.
  var wrapper = {};
  for (var propertyName in ctx) {
    if (typeof ctx[propertyName] == "function") {
      wrapper[propertyName] = makeErrorWrapper(ctx, propertyName);
    } else {
      wrapper[propertyName] = ctx[propertyName];
    }
  }

  // Override the getError function with one that returns our saved results.
  wrapper.getError = function () {
    for (var err in glErrorShadow) {
      if (glErrorShadow[err]) {
        glErrorShadow[err] = false;
        return err;
      }
    }
    return ctx.NO_ERROR;
  };

  return wrapper;
};

/**
 * Wrapped logging function.
 * @param {string} msg Message to log.
 */
var log = function (msg) {
  if (window.console && window.console.log) {
    window.console.log(msg);
  }
};

/**
 * Which arguements are enums.
 * @type {!Object.<number, string>}
 */
var glValidEnumContexts = {
  // Generic setters and getters

  enable: { 0: true },
  disable: { 0: true },
  getParameter: { 0: true },

  // Rendering

  drawArrays: { 0: true },
  drawElements: { 0: true, 2: true },

  // Shaders

  createShader: { 0: true },
  getShaderParameter: { 1: true },
  getProgramParameter: { 1: true },

  // Vertex attributes

  getVertexAttrib: { 1: true },
  vertexAttribPointer: { 2: true },

  // Textures

  bindTexture: { 0: true },
  activeTexture: { 0: true },
  getTexParameter: { 0: true, 1: true },
  texParameterf: { 0: true, 1: true },
  texParameteri: { 0: true, 1: true, 2: true },
  texImage2D: { 0: true, 2: true, 6: true, 7: true },
  texSubImage2D: { 0: true, 6: true, 7: true },
  copyTexImage2D: { 0: true, 2: true },
  copyTexSubImage2D: { 0: true },
  generateMipmap: { 0: true },

  // Buffer objects

  bindBuffer: { 0: true },
  bufferData: { 0: true, 2: true },
  bufferSubData: { 0: true },
  getBufferParameter: { 0: true, 1: true },

  // Renderbuffers and framebuffers

  pixelStorei: { 0: true, 1: true },
  readPixels: { 4: true, 5: true },
  bindRenderbuffer: { 0: true },
  bindFramebuffer: { 0: true },
  checkFramebufferStatus: { 0: true },
  framebufferRenderbuffer: { 0: true, 1: true, 2: true },
  framebufferTexture2D: { 0: true, 1: true, 2: true },
  getFramebufferAttachmentParameter: { 0: true, 1: true, 2: true },
  getRenderbufferParameter: { 0: true, 1: true },
  renderbufferStorage: { 0: true, 1: true },

  // Frame buffer operations (clear, blend, depth test, stencil)

  clear: { 0: true },
  depthFunc: { 0: true },
  blendFunc: { 0: true, 1: true },
  blendFuncSeparate: { 0: true, 1: true, 2: true, 3: true },
  blendEquation: { 0: true },
  blendEquationSeparate: { 0: true, 1: true },
  stencilFunc: { 0: true },
  stencilFuncSeparate: { 0: true, 1: true },
  stencilMaskSeparate: { 0: true },
  stencilOp: { 0: true, 1: true, 2: true },
  stencilOpSeparate: { 0: true, 1: true, 2: true, 3: true },

  // Culling

  cullFace: { 0: true },
  frontFace: { 0: true },
};

/**
 * Map of numbers to names.
 * @type {Object}
 */
var glEnums = null;

/**
 * Initializes this module. Safe to call more than once.
 * @param {!WebGLRenderingContext} ctx A WebGL context. If
 *    you have more than one context it doesn't matter which one
 *    you pass in, it is only used to pull out constants.
 */
function init(ctx) {
  if (glEnums == null) {
    glEnums = {};
    for (var propertyName in ctx) {
      if (typeof ctx[propertyName] == "number") {
        glEnums[ctx[propertyName]] = propertyName;
      }
    }
  }
}

/**
 * Checks the utils have been initialized.
 */
function checkInit() {
  if (glEnums == null) {
    throw "WebGLDebugUtils.init(ctx) not called";
  }
}

/**
 * Gets an string version of an WebGL enum.
 *
 * Example:
 *   var str = WebGLDebugUtil.glEnumToString(ctx.getError());
 *
 * @param {number} value Value to return an enum for
 * @return {string} The string version of the enum.
 */
function glEnumToString(value) {
  checkInit();
  var name = glEnums[value];
  return name !== undefined
    ? name
    : "*UNKNOWN WebGL ENUM (0x" + value.toString(16) + ")";
}

/**
 * Returns the string version of a WebGL argument.
 * Attempts to convert enum arguments to strings.
 * @param {string} functionName the name of the WebGL function.
 * @param {number} argumentIndx the index of the argument.
 * @param {*} value The value of the argument.
 * @return {string} The value as a string.
 */
function glFunctionArgToString(functionName, argumentIndex, value) {
  var funcInfo = glValidEnumContexts[functionName];
  if (funcInfo !== undefined) {
    if (funcInfo[argumentIndex]) {
      return glEnumToString(value);
    }
  }
  return value.toString();
}
