<template>
  <div>
    <div class="title">
      选课
    </div>
    <el-form ref="form" :inline="true" :model="form" class="form-search">
      <el-form-item>
        <el-input type="input" placeholder="关键字" prefix-icon="el-icon-search" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="table-container">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="课程名"
          width="150">
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
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="onSel(scope.row.id)">选课
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
      this.$bus.emit(EventConstant.SHOW_BACK_BTN,{show:false});
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
        tableData: [],
        rules: {
        },
        userInfo: JSON.parse(sessionStorage.getItem("userInfo")),
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
      onSel(id){
        this.$http.post(Constant.PATH_COURSE + id +"/user", this.userInfo).then(response => {
          this.getList();
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
