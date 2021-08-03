<template>
	<view class="container">
		<view class="fav_head">
		            <p class="fav_left">我的收藏</p>
		            <p  v-if="isEdit==false" @click="finishEdit" class="fav_right">管理</p>
		            <p  v-if="isEdit==true" @click="finishEdit" class="fav_right">完成</p>
		            <view style="clear: both;"></view>
		</view>
		<!-- 每项选择 -->
		<checkbox-group name="check" @change="changeCheck" color="#3D7EFF" class="check">
			<!-- 注意v-for不要设在checkbox-group上 -->
			<view class="collectionLabel" v-for="(item, index) in content" :key="item.id">
				<img class="collectionImg" @tap="goDetail(item.id)" mode="widthFix" :src="item.pic"/>
				<text>{{item.name}}</text>
				<view class="collectionCheck" v-show="isEdit">
					<checkbox class="van-checkbox" :value="item.value"  :checked="item.checked" color="#3D7EFF" checked-color="#3D7EFF"/>
					<img src="https://admin.shitutu.com/public/douyinimg/delete.png" 
					mode="widthFix" @click="deleteCollection(item.id)" class="delete_collection">
				</view>
			</view>
			<view style="clear: both;"></view>
		</checkbox-group>
		<view class="no_search" v-if="content.length<=0">
			 <img class="no_search_img" mode="widthFix" src="https://admin.shitutu.com/public/douyinimg/no_search.png" />
			 <view class="van-empty">暂无数据</view>
		</view>
		<!-- 全选 -->
		<view class="mul-del-wrapper" v-show="isEdit">
		    <view>
		       <checkbox-group name="allCheck" @change="changeAll" color="#3D7EFF">
		       	<label>
		       		<checkbox :value="allCheck.value" :checked="allCheck.checked" color="#3D7EFF"/><text>{{allCheck.name}}</text>
		       	</label>
		       </checkbox-group>
		    </view>
		    <view class="mul-del-btn" @click="delCollection">删除</view>
		</view>
	</view>
</template>

<script>
	 import {seeMyCollection,collection,sendCode,loginD,delCollection} from '@/config/http.js';
	export default {
		data () {
			return{
				allCheck : {
					name : '全选',
					value : 'all',
					checked : false	
				},
				content : [
					{
						name : '《某天成为公主》',
						value : '《某天成为公主》',
						id : 1,
						whether : true
					},
					{
						name : '《当神不让》',
						value : '《当神不让》',
						id : 2,
						whether : true
					},
					{
						name : '《海贼王》',
						value : '《海贼王》',
						id : 3,
						whether : true
					}
				],
				checkedList:[],
				isEdit: false,
				collectionList:[],
			}
		},
		onShow:function(){
		    //获取全局设置的变量
		    this.memberData = this.$member.memberObj;
			this.getMyCollection()
		    //输出值{name:'初始姓名'}
		},
		methods:{
			deleteCollection(e){
				var video_id = e;
				delCollection({
					'checkedList': video_id,
					'user_id':	this.memberData.id,
				}).then(res => {
					if(res.data.code == 1){
						console.log(res)
					}else{
						 uni.showToast({title:res.data.msg,icon:'none'})
						 this.getMyCollection();
					}
				 })
			},
			delCollection(){
				if(this.checkedList == 'all'){
					var video_id = 'all'
				}else if(Object.keys(this.checkedList).length==0){
					uni.showToast({
					    title: '请选择视频',
					    duration: 2000
					});
					return;
				}else{
					var  video_id = this.checkedList.toString();  //把数组转换为字符串
				}
				delCollection({
					'checkedList': video_id,
					'user_id':	this.memberData.id,
				}).then(res => {
					if(res.data.code == 1){
						console.log(res)
					}else{
						 uni.showToast({title:res.data.msg,icon:'none'})
						 this.getMyCollection();
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
			getMyCollection(){
				if(!this.memberData.id){
					uni.showToast({
					    title: '您还未登陆,请先登陆',
					    duration: 2000
					});
					this.getDYuserinfo();
					return;
				}
				seeMyCollection({
					'userId': this.memberData.id,
				}).then(res => {
					if(res.data.code == 1){
						this.content = res.data.data
						console.log(this.content)
					}else{
						 uni.showToast({title:res.data.msg,icon:'none'})
					}
				 })
			},
			finishEdit() {
			    this.isEdit = !this.isEdit;
			},
		    // 全选
			changeAll : function(e) {
				if(e.detail.value.length == 0) {
					this.content.map(item => this.$set(item, 'checked', false));
					this.$set(this.allCheck, 'checked', false);
				}else{
					this.content.map(item => this.$set(item, 'checked', true));
					this.$set(this.allCheck, 'checked', true);
				}
				this.checkedList = e.detail.value;
				
			},
			// 多选
			changeCheck : function(e) {
				var items = this.content;
				var len = this.content.length;
				var values = e.detail.value;
				
				this.checkedList = values
				console.log(this.checkedList)
				// console.log(values)
				for(var i = 0; i < len; i++) {
					var item = items[i];
					if(values.includes(item.value)){
						this.$set(item, 'checked', true);
					}else{
						this.$set(item, 'checked', false);
					}
				}
				// 判断选中状态
				var arr = [];
				this.content.forEach(item => item.whether == true ? arr.push(item) : '');
				var isAll = arr.every(item => item.checked == true);
				isAll ? this.$set(this.allCheck, 'checked', true) : this.$set(this.allCheck, 'checked', false)
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
	.check{
		margin-top: 1rem;
		display: block !important;
	}
	
</style>