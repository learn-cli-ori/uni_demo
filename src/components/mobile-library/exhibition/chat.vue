<template>
	<div class="cr-chat">
		<ul class="chat-list">
			<li class="item" :class="{ self: item.isSelf }" v-for="(item, index) in chatList" :key="index" @click="onClick(item, 'item')">
				<div class="box" v-if="item.messageType != 0">
					<!-- 头像 -->
					<div class="box" :class="item.isSelf ? 'ml-10' : 'mr-10'" @click="onClick(item, 'avatar')">
						<img class="cr-avatar cr-avatar--small" :class="{ 'radius-circle': isCircle }" :src="item.avatar" />
					</div>

					<div class="info box-1">
						<!-- 昵称、时间 -->
						<div class="box box-column-center mb-5" v-if="(showName && item.nickname) || (showDate && item.date)">
							<div class="nickname" @click="onClick(item, 'nickname')" v-if="showName">{{ item.nickname || '未知用户' }}</div>
							<div class="date fz-12 cl-second" :class="item.isSelf ? 'mr-5' : 'ml-5'" v-if="showDate">{{ item.date }}</div>
						</div>

						<!-- 消息 -->
						<div class="box">
							<div
								class="message radius fz-13"
								:class="{
									'p-0': item.messageType == 3 || item.messageType == 5
								}"
								:style="{
									background: item.isSelf ? selfBcl : otherBcl,
									color: item.isSelf ? selfCl : otherCl
								}"
								@click="onClick(item, 'message')"
							>
								<!-- 文本类型 -->
								<div v-html="item.message || '未知消息'" v-if="item.messageType == 1"></div>

								<!-- 链接类型 -->
								<div class="cl-primary font-underline pointer" @click.stop="openLink(item.message)" v-if="item.messageType == 2">
									{{ item.message || '未知链接' }}
								</div>

								<!-- 图片类型 -->
								<div v-if="item.messageType == 3" @click="previewImage(item.message), onClick(item, 'image')">
									<img class="block" :src="item.message" mode="widthFix" />
								</div>

								<!-- 语音类型 -->
								<div class="pointer box box-column-center" @click.stop="playAudio(item.message), onClick(item, 'audio')" v-if="item.messageType == 4">
									<div
										class="cr-icon cr-icon-voice fz-14"
										:style="{
											color: item.isSelf ? selfCl : otherCl,
											transform: `rotate(${item.isSelf ? '180deg' : '0'})`
										}"
									></div>
									<div>12"</div>
								</div>

								<!-- 视频类型 -->
								<div style="width: 150px; width: 300rpx;" v-if="item.messageType == 5">
									<!-- 封面 -->
									<div class="relative" @click="playVideo(item, index), onClick(item, 'video')" v-if="!item.played">
										<img class="block" :src="item.poster" mode="widthFix" />

										<!-- 播放按钮 -->
										<div class="full-screen-absolute bcl-mask box box-center"><div class="cr-icon cr-icon-play cl-white fz-30 pointer"></div></div>
									</div>

									<!-- 视频 -->
									<video :id="`video_${index}`" :src="item.message" controls v-show="item.played"></video>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- 系统通知 -->
				<div class="box box-column box-center" v-else>
					<div class="date fz-12 cl-second mb-5" v-if="showDate">{{ item.date }}</div>
					<div class="message message-system radius fz-12 cl-white">{{ item.message }}</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
import device from '@/common/public-library/js/device';
import { playAudio } from '@/common/public-library/js/utils';
import { previewImage } from '@/common/public-library/js/methods';

export default {
	name: 'cr-chat',

	props: {
		// 列表数据
		chatList: {
			type: Array,
			default: () => []
		},

		// 自身颜色
		otherCl: {
			type: String,
			default: '#333333'
		},

		// 自身背景颜色
		otherBcl: {
			type: String,
			default: '#9eea6a'
		},

		// 自身颜色
		selfCl: {
			type: String,
			default: '#333333'
		},

		// 自身背景颜色
		selfBcl: {
			type: String,
			default: '#9eea6a'
		},

		// 是否显示昵称
		showName: {
			type: Boolean,
			default: true
		},

		// 是否显示时间
		showDate: {
			type: Boolean,
			default: true
		},

		// 是否为圆形头像
		isCircle: {
			type: Boolean,
			default: false
		},

		// 是否禁用
		disabled: {
			type: Boolean,
			default: false
		}
	},

	methods: {
		/**
		 * 打开链接
		 */
		openLink(url) {
			if (this.disabled) return false;

			uni.navigateTo({
				url: `/pages/webview/index??href=${url}`
			});
		},

		/**
		 * 预览图片
		 */
		previewImage(image) {
			if (this.disabled) return false;

			previewImage({
				images: [image],
				index: 0
			});
		},

		/**
		 * 播放语音
		 */
		playAudio() {
			if (this.disabled) return false;
		},

		/**
		 * 播放视频
		 */
		playVideo(item, index) {
			if (this.disabled) return false;

			uni.createVideoContext(`video-${index}`).play();

			item.played = true;
		},

		/**
		 * 点击回调
		 */
		onClick(item, type) {
			this.$emit(`${type}Click`, item);
		}
	},

	install(Vue) {
		Vue.component(this.name, this);
	}
};
</script>

<style lang="scss" scoped>
.cr-chat {
	.chat-list {
		.item {
			&:not(:last-child) {
				margin-bottom: 20px;
				margin-bottom: 40rpx;
			}

			.message {
				max-width: 80%;
				line-height: 1.7;
				padding: 5px 10px;
				padding: 10rpx 20rpx;

				&.message-system {
					background-color: rgba($color: $color-black, $alpha: 0.3);
					padding: 2px 7px;
					padding: 4rpx 14rpx;
				}
			}

			&.self {
				& > .box {
					flex-direction: row-reverse;

					.info {
						& > div {
							flex-direction: row-reverse;
						}
					}
				}
			}
		}
	}
}
</style>
