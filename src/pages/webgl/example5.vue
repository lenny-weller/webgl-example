<template>
  <div>
    <canvas id="webgl" width="1000" height="500"></canvas>
  </div>
</template>

<script>
import { initShaders, initBuffers } from "../../assets/lib/util";
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
    // 绘制多个点
    example() {
      const canvas = document.getElementById("webgl");
      const gl = canvas.getContext("webgl");

      const VSHADER_SOURCE_ATTR =
        "attribute vec4 a_position;void main(){gl_Position=a_position;gl_PointSize=20.0;}";
      const FSHADER_SOURCE = "void main(){gl_FragColor=vec4(0.0,1.0,1.0,1.0);}";

      // 初始化着色器
      if (!initShaders(gl, VSHADER_SOURCE_ATTR, FSHADER_SOURCE)) {
        return;
      }

      /**
       * 设置顶点
       */
      // 创建顶点坐标
      const a = [
        -0.3, 0.5, -0.25, 0.5, -0.2, 0.5, -0.15, 0.5, -0.1, 0.5, -0.05, 0.5,
        0.0, 0.5, 0.05, 0.5, 0.1, 0.5, 0.15, 0.5, 0.2, 0.5, 0.2, 0.5, 0.25, 0.5,
        0.3, 0.5, 0.0, 0.4, 0.0, 0.3, 0.0, 0.2, 0.0, 0.1, 0.0, 0.0, 0.0, -0.1,
        0.0, -0.2, 0.0, -0.3, 0.0, -0.4, 0.0, -0.5, -0.2, 0.0, -0.15, 0.0, -0.1,
        0.0, -0.05, 0.0, 0.05, 0.0, 0.1, 0.0, 0.15, 0.0, 0.2, 0.0, -0.3, -0.5,
        -0.25, -0.5, -0.2, -0.5, -0.15, -0.5, -0.1, -0.5, -0.05, -0.5, 0.05,
        -0.5, 0.1, -0.5, 0.15, -0.5, 0.2, -0.5, 0.2, -0.5, 0.25, -0.5, 0.3,
        -0.5,
      ];
      initBuffers(gl, a, "a_position");
      // const vertexArray = new Float32Array(a);
      // // 创建缓冲区对象
      // const vertexBuffer = gl.createBuffer();
      // // 缓冲区对象绑定到目标
      // gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      // // 向缓冲区对象写入数据
      // gl.bufferData(gl.ARRAY_BUFFER, vertexArray, gl.STATIC_DRAW);
      // // 缓冲区对象分配给变量
      // const a_position = gl.getAttribLocation(gl.program, "a_position");
      // gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 0, 0);
      // // 链接变量与分配变量的缓冲区对象
      // gl.enableVertexAttribArray(a_position);

      gl.clearColor(0.0, 0.0, 0.0, 0.3); // 设置清空背景色
      gl.clear(gl.COLOR_BUFFER_BIT); // 清空

      // 绘制
      gl.drawArrays(gl.POINTS, 0, a.length / 2);
    },
  },
};
</script>
<style lang="scss" scoped></style>
