<template>
  <div>
    <canvas id="webgl" width="1000" height="500"></canvas>
  </div>
</template>

<script>
import { initShaders } from "../../assets/lib/util";
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
    // uniform 变量
    example() {
      const canvas = document.getElementById("webgl");
      const gl = canvas.getContext("webgl");

      const VSHADER_SOURCE_ATTR =
        "attribute vec4 a_position;void main(){gl_Position=a_position;gl_PointSize=20.0;}";
      const FSHADER_SOURCE_UNIFROM =
        "precision mediump float;uniform vec4 u_fragcolor;void main(){gl_FragColor=u_fragcolor;}";

      // 初始化着色器
      if (!initShaders(gl, VSHADER_SOURCE_ATTR, FSHADER_SOURCE_UNIFROM)) {
        return;
      }

      // 获取uniform变量地址
      const u_fragcolor = gl.getUniformLocation(gl.program, "u_fragcolor");

      // 变量赋值
      gl.uniform4f(u_fragcolor, 0.0, 1.0, 1.0, 1.0);

      // 清空
      gl.clearColor(0.0, 0.0, 0.0, 0.3);
      gl.clear(gl.COLOR_BUFFER_BIT);

      // 绘制
      gl.drawArrays(gl.POINTS, 0, 1);
    },
  },
};
</script>
<style lang="scss" scoped></style>
