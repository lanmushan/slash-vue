import http from '@/apis/http.js'

const authTbDeptApi = {
  /**
   * 查询当前用户的
   */
  selectList: (data) => {
    return http.doGet('/authTbDept/selectList', data)
  },
  selectTreeList: (data) => {
    return http.doGet('/authTbDept/selectTreeList', data)
  }
}
export default authTbDeptApi
