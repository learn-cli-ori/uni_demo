<template>
  <div class="cr-stepper box box-column-center">
    <div class="btn" @click="decrease">
      <cr-button
        :type="value <= min ? 'info' : 'default'"
        :disabled="value <= min"
        >-</cr-button
      >
    </div>
    <div class="box-1 text-center">
      <input
        type="number"
        v-model="value"
        @input="onInput"
      />
    </div>
    <div class="btn" @click="increase">
      <cr-button
        :type="value >= max ? 'info' : 'default'"
        :disabled="value >= max"
        >+</cr-button
      >
    </div>
  </div>
</template>

<script>
import Button from "../basic/button";

export default {
  name: "cr-stepper",

  props: {
    number: {
      type: Number,
      default: 1,
    },

    max: {
      type: Number,
      default: 10000,
    },

    min: {
      type: Number,
      default: 1,
    },
  },

  data() {
    return {
      value: 1,
    };
  },

  created() {
    this.value = this.number;

    if (this.value <= this.min) {
      this.value = this.min;
    } else if (this.value >= this.max) {
      this.value = this.max;
    }
  },

  methods: {
    /**
     * 减少
     */
    decrease() {
      this.value = Number(this.value);

      if (this.value <= this.min) {
        this.value = this.min;
      } else {
        this.value -= 1;
      }

      this.$emit("decrease", this.value);
      this.$emit("change", this.value);
    },

    /**
     * 增加
     */
    increase() {
      this.value = Number(this.value);

      if (this.value >= this.max) {
        this.value = this.max;
      } else {
        this.value += 1;
      }

      this.$emit("increase", this.value);
      this.$emit("change", this.value);
    },

    onInput(event) {
      let input = Number(event.detail.value) || this.min;

      this.$nextTick(() => {
        if (input <= this.min) {
          this.value = this.min;
        } else if (input >= this.max) {
          this.value = this.max;
        } else {
          this.value = input;
        }

        this.$emit("input", this.value);
        this.$emit("change", this.value);
      });
    },
  },

  components: {
    "cr-button": Button,
  },
};
</script>

<style lang="scss" scoped>
.cr-stepper {
  .btn {
    /deep/ .cr-button {
      width: 70rpx;
      height: 70rpx;
      min-width: 0;
      font-size: 32rpx !important;
      padding: 0;
      line-height: 2;
    }
  }
}
</style>
