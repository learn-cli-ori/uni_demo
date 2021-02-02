<template>
  <ul class="cr-rate box">
    <li
      class="item mr-5"
      v-for="(item, index) in length"
      :key="index"
      @click="rate(index)"
    >
      <span
        class="cr-icon"
        :class="
          index + 1 <= value
            ? 'cr-icon-collect-fill'
            : 'cr-icon-collect'
        "
        :style="{
          'font-size': size,
          color: index + 1 <= value ? color : '#bbbbc4',
        }"
      ></span>
    </li>
  </ul>
</template>

<script>
export default {
  name: "cr-rate",

  model: {
    name: "value",
    event: "input",
  },

  props: {
    // 评分值
    value: {
      type: Number,
      default: 0,
    },

    // 长度
    length: {
      type: Number,
      default: 5,
    },

    // 禁用
    disabled: {
      type: Boolean,
      default: false,
    },

    // 大小
    size: {
      type: String,
      default: "18px",
    },

    // 颜色
    color: {
      type: String,
      default: "#ff976a",
    },
  },

  methods: {
    /**
     * 评分
     */
    rate(index) {
      if (this.disabled) return false;

      let rate = index + 1;
      if (rate == this.value) rate = 0;

      this.$emit("click", rate);
      this.$emit("input", rate);
    },
  },

  install(Vue) {
    Vue.component(this.name, this);
  },
};
</script>

<style lang="scss" scoped></style>
