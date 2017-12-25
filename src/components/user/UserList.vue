<template>
  <div>
    <div class="title">
      用戶管理
    </div>
    <el-form ref="form" :inline="true" :model="form" class="form-search">
      <el-form-item label="选择角色">
        <el-select v-model="form.roleCode" placeholder="请选择角色">
          <el-option label="全部角色" value=""></el-option>
          <el-option
            v-for="item in roleList"
            :key="item.id"
            :value="item.code"
            :label="item.name"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input type="input" placeholder="关键字" prefix-icon="el-icon-search" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList()">查询</el-button>
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
          label="姓名"
          width="120">
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
          label="角色">
          <template slot-scope="scope">
            <el-tag v-for="item in scope.row.uToRList" size="mini" :key="item.id">
              {{item.role.name}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="150">
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
        @current-change="handleCurrentChange"
        :current-page="pagination.number"
        :page-size="pagination.size"
        layout="total, prev, pager, next, jumper"
        :total="pagination.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import Constant from '@/global/URLConstant'
  import EventConstant from '@/global/EventConstant'
  export default {
    created() {
      this.getList();
//      this.getRoleList();
      this.$bus.emit(EventConstant.SHOW_BACK_BTN, {show: false});
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
          roleCode: ''
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
          roleIds: []
        },
        roleList: [],
        selectRoleList: [],
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
        this.form.pageNumber = this.pagination.number - 1;
        this.$http.get(Constant.PATH_USER_LIST, {params: this.form}).then(response => {
          this.tableData = response.body.result.content;
          this.pagination.size = response.body.result.size;
          this.pagination.total = response.body.result.totalElements;
        });
      },
      getRoleList(){
        this.$http.get(Constant.PATH_ROLE_LIST_ALL).then(response => {
          this.roleList = response.body.result;
        });
      },
      handleCurrentChange(currentPage){
        this.pagination.number = currentPage;
        this.getList();
      },
      openAdd(){
        this.$router.push({name: 'userForm', params: {title: '添加用户'}});
      },
      openEdit(id){
        this.$router.push({name: 'userForm', params: {title: '修改用户', id: id}});
      },
      handleDelete(id){
        this.openConfirm(id);
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

  .el-tag {
    margin-left: 5px;
  }
</style>
