<template>
  <el-container class="container">
    <el-header class="navbar" height="60px" style="padding:0px">
      <el-row style>
        <el-col :span="3">
          <h3 class="logo">DAIYU后端管理平台</h3>
        </el-col>
        <el-col :span="17">
          <div class="grid-content bg-purple-dark">
            <el-menu
              :default-active="activeIndex"
              class="el-menu-demo"
              mode="horizontal"
            >
              <el-menu-item index="1">处理中心</el-menu-item>
              <el-submenu index="2">
                <template slot="title">我的工作台</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
                <el-menu-item index="2-3">选项3</el-menu-item>
                <el-submenu index="2-4">
                  <template slot="title">选项4</template>
                  <el-menu-item index="2-4-1">选项1</el-menu-item>
                  <el-menu-item index="2-4-2">选项2</el-menu-item>
                  <el-menu-item index="2-4-3">选项3</el-menu-item>
                </el-submenu>
              </el-submenu>
              <el-menu-item index="3" disabled>消息中心</el-menu-item>
              <el-menu-item index="4">
                <a>订单管理</a>
              </el-menu-item>
            </el-menu>
          </div>
        </el-col>
        <el-col :span="4" class="header-right-box">
          <el-row class="fr">
            <el-col :span="24">
              <el-dropdown>
                <span class="el-dropdown-link">
                  管理员
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item icon="el-icon-user">个人中心</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-unlock">修改密码</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-setting">布局设置</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-document">登录日志</el-dropdown-item>
                  <el-dropdown-item divided>安全退出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="left-box" v-show="true" width="200px">
        <el-row class="tac">
          <el-col :span="24">
            <left-menu :menuList="menuList"></left-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-container>
        <el-header height="40px" style="padding:0px" class="tab-header">
          <el-tabs
            @tab-click="tabJump"
            v-model="editableTabsValue"
            closable
            @tab-remove="removeTab"
            class="margin"
          >
            <el-tab-pane
              v-for=" (item, index) in editableTabs"
              :key="item.name"
              :label="item.title"
              :name="item.name"
            >
              <span slot="label">
                <i class="el-icon-date" style="margin-left:10px"></i>
                {{item.title}}
              </span>
            </el-tab-pane>
          </el-tabs>
        </el-header>
        <el-main>
          <transition name="fade">
            <keep-alive>
              <router-view style="background:#f3f3f4;"></router-view>
            </keep-alive>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
import resourceApi from "@/apis/auth/authTbResourceApi.js";
import LeftMenu from "@/components/menu/LeftMenu";
export default {
  components: { LeftMenu },
  data() {
    return {
      activeIndex: '0',
      menuList: [],
      editableTabsValue: "0",
      editableTabs: [
        {
          name: "11111",
          title: "我服务经理"
        }
      ],
      tabIndex: 2
    };
  },
  created() {
    resourceApi.selectCurrentUserMenu().then(msg => {
      if (msg.code == 200) {
        for (let row of msg.rows) {
          if (row.fkParentId == 0) {
            row.childMenu = this.getChildMenu(row, msg.rows);
            this.menuList.push(row);
          }
        }
      }
    });
  },
  computed: {
    secondChange() {
      this.editableTabs = this.$store.state.tab.list;
      this.editableTabsValue = this.$store.state.tab.active;
    }
  },
  watch: {
    secondChange() {
      this.editableTabs = this.$store.state.tab.list;
      this.editableTabsValue = this.$store.state.tab.active;
    }
  },
  methods: {
    tabJump(obj) {
      this.jump(obj.name);
    },
    //判断是否还有子菜单
    getChildMenu(row, rows) {
      var array = [];
      if (row == undefined) {
        return array;
      }
      for (var it of rows) {
        if (it.fkParentId == row.id) {
          it.childMenu = this.getChildMenu(it, rows);
          array.push(it);
        }
      }
      return array;
    }
  }
};
</script>
<style scoped>
@import "../css/layout.css";

.navbar {
  background: white;
}

.header-right-box {
  padding: 20px !important;
  float: right;
}
el-row {
  background: transparent;
}
.left-box {
  background: #304156;
  overflow-y: scroll;
  height: 100%;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}

.el-icon-arrow-down {
  font-size: 12px;
}

.tac {
  overflow: hidden;
  box-sizing: border-box;
}

.el-submenu {
  overflow: hidden;
}

.left-box::-webkit-scrollbar {
  width: 0px;
}

.container {
  height: 100%;
}

.tab-header {
  background: white;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08) inset;
}

.footer {
  height: 30px;
  background: #cccccc;
}

.el-main {
  padding: 0px;
  background: #f3f3f4;
}

.el-tabs .el-tab-pane {
  height: 0px;
  padding: 0px;
}

.el-tabs--border-card > .el-tabs__content {
  padding: 0px;
}

.logo {
  color: #409eff;
  line-height: 60px;
  padding-left: 20px;
  text-overflow: inherit;
}
</style>
