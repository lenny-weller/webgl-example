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
    return {};
  },

  components: {},

  mounted() {
    this.example();
  },

  methods: {
    // 旋转平移缩放（4*4矩阵）
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

      // 计算cos,sin
      const angle = 180.0;
      const cos = Math.cos((Math.PI * angle) / 180.0);
      const sin = Math.sin((Math.PI * angle) / 180.0);

      // 使用Matrix矩阵库
      const matrix = new Matrix4();

      // matrix.setRotate(angle, 0, 0, 1); // 角度，x,y,z
      // 4*4旋转矩阵
      // const matrix = new Float32Array([
      //   cos,
      //   sin,
      //   0.0,
      //   0.0,
      //   -sin,
      //   cos,
      //   0.0,
      //   0.0,
      //   0.0,
      //   0.0,
      //   1.0,
      //   0.0,
      //   0.0,
      //   0.0,
      //   0.0,
      //   1.0,
      // ]);

      // 4*4平移矩阵
      var Tx = 0.5,
        Ty = 0.5,
        Tz = 0.5;
      // const matrix = new Float32Array([
      //   1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, Tx, Ty,
      //   Tz, 1.0,
      // ]);
      // 使用Matrix矩阵库
      // matrix.setTranslate(Tx, Ty, 0.5);

      // 4*4缩放矩阵
      var Sx = 1.2,
        Sy = 2.5,
        Sz = 1.0;
      // const matrix = new Float32Array([
      //   Sx,
      //   0.0,
      //   0.0,
      //   0.0,
      //   0.0,
      //   Sy,
      //   0.0,
      //   0.0,
      //   0.0,
      //   0.0,
      //   Sz,
      //   0.0,
      //   0.0,
      //   0.0,
      //   0.0,
      //   1.0,
      // ]);
      // 使用Matrix矩阵库
      matrix.setScale(Sx, Sy, Sz);

      // 获取uniform变量并赋值
      const u_matrix = gl.getUniformLocation(gl.program, "u_matrix");
      // gl.uniformMatrix4fv(u_matrix, false, matrix);

      // 使用Matrix矩阵库
      gl.uniformMatrix4fv(u_matrix, false, matrix.elements);
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
