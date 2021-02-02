<template>
  <div
    class="cr-circle radius-circle relative inline-block"
    :style="{
      width: size,
      height: size,
      'background-color': color
    }"
  >
    <!-- 左部分背景 -->
    <div
      class="rect left"
      :style="{
        'border-radius': `${size} 0 0 ${size}`,
        transform: `rotate(${leftRotate})`,
        'background-color': borderColor
      }"
    ></div>

    <!-- 右部分背景 -->
    <div
      class="rect right"
      :style="{
        'border-radius': `0 ${size} ${size} 0`,
        transform: `rotate(${rightRotate})`,
        'background-color': rightColor
      }"
    ></div>

    <!-- 中间内容（遮挡） -->
    <div class="content radius-circle box box-center">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "cr-circle",

  props: {
    value: {
      type: Number,
      default: 0
    },

    // 自定义颜色
    color: {
      type: String,
      default: "#ff5a5a"
    },

    borderColor: {
      type: String,
      default: "#edeef4"
    },

    // 自定义大小
    size: {
      type: String,
      default: "100px"
    }
  },

  data() {
    return {
      leftRotate: "0deg",
      rightRotate: "0deg",
      rightColor: ""
    };
  },

  watch: {
    value: {
      immediate: true,
      handler: function() {
        setTimeout(() => {
          let value = this.value;

          this.rightColor = this.borderColor;

          if (value <= 50) {
            this.rightRotate = `${value * 3.6}deg`;
          } else {
            this.rightRotate = "0deg";
            this.rightColor = this.color;
            this.leftRotate = `${(value - 50) * 3.6}deg`;
          }
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
.cr-circle {
  .rect {
    display: block;
    position: absolute;
    top: 0;
    width: 50%;
    height: 100%;
    transition: transform 1s ease;
    z-index: 2;
  }

  .left {
    left: 0;
    transform-origin: 100% 50%;
  }

  .right {
    right: 0;
    transform-origin: 0 50%;
  }

  .content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 85%;
    height: 85%;
    margin: auto;
    background-color: $color-white;
    z-index: 3;
  }
}
</style>
