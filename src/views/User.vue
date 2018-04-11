<template>
	<section>
	<section class="page-content">
        <!--工具条-->
        <div class="sec-search">
            <el-form :inline="true" :model="searchForm" class="demo-form-inline" size="small">
                <el-form-item label="用户名">
                    <el-input v-model="searchForm.username" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item label="用户类型">
                    <el-input v-model="searchForm.userType" placeholder="用户类型"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="searchForm.status" placeholder="状态">
                        <el-option label="状态一" value=""></el-option>
                        <el-option label="状态二" value=""></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" v-on:click="searchList">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
		<!--列表-->
        <section>
            <div class="sec-toolbar"><el-button type="primary" icon="el-icon-plus" @click="onAddDalog"  size="small">新增用户</el-button></div>
            <div class="sec-table">
                <el-table
                        :data="tableModule.tableData"
                        border
                        stripe
                        style="width: 100%">
                    <el-table-column type="index" label="序号" width="80px"></el-table-column>
                    <el-table-column
                            prop="username"
                            label="用户名"></el-table-column>
                    <el-table-column
                            prop="userType"
                            label="用户类型"></el-table-column>
                    <el-table-column label="是否启用">
                        <template slot-scope="scope">
                            <el-switch
                                    v-if="scope.row.status == 1"
                                    v-model="userStatus.open"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949">
                            </el-switch>
                            <el-switch
                                    v-else
                                    v-model="userStatus.close"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button
                                    size="mini"
                                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </section>
    </section>
    <el-dialog
            :title="handleView.dialogTitle"
            :visible.sync="handleView.dialogVisible"
            width="350px">
        <section>
            <el-form ref="addForm" :model="addForm" :rules="rules" label-width="80px" class="demo-ruleForm" size="small">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="addForm.username" placeholder="请输入用户名">
                        <template slot="append">@{{handleView.parentMemberId}}</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="真实姓名" prop="realname">
                    <el-input v-model="addForm.realname" placeholder="请输入真实姓名"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="psw" v-if="handleView.dialogTitle == '新增'">
                    <el-input  type="password" v-model="addForm.psw" placeholder="请输入至少三种字符组合"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass" v-if="handleView.dialogTitle == '新增'">
                    <el-input  type="password" v-model="addForm.checkPass" placeholder="请再次输入密码"></el-input>
                </el-form-item>
                <el-form-item label="用户类型" prop="userType">
					<el-select v-model="addForm.type" placeholder="用户类型">
                        <el-option label="管理员" value=""></el-option>
                        <el-option label="普通用户" value=""></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </section>
        <span slot="footer" class="dialog-footer">
    <el-button @click="handleView.dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="onSubmit">确 定</el-button>
  </span>
    </el-dialog>

	</section>
</template>
<script>

export default {
  data() {
    return {
      searchForm: {},
      addForm: {},
      userStatus: {
        open: true,
        close: false
      },
      tableModule: {
        tableData: [{
			username:'admin',
			userType:'管理员',
			status:true
		},{
			username:'小明',
			userType:'普通用户',
			status:true
		}]
      },
      handleView: {
        dialogVisible: false,
        dialogTitle: "新增",
        parentMemberId: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, message: "长度不少于 3 个字符", trigger: "blur" }
        ],
        realname: [
          { required: true, message: "请输入真实名字", trigger: "blur" },
          { min: 3, message: "长度不少于 3 个字符", trigger: "blur" }
        ],
        psw: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "长度不少于 6 个字符", trigger: "blur" }
        ],
        checkPass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "长度不少于 6 个字符", trigger: "blur" }
        ],
        userType: [
          { required: true, message: "请选择用户类型", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    searchList: function() {
      var _this = this;
      var param = _this.searchForm;
      _this.tableModule.tableData = [];
      console.log(11);
      /* OMS.ajax_post(url, param).success(function(result) {
        if (result.coded == 0) {
          //成功
          _this.tableModule.tableData = result.data.rows;
        }
      }); */
    },
    onAddDalog: function() {
      var _this = this;
      _this.addForm = {};
      _this.handleView.dialogTitle = "新增";
      _this.handleView.dialogVisible = true;
    },
    onSubmit: function() {
      var _this = this;
      if (_this.handleView.dialogTitle == "新增") {
        _this.handleView.dialogVisible = false;
      }
    },
    handleEdit: function(index, row) {
      var _this = this;
      _this.addForm = {};
      _this.handleView.dialogTitle = "修改";
      _this.handleView.dialogVisible = true;
    },
    handleDelete: function(index, row) {
      var _this = this;
      _this
        .$confirm("此操作将永久删除, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(function() {
          OMS.ajax_post(OMSURL.SETMEMBER_DELETE, {
            memberId: row.memberId
          }).success(function(result) {
            if (result.coded == 0) {
              //成功
              _this.$message.success("删除成功");
            }
          });
        })
        .catch(function() {});
    }
  }
};
</script>

<style scoped>
.page-body {
  margin: 0;
  padding: 0;
}
.page-content {
  padding: 5px 15px;
  margin-bottom: 15px;
  background-color: #fff;
}

.sec-search,
.sec-form,
.list-form {
  padding: 12px 0;
}
.sec-search .el-upload-list {
  padding-left: 20px;
  display: inline-block;
  vertical-align: middle;
}
.sec-search .el-form--inline .el-form-item {
  margin-right: 22px;
}
.list-form .el-cascader {
  width: 100%;
}
.sec-search {
  border-bottom: 1px dashed #ddd;
}
.sec-search .el-form-item .el-select,
.sec-form .el-form-item .el-select,
.sec-forms .el-form-item .el-select,
.list-form .el-form-item .el-select {
  width: 100%;
}
.sec-toolbar {
  padding-top: 15px;
}
.sec-form {
  width: 500px;
}
.sec-forms {
  padding: 12px 0;
}
.sec-forms .line {
  text-align: center;
}
.sec-page {
  margin-top: 5px;
  padding: 5px;
  background-color: #fafafa;
}
.page-alert {
  padding: 10px 0;
}
.sec-table {
  padding: 12px 0;
}
.sec-table .table-a {
  color: #1f7adb;
}
.sec-table .el-input__inner {
  height: 24px;
}
.sec-table .el-table thead > tr {
  background-color: #fafafa;
}
.sec-table .el-table td,
.sec-table .el-table th {
  padding: 4px 0;
}
.el-dialog .sec-table .el-table td,
.el-dialog .sec-table .el-table th {
  padding: 3px 0;
}
.sec-table .el-button {
  margin-bottom: 5px;
  padding: 5px 8px;
  border-radius: 1px;
}
</style>