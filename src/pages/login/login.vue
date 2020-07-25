<template>
  <div class="login">
    <div class="login-bg">
    </div>
    <!--    <el-row type="flex" align="middle" class="logo">
          <i class="el-icon-s-finance icon"></i>
          <span class="name">XXX管理系统</span>
        </el-row>-->
    <el-row align="middle" class="container">
      <el-card class="box-card login-box">
        <div slot="header" class="clearfix">
          <h1 style="text-align: center">SLASH管理系统</h1>
        </div>
        <el-form label-position="right" label-width="80px" :model="loginForm" :rules="rules" ref="loginForm">
          <el-form-item label="登录账号" prop="account">
            <el-input v-model="loginForm.account" type="text" autocomplete="off" placeholder="请输入登录账号"></el-input>
          </el-form-item>
          <el-form-item label="登录密码" prop="password">
            <el-input v-model="loginForm.password" type="password" autocomplete="off" placeholder="请输入登录密码"></el-input>
          </el-form-item>
          <el-form-item class="verification-code-box" label="验证码" prop="verificationCode">
            <el-input v-model="loginForm.verificationCode" type="text" autocomplete="off"
                      placeholder="请输入验证码"></el-input>
            <div class="verification-code-img" @click="onVerificationCodeEvent" v-loading="verificationCodeImgLoading">
              <img :src="verificationCodeImgSrc">
            </div>
          </el-form-item>
          <el-button style="width: 100%" type="primary" @click="onLoginBtnEvent()" :loading="logging">{{loginBtnLabel}}
          </el-button>
        </el-form>
      </el-card>
    </el-row>
  </div>
</template>

<script>
  import loginApi from '@/apis/loginApi.js'

  export default {
    data () {
      return {
        loginBtnLabel: '立 即 登 录',
        logging: false,
        verificationCodeImgLoading: true,
        verificationCodeImgSrc: '',
        loginForm: {
          account: 'admin',
          password: '123456',
          verificationCode: '1111'
        },
        rules: {
          account: [
            {required: true, message: '请输入登录账号', trigger: 'blur'},
          ], password: [
            {required: true, message: '请输入登录密码', trigger: 'blur'},
          ],
          verificationCode: [
            {required: true, message: '请输入验证码', trigger: 'blur'},
            {min: 4, max: 6, message: '请输入正确的验证码', trigger: 'blur'}
          ]
        }
      }
    },
    created () {
      this.doRefreshVerificationCode()
    },
    methods: {
      /**
       * 登录事件
       */
      onLoginBtnEvent () {
        this.doLogin()
        /*  this.$router.push({path: '/welcome'})*/
      },
      /**
       * 刷新验证码事件
       */
      onVerificationCodeEvent () {
        this.doRefreshVerificationCode()
      },
      /**
       * 验证码刷新业务处理
       */
      doRefreshVerificationCode () {
        this.verificationCodeImgLoading = true
        loginApi.selectVerificationCode().then((msg) => {
          setTimeout(() => {
            this.verificationCodeImgSrc = msg.row
            this.verificationCodeImgLoading = false
          }, 200)
        })
      },
      doLogin () {
        this.$refs['loginForm'].validate(valid => {
          if (!valid) {
            return
          }
          this.loginBtnLabel = '正 在 登 录 中'
          this.logging = true
          let data = this.cloneDeep(this.loginForm)
          data.password = this.$md5(data.password)
          loginApi.loginManage(data).then((msg) => {
            if (msg.code == 200) {
              loginApi.setToken(msg.row)
              this.$router.push({path: 'welcome'})
            }
          }).catch((msg) => {
            this.logging = false
            this.loginBtnLabel = '立 即 登 录'
            console.log(msg)
          }).finally(() => {
            this.doRefreshVerificationCode()
          })
        })
      }
    },
    mounted () {

    },
    watch: {},
  }
</script>

<style lang="less" scoped>
  @import url("./login.less");
</style>
