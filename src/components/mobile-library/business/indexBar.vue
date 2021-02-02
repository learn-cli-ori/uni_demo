<template>
	<div class="cr-index-bar">
		<!-- 索引列表 -->
		<scroll-view class="cr-index-bar" scroll-y :style="'height: ' + systemInfo.windowHeight + 'px'" :scroll-into-view="'target' + currTargetIndex" scroll-with-animation>
			<!-- 索引列表 -->
			<ul class="index-list">
				<li v-for="(item, index) in indexList" :key="index">
					<!-- 标题 -->
					<div class="name bcl-page" :id="'target' + index">{{ item.name }}</div>

					<!-- 内容列表 -->
					<ul class="content-list">
						<li class="box box-column-center container border-bottom pr-25" v-for="(sitem, sindex) in item.contents" :key="sindex">
							<span class="ml-5">{{ sitem.content }}</span>
						</li>
					</ul>
				</li>
			</ul>
		</scroll-view>
		<!-- 右侧菜单列表 -->
		<div class="fixed-right box box-center">
			<ul class="menu-list cl-primary text-center fz-12">
				<li class="pointer" v-for="(item, index) in indexList" :key="index" @click="currTargetIndex = index">{{ item.name.substring(0, 1) }}</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	name: 'cr-index-bar',

	props: {
		// 索引列表
		indexList: {
			type: Array,
			default: () => []
		},
		// indexList: [
		// 	{
		// 		name: 'A',
		// 		contents: [
		// 			{
		// 				id: 1,
		// 				content: '文本1'
		// 			},
		// 			{
		// 				id: 2,
		// 				content: '文本2'
		// 			}
		// 		]
		// 	},
		// 	{
		// 		name: 'B',
		// 		contents: [
		// 			{
		// 				id: 3,
		// 				content: '文本1'
		// 			},
		// 			{
		// 				id: 4,
		// 				content: '文本2'
		// 			}
		// 		]
		// 	}
		// ]

		// 当前页面滚动高度
		scrollTop: {
			type: Number,
			default: 0
		}
	},

	data() {
		return {
			systemInfo: uni.getSystemInfoSync(),
			currTargetIndex: 0
		};
	},

	methods: {
		/**
		 * 内容选择回调
		 */
		onSelect(item) {
			this.$emit('select', item);
		}
	},

	install(Vue) {
		Vue.component(this.name, this);
	}
};
</script>

<style lang="scss" scoped>
.cr-index-bar {
	height: 100%;

	.index-list {
		li {
			.name {
				padding: 5px 15px;
				padding: 10rpx 30rpx;
			}

			ul {
				li {
					&:last-child {
						border: none;
					}
				}
			}
		}
	}
}

// 右侧菜单列表
.fixed-right {
	position: fixed;
	top: 0;
	right: 0;
	height: 100%;
	z-index: 6;

	.menu-list {
		li {
			padding: 4rpx 20rpx 4rpx 0;
		}
	}
}
</style>
