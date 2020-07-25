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
    sessionStorage.setItem('token', token)
  },
  getToken: () => {
    return sessionStorage.getItem('token')
  }
}
export default loginApi
