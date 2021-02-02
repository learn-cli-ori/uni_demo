<template>
  <div
    class="cr-load-more text-center cl-second pt-15 pb-15 fz-15"
    v-if="status != 1"
  >
    <!-- 正在加载 -->
    <div class="load-tips" v-if="status == 0">
      <span>{{ status0Text }}</span>
    </div>

    <!-- 加载失败 -->
    <div class="load-tips" v-else-if="status == 2">
      <span>{{ status2Text }}</span>
      <span>，</span>
      <span class="font-underline pointer pointer-filter" @click="retry"
        >点我重试</span
      >
    </div>

    <!-- 暂无更多数据 -->
    <div class="load-tips" v-else-if="status == 3">
      <span>{{ status3Text }}</span>
    </div>

    <!-- 首次请求无数据 -->
    <div class="load-tips text-center" v-else-if="status == 4">
      <img
        :src="status4ImgUrl"
        class="mt-10 mb-10"
        :style="{ width: status4ImgWidth }"
        mode="widthFix"
      />
      <div class="text-center">
        <slot name="extra">
          <span>{{ status4Text }}</span>
        </slot>
      </div>
    </div>

    <!-- 查看更多 -->
    <div
      class="load-tips font-underline pointer"
      @click="lookMore"
      v-else-if="status == 5"
    >
      <span>{{ status5Text }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "cr-load-more",

  props: {
    status: {
      type: Number,
      default: 0
    },

    status0Text: {
      type: String,
      default: "正在加载..."
    },

    status2Text: {
      type: String,
      default: "加载失败"
    },

    status3Text: {
      type: String,
      default: "这是我的底线了~"
    },

    status4Text: {
      type: String,
      default: "暂无更多数据"
    },

    status4ImgUrl: {
      type: String,
	  default: require('../static/no_data.png')
    },

    status4ImgWidth: {
      type: String,
      default: "170px"
    },

    status5Text: {
      type: String,
      default: "查看更多"
    }
  },

  methods: {
    /**
     * 向父组件发射请求数据事件
     */
    retry() {
      this.$emit("retry");
    },

    /**
     * 向父组件发射查看更多事件
     */
    lookMore() {
      this.$emit("lookMore");
    },

    install(Vue) {
      Vue.component(this.name, this);
    }
  }
};
</script>

<style lang="scss" scoped></style>
