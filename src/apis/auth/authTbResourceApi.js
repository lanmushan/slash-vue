import http from '@/apis/http.js'

const authTbResourceApi = {
  /**
   * 查询当前用户的所有菜单，如果是管理员返回所有可用菜单
   */
  selectCurrentUserMenu: () => {
    return http.doGet('/authTbResource/select/menu', {})
  },
  /**
   * 查询列表
   */
  selectList: (query) => {
    return http.doGet('/authTbResource/selectList', query)
  },
  /**
   * 查询树形结构资源
   * @param query
   * @returns {*|Promise<AxiosResponse<T>>}
   */
  selectTreeList: () => {
    return http.doGet('/authTbResource/selectTreeList', {})
  }
}
export default authTbResourceApi
