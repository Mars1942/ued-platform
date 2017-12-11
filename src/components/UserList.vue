<template>
  <div>
    <div class="title">
      用戶管理
    </div>
    <el-form ref="form" :inline="true" :model="form" class="form-search">
      <el-form-item label="选择角色">
        <el-select v-model="form.role" placeholder="请选择角色">
          <el-option label="全部角色" value=""></el-option>
          <el-option label="教师" value="teacher"></el-option>
          <el-option label="学生" value="student"></el-option>
          <el-option label="管理员" value="admin"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input type="input" placeholder="关键字" prefix-icon="el-icon-search" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
      </el-form-item>
    </el-form>
    <el-row type="flex" justify="end" class="btn-container">
      <el-col :span="6" style="text-align: end;">
        <el-button type="success" size="mini" @click="openAdd"><i class="el-icon-plus"></i>&nbsp;&nbsp;添加新用户
        </el-button>
      </el-col>
    </el-row>
    <div class="table-container">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性別">
          <template slot-scope="scope">
            <span v-if="scope.row.sex === 0">
              男
            </span>
            <span v-if="scope.row.sex === 1">
              女
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="age"
          label="年龄">
        </el-table-column>
        <el-table-column
          prop="role"
          label="角色">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.role === 'student'" type="success">
              {{scope.row.role}}
            </el-tag>
            <el-tag v-if="scope.row.role === 'teacher'" type="info">
              {{scope.row.role}}
            </el-tag>
            <el-tag v-if="scope.row.role === 'admin'">
              {{scope.row.role}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="openEdit(scope.row.id)">编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.id)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>
    <div class="pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.number"
        :page-size="pagination.size"
        layout="total, prev, pager, next, jumper"
        :total="pagination.total">
      </el-pagination>
    </div>


    <el-dialog :title="isUpdateForm ? '修改用户':'添加新用户'" :visible.sync="formVisible">
      <el-form :model="addForm" :rules="rules" ref="addForm" class="form-add" label-width="80px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addForm.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="登录名">
          <el-input v-model="addForm.loginName" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="passWord">
          <el-input :type="showPassword ? 'text':'password'" placeholder="请输入密码" v-model="addForm.passWord"></el-input>
        </el-form-item>
        <el-form-item>
          <el-switch
            v-model="showPassword"
            active-text="显示密码">
          </el-switch>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="addForm.sex" placeholder="请选择性别">
            <el-option label="男" value="0"></el-option>
            <el-option label="女" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input-number v-model="addForm.age" :min="1" :max="200"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="formVisible = false">取 消</el-button>
        <el-button v-if="isUpdateForm" type="success" @click="handleUpdate">修 改</el-button>
        <el-button v-if="!isUpdateForm" type="success" @click="handleAdd">添 加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Constant from '../global/Constant'
  export default {
    created() {
      this.getList();
    },
    data() {
      return {
        pagination: {
          number: 1,
          size: 10,
          total: 0
        },
        form: {
          name: '',
          role: ''
        },
        formVisible: false,
        isUpdateForm: false,
        showPassword: false,
        addForm: {
          id: '',
          name: '',
          loginName: '',
          passWord: '',
          age: 0,
          sex: 0,
        },
        tableData: [],
        rules: {
          name: [
            {required: true, message: '用户名不能为空', trigger: 'blur'},
            {min: 1, max: 12, message: '长度在 1 到 12 个字符', trigger: 'blur'}
          ],
          passWord: [
            {required: true, message: '密码不能为空', trigger: 'blur'},
            {min: 1, max: 12, message: '长度在 1 到 12 个字符', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      getList(){
        this.$http.get(Constant.PATH_USER_LIST, {params: {'pageNumber': this.pagination.number - 1}}).then(response => {
          this.tableData = response.body.result.content;
          this.pagination.size = response.body.result.size;
          this.pagination.total = response.body.result.totalElements;
        });
      },
      handleSizeChange(){

      },
      handleCurrentChange(currentPage){
        this.pagination.number = currentPage;
        this.getList();
      },
      openAdd(){
        this.formVisible = true;
        this.isUpdateForm = false;
        this.addForm = {};
      },
      openEdit(id){
        this.addForm = {};
        this.$http.get(Constant.PATH_USER + id).then(response => {
          if (response.body.result.sex != null) {
            response.body.result.sex += '';
          }
          this.addForm = response.body.result;
          this.formVisible = true;
          this.isUpdateForm = true;
        });
      },
      handleDelete(id){
        this.openConfirm(id);
      },
      handleAdd() {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$http.post(Constant.PATH_USER_ADD, this.addForm).then(response => {
              this.getList();
            });
          }
        });
      },
      handleUpdate(){
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$http.put(Constant.PATH_USER + this.addForm.id, this.addForm).then(response => {
              this.formVisible = false;
              this.getList();
            });
          }
        });
      },
      openConfirm(id) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete(Constant.PATH_USER + id).then(response => {
            this.formVisible = false;
            this.getList();
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .title {
    padding: 20px;
  }

  .form-search {
    padding: 20px;
    background: #F6F6F6;
  }

  .form-search > * {
    margin-bottom: 0;
  }

  .table-container {
    padding: 0 20px;
  }

  .pagination-container {
    padding: 20px 10px 20px 20px;
  }

  .pagination-container > * {
    width: 600px;
    margin: 0 auto;
  }

  .btn-container {
    padding: 20px;
  }

  .form-add .el-select {
    width: 100%;
  }
</style>
