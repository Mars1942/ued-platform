<template>
  <el-container>
    <el-header class="header">
      <el-row>
        <el-col :span="24" class="header-top">&nbsp;</el-col>
      </el-row>
      <el-row type="flex" justify="start" class="row-center header-main">
        <el-col :span="2" class="row-center">
          <img src="./../assets/logo.png"/>
        </el-col>
        <el-col :span="6" class="row-center">
          <h2>
            运维管理平台
          </h2>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row type="flex" justify="center row-center main-container">
        <el-col :span="8" class="login-container">
          <el-row type="flex" justify="start">
            <el-col :span="24" class="login-text">
              <h4>
                登录
              </h4>
            </el-col>
          </el-row>
          <el-form :model="loginForm" :rules="rules" ref="loginForm">
            <el-form-item prop="loginName">
              <el-input type="text" prefix-icon="el-icon-fa-user-o" v-model="loginForm.loginName" placeholder="请输入用户名"
                        auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item prop="passWord">
              <el-input type="password" prefix-icon="el-icon-fa-key" v-model="loginForm.passWord" placeholder="请输入密码"
                        auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="submitForm('loginForm')">提交</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
  export default {
    data () {
      return {
        loginForm: {
          loginName: '',
          passWord: ''
        },
        rules: {
          loginName: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 1, max: 12, message: '长度在 1 到 12 个字符', trigger: 'blur'}
          ],
          passWord: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 1, max: 12, message: '长度在 1 到 12 个字符', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {

            this.$http.post('/server/user/login',this.loginForm).then(function (response) {
              // 响应成功回调
              console.log(response);
//              loading.close();
            }, function (response) {
              // 响应错误回调
              console.log(response);
//              loading.close();
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .row-center {
    align-items: center;
  }

  .el-header {
    background: #FFFFFF;
    padding: 0;
    align-items: center;
    box-shadow: 0 0 2px #888;
  }

  .header-main {
    height: 56px;
  }

  h2 {
    margin: 0;
  }

  .header-top {
    background: #44B549;
    height: 5px;
  }

  .el-container {
    height: 100%;
    background: #E9E9EB;
  }

  .login-container {
    background: #fff;
    padding: 0 1.33em;
    box-shadow: 0 0 2px #888;
    margin-top: 10%;
  }

  .login-text {
    color: #44B549;
  }

  .login-text > h4 {
    font-weight: normal;
  }

  .el-button {
    width: 100%;
  }
</style>
