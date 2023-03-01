<template>
    <div> 
      <el-form :model="loginForm" status-icon :rules="loginRules" ref="loginForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="账户" prop="username">
          <el-input type="text" v-model="loginForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
        </el-form-item>
        
        <el-form-item>
          <el-button :loading="loading" type="primary" @click.native.prevent="handleLogin">提交</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
        <div class="tips">
          <span style="margin-right:20px;">admin: 11  user: 22</span>
          <span> password: any</span>
        </div>
      </el-form>
    </div>
</template>
<script>
export default {
  data() {
      
      var validateUsername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入账户'));
        } else {
          callback();
        }
      };
      var validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        loginForm: {
          username: '11',
          password: '11'
        },
        loginRules: {
          username: [{required: true,  validator: validateUsername, trigger: 'blur' }],
          password: [{required: true,  validator: validatePassword, trigger: 'blur' }]
        },
        loading: false,
        redirect: undefined
      }
    },
    methods: {
      handleLogin() {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            //登录逻辑
            this.loading = true;
            this.$store.dispatch('user/login',this.loginForm).then(()=>{
              this.$router.push({ path: this.redirect || '/' })
              this.loading = false
            }).catch(()=>{
              this.loading = false
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(loginForm) {
        this.$refs.loginForm.resetFields();
      }
    }
}
</script>

<style lang="scss" scoped>
   .tips {
    font-size: 14px;
    color: #252525;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
</style>