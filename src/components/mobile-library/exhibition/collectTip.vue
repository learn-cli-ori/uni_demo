<template>
  <div
    class="cr-collect-tip radius"
    style="overflow: unset;"
    :style="{ color, backgroundColor }"
    v-if="show"
  >
    <slot>
      <div class="add">
        <span>点击"</span>
        <span class="cr-icon cr-icon-more" :style="{ color }"></span>
        <span>"添加到我的小程序</span>
      </div>

      <div class="content">
        微信首页下拉即可快速访问
      </div>
    </slot>

    <!-- 关闭按钮 -->
    <div
      class="cr-icon cr-icon-close pointer"
      :style="{ color }"
      @click="close"
    ></div>

    <!-- 三角形 -->
    <div class="triangle" :style="{ borderBottomColor: backgroundColor }"></div>
  </div>
</template>

<script>
export default {
  name: "cr-collect-tip",

  props: {
    color: {
      type: String,
      default: "black",
    },

    backgroundColor: {
      type: String,
      default: "#f2f6fc",
    },
  },

  data() {
    return {
      show: uni.getStorageSync("cr-collect-tip-visible") != 1,
    };
  },

  methods: {
    /**
     * 关闭
     */
    close() {
      this.show = false;
      uni.setStorageSync("cr-collect-tip-visible", 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.cr-collect-tip {
  position: fixed;
  top: calc(var(--window-top) + 30rpx);
  right: 20rpx;
  padding: 20rpx 60rpx 20rpx 20rpx;
  z-index: 20;
  max-width: 70%;

  // 关闭按钮
  .cr-icon-close {
    position: absolute;
    top: 15rpx;
    right: 15rpx;
  }

  // 三角形
  .triangle {
    $width: 20rpx;
    position: absolute;
    top: -$width;
    right: 95rpx;
    width: 0;
    height: 0;
    border-left: $width solid transparent;
    border-right: $width solid transparent;
    border-bottom: $width solid;
  }
}
</style>
