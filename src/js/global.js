import Vue from 'vue'
import router from '../router/index'
import store from './store'

export default function(){
  /**
   * 全局变量
   * @type {{}}
   */
  Vue.prototype.app={
    tabList:[],
    tabActive:1
  };
  /**
   * 全局路由跳转
   * @param msg
   */
  Vue.prototype.jump=function (path,title,query) {
     activeTab(path,title)
  };
  Vue.prototype.removeTab=function (targetName) {
    let tabs = store.state.tab.list;
    if(targetName=="welcome")
    {
      return;
    }
    store.state.tab.list=tabs.filter(tab => tab.name !== targetName);
  }
 router.beforeEach((to,from,next)=>{
    //activeTab(to.path);
    next();
 })
  //激活标签
  function activeTab (path,title) {
    router.push({
      path:path
    })
    let existTabList=false;
    for (let i in store.state.tab.list)
    {
      let tab=store.state.tab.list;
      if(tab[i].path==path)
      {
          existTabList=true;
          store.state.tab.active=path;
          return;
          break;
      }
    }
    if(!existTabList)
    {
      store.state.tab.list.push({
        title:title,
        path:path,
        name:path,
      })
       store.state.tab.active=path;
    }
    router.push({
      path:path
    })
  }
}
