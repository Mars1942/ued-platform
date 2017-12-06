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
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="table-container">
      <el-table stripe
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
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>
    <div class="pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-size="10"
        layout="total, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          role: ''
        },
        tableData: [{
          sex: 0,
          name: '王小虎',
          age: 23,
          role: 'student'
        }, {
          sex: 1,
          name: '王小虎',
          age: 23,
          role: 'teacher'
        }, {
          sex: 0,
          name: '王小虎',
          age: 23,
          role: 'admin'
        },{
          sex: 1,
          name: '王小虎',
          age: 23,
          role: 'teacher'
        }, {
          sex: 0,
          name: '王小虎',
          age: 23,
          role: 'admin'
        },{
          sex: 0,
          name: '王小虎',
          age: 23,
          role: 'student'
        }, {
          sex: 1,
          name: '王小虎',
          age: 23,
          role: 'teacher'
        }, {
          sex: 0,
          name: '王小虎',
          age: 23,
          role: 'admin'
        },{
          sex: 1,
          name: '王小虎',
          age: 23,
          role: 'teacher'
        }, {
          sex: 0,
          name: '王小虎',
          age: 23,
          role: 'admin'
        }]
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
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
</style>
