import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state:{
    tab:{
      list:[{
        title:"欢迎页",
        name:"/welcome/index",
        path:"/welcome/index",
        content:"sdafjlasjl"
      }],
      active:"/welcome/index"
    },
    events:[],
    count:1
  },
  getters:{
    onEvent(state){
      return function (eventName) {
        console.log(`订阅事件${eventName}`)
        if(state.events.length==0){
          return null;
        }
        for (let i in state.events) {
          if (state.events[i].name != eventName)
          {
            continue;
          }
          let result = Object.assign({},state.events[i]);
          state.events.splice(i,1);
          return result;
        }
        return null;

      }
    }
  },
  mutations:{
    "submitForm":function (state,event) {
      console.log(event)
        event.name=event.name+'-submitForm'
        console.log(event);
        state.events.push(event);
    },
    "cancelSubmitForm":function (state,event) {
      event.name=event.name+'-cancelSubmitForm'
      state.events.push(event);
    },
    "successSubmitForm":function (state,event) {
      console.log("提交成功事件");
      console.log(event);
      event.name=event.name+'-successSubmitForm'
      state.events.push(event);
    }
  }
})
export default store
