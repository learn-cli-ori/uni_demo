<template>
  <div class="cr-city">
    <!-- 定位城市 -->
    <div class="container">
      <div class="cr-title">定位城市</div>
      <div class="box box-column-center mt-10">
        <div class="mr-10">
          <cr-button size="small" @click="onSelect(currentCityName)">
            <span class="fz-14">{{ currentCityName }}</span></cr-button
          >
        </div>

        <!-- 重新定位 -->
        <div>
          <cr-button
            type="clear"
            :open-type="isAuth ? '' : 'openSetting'"
            @opensetting="onOpenSetting"
            @click="getLocationInfo"
          >
            <div class="cl-second pointer">
              <span
                class="cr-icon cr-icon-reload mr-5 vt-middle"
              ></span>
              <span class="fz-13 vt-middle">{{
                isAuth ? "重新定位" : "去授权"
              }}</span>
            </div>
          </cr-button>
        </div>
      </div>
    </div>

    <!-- 热门城市 -->
    <ul class="hot-list container">
      <li class="cr-title">热门城市</li>
      <li
        class="inline-block mt-10 mr-10"
        v-for="(item, index) in hots"
        :key="index"
      >
        <cr-button size="small" @click="onSelect(item)"
          ><span class="fz-14">{{ item }}</span></cr-button
        >
      </li>
    </ul>
    <div></div>

    <cr-index-bar
      :index-list="citys"
      :scroll-top="scrollTop"
      @select="onSelect"
    ></cr-index-bar>
  </div>
</template>

<script>
import crIndexBar from "@/components/mobile-library/business/indexBar";
import { getLocationInfo } from "@/common/public-library/js/methods";
import device from "@/common/public-library/js/device";

// 城市数据
import citys from "./city.json";

citys.forEach((item) => {
  item.contents = item.citys;
  delete item.citys;
});

export default {
  name: "cr-city",

  props: {
    // 当前页面滚动高度
    scrollTop: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      citys,
      hots: [
        "北京",
        "上海",
        "广州",
        "深圳",
        "杭州",
        "南京",
        "成都",
        "重庆",
        "武汉",
        "长沙",
        "昆明",
      ],
      currentCityName: "北京",
      isAuth: true,
    };
  },

  created() {
    this.getLocationInfo();
  },

  methods: {
    /**
     * 获取位置信息
     */
    async getLocationInfo() {
      if (!this.isAuth) return false;

      try {
        let data = await getLocationInfo();
        this.currentCityName = data.result.addressComponent.city || "北京";
      } catch (err) {
        if (typeof err.isAuth == "boolean" && typeof document == "undefined")
          this.isAuth = false;
      }
    },

    /**
     * 打开设置
     */
    onOpenSetting(event) {
      if (event.detail.authSetting["scope.userLocation"]) {
        this.isAuth = true;
        this.getLocationInfo();
      }
    },

    /**
     * 城市选择回调
     */
    onSelect(name) {
      this.$emit("select", {
        id: 0,
        name,
      });
    },
  },

  components: {
    crIndexBar,
  },

  install(Vue) {
    Vue.component(this.name, this);
  },
};
</script>

<style lang="scss" scoped>
.cr-city {
}
</style>
