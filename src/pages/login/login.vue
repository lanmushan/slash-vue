<template>
  <div class="login">
    <el-row type="flex" align="middle" class="logo">
      <i class="el-icon-s-finance icon"></i><span class="name">XXX管理系统</span>
    </el-row>
    <el-row type="flex" align="middle" class="container">
      <el-col :span="12" class="left">
        <h1>WELCOME</h1>
        <h4>欢迎来到XXX管理系统</h4>
      </el-col>
      <el-col :span="12">
        <el-row type="flex" class="login-area">
          <p><span class="login-title">登录</span></p>
          <p class="user-name">用户名</p>
          <input type="text">
          <p class="password">密码</p>
          <input type="password">
          <p class="forget"><span>忘记密码</span></p>
          <button class="submit" @click="login">登录</button>
        </el-row>

      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    login() {
      this.$router.push({path: '/'})
    }
  }
}
</script>

<style lang="less" scoped>
@import url('./login.less');
</style>
