export default {
    memberObj:{
        name:'初始姓名',
    },
    setMemberObj(data){
        this.memberObj = Object.assign({},this.memberObj,data) 
		let statusBarHeight=uni.getSystemInfoSync().statusBarHeight
		this.memberObj.statusBarHeight = statusBarHeight
    },
}