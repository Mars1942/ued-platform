<template>
  <div>
    <div class="title">
      选课
    </div>
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
              v-if="userInfo.isTeacher==1"
              size="mini"
              @click="userList(scope.row.id)">查看学生
            </el-button>
            <!--<el-button
              v-if="userInfo.isTeacher!=1"
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.id)">取消
            </el-button>-->
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
        var params = {
          params: {
            userId: this.userInfo.id,
            isTeacher: this.userInfo.isTeacher,
            'pageNumber': this.pagination.number - 1
          }
        }
        this.$http.get(Constant.PATH_COURSE_PAGE_BY_PARAM, params).then(response => {
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
      userList(id){
        this.$router.push({name: 'courseToUserList', params: {title: '查看学生', id: id}});
      },
      handleDelete(id){
        this.openConfirm(id);
      },
      openConfirm(id) {
        this.$confirm('是否要取消该课程, 是否继续?', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          this.$http.delete(Constant.PATH_COURSE_DEL_USER + id, {params:{userId:id}}).then(response => {
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
