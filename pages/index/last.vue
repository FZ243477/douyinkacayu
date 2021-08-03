<template>
	<view @click="changeTab2" class="indexBody">
		<view class="indexFixed" >
			<view class="liuhaiclass" :style="'height:'+liuhaiHeight+'px'"></view>
		<view class="index_top">软铁素材
			<view class="index_search">
				 <img class="cancel_img" style="margin-top: 5px;" mode="widthFix" 
				 src="https://admin.shitutu.com/public/douyinimg/searchover.png" />
			</view>
		</view>
		</view>
		<view style="height:5rem;width: 100%;"></view>
		<view class="index_c">
			<view class="index_content_c1">
				<view class="index_vip">
					<view class="vip_left">
						<p class="vip_p1">全站通vip</p>
						<p class="vip_p2">开通即享全站素材</p>
					</view>
					 <img class="vip_img" mode="widthFix" src="https://admin.shitutu.com/public/douyinimg/VIP.png"/>
				</view>
				<view class="index_service">
					<view class="vip_left">
						<p class="vip_p1">剪辑服务</p>
						<p class="vip_p2">剪辑生活中的美好</p>
					</view>
					 <img class="vip_img" mode="widthFix" src="https://admin.shitutu.com/public/douyinimg/jianji.png"/>
				</view>
			</view>
			<view>
				<u-tabs name="cate_name" 
				count="tab_count" 
				:list="list" 
				:is-scroll="true" 
				:current="currentTab" 
				active-color="#FFFFFF"
				inactive-color="#5A5873"
				bg-color="#0D0B2D"
				@change="changeTab"></u-tabs>
			</view>
		</view>
		<view class="home_head">
			<view :style="{ height: swiperHeight + 'px' }" v-show="nav_content" class="center_mask home_ref" >
			    <view class="center_mask" v-show="nav_content">
			        <view class="nav_cancel">
			            <img class="cancel_img"  @click="adcancel" mode="widthFix" src="https://admin.shitutu.com/public/douyinimg/cancel.png" />
			        </view>
			        <view class="nav_border"></view>
			        <view class="nav_tabs">
			            <view class="nav_li" v-if="isLoginState" >ID:{{userInfo.nickName}}</view>
			          <!--  <view class="nav_li" v-if="isLoginState" @click="goSeeting">个人中心</view> -->
			            <view class="nav_li" v-if="isLoginState" @click="goDown">下载记录</view>
			            <view class="nav_li" v-else="isLoginState" @click="getDYuserinfo">登录</view>
			            <view class="nav_li" v-if="isLoginState" @tap="goCollection">我的收藏</view>
			        </view>
			        <view class="nav_footer">
						 <navigator  @click="callPhone()" class="call_phone" style="width:8rem;">
			            <img class="call_phone_img"  src="https://admin.shitutu.com/public/douyinimg/phone.png" />
			                        点击联系我们
			            </navigator>
			        </view>
			    </view>
			</view>
			
			<view class="head_top">
			    <img class="top_img1 left_slide_center_nav" v-on:click="adjust()" mode="widthFix" src="https://admin.shitutu.com/public/douyinimg/head_img1.png" @click="ToRequirements2" />
			    <img class="top_img2"  v-on:click="adjust()" mode="widthFix" src="https://admin.shitutu.com/public/douyinimg/logo.png" />
			    <!-- <img class="top_img3"   mode="widthFix" src="https://admin.shitutu.com/public/douyinimg/my.png" /> -->
			    <view style="clear: both;"></view>
			</view>
			<!-- <video :src="video" id="myVideo" style="width: 100%; height:25rem;" controls='false' loop='true' 
			autoplay="true" ></video> -->
			<u-swiper :list="bannerList" style="height:25rem;" >
			</u-swiper>
			  <view class="tab_index"   :style="tabClick == 2 ? '' : 'display:none;'">
			        <view class="tab_index_l" v-for="(item,index) in searchType"
			                     :key="index" :id="item.value"
			                     :class="{tab_active:toSearchType==item.value}"
			                     @click="changeSearchType(item.value,item.label)">
			                    {{item.label}}
			        </view>
			  </view>
			<view class="head_search">
				<view style="position: relative;">
					<view class="head_s_l" @click.stop="!changeTab2" @click="changeTab" :id="toSearchType">
						<span>{{toSearchLabel}}</span>
						<view :style="tabClick == 2 ? '' : 'display:none;'" class="icon-xiangxia1 home_search_icon"></view>
						<view :style="tabClick == 1 ? '' : 'display:none;'" class="icon-xiangshang home_search_icon"></view>
					</view>
					<view class="head_s_l_bor"></view>
					<input type="text" name="s" 
							placeholder-style="font-size:0.8rem;"
							style="font-size: 0.8rem;"
							v-model="searchValue"
							:placeholder="`搜索${(toSearchLabel)}`"
							class="search_text" 
							@keyup.enter="navToSearchResult"
							@input="onKeyInput" />
								<!-- @input.stop="!changeTab2" -->
						
						<!-- 	@click.stop="!changeTab2" -->
							<!-- @click="showHistory"-->
					<view type="button" @click="navToSearchResult" class="search_submit">
						<img mode="widthFix" src="https://admin.shitutu.com/public/douyinimg/search.png" alt="" class="button_img">
					</view>
					<view class="history_box" :class="{display_show:tabHistory==1}" >
			            <view class="history_box_content">
			                <view class="history_box_title">
			                    <span class="OLt9U">最近搜索</span>
			                     <span class="b5nQ3" @click="deleteHistory">清除所有</span>
			                </view>
			                <view class="history_item">
			                    <view  v-for="(item,index) in historyList" :key="index" :title="item" @click="quickNav(item)" class="_4enLb">
			                        <span class="_34evo">{{item}}</span>
			                                <!--<van-icon name="cross" style="top: 0.07rem;padding-right: 0.1rem;"/>-->
			                     </view>
			                </view>
			            </view>
			        </view>
			        <view style="clear: both;"></view>		
				</view>
			</view>
		</view>
		<view class="hidden_title">
			<p class="hidden_title_p">热门分类</p> 
			<view class="title_border"></view>
		</view>
		
		<view class="bl_1">
		    <view class="bl_box"   v-for="(image, index) in classify" :key="index">
		       <p class="bl_box_title_p">{{image.name}}</p>
		            <view @tap="goList(image.id)" class="bl_box_title"></view>
		                <img  class="class_img2"  :src="image.url"  />
		    </view>
		    <view style="clear: both;"></view>
		</view>
				
		<!-- <view class="bl_more" >查看更多</view> -->
		        
		<view class="bl_2" style="margin-top: 1.2rem;">
		   <img  style="width:100%;height:auto;" mode="widthFix" src="https://admin.shitutu.com/public/douyinimg/01(4).png" />
		</view>
		
		<view class="hidden_title"  >
		    <p class="hidden_title_p">合作品牌</p>
		     <view class="title_border"></view>
		</view>
				
		<view class="bl_3" >
		    <view class="bl_3_box" v-for="(image, index) in partner" :key="index">
		        <img class="bl_img2"  mode="widthFix" :src="image.images"  />
		    </view>
		    <view style="clear: both;"></view>
		</view>
		
		<view class="footer" >
		    <view class="footer_content">
		       <navigator  @click="callPhone()"  class="call_phone2">
		        <img class="call_phone_img2"  src="https://admin.shitutu.com/public/douyinimg/phone.png" />
		                    点击联系我们
		        </navigator>
		        <img class="footer_img1" mode="widthFix" :src="messageContent.pic2"/>
		        <view style="clear: both;margin-bottom: 0.6rem;"></view>
		        <view class="footer_content_2">
		            <p>{{messageContent.title}}</p>
		            <p>{{messageContent.title1}}</p>
		            <p>{{messageContent.title2}}</p>
		            <p>{{messageContent.title3}}</p>
		            <p>{{messageContent.title4}}</p>
		        </view>
		        <img class="footer_img2"  mode="widthFix" :src="messageContent.pic" />
		        <view style="clear: both;"></view>
		    </view>
		</view>
				
		<!-- 	<view  class="homeTab">
			<u-tabs name="cate_name" count="tab_count" :list="list" :is-scroll="true" :current="currentTab" @change="changeTab"></u-tabs>
			</view>
			<view class="wrap">
					<u-swiper-my  :list="banner" :title="false" :autoplay="false" mode="none" :effect3d="true">
				
					</u-swiper-my>
			</view>
			<view class="goBuy" @click="goB" >立即下载</view> -->
	</view>
	
</template>

<script>
	import yyVideoPlayer from '@/components/yy-video-player/yy-video-player.nvue';
	import {banner,headnav,chooseNav,sendCode,loginD,alipay,newIndex} from '@/config/http.js';
	export default {
		data() {
			return {
				video:'https://cdn.shitutu.com/70430.mp4',
				title: '食图图视频素材库',
				list: [
					{
						name: '待收货'
					}, {
						name: '待付款'
					}, {
						name: '待评价',
					}],
				currentTab: 0,
				banner: [],
				navId:1,
				myData:'',
				sessionkey:'',
				openid:'',
				bannerList:[{
						image: 'https://image.shitutu.com/uploads/20200815/ba60ea5b244142569b7604315c1f30f8.jpg_artwork',
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
				classify:[],
				messageContent:'',
				partner:[],
				searchType:[
					{
					    value: "1",
					    label: "视频"
					},
					{
					    value: "2",
					    label: "图片"
					},
				    {
				        value: "3",
				        label: "设计"
				    },
				        ],
				toSearchType:1,
				toSearchLabel:"视频",
				tabClick:1,
				tabHistory:2,
				historyList:[],
				searchValue:'',
				nav_content:false,
				dis_requ2:'dis_requ',
				requirements2:false,
				isLoginState:false,
				swiperHeight:500,
				userInfo:',',
				platformType:[],
				liuhaiHeight:3
			}
		},
		onLoad() {
			    let platform=uni.getSystemInfoSync().platform
				this.platformType.platform = platform
			    if(platform=='ios'){
			          console.log('我是iOS')
			    }else if(platform=='android'){
			          console.log('我是安卓')
			    }
				this.$member.setMemberObj(this.platformType);
				this.memberData  = this.$member.memberObj
			uni.getSystemInfo({
			    success:  (res) => {     // 需要使用箭头函数，swiper 高度才能设置成功
			        // 获取swiperHeight可以获取的高度，窗口高度减去导航栏高度
			        this.swiperHeight = res.windowHeight - uni.upx2px(25)
			        console.log(this.swiperHeight)
			    }
			});
		},
		onShow:function(){
		    //获取全局设置的变量
		    this.memberData = this.$member.memberObj;
			this.liuhaiHeight = this.memberData.statusBarHeight + 10
		    console.log(this.memberData);
		    //输出值{name:'初始姓名'}
		},
		methods: {
			adcancel(){
			    if(this.nav_content == true){
			        this.nav_content = false;
			    }else{
			        this.nav_content = true;
			    }
			},
			adjust:function(){
			    if(this.nav_content == true ){
			        this.nav_content = false;
			    }else{
			        this.nav_content = true;
			    }
			},
			ToRequirements2(){
			    // && this.isWeixin
			    if(this.requirements2 ==false){
			        this.dis_requ2 = "dis_requ_show";
			        this.requirements2 =true
			    }else{
			        this.dis_requ2 = "dis_requ";
			        this.requirements2 =false
			    }
			},
			// changeTabNav(index) {
			// 				this.currentTab = index;
			// 				this.navId = this.list[index]['id']
			// 			chooseNav({
			// 				'id':this.navId
			// 			}).then(res => {
			// 				this.banner = res.data.data.list
			// 			   console.log(res.data.data.list);
			// 			 })
			// 			},
			 getData() {
				chooseNav().then(res => {
						this.banner = res.data.data.list
				})
				headnav().then(res => {
				 	this.classify = res.data.data.list
				})
				banner().then(res => {
				 	this.bannerList = res.data.data.list
				})
				newIndex().then(res => {
				 	if (res.data.code == 1) {
						 this.messageContent = res.data.data.messageContent;
						  this.partner = res.data.data.partner;
						  this.partner.splice(1,1)
				 	}else {
				 	    console.log(res.msg);
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
			goB(){
				alipay().then(e => {
					let order = JSON.parse(e.data.data.list);
					console.log(e,221)
					if(e.data.code == 1){
						uni.requestPayment({
							provider: 'toutiao',
							service: 4, // 不拉起字节跳动小程序收银台
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
								console.log("成功");
								console.log(res);
							},
							fail: (res) => {
								console.log("失败");
								console.log(res);  // 错误代码：CD0015 CD0025
							}
						})
						// _this.loadModal = false;
					}

				})
			},
			changeSearchType(item,label){
				this.toSearchType = item
				this.toSearchLabel = label
			},
			goList(e){
				uni.navigateTo({
					url: '../list/video?id='+e,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			goDown(){
				uni.navigateTo({
					url: '../my/download',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			goCollection(){
				uni.navigateTo({
					url: '../my/collection',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			stop(){
				window.event? window.event.cancelBubble = true : e.stopPropagation();
			},
			changeTab(){
				var that = this;
				if(that.tabClick == 1){
				    that.tabClick = 2
					console.log(123)
					uni.showToast({
						title: that.tabClick,
						icon:'none',
						duration: 2000
						});
				    }
				if(that.tabHistory == 1){
				    that.tabHistory = 2
				}
			},
			changeTab2(){
				if(this.tabClick ==2){
					this.tabClick = 1
				}
				if(this.tabHistory ==1){
					this.tabHistory = 2
				}
			},
			showHistory(){
				if(this.tabHistory ==2){
				    this.tabHistory = 1
				}
				if(this.tabClick ==2){
				    this.tabClick = 1
				}
				console.log(this.historyList);
			},
			onKeyInput:function(event) {  
				this.searchValue = event.target.value
			},
			navToSearchResult(){
				var that = this;
				console.log(that.searchValue,222);
				if(that.tabHistory ==2){
					that.tabHistory = 1
				}
				if(that.tabClick ==2){
					that.tabClick = 1
				}
				if(that.toSearchType == 3 || that.toSearchType == 2){
					uni.showToast({
						title: '开发中，敬请期待！',
						icon:'none',
						duration: 2000
					});
				    return;
				}
				if(!that.searchValue){
					uni.showToast({
						title: '请输入搜索内容！',
						icon:'none',
						duration: 2000
					});
				    return;
				}
				if (!that.historyList.includes(that.searchValue)) {
					that.historyList.unshift(that.searchValue);
					uni.setStorage({
						key: 'historyList',
						data: JSON.stringify(that.historyList)
					});
				}else {
					//有搜索记录，删除之前的旧记录，将新搜索值重新push到数组首位
					let i = that.historyList.indexOf(that.searchValue);
					that.historyList.splice(i, 1);
					that.historyList.unshift(that.searchValue);
					uni.showToast({
						title: '不能重复添加'
					});
					uni.setStorage({
						key: 'historyList',
						data: JSON.stringify(that.historyList)
					});
					if(that.toSearchType == 1){
						uni.navigateTo({
							url: '/pages/list/index?name='+that.searchValue+'&type='+that.toSearchType,
						});
					}
					if(that.toSearchType == 2){
						uni.navigateTo({
							url: '/pages/list/index?name='+that.searchValue+'&type='+that.toSearchType,
						});
					}
				}
			},
			deleteHistory(){
				uni.removeStorage({key: 'historyList'});
				this.historyList=[];
			},
			callPhone(){
				uni.makePhoneCall({
					// 手机号
					phoneNumber: this.messageContent.phone, 
					// 成功回调
					success: (res) => {
						console.log('调用成功!')	
					},
					// 失败回调
					fail: (res) => {
						console.log('调用失败!')
					}
				});
			}
		},
		created() {
			this.getData();
			this.getDYuserinfo();
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}
	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
	.homeTab{
		width: 80%;
		margin: 0 auto;
	}
		.wrap {
			padding: 40rpx;
		}
		.goBuy{
			width: 60%;
			margin: 0 auto;
			background-color: #009DFB;
			color: #FFFFFF;
			font-size: 30rpx;
			letter-spacing: 10rpx;
			text-align: center;
			height:90rpx;
			line-height: 90rpx;
			border-radius: 50rpx;
		}
		 .placeholder-class{
			 font-size: 2rem !important;
		 }
</style>
