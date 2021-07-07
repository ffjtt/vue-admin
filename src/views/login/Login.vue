<template>
  <div class="login-container">
    <div class="login-box">
      <!-- 头像区域 -->
      <div class="login-logo">
        <img src="~assets/logo.png" alt="" />
      </div>
      <!-- 登录表单区域 -->
      <el-form ref="loginFormRef" class="login-form" :model="loginForm" :rules="loginFormRules">
        <!-- 账号 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password"  type="password"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {login} from 'network/user'

export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "admin",
        password: '123456',
      },
      // 这是表单的验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      },
    };
  },
  methods:{
    login() {
      this.$refs.loginFormRef.validate(validate => {
        if(!validate) return        
        login(this.loginForm).then(({data}) => {
          if(data.meta.status != 200) {
            this.$message.error('登录失败')
          } else {
            this.$message.success('登录成功')
            window.sessionStorage.setItem('token',data.data.token)
            this.$router.push('/home')
          }
        })
      })
    },
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields()
    }
  }
};
</script>

<style lang="scss" scoped>
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

.login-container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: $bg;
}
.login-box {
  position: absolute;
  width: 450px;
  height: 300px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 3px;
  .login-logo {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
  .login-form {
    margin-top: 90px;
    padding: 0 30px;
    .btns {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>