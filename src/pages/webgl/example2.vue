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
    // attribute 变量
    example() {
      const canvas = document.getElementById("webgl");
      const gl = canvas.getContext("webgl");
      const VSHADER_SOURCE_ATTR =
        "attribute vec4 a_position;attribute float a_pointsize;void main(){gl_Position=a_position;gl_PointSize=a_pointsize;}";
      const FSHADER_SOURCE =
        "void main(){gl_FragColor = vec4(0.0,1.0,1.0,1.0);}";

      // 初始化着色器
      if (!initShaders(gl, VSHADER_SOURCE_ATTR, FSHADER_SOURCE)) {
        return;
      }

      // 获取变量地址
      let a_position = gl.getAttribLocation(gl.program, "a_position");
      let a_pointsize = gl.getAttribLocation(gl.program, "a_pointsize");

      // 变量赋值
      gl.vertexAttrib4f(a_position, 0.5, 0.5, 0.0, 1.0);
      gl.vertexAttrib1f(a_pointsize, 30.0);

      gl.clearColor(0.0, 0.0, 0.0, 0.3); // 指定清空颜色
      gl.clear(gl.COLOR_BUFFER_BIT); // 清空

      // 绘制
      gl.drawArrays(gl.POINTS, 0, 1);
    },
  },
};
</script>
<style lang="scss" scoped></style>
