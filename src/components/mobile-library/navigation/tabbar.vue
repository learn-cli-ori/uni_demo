<template>
	<ul class="cr-tabbar footer box box-center bcl-white" :class="{ 'border-top': showBorder }">
		<li class="box box-column box-between box-1 text-center" v-for="(item, index) in navs" :key="index" @click="onClick(item, index)">
			<!-- 图标 -->
			<div class="icon"><img :src="index == value ? item.activeIcon : item.icon" /></div>

			<!-- 文字 -->
			<div class="fz-12" :style="{ color: index == value ? item.activeColor : '#bbbbc4' }">{{ item.title }}</div>
		</li>
	</ul>
</template>

<script>
export default {
	name: 'cr-tab',

	model: {
		name: 'value',
		event: 'input'
	},

	props: {
		// 标签列表
		navs: {
			type: Array,
			default: () => []
		},

		// 绑定的值
		value: {
			type: Number,
			default: 0
		},

		// 是否有上边框
		showBorder: {
			type: Boolean,
			default: true
		}
	},

	created() {
		let pages = getCurrentPages();
		let route = pages[pages.length - 1].route;
		this.navs.map((item, index) => {
			if (item.path.includes(route)) this.$emit('input', index);
		});
	},

	methods: {
		/**
		 * 点击回调
		 */
		onClick(item, index) {
			let { path, target } = item;

			if (index == this.value) return false;

			if (path) {
				if (target == '_redirect') {
					uni.redirectTo({
						url: path
					});
				} else if (target == '_reLaunch') {
					uni.reLaunch({
						url: path
					});
				} else if (target == '_switch') {
					uni.switchTab({
						url: path
					});
				} else {
					uni.navigateTo({
						url: path
					});
				}
			}

			if (!['_blank', '_out'].includes(target)) this.$emit('input', index);
			this.$emit('change', index);
		}
	},

	install(Vue) {
		Vue.component(this.name, this);
	}
};
</script>

<style lang="scss" scoped>
.cr-tabbar {
	height: 50px;
	height: 100rpx;

	.icon {
		font-size: 0;

		img {
			width: 20px;
			height: 20px;
		}
	}
}
</style>
