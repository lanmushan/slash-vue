<template>
 <el-row>
     <el-col :span="24">

       <dy-panel>
         <dy-panel-header title="用户管理">

         </dy-panel-header>
         <dy-panel-body>
            <el-row>
              <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="审批人">
                  <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                </el-form-item>
                <el-form-item label="活动区域">
                  <el-select v-model="formInline.region" placeholder="活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit">查询</el-button>
                  <el-button type="default" @click="onSubmit">重置</el-button>
                </el-form-item>
              </el-form>
            </el-row>
           <el-row>
             <el-button type="primary">新增</el-button>
             <el-button type="success">修改</el-button>
             <el-button type="danger">删除</el-button>
             <el-button type="default">导入</el-button>
             <el-button type="default">导出</el-button>
           </el-row>
         </dy-panel-body>
         <dy-panel-body>
           <el-table
             :data="tableList"
             border style="width: 100%;text-align: center" default-sort="id">
             <el-table-column type="selection"
               prop="date"
               label="序号"
               width="30" align="center">
             </el-table-column>
             <el-table-column
               prop="headImgAddress"
               label="头像"
               width="180" align="center">
             </el-table-column>
             <el-table-column
               prop="account"
               label="账号"
               width="180" align="center">
             </el-table-column>
             <el-table-column
               prop="nickName"
               label="昵称"
               width="180" align="center">
             </el-table-column>
             <el-table-column
               prop="username"
               label="姓名">
             </el-table-column>
             <el-table-column
               prop="sex"
               label="性别">
             </el-table-column>
             <el-table-column
               prop="phone"
               label="联系电话">
             </el-table-column>
             <el-table-column
               prop="email"
               label="联系邮箱">
             </el-table-column>

             <el-table-column
               prop="is_lock"
               label="账户状态">
             </el-table-column>
           </el-table>
           <div class="block" style="text-align: right;margin-top: 10px">
             <el-pagination
               @size-change="handleSizeChange" background
               @current-change="handleCurrentChange"
               :current-page="currentPage4"
               :page-sizes="[100, 200, 300, 400]"
               :page-size="100"
               layout="total, sizes, prev, pager, next, jumper"
               :total="400">
             </el-pagination>
           </div>
         </dy-panel-body>
       </dy-panel>

     </el-col>
 </el-row>
</template>
<script>
  import {DyPanel,DyPanelHeader} from '@/view/panel';
  import HelloWorld from '@/components/HelloWorld.vue'
  import DyPanelBody from '../../view/panel/DyPanelBody'
  import authTbUserApi from '@/apis/auth/authTbUserApi.js'
export default {
    name: "list",
    components: {DyPanelBody, HelloWorld,DyPanel,DyPanelHeader},
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      },
      tableList: []
    }
  },
  created () {
    console.log('查询用户信息')
    authTbUserApi.selectList({}).then((msg)=>{
        this.tableList=msg.rows;
    })
  }
}
</script>
<style>
  el-table{
    background: red;
  }
</style>
