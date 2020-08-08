import http from '@/apis/http.js'

const loginApi = {
  /**
   * 查询当前用户的
   */
  selectVerificationCode: () => {
    return http.doGet('/authLogin/selectVerificationCode', {})
  },
  loginManage: (data) => {
    return http.doPost('/authLogin/loginManage', data)
  },
  setToken: (token) => {
    localStorage.setItem('token', token)
  },
  getToken: () => {
    return localStorage.getItem('token')
  },
  clearToken: () => {
    return localStorage.removeItem('token')
  }
}
export default loginApi
