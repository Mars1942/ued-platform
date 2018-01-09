<template>
  <div>
    <div class="title">
      学生列表
    </div>
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
        <!--<el-table-column
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.id)">删除
            </el-button>
          </template>
        </el-table-column>-->
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
      this.$bus.emit(EventConstant.SHOW_BACK_BTN, {show: false});
    },
    data() {
      return {
        id:this.$route.params.id,
        userInfo: JSON.parse(sessionStorage.getItem("userInfo")),
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
      }
    },
    methods: {
      getList(){
        this.form.isSel=1;
        this.form.roleCode='002';
        this.form.courseId=this.id;
        this.form.pageNumber = this.pagination.number - 1;
        this.$http.get(Constant.PATH_USER_PAGE_BY_PARAM, {params: this.form}).then(response => {
          this.tableData = response.body.result.content;
          this.pagination.size = response.body.result.size;
          this.pagination.total = response.body.result.totalElements;
        });
      },
      handleCurrentChange(currentPage){
        this.pagination.number = currentPage;
        this.getList();
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

  .el-tag {
    margin-left: 5px;
  }
</style>
