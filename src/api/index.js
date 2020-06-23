// import axios from "axios"
import QS from "qs"

axios.defaults.timeout = 10000

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = "http://116.62.70.150:3000"
// eslint-disable-next-line no-undef
} else if (process.env.NODE_ENV === "production") {
  axios.defaults.baseURL = "http://116.62.70.150:3000"
}

export function get (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(res => {
      if(res.status === 200) {
        resolve(res.data)
      } else {
        reject(res)
      }
    }).catch(err => {
      reject(err.data)
    })
  })
}

// post请求头
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8"

export function post (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, QS.stringify(params))
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}
