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
    example() {
      const canvas = document.getElementById("webgl");
      const gl = getWebGLContext(canvas);
      const VSHADER_SOURCE =
        "void main(){gl_Position = vec4(0.2,0.5,0.5,1.0);gl_PointSize = 20.0;}";
      const FSHADER_SOURCE =
        "void main(){gl_FragColor = vec4(0.0,1.0,1.0,1.0);}";

      // 初始化着色器
      if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        return;
      }

      gl.clearColor(0.0, 0.0, 0.0, 0.3); // 指定清空颜色
      gl.clear(gl.COLOR_BUFFER_BIT); // 清空

      // 绘制
      gl.drawArrays(gl.POINTS, 0, 1);
    },
  },
};
</script>
<style lang="scss" scoped></style>
