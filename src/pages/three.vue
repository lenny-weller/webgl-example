<template>
  <Frame>
    <div id="three"></div>
  </Frame>
</template>

<script>
import * as THREE from "three";
// 引入轨道控制器扩展库OrbitControls.js
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// 引入性能监视器stats.js
import Stats from "three/addons/libs/stats.module.js";
// 引入dat.gui.js的一个类GUI
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
// 引入扩展库GLTFLoader.js
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

import Frame from "../components/frame";
export default {
  name: "three",
  data() {
    return {};
  },

  components: { Frame },

  watch: {},

  computed: {},

  created() {},

  mounted() {
    // this.initMulti();
    this.init();
  },

  methods: {
    init() {
      // 实例化一个gui对象
      const gui = new GUI();
      gui.domElement.style.width = "300px";
      const obj = {
        x: 200,
        y: 200,
        z: 200,
        intensity: 2.0,
        color: "#fff",
        pos1: 0,
        pos2: 0,
        bool: false,
      };
      gui.add(obj, "x", 0, 200);
      gui.add(obj, "y", 0, 200);
      gui.add(obj, "z", 0, 200);
      gui.addColor(obj, "color");
      gui.add(obj, "intensity", 0.0, 2.0).name("环境光强度");
      gui.add(obj, "pos1", [0, 100, 200]);
      gui.add(obj, "pos2", { left: -100, center: 0, right: 100 });
      gui.add(obj, "bool");
      // 创建3D场景对象
      const scene = new THREE.Scene();
      // 创建一个长方体几何对象
      const rectGeometry = new THREE.BoxGeometry(200, 200, 200);
      // 创建一个材质对象（基础材质，不受光照影响）
      const material = new THREE.MeshBasicMaterial({
        color: "#43ad7f", // 材质颜色
        transparent: true, // 开启透明
        opacity: 0.8, // 透明度
      });
      // MeshLambertMaterial漫反射，MeshphongMaterial高光，MeshStandardMaterial,MeshPhysicalMaterial物理 受光照影响材质
      const PhongMaterial = new THREE.MeshPhongMaterial({
        color: "#43ad7f", // 材质颜色
        shininess: 10, //高光部分的亮度，默认30
        specular: "#f00",
      });
      const lambertMaterial = new THREE.MeshLambertMaterial({
        color: "#43ad7f", // 材质颜色
        transparent: true, // 开启透明
        opacity: 0.8, // 透明度
      });
      // 创建一个光源对象
      // 环境光AmbientLight，点光源PointLight，聚光灯光源SpotLight，平行光DirectionalLight
      const pointLight = new THREE.PointLight("#fff", 2.0); // 光源颜色，光源强度
      // 设置光照强度

      // 设置光源不随距离衰减，默认2.0
      pointLight.decay = 0.0;
      // 设置光源位置
      pointLight.position.set(200, 200, 200);
      // 光源添加到场景
      scene.add(pointLight);

      // 网格模型（表示一个虚拟物体），参数：一个几何对象，一个材质对象
      const mesh = new THREE.Mesh(rectGeometry, PhongMaterial);
      // 设置网格模型在三维空间中的坐标
      mesh.position.set(0, 0, 0);
      // add方法把网格模型添加到三维场景
      scene.add(mesh);
      // 定义相机输出的画布尺寸px
      const width = 1000;
      const height = 800;
      // 实例化一个透视投影相机对象
      const camera = new THREE.PerspectiveCamera(60, width / height, 100, 1000); // 视场角度，画布宽高比，近裁截面，远裁截面
      // 设置相机位置
      camera.position.set(400, 400, 400);
      // 设置相机观察的位置
      camera.lookAt(0, 0, 0); // 坐标原点
      camera.lookAt(mesh.position); // 网格模型所在位置
      // 创建一个渲染器对象
      const render = new THREE.WebGLRenderer({
        antialias: true, // 锯齿属性
      });
      // 获取你屏幕对应的设备像素比.devicePixelRatio告诉threejs,以免渲染模糊问题
      render.setPixelRatio(window.devicePixelRatio);
      //设置背景颜色
      render.setClearColor("#000", 1);
      // 设置画布尺寸
      render.setSize(width, height);
      // 渲染
      render.render(scene, camera);
      // 插入html
      document.getElementById("three").appendChild(render.domElement);

      // 渲染函数
      // const stats = new Stats(); // 查看帧率
      // document.body.appendChild(stats.domElement);
      // function renderer() {
      //   stats.update();
      //   render.render(scene, camera); //执行渲染操作
      //   mesh.rotateY(0.01); //每次绕y轴旋转0.01弧度
      //   requestAnimationFrame(renderer); //请求再次执行渲染函数render，渲染下一帧
      // }
      // renderer();

      // 相机控件轨道控制器
      const controls = new OrbitControls(camera, render.domElement);
      controls.addEventListener("change", function () {
        render.render(scene, camera);
        console.log(camera.position);
      });
    },
    initMulti() {
      // 创建3D场景对象
      const scene = new THREE.Scene();
      const rect = new THREE.BoxGeometry(50, 50, 50);
      const metrial = new THREE.MeshLambertMaterial({
        color: "#357437",
        opacity: 0.8,
        transparent: true,
      });
      const phongMetrial = new THREE.MeshPhongMaterial({
        color: "#357437",
        shininess: 10,
      });
      for (let i = 0; i < 5; i++) {
        const mesh = new THREE.Mesh(rect, phongMetrial);
        mesh.position.set(i * 100, 0, 0);
        scene.add(mesh);
      }
      const pointLight = new THREE.PointLight("#fff", 2.0);
      pointLight.decay = 0.0;
      // 设置光源位置
      pointLight.position.set(0, 200, 200);
      // 光源添加到场景
      scene.add(pointLight);
      // 定义相机输出的画布尺寸px
      const width = 1800;
      const height = 800;
      // 实例化一个透视投影相机对象
      const camera = new THREE.PerspectiveCamera(60, width / height, 100, 1000); // 视场角度，画布宽高比，近裁截面，远裁截面
      // 设置相机位置
      camera.position.set(0, 400, 400);
      // 设置相机观察的位置
      camera.lookAt(0, 0, 0); // 坐标原点
      // camera.lookAt(mesh.position); // 网格模型所在位置
      // 创建一个渲染器对象
      const render = new THREE.WebGLRenderer();
      // 设置画布尺寸
      render.setSize(width, height);
      // 渲染
      render.render(scene, camera);
      // 插入html
      document.getElementById("three").appendChild(render.domElement);
    },
  },
};
</script>
<style lang="scss" scoped></style>
