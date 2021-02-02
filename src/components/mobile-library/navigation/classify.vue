<template>
  <div class="cr-classify">
    <!-- 导航栏（uni） -->
    <scroll-view
      class="nav-container bcl-active text-center"
      scroll-y
      scroll-with-animation
      :scroll-top="navScrollTop"
    >
      <ul class="nav-list">
        <li
          class="item box box-center border-bottom hide-text-2"
          :class="{ 'bcl-white active font-bold cl-main': value == index }"
          v-for="(item, index) in navs"
          :key="index"
          @click="changeCurrentIndex(index)"
        >
          {{ item }}
        </li>
      </ul>
    </scroll-view>

    <!-- 内容插槽区 -->
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "cr-classify",

  model: {
    name: "value",
    event: "input",
  },

  props: {
    navs: {
      type: Array,
      default: () => [],
    },

    value: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      navScrollTop: 0,
    };
  },

  methods: {
    /**
     * 改变当前索引值
     */
    changeCurrentIndex(index) {
      // 向上发射事件
      this.$emit("input", index);
      this.$emit("change", index);

      // 菜单栏中的子元素位置滚动到中间
        uni
          .createSelectorQuery()
          .in(this)
          .selectAll(".nav-list .item")
          .boundingClientRect((rect) => {
            let height = 0;

            // 循环获取计算当前点击的标签项距离左侧的距离
            for (let i = 0; i < index; i++) {
              height += rect[i].height;
            }

            // 当大于屏幕一半的宽度则滚动，否则就设置位置为0
            let clientHeight = uni.getSystemInfoSync().windowHeight / 2;

            if (height > clientHeight) {
              this.navScrollTop =
                height + rect[index].height / 2 - clientHeight;
            } else {
              this.navScrollTop = 0;
            }
          })
          .exec();
    },
  },

  install(Vue) {
    Vue.component(this.name, this);
  },
};
</script>

<style lang="scss" scoped>
.cr-classify {
  .nav-container {
    position: fixed;
    top: var(window-top);
    left: 0;
    width: 100px;
    width: 200rpx;
    height: 100%;

    .nav-list {
      li {
        position: relative;
        height: 50px;
        height: 100rpx;
        padding: 5px 10px;
        padding: 10rpx 20rpx;

        &.active {
          &::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            margin: auto;
            width: 4px;
            width: 8rpx;
            height: 50%;
            background-color: $color-main;
          }
        }
      }
    }
  }

  .content {
    width: calc(100% - 100px);
    width: calc(100% - 100rpx);
    margin-left: 100px;
    margin-left: 200rpx;
  }
}
</style>
