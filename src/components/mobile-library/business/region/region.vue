<template>
  <div class="cr-region inline-block">
    <picker
      mode="multiSelector"
      :range="region"
      range-key="name"
      :value="indexs"
      :disabled="disabled"
      @columnchange="onColumnchange"
      @change="onChange"
      @cancel="onCancel"
    >
      <!-- 当前值 -->
      <div :class="{ 'cl-second': disabled }">
        <slot>
          <!-- 省 -->
          <span v-if="value[0]">{{ value[0].name }}</span>

          <!-- 市 -->
          <span v-if="value[1]">/{{ value[1].name }}</span>

          <!-- 区 -->
          <span v-if="value[2]">/{{ value[2].name }}</span>
        </slot>
      </div>
    </picker>
  </div>
</template>

<script>
import regionData from "./region.json";

export default {
  name: "cr-region",

  mode: {
    name: "value",
    event: "input"
  },

  props: {
    /**
     * 绑定的值（传递出去的实际省市区数据）
     */
    value: {
      type: Array,
      default: () => []
    },

    // 禁用
    disabled: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      region: [[], [], []], // 当前组件的省市区数据
      indexs: [0, 0, 0] // 当前组件的省市区的索引值
    };
  },

  created() {
    // 设置默认值
    if (this.value.length) this.setDefaultValue();
    else this.changeCurrentValue();
  },

  methods: {
    /**
     * 设置默认值
     */
    setDefaultValue() {
      regionData.some((province, pindex) => {
        // 设置省
        if (this.value[0].id == province.id) {
          this.indexs[0] = pindex;

          // 设置市
          if (this.value[1]) {
            province.children.forEach((city, cindex) => {
              if (this.value[1].id == city.id) {
                this.indexs[1] = cindex;

                // 设置区
                if (this.value[2]) {
                  city.children.forEach((area, aindex) => {
                    if (this.value[2].id == area.id) {
                      this.indexs[2] = aindex;

                      return true;
                    }
                  });
                }

                return true;
              }
            });
          }

          return true;
        }
      });

      this.changeCurrentValue();
    },

    /**
     * 改变当前选中值
     */
    changeCurrentValue() {
      let province = regionData; // 省
      let city = province[this.indexs[0]].children || []; // 市
      let area = (city[this.indexs[1]] && city[this.indexs[1]].children) || []; // 区

      this.region[0] = province;
      this.region[1] = city;
      this.region[2] = area;

      // #ifndef H5
      this.$forceUpdate();
      // #endif

      let currentValue = [
        this.region[0][this.indexs[0]],
        this.region[1][this.indexs[1]],
        this.region[2][this.indexs[2]]
      ];

      currentValue = currentValue.filter(Boolean).map(item => {
        return {
          id: item.id,
          name: item.name
        };
      });

      this.$emit("input", currentValue);

      this.$emit("change", {
        value: currentValue,
        content: currentValue.map(item => item.name).join("/")
      });
    },

    /**
     * 单列改变回调
     */
    onColumnchange(event) {
      let { column, value } = event.detail;

      if (column == 0) {
        let city =
          (this.region[0][value] && this.region[0][value].children) || []; // 市
        let area =
          (city[this.indexs[1]] && city[this.indexs[1]].children) || []; // 区

        this.region[1] = city;
        this.region[2] = area;

        // #ifndef H5
        this.$forceUpdate();
        // #endif
      } else if (column == 1) {
        let area =
          (this.region[1][value] && this.region[1][value].children) || [];

        this.region[2] = area;

        // #ifndef H5
        this.$forceUpdate();
        // #endif
      }
    },

    /**
     * 改变回调
     */
    onChange(event) {
      this.indexs = event.detail.value;
      this.changeCurrentValue();
    },

    /**
     * 取消回调
     */
    onCancel(event) {
      // 取消的时候复原之前选的值，小程序不支持
      // #ifdef H5
      this.changeCurrentValue();
      // #endif
    }
  },

  install(Vue) {
    Vue.component(this.name, this);
  }
};
</script>

<style lang="scss" scoped></style>
