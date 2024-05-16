import { setupWebGL } from "./webgl-utils";
import { makeDebugContext } from "./webgl-debug";

/**
 * Create a program object and make current
 * @param gl GL context
 * @param vshader a vertex shader program (string)
 * @param fshader a fragment shader program (string)
 * @return true, if the program object was created and successfully made current
 */
export const initShaders = function (gl, vshader, fshader) {
  var program = createProgram(gl, vshader, fshader);
  if (!program) {
    console.log("Failed to create program");
    return false;
  }

  // 使用程序对象
  gl.useProgram(program);
  // 将此时的程序对象夫hi给
  gl.program = program;

  return true;
};

/**
 * Create the linked program object
 * @param gl GL context
 * @param vshader a vertex shader program (string)
 * @param fshader a fragment shader program (string)
 * @return created program object, or null if the creation has failed
 */
function createProgram(gl, vshader, fshader) {
  // 创建着色器对象
  var vertexShader = loadShader(gl, gl.VERTEX_SHADER, vshader);
  var fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fshader);
  if (!vertexShader || !fragmentShader) {
    return null;
  }

  // 创建程序对象
  var program = gl.createProgram();
  if (!program) {
    return null;
  }

  // 为程序对象分配着色器对象
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  // 连接程序对象
  gl.linkProgram(program);

  // Check the result of linking
  var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!linked) {
    var error = gl.getProgramInfoLog(program);
    console.log("Failed to link program: " + error);
    gl.deleteProgram(program);
    gl.deleteShader(fragmentShader);
    gl.deleteShader(vertexShader);
    return null;
  }
  return program;
}

/**
 * Create a shader object
 * @param gl GL context
 * @param type the type of the shader object to be created
 * @param source shader program (string)
 * @return created shader object, or null if the creation has failed.
 */
function loadShader(gl, type, source) {
  // 创建着色器对象
  var shader = gl.createShader(type);
  if (shader == null) {
    console.log("unable to create shader");
    return null;
  }

  // Set the shader program
  gl.shaderSource(shader, source);

  // Compile the shader
  gl.compileShader(shader);

  // Check the result of compilation
  var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!compiled) {
    var error = gl.getShaderInfoLog(shader);
    console.log("Failed to compile shader: " + error);
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

// 加载着色器文件
export const loadShaderFile = function (url) {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
      if (xhr.status === 200 && xhr.readyState === 4) {
        resolve(xhr.responseText);
      }
    };
    xhr.send();
  });
};

/**
 * Initialize and get the rendering for WebGL
 * @param canvas <cavnas> element
 * @param opt_debug flag to initialize the context for debugging
 * @return the rendering context for WebGL
 */
export const getWebGLContext = function (canvas, opt_debug) {
  // Get the rendering context for WebGL
  var gl = setupWebGL(canvas);
  if (!gl) return null;

  // if opt_debug is explicitly false, create the context for debugging
  if (arguments.length < 2 || opt_debug) {
    gl = makeDebugContext(gl);
  }

  return gl;
};

export const initBuffers = function (gl, array, attr) {
  // 顶点数据
  const vertexs = new Float32Array(array);
  // 创建缓冲区对象
  const vertexBuffer = gl.createBuffer();
  // 缓冲区对象绑定目标
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  // 写入数据
  gl.bufferData(gl.ARRAY_BUFFER, vertexs, gl.STATIC_DRAW);
  // 缓冲区分配变量
  const a_attr = gl.getAttribLocation(gl.program, attr);
  gl.vertexAttribPointer(a_attr, 2, gl.FLOAT, false, 0, 0);
  // 链接变量和缓冲区
  gl.enableVertexAttribArray(a_attr);
};
