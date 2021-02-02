<template>
  <div class="cr-date inline-block">
    <picker
      mode="date"
      :start="startDate"
      :end="endDate"
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
  name: "cr-date",

  mode: {
    name: "value",
    event: "input",
  },

  props: {
    /**
     * 绑定的值
     */
    value: {
      type: String,
      default: "",
    },

    // 禁用
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  created() {
    // 默认选中当天
    this.$emit("change", this.value ? this.value : this.getDate());
    this.$emit("input", this.value ? this.value : this.getDate());
  },

  methods: {
    /**
     * 获取日期
     */
    getDate(type) {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();

      if (type === "start") year = year - 60;
      else if (type === "end") year = year + 2;

      month = month > 9 ? month : `0${month}`;
      day = day > 9 ? day : `0${day}`;

      return `${year}-${month}-${day}`;
    },

    /**
     * 改变回调
     */
    onChange(event) {
      let { value } = event.detail;

      this.$emit("change", value);
      this.$emit("input", value);
    },
  },

  computed: {
    startDate() {
      return this.getDate("start");
    },

    endDate() {
      return this.getDate("end");
    },
  },

  install(Vue) {
    Vue.component(this.name, this);
  },
};
</script>

<style lang="scss" scoped></style>
