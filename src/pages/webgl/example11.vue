<template>
  <div>
    <canvas id="webgl" width="1000" height="500"></canvas>
  </div>
</template>

<script>
import { initShaders, getWebGLContext } from "../../assets/lib/util";
import { Matrix4 } from "../../assets/lib/cuon-matrix";
export default {
  name: "",
  data() {
    return {
      pre_time: new Date().getTime(),
      angle_step: 45.0,
    };
  },

  components: {},

  mounted() {
    this.example();
  },

  methods: {
    // 动画
    example() {
      const canvas = document.getElementById("webgl");
      const gl = getWebGLContext(canvas);

      // 着色器（mat4表示4*4矩阵）
      const VSHADER_SOURCE_ATTR =
        "attribute vec4 a_position;uniform mat4 u_matrix;void main(){gl_Position=u_matrix*a_position;}";
      const FSHADER_SOURCE = "void main(){gl_FragColor=vec4(0.0,1.0,1.0,1.0);}";

      // 初始化着色器
      if (!initShaders(gl, VSHADER_SOURCE_ATTR, FSHADER_SOURCE)) {
        return;
      }

      // 顶点
      const vertexs = new Float32Array([0.0, 0.2, 0.2, -0.2, -0.2, -0.2]);
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

      // 设置清空颜色
      gl.clearColor(0.0, 0.0, 0.0, 0.3);

      // 获取变量地址
      const u_matrix = gl.getUniformLocation(gl.program, "u_matrix");

      // 矩阵模型
      const matrix = new Matrix4();
      let currentAngle = 0.0;
      let _this = this;
      const tick = function () {
        currentAngle = _this.animate(currentAngle);
        _this.render(gl, u_matrix, matrix, currentAngle);
        requestAnimationFrame(tick);
      };
      tick();
    },
    animate(angle) {
      const now = Date.now();
      const elpased = now - this.pre_time;
      this.pre_time = now;
      let newAngle = angle + (this.angle_step * elpased) / 1000;
      return newAngle;
    },
    render(gl, u_matrix, matrix, currentAngle) {
      matrix.setRotate(currentAngle, 0, 0, 1);
      matrix.translate(0.5, 0, 0);
      gl.uniformMatrix4fv(u_matrix, false, matrix.elements);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
  },
};
</script>
<style lang="scss" scoped></style>
