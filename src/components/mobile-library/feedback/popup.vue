<template>
  <div
    class="cr-popup cr-mask box box-row-center animated fadeIn faster"
    :class="{
      'box-column-start': position == 'top',
      'box-column-end': position == 'bottom',
      'box-column-center':
        position == 'center' || position == 'right' || position == 'left',
    }"
    @click="onClick"
    @touchmove.prevent.stop
    v-if="value"
  >
    <div
      class="content relative box"
      :class="
        position == 'right'
          ? 'box-row-end full-height'
          : position == 'left'
          ? 'full-height'
          : 'box-row-center'
      "
    >
      <div
        class="animated faster relative"
        :class="{
          slideInDown: position == 'top',
          slideInRight: position == 'right',
          slideInUp: position == 'bottom',
          slideInLeft: position == 'left',
        }"
        @click.stop
        @touchmove.stop
      >
        <slot></slot>

        <!-- 关闭按钮 -->
        <div
          class="close-btn text-center mt-20"
          v-if="showClose && position == 'center'"
        >
          <span
            class="cr-icon cr-icon-close fz-30 pointer cl-white"
            @click="close"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "cr-popup",

  model: {
    prop: "value",
    event: "input",
  },

  props: {
    value: {
      type: Boolean,
      default: false,
    },

    // 位置
    position: {
      type: String,
      default: "center",
    },

    // 点击遮罩关闭
    closeOnMask: {
      type: Boolean,
      default: true,
    },

    // 是否显示关闭按钮
    showClose: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    /**
     * 遮罩点击
     */
    onClick() {
      if (this.closeOnMask) this.close();
    },
    /**
     * 关闭
     */
    close() {
      this.$emit("input", false);
      this.$emit("close");
    },
  },

  install(Vue) {
    Vue.component(this.name, this);
  },
};
</script>

<style lang="scss" scoped></style>
