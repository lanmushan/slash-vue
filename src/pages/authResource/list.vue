<template>
  <div>
    <el-row>
      <el-col :span="24">
        <dy-panel>
          <dy-panel-header title="菜单管理"></dy-panel-header>
          <el-row>
            <el-col :span="24">
              <dy-panel-body>
                <el-row>
                  <el-form :inline="true" class="demo-form-inline">


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

                  <el-button type="danger" :disabled="!operateBtn.delBtn">删除</el-button>
                </el-row>
              </dy-panel-body>
              <dy-panel-body v-loading="loading">
                <el-table
                  @selection-change="onSelectRowEvent"
                  :data="tableList"
                  row-key="id"
                  :tree-props="{children: 'children'}"

                  style="width: 100%;text-align: center"
                  @sort-change="onSortTableEvent"
                >
                  <el-table-column width="50" label="序号"></el-table-column>
                  <el-table-column prop="roleCode" label="图标" align="center" width="80">
                    <template slot-scope="scope">
                      <i v-html="scope.row.iconDefault" class="iconfont"></i>
                    </template>
                  </el-table-column>
                  <el-table-column prop="resourceName" label="资源名称" align="center" width="180"></el-table-column>
                  <el-table-column prop="resourceType" label="类型" align="center" width="60"></el-table-column>
                  <el-table-column prop="resourceUrl" label="标识符" align="center"></el-table-column>

                  <el-table-column prop="resourceDescription" label="描述" align="center"></el-table-column>
                  <el-table-column prop="orderIndex" label="排序" align="center"></el-table-column>
                  <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
                  <el-table-column prop="createTime" label="更新时间" align="center"></el-table-column>
                  <el-table-column prop="disabled" label="状态" align="center">
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
                      <el-link style="margin-right: 10px" type="primary">新增</el-link>
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
        :title="editModal.title"
        width="30%"
      >
        <resource-update></resource-update>
      </dy-modal>
    </el-row>
  </div>
</template>
<script>
  import {DyPanel, DyPanelHeader} from '@/view/panel'
  import DyPanelBody from '@/view/panel/DyPanelBody'
  import authTbResourceApi from '@/apis/auth/authTbResourceApi.js'
  import resourceUpdate from '@/pages/authResource/update.vue'
  import DyPagination from '@/components/pagination/DyPagination.vue'

  export default {
    name: 'userList',
    components: {
      DyPanelBody,
      DyPanel,
      DyPanelHeader,
      resourceUpdate,
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
          visible: false,
          title: '新增菜单'
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
       * 执行列表查询
       * */
      this.doSearchList()
    },

    methods: {
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
        authTbResourceApi.selectTreeList(this.queryParam).then(msg => {
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
