<template>
  <div class="cr-record inline-block">
    <!-- 插槽 -->
    <cr-button
      type="clear"
      @longpress="isClick ? '' : startRecord()"
      @touchend="isClick ? '' : stopRecord()"
      @click="isClick ? startRecord() : ''"
      :open-type="isAuth ? '' : 'openSetting'"
      @opensetting="settingMethod"
    >
      <slot>
        <div class="box box-column box-center">
          <div
            class="radius-circle box box-center bcl-main"
            :style="{ width: size, height: size }"
          >
            <span
              class="cr-icon cr-icon-recoding cl-white fz-26"
            ></span>
          </div>
          <div class="cl-second fz-12 mt-10">
            {{ isAuth ? (isClick ? "点我开始录音" : "长按录音") : "录音授权" }}
          </div>
        </div>
      </slot>
    </cr-button>
  </div>
</template>

<script>
export default {
  name: "cr-record",

  props: {
    // 语言
    language: {
      type: String,
      default: "zh_CN",
    },

    // 大小
    size: {
      type: String,
      default: "100rpx",
    },

    // 最大录音时长
    duration: {
      type: Number,
      default: 60000,
    },

    // 加载文字
    loadingTitle: {
      type: String,
      default: "正在录音..",
    },

    // 是否是点击类型
    isClick: {
      type: Boolean,
      default: false,
    },

    // 是否使用同声传译
    isRecognition: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      manager: null, // 录音管理器
      recording: false, // 是否正在录音
      isAuth: true, // 是否已授权录音权限
      WechatSI: null, // 微信第三方插件
    };
  },

  created() {
    // 同声传译需要引入的插件
    // #ifdef MP-WEIXIN
    if (this.isRecognition) {
      this.WechatSI = requirePlugin("WechatSI");
    }
    // #endif

    this.initMannager();
  },

  methods: {
    /**
     * 初始化管理器
     */
    initMannager() {
      // #ifdef MP-WEIXIN

      if (this.isRecognition) {
        // 同声传译
        this.manager = this.WechatSI.getRecordRecognitionManager();

        // 有识别的内容返回
        this.manager.onRecognize = (res) => {
          console.log("持续接受到的内容：", res);
          this.$emit("recognize", res);
        };

        // 结束录音
        this.manager.onStop = (res) => {
          console.log("结束接受到的内容：", res);
          this.$emit("stop", res);
        };
      } else {
        // 普通录音
        this.manager = uni.getRecorderManager();

        // 结束录音
        this.manager.onStop((res) => {
          console.log("结束接受到的内容：", res);
          this.$emit("stop", res);
        });
      }

      // 设置录音授权
      uni.getSetting({
        success: (res) => {
          this.settingResult(res);
        },
      });

      // #endif
    },

    /**
     * 开始录音
     */
    startRecord(event) {
      console.log("点击了开始录音");
      if (!this.isAuth) return false;

      console.log("开始录音");
      this.$emit("start");

      this.recording = true;

      // #ifdef MP-WEIXIN
      this.manager.start({
        lang: this.language,
        duration: this.duration,
      });
      // #endif

      if (this.isClick) {
        // 点击录音（外部控制）
      } else {
        // 长按录音

        let icon = "/static/oss/recoding.png";

        // 正在录音提示
        uni.showToast({
          title: this.loadingTitle,
          mask: false,
          image: icon,
          duration: 10000000,
        });
      }
    },

    /**
     * 结束录音
     */
    stopRecord() {
      console.log("点击了结束录音");
      // #ifdef MP-WEIXIN
      this.manager.stop();
      // #endif
      this.recording = false;
      uni.hideToast();
    },

    /**
     * 设置界面回调
     */
    settingMethod(e) {
      this.settingResult(e.detail);
    },

    /**
     * 设置录音授权
     */
    settingResult(e) {
      this.isAuth = !!e.authSetting["scope.record"];
      this.$emit("authChange", this.isAuth);

      uni.authorize({
        scope: "scope.record",
        success: () => {
          this.isAuth = true;
          this.$emit("authChange", this.isAuth);
        },
        fail: () => {
          this.isAuth = false;
          this.$emit("authChange", this.isAuth);
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
