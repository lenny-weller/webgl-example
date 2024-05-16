<template>
  <Frame>
    <el-container>
      <el-aside width="200px">
        <ul>
          <li v-for="item in webgl" :key="item.name">
            <router-link :to="item.path">{{ item.meta.name }}</router-link>
          </li>
        </ul>
      </el-aside>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </Frame>
</template>
<script>
import Frame from "../components/frame";
import webgl from "../router/webgl";
export default {
  name: "",
  data() {
    return {
      webgl,
    };
  },

  components: { Frame },

  mounted() {},

  methods: {},
};
</script>
<style lang="scss" scoped></style>
