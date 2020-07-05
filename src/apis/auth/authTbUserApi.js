import http from '@/apis/http.js';
const authTbUserApi={
  /**
   * 查询用户列表
   * @param query 查询参数
   * @returns {*}
   */
  selectList:(query)=>{
    return http.doGet("/authTbUser/selectList",query);
  },
  /**
   * 添加用户
   * @param data
   * @returns {*|void}
   */
  addUser:(data)=>{
    return http.doPost("/authTbUser/add",data);
  },
  /**
   * 更新用户信息
   * @param data
   * @returns {*|void}
   */
  updateUser:(data)=>{
    return http.doPost("/authTbUser/update",data);
  }
}
export default authTbUserApi;
