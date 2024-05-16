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
    // 旋转
    // 旋转后坐标（x*cosB-y*sinB,x*sinB+y*cosB,0）
    example() {
      const canvas = document.getElementById("webgl");
      const gl = getWebGLContext(canvas);

      // 着色器
      const VSHADER_SOURCE =
        "attribute vec4 a_position;uniform float u_sin, u_cos;" +
        "void main(){gl_Position.x=a_position.x*u_cos-a_position.y*u_sin;gl_Position.y=a_position.x*u_sin+a_position.y*u_cos;gl_Position.z=a_position.z;gl_Position.w=1.0;}";
      const FSHADER_SOURCE = "void main(){gl_FragColor=vec4(0.0,1.0,1.0,1.0);}";

      // 初始化着色器
      if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        return;
      }

      // 顶点
      const vertexs = new Float32Array([0.0, 0.5, 0.2, 0.0, -0.2, 0.0]);
      // 创建缓冲区
      const vertexBuffer = gl.createBuffer();
      // 绑定目标
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      // 写入数据
      gl.bufferData(gl.ARRAY_BUFFER, vertexs, gl.STATIC_DRAW);
      // 分配变量
      const a_position = gl.getAttribLocation(gl.program, "a_position");
      gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 0, 0);
      // 链接变量和缓冲区
      gl.enableVertexAttribArray(a_position);

      // 获取变量，赋值
      const angle = -90.0;
      const u_cos = gl.getUniformLocation(gl.program, "u_cos");
      const u_sin = gl.getUniformLocation(gl.program, "u_sin");
      gl.uniform1f(u_cos, Math.cos((Math.PI * angle) / 180.0));
      gl.uniform1f(u_sin, Math.sin((Math.PI * angle) / 180.0));

      // 清空
      gl.clearColor(0.0, 0.0, 0.0, 0.3);
      gl.clear(gl.COLOR_BUFFER_BIT);
      // 绘制
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
  },
};
</script>
<style lang="scss" scoped></style>
