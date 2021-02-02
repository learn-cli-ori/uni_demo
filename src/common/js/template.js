import {
	mapState,
	mapActions
} from 'vuex';
import {
	getUserInfo
} from '../../apis/app.js';


export default {
	data() {
		return {
			systemInfo: uni.getSystemInfoSync(),
			$oss: this.$oss,
		}
	},

	computed: {
		...mapState(['wxUserInfo'])
	},


	methods: {
		// 跳转授权
		toAuth() {
			return new Promise(async (resolve, reject) => {
				if (!this.wxUserInfo.userId) {
					uni.navigateTo({
						url: `/pages/auth/index`
					});
					resolve();
				} else {
					await this.getUserInfo();

					resolve();
				}

			});
		},




		/**
		 * 获取用户信息
		 */
		async getUserInfo() {
			let {
				code,
				data
			} = await getUserInfo();
			if (code == 200) {
				this.setWxUserInfo({ ...this.wxUserInfo,
					...data
				});
			}
		},

		// 校验数字
		checkNumber(val) {
			return val.replace(/[^0-9]/g, "");
		},

		...mapActions(['setWxUserInfo'])
	}
};
