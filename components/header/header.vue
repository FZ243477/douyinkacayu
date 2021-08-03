<template name="page-head">
	<view class="uni-page-head">
		<view  class="uni-page-head-title">{{title}}</view>
	</view>
</template>
<script>
	export default {
		name: "page-head",
		props: {
			title: {
				type: String,
				default: ""
			}
		}
	}
</script>
<style>
	.uni-page-head-title{
		color:#333333;
		font-size: 12rpx;
	}
</style>