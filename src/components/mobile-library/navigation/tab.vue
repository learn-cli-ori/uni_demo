<template>
  <div class="cr-tab sticky" :class="{ simple: isSimple }">
    <!-- 导航栏（uni） -->
    <scroll-view
      class="nav-container bcl-white text-center"
      :class="{ 'text-left': isNavLeft, 'border-bottom': showBorder }"
      scroll-x
      scroll-with-animation
      :scroll-left="navScrollLeft"
    >
      <ul class="nav-list bcl-white">
        <li
          class="item text-center"
          v-for="(item, index) in navs"
          :key="index"
          @click="changeCurrentIndex(index)"
        >
          <div
            :class="{ active: value == index, 'is-black': isBlack }"
            v-if="item"
          >
            {{ item }}
          </div>
        </li>
      </ul>
    </scroll-view>

    <!-- 内容区 -->
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "cr-tab",

  model: {
    name: "value",
    event: "input",
  },

  props: {
    // 标签列表
    navs: {
      type: Array,
      default: () => [],
    },

    // 绑定的值
    value: {
      type: Number,
      default: 0,
    },

    // 是否为简约样式
    isSimple: {
      type: Boolean,
      default: false,
    },

    // 是否为标签左对齐
    isNavLeft: {
      type: Boolean,
      default: false,
    },

    // 是否有下边框
    showBorder: {
      type: Boolean,
      default: true,
    },

    // 活跃状态是否是黑色文字
    isBlack: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      navScrollLeft: 0
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
            let width = 0;

            // 循环获取计算当前点击的标签项距离左侧的距离
            for (let i = 0; i < index; i++) {
              width += rect[i].width;
            }

            // 当大于屏幕一半的宽度则滚动，否则就设置位置为0
            let clientWidth = uni.getSystemInfoSync().windowWidth / 2;

            if (width > clientWidth) {
              this.navScrollLeft = width + rect[index].width / 2 - clientWidth;
            } else {
              this.navScrollLeft = 0;
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
.cr-tab {
  &.simple {
    .nav-container {
      .nav-list {
        li {
          & > div {
            &::after {
              display: none !important;
            }
          }
        }
      }
    }
  }

  .nav-container {
    .nav-list {
      white-space: nowrap;

      li {
        display: inline-block;

        & > div {
          display: inline-block;
          position: relative;
          height: 45px;
          height: 90rpx;
          line-height: 2.5;
          padding: 5px 15px;
          padding: 10rpx 30rpx;
          color: $color-second;

          &.active {
            color: $color-main;
            font-weight: bolder;

            &.is-black {
              color: $color-black;
            }

            &::after {
              content: "";
              position: absolute;
              right: 0;
              bottom: 0;
              left: 0;
              margin: auto;
              width: 20px;
              width: 40rpx;
              height: 4px;
              height: 8rpx;
              background-color: $color-main;
              border-radius: 10px;
              border-radius: 20rpx;
            }
          }
        }
      }
    }
  }
}
</style>
