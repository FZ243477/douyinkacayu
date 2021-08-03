<template>
	<view  class="indexBody" :style="'min-height:'+swiperHeight+'px'" >
		<view class="indexFixed" >
			<view class="liuhaiclass" :style="'height:'+liuhaiHeight+'px'"></view>
		<view class="index_top">素材包
			<view class="index_search" style="width:50px;" @click="goSearch">
				 <img class="search_img" style="margin-top: 5px;" mode="widthFix" 
				 src="https://admin.shitutu.com/public/douyinimg/searchover.png" />
			</view>
		</view>
		</view>

		<view style="height:4rem;width: 100%;"></view>
			<view class="index_c" :style="{height:swiperHeight}">
		<view class="index_video">	
					<view class="u-col-box-2" v-for="(image, index) in imgList" :key="index" >
						<img mode="widthFix" class="index_video_box_2" 
						:src="image.pic" alt="">
						<view>
							<view class="material_box_left">
								<p class="material_box_p">{{image.title}}</p>
								<p class="material_box_p">￥{{image.price}}</p>
							</view>
							<view class="material_box_right" >
								<!-- @click="buyMaterial(image.id,image.price,image.title)" -->
								<view class="material_box_right_content" @click="goDetail(image.id)">
									查看
								</view>
							</view>
						</view>
					<view style="clear: both;"></view>
					</view>
						<view style="clear: both;"></view>
		
		</view>
		<view v-show="isLoadMore">
		    <uni-load-more :status="loadStatus" style="text-align: center;"></uni-load-more>
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
	import {material,wxpay,perfect} from '@/config/http.js';
	export default {
		data() {
			return {
				swiperHeight:500,
				page:1,
				pagesize:8,
				loadStatus:'loading',  //加载样式：more-加载前样式，loading-加载中样式，nomore-没有数据样式
				isLoadMore:false,  //是否加载中
				noSearch:false,
				imgList:[],
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
				liuhaiHeight:3
			}
		},
		onLoad() {
			uni.getSystemInfo({
			    success:  (res) => {     // 需要使用箭头函数，swiper 高度才能设置成功
			        // 获取swiperHeight可以获取的高度，窗口高度减去导航栏高度
			        this.swiperHeight = res.windowHeight 
			        console.log(this.swiperHeight)
			    }
			});
		},
		onShow:function(){
		    //获取全局设置的变量
		    this.memberData = this.$member.memberObj;
			this.liuhaiHeight = this.memberData.statusBarHeight + 10
		},
		onReachBottom(){  //上拉触底函数
			if(!this.isLoadMore){  //此处判断，上锁，防止重复请求
			    this.isLoadMore=true
			    this.page+=1
			    this.getVideoList()
			}
		},
		methods: {
			goDetail(e){
				if(this.memberData.platform=='ios'){
					uni.showToast({
						title: 'IOS端暂不支持！',
						icon:'none',
						duration: 2000
					});
					return;
				}
				uni.navigateTo({
					url: '../index/materialDetail?id='+e,
					success: res => {},
					fail: () => {},
					complete: () => {}
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
				  this.getVideoList()
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
					 }
				 })
			 },
			 buyMaterial(e,f,g){
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
			getVideoList(){
				material({
					'page':this.page,
					'pageSize':this.pagesize,
				}).then(res => {
					if(res.data.code == 1){
						this.imgList = this.imgList.concat(res.data.data.list.list)
						if(res.data.data.list.list.length<this.pagesize){  //判断接口返回数据量小于请求数据量，则表示此为最后一页
						    this.isLoadMore=true								 
						    this.loadStatus='nomore'
						}else{
						    this.isLoadMore=false
						}
						this.searchCount = res.data.data.list.totalCount
						if(this.searchCount==0){
							this.noSearch = true
						}
					}else{
						 uni.showToast({title:res.data.msg,icon:'none'})
						    this.isLoadMore=false
						    if(this.page>1){
						        this.page-=1
						    }
					}
				 })
			},
		},
		created() {
			this.getData();
		}
	}
</script>

<style scoped lang="scss">

</style>
