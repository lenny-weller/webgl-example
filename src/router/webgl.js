const webgl = [
  {
    path: "/WebGL/example1",
    name: "example1",
    component: (resolve) => require(["../pages/webgl/example1"], resolve),
    meta: {
      name: "绘制点",
    },
  },
  {
    path: "/WebGL/example2",
    name: "example2",
    component: (resolve) => require(["../pages/webgl/example2"], resolve),
    meta: {
      name: "attribute 变量",
    },
  },
  {
    path: "/WebGL/example3",
    name: "example3",
    component: (resolve) => require(["../pages/webgl/example3"], resolve),
    meta: {
      name: "点击绘制",
    },
  },
  {
    path: "/WebGL/example4",
    name: "example4",
    component: (resolve) => require(["../pages/webgl/example4"], resolve),
    meta: {
      name: "uniform 变量",
    },
  },
  {
    path: "/WebGL/example5",
    name: "example5",
    component: (resolve) => require(["../pages/webgl/example5"], resolve),
    meta: {
      name: "绘制多个点",
    },
  },
  {
    path: "/WebGL/example6",
    name: "example6",
    component: (resolve) => require(["../pages/webgl/example6"], resolve),
    meta: {
      name: "绘制不同图形",
    },
  },
  {
    path: "/WebGL/example7",
    name: "example7",
    component: (resolve) => require(["../pages/webgl/example7"], resolve),
    meta: {
      name: "平移",
    },
  },
  {
    path: "/WebGL/example8",
    name: "example8",
    component: (resolve) => require(["../pages/webgl/example8"], resolve),
    meta: {
      name: "旋转",
    },
  },
  {
    path: "/WebGL/example9",
    name: "example9",
    component: (resolve) => require(["../pages/webgl/example9"], resolve),
    meta: {
      name: "旋转平移缩放（4*4矩阵）",
    },
  },
  {
    path: "/WebGL/example10",
    name: "example10",
    component: (resolve) => require(["../pages/webgl/example10"], resolve),
    meta: {
      name: "复合变换",
    },
  },
  {
    path: "/WebGL/example11",
    name: "example11",
    component: (resolve) => require(["../pages/webgl/example11"], resolve),
    meta: {
      name: "动画",
    },
  },
];

export default webgl;
