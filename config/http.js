import {
  request
} from './config.js';
export function banner(data) {
  return request('api/douyin/banner', data, 'POST');
}
//视频分类
export function headnav(data) {
  return request('api/douyin/headnav', data, 'POST');
}
//选择视频分类
export function chooseNav(data) {
  return request('api/douyin/chooseNav', data, 'POST');
}
//获取抖音授权
export function sendCode(data){
	return request('api/douyin/sendCode', data, 'POST');
}
//授权登录
export function loginD(data){
	return request('api/douyin/login', data, 'POST');
}
//支付宝支付
export function alipay(data){
	return request('api/Dou_alipay/zijieorder2', data, 'POST');
}
export function wxpay(data){
	return request('api/Dou_alipay/zijieorder2', data, 'POST');
}
//微信支付
// export function wxpay(data){
// 	return request('api/Douyin_wx_pay/unifiedOrder', data, 'POST');
// }
//首页信息列表
export function newIndex(data){
	return request('/api/index/newindex', data, 'POST');
}
//搜索
export function searchResult(data){
	return request('/api/douyin/searchResult', data, 'POST');
}
//视频列表
export function videoList(data){
	return request('/api/douyin/videoList', data, 'POST');
}
//搜索列表
export function searchList(data){
	return request('/api/douyin/searchList', data, 'POST');
}
//视频详情
export function videoDetail(data){
	return request('/api/douyin/videoDetail', data, 'POST');
}
//收藏视频
export function collection(data){
	return request('/api/douyin/collection', data, 'POST');
}
//收藏列表
export function seeMyCollection(data){
	return request('/api/douyin/seeMyCollection', data, 'POST');
}
//收藏列表 删除收藏
export function delCollection(data){
	return request('/api/douyin/delCollection', data, 'POST');
}
//查询是否付款成功
export function isBuy(data){
	return request('/api/Dou_alipay/isBuy', data, 'POST');
}
//微信查询订单
export function orderQuery(data){
	return request('/api/Douyin_wx_pay/orderQuery', data, 'POST');
}
//查询已购买列表
export function buyList(data){
	return request('/api/douyin/buyList', data, 'POST');
}
//vip会员卡列表
export function vipList(data){
	return request('/api/douyin/vipList', data, 'POST');
}
//检查用户是否为会员，会员是否已到期
export function vipStatus(data){
	return request('/api/douyin/vipStatus', data, 'POST');
}
//素材包列表
export function material(data){
	return request('/api/douyin/material', data, 'POST');
}
//素材包详情
export function materialDetail(data){
	return request('/api/douyin/materialDetail', data, 'POST');
}
//素材包 用户提交信息完善订单
export function perfect(data){
	return request('/api/Dou_alipay/perfect', data, 'POST');
}
//意见反馈
export function opinion(data){
	return request('/api/douyin/opinion', data, 'POST');
}
//素材包记录
export function materialList(data){
	return request('/api/douyin/materialList', data, 'POST');
}
