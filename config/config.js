const app = getApp()
export function request(url, data, method) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: `https://admin.shitutu.com/public/${url}`,
      data: data ? data : {},
      method: method ? method : 'GET',
      complete: (res) => {
        if(res.statusCode == 200){
          resolve(res)
        }else{
          reject(res)
        }
      }
    })
  })

}