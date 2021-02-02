<template>
  <div
    class="cr-password-input relative"
    :class="{ 'only-bottom': onlyBottom }"
    @click="inputFocus"
  >
    <!-- 隐藏的输入框 -->
    <input
      class="input"
      type="number"
      :pattern="isUni ? '' : '\d*'"
      :password="isPassword"
      :maxlength="length"
      :focus="focused"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
      :value="value"
    />

    <!-- 输入框列表 -->
    <ul class="input-list box box-between">
      <li
        class="item border"
        :class="{ active: index == value.length && focused }"
        :style="{ width: (10 / length) * 10 + '%', height: itemHeight + 'px' }"
        v-for="(item, index) in length"
        :key="index"
      >
        <input
          class="full-width full-height text-center"
          :password="isPassword"
          disabled
          :value="value[index]"
        />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "cr-password-input",

  model: {
    name: "value",
    event: "input",
  },

  props: {
    // 值
    value: {
      type: String,
      default: "",
    },

    // 密码长度
    length: {
      type: Number,
      default: 6,
    },

    // 是否是密码
    isPassword: {
      type: Boolean,
      default: true,
    },

    // 是否只显示下边框
    onlyBottom: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      itemHeight: "",
      focused: false,
      isUni: typeof uni != "undefined",
    };
  },

  mounted() {
    // 动态设置高度
    this.$nextTick(() => {
      if (this.isUni) {
        uni
          .createSelectorQuery()
          .in(this)
          .selectAll(".input-list .item")
          .boundingClientRect((rect) => {
            this.itemHeight = rect[0].width;
          })
          .exec();
      } else {
        this.itemHeight = document.querySelector(
          ".input-list .item"
        ).offsetWidth;
      }
    });

    this.$emit("input", "");
  },

  methods: {
    /**
     * 输入回调
     */
    onInput(event) {
      let value = "";

      if (this.isUni) {
        value = event.detail.value;
      } else {
        value = document.querySelector(".cr-password-input .input").value;
      }

      this.$emit("input", value);
      console.log("正在输入：", value);

      // 输入完毕
      if (value.length >= this.length) {
        if (this.isUni) this.focused = false;
        else document.querySelector(".cr-password-input .input").blur();
        this.$emit("complete", value);
      }
    },

    /**
     * 让输入框聚焦
     */
    inputFocus() {
      if (this.isUni) this.focused = true;
      else document.querySelector(".cr-password-input .input").focus();
    },

    onFocus() {
      this.focused = true;
      this.$emit("focus");
    },

    onBlur() {
      this.focused = false;
      this.$emit("blur");
    },
  },

  install(Vue) {
    Vue.component(this.name, this);
  },
};
</script>

<style lang="scss" scoped>
.cr-password-input {
  &.only-bottom {
    .border {
      border: none;
      border-bottom: 2px solid $color-border;
      border-bottom: 4rpx solid $color-border;
    }
  }

  input {
    border: none;
    background-color: transparent;
  }

  & > .input {
    width: 0.1px;
    height: 0.1px;
    min-height: 0;
  }

  .input-list {
    .item {
      max-width: 45px;
      max-width: 90rpx;
      max-height: 45px;
      max-height: 90rpx;

      &.active {
        border-color: $color-main;
        transition: all 0.2s ease-in-out;
      }

      &:not(:last-child) {
        margin-right: 10px;
        margin-right: 20rpx;
      }
    }
  }
}
</style>
