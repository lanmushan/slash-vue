<template>
  <div>
    <el-menu
      :default-active="defaultActive"
      class="el-menu-vertical-demo left-nav-box"
      background-color="#304156"
      text-color="#fff"
      active-text-color="#409eff"
    >
      <el-menu-item :index="i" v-for="(row,i) in menuList" :key="i" v-if="row.children.length==0">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{row.resourceName}}</span>
        </template>
      </el-menu-item>
      <el-submenu :index="i" v-for="(row,i) in menuList" :key="i" v-if="row.children.length>0">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{row.resourceName}}</span>
        </template>
        <el-menu-item
          @click="jump(row2.resourceUrl,row2.resourceName)"
          :index="i+'-'+j"
          v-for="(row2,j) in row.children"
          v-if="row2.children.length==0"
          :key="j"
        >{{row2.resourceName}}
        </el-menu-item>
        <el-submenu
          :index="i+'-'+j"
          v-for="(row2,j) in row.children"
          :key="j"
          v-if="row2.children.length>0"
        >
          <template slot="title">{{row2.resourceName}}</template>
          <el-menu-item
            :index="i+'-'+j+'-'+x"
            v-for="(row3,x) in row2.children"
            :key="x"
          >{{row3.resourceName}}
          </el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
  </div>
</template>
<style>
</style>
<script>
  export default {
    name: 'LeftMenu',
    data () {
      return {
        leftMenuList: [],
        defaultActive: '0',
      }
    },
    created () {

    },
    methods: {},
    props: {
      menuList: {
        type: Array,
        default: [],
      }
    }
  }
</script>
