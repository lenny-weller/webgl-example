<template>
  <div class="frame">
    <div class="return"><router-link to="/pages">返回</router-link></div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "frame",
  data() {
    return {};
  },

  components: {},

  watch: {},

  computed: {},

  created() {},

  mounted() {},

  methods: {},
};
</script>
<style lang="scss" scoped>
.frame {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  .return {
    width: 100%;
    height: 40px;
  }
  .content {
    width: 100%;
    flex: 1;
  }
}
</style>
