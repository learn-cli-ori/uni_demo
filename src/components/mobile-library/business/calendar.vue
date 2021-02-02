<template>
  <div class="cr-calendar">
    <!-- 切换当前月 -->
    <div class="box">
      <div class="container pointer" @click="change('prev')">
        <span class="cr-icon cr-icon-arrow-left"></span>
      </div>
      <div class="container box-1 text-center fz-15 font-bold pl-10 pr-10">
        {{ `${currentYear}年${currentMonth}月` }}
      </div>
      <div class="container pointer" @click="change('next')">
        <span class="cr-icon cr-icon-arrow-right"></span>
      </div>
    </div>

    <!-- 遍历星期 -->
    <ul class="list cl-second">
      <li>日</li>
      <li>一</li>
      <li>二</li>
      <li>三</li>
      <li>四</li>
      <li>五</li>
      <li>六</li>
    </ul>

    <!-- 遍历天数 -->
    <ul class="list">
      <li
        v-for="(item, index) in currentDays"
        :key="index"
        @click="onClick(item)"
      >
        <!-- 当前月 -->
        <span class="dot" :style="[item.style]" v-if="item.current">
          {{ (item.style && item.style.content) || item.number }}
        </span>

        <!-- 非当前月 -->
        <span class="dot cl-second" v-else>
          {{ item.number }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "cr-calendar",

  props: {
    // 显示天数数量（不够就补全）
    length: {
      type: Number,
      default: 42,
    },

    // 当前活跃的数组
    actives: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      currentYear: 0,
      currentMonth: 0,
      currentDays: [],
      weeks: [
        "星期天",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
      ],
    };
  },

  created() {
    this.init();
  },

  methods: {
    /**
     * 初始化
     */
    init(emit = true) {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;

      // 补全两位数
      month = Number(month) <= 9 ? `0${Number(month)}` : month;

      // 初始化事件
      emit &&
        this.$emit("init", {
          date: `${year}-${month}`,
        });

      this.getCurrentDays(year, month); // 默认获取当前年、当前月的天数
    },

    /**
     * 获取指定年月的天数（自动补全上个月和下个月）
     */
    getCurrentDays(year, month) {
      let week = new Date(year, month - 1).getDay(); // 获取月初是星期几
      let days = new Date(year, month, 0).getDate(); // 获取这个月总天数

      this.currentYear = year;
      this.currentMonth = month;
      this.currentDays = this.numberToArray(days);

      // console.log(`当前月一共有：${days}天`);
      // console.log(`当前月月初为：${this.weeks[week]}`);

      // 补全上个月
      if (week != 0) {
        let days = new Date(year, month - 1, 0).getDate(); // 获取上个月总天数
        let list = this.numberToArray(days, false).slice(-week);
        // console.log(`上个月需要补全的天数：${list.map(item => item.number)}`);
        this.currentDays = list.concat(this.currentDays);
      }

      // 补全下个月
      if (this.currentDays.length < this.length) {
        let list = this.numberToArray(
          this.length - this.currentDays.length,
          false
        );
        // console.log(`下个月需要补全的天数：${list.map(item => item.number)}`);
        this.currentDays = this.currentDays.concat(list);
      }

      // 补全两位数
      this.currentMonth =
        Number(this.currentMonth) <= 9
          ? `0${Number(this.currentMonth)}`
          : this.currentMonth;

      this.currentDays = this.currentDays.map((item) => {
        if (item.number <= 9) {
          return {
            number: `0${item.number}`,
            current: item.current,
          };
        } else {
          return item;
        }
      });

      // 添加自定义样式
      this.addStyle();
    },

    /**
     * 添加自定义样式
     */
    addStyle() {
      this.currentDays.forEach((item, index) => {
        this.actives.forEach((sitem, sindex) => {
          if (
            `${this.currentYear}-${this.currentMonth}-${item.number}` ==
            sitem.date
          ) {
            item.style = sitem.style;
          }
        });
      });
    },

    /**
     * 数字转数组
     */
    numberToArray(number, current = true) {
      let array = [];
      for (let i = 1; i <= number; i++)
        array.push({
          number: i,
          current,
          style: {},
        });
      return array;
    },

    /**
     * 点击回调
     */
    onClick(item) {
      console.log(item);
      this.$emit("click", {
        ...item,
        date: `${this.currentYear}-${this.currentMonth}-${item.number}`,
      });
    },

    /**
     * 改变回调
     */
    change(type) {
      if (type == "next") {
        if (this.currentMonth == 12) {
          this.currentMonth = 1;
          this.currentYear += 1;
        } else {
          this.currentMonth = Number(this.currentMonth);
          this.currentMonth += 1;
        }
      } else {
        if (this.currentMonth == 1) {
          this.currentMonth = 12;
          this.currentYear -= 1;
        } else {
          this.currentMonth -= 1;
        }
      }

      // 补全两位数
      this.currentMonth =
        Number(this.currentMonth) <= 9
          ? `0${Number(this.currentMonth)}`
          : this.currentMonth;

      // 切换事件
      this.$emit("type", {
        date: `${this.currentYear}-${this.currentMonth}`,
      });

      this.$emit("change", {
        date: `${this.currentYear}-${this.currentMonth}`,
      });

      this.getCurrentDays(this.currentYear, this.currentMonth); // 默认获取当前年、当前月的天数
    },
  },

  watch: {
    actives() {
      this.addStyle();
    },
  },

  install(Vue) {
    Vue.component(this.name, this);
  },
};
</script>

<style lang="scss" scoped>
.cr-calendar {
  .list {
    display: flex;
    flex-wrap: wrap;
    font-size: 13px;
    font-size: 26rpx;

    li {
      display: flex;
      justify-content: center;
      align-items: center;
      width: calc(100% / 7);
      padding: 7px 10px;
      padding: 14rpx 20rpx;

      .dot {
        display: inline-block;
        width: 25px;
        width: 50rpx;
        height: 25px;
        height: 50rpx;
        line-height: 25px;
        line-height: 50rpx;
        border-radius: 50%;
        text-align: center;
      }
    }
  }
}
</style>
