<template>
	 <view class="content" style="padding-top: 0.4rem">
	            <view class="banner" style="text-align: center;margin-top: 1.5rem;">
					<yy-video-player 
					  :auto-play="true" 
					  :url="detailList.water_video"  
					  :poster="detailList.pic" 
					  :danmu-list="danmuList"  
					  :show-back-btn="false"
					  :show-download-btn="false"
					  style="width: 100%;"
					></yy-video-player>
	                <img src="" style="width:90%;margin-left:5%;height:auto !important;"/>
	                <view style="clear: both;"></view>
	            </view>
	            <view class="solid_border" style="margin-bottom: 0.4rem;margin-top: 0.5rem;"></view>
	            <view class="images_title"></view>
	           <view style="font-size: 0.8rem;" class="down_img">立即购买视频仅需{{price}}元</view>
	            <view class="purchase_card" @click="goB">{{buyTitle}}</view>
	            <p style="font-size:0.5rem;color:rgb(153, 153, 153);text-align: center;margin-top: 0.3rem;"> 立即下载即可获得高清无水印视频</p>
	            <view class="solid_border" style="margin-top: 0.6rem;"></view>
	
	            <view class="detail_img_content">
	                <view class="de_box_1">
	                    <span class="de_l">购买授权:</span>
	                    <span class="de_3">视频版权授权期为自下载之日起一年</span>
	                </view>
	                <view class="de_box_2">
	                    <span class="de_l">视频类型:</span>
	                    <span class="de_3">{{detailList.codec_tag_string}}</span>
	                </view>
	                <view style="clear: both;"></view>
	                <view class="de_box_3">
	                    <span class="de_l">视频名称:</span>
	                    <span class="de_3" >{{detailList.title}}</span>
	                    <span class="de_l">版权所有:</span>
	                    <span class="de_3">食图图</span>
	                </view>
	                <view class="de_box_4">
	                    <span class="de_l">授权范围:</span>
	                    <span class="de_3">可做商用、个人</span>
	                    <!--<span class="de_l">图片大小:</span>-->
	                    <!--<span class="de_3">12.16MB</span>-->
	                </view>
	                <view class="de_box_5">
	                    <view class="de_4_box">
	                        <span class="de_4">收藏</span>
	                        <img @click="addCollection" v-show="!detailList.is_collection" class="de_4_img" mode="widthFix" src="https://admin.shitutu.com/public/douyinimg/collection.png" alt="" />
	                        <img  @click="addCollection" v-show="detailList.is_collection" mode="widthFix"class="de_4_img" src="https://admin.shitutu.com/public/douyinimg/Favorites-02.png" alt="" />
	                        <view style="clear: both;"></view>
	                    </view>
	                 <!--  <view class="de_4_box">
	                        <span class="de_4">举报</span>
	                        <img class="de_4_img" src="" alt="" />
	                        <view style="clear: both;"></view>
	                    </view> -->
	                 <!--   <view class="de_4_box" >
	                        <span class="de_4">分享</span>
	                        <img class="de_4_img" mode="widthFix" src="https://admin.shitutu.com/public/douyinimg/weixin.png" @click="goShareWeixin"    alt="" />
	                        <img class="de_4_img" src="" alt="" />
	                        <view style="clear: both;"></view>
	                    </view> -->
	                </view>
	                <view id="qrcode" style="display: none;" ref="qrcode"></view>
	                <view style="clear: both;"></view>
	            </view>
	
	
	            <view class="solid_border" style="margin-top: 0.4rem;"></view>
	            <!--<div class="line"></div>-->
				<view class="video_box">
					<view class="video_img"  v-for="(image, index) in detailList.recommend" :key="index">
						<img :src="image.pic" @tap="goDetail(image.id)" alt="">
						<view class="video_time">{{image.duration}}</view>
					</view>
				</view>
				
	        </view> 
</template>

<script>
	 import yyVideoPlayer from '@/components/yy-video-player/yy-video-player.nvue';
	 import {videoDetail,alipay,collection,sendCode,loginD,isBuy,chooseNav,wxpay,orderQuery} from '@/config/http.js';
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
				}
			},
			onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
				// this.videoId = option.id;
				this.videoId = 24;
			},
			onShow:function(){
			    //获取全局设置的变量
			    this.memberData = this.$member.memberObj;
				if(this.memberData.platform=='ios'){
					this.buyTitle = 'ios平台暂不支持！'
				}
				this.getVideoDetail();
				this.lookBuyStatus();
			    //输出值{name:'初始姓名'}
			},
			methods:{
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
					// console.log(this.memberData.id)
					// isbuyStatus({
					// 	'video_id':this.detailList.id,
					// 	'user_id':this.memberData.id,
					// }).then(rea => {
					// 	console.log(rea)
					// 	// if(rea.data.code == 1 ){
					// 	// 	this.isBuy = true 
					// 	// 	this.buyTitle = '下载视频'
					// 	// }else{
					// 	// 	this.isBuy = false
					// 	// }
					// )}
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
