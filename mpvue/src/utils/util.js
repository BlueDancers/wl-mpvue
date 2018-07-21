//工具类
import config from '../config'

//对we的请求进行封装
export function get(url) { //对wx.request进行封装
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.host + url,
      success: function (res) {
        if (res.data.code == 0) {
          resolve(res.data)
        } else {
          reject(res.data)
        }
      }
    })
  })
}
