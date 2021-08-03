<template>
	<view  class="indexBody" :style="'height:'+swiperHeight+'px'" >
		<view class="indexFixed" >
			<view class="liuhaiclass" :style="'height:'+liuhaiHeight+'px'"></view>
		<view class="index_top" style="margin-bottom: 1.8rem;">意见反馈
			<view class="index_search">
				 <img class="cancel_img" style="margin-top: 5px;width: 0.7rem;" 
				 mode="widthFix"  @click='onReturn'
				 src="https://admin.shitutu.com/public/douyinimg/back.png" />
			</view>
		</view>
		</view>
		<view style="height:6.5rem;width: 100%;"></view>
		<view class="index_c" style="margin-top: 0;">
			<view class="opinion_title">请选择需要反馈问题的种类</view>
			<view class="opinion_choose">
				<view class="opinion_choose_box" :class="{selected:Current==0}" @click="chooseOne">
					账户问题
				</view>
				<view class="opinion_choose_box" :class="{selected:Current==1}" @click="chooseTwo">
					账户问题
				</view>
				<view class="opinion_choose_box" :class="{selected:Current==2}" @click="chooseThree">
					账户问题
				</view>
				<view class="opinion_choose_box" :class="{selected:Current==3}" @click="chooseFour">
					账户问题
				</view>
				<view class="opinion_choose_box" :class="{selected:Current==4}" @click="chooseFive">
					账户问题
				</view>
			</view>
			<view style="clear: both;margin-bottom: 0.2rem;"></view>
				<view >
					<textarea 
					v-model="content"
					class="opinion_textrea" 
					placeholder-style="font-size: 0.7rem;
					font-family: PingFang SC;
					font-weight: 400;
					color: #FFFFFF;" 
					placeholder="请提交使用我们产品的意见"/>
				</view>
				<view class="opinion_button" @click="submitOpinion">提交</view>
		</view>
		
	</view>
</template>

<script>
	import {opinion} from '@/config/http.js';
	export default {
		data() {
			return {
				swiperHeight:500,
				pic_url:'https://admin.shitutu.com/public/douyinimg/mycarda.png',
				value: '',
				Current:0,
				memberData:'',
				liuhaiHeight:3
			}
		},
		onShow:function(){
		    //获取全局设置的变量
		    this.memberData = this.$member.memberObj;
			this.liuhaiHeight = this.memberData.statusBarHeight + 10
		},
		onLoad() {
			uni.getSystemInfo({
			    success:  (res) => {    
					// 需要使用箭头函数，swiper 高度才能设置成功
			        // 获取swiperHeight可以获取的高度，窗口高度减去导航栏高度
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
			submitOpinion(){
				opinion({
					'user_id':this.memberData.id,
					'cate_id':this.Current,
					'content': this.content,
				}).then(res => {
					if(res.data.code == 1){
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
			},
			chooseOne(){
				this.Current = 0
			},
			chooseTwo(){
				this.Current = 1
			},
			chooseThree(){
				this.Current = 2
			},
			chooseFour(){
				this.Current = 3
			},
			chooseFive(){
				this.Current = 4
			}
		}
	}
</script>

<style>
	.selected {
	  border: 1px solid #FD9535;
	  color:#FD9535;
	}
</style>
