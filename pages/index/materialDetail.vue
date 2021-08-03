<template>
	<view  class="indexBody" :style="'min-height:'+swiperHeight+'px'" >
		<!-- <view class="indexFixed" >
			<view class="liuhaiclass" :style="'height:'+liuhaiHeight+'px'"></view>
		<view class="index_top">素材包
			<view class="index_search" style="width:50px;" @click="goSearch">
				 <img class="search_img" style="margin-top: 5px;" mode="widthFix" 
				 src="https://admin.shitutu.com/public/douyinimg/searchover.png" />
			</view>
		</view>
		</view>
		<view style="height:3rem;width: 100%;"></view> -->
		<view class="m_d_b"  @click='onReturn' :style="'top:'+liuhaiHeight+'px'" >
			 <img class="m_d_b_img"  mode="widthFix" 
			 src="https://admin.shitutu.com/public/douyinimg/deBack.png" />
		</view>
		<view class="index_c" :style="{height:swiperHeight}">
		<view class="material_detail_box" style="padding-top: 0.5rem;">	
			<view class="material_detail_box_banner">
				<u-swiper :list="list" :height="14" :indicator-pos="topLeft"></u-swiper>
			</view>
			<view class="m_d_b_c">
				<view class="m_d_b_c_title">{{detailContent.title}}</view>
				<view class="m_d_b_c_price">￥{{detailContent.price}}</view>
				<view class="m_d_b_c_right">
					<view class="material_detail_box_right" @click="buyMaterial(detailContent.id,detailContent.price,detailContent.title)">
						<!-- @click="buyMaterial(image.id,image.price,image.title)" -->
						<view class="material_detail_box_right_content" >
							购买
						</view>
					</view>
					<view class="material_detail_box_right_alerday">
						已售{{detailContent.buynum}}
					</view>
					<view style="clear: both;"></view>
				</view>
			
				<view style="clear: both;"></view>
			</view>
				<view class="d_p_t">详情信息</view>
			<view class="detail_pic">
				<view v-for="(image, index) in arr2" :key="index">
				<img class="detail_pic" style="margin-top: 5px;" mode="widthFix"
				:src="image.image"
				 />
				</view>
			</view>
			<view class="d_p_t">推荐列表</view>
			<view class="index_video" style="margin-top: 0;padding-top: 0;">
						<view class="u-col-box-2" v-for="(image, index) in recommend" :key="index" >
						<view class="">
							<img mode="widthFix" class="index_video_box_2" 
							:src="image.pic" alt="">
							<view>
								<view class="material_box_left">
									<p class="material_box_p">{{image.title}}视频素材</p>
									<p class="material_box_p">￥{{image.price}}</p>
								</view>
								<view class="material_box_right" >
									<view class="material_box_right_content" @click="goDetail(image.id)">
										查看
									</view>
								</view>
							</view>
						</view>
						<view style="clear: both;"></view>
						</view>
							<view style="clear: both;"></view>
			
			</view>
		</view>
		
		</view>
		<view class="screen_shadow" v-show="perfectShow" :style="'height:'+swiperHeight+'px'">
			<view class="success_box" :style="{backgroundImage: 'url(' + pic_url + ')'}">
				<view class="success_box_title">成功购买</view>
				<view class="success_box_title2">本次购买如有任何问题请联系客服</view>
				<view class="success_box_border"></view>
				<img class="kefuqrcode" mode="widthFix" src="https://admin.shitutu.com/public/douyinimg/kefuqrcode.png" />
				<view class="success_box_title2">客服微信</view>
				<view class="success_box_input">
					<label for="name">预留邮箱：</label>
					<input v-model="email" id="name" type="text"/>
					<view style="clear: both;"></view>
				</view>
				<view class="success_box_input success_box_input2">
					<label for="name">预留电话：</label>
					<input v-model="phone" id="name" type="text"/>
					<view style="clear: both;"></view>
				</view>
				<view class="success_box_input success_box_input2">
					<label for="name">预留姓名：</label>
					<input v-model="name" id="name" type="text"/>
					<view style="clear: both;"></view>
				</view>
				<view class="success_box_button" @click="gopPerfect">完成</view>
				<view class="success_box_title2" >客服电话：0371-8808-888</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {material,wxpay,sendCode,loginD,perfect,materialDetail} from '@/config/http.js';
	export default {
		data() {
			return {
				swiperHeight:500,
				memberData:'',
				productId:'',
				price:'',
				title:'',
				pic_url:'https://admin.shitutu.com/public/douyinimg/tuoyuan.png',
				email:'',
				phone:'',
				name:'',
				orderNo:'',
				perfectShow:false,
				liuhaiHeight:3,
				materialId:0,
				list: [{
						image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
						title: '昨夜星辰昨夜风，画楼西畔桂堂东'
						},
						{
							image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
							title: '身无彩凤双飞翼，心有灵犀一点通'
						},
						{
							image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
							title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
						}
					],
				detailContent:'',
				recommend:'',
				arr2:''
			}
		},
	
		onLoad(res) {
			this.materialId = res.id;
			this.getmaterialDetail(this.materialId);
			uni.getSystemInfo({
			    success:  (res) => {     // 需要使用箭头函数，swiper 高度才能设置成功
			        // 获取swiperHeight可以获取的高度，窗口高度减去导航栏高度
			        this.swiperHeight = res.windowHeight 
			    }
			});
		},
		onShow:function(){
		    //获取全局设置的变量
		    this.memberData = this.$member.memberObj;
			this.liuhaiHeight = this.memberData.statusBarHeight + 5
		},
		methods: {
			goDetail(e){
				uni.navigateTo({
					url: '../index/materialDetail?id='+e,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			getmaterialDetail(e){
				materialDetail({
					'id':e,
				}).then(res => {
					console.log(res)
					if(res.data.code == 1){
						this.detailContent = res.data.data.list.list
						this.recommend = res.data.data.list.recommend
						this.list = res.data.data.list.arr
						this.arr2 = res.data.data.list.arr2
						console.log(this.arr2)
					}
				})
			},
			onReturn(){
				uni.navigateBack({
				    delta: 1
				});
			},
			goSearch(){
				uni.navigateTo({
					url: '../index/search',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			PhoneNum(value) {
				return /^1[23456789]\d{9}$/.test(value);
			},
			Email(value) {
				return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
			},
			 getData() {
				 
			 },
			 gopPerfect(){
				if(!this.email || this.Email(this.email) == false){
					uni.showToast({
						title: '邮箱格式错误！',
						duration: 2000
					});
					return;
				}
				if(!this.phone || this.PhoneNum(this.phone) == false){
					uni.showToast({
					    title: '手机号码格式错误！',
					    duration: 2000
					});
					return;
				}
				if(!this.name){
					uni.showToast({
					    title: '请填写预留名称！',
					    duration: 2000
					});
					return;
				}
				 perfect({
				 	'order_no':this.orderNo,
				 	'user_id':this.$member.memberObj.id,
					'email':this.email,
					'phone':this.phone,
					'name':this.name
				 }).then(res => {
					 if(res.data.code == 1){
						 this.perfectShow = false
						 this.name = ''
						 this.phone = ''
						 this.email = ''
						 this.orderNo = ''
						 uni.showToast({
						     title: res.data.msg,
						     duration: 2000
						 });
						this.getmaterialDetail(this.detailContent.id);
					 }
				 })
			 },
			 buyMaterial(e,f,g){
				 if(JSON.stringify(this.memberData.vip)=='{}'){
				 	uni.showToast({
				 	    title: '请先授权登录！',
				 	    duration: 2000
				 	});
				 	this.getDYuserinfo();
				 	return;
				 }
				 this.productId = e;
				 this.price = f;
				 this.title = g;
				 wxpay({
				 	'openid':this.memberData.openid,
				 	'price':0.01,
				 	'product_id':this.productId,
				 	'user_id':this.memberData.id,
				 	'subject':'购买素材包',
				 	'body': this.title,
				 	'buy_type':2
				 }).then(e => {
				 	let order = JSON.parse(e.data.data.list);
				 	let order_no = order.trade_no
					this.orderNo = order_no
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
										this.perfectShow = true
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
												this.perfectShow = true
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
		},
		created() {
			this.getData();
		}
	}
</script>

<style scoped lang="scss">

</style>
