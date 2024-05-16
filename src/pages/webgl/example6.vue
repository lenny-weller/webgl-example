<template>
  <div>
    <canvas id="webgl" width="1000" height="500"></canvas>
  </div>
</template>

<script>
import { initShaders, getWebGLContext } from "../../assets/lib/util";
export default {
  name: "",
  data() {
    return {};
  },

  components: {},

  mounted() {
    this.example();
  },

  methods: {
    // drawArray的mode 参数，绘制不同图形
    example() {
      const canvas = document.getElementById("webgl");
      const gl = getWebGLContext(canvas);

      // 着色器
      const VSHADER_SOURCE_ATTR =
        "attribute vec4 a_position;void main(){gl_Position=a_position;}";
      const FSHADER_SOURCE = "void main(){gl_FragColor=vec4(0.0,1.0,1.0,1.0);}";

      // 初始化着色器
      if (!initShaders(gl, VSHADER_SOURCE_ATTR, FSHADER_SOURCE)) {
        return;
      }

      // 顶点数据
      const vertex = new Float32Array([0.0, 0.2, 0.2, -0.2, -0.2, -0.2]);
      // 创建缓冲区
      const vertexBuffer = gl.createBuffer();
      // 缓冲区绑定目标
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      // 写入数据
      gl.bufferData(gl.ARRAY_BUFFER, vertex, gl.STATIC_DRAW);
      // 分配变量
      const a_position = gl.getAttribLocation(gl.program, "a_position");
      gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 0, 0);
      // 链接缓冲区和变量
      gl.enableVertexAttribArray(a_position);

      // 清空
      gl.clearColor(0.0, 0.0, 0.0, 0.3);
      gl.clear(gl.COLOR_BUFFER_BIT);

      // 绘制
      gl.drawArrays(gl.TRIANGLE_FAN, 0, 3);
    },
  },
};
</script>
<style lang="scss" scoped></style>
