<template>
	<view  class="indexBody" :style="'min-height:'+swiperHeight+'px'" >
		<view class="indexFixed" >
			<view class="liuhaiclass" :style="'height:'+liuhaiHeight+'px'"></view>
		<view class="index_top">搜索
			<view class="index_search">
				 <img class="cancel_img" 
				  mode="widthFix"   @click='onReturn'
				 src="https://admin.shitutu.com/public/douyinimg/back.png" />
			</view>
		</view>
		<view class="index_c" style="margin-top: 0;">
		<view class="search_box">
			<input type="text" class="search_input" v-model="title" placeholder="请输入关键字" 
			 @confirm="toSearch()"
			placeholder-style="font-size: 14px;
				font-family: PingFang SC;
				font-weight: 400;
				color: #444444;" >
			<view class="search_cancel"  @click='onReturn'>取消</view>
			<view style="clear: both;"></view>
		</view>
			<u-tabs name="cate_name"
			count="tab_count" 
			:list="list" 
			:is-scroll="true" 
			:current="currentTab" 
			active-color="#FFFFFF"
			inactive-color="#5A5873"
			bg-color="#08091e"
			@change="changeTabNav"
			></u-tabs>
		</view>
		</view>
		<view style="height:9.5rem;width: 100%;"></view>
		<view class="index_c" :style="{height:swiperHeight}">
		
					<view class="index_video" v-show="typeId == 1">
						
						<view class="u-col-box" v-for="(image, index) in imgList" :key="index" >
								<view class="demo-layout bg-purple" @tap="goDetail(image.id,image.vip)">
									<view class="vip_type" :class="image.vip == 1 ?'displayshow':'displaynone'">
										VIP
									</view>
									<view class="free_type" :class="image.vip == 0 ?'displayshow':'displaynone'">
										免费
									</view>
										<img mode="widthFix" class="index_video_box_img" :src="image.pic" alt="">
									<p class="index_video_box_p">{{image.title}}1</p>
								</view>
								</view>
						
						<view style="clear: both;"></view>
					
						<view style="clear: both;"></view>
						
						
					</view>	
				
				<view class="index_video" v-show="typeId == 2">
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
										<view class="material_box_right_content" @click="goMaterialDetail(image.id)">
											查看
										</view>
									</view>
								</view>
							<view style="clear: both;"></view>
							</view>
								<view style="clear: both;"></view>
				
				</view>
				
				<!-- 	<view class="index_video" v-show="typeId == 2">
						<view class="u-col-box" v-for="(image, index) in imgList" :key="index" >
								<view class="demo-layout bg-purple" @tap="goMaterialDetail(image.id)">
										<img mode="widthFix" class="index_video_box_img" :src="image.pic" alt="">
									<p class="index_video_box_p">{{image.title}}</p>
								</view>
								</view>
						
						<view style="clear: both;"></view>
						
						<view style="clear: both;"></view>
					</view> -->
					<view v-show="isLoadMore" style="width: 40%;margin-left: 30%;text-align: center;">
						<!-- //loading加载提示处 -->
					    <uni-load-more :status="loadStatus"></uni-load-more>
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
							<view class="success_box_title2" style="margin-top: 25px;">客服电话：0371-8808-888</view>
						</view>
					</view>
		</view>
	</view>
</template>

<script>
	import {searchList,wxpay,perfect} from '@/config/http.js';
	export default {
		data() {
			return {
				swiperHeight:500,
				pic_url:'https://admin.shitutu.com/public/douyinimg/mycarda.png',
				list: [
					{
						name: '视频',
						typeId:1
					}, 
					{
						name: '素材包',
						typeId:2
					},
					],
				currentTab: 0,
				imgList:[],
				title:'',
				typeId:1,
				page:1,
				pagesize:8,
				loadStatus:'loading',  //加载样式：more-加载前样式，loading-加载中样式，nomore-没有数据样式
				isLoadMore:false,  //是否加载中
				noSearch:false,
				liuhaiHeight:3
			}
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
			toSearch(){
				this.typeId = 1,
				this.imgList = [],
				this.loadStatus ='loading'
				this.isLoadMore = false
				this.noSearch = false
				this.page = 1
				this.getVideoList()
			},
			changeTabNav(index) {
				this.currentTab = index;
				this.typeId = this.list[index]['typeId']
				this.imgList = [],
				this.loadStatus ='loading'
				this.isLoadMore = false
				this.noSearch = false
				this.page = 1
				if(!this.title){
					
				}else{
					this.getVideoList()
				}
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
				searchList({
					'page':this.page,
					'pageSize':this.pagesize,
					'typeId': this.typeId,
					'title':this.title
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
			goDetail(e,f){
				if(this.memberData.platform=='ios' && f == '1'){
					uni.showToast({
						title: 'IOS端暂不支持！',
						icon:'none',
						duration: 2000
					});
					return;
				}
				uni.navigateTo({
				    url: '../list/buyDetail?id='+e,
				    success: res => {},
				    fail: () => {},
				    complete: () => {}
				});
			},
			goMaterialDetail(e){
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
			}
		},
		created() {
			
		}
	
	}
</script>

<style scoped lang="scss">
	.wrap {
		padding: 24rpx ;
	}

	.u-row {
		margin: 80px 0;
	}

	.demo-layout {
		height: 340rpx;
		margin-bottom: 20px;
		background: #080A42;
		border-radius: 10px;
		position: relative;
	}

	.bg-purple {
		background:  #080A42;
	}

	.bg-purple-light {
		background:  #080A42;
	}

	.bg-purple-dark {
		background:  #080A42;
	}
	.displaynone{
		display: none;
	}
	.displayshow{
		display: block;
	}
</style>
