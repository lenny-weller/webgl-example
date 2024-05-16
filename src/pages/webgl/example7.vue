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
    // 平移
    example() {
      const canvas = document.getElementById("webgl");
      const gl = getWebGLContext(canvas);

      // 着色器（uniform变量translates为xyz平移的量）
      const VSHADER_SOURCE_ATTR =
        "attribute vec4 a_position;uniform vec4 translates;void main(){gl_Position=a_position+translates;}";
      const FSHADER_SOURCE = "void main(){gl_FragColor=vec4(0.0,1.0,1.0,1.0);}";

      // 初始化着色器
      if (!initShaders(gl, VSHADER_SOURCE_ATTR, FSHADER_SOURCE)) {
        return;
      }

      // 顶点
      const vertexs = new Float32Array([-0.5, 0.0, -0.8, -0.3, -0.2, -0.3]);
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

      // 获取uniform变量并赋值
      const translates = gl.getUniformLocation(gl.program, "translates");
      gl.uniform4f(translates, 0.5, 0.5, 0.0, 0.0);

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
