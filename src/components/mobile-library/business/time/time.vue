<template>
  <div class="cr-time inline-block">
    <picker
      mode="time"
      start="00:00"
      end="23:59"
      :disabled="disabled"
      :value="value"
      @change="onChange"
    >
      <!-- 当前值 -->
      <div :class="{ 'cl-second': disabled }">
        <slot>
          <span>{{ value }}</span>
        </slot>
      </div>
    </picker>
  </div>
</template>

<script>
export default {
  name: "cr-time",

  mode: {
    name: "value",
    event: "input"
  },

  props: {
    /**
     * 绑定的值
     */
    value: {
      type: String,
      default: ""
    },

    // 禁用
    disabled: {
      type: Boolean,
      default: false
    }
  },

  created() {
    // 默认选中此刻
    this.$emit("change", this.value ? this.value : this.getTime());
    this.$emit("input", this.value ? this.value : this.getTime());
  },

  methods: {
    /**
     * 获取时间
     */
    getTime() {
      let date = new Date();
      let hour = date.getHours();
      let minute = date.getMinutes();

      hour = hour > 9 ? hour : "0" + hour;
      minute = minute > 9 ? minute : "0" + minute;

      return `${hour}:${minute}`;
    },

    /**
     * 改变回调
     */
    onChange(event) {
      let { value } = event.detail;

      this.$emit("change", value);
      this.$emit("input", value);
    }
  },

  install(Vue) {
    Vue.component(this.name, this);
  }
};
</script>

<style lang="scss" scoped></style>
