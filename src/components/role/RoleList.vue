<template>
  <div>
    <div class="title">
      角色管理
    </div>
    <el-form ref="form" :inline="true" :model="form" class="form-search">
      <el-form-item>
        <el-input type="input" placeholder="用户名称" prefix-icon="el-icon-search" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"  @click="getList()">查询</el-button>
      </el-form-item>
    </el-form>
    <el-row type="flex" justify="end" class="btn-container">
      <el-col :span="6" style="text-align: end;">
        <el-button type="success" size="mini" @click="openAdd"><i class="el-icon-plus"></i>&nbsp;&nbsp;添加新角色
        </el-button>
      </el-col>
    </el-row>
    <div class="table-container">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="角色名">
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
        @size-change="handleSizeChange"
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
          name: ''
        },
        applicationList: [],
        selectApplicationList: [],
        tableData: []
      }
    },
    methods: {
      getList(){
        this.form.pageNumber = this.pagination.number - 1;
        this.$http.get(Constant.PATH_ROLE_LIST, {params: this.form}).then(response => {
          this.tableData = response.body.result.content;
          this.pagination.size = response.body.result.size;
          this.pagination.total = response.body.result.totalElements;
        });
      },
      getApplicationList(){
        this.$http.get(Constant.PATH_APPLICATION_LIST_ALL).then(response => {
          this.applicationList = response.body.result;
        });
      },
      handleSizeChange(){

      },
      handleCurrentChange(currentPage){
        this.pagination.number = currentPage;
        this.getList();
      },
      openAdd(){
        this.$router.push({name: 'roleForm', params: {title: '添加角色'}});
      },
      openEdit(id){
        this.$router.push({name: 'roleForm', params: {title: '修改角色', id: id}});
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
          this.$http.delete(Constant.PATH_ROLE + id).then(response => {
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
