import http from '@/apis/http.js';
const resourceApi={
    /**
     * 查询当前用户的
     */
    selectCurrentUserMenu:()=>{
      return http.doGet("/authTbResource/select/menu",{});
    }
}
export default resourceApi;
