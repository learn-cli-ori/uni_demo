import Vue from 'vue'
import App from './App'

// 全局样式
import "@/common/public-library/scss/main.scss";
import Popup from "@/components/mobile-library/feedback/popup";
import Button from "@/components/mobile-library/basic/button";
import template from "@/common/js/template.js";
import store from "./store";
import Toast from "@/common/public-library/js/toast";
import reConfig from '@/reConfig/index';
Vue.component("cr-popup", Popup);
Vue.component("cr-button", Button);
Vue.mixin(template);
Vue.config.productionTip = false;
Vue.prototype.$store = store;
Vue.prototype.$toast = Toast;
Vue.prototype.$oss= `${reConfig.orign}/${reConfig.projectName}/${reConfig.material}`
const app = new Vue({
	...App
})
app.$mount()
