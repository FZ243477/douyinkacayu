<template>
	<view>
	<!-- 	<view class="search_desc">
		    <span class="search_desc_text">搜索关键词：<span class="color_blue">{{searchKeywords}}</span></span>
		    <span class="search_desc_text" style="margin-left:15px;">共<span class="color_blue">{{searchCount}}</span>个视频</span>
		</view> -->
		<view class="video_box">
			<view class="video_img"  v-for="(image, index) in imgList" :key="index">
				<img :src="image.pic" @tap="goDetail(image.id)" alt="">
				<view class="video_time">{{image.duration}}</view>
			</view>
			
			<view v-show="isLoadMore">  
				<!-- //loading加载提示处 -->
			    <uni-load-more :status="loadStatus" ></uni-load-more>
			</view>
		</view>
		<view class="no_search" v-show="noSearch">
			 <img class="no_search_img" mode="widthFix" src="https://admin.shitutu.com/public/douyinimg/no_search.png" />
			<p class="no_search_p">找不到视频？联系客服17794558879（微信）或提交您的需求，我们尽快为您研发上传 </p>
			      <!--    <div class="no_search_div" @click="ToRequirements">提交您的需求</div> -->
		</view>
		
	</view>
</template>

<script>
	import {chooseNav,videoList} from '@/config/http.js';
	export default {
		data() {
			return {
				imgList:[],
				searchKeywords:'',
				type:'',
				noSearch:false,
				searchCount:'',
				page:1,
				pagesize:5,
				loadStatus:'loading',  //加载样式：more-加载前样式，loading-加载中样式，nomore-没有数据样式
				isLoadMore:false,  //是否加载中
				cateId:''
			}
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			this.cateId = option.id;
			this.getVideoList()
		},
		onReachBottom(){  //上拉触底函数
			if(!this.isLoadMore){  //此处判断，上锁，防止重复请求
			    this.isLoadMore=true
			    this.page+=1
			    this.getVideoList()
			}
		},
		methods: {
			getVideoList(){
				videoList({
					'page':this.page,
					'pageSize':this.pagesize,
					'cateId': this.cateId,
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
						console.log(res.data.data.list);
					}else{
						 uni.showToast({title:res.data.msg,icon:'none'})
						    this.isLoadMore=false
						    if(this.page>1){
						        this.page-=1
						    }
					}
					
				 })
			},
			goDetail(e){
				uni.navigateTo({
				    url: '../list/videoDetail?id='+e,
				    success: res => {},
				    fail: () => {},
				    complete: () => {}
				});
			},
		},
		created() {
		}
	}
</script>

<style>
</style>
