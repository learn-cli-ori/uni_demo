import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		wxUserInfo: uni.getStorageSync("drawWxUserInfo") || {}, // 用户信息
	},

	mutations: {
		// 保存登录用户信息
		setWxUserInfo(state, data) {
			state.wxUserInfo = data;
			uni.setStorageSync("drawWxUserInfo", data);
		},
	},

	actions: {
		// 异步提交保存
		setWxUserInfo({
			commit
		}, data) {
			commit('setWxUserInfo', data);
		},
	}
});
