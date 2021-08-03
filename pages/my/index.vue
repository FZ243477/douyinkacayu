<template>
	<view  class="indexBody" :style="'height:'+swiperHeight+'px'" >
	<view class="indexFixed" >
		<view class="liuhaiclass" :style="'height:'+liuhaiHeight+'px'"></view>
		<view class="index_top"  >个人中心
			<view class="index_search" style="width:50px;" @click="goSearch">
				 <img class="search_img" style="margin-top: 5px;" mode="widthFix" 
				 src="https://admin.shitutu.com/public/douyinimg/searchover.png" />
			</view>
		
		</view>
		</view>
		<view style="height:5rem;width: 100%;"></view>
		<view class="index_c" style="margin-top: 0;">
			<view class="my_card" :style="{backgroundImage: 'url(' + pic_url + ')'}">
				<view class="member_head">
					<img class="member_head_img" mode="widthFix" :src="memberData.avatarUrl" />
				</view>
				<view class="my_card_right">
					<p class="my_head_p1 white">{{memberData.nickName}}</p>
					<p class="my_head_p2 white" v-show="memberData.vip == 1">{{memberData.vip_time}}后到期</p>
					<p class="my_head_p2 white" v-show="memberData.vip == 0">您还不是会员</p>
				</view>
				<view class="my_card_go_pay" @click="goBuyVip" v-show="memberData.vip == 1">
					立即续费
				</view>
				<view class="my_card_go_pay" @click="goBuyVip" v-show="memberData.vip == 0">
					立即开通
				</view>
				<view style="clear: both;"></view>
				<view class="my_card_wuxian">VIP会员无限制下载素材视频</view>
			</view>
			<view class="my_card_message">
				<img class="my_card_message_img" mode="widthFix" src="https://admin.shitutu.com/public/douyinimg/lingdang.png" />
				<view class="my_card_message_content">今日咨询客服就有双重好礼，马上去看看吧！</view>
			</view>
			<view class="tq_box" style="margin-left: 0;" @click="goBuyVip">
				<img class="tq_img" mode="widthFix" src="https://admin.shitutu.com/public/douyinimg/gra.png" />
			</view>
			<view class="tq_box" @click="callKefu">
				<img class="tq_img" mode="widthFix" src="https://admin.shitutu.com/public/douyinimg/gr2.png" />
			</view>
			<view class="tq_box" @click="goSchool">
				<img class="tq_img" mode="widthFix" src="https://admin.shitutu.com/public/douyinimg/gr3.png" />
			</view>
			<view class="tq_box" style="margin-right: 0;" @click="goFit">
				<img class="tq_img" mode="widthFix" src="https://admin.shitutu.com/public/douyinimg/gr4.png" />
			</view>
			<view style="clear: both;"></view>
			<view class="solid" style="margin-top: 20px;"></view>
		<!-- 	<view class="my_card_nav">
				<view class="my_card_nav_title">视频素材记录</view>
				<img class="my_card_nav_img" mode="widthFix" src="https://admin.shitutu.com/public/douyinimg/cardnav.png" />
			</view> -->
			<view class="my_card_nav"  @click="goMaterialList">
				<view class="my_card_nav_title">素材包记录</view>
				<img class="my_card_nav_img" mode="widthFix" src="https://admin.shitutu.com/public/douyinimg/cardnav.png" />
			</view>
			<view class="my_card_nav"  @click="goShareWeixin">
				<view class="my_card_nav_title">分享软件</view>
				<img class="my_card_nav_img" mode="widthFix" src="https://admin.shitutu.com/public/douyinimg/cardnav.png" />
			</view>
			<view class="solid" style="margin-top: 20px;"></view>
			<view class="my_card_nav" @click="goServiceAgreement">
				<view class="my_card_nav_title" >用户协议</view>
				<img class="my_card_nav_img" mode="widthFix" src="https://admin.shitutu.com/public/douyinimg/cardnav.png" />
			</view>
			<view class="my_card_nav" @click="goPrivacy">
				<view class="my_card_nav_title" >隐私政策</view>
				<img class="my_card_nav_img" mode="widthFix" src="https://admin.shitutu.com/public/douyinimg/cardnav.png" />
			</view>
			<view class="solid" style="margin-top: 20px;"></view>
			<view class="fankui">
				<img class="writebi" mode="widthFix" src="https://admin.shitutu.com/public/douyinimg/writebi.png" />
				<view class="fankui_title" @click="goOpinion">意见反馈</view>
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
				memberData:'',
				liuhaiHeight:3
			}
		},
		onShow:function(){
		    //获取全局设置的变量
		    this.memberData = this.$member.memberObj;
			this.liuhaiHeight = this.memberData.statusBarHeight + 10
			console.log( this.memberData)
		},
		onLoad() {
			uni.getSystemInfo({
			    success:  (res) => {    
					// 需要使用箭头函数，swiper 高度才能设置成功
			        // 获取swiperHeight可以获取的高度，窗口高度减去导航栏高度
			        this.swiperHeight = res.windowHeight 
			        console.log(this.swiperHeight)
			    }
			});
		},
		methods: {
			goSearch(){
				uni.navigateTo({
					url: '../index/search',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			goFit(){
				uni.navigateTo({
					url: '../my/fit',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			goPrivacy(){
				uni.navigateTo({
					url: '../index/privacy',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			goMaterialList(){
				if(this.memberData.platform=='ios'){
					uni.showToast({
						title: 'IOS端暂不支持！',
						icon:'none',
						duration: 2000
					});
					return;
				}
				uni.navigateTo({
					url: '../my/materialList',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			goServiceAgreement(){
				uni.navigateTo({
					url: '../index/serviceAgreement',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			goSchool(){
				uni.showToast({
				    title: '开发中！敬请期待！',
				    duration: 2000
				});
			},
			goBuyVip(){
				if(this.memberData.platform=='ios'){
					uni.showToast({
						title: 'IOS端暂不支持！',
						icon:'none',
						duration: 2000
					});
					return;
				}
				uni.navigateTo({
					url: '../my/member',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			callKefu(){
			 	uni.makePhoneCall({
			 	
			 	// 手机号
			    phoneNumber: '0571-88693669', 
			
				// 成功回调
				success: (res) => {
					console.log('调用成功!')	
				},
			
				// 失败回调
				fail: (res) => {
					console.log('调用失败!')
				}
				
			  });
			},
			goShareWeixin(){
				uni.shareWithSystem({
				  type:"text",
				  summary: '补充文字',
				  imageUrl:"https://admin.shitutu.com/public/douyinimg/weixin.png",
				  success(){
				      console.log('分享成功');
				    // 分享完成，请注意此时不一定是成功分享
				  },
				  fail(){
				      console.log('分享失败');
				    // 分享失败  
				  }
				})
			},
			goOpinion(){
				uni.navigateTo({
					url: '../index/opinion',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style>
</style>
