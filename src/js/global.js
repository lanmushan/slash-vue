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
  /**
   *移除Tab
   */
  Vue.prototype.removeTab=function (targetName) {
    let tabs = store.state.tab.list;
    if(targetName=="welcome")
    {
      return;
    }
    store.state.tab.list=tabs.filter(tab => tab.name !== targetName);
  },
    /**
     * 深度拷贝
     */
  Vue.prototype.cloneDeep=function(templateData) {
    // templateData 是要复制的数组或对象，这样的数组或者对象就是指向新的地址的
    return JSON.parse(JSON.stringify(templateData));
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
