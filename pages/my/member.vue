<template>
	<view  class="indexBody" :style="'height:'+swiperHeight+'px'" >
		<view class="indexFixed" >
			<view class="liuhaiclass" :style="'height:'+liuhaiHeight+'px'"></view>
		<view class="index_top">会员中心
			<view class="index_search">
				 <img class="cancel_img" style="margin-top: 5px;width: 0.7rem;" 
				 mode="widthFix"  @click='onReturn'
				 src="https://admin.shitutu.com/public/douyinimg/back.png" />
			</view>
		</view>
		</view>
		<view style="height:5rem;width: 100%;"></view>
		<view class="index_c" style="margin-top: 0;">
			<view class="member_card" :style="{backgroundImage: 'url(' + pic_url + ')'}">
				<view class="member_head">
					<img class="member_head_img" mode="widthFix" :src="memberData.avatarUrl" />
				</view>
				<view class="member_card_right">
					<p class="member_head_p1">{{memberData.nickName}}</p>
					<p class="member_head_p2">立即开通会员预计可省149.25</p>
				</view>
				<view style="clear: both;"></view>
			</view>
			<view style="clear: both;"></view>
			<view class="member_title">
				专属特权
			</view>
			<view class="tq_box" style="margin-left: 0;">
				<img class="tq_img" mode="widthFix" src="https://admin.shitutu.com/public/douyinimg/tq1.png" />
			</view>
			<view class="tq_box">
				<img class="tq_img" mode="widthFix" src="https://admin.shitutu.com/public/douyinimg/tq2.png" />
			</view>
			<view class="tq_box">
				<img class="tq_img" mode="widthFix" src="https://admin.shitutu.com/public/douyinimg/tq3.png" />
			</view>
			<view class="tq_box" style="margin-right: 0;">
				<img class="tq_img" mode="widthFix" src="https://admin.shitutu.com/public/douyinimg/tqf.png" />
			</view>
			<view style="clear: both;"></view>
			<view class="member_title">
				会员套餐
			</view>
			<view class="member_buy">
				<view class="member_buy_box"  v-for="(item,index) in vipList"
                         :key="item.id"
						 :class="{selected:vipCurrent==item.id}"
						 @click="vipCurrent=item.id ,total_price=item.price,vipTitle=item.title">
					<view class="member_buy_box_year" 
					:class="(index + 1) % vipList.length == 0 ?'displayshow':'displaynone'">年费会员</view>
					<view class="member_buy_box_p1">{{item.title}}</view>
					<view class="member_buy_box_p2">
						<span class="member_buy_box_p2_span1"><span class="member_buy_box_p2_span2">￥</span>{{item.price}}</span>
					</view>
					<view class="member_buy_box_p3">{{item.introduction}}</view>
				</view>
				<!-- <view class="member_buy_box" >
					<view class="member_buy_box_p1">连续包季</view>
					<view class="member_buy_box_p2">￥<span>40</span></view>
					<view class="member_buy_box_p3">每季自动续费 可随时关闭</view>
				</view>
				<view class="member_buy_box" >
					<view class="member_buy_box_p1">连续包年</view>
					<view class="member_buy_box_p2">￥<span>128</span></view>
					<view class="member_buy_box_p3">每季自动续费 可随时关闭</view>
				</view> -->
			</view>
			<view style="clear: both;"></view>
			<view class="member_buy_button" @click="goBuyVip">立即购买</view>
			
			<view class="member_end_p">自动续费服务声明</view>
			<view class="member_end_p2">付款:用户确认购买并付款后记入iTunes账户；</view>
		</view>
	</view>
</template>

<script>
	import {vipList,wxpay,loginD,sendCode} from '@/config/http.js';
	export default {
		data() {
			return {
				swiperHeight:500,
				pic_url:'https://admin.shitutu.com/public/douyinimg/membercard.png',
				vipList:[],
				vipCurrent:1,
				total_price:'',
				vipTitle:'',
				memberData:'',
				liuhaiHeight:3
			}
		},
		onLoad() {
			uni.getSystemInfo({
			    success:  (res) => {    
					// 需要使用箭头函数，swiper 高度才能设置成功
			        // 获取swiperHeight可以获取的高度，窗口高度减去导航栏高度
			        this.swiperHeight = res.windowHeight 
			    }
			});
			this.getVipList()
		},
		onShow:function(){
		    //获取全局设置的变量
		    this.memberData = this.$member.memberObj;
			this.liuhaiHeight = this.memberData.statusBarHeight + 10
		},
		methods: {
			onReturn(){
				uni.navigateBack({
				    delta: 1
				});
			},
			getVipList(){
				vipList().then(res => {
					if(res.data.code == 1){
						this.vipList = res.data.data.list
						this.vipCurrent = this.vipList[0].id
						this.total_price = this.vipList[0].price
						this.vipTitle = this.vipList[0].title
					}
				})
			},
			goBuyVip(){
				console.log(this.memberData)
				if(!this.memberData.id){
					uni.showToast({
					    title: '您还未登陆,请先登陆',
					    duration: 2000
					});
					this.getDYuserinfo();
					return;
				}
				wxpay({
					'openid':this.memberData.openid,
					'price':this.total_price,
					'product_id':this.vipCurrent,
					'user_id':this.memberData.id,
					'subject':'开通会员',
					'body':this.vipTitle,
					'buy_type':1
				}).then(e => {
					let order = JSON.parse(e.data.data.list);
					let order_no = order.trade_no
					if(e.data.code == 1){
					        uni.requestPayment({
								service: 1, // 不拉起字节跳动小程序收银台
								 _debug: 1,
								payChannel: {
					            default_pay_channel: 'alipay' // wx || alipay
								},
								orderInfo: order, // 订单信息
								getOrderStatus(res) {
					            let { out_order_no } = res;
								    return new Promise(function (resolve, reject) {
					                })
								},
								success: (res) => {
									console.log(res)
									if(res.code == 0){
										uni.showToast({
										    title: '支付成功!',
										    duration: 2000
										});
									}
									if(res.code == 1){
										uni.showToast({
										    title: '支付超时',
										    duration: 2000
										});
									}
									if(res.code == 2){
										uni.showToast({
										    title: '支付失败',
										    duration: 2000
										});
									}
									if(res.code == 2){
										uni.showToast({
										    title: '支付失败',
										    duration: 2000
										});
									}
									if(res.code == 4){
										orderQuery({
											'order_no':order_no,
										}).then(e => {
											if(e.data.code == 1){
												uni.showToast({
												    title: '支付成功!',
												    duration: 2000
												});
											}else{
												uni.showToast({
												    title: '支付失败',
												    duration: 2000
												});
												
											}
											
										});
									}
									if(res.code == 9){
										uni.showToast({
										    title: '订单状态未知',
										    duration: 2000
										});
									}
								},
								fail: (res) => {
					            console.log("失败1");
					            console.log(res);  // 错误代码：CD0015 CD0025
					        },
							complete: (res) => {
							    console.log("结束")
							}
							})
							// _this.loadModal = false;
						}
				 })
			},
			getDYuserinfo(){
				var that = this
				uni.login({
					  provider: 'toutiao',//这里服务商名是字节跳动小程序 所以填toutiao
					  success: function (loginRes) {
						  sendCode({
						  	'code':loginRes.code
						  }).then(res => {
							  if(res.data.code == 1){
							   console.log(res);   
						  	that.sessionkey = res.data.data.list.session_key
							that.openid = res.data.data.list.openid
							that.isLoginState = true
							that.getinfo(that.sessionkey)
							}
						   })
						}
					});
			},
			getinfo(sessionkey){
				let that = this
				uni.getUserInfo({
					provider: 'toutiao',
					success: function (infoRes) {
						loginD({
							'openid' : that.openid,
							'avatarUrl' : infoRes.userInfo.avatarUrl,
							'city' : infoRes.userInfo.city,
							'country' : infoRes.userInfo.country,
							'gender' : infoRes.userInfo.gender,
							'language' : infoRes.userInfo.language,
							'nickName' : infoRes.userInfo.nickName,
							'province' : infoRes.userInfo.province,
						}).then(res => {
							if(res.data.code == 0){
								that.$member.setMemberObj(res.data.data.list);
								that.memberData  = that.$member.memberObj
								that.userInfo = that.memberData
								console.log(that.memberData)
								
								that.getMyCollection()
								uni.showToast({
								    title: res.data.msg,
								    duration: 2000
								});
							}else{
								uni.showToast({
								    title: res.data.msg,
								    duration: 2000
								});
							}
						})
					}
			    });
			},
		}
	}
</script>

<style>
	.selected {
	   border: 1px solid #DEB565;
	}
	.displaynone{
		display: none;
	}
	.displayshow{
		display: block;
	}
</style>
