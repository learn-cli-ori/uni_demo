<template>
  <scroll-view
    class="cr-step"
    :class="{ portrait: isPortrait }"
    scroll-x
    scroll-with-animation
    :scroll-into-view="id"
  >
    <ul class="step-list text-center">
      <li
        :id="`id-${index}`"
        class="item vt-top"
        :class="{ active: index <= value }"
        v-for="(item, index) in list"
        :key="index"
      >
        <!-- 时间 -->
        <div
          class="date-container text-center"
          :class="isPortrait ? 'mr-10' : 'mb-10'"
          v-if="item.date"
        >
          <div>{{ item.date }}</div>
          <div class="cl-second fz-12">{{ item.time }}</div>
        </div>

        <!-- 图标 -->
        <div class="icon-container">
          <div class="icon box box-center radius-circle" v-if="icon">
            <div class="full-width full-height bcl-white" v-if="isUni">
              <image
                :src="activeIcon"
                class="block full-width full-height"
                v-if="index <= value"
              />
              <image :src="icon" class="block full-width full-height" v-else />
            </div>
            <div class="full-width full-height" v-else>
              <image
                :src="activeIcon"
                class="block full-width full-height"
                v-if="index <= value"
              />
              <image :src="icon" class="block full-width full-height" v-else />
            </div>
          </div>

          <!-- 默认图标 -->
          <div
            class="icon radius-circle fz-12"
            :class="index <= value ? 'bcl-main cl-white' : 'bcl-disabled'"
            v-else
          >
            {{ index + 1 }}
          </div>
        </div>

        <!-- 内容 -->
        <div class="content-container">
          <!-- 标题 -->
          <div
            class="title fz-15 font-bold mt-5"
            :class="index <= value ? 'cl-main' : 'cl-second'"
            v-html="item.title"
          ></div>

          <!-- 介绍 -->
          <div
            class="intro cl-second mt-5"
            :class="isPortrait ? 'text-left' : 'text-center'"
            v-html="item.intro"
            v-if="item.intro"
          ></div>
        </div>
      </li>
    </ul>
  </scroll-view>
</template>

<script>
export default {
  name: "cr-step",

  model: {
    name: "value",
    event: "input",
  },

  data() {
    return {
      isUni: typeof uni != "undefined",
    };
  },

  props: {
    // 步骤
    value: {
      type: Number,
      default: 0,
    },

    // 步骤
    list: {
      type: Array,
      default: () => [],
    },

    // 自定义图标
    icon: {
      type: String,
      default: "",
    },

    // 自定义图标活跃图标
    activeIcon: {
      type: String,
      default: "",
    },

    // 自动滚动
    autoScroll: {
      type: Boolean,
      default: true,
    },

    // 纵向
    isPortrait: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    id() {
      if (this.autoScroll) return `id-${this.value}`;
      else return `id-0`;
    },
  },

  install(Vue) {
    Vue.component(this.name, this);
  },
};
</script>

<style lang="scss" scoped>
.cr-step {
  .step-list {
    white-space: nowrap;

    .item {
      position: relative;
      display: inline-block;

      .icon-container {
        position: relative;

        .icon {
          position: relative;
          display: inline-block;
          width: 60rpx;
          height: 60rpx;
          line-height: 60rpx;
          z-index: 5;
        }

        &::before,
        &::after {
          content: "";
          position: absolute;
          top: 28rpx;
          right: 50%;
          width: 100%;
          height: 4rpx;
          background-color: $color-disabled;
        }

        &::after {
          right: auto;
          left: 50%;
        }
      }

      .content-container {
        max-width: 300rpx;
        white-space: normal;
      }

      &:not(:last-child) {
        padding: 0 20rpx;
      }

      &.active {
        .icon-container {
          &::before,
          &::after {
            background-color: $color-main;
          }
        }
      }

      &:first-child {
        .icon-container {
          &::before {
            display: none;
          }
        }
      }

      &:last-child {
        .icon-container {
          &::after {
            display: none;
          }
        }
      }
    }
  }

  // 纵向
  &.portrait {
    .step-list {
      white-space: unset;

      .item {
        display: flex;
        padding-right: 0;
        min-height: 140rpx;

        &:not(:last-child) {
          padding: 20rpx 0;
        }

        .icon-container {
          .icon {
            position: relative;
            margin-right: 20rpx;
          }

          &::before,
          &::after {
            left: 28rpx;
            top: 40rpx;
            width: 4rpx;
            height: 100%;
          }

          &:before {
            top: auto;
            bottom: calc(100% - 40rpx);
          }
        }

        .content-container {
          flex: 1;
          text-align: left;

          .title {
            margin-top: 0 !important;
          }
        }
      }
    }
  }
}
</style>
