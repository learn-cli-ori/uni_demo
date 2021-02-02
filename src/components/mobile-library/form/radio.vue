<template>
	<ul class="cr-radio" :class="{ inline: isInline }">
		<li class="item" v-for="(item, index) in rlist" :key="index" @click="check(index)">
			<div class="box box-column-center">
				<span class="cr-icon mr-5 fz-18 vt-middle" :class="item.checked ? 'cr-icon-radio-fill cl-main' : 'cr-icon-radio'"></span>

				<span>
					<slot>{{ item.content }}</slot>
				</span>
			</div>
		</li>
	</ul>
</template>

<script>
export default {
	name: 'cr-radio',

	model: {
		name: 'value',
		event: 'input'
	},

	props: {
		// 列表
		list: {
			type: Array,
			default: () => []
		},

		// 选中的值
		value: {
			type: Object,
			default: () => {}
		},

		// 是否为行内排列
		isInline: {
			type: Boolean,
			default: false
		},

		// 是否禁用
		disabled: {
			type: Boolean,
			default: false
		}
	},

	data() {
		return {
			rlist: []
		};
	},

	mounted() {
		this.rlist = this.list;
		this.rlist.map(item => {
			if (item.checked) this.$emit('input', item);
		});
	},

	methods: {
		/**
		 * 选中
		 */
		check(index) {
			if (this.disabled) {
				return;
			}
			this.rlist.forEach(item => (item.checked = false));
			this.rlist[index].checked = true;

			let checkedItem = this.rlist[index];
			console.log('当前选中的值：', checkedItem);

			this.$emit('change', checkedItem);
			this.$emit('input', checkedItem);
		}
	},

	install(Vue) {
		Vue.component(this.name, this);
	}
};
</script>

<style lang="scss" scoped>
.cr-radio {
	.item {
		&:not(:last-child) {
			margin-bottom: 10px;
			margin-bottom: 20rpx;
		}
	}

	&.inline {
		.item {
			display: inline-block;

			&:not(:last-child) {
				margin-right: 10px;
				margin-right: 20rpx;
				margin-bottom: 0;
			}
		}
	}
}
</style>
