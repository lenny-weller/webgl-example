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
    // 点击绘制
    example() {
      const canvas = document.getElementById("webgl");
      const gl = canvas.getContext("webgl");
      const VSHADER_SOURCE_ATTR =
        "attribute vec4 a_position;void main(){gl_Position=a_position;gl_PointSize=20.0;}";
      const FSHADER_SOURCE_UNIFORM =
        "precision mediump float;uniform vec4 u_fragcolor;void main(){gl_FragColor = u_fragcolor;}";

      // 初始化着色器
      if (!initShaders(gl, VSHADER_SOURCE_ATTR, FSHADER_SOURCE_UNIFORM)) {
        return;
      }

      // 获取变量地址
      let a_position = gl.getAttribLocation(gl.program, "a_position");
      let u_fragcolor = gl.getUniformLocation(gl.program, "u_fragcolor");

      // 点击
      let g_point = [];
      canvas.onclick = function (e) {
        const offsetX = e.offsetX;
        const offsetY = e.offsetY;
        const width = e.target.width / 2;
        const height = e.target.height / 2;

        const x = (offsetX - width) / width;
        const y = (height - offsetY) / height;

        g_point.push(x);
        g_point.push(y);

        gl.clearColor(0.0, 0.0, 0.0, 0.3); // 指定清空颜色
        gl.clear(gl.COLOR_BUFFER_BIT); // 清空
        for (let i = 0; i < g_point.length; i += 2) {
          // 变量赋值
          gl.vertexAttrib2f(a_position, g_point[i], g_point[i + 1]);
          gl.uniform4f(
            u_fragcolor,
            Math.abs(g_point[i]),
            Math.abs(g_point[i + 1]),
            0.0,
            1.0
          );
          // 绘制
          gl.drawArrays(gl.POINTS, 0, 1);
        }
      };

      gl.clearColor(0.0, 0.0, 0.0, 0.3); // 指定清空颜色
      gl.clear(gl.COLOR_BUFFER_BIT); // 清空
    },
  },
};
</script>
<style lang="scss" scoped></style>
