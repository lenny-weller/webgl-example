<template>
  <div>
    <router-link
      v-for="item in nav"
      :key="item.key"
      :to="item.path"
      style="margin-right: 10px"
      >{{ item.label }}</router-link
    >
  </div>
</template>

<script>
export default {
  name: "pages",
  data() {
    return {
      nav: [
        {
          label: "webgl学习",
          path: "/WebGL",
          key: 1,
        },
        {
          label: "three.js学习",
          path: "/three",
          key: 2,
        },
      ],
    };
  },

  components: {},

  watch: {},

  computed: {},

  created() {},

  mounted() {},

  methods: {},
};
</script>
<style lang="scss" scoped></style>
