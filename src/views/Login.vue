<template>
<div class="login-box" id="loginDiv">
    <div class="login-hd">
        <span class="title">管理系统</span>
        <span class="small">Management System</span>
    </div>
    <div class="login-bd">
        <div class="login-w">
            <div class="box-right">
                <div class="login">
                    <div class="login-title">欢迎登录</div>
                    <section class="login-box">
                        <el-form :model="loginForm" :rules="rules"  ref="loginForm" label-width="60px" size="small">
                            <el-form-item label="用户名">
                                <el-input v-model.number="loginForm.account" placeholder="请输入用户名"></el-input>
                            </el-form-item>
                            <el-form-item label="密码">
                                <el-input type="password" v-model="loginForm.passwd"  placeholder="请输入密码"></el-input>
                            </el-form-item>
                            <!--<el-form-item label="验证码" prop="vercode">
                               <el-col :span="12"><el-input v-model="loginForm.vercode" placeholder="请输入验证码"></el-input></el-col>
                               <el-col :span="1">&nbsp;&nbsp;</el-col>
                               <el-col :span="11"><span class="login-img"><img src="static/images/login/11.png"></span></el-col>
                           </el-form-item>-->
                            <el-form-item>
                                <el-col :span="12"><el-checkbox v-model="loginForm.rememberMe"> 记住密码</el-checkbox></el-col>
                                <el-col :span="12"><a href="#" class="login-text">忘记密码</a></el-col>
                            </el-form-item>
                            <el-form-item><el-button type="primary" @click.native.prevent="submitForm" :loading="logining">登录</el-button></el-form-item>
                            <el-form-item><a href="register.html">没有账号？立即注册</a></el-form-item>
                        </el-form>
                    </section>
                </div>
            </div>
        </div>
    </div>

    <div class="login-ft">
        <div class="copyright">
            <p>厦门XXXX有限公司 版权所有&nbsp;&nbsp;闽ICP备15013510号-1</p>
        </div>
    </div>
</div>
</template>

<script>

export default {
  data() {
    return {
      logining: false,
      loginForm: {
        account: "admin",
        passwd: "123456",
        rememberMe: true
      },
      rules: {
        account: [
          { required: true, message: "请输入账号", trigger: "blur" }
          //{ validator: validaePass }
        ],
        passwd: [
          { required: true, message: "请输入密码", trigger: "blur" }
          //{ validator: validaePass2 }
        ]
      },
      checked: true
    };
  },
  methods: {
    submitForm: function( ) {
      var _this = this;
      _this.$refs.loginForm.validate(valid => {
        if (valid) {
          _this.logining = true;
          var loginParams = {
            username: _this.loginForm.account,
            password: _this.loginForm.passwd
          };
        
          localStorage.setItem("user", JSON.stringify(loginParams));
          //this.$router.push({ path: "/user" });
          console.log('router');
          this.$router.push('/user');
        
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="css" scoped>
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
*:before,
*:after {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
a,
a:hover,
a:focus {
  color: #409eff;
  text-decoration: none;
  outline: none;
}
body {
  margin: 0;
  padding: 0;
  font-family: Arial, Helvetica, "Helvetica Neue", "Microsoft YaHei",
    "\5B8B\4F53", "\5b8b\4f53", sans-serif;
  font-size: 14px;
  color: #393939;
  min-width: 1000px;
  overflow: auto;
}
.clearfix {
  *zoom: 1;
}
.clearfix:after {
  clear: both;
}
a {
  text-decoration: none;
}
.login-hd,
.login-w {
  margin: auto;
  width: 1000px;
}
.login-hd {
  position: relative;
  /*margin-top:30px;*/
  padding: 20px 0 0 20px;
  height: 80px;
}
.login-hd span {
  display: block;
  font-weight: bold;
}
.login-hd .title {
  font-size: 24px;
  color: #409eff;
  letter-spacing: 2px;
}
.login-hd .small {
  line-height: 26px;
  font-size:14px;
  color: #666;
}
.login-bd {
  height: 482px;
  background-color: #1f7adb;
}
.login-bd .login-w {
  height: 482px;
  background: url("../images/login/login_left.png") no-repeat;
}
.box-left {
  float: left;
}
.box-left img {
  height: 400px;
  border: 0;
}
.box-right {
  float: right;
}
.login {
  margin-top: 45px;
  width: 350px;
  padding: 20px;
  background-color: #fff;
  background-color: rgba(255, 255, 255, 0.98);
  border: 1px solid #ccc;
}
.login .login-title {
  text-align: center;
  font-size: 20px;
  color: #999;
}
.login .login-box {
  padding-top: 15px;
}
.login .el-button {
  width: 100%;
}
.login-img {
  display: inline-block;
}
.login-img img {
  vertical-align: middle;
  height: 32px;
  border: 0;
}
.login .login-text {
  display: block;
  text-align: right;
  color: #444;
}
.copyright {
  padding: 30px 15px 15px 15px;
}
.copyright p {
  display: block;
  margin: 0;
  padding: 0;
  line-height: 22px;
  color: #999;
  text-align: center;
}

/* register */
.bg {
  background-color: #e6e6e6;
}
.reg-hd:after {
  display: block;
  content: "";
  height: 0;
  clear: both;
}
.register {
  margin: auto;
  width: 80%;
  max-width: 1000px;
}
header {
  padding: 15px 0;
}
.reg-hd .left {
  float: left;
}
.reg-hd .right {
  float: right;
}
.reg-hd .logo {
  font-size: 16px;
  font-weight: bold;
  color: #409eff;
}
header .reg-title {
  padding-top: 15px;
  font-size: 18px;
  text-align: center;
}
.reg-body {
  background-color: #fff;
}
.register .el-tabs__header {
  margin: auto;
  padding: 15px 0;
  width: 260px;
}
.register .el-tabs__nav-wrap::after {
  height: 0;
}
.reg-section {
  margin: auto;
  width: 500px;
  padding: 15px;
}
.reg-section .btn-submit {
  width: 100%;
}
</style>