<template xmlns:el-col="http://www.w3.org/1999/html">
  <div>
    <el-row>
      <el-col :span="24">
        <dy-panel>
          <dy-panel-header title="用户管理">
          </dy-panel-header>
          <el-row>
            <el-col :span="3">
              <dy-panel-body :border="0">
                <el-form>
                  <el-input
                    placeholder="请输入部门名称"
                    v-model="deptFilter">
                  </el-input>
                </el-form>
                <el-row style="margin-top: 10px">
                  <el-tree highlight-current :expand-on-click-node="false" class="filter-tree"
                           :filter-node-method="filterNode" :default-expand-all="true"
                           :data="deptList" :props="deptProps" @node-click="selectDept" ref="tree"></el-tree>
                </el-row>
              </dy-panel-body>
            </el-col>
            <el-col :span="21">
              <dy-panel-body>
                <el-row>
                  <el-form :inline="true" class="demo-form-inline">
                    <el-form-item label="角色">
                      <el-select v-model="queryParam.roleCode" placeholder="请选择角色">
                        <el-option label="所有角色" value=""></el-option>
                        <el-option v-for="role in roleList" :label="role.roleName" :value="role.roleCode"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="账户状态">
                      <el-select v-model="queryParam.isLock" placeholder="请选择状态">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="启用" value="0"></el-option>
                        <el-option label="禁用" value="1"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="证件号">
                      <el-input v-model="queryParam.idCard" placeholder="请输入证件号"></el-input>
                    </el-form-item>
                    <el-form-item label="关键字">
                      <el-input v-model="queryParam.searchKey" placeholder="请输入用户名、手机号,账号等" @change="querySearch"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="querySearch">查询</el-button>
                    </el-form-item>
                  </el-form>
                </el-row>
                <el-row>
                  <el-button type="primary" @click="onEditModal(false)">新增</el-button>
                  <el-button type="success">修改</el-button>
                  <el-button type="danger">删除</el-button>
                  <el-button type="default">导入</el-button>
                  <el-button type="default">导出</el-button>
                </el-row>
              </dy-panel-body>
              <dy-panel-body v-loading="loading">
                <el-table :data="tableList" border style="width: 100%;text-align: center" @sort-change="sortTable">
                  <el-table-column type="selection" prop="date" label="序号" width="30" align="center"></el-table-column>
                  <el-table-column style="padding: 0px !important;" prop="headImgAddress" label="头像" width="60" align="center">
                    <template slot-scope="scope">
                      <div class="demo-basic--circle">
                        <!--<el-avatar :size="small" :src="circleUrl"></el-avatar>-->
                      </div>
                    </template>
                  </el-table-column>

                  <el-table-column prop="account" label="账号" width="140" align="center"></el-table-column>
                  <el-table-column prop="nickName" label="昵称" width="120" align="center"></el-table-column>
                  <el-table-column prop="username" label="姓名" width="120"></el-table-column>
                  <el-table-column prop="sex" label="性别" align="center" width="80" :sortable="'custom'">
                    <template slot-scope="scope">
                      <sapn>{{scope.row.sex==1?'男':'女'}}</sapn>
                    </template>
                  </el-table-column>
                  <el-table-column prop="authTbRoleList" label="拥有角色">
                    <template slot-scope="scope">
                      <el-tag size="mini" v-for="it in scope.row.authTbRoleList">{{it.roleName}}</el-tag>
                      <!--<span v-for="it in scope.row.authTbRoleList">{{it.roleName}}|</span>-->
                    </template>
                  </el-table-column>
                  <el-table-column prop="phone" label="联系电话" width="100"></el-table-column>
                  <el-table-column prop="email" label="联系邮箱" width="140" cell-class-name="cell-style"></el-table-column>
                  <el-table-column prop="isLock" label="锁定" align="center" width="80">
                    <template slot-scope="scope">
                      <el-tag :type="scope.row.isLock==1?'danger':''" effect="dark">{{scope.row.isLock==1?'禁用':'正常'}}
                      </el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column prop="createTime" label="注册时间" width="140" cell-class-name="cell-style" align="center">
                  </el-table-column>
                  <el-table-column prop="id" label="操作" width="160">
                    <template slot-scope="scope">
                      <el-link style="margin-right: 10px" @click="onEditModal(false,scope.row)" type="primary">编辑</el-link>
                      <el-link style="margin-right: 10px" type="primary">重置密码</el-link>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="block" style="text-align: right;margin-top: 10px">
                  <el-pagination
                    background="background"
                    :current-page.sync="queryParam.currentPage"
                    :page-sizes="[5, 10, 20, 50]"
                    :page-size.sync="queryParam.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="tableTotal">
                  </el-pagination>
                </div>
              </dy-panel-body>
            </el-col>
          </el-row>
        </dy-panel>
      </el-col>
    </el-row>
    <el-row>
      <dy-modal :read-only="modalReadOnly"  v-if="visible" :visible.sync="visible" form-key="11111">
        <user-update :data="modalData" form-key="11111" :roleList="roleList" :deptList="deptList"></user-update>
      </dy-modal>
    </el-row>
  </div>


</template>
<script>
  import {DyPanel, DyPanelHeader} from '@/view/panel'
  import HelloWorld from '@/components/HelloWorld.vue'
  import DyPanelBody from '../../view/panel/DyPanelBody'
  import authTbUserApi from '@/apis/auth/authTbUserApi.js'
  import authTbDeptApi from '@/apis/auth/authTbDeptApi.js'
  import authTbRoleApi from '@/apis/auth/authTbRoleApi.js'
  import UserUpdate from '@/pages/authUser/update.vue'

  export default {
    name: 'list',
    components: {
      DyPanelBody,
      HelloWorld,
      DyPanel,
      DyPanelHeader,
      UserUpdate
    },
    data () {
      return {
        modalReadOnly:true,
        modalData:{},
        visible: false,
        loading: true,
        queryParam: {
          currentPage: 1,
          pageSize: 10
        },
        selectIds:[],
        deptFilter: '',
        roleList: [],
        deptList: [],
        deptProps: {
          children: 'children',
          label: 'deptName'
        },
        tableTotal: 0,
        tableList: []
      }
    },
    watch: {
      deptFilter (val) {
        this.$refs.tree.filter(val)
      }
    },
    computed: {
      visible: {
        get () {
          return this.visible
        },
        set (val) {
          alert(11)
        }
      }
    },
    methods: {
      filterNode (value, data) {
        if (!value) return true
        return data.deptName.indexOf(value) !== -1
      },
      showModal (state) {
        this.visible = state
      },
      onEditModal(readOnly,data){
        this.modalReadOnly=false;
        this.modalData=this.cloneDeep(data);
        this.visible = true;
      },
      selectDept (data, node, array) {
        if (data.id === '1') {
          this.queryParam.deptId = ''
        } else {
          this.queryParam.deptId = data.id
        }
        this.querySearch()
      },
      changePageSize (pageSize) {
        this.queryParam.pageSize = pageSize
        this.querySearch()
      },
      // changeCurrentPage (currentPage) {
      //   this.queryParam.currentPage = currentPage
      //   this.querySearch()
      // },
      sortTable (col) {
        this.queryParam.fixed = col.prop
        this.queryParam.sort = (col.order == 'descending' ? 'desc' : 'asc')
        this.querySearch()
      },
      querySearch () {
        this.loading = true
        authTbUserApi.selectList(this.queryParam).then((msg) => {
          setTimeout(() => {
            console.log(msg)
            this.tableList = msg.rows
            this.tableTotal = msg.total
            this.queryParam.currentPage = msg.currentPage
            this.loading = false
          }, 200)
        })
      }
    },
    created () {
      /**
       * 查询所有部门
       */
      authTbDeptApi.selectTreeList({}).then((msg) => {
        this.deptList = msg.rows
      })
      /**
       * 获取可用角色
       */
      authTbRoleApi.selectListByEnabled().then(msg => {
        this.roleList = msg.rows
      })
      this.querySearch()
    }
  }
</script>
<style>
  el-table {
    background: red;
  }

  .cell-style {
    background: red;
    text-align: center;
  }

  .is-current.el-tree-node:focus > .el-tree-node__content {
    background: #409EFF;
    color: white;
  }

  .is-current.el-tree-node > .el-tree-node__content:first-child {
    background: #409EFF;
    color: white;
  }
</style>
