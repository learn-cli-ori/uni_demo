<template>
  <ul class="cr-upload-image cr-grid cr-grid--4">
    <!-- 图片列表 -->
    <li
      class="item p-10 relative"
      :style="{ height: itemHeight + 'px' }"
      v-for="(item, index) in value"
      :key="index"
    >
      <img
        class="block full-height"
        :src="item.url || item"
        mode="aspectFill"
        @click="previewImage(index)"
      />

      <!-- 关闭按钮 -->
      <div class="close-btn" @click="removeImage(index)">
        <span
          class="cr-icon cr-icon-error-fill cl-danger radius-circle bcl-white pointer"
        ></span>
      </div>
    </li>

    <!-- 上传按钮 -->
    <li
      class="item p-10"
      :style="{ height: itemHeight + 'px' }"
      @click="uploadImage"
      v-if="residue > 0"
    >
      <div class="upload-btn border box box-center pointer-bcl full-height">
        <span class="cr-icon cr-icon-add fz-26"></span>
      </div>
    </li>
  </ul>
</template>

<script>
import { chooseImage, previewImage } from "@/common/public-library/js/methods";

export default {
  name: "cr-upload-image",

  model: {
    name: "value",
    event: "input",
  },

  props: {
    // 图片列表
    value: {
      type: Array,
      default: () => [],
    },

    // 最大上传个数
    max: {
      type: Number,
      default: 9,
    },

    // 上传地址
    action: {
      type: String,
      default: "",
    },

    // 成功状态码
    successCode: {
      type: Number,
      default: 200,
    },
  },

  data() {
    return {
      itemHeight: 0,
    };
  },

  mounted() {
    // 动态设置高度
    uni
      .createSelectorQuery()
      .in(this)
      .selectAll(".cr-upload-image .item")
      .boundingClientRect((rect) => {
        this.itemHeight = rect[0].width;
      })
      .exec();
  },

  methods: {
    /**
     * 上传图片
     */
    async uploadImage() {
      let ress = await chooseImage({
        action: this.action,
        residue: this.residue,
      });

      ress.forEach((item) => {
        if (item.code == this.successCode) {
          setTimeout(() => {
            this.$emit("input", this.value.concat([item.data]));
          }, 0);
        } else {
          this.$emit("error", { code, data, message });
          this.$toast("上传失败，请重试");
        }
      });
    },

    /**
     * 移除图片
     */
    removeImage(index) {
      this.value.splice(index, 1);
      this.$emit("input", this.value);
    },

    /**
     * 预览图片
     */
    previewImage(index) {
      let images = this.value;

      if (typeof this.value[0] == "object")
        images = this.value.map((item) => item.url);

      previewImage({
        images,
        index,
      });
    },
  },

  computed: {
    residue() {
      return this.max - this.value.length;
    },
  },

  install(Vue) {
    Vue.component(this.name, this);
  },
};
</script>

<style lang="scss" scoped>
.cr-upload-image {
  .close-btn {
    position: absolute;
    top: -2.5px;
    top: -5rpx;
    right: 0;
    padding: 2.5px;
    padding: 5rpx;
  }
}
</style>
