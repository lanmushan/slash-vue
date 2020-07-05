<template>
  <div>
    <el-input :placeholder="placeholder" readonly="" ref="input" :value="textValue" @focus="onFocus" clearable=""></el-input>
    <div class="select-tree-body" v-show="treeShow" ref="treeBox" >
      <el-tree highlight-current :expand-on-click-node="false" @node-click="selectNode"  @click="" :default-expand-all="true" :data="treeList" :props="props" ref="tree"></el-tree>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'HelloWorld',
    data () {
      return {
        treeList:[],
        textValue:"11",
        treeShow:false,
        msg: 'Welcome to Your Vue.js App'
      }
    },
    methods:{
      onFocus:function () {
        this.treeShow=true;
      },
      onBlur:function () {
        this.treeShow=false;
      },
      selectNode:function (data, node, array) {
        this.textValue=data[this.props.label];
        this.treeShow=false;
      }
    },
    props:{
      placeholder:{
        type:String,
        default:""
      },
      treeList:{
        type: Array,
        default: []
      },
      props:{
        type:Object,
        default:{
          children: 'children',
          label: 'deptName'
        }
      }
    }
  }
  </script>
<style scoped>
  .select-tree-body{
    z-index: 9999;
    position: absolute;
    left: 0px;
    top: 35px;
    border: 1px solid #c1c3c4;
    width: 100%;
    height: 200px;
    clear: both;
    overflow-y: scroll;
  }
  .select-tree-body::-webkit-scrollbar {
    width: 0 !important;
  }
  .select-tree-body::-webkit-scrollbar {
    width: 0 !important;height: 0;
  }
</style>
