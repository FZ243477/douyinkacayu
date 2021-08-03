<template>
	 <view class="content" style="width: 100%;  
       height: 100%;  
       overflow: hidden;  ">
	    <view class="banner" style="text-align: center;">
			<yy-video-player 
					  :auto-play="true" 
					  :url="detailList.video"  
					  :poster="detailList.pic" 
					  :danmu-list="danmuList"  
					  :show-back-btn="false"
					  :show-download-btn="false"
					  style="width: 100%;"
			></yy-video-player>
	        <img src="" style="width:90%;margin-left:5%;height:auto !important;"/>
	        <view style="clear: both;"></view>
	    </view>
		<view class="down_now" @click="goDown">立即下载</view>
		<view class="down_title_box" :style="'padding-top:'+liuhaiHeight+'px'">
			<img class="cancel_img" 
			style="margin-top: 5px;width: 0.7rem;float: left;" 
			@click='onReturn'
			mode="widthFix" src="https://admin.shitutu.com/public/douyinimg/back.png" />
			<view class="down_title">{{detailList.title}}</view>
		</view>
				
	</view> 
</template>

<script>
	 import yyVideoPlayer from '@/components/yy-video-player/yy-video-player.nvue';
	 import {videoDetail,alipay,collection,sendCode,loginD,isBuy,chooseNav,wxpay,orderQuery,vipStatus} from '@/config/http.js';
	 export default {
		 onShareAppMessage(res) {
		     if (res.from === 'button') {// 来自页面内分享按钮
		       console.log(res.target)
		     }
		     return {
		       title: '咔嚓鱼视频素材库',
		       path: '/pages/index/index'
		     }
		   },
		  components: {
		       yyVideoPlayer
		   },
		   data() {
		   	return {
				url:'https://cdn.shitutu.com/1607653323water.mp4',
				poster:'',
				detailList:[],
				buyTitle:'购买视频',
				isBuy:false,
				banner:'',
				price:'',
				memberData:''
				}
			},
			onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
				this.videoId = option.id;
				// this.videoId = 24;
			},
			onShow:function(){
			    //获取全局设置的变量
			    this.memberData = this.$member.memberObj;
				this.liuhaiHeight = this.memberData.statusBarHeight + 10
				if(this.memberData.platform=='ios'){
					this.buyTitle = 'ios平台暂不支持！'
				}
				this.getVideoDetail();
			    //输出值{name:'初始姓名'}
			},
			methods:{
				onReturn(){
					uni.navigateBack({
					    delta: 1
					});
				},
				goDown(){
					vipStatus({
						'user_id':this.memberData.id,
					}).then(res => {
						if(res.data.code == 1){
							this.$member.setMemberObj(res.data.data.list);
							if(JSON.stringify(this.memberData.vip)=='{}'){
								uni.showToast({
								    title: '请先授权登录！',
								    duration: 2000
								});
								this.getDYuserinfo();
								return;
							}
							if(this.$member.memberObj.vip == 0 && this.detailList.vip == 1){
								uni.showToast({
								    title: '非会员无法下载！',
								    duration: 2000
								});
								
							}else{
								this.downVideo();
							}
						}
					})
					console.log(this.memberData,22228)
				},
				lookBuyStatus(){
					isBuy({
						'video_id':this.videoId,
						'user_id':this.memberData.id,
					}).then(res => {
						if(res.data.code == 1 ){
							this.isBuy = true 
							this.buyTitle = '下载视频'
						}else{
							this.isBuy = false
						}
					})
				},
				addCollection(){
					if(!this.memberData.id){
						uni.showToast({
						    title: '您还未登陆,请先登陆',
						    duration: 2000
						});
						this.getDYuserinfo();
						 return;
					}
					collection({
						'userId': this.memberData.id,
						'videoId': this.videoId,
					}).then(res => {
						if(res.data.code == 1 || res.data.code == 2){
							this.detailList.is_collection = !this.detailList.is_collection;
							 uni.showToast({title:res.data.msg,icon:'none'})
						}else{
							 uni.showToast({title:res.data.msg,icon:'none'})
						}
					})
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
				getVideoDetail(){
					videoDetail({
						'videoId': this.videoId,
						'userId': this.memberData.id,
					}).then(res => {
						if(res.data.code == 1){
							this.detailList = res.data.data.list
							this.price = res.data.data.list.price
						}else{
							 uni.showToast({title:res.data.msg,icon:'none'})
						}
					 })
				},
				goB(){
					if(this.memberData.platform=='ios'){
						console.log(this.memberData.platform)
						uni.showToast({
							title: 'ios平台暂不支持！',
							icon:'none',
							duration: 2000
						});
						return;
					}
					if(this.isBuy == true){
						this.downVideo();
					}else{
						this.gopay();
					}
					
				},
				alipay(){
					alipay({
						'openid':this.memberData.openid,
						'price':this.detailList.price,
						'video_id':this.detailList.id,
						'user_id':this.memberData.id,
						'subject':'视频购买',
						'body':this.detailList.title,
						'pay_method':'alipay'
					}).then(e => {
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
										if(res.code == 0){
											this.downVideo();
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
											uni.showToast({
											    title: '支付失败',
											    duration: 2000
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
							}else{
								uni.showToast({
								    title: res.data.msg,
								    duration: 2000
								});
							}
					 })
				},
				gopay(){
					wxpay({
						'openid':this.memberData.openid,
						'price':this.detailList.price,
						'video_id':this.detailList.id,
						'user_id':this.memberData.id,
						'subject':'视频购买',
						'body':this.detailList.title,
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
											    title: '支付成功,视频保存中',
											    duration: 2000
											});
											this.downVideo();
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
													    title: '支付成功,视频保存中',
													    duration: 2000
													});
													this.downVideo();
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
				downVideo(){
					uni.showToast({
						title: "视频下载中，请耐心等待！",
						icon: "none"
					});
					const downloadTask = uni.downloadFile({
							url: this.detailList.video, //仅为示例，并非真实的资源
							success: (res) => {
								if (res.statusCode === 200) {
									console.log(res.tempFilePath)
									uni.saveVideoToPhotosAlbum({
										filePath: res.tempFilePath,
										success: function() {
											uni.showToast({
												title: "保存成功",
												icon: "none"
											});
										},
										fail: function(res) {
											console.log(res)
											uni.showToast({
												title: "保存失败，请稍后重试",
												icon: "none"
											});
										}
									});
								}	
							}
					});
				},
				goDetail(e){
					uni.navigateTo({
					    url: '../list/videoDetail?id='+e,
					    success: res => {},
					    fail: () => {},
					    complete: () => {}
					});
					
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
	 }
</script>

<style >
.header-wrapper {
    width: 100%;
    height:5rem;
    position: fixed;
    top: 0;
    z-index: 999;
    background-color: #ffffff;
}
.line {
    width: 100vw;
    height: 0.5rem;
    background-color: #f2f3f4;
}
.activityDetail {
    width: 100vw;
    height: 100vh;
    .content {
        width: 100%;
        // position: absolute;
        // top:2.5rem;
        // bottom: 2.5rem;
        // overflow-y: scroll;
        // -webkit-overflow-scrolling:touch;
        padding-top: 2.5rem;
       // padding-bottom: 2.6rem;
        .banner {
            img {
                // width: 100%;
                height: 100%;
                margin: 0 auto;
                display: block;
            }
        }
        .image-intro {
            padding: 0.8rem 0.8rem 1.6rem;
            box-sizing: border-box;
            font-size: 0.8rem;
            color: #31333b;
            .image-title {
                line-height: 1rem;
            }
            .price {
                display: flex;
                justify-content: space-between;
                .price-left {
                    color: #f86a71;
                    font-size: 1.3rem;
                }
                .price-right {
                    font-size: 0.64rem;
                    color: #bcbabd;
                }
            }
            .vip-price {
                display: flex;
                justify-content: space-between;
                .vip-price-left {
                    color: #3a3c44;
                    font-size: 0.8rem;
                    img {
                        width: 2.6rem;
                        height: 0.8rem;
                        margin-left: 0.26rem;
                        vertical-align: bottom;
                    }
                }
                .vip-price-right {
                    font-size: 0.64rem;
                    color: #bcbabd;
                }
            }
        }
        .more {
            padding: 1rem 0.8rem 0.5rem;
            box-sizing: border-box;
            .more-title {
                font-size: 0.6rem;
                color: #333333;
                margin-bottom: 0.8rem;
            }
            .more-img-box {
                img {
                    width: 9rem;
                    height: 6rem;
                    border-radius: 0.2rem;
                    margin-bottom: 0.5rem;
                }
                img:nth-child(2n + 1) {
                    margin-left: 0;
                }
            }
        }
    }
    .control-box {
        width: 100%;
        height: 2.6rem;
        background-color: #fff;
        position: fixed;
        bottom: 0;
        padding: 0 0.8rem;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .open-vip {
            color: #f86a71;
            font-size: 0.8rem;
        }
        .btn-right {
            display: flex;
            > img {
                width: 2rem;
                height: 2rem;
            }
            .add-car {
                width: 4.2rem;
                height: 2rem;
                text-align: center;
                line-height: 2rem;
                align-items: center;
                border-radius: 0.2rem;
                color: #000000;
                border: 1px solid $backgColor;
                box-sizing: border-box;
                background-color: #ffffff;
            }
            .buy-now {
                width: 4.2rem;
                height: 2rem;
                line-height: 2rem;
                text-align: center;
                border-radius: 0.2rem;
                color: #fff;
                background-color: $backgColor;
                margin-left: 0.5rem;
            }
        }
        .btn-dowload {
            width: 4.2rem;
            height: 2rem;
            text-align: center;
            line-height: 2rem;
            align-items: center;
            border-radius: 0.2rem;
            color: #fff;
            background-color: #4e83fe;
        }
    }
}

ul{
    padding:0;
    list-style:none;
    width: 90%;
    margin-left: 5%;
}
li{
    width:30%; height:30px; display:inline-block;
    font-size: 0.7rem;
    text-align:center; line-height:30px;
    cursor:pointer;margin-left:5px;
}
li:before{
    display:inline-block; width:10px; height:10px;
    line-height:20px; content:""; border:1px #333333 solid;
    margin-right:0.22rem; transition:all 0.3s linear;
}
li.checked:before{
    background-color:#009DFB;
    border:1px #009DFB solid;
}
li.checked{color:#009DFB}
</style>
