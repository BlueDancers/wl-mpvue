//工具类
import config from '../config'

//http get工具函数 获取函数
export function get(url,data) { //对wx.request进行封装
  return request(url,'get',data)
}

//http post工具函数 获取函数
export function post(url,data) { //对wx.request进行封装

  return request(url, 'post',data)
}


//post get 的封装
function request(url,method,data) {
  return new Promise((resolve, reject) => {
    wx.request({
      data,
      method,
      url: config.host + url,
      success: (res) => {
        if (res.data.code == 0) {
          resolve(res.data) 
        } else {
          reject(res.data)
        }
      }
    })
  })
}


export function showModal(title,content){
  wx.showModal({
    title,
    content,
    showCancel:false,
  })
}