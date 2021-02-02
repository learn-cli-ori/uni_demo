<template>
  <button
    class="cr-button inline-block relative pointer"
    :style="{
      background: plain
        ? 'transparent'
        : tint && color
        ? HexToRGB(color, 0.2)
        : color,
      'border-color': tint ? 'transparent' : color,
      color: color && (plain || tint) ? color : color ? 'white' : '',
    }"
    :class="{
      'cr-button--default': type == 'default',
      'cr-button--info': type == 'info',
      'cr-button--main': type == 'main',
      'cr-button--primary': type == 'primary',
      'cr-button--success': type == 'success',
      'cr-button--danger': type == 'danger',
      'cr-button--warning': type == 'warning',
      'cr-button--clear': type == 'clear',

      'cr-button--plain': plain,
      'cr-button--tint': tint,

      'cr-button--mini fz-10': size == 'mini',
      'cr-button--small fz-12': size == 'small',
      'cr-button--normal': size == 'normal',
      'cr-button--large fz-15': size == 'large',

      'cr-button--round': round,
      'cr-button--radius': radius,
      'cr-button--full-width': fullWidth,

      'cr-button--disabled': disabled || loading,
    }"
    :disabled="disabled || loading"
    @click="onClick"
    @longpress="$emit('longpress', $event)"
    @touchend="$emit('touchend', $event)"
    :form-type="fromType"
    :open-type="openType"
    :app-parameter="appParameter"
    :show-message-card="showMessageCard"
    :send-message-title="sendMessageTitle"
    :send-message-img="sendMessageImg"
    :send-message-path="sendMessagePath"
    :session-from="sessionFrom"
    @getphonenumber="getPhoneNumber"
    @getuserinfo="getUserInfo"
    @opensetting="openSetting"
  >
    <div class="box box-center">
      <div class="loading animated mr-5" v-if="loading">
        <span
          class="cr-icon cr-icon-loading"
          :class="{
            'fz-10': size == 'mini',
            'fz-12': size == 'small',
            'fz-15': size == 'large',
          }"
        ></span>
      </div>
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </button>
</template>

<script>
import { HexToRGB } from "@/common/public-library/js/utils";

export default {
  name: "cr-button",

  props: {
    // 按钮类型
    type: {
      type: String,
      default: "default",
    },

    // 朴素按钮
    plain: {
      type: Boolean,
      default: false,
    },

    // 淡色按钮
    tint: {
      type: Boolean,
      default: false,
    },

    // 圆角按钮
    round: {
      type: Boolean,
      default: false,
    },

    // 微圆角按钮
    radius: {
      type: Boolean,
      default: false,
    },

    // 加载中按钮
    loading: {
      type: Boolean,
      default: false,
    },

    // 按钮尺寸
    size: {
      type: String,
      default: "normal",
    },

    // 100%宽度
    fullWidth: {
      type: Boolean,
      default: false,
    },

    // 自定义颜色
    color: {
      type: String,
      default: "",
    },

    // 禁用按钮
    disabled: {
      type: Boolean,
      default: false,
    },

    // 跳转链接
    url: {
      type: String,
      default: "",
    },

    // 跳转方式
    target: {
      type: String,
      default: "_self",
    },

    // 打开模式
    openType: {
      type: String,
      default: "",
    },

    fromType: {
      type: String,
      default: "",
    },

    appParameter: {
      type: String,
      default: "",
    },

    showMessageCard: {
      type: Boolean,
      default: false,
    },

    sendMessageTitle: {
      type: String,
      default: "",
    },

    sendMessageImg: {
      type: String,
      default: "",
    },

    sendMessagePath: {
      type: String,
      default: "",
    },

    sessionFrom: {
      type: String,
      default: "",
    },
  },

  methods: {
    onClick(event) {
      // 跳转链接
      let url = this.url;

      if (url) {
        if (this.target == "_blank") return window.open(url);

       
          if (this.target == "_redirect") {
            uni.redirectTo({
              url,
            });
          } else if (this.target == "_switch") {
            uni.switchTab({
              url,
            });
          } else {
            uni.navigateTo({
              url,
            });
          }
      }

      this.$emit("click", event);
    },

    getPhoneNumber(event) {
      this.$emit("getphonenumber", event);
    },

    getUserInfo(event) {
      this.$emit("getuserinfo", event);
    },

    openSetting(event) {
      this.$emit("opensetting", event);
    },

    HexToRGB,
  },

  install(Vue) {
    Vue.component(this.name, this);
  },
};
</script>

<style lang="scss" scoped>
.cr-button {
  min-width: 50px;
  min-width: 100rpx;
  border-radius: 0;
  border: 1px solid transparent;
  border: 2rpx solid transparent;
  background-color: transparent;
  vertical-align: middle;
  overflow: unset !important;

  &::after {
    display: none;
  }

  // 主题
  &.cr-button--default {
    background-color: $color-white;
    border-color: $color-border;
    color: $color-black;
  }

  &.cr-button--info {
    background-color: #e0e0e0;
    border-color: #e0e0e0;
    color: $color-black;
  }

  &.cr-button--main {
    background-color: $color-main;
    border-color: $color-main;
    color: $color-white;

    &.cr-button--plain {
      color: $color-main;
    }

    &.cr-button--tint {
      background-color: rgba($color: $color-main, $alpha: 0.2);
      border-color: transparent;
      color: $color-main;
    }
  }

  &.cr-button--primary {
    background-color: $color-primary;
    border-color: $color-primary;
    color: $color-white;

    &.cr-button--plain {
      color: $color-primary;
    }

    &.cr-button--tint {
      background-color: rgba($color: $color-primary, $alpha: 0.2);
      border-color: transparent;
      color: $color-primary;
    }
  }

  &.cr-button--success {
    background-color: $color-success;
    border-color: $color-success;
    color: $color-white;

    &.cr-button--plain {
      color: $color-success;
    }

    &.cr-button--tint {
      background-color: rgba($color: $color-success, $alpha: 0.2);
      border-color: transparent;
      color: $color-success;
    }
  }

  &.cr-button--danger {
    background-color: $color-danger;
    border-color: $color-danger;
    color: $color-white;

    &.cr-button--plain {
      color: $color-danger;
    }

    &.cr-button--tint {
      background-color: rgba($color: $color-danger, $alpha: 0.2);
      border-color: transparent;
      color: $color-danger;
    }
  }

  &.cr-button--warning {
    background-color: $color-warning;
    border-color: $color-warning;
    color: $color-white;

    &.cr-button--plain {
      color: $color-warning;
    }

    &.cr-button--tint {
      background-color: rgba($color: $color-warning, $alpha: 0.2);
      border-color: transparent;
      color: $color-warning;
    }
  }

  &.cr-button--clear {
    min-width: 0;
    min-height: 0;
    padding: 0 !important;
    background: transparent;
  }

  // 朴素按钮
  &.cr-button--plain {
    background: transparent;
  }

  // 尺寸
  &.cr-button--mini {
    padding: 2px 10px;
    padding: 4rpx 20rpx;
  }

  &.cr-button--small {
    padding: 5px 15px;
    padding: 10rpx 30rpx;
  }

  &.cr-button--normal {
    padding: 7px 20px;
    padding: 14rpx 40rpx;
  }

  &.cr-button--large {
    display: block;
    margin: 0 auto;
    padding: 10px 30px;
    padding: 20rpx 60rpx;
  }

  // 100%宽度
  &.cr-button--full-width {
    display: block;
    width: 100%;
    height: 100%;
  }

  // 圆角
  &.cr-button--round {
    border-radius: 100px;
    border-radius: 200rpx;
  }

  // 微圆角
  &.cr-button--radius {
    border-radius: 4px;
    border-radius: 8rpx;
  }

  // 禁用
  &.cr-button--disabled {
    pointer-events: none;
    cursor: not-allowed;
    opacity: 0.6;

    &:active {
      filter: brightness(1);
    }
  }
}
</style>
