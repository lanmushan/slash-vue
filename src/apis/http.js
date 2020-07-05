import axios from 'axios'
axios.defaults.timeout=500000;
axios.defaults.baseURL='http://127.0.0.1:8001/api';
import {MessageBox,Notification,Message} from 'element-ui'
import Vue from 'vue'
//请求拦截器
axios.interceptors.request.use(function (param) {
    console.log(param)
    console.log(`请求拦截器${param}`);
    return param
}, function (error) {
    // 请求错误
    return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  console.log("响应拦截成功");
    var msg=response.data;
    if(msg.code==200||msg.code==204)
    {   console.log(111);
        return msg;
    }else if(msg.code!=200&&msg.code!=204)
    {
      Notification.error({
        title: msg.code,
        message: msg.msg
      });
      return Promise.reject(msg);
    }

}, function (error) {
    // 响应错误
    return Promise.reject(error)
})
const api=
{
    doPost:(url,data)=>{
       return  axios.post(url,data)
    },
    doGet:(url,data)=>{
        return axios.get(url,{
            params:data
        });
    }
}
export default api;
