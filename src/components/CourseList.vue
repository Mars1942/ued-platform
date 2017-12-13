<template>
  <div>
    <div class="title">
      课程管理
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
        <el-button type="success" size="mini" @click="openAdd"><i class="el-icon-plus"></i>&nbsp;&nbsp;添加新课程
        </el-button>
      </el-col>
    </el-row>
    <div class="table-container">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="课程名">
        </el-table-column>
        <el-table-column
          prop="time"
          label="时长">
        </el-table-column>
        <el-table-column
          prop="hasCount"
          label="已选课人数">
        </el-table-column>
        <el-table-column
          prop="count"
          label="总人数">
        </el-table-column>
        <el-table-column
          prop="teacherName"
          label="教师">
        </el-table-column>
        <el-table-column
          prop="memo"
          label="备注">
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


    <el-dialog :title="isUpdateForm ? '修改课程':'添加新课程'" :visible.sync="formVisible">
      <el-form :model="addForm" :rules="rules" ref="addForm" class="form-add" label-width="100px">
        <el-form-item label="课程名称：" prop="name">
          <el-input v-model="addForm.name" placeholder="请输入课程名称"></el-input>
        </el-form-item>
        <el-form-item label="课程时长：">
          <el-input-number v-model="addForm.time" :min="30" :max="240"></el-input-number>（分钟）
        </el-form-item>
        <el-form-item label="总座位数：" prop="count">
          <el-input-number v-model="addForm.count" :min="1" :max="1000"></el-input-number>
        </el-form-item>
        <el-form-item label="备注：" prop="name">
          <el-input v-model="addForm.memo" placeholder="请输入备注"></el-input>
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
          id: ''
        },
        tableData: [],
        rules: {
          name: [
            {required: true, message: '课程名不能为空', trigger: 'blur'},
            {min: 1, max: 12, message: '长度在 1 到 12 个字符', trigger: 'blur'}
          ],
          teacherName: [
            {required: true, message: '教师姓名不能为空', trigger: 'blur'},
            {min: 1, max: 12, message: '长度在 1 到 12 个字符', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      getList(){
        this.$http.get(Constant.PATH_COURSE_LIST, {params: {'pageNumber': this.pagination.number - 1}}).then(response => {
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
        this.$http.get(Constant.PATH_COURSE + id).then(response => {
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
            this.$http.post(Constant.PATH_COURSE, this.addForm).then(response => {
              this.formVisible = false;
              this.getList();
            });
          }
        });
      },
      handleUpdate(){
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$http.put(Constant.PATH_COURSE + this.addForm.id, this.addForm).then(response => {
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
          this.$http.delete(Constant.PATH_COURSE + id).then(response => {
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
