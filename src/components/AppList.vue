<template>
  <div>
    <div class="title">
      应用管理
    </div>
    <el-form ref="form" :inline="true" :model="form" class="form-search">
      <el-form-item>
        <el-input type="input" placeholder="关键字" prefix-icon="el-icon-search" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
      </el-form-item>
    </el-form>
    <el-row type="flex" justify="end" class="btn-container">
      <el-col :span="6" style="text-align: end;">
        <el-button type="success" size="mini" @click="openAdd"><i class="el-icon-plus"></i>&nbsp;&nbsp;添加新应用
        </el-button>
      </el-col>
    </el-row>
    <div class="table-container">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="应用名">
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


    <el-dialog :title="isUpdateForm ? '修改应用':'添加新应用'" :visible.sync="formVisible">
      <el-form :model="addForm" :rules="rules" ref="addForm" class="form-add" label-width="100px">
        <el-form-item label="应用名称：" prop="name">
          <el-input v-model="addForm.name" placeholder="请输入应用名称"></el-input>
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
          name: ''
        },
        formVisible: false,
        isUpdateForm: false,
        showPassword: false,
        addForm: {
          id: '',
          name: ''
        },
        tableData: [],
        rules: {
          name: [
            {required: true, message: '应用名不能为空', trigger: 'blur'},
            {min: 1, max: 12, message: '长度在 1 到 12 个字符', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      getList(){
        this.$http.get(Constant.PATH_APPLICATION_LIST, {params: {'pageNumber': this.pagination.number - 1}}).then(response => {
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
        this.$http.get(Constant.PATH_APPLICATION + id).then(response => {
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
            this.$http.post(Constant.PATH_APPLICATION, this.addForm).then(response => {
              this.formVisible = false;
              this.getList();
            });
          }
        });
      },
      handleUpdate(){
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$http.put(Constant.PATH_APPLICATION + this.addForm.id, this.addForm).then(response => {
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
          this.$http.delete(Constant.PATH_APPLICATION + id).then(response => {
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
