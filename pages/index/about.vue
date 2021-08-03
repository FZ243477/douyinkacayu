<template>
	<view  class="indexBody" :style="'min-height:'+swiperHeight+'px'" >
		<view class="indexFixed" >
			<view class="liuhaiclass" :style="'height:'+liuhaiHeight+'px'"></view>
		<view class="index_top">关于我们
			<view class="index_search">
				 <img class="cancel_img" style="margin-top: 5px;width: 0.7rem;"
				  mode="widthFix"   @click='onReturn'
				 src="https://admin.shitutu.com/public/douyinimg/back.png" />
			</view>
		</view>
		</view>
		<view style="height:5rem;width: 100%;"></view>
		<view class="index_c" >
			<view align="center">
				 <img class="about_head_img"  mode="widthFix" src="https://admin.shitutu.com/public/douyinimg/about.png" />
			</view>
			<view class="about_text">
				软铁是汀知兰文化创意旗下的品牌，专注美食领域视觉创意服务。
				业务包括：美食摄影、视频拍摄、VI设计、包装设计等。
				咔嚓鱼是国内专业美食摄影公司之一，成立于2011年。专注细分摄影市场（美食摄影），
				在华东地区常年服务各大中食品餐饮企业。特别在菜品拍摄上，以独特的拍摄手法迅速在市场建立口碑，
				获得大批餐饮企业青睐，并建立长期合作关系。
				服务品牌：华润万家、香格里拉酒店、新农哥、可莎蜜儿、正新、咬不得、茶桔便、卤西西等。
				战略合作伙伴：饿了么、美团、焗部落、二维火。
			</view>
			<view align="center">
				<img class="about_qr_img"  mode="widthFix" src="https://admin.shitutu.com/public/douyinimg/kefuqrcode.png" />
				<view class="guanfang">官方微信</view>
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
			        this.swiperHeight = res.windowHeight 
			    }
			});
		},
		methods:{
			onReturn(){
				uni.navigateBack({
				    delta: 1
				});
			},
		},
		created() {
			
		}
	
	}
</script>

<style>
</style>
