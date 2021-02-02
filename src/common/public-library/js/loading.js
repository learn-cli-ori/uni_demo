/*
 * @Author:lyh
 * @Date: 2020-03-11 19:44:43
 * @Purpose: 全局加载
 */


export default {
	show(title = "正在加载..", mask = true) {
		uni.showLoading({
			title,
			mask,
		});
	},

	hide() {
		uni.hideLoading();

	},
};
