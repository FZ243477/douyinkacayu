<template >
	<view @click="changeTab2" class="indexBody" :style="'min-height:'+swiperHeight+'px'" >
		<view class="indexFixed" >
			<view class="liuhaiclass" :style="'height:'+liuhaiHeight+'px'"></view>
		<view class="index_top" id="indexTop">软铁素材
			<view class="index_search" style="width:50px;" @click="goSearch">
				 <img class="search_img" style="margin-top: 5px;" mode="widthFix" 
				 src="https://admin.shitutu.com/public/douyinimg/searchover.png" />
			</view>
		
		</view>
		<view class="index_c"  style="margin-top: 0;">
			<view class="index_content_c1">
				<view class="index_vip" @click="goBuyVip">
					<view class="vip_left">
						<p class="vip_p1">全站通VIP</p>
						<p class="vip_p2">开通即享全站素材</p>
					</view>
					 <img class="vip_img" mode="widthFix" src="https://admin.shitutu.com/public/douyinimg/VIP.png"/>
				</view>
				<view class="index_service" @click="goClipService">
					<view class="vip_left">
						<p class="vip_p1">剪辑服务</p>
						<p class="vip_p2">剪辑生活中的美好</p>
					</view>
					 <img class="vip_img" mode="widthFix" src="https://admin.shitutu.com/public/douyinimg/jianji.png"/>
				</view>
			</view>
			<view class="u_tabs_view" id="scrollView" style="background-color: rgb(8, 9, 30);">
				<u-tabs name="cate_name" 
				count="tab_count" 
				:list="list" 
				:is-scroll="true" 
				:current="currentTab" 
				font-size="36"
				bar-width="70"
				bold="false"
				font-family="PingFang-SC-Medium"
				active-color="#FFFFFF"
				inactive-color="#5A5873"
				bg-color="#08091e"
				@change="changeTabNav"></u-tabs>
			</view>
		</view>
		<view style="clear: both;"></view>
		</view>
		<view class="index_c" :style="{height:swiperHeight}">
			<view class="indexFixedheight" :style="'padding-top:'+liuhaiHeight+'px'"></view>
			<view class="index_video" >
						<view class="u-col-box" v-for="(image, index) in imgList" :key="index" >
						<view class="demo-layout bg-purple" @tap="goDetail(image.id,image.vip)">
							<view class="vip_type" :class="image.vip == 1 ?'displayshow':'displaynone'">
								VIP
							</view>
							<view class="free_type" :class="image.vip == 0 ?'displayshow':'displaynone'">
								免费
							</view>
							<view class="index_video_box_img_box"> 
									<img mode="widthFix" class="index_video_box_img" :src="image.pic" alt="">
							</view>
							<p class="index_video_box_p">{{image.title}}</p>
						</view>
						</view>
				
				
				<view style="clear: both;"></view>
			</view>
			<view style="clear: both;"></view>
			    <uni-load-more :status="loadStatus" ></uni-load-more>
			</view>
			</view>
		
	</view>
	
</template>

<script>
	import yyVideoPlayer from '@/components/yy-video-player/yy-video-player.nvue';
	import {banner,headnav,chooseNav,sendCode,loginD,alipay,newIndex,videoList} from '@/config/http.js';
	export default {
		data() {
			return {
				video:'https://cdn.shitutu.com/70430.mp4',
				title: '食图图视频素材库',
				list: [],
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
				imgList:[],
				page:1,
				pagesize:6,
				loadStatus:'loading',  //加载样式：more-加载前样式，loading-加载中样式，nomore-没有数据样式
				isLoadMore:false,  //是否加载中
				noSearch:false,
				isTop :0,
				liuhaiHeight:3
			}
		},
		mounted() {
			
		},
		onPageScroll:function(e){
		
			if(e.scrollTop > this.myScroll){
			this.isTop = 1
			}else{
			this.isTop = 0
			}
		},
		onLoad() {
			    let platform=uni.getSystemInfoSync().platform
				this.platformType.platform = platform
				this.$member.setMemberObj(this.platformType);
				this.memberData  = this.$member.memberObj
				this.liuhaiHeight = this.memberData.statusBarHeight + 10
				// if(this.memberData.statusBarHeight > 40){
				// 		this.indexFixedHeight = 12.2
				// 		this.liuhaiHeight = 3
				// }else{
				// 	this.indexFixedHeight = 10
				// 	this.liuhaiHeight = 1.2
				// }
			uni.getSystemInfo({
			    success:  (res) => {     // 需要使用箭头函数，swiper 高度才能设置成功
			        // 获取swiperHeight可以获取的高度，窗口高度减去导航栏高度
			        this.swiperHeight = res.windowHeight 
					// let info = uni.createSelectorQuery().select(".indexFixed");
					// 　　 info.boundingClientRect(function(data) { //data - 各种参数
					// 	 this.indexFixedHeight = data.height + 15
					// }).exec()
			    }
			});
			
		},
		onReachBottom(){  //上拉触底函数
			if(!this.isLoadMore){  //此处判断，上锁，防止重复请求
			    this.isLoadMore=true
			    this.page+=1
			    this.getVideoList()
			}
		},
		onShow:function(){
		    //获取全局设置的变量
		    this.memberData = this.$member.memberObj;
			console.log(this.memberData,2225)
		
		
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
			goClipService(){
				uni.showToast({
					title: '开发中，敬请期待！',
					icon:'none',
					duration: 2000
				});
			},	
			changeTabNav(index) {
				this.currentTab = index;
				this.navId = this.list[index]['id']
				this.imgList = [],
				this.loadStatus ='loading'
				this.isLoadMore = false
				this.noSearch = false
				this.page = 1
				this.getVideoList()
			},
			getVideoList(){
				console.log(this.navId,111)
				videoList({
					'page':this.page,
					'pageSize':this.pagesize,
					'cateId': this.navId,
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
			 getData() {
				
				chooseNav().then(res => {
						this.banner = res.data.data.list
				})
				headnav().then(res => {
				 	this.classify = res.data.data.list
					this.list = res.data.data.list
					this.navId = this.list[0]['id']
					this.getVideoList()
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
			// changeTab(){
			// 	var that = this;
			// 	if(that.tabClick == 1){
			// 	    that.tabClick = 2
			// 		console.log(123)
			// 		uni.showToast({
			// 			title: that.tabClick,
			// 			icon:'none',
			// 			duration: 2000
			// 			});
			// 	    }
			// 	if(that.tabHistory == 1){
			// 	    that.tabHistory = 2
			// 	}
			// },
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
			},
			onKeyInput:function(event) {  
				this.searchValue = event.target.value
			},
			navToSearchResult(){
				var that = this;
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

<style scoped lang="scss">
	.wrap {
		padding: 24rpx ;
	}

	.u-row {
		margin: 40px 0;border-radius: 10px;
	}
	
	.demo-layout {
		height: 340rpx;
		margin-bottom: 10px;
		border-radius: 5px;
		position: relative;
	}


	.displaynone{
		display: none;
	}
	.displayshow{
		display: block;
	}
	.titleNview-placing {
	        height: var(--status-bar-height);
	        padding-top: 44px;
	        box-sizing: content-box;
	    }
	
</style>
