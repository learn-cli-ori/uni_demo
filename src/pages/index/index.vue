<template>
	<view class="router-view">
		首页
	</view>
</template>

<script>
export default {
	
	data() {
		return {
		
		};
	},
	async onShow() {
		await this.toAuth();
	}
};
</script>

<style lang="scss" scoped>
</style>
