<template>
  <div
    class="cr-switch inline-block border radius-around"
    :class="{ checked: value, disabled }"
    :style="{
      'background-color': value ? color : disabled ? '#e3e3ed' : 'white',
      width,
      height,
    }"
    @click="toggleValue"
  >
    <!-- 按钮 -->
    <div class="switch-btn radius-circle cr-switch-shadow bcl-white"></div>
  </div>
</template>

<script>
export default {
  name: "cr-switch",

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

    // 是否禁用
    disabled: {
      type: Boolean,
      default: false,
    },

    // 自定义颜色
    color: {
      type: String,
      default: "#ff5a5a",
    },

    // 自定义宽度
    width: {
      type: String,
      default: "120rpx",
    },

    // 自定义宽度
    height: {
      type: String,
      default: "60rpx",
    },
  },

  methods: {
    toggleValue() {
      if (this.disabled) return false;

      let value = !this.value;
      this.$emit("input", value);
      this.$emit("change", value);
    },
  },

  install(Vue) {
    Vue.component(this.name, this);
  },
};
</script>

<style lang="scss" scoped>
.cr-switch-shadow{
  box-shadow: 0 0 5rpx 2rpx #ebeef5;
}

.cr-switch {
  position: relative;
  transition: all 0.2s ease-in-out;
  overflow: unset;

  // 按钮
  .switch-btn {
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    transition: inherit;
  }

  // 选中状态
  &.checked {
    .switch-btn {
      transform: translateX(100%);
    }
  }

  &.disabled {
    &.checked {
      opacity: 0.5;
    }
  }
}
</style>
