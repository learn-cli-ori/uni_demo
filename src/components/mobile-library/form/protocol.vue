<template>
  <div class="cr-protocol box box-column-center fz-12" @click="check">
    <span
      class="cr-icon mr-5 fz-20 vt-middle"
      :class="
        value ? `cr-icon-${type}-fill cl-main` : `cr-icon-${type}`
      "
    ></span>

    <!-- 内容 -->
    <span class="vt-middle">
      <slot>{{ content }}</slot>
    </span>
  </div>
</template>

<script>
export default {
  name: "cr-protocol",

  model: {
    name: "value",
    event: "input",
  },

  props: {
    // 是否选中
    value: {
      type: Boolean,
      default: false,
    },

    // 类型
    type: {
      type: String,
      default: "radio",
    },

    // 内容
    content: {
      type: String,
      default: "",
    },
  },

  methods: {
    /**
     * 选中
     */
    check() {
      this.$emit("change", !this.value);
      this.$emit("input", !this.value);
    },
  },

  install(Vue) {
    Vue.component(this.name, this);
  },
};
</script>

<style lang="scss" scoped></style>
