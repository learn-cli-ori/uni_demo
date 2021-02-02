<template>
  <ul class="cr-checkbox" :class="{ inline: isInline }">
    <li
      class="item pointer"
      v-for="(item, index) in rlist"
      :key="index"
      @click="check(index)"
    >
      <div class="box box-column-center">
        <span
          class="cr-icon mr-5 fz-20 vt-middle"
          :class="
            item.checked
              ? 'cr-icon-checkbox-fill cl-main'
              : 'cr-icon-checkbox'
          "
        ></span>

        <span class="vt-middle">
          <slot>{{ item.content }}</slot>
        </span>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "cr-checkbox",

  model: {
    name: "value",
    event: "input",
  },

  props: {
    // 列表
    list: {
      type: Array,
      default: () => [],
    },

    // 选中的值
    value: {
      type: Array,
      default: () => [],
    },

    // 是否为行内排列
    isInline: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      rlist: [],
    };
  },

  mounted() {
    this.rlist = this.list;

    let checkeds = this.rlist.filter((item) => item.checked);
    this.$emit("input", checkeds);
  },

  methods: {
    /**
     * 选中
     */
    check(index) {
      this.rlist[index].checked = !this.rlist[index].checked;
      let checkeds = this.rlist.filter((item) => item.checked);
      console.log("当前选中的值：", checkeds);

      this.$emit("change", checkeds);
      this.$emit("input", checkeds);
    },
  },

  install(Vue) {
    Vue.component(this.name, this);
  },

  watch: {
    list() {
      console.log(1);
    },
  },
};
</script>

<style lang="scss" scoped>
.cr-checkbox {
  .item {
    &:not(:last-child) {
      margin-bottom: 10px;
      margin-bottom: 20rpx;
    }
  }

  &.inline {
    .item {
      display: inline-block;

      &:not(:last-child) {
        margin-right: 10px;
        margin-right: 20rpx;
        margin-bottom: 0;
      }
    }
  }
}
</style>
