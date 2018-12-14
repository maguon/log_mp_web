const config = require('../config.js')

export const httpGet = (url,callback) => {
  wx.request({
    url: url,
    header: {
      'Content-Type': 'application/json'
    },
    method : "GET",
    success:  (res) =>{
      callback(null,res)
    },
    fail :(err)=>{
      callback(err,null)
    }
  })
}
export const httpPost = (url, params,callback) => {
  wx.request({
    url: url,
    header: {
      'Content-Type': 'application/json'
    },
    method: "POST",
    data:params,
    success: (res) => {
      callback(null, res)
    },
    fail: (err) => {
      callback(err, null)
    }
  })
}
export const httpPut = (url, params, callback) => {

  wx.request({
    url: url,
    header: {
      'Content-Type': 'application/json'
    },
    method: "PUT",
    data: params,
    success: (res) => {
      callback(null, res)
    },
    fail: (err) => {
      callback(err, null)
    }
  })
}
export const httpDel = (url) => {
  wx.request({
    url: url,
    header: {
      'Content-Type': 'application/json'
    },
    method: "DELETE",
  })
}