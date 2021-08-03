<template>
	<view  class="indexBody" :style="'min-height:'+swiperHeight+'px'" >
		<view class="indexFixed" >
			<view class="liuhaiclass" :style="'height:'+liuhaiHeight+'px'"></view>
		<view class="index_top">设置
			<view class="index_search">
				 <img class="cancel_img" style="margin-top: 5px;width: 0.7rem;" 
				  @click='onReturn'
				 mode="widthFix" src="https://admin.shitutu.com/public/douyinimg/back.png" />
			</view>
		</view>
		</view>
		<view style="height:5rem;width: 100%;"></view>
		<view class="index_c" >
			<view class="my_card_nav">
				<view class="my_card_nav_title">最新版本</view>
				<img class="my_card_nav_img" mode="widthFix" src="https://admin.shitutu.com/public/douyinimg/cardnav.png" />
				<view class="my_card_nav_title" style="float: right;margin-right: 10px;">版本1.0</view>
			</view>
			<view class="my_card_nav" @click="goAbout">
				<view class="my_card_nav_title">关于我们</view>
				<img class="my_card_nav_img" mode="widthFix" src="https://admin.shitutu.com/public/douyinimg/cardnav.png" />
			</view>
			<view class="my_card_nav" @click="clear">
				<view class="my_card_nav_title" >清除缓存</view>
				<img class="my_card_nav_img" mode="widthFix" src="https://admin.shitutu.com/public/douyinimg/cardnav.png" />
				<view class="my_card_nav_title" style="float: right;margin-right: 10px;">{{currentSize}}kb</view>
			</view>
			<view class="fankui_fit" @click="goOpinion">
				<img class="writebi" mode="widthFix" src="https://admin.shitutu.com/public/douyinimg/writebi.png" />
				<view class="fankui_title">意见反馈</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperHeight:500,
				pic_url:'https://admin.shitutu.com/public/douyinimg/mycarda.png',
				currentSize:0,
				liuhaiHeight:3
			}
		},
		onShow:function(){
		    //获取全局设置的变量
		    this.memberData = this.$member.memberObj;
			this.liuhaiHeight = this.memberData.statusBarHeight + 10
		},
		onLoad() {
			uni.getSystemInfo({
			    success:  (res) => {    
					// 需要使用箭头函数，swiper 高度才能设置成功
			        // 获取swiperHeight可以获取的高度，窗口高度减去导航栏高度
			        this.swiperHeight = res.windowHeight 
			    }
			});
		},
		methods:{
			goOpinion(){
				uni.navigateTo({
					url: '../index/opinion',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			onReturn(){
				uni.navigateBack({
				    delta: 1
				});
			},
			getHuancun(){
				var that = this;
				uni.getStorageInfo({
				    success: function (res) {
						that.currentSize = res.currentSize
				        // console.log(res.keys,1);
				        // console.log(res.currentSize,2);
				        // console.log(res.limitSize,3);
				    }
				});
			},
			clear(){
				uni.clearStorage({
					success: function (res) {
						if(res.errMsg == 'clearStorage:ok'){
							uni.showToast({
							    title: '清除成功!',
							    duration: 2000
							});
						}
					}
				});
			},
			goAbout(){
				uni.navigateTo({
					url: '../index/about',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		},
		created() {
			this.getHuancun();
		}
	
	}
</script>

<style>
</style>
