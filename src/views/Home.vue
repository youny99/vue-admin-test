<template>
	<el-container id="indexDiv" class="min-w">
    <el-header class="header">
        <div class="header-logo pull-left"  v-bind:class="{ logoWidth: leftMenu.isLogoWidth}"><span>OMS</span>订单管理系统</div>
        <div class="nav-navicon pull-left">
            <el-radio-group v-model=" leftMenu.isCollapse">
                <el-radio-button class="el-radio-button0" :label="false" v-bind:class="{ displaynone: leftMenu.isAsideHide}"><i class="el-icon-more"></i></el-radio-button>
                <el-radio-button class="el-radio-button0" :label="true" v-bind:class="{ displaynone: leftMenu.isAsideShow}"><i class="el-icon-more"></i></el-radio-button>
            </el-radio-group>
        </div>
        <div class="nav-menu pull-right">
            <a href="#" class="nav-menu-a"><span> {{sysUserName}} </span></a>
            <a href="#" class="nav-menu-a"><i class="el-icon-bell"></i><span> 消息提醒</span></a>
            <el-dropdown @command="handleCommand">
                        <span class="el-dropdown-link">账号管理<i class="el-icon-arrow-down el-icon--right"></i></span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="e" >修改密码</el-dropdown-item>
                    <el-dropdown-item command="a" divided @click.native="logout">安全退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </el-header>
    <el-container class="main-body">
        <el-aside class="aside" width="{}" v-bind:class="{ overflowY: leftMenu.asideOverflowY}">
            <!--导航菜单-->
				<el-menu :default-active="$route.path" 
                    class="el-menu-vertical-demo" 
                     :collapse=" leftMenu.isCollapse"
                     :unique-opened="leftMenu.isUnique"
                      router>
					<template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
						<el-submenu :index="index+''" v-if="!item.leaf">
							<template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
							<el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
						</el-submenu>
						<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
					</template>
				</el-menu>
        </el-aside>
        <section class="body-right">
				<div class="grid-content bg-purple-light">
					<el-col :span="24" class="breadcrumb-container">
						<el-breadcrumb separator="/" class="breadcrumb-inner">
							<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
								{{ item.name }}
							</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
					<el-col :span="24" class="content-wrapper">
						<transition name="fade" mode="out-in">
							<router-view></router-view>
						</transition>
					</el-col>
				</div>
			</section>
    </el-container>

    <el-dialog
            title="修改密码"
            :visible.sync="passForm.dialogPasswd"
            width="30%">
        <section class="sec-form">
            <el-form ref="passForm" :model="passForm" :rules="rules" label-width="100px" class="demo-ruleForm" size="small">
                <el-form-item label="旧密码" prop="old">
                    <el-input v-model="passForm.old" placeholder="请输入旧密码"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="passwd">
                    <el-input  type="password" v-model="passForm.passwd" placeholder="请输入至少三种字符组合"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input  type="password" v-model="passForm.checkPass" placeholder="请再次输入密码"></el-input>
                </el-form-item>
            </el-form>
        </section>
        <span slot="footer" class="dialog-footer">
    <el-button @click="passForm.dialogPasswd = false">取 消</el-button>
    <el-button type="primary" @click="passForm.dialogPasswd = false">确 定</el-button>
  </span>
    </el-dialog>
</el-container>
</template>

<script>
export default {
  data() {
    return {
      sysName: "后台管理系統",
      collapsed: false,
      sysUserName: "",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      loading: false,
      passForm: {
        dialogPasswd: false,
        passwd: "",
        checkPasswd: "",
        old: ""
      },
      rules: {
        passwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "长度不少于 6 个字符", trigger: "blur" }
        ],
        checkPass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "长度不少于 6 个字符", trigger: "blur" }
        ]
      },
      leftMenu: {
        isCollapse: false,
        isUnique: true,
        isLogoWidth: false,
        isAsideHide: true,
        isAsideShow: false,
        asideOverflowY: true
      }
    }
  },

  methods: {
    handleCommand: function(command) {
      if (command == "e") {
        //window.location.href = "html/setting/company_editpass.html"
        this.passForm.dialogPasswd = true;
      }
    },
    openUrl: function(url) {
      var me = this;
      me.leftMenu.iframeSrc = url;
      me.loading = true;
      setTimeout(function() {
        me.loading = false;
      }, 1000);
    },
    //退出登录
    logout: function() {
      var _this = this;
      this.$confirm("确认退出吗?", "提示", {
        //type: 'warning'
      })
        .then(() => {
          //sessionStorage.removeItem("user");
          localStorage.removeItem("user");
          _this.$router.push("/login");
        })
        .catch(() => {});
    }
  },
  watch: {
    "leftMenu.isCollapse": function() {
      if (this.leftMenu.isCollapse == true) {
        this.leftMenu.isAsideHide = false;
        this.leftMenu.isAsideShow = true;
        this.leftMenu.isLogoWidth = true;
        this.leftMenu.asideOverflowY = false;
      } else {
        this.leftMenu.isAsideHide = true;
        this.leftMenu.isAsideShow = false;
        this.leftMenu.isLogoWidth = false;
        this.leftMenu.asideOverflowY = true;
      }
    }
  },
  mounted() {
    //var user = sessionStorage.getItem("user");
    var user = localStorage.getItem("user");

    if (user) {
      user = JSON.parse(user);
      this.sysUserName = user.username || "";
    }
  }
};
</script>

<style scoped lang="css">
/* */
@charset "utf-8";
#app {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
}
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
}
body {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  color: #333;
  font-size: 14px;
}
a {
  color: #333;
  text-decoration: none;
}

a:hover,
a:focus {
  text-decoration: none;
  outline: none;
}
.min-w {
  /* position: relative; */
  min-width: 800px;
  overflow-x: auto;
}
.header {
  position: absolute;
  height: 50px;
  top: 0;
  left: 0;
  right: 0;
  padding: 0;
  border-bottom: 3px solid #1f7adb;
  background-color: #fff;
  z-index: 9;
}
.pull-left {
  float: left;
}
.pull-right {
  float: right;
}
.header .header-logo {
  display: inline-block;
  width: 220px;
  padding: 0 15px;
  height: 50px;
  line-height: 50px;
  color: #fff;
  background-color: #1f7adb;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  transition: width 0.3s ease-in-out;
  -moz-transition: width 0.3s ease-in-out; /* Firefox 4 */
  -webkit-transition: width 0.3s ease-in-out; /* Safari and Chrome */
  -o-transition: width 0.3s ease-in-out; /* Opera */
}
.header .logoWidth {
  width: 64px;
  overflow: hidden;
}

.header .aside-title span {
  display: inline;
  font-size: 18px;
}
.main-body {
  position: relative;
}
.header:after {
  display: block;
  height: 0;
  content: "";
  clear: both;
}
.header .nav-navicon {
  display: inline-block;
  padding: 0 15px;
  line-height: 50px;
}
.nav-navicon .el-radio-button0 > span {
  border: 0;
  font-size: 20px;
  padding: 5px;
}
.nav-menu .el-dropdown {
  cursor: pointer;
}
.nav-menu {
  display: inline-block;
  padding: 15px 20px 0 20px;
}
.nav-navicon a {
  display: inline-block;
}
.displaynone {
  display: none;
}
.nav-menu-a {
  display: inline-block;
  padding-right: 20px;
}
.nav-menu-a:hover {
  color: #1f7adb;
}
.main-body {
	    display: flex;
  position: absolute;
  left: 0;
  right: 0;
  top: 50px;
  bottom: 0;
  width: 100%;
}
.aside {
  max-width: 220px;
  background-color: #eef1f6;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  overflow: inherit;
}
.overflowY {
  overflow-x: hidden;
  overflow-y: auto;
}
.aside .el-menu {
  border-right: 0;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 220px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.el-main {
  display: block;
  padding: 0;
  height: 100%;
  background-color: #eff3f6;
  overflow: hidden;
}
.container-page {
  position: relative;
  width: 100%;
  height: 100%;
}
.container-page > iframe {
  display: block;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.scrolltyle {
  -webkit-overflow-scrolling: touch;
}
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
::-webkit-scrollbar-thumb {
  /*background-color: rgba(50,50,50,0.25);*/
  background-color: #ccc;
  opacity: 0.5;
  border: 2px solid transparent;
  /*border-radius: 10px;*/
  background-clip: padding-box;
}
::-webkit-scrollbar-thumb:hover {
  /*background-color: rgba(50,50,50,0.5);*/
  background-color: #ddd;
  opacity: 0.5;
}
::-webkit-scrollbar-track {
  background-color: rgba(50, 50, 50, 0.05);
}
</style>
<style lang="scss" scoped>
.body-right {
  flex: 1;
  overflow-y: scroll;
  padding: 20px;
  /* .breadcrumb-container {
    //margin-bottom: 15px;
    .title {
      width: 200px;
      float: left;
      color: #475669;
    }
    .breadcrumb-inner {
      float: right;
    }
  } */
  .content-wrapper {
    background-color: #fff;
    box-sizing: border-box;
  }
}
</style>
