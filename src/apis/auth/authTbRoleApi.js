import http from '@/apis/http.js'

const authTbRoleApi = {
  /**
   * 查询可用的角色
   */
  selectListByEnabled: () => {
    return authTbRoleApi.selectList({disabled: 0})
  },
  selectList: (data) => {
    return http.doGet('/authTbRole/selectList', data)
  }
}
export default authTbRoleApi
