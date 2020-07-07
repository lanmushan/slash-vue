<template>
  <div>
    <el-form :model="updateForm" :rules="rules" ref="updateForm" label-width="100px" class="demo-ruleForm" @submit.native.prevent>
      <el-row>
        <el-col :xs="24" :sm="12" :md="8">
          <el-form-item label="头像" prop="name">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-row>
          <el-col :xs="24" :sm="12" :md="12">
            <el-form-item label="登录账户" prop="account">
              <el-input v-model="updateForm.account"  placeholder="请输入登录账户" clearable=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12">
            <el-form-item label="账户类型" prop="accountType">
                <el-select v-model="updateForm.accountType"  style="width: 100%">
                    <el-option value="default" label="默认"></el-option>
                </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="12" :md="12">
            <el-form-item label="用户昵称" prop="nickName">
              <el-input v-model="updateForm.nickName" placeholder="请输入用户昵称" clearable=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12">
            <el-form-item label="用户姓名" prop="username">
              <el-input v-model="updateForm.username" placeholder="请输入用户姓名" clearable=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12">
            <el-form-item label="性别" prop="sex">
              <el-radio v-model="updateForm.sex" :label="1" value="1">男</el-radio>
              <el-radio v-model="updateForm.sex" :label="0" value="0" >女</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <el-col :xs="24" :sm="12" :md="12">
          <el-form-item label="证件号码" prop="idCard">
            <el-input v-model="updateForm.idCard" placeholder="请输入证件号码" clearable=""></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12">
          <el-form-item label="登录密码" prop="loginPassword">
            <el-input v-model="updateForm.loginPassword" placeholder="请输入登录密码" show-password="*" clearable=""></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12">
          <el-form-item label="手机号码" prop="phone">
            <el-input v-model="updateForm.phone" placeholder="请输入联系电话" clearable=""></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12">
          <el-form-item label="联系邮箱" prop="email">
            <el-input v-model="updateForm.email" placeholder="请输入联系邮箱" clearable=""></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="12" :md="12">
          <el-form-item label="角色" prop="roleCodeList">
            <el-select style="width: 100%" v-model="updateForm.roleCodeList" multiple placeholder="请选择">
              <el-option
                v-for="item in roleList"
                :key="item.roleCode"
                :label="item.roleName"
                :value="item.roleCode">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12">
          <el-form-item label="部门" prop="name">
              <select-tree placeholder="请选择部门" :treeList="deptList" :props="deptProps"></select-tree>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="12" :md="12">
          <el-form-item label="账户状态" prop="name">
            <el-radio v-model="updateForm.isLock" :label="0">启用</el-radio>
            <el-radio v-model="updateForm.isLock" :label="1">禁用</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
  import authTbUserApi from '@/apis/auth/authTbUserApi.js'
  import  HttpCode from '@/js/httpCode.js'
  export default {
    name: 'UserUpdate',
    components:{
      "SelectTree":()=>import("@/components/selecttree/SelectTree.vue")
    },
    data () {
      return {
        updateForm: {
          id: '',
          deptId: '',
          nickName: '',
          username: '',
          phone: "",
          idCard: '',
          email: '',
          sex: 1,
          account:"",
          loginPassword:"",
          fkPostId:"",
          isLock:0,
          accountType:"default",
          headImgAddress:"",
          roleCodeList:[],
        },
        deptProps: {
          children: 'children',
          label: 'deptName'
        },
        rules: {
          account: [
            {required: true, message: '请输入登录账号', trigger: 'blur'},
            {min: 2, max: 32, message: '登录账户长度2-32字符', trigger: 'blur'}
          ],
          nickName: [
            {required: true, message: '请输入用户昵称', trigger: 'change'}
          ],
          phone: [
            {required: true, message: '请输入用户昵称', trigger: 'change'}
          ],
          username: [
            { required: true, message: '请输入姓名', trigger: 'change'},
            {min: 2, max: 10, message: '用户姓名2-10字符', trigger: 'blur'}
          ],
          idCard: [
            { required: true, message: '请输入身份证号码', trigger: 'change'}
          ],
          type: [
            {type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change'}
          ],
          resource: [
            {required: true, message: '请选择活动资源', trigger: 'change'}
          ],
          desc: [
            {required: true, message: '请填写活动形式', trigger: 'blur'}
          ]
        }
      }
    },
    created(){
      //可能需要特殊处理，手动赋值
      this.updateForm=this.data;
      console.log(this.updateForm);
    },
    methods: {
        submitForm(){
         this.$refs["updateForm"].validate((valid) => {
              if(valid)
              {

              this.submitFormHandle();


              }else {
                this.cancelSubmitForm();
              }
          })
        },
        submitFormHandle(){
          if(this.updateForm.id==undefined||this.updateForm.id=="")
          {
            authTbUserApi.addUser(this.updateForm).then((msg)=>{
               this.submitFormSuccess(msg);
            }).catch((msg)=>{
              if(msg.cdoe=400)
              {
                this.formError(msg)
              }
              this.cancelSubmitForm();
            })
          }else{
            authTbUserApi.updateForm(this.updateForm);
          }
        },
        submitFormSuccess(msg){
          this.$store.commit('successSubmitForm',{name:this.formKey,data:msg})
        },
        cancelSubmitForm(){
          this.$store.commit("cancelSubmitForm",{name:this.formKey})
        },
        formError(msg){
            if(msg.code==HttpCode.HTTP400)
            {
              for (let row of msg.errors)
              {
                let fields=this.$refs['updateForm'].fields.filter((it)=>{return it.prop==row.errName});
                if(fields.length>0)
                {
                    fields[0].validateMessage = row.errMsg;
                    fields[0].validateState = 'error';
                }
              }

            }

         }
    },
    props:{
      formKey:{
        type:String,
        default:"currentForm"
      },
      roleList:{
        type:Array,
        default: []
      },
      deptList:{
        type:Array,
        default:[]
      },
      data:{
        type:Array,
        default:[],
      }
    },
    computed: {
      submitFormEventListener() {
        return this.$store.getters.onEvent(`${this.formKey}-submitForm`);
      }
    },
    watch: {
      submitFormEventListener: function (a, b) {
        if (a==null||a==b) {
          return null;
        }
        this.submitForm();
      }
    },
  }
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }

  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
</style>
