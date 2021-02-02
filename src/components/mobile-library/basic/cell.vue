<template>
  <div
    class="cr-cell box box-between border-bottom"
    :class="{ 'pointer-bcl': isLink }"
    @click="onClick"
  >
    <!-- 左边 -->
    <div class="left box box-center">
      <!-- 图标 -->
      <div class="icon box box-center mr-5">
        <slot name="icon">
          <span :class="icon" v-if="icon"></span>
        </slot>
      </div>

      <!-- 标题 -->
      <div class="title font-bold">{{ title }}</div>
    </div>

    <!-- 右边 -->
    <div class="right box box-center">
      <!-- 内容 -->
      <div class="content">
        <slot name="content">
          <span class="cl-second">{{ content }}</span>
        </slot>
      </div>

      <!-- 右箭头 -->
      <div class="cr-icon cr-icon-arrow-right ml-5" v-if="isLink"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "cr-cell",

  props: {
    // 标题
    title: {
      type: String,
      default: "单元格"
    },

    // 内容
    content: {
      type: String,
      default: ""
    },

    // 图标
    icon: {
      type: String,
      default: ""
    },

    // 是否是链接类型
    isLink: {
      type: Boolean,
      default: false
    },

    // 链接
    url: {
      type: String,
      default: ""
    }
  },

  methods: {
    /**
     * 点击回调
     */
    onClick() {
      this.$emit("click");

      if (this.isLink && this.url) {
        uni.navigateTo({
          url: this.url
        });
      }
    }
  },

  install(Vue) {
    Vue.component(this.name, this);
  }
};
</script>

<style lang="scss" scoped>
.cr-cell {
  min-height: 50px;
  min-height: 100rpx;
  padding: 5px 15px;
  padding: 10rpx 30rpx;

  img {
    display: block;
  }
}
</style>
