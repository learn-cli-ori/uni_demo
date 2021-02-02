/**
 * request 设置
 */
import Vue from 'vue';
import store from '@/store';
import request from '@/common/public-library/js/request';
import reConfig from "@/reConfig/index";
// h5 开发环境使用proxy 代理请求
let remote = reConfig.orign + '/' + reConfig.projectName;

// #ifdef H5
remote = '/proxyApi';
// #endif

export default request({
	remote,
	getExtraParams: () => {
		let {
			access_token = '', userId = 0,
				societyInfo = {},
		} = store.state.wxUserInfo || {}
		return {
			societyId: societyInfo ? (societyInfo.id || '') : '',
			access_token
		};
	},
	start: (req) => { // 开始回调
		console.log("请求参数", req);
	},

	fail: async err => {
		console.log("fail", err)
		if (err.code === 401) {
			console.log("未登录")
			uni.navigateTo({
				url: '/pages/auth/index'
			})
		}else if (err.code === 405) {
			console.log("没权限，游客")
			uni.reLaunch({
				url: '/pages/tourist/index'
			})
		}
	},

	finish: (res) => { // 结束回调
		console.log("请求结果", res);
	}

});
