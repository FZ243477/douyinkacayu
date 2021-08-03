<template>
	<view  class="indexBody" :style="'min-height:'+swiperHeight+'px'" >
		<view class="indexFixed" >
			<view class="liuhaiclass" :style="'height:'+liuhaiHeight+'px'"></view>
		<view class="index_top">素材包记录
			<view class="index_search">
				 <img class="cancel_img" style="margin-top: 5px;width: 0.7rem;"
				  mode="widthFix"   @click='onReturn'
				 src="https://admin.shitutu.com/public/douyinimg/back.png" />
			</view>
		</view>
	</view>
	<view style="height:5rem;width: 100%;"></view>
		<view class="index_c" style="margin-top: 30px;">
			<view class="material_list_box" v-for="(image, index) in imgList" :key="index">
			    <img
					mode="widthFix"
			        :src="image.pic"
			        class="img-items"
			        :key="image.id"
			    />
			    <view class="material_list_box_right">
			        <p style=" margin-top: 0.5rem;">{{image.order_no}}</p>
			        <p >名称：{{image.title}}</p>
			        <p >简介：{{image.introduction}}</p>
			        <p >下载时间：{{image.createtime}}</p>
			    </view>
				<view style="clear: both;"></view>
				<view class="solid" style="width: 95%;margin-left: 0.5rem;"></view>
			</view>

			
										
		<!-- 	<u-row gutter="16">
				<u-col span="6" v-for="(image, index) in imgList" :key="index">
					
					<view class="demo-layout bg-purple" @tap="goDetail(image.id)">
						<view class="vip_type" :class="image.vip == 1 ?'displayshow':'displaynone'">
							VIP
						</view>
						<view class="free_type" :class="image.vip == 0 ?'displayshow':'displaynone'">
							免费
						</view>
						<view class="index_video_box">
							<img mode="widthFix" class="index_video_box_img" :src="image.pic" alt="">
						</view>
						<p class="index_video_box_p">{{image.title}}</p>
					</view>
				</u-col>
			</u-row> -->
			<view v-show="isLoadMore">
				<!-- //loading加载提示处 -->
			    <uni-load-more :status="loadStatus" ></uni-load-more>
			</view>
		</view>
	</view>
</template>

<script>
	import {materialList} from '@/config/http.js';
	export default {
		data() {
			return {
				swiperHeight:500,
				pic_url:'https://admin.shitutu.com/public/douyinimg/mycarda.png',
				imgList:[],
				page:1,
				pagesize:6,
				loadStatus:'loading',  //加载样式：more-加载前样式，loading-加载中样式，nomore-没有数据样式
				isLoadMore:false,  //是否加载中
				noSearch:false,
				memberData:'',
				liuhaiHeight:3
			}
		},
		onLoad() {
			uni.getSystemInfo({
			    success:  (res) => {    
			        this.swiperHeight = res.windowHeight 
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
			this.liuhaiHeight = this.memberData.statusBarHeight + 10
			this.getVideoList()
		    //输出值{name:'初始姓名'}
		},
		methods:{
			getVideoList(){
				materialList({
					'page':this.page,
					'pageSize':this.pagesize,
					'user_id': this.memberData.id,
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
