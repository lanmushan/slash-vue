import axios from 'axios'
import {Notification} from 'element-ui'
import loginApi from '@/apis/loginApi.js'
import HttpCode from '@/js/httpCode.js'
import router from '@/router/index.js'

axios.defaults.timeout = 500000
axios.defaults.baseURL = 'http://127.0.0.1:8080/api'
/** 请求拦截器
 *  在header添加authorization
 * */
axios.interceptors.request.use(function (param) {
  if (loginApi.getToken() != undefined) {
    param.headers['authorization'] = loginApi.getToken()
  }
  return param
}, function (error) {
  // 请求错误
  return Promise.reject(error)
})

/**
 * 响应拦截器
 * 对响应状态码等进行判断处理
 */
axios.interceptors.response.use(function (response) {
  let msg = response.data
  switch (msg.code) {
    case HttpCode.OK:
    case HttpCode.E204: {
      return msg
    }
    case HttpCode.D600: {
      loginApi.clearToken()
      router.push({path: '/login'})
      break
    }
    default: {
      Notification.error({
        title: msg.code,
        message: msg.msg
      })
      return Promise.reject(msg)
    }
  }

}, function (error) {
  // 响应错误
  return Promise.reject(error)
})
/**
 * 封装GET和POST方法
 * @type {{doPost: (function(*=, *=): Promise<AxiosResponse<T>>), doGet: (function(*=, *=): Promise<AxiosResponse<T>>)}}
 */
const api =
  {
    doPost: (url, data) => {
      return axios.post(url, data)
    },
    doGet: (url, data) => {
      return axios.get(url, {
        params: data
      })
    }
  }
export default api
