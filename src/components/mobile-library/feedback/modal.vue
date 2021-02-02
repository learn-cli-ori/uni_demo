<template>
  <div
    class="cr-modal cr-mask box box-center animated fadeIn faster"
    @touchmove.prevent.stop
    v-if="value"
  >
    <div class="modal">
      <div class="bcl-white" :class="{ radius }">
        <!-- 标题插槽 -->
        <div class="title container fz-16 font-bold">
          <slot name="title">标题</slot>
        </div>

        <!-- 内容插槽 -->
        <div class="content container mb-10">
          <slot name="content">内容</slot>
        </div>

        <!-- 按钮组 -->
        <div class="btn-list box text-center border-top">
          <div
            class="cancel-btn box-1 pointer"
            :class="cancelClass"
            @click="cancel"
            v-if="showCancel"
          >
            {{ cancelText }}
          </div>
          <div
            class="confirm-btn box-1 pointer"
            :class="confirmClass"
            @click="confirm"
          >
            {{ confirmText }}
          </div>
        </div>
      </div>

      <!-- 关闭按钮 -->
      <div class="close-btn text-center mt-20" v-if="showClose">
        <span
          class="cr-icon cr-icon-close fz-30 pointer cl-white"
          @click="close"
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "cr-modal",

  model: {
    prop: "value",
    event: "input"
  },

  props: {
    value: {
      type: Boolean,
      default: false
    },

    // 确定按钮文字
    confirmText: {
      type: String,
      default: "确定"
    },

    // 取消按钮文字
    cancelText: {
      type: String,
      default: "取消"
    },

    // 确定按钮类名
    confirmClass: {
      type: String,
      default: ""
    },

    // 取消按钮类名
    cancelClass: {
      type: String,
      default: ""
    },

    // 是否显示关闭按钮
    showClose: {
      type: Boolean,
      default: false
    },

    // 是否显示取消按钮
    showCancel: {
      type: Boolean,
      default: true
    },

    // 是否异步
    isSync: {
      type: Boolean,
      default: false
    },

    // 是否为微圆角
    radius: {
      type: Boolean,
      default: true
    }
  },

  methods: {
    /**
     * 确定
     */
    confirm() {
      this.$emit("confirm");
      this.$emit("complete", "confirm");
      if (!this.isSync) this.$emit("input", false);
    },

    /**
     * 取消
     */
    cancel() {
      this.$emit("cancel");
      this.$emit("complete", "cancel");
      if (!this.isSync) this.$emit("input", false);
    },

    /**
     * 关闭
     */
    close() {
      this.$emit("close");
      this.$emit("complete", "close");
      this.$emit("input", false);
    }
  },

  install(Vue) {
    Vue.component(this.name, this);
  }
};
</script>

<style lang="scss" scoped>
.cr-modal {
  .modal {
    width: 300px;
    width: 600rpx;

    .btn-list {
      & > div {
        padding: 12px 10px;
        padding: 24rpx 20rpx;
      }

      .confirm-btn {
        color: $color-white;
        background-color: $color-main;
      }

      .cancel-btn {
        background-color: $color-white;
        color: $color-main;
      }
    }
  }
}
</style>
