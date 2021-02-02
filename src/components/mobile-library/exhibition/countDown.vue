<template>
  <div class="cr-count-down inline-block">
    <slot>
      <span>
        <slot name="left"></slot>
      </span>

      <span>{{ value }}</span>

      <span>
        <slot name="right"></slot>
      </span>
    </slot>
  </div>
</template>

<script>
import  moment  from "moment";

export default {
  name: "cr-count-down",

  props: {
    // 普通倒计时秒数
    count: {
      type: [Number, String, Date],
      default: 60,
    },

    // 是否是时间戳
    isTimeStamp: {
      type: Boolean,
      default: false,
    },

    // 是否是毫秒级渲染
    isMilliSeconds: {
      type: Boolean,
      default: false,
    },

    // 是否显示天数
    showDays: {
      type: Boolean,
      default: false,
    },

    // 是否显示中文
    showChinese: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      value: "", // 当前显示得值
      time: 0, // 时间戳的倒计时间隔
      moment,
    };
  },

  created() {
    this.time = this.isMilliSeconds ? 60 : 1000;

    if (this.isTimeStamp) {
      // 时间戳
      this.value = "";

      let { duration, isEnd } = this.getDuration(moment(), moment(this.count));
      this.value = duration;

      isEnd
        ? this.$emit("complete", this.value)
        : this.$emit("change", this.value);
    } else {
      // 普通
      this.value = 0;

      this.value = this.count;
      this.$emit("change", this.value);
    }
    this.countDown();
  },

  methods: {
    /**
     * 倒计时
     */
    countDown() {
      if (this.isTimeStamp) {
        // 时间戳倒计时
        let timer = setInterval(() => {
          let startTime = moment();
          let endTime = moment(this.count);

          let { duration, isEnd } = this.getDuration(startTime, endTime);
          this.value = duration;

          // 已结束
          if (isEnd) {
            clearInterval(timer);
            this.$emit("complete", this.value);
            return false;
          }

          this.$emit("change", this.value);
        }, this.time);
      } else {
        // 普通倒计时
        let timer = setInterval(() => {
          if (this.value > 0) {
            this.value = --this.value;
            this.$emit("change", this.value);
          } else {
            clearInterval(timer);
            this.$emit("complete", this.value);
          }
        }, 1000);
      }
    },

    /**
     * 获取时长
     */
    getDuration(startTime, endTime) {
      let days = endTime.diff(startTime, "days");
      let hours = endTime.diff(startTime, "hours");
      let minutes = endTime.diff(startTime, "minutes");
      let seconds = endTime.diff(startTime, "seconds");
      let milliseconds = endTime.diff(startTime, "milliseconds");
      let isEnd = false;

      // 计算
      hours = hours >= 24 ? hours % (days * 24) : hours;
      minutes =
        minutes >= 60 ? minutes % (hours * 60 + days * 24 * 60) : minutes;
      seconds =
        seconds >= 60
          ? seconds % (minutes * 60 + hours * 60 * 60 + days * 24 * 60 * 60)
          : seconds;
      milliseconds = milliseconds % 1000;

      // 已结束
      if (
        days <= 0 &&
        hours <= 0 &&
        minutes <= 0 &&
        seconds <= 0 &&
        milliseconds <= 0
      )
        isEnd = true;

      // 归零
      days = days < 0 ? 0 : days;
      hours =
        hours < 0 ? 0 : days > 0 && !this.showDays ? hours + days * 24 : hours; // 不展示天数的时候，小时要跟上去，不然一直不会大于24
      minutes = minutes < 0 ? 0 : minutes;
      seconds = seconds < 0 ? 0 : seconds;
      milliseconds = milliseconds < 0 ? 0 : milliseconds;

      days = days < 10 ? `0${days}` : days;
      hours = hours < 10 ? `0${hours}` : hours;
      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds < 10 ? `0${seconds}` : seconds;
      milliseconds = milliseconds < 100 ? `0${milliseconds}` : milliseconds;
      milliseconds = String(milliseconds).substring(0, 2);

      if (this.showChinese) {
        return this.showDays
          ? {
              duration: `${days}天${hours}时${minutes}分${seconds}秒${
                this.isMilliSeconds ? milliseconds + "毫秒" : ""
              }`,
              isEnd,
            }
          : {
              duration: `${hours}时${minutes}分${seconds}秒${
                this.isMilliSeconds ? milliseconds + "毫秒" : ""
              }`,
              isEnd,
            };
      } else {
        return this.showDays
          ? {
              duration: `${days}:${hours}:${minutes}:${seconds}${
                this.isMilliSeconds ? ":" + milliseconds : ""
              }`,
              isEnd,
            }
          : {
              duration: `${hours}:${minutes}:${seconds}${
                this.isMilliSeconds ? ":" + milliseconds : ""
              }`,
              isEnd,
            };
      }
    },
  },

  install(Vue) {
    Vue.component(this.name, this);
  },
};
</script>

<style lang="scss" scoped></style>
