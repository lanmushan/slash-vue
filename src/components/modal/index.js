import modal from './DyModal.vue'
import Vue from 'vue'
const DyModal = {
  install: function(Vue){
    Vue.component('DyModal',modal)
  }

}
export default DyModal
