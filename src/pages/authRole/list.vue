<template>
  <div>
    <el-row>
      <el-col :span="24">
        <dy-panel>
          <dy-panel-header title="角色管理"></dy-panel-header>
          <el-row>
            <el-col :span="24">
              <dy-panel-body>
                <el-row>
                  <el-form :inline="true" class="demo-form-inline">

                    <el-form-item label="状态">
                      <el-select v-model="queryParam.isLock" placeholder="请选择状态">
                        <el-option label="全部" value></el-option>
                        <el-option label="启用" value="0"></el-option>
                        <el-option label="禁用" value="1"></el-option>
                      </el-select>
                    </el-form-item>

                    <el-form-item label="关键字">
                      <el-input
                        v-model="queryParam.searchKey"
                        placeholder="请输入用户名、手机号,账号等"
                        @change="doSearchList"
                      ></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="doSearchList">查询</el-button>
                    </el-form-item>
                  </el-form>
                </el-row>
                <el-row>
                  <el-button type="primary" :disabled="!operateBtn.addBtn" @click="onAddBtnEvent">新增</el-button>
                  <el-button
                    type="success"
                    :disabled="!operateBtn.editBtn"
                    @click="onEditBtnEvent"
                  >修改
                  </el-button>
                  <el-button type="danger" :disabled="!operateBtn.delBtn">删除</el-button>
                  <el-button type="default" :disabled="!operateBtn.importBtn">导入</el-button>
                  <el-button type="default" :disabled="!operateBtn.exportBtn">导出</el-button>
                </el-row>
              </dy-panel-body>
              <dy-panel-body v-loading="loading">
                <el-table
                  @selection-change="onSelectRowEvent"
                  :data="tableList"
                  border
                  style="width: 100%;text-align: center"
                  @sort-change="onSortTableEvent"
                >
                  <el-table-column
                    type="selection"
                    prop="date"
                    label="序号"
                    width="30"
                    align="center"
                  ></el-table-column>
                  <el-table-column prop="roleName" label="账号" align="center" width="180"></el-table-column>
                  <el-table-column prop="roleCode" label="编码" align="center" width="180"></el-table-column>

                  <el-table-column
                    prop="isDefault"
                    label="默认角色"
                    align="center"
                    width="200"
                    sortable="custom"
                  >
                    <template slot-scope="scope">
                      <sapn>{{scope.row.sex==1?'是':'否'}}</sapn>
                    </template>
                  </el-table-column>

                  <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
                  <el-table-column prop="updateTime" label="更新时间" align="center"></el-table-column>
                  <el-table-column prop="disabled" label="锁定" align="center">
                    <template slot-scope="scope">
                      <el-tag
                        :type="scope.row.disabled==1?'danger':''"
                        effect="dark"
                      >{{scope.row.isLock==1?'禁用':'正常'}}
                      </el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column prop="id" label="操作" width="160">
                    <template slot-scope="scope">
                      <el-link
                        style="margin-right: 10px"
                        @click="onEditRowEvent(false,scope.row)"
                        type="primary"
                      >编辑
                      </el-link>
                      <!--  <el-link style="margin-right: 10px" type="primary">重置密码</el-link>-->
                    </template>
                  </el-table-column>
                </el-table>
                <div>
                  <dy-pagination
                    :current-page.sync="queryParam.currentPage"
                    :page-size.sync="queryParam.pageSize"
                    @click="doSearchList"
                    :total="tableTotal"
                  ></dy-pagination>
                </div>
              </dy-panel-body>
            </el-col>
          </el-row>
        </dy-panel>
      </el-col>
    </el-row>
    <el-row>
      <dy-modal
        :read-only="editModal.readOnly"
        v-if="editModal.visible"
        :visible.sync="editModal.visible"
        :form-key="editModal.formKey"
      >
        <user-update
          :data="editModal.data"
          :form-key="editModal.formKey"
          :roleList="roleList"
          :deptList="deptList"
        ></user-update>
      </dy-modal>
    </el-row>
  </div>
</template>
<script>
  import {DyPanel, DyPanelHeader} from '@/view/panel'
  import DyPanelBody from '@/view/panel/DyPanelBody'
  import authTbUserApi from '@/apis/auth/authTbUserApi.js'
  import authTbDeptApi from '@/apis/auth/authTbDeptApi.js'
  import authTbRoleApi from '@/apis/auth/authTbRoleApi.js'
  import UserUpdate from '@/pages/authUser/update.vue'
  import DyPagination from '@/components/pagination/DyPagination.vue'

  export default {
    name: 'userList',
    components: {
      DyPanelBody,
      DyPanel,
      DyPanelHeader,
      UserUpdate,
      DyPagination
    },
    data () {
      return {
        /**
         * 编辑弹出框
         */
        editModal: {
          formKey: 'user-update',
          readOnly: false,
          data: {},
          visible: false
        },
        loading: true,
        /**
         * 查询参数
         */
        queryParam: {
          currentPage: 1,
          pageSize: 10
        },
        /**
         * 上方操作按钮
         */
        operateBtn: {
          addBtn: true,
          editBtn: false,
          delBtn: true,
          importBtn: true,
          exportBtn: true
        },
        /**
         * 已选中的行
         */
        selectRows: [],
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
    created () {
      /**
       * 查询所有部门
       */
      authTbDeptApi.selectTreeList({}).then(msg => {
        this.deptList = msg.rows
      })
      /**
       * 获取可用角色
       */
      authTbRoleApi.selectListByEnabled().then(msg => {
        this.roleList = msg.rows
      })
      /**
       * 执行列表查询
       * */
      this.doSearchList()
    },

    methods: {
      /**
       * 部门筛选事件处理
       * @param value
       * @param data
       * @returns {boolean}
       */
      onDeptFilterNodeEvent (value, data) {
        if (!value) return true
        return data.deptName.indexOf(value) !== -1
      },
      /**
       * 编辑按钮事件处理
       */
      onEditBtnEvent () {
        if (this.selectRows.length != 1) {
          return
        }
        this.editModal.readOnly = false
        this.editModal.data = this.selectRows[0]
        this.editModal.visible = true
      },
      /**
       * 新增按钮事件处理
       */
      onAddBtnEvent () {
        this.editModal.readOnly = false
        this.editModal.data = {}
        this.editModal.visible = true
      },
      /**
       * 编辑某行事件处理
       * @param readOnly
       * @param data
       */
      onEditRowEvent (readOnly, data) {
        this.editModal.readOnly = false
        this.editModal.data = this.cloneDeep(data)
        this.editModal.visible = true
      },
      /**
       * 选中某行事件处理
       * @param selection
       */
      onSelectRowEvent (selection) {
        this.selectRows = selection
        if (this.selectRows.length != 1) {
          this.operateBtn.editBtn = false
        } else {
          this.operateBtn.editBtn = true
        }
      },
      /**
       * 部门选择事件处理
       * @param data
       * @param node
       * @param array
       */
      onSelectDeptEvent (data, node, array) {
        if (data.id === '1') {
          this.queryParam.deptId = ''
        } else {
          this.queryParam.deptId = data.id
        }
        this.doSearchList()
      },
      /**
       * 排序事件处理
       * @param col
       */
      onSortTableEvent (col) {
        this.queryParam.fixed = col.prop
        this.queryParam.sort = col.order == 'descending' ? 'desc' : 'asc'
        this.doSearchList()
      },
      /**
       * 查询列表业务处理
       */
      doSearchList () {
        this.loading = true
        authTbRoleApi.selectList(this.queryParam).then(msg => {
          setTimeout(() => {
            this.tableList = msg.rows
            this.tableTotal = msg.total
            this.queryParam.currentPage = msg.currentPage
            this.loading = false
          }, 200)
        })
      }
    },
    computed: {},
    watch: {
      deptFilter (val) {
        this.$refs.tree.filter(val)
      }
    }
  }
</script>
<style>

  .is-current.el-tree-node:focus > .el-tree-node__content {
    background: #409eff;
    color: white;
  }

  .is-current.el-tree-node > .el-tree-node__content:first-child {
    background: #409eff;
    color: white;
  }
</style>
