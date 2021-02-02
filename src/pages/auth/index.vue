<template>
	<div class="auth-box full-width full-height p-20">
		<view class="border-bottom p-60 text-center "><image src="../../static/image/icon_2.png" class="auth-bg"></image></view>

		<p class="font-bold fz-16 mt-20">申请获取一下权限</p>
		<p class="fz-14 cl-text mt-10">获取你的公开信息（微信昵称、头像等）</p>
		<div class="auth-btn-box">
			<button class="p-10 mb-10 radius-20 auth-btn bcl-green cl-white full-width" type="primary" open-type="getUserInfo" @getuserinfo="saveUserInfo">授权登录</button>
		</div>
	</div>
</template>

<script>
import { getUserOpenId, saveUserInfo, getUserInfo } from '@/apis/app.js';
export default {
	data() {
		return {};
	},

	methods: {
		/**
		 * 保存用户授权信息
		 */
		saveUserInfo(event) {
			if (event.detail.errMsg == 'getUserInfo:ok') {
				let userInfo = event.detail.userInfo;
				this.setWxUserInfo({ ...userInfo });
				this.wxLogin().then(async res => {
					this.setWxUserInfo({ ...userInfo, ...res });
					await this.getUserInfo();
					uni.navigateBack();
				});
			}
		},

		/**
		 * 微信登录
		 */
		wxLogin(event) {
			return new Promise((resolve, reject) => {
				wx.login({
					success: res => {
						getUserOpenId(res.code, this.wxUserInfo.avatarUrl, this.wxUserInfo.nickName)
							.then(open => {
								const result = open.data;
								console.log(result, 'result');
								if (result && typeof result === 'object') {
									Object.keys(result).forEach(key => uni.setStorageSync(key, result[key]));
									resolve(result);
								} else {
									reject(res);
								}
							})
							.catch(e => {
								reject(e);
							});
					}
				});
			});
		}
	}
};
</script>

<style scoped lang="scss">
.auth-bg {
	width: 160rpx;
	height: 160rpx;
}

.auth-box-title {
	position: absolute;
	top: 20px;
	height: 44px;
	line-height: 44px;
	text-align: center;
	width: 100%;
}

.auth-box-title {
	position: absolute;
	top: 20px;
	height: 44px;
	line-height: 44px;
	text-align: center;
	width: 100%;
}

.auth-btn-box {
	position: absolute;
	bottom: 200rpx;
	left: 50%;
	transform: translateX(-50%);
	width: 100%;
	.auth-btn-img {
		width: 30px;
		height: 30px;
	}
}

.phone-btn {
	::v-deep button {
		width: 100%;
	}
}
.auth-btn {
	width: 400rpx;
	height: 90rpx;
	// background-image: url(../../static/icon/icon_4.png);
	background-size: 100% 100%;
	&::after {
		border: none;
	}
}
.bcl-green {
	background-color: #A1DD70;
}
</style>
