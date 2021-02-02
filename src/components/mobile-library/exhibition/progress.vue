<template>
  <div
    class="cr-progress"
    :class="{ 'radius-around': round }"
    :style="{ height }"
  >
    <div
      class="progress-bar"
      :style="{ width: progress + '%', 'background-color': color }"
    ></div>
  </div>
</template>

<script>
export default {
  name: "cr-progress",

  props: {
    value: {
      type: Number,
      default: 0
    },

    // 是否为圆角
    round: {
      type: Boolean,
      default: true
    },

    // 自定义颜色
    color: {
      type: String,
      default: ""
    },

    // 自定义高度
    height: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      progress: 0
    };
  },

  watch: {
    value: {
      immediate: true,
      handler: function() {
        setTimeout(() => {
          this.progress = this.value;
        }, 0);
      }
    }
  },

  install(Vue) {
    Vue.component(this.name, this);
  }
};
</script>

<style lang="scss" scoped>
.cr-progress {
  height: 5px;
  height: 10rpx;
  background-color: $color-border;

  .progress-bar {
    height: 100%;
    background-color: $color-main;
    border-radius: inherit;
    transition: width 0.5s ease-in-out;
  }
}
</style>
