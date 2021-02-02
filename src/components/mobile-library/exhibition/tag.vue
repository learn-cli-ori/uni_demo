<template>
  <div
    class="cr-tag hide-text-1"
    :style="{
      background: tint && color ? 'transparent' : color,
      'border-color': tint ? 'transparent' : color,
      color: plain || tint ? color : color ? 'white' : '',
    }"
    :class="{
      'cr-tag--default': type == 'default',
      'cr-tag--main': type == 'main',
      'cr-tag--primary': type == 'primary',
      'cr-tag--success': type == 'success',
      'cr-tag--danger': type == 'danger',
      'cr-tag--warning': type == 'warning',

      'cr-tag--plain': plain,
      'cr-tag--tint': tint,

      'cr-tag--round': round,
      'cr-tag--radius': radius,
    }"
    @click="onClick"
  >
    <!-- 浅色背景 -->
    <div
      class="tint"
      :style="{ background: color, opacity: 0.2 }"
      v-if="tint && color"
    ></div>

    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "cr-tag",

  props: {
    // 标签类型
    type: {
      type: String,
      default: "default",
    },

    // 朴素标签
    plain: {
      type: Boolean,
      default: false,
    },

    // 淡色标签
    tint: {
      type: Boolean,
      default: false,
    },

    // 圆角标签
    round: {
      type: Boolean,
      default: false,
    },

    // 微圆角标签
    radius: {
      type: Boolean,
      default: false,
    },

    // 自定义颜色
    color: {
      type: String,
      default: "",
    },
  },

  methods: {
    onClick(event) {
      this.$emit("click", event);
    },
  },

  install(Vue) {
    Vue.component(this.name, this);
  },
};
</script>

<style lang="scss" scoped>
.cr-tag {
  position: relative;
  display: inline-block;
  border: 1px solid transparent;
  border: 2rpx solid transparent;
  vertical-align: middle;
  padding: 1px 5px;
  padding: 2rpx 20rpx;
  font-size: 12px;
  font-size: 24rpx;

  // 主题
  &.cr-tag--default {
    background-color: $color-white;
    border-color: $color-border;
    color: $color-black;
  }

  &.cr-tag--main {
    background-color: $color-main;
    border-color: $color-main;
    color: $color-white;

    &.cr-tag--plain {
      color: $color-main;
    }

    &.cr-tag--tint {
      background-color: rgba($color: $color-main, $alpha: 0.2);
      border-color: transparent;
      color: $color-main;
    }
  }

  &.cr-tag--primary {
    background-color: $color-primary;
    border-color: $color-primary;
    color: $color-white;

    &.cr-tag--plain {
      color: $color-primary;
    }

    &.cr-tag--tint {
      background-color: rgba($color: $color-primary, $alpha: 0.2);
      border-color: transparent;
      color: $color-primary;
    }
  }

  &.cr-tag--success {
    background-color: $color-success;
    border-color: $color-success;
    color: $color-white;

    &.cr-tag--plain {
      color: $color-success;
    }

    &.cr-tag--tint {
      background-color: rgba($color: $color-success, $alpha: 0.2);
      border-color: transparent;
      color: $color-success;
    }
  }

  &.cr-tag--danger {
    background-color: $color-danger;
    border-color: $color-danger;
    color: $color-white;

    &.cr-tag--plain {
      color: $color-danger;
    }

    &.cr-tag--tint {
      background-color: rgba($color: $color-danger, $alpha: 0.2);
      border-color: transparent;
      color: $color-danger;
    }
  }

  &.cr-tag--warning {
    background-color: $color-warning;
    border-color: $color-warning;
    color: $color-white;

    &.cr-tag--plain {
      color: $color-warning;
    }

    &.cr-tag--tint {
      background-color: rgba($color: $color-warning, $alpha: 0.2);
      border-color: transparent;
      color: $color-warning;
    }
  }

  // 朴素标签
  &.cr-tag--plain {
    background: transparent !important;
  }

  // 圆角
  &.cr-tag--round {
    border-radius: 100px;
    border-radius: 200rpx;
  }

  // 微圆角
  &.cr-tag--radius {
    border-radius: 2px;
    border-radius: 4rpx;
  }

  // 浅色背景
  .tint {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
