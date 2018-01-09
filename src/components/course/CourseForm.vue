<template>
  <el-container>
    <el-header class="header-title">
      {{title}}
    </el-header>
    <el-main>
      <el-steps v-show="!edit" :active="step" align-center>
        <el-step title="添加课程内容" description="添加课程的基本信息及任课教师"></el-step>
        <el-step title="添加课程学生" description="选择课程的学生"></el-step>
      </el-steps>
      <el-form :model="form" :rules="rules" ref="form" class="form-add" label-width="100px">
        <el-form-item label="课程名称：" prop="name">
          <el-input v-model="form.name" placeholder="请输入课程名称" :disabled="!edit && step == 1"></el-input>
        </el-form-item>
        <el-form-item label="课程时长：">
          <el-input-number v-model="form.time" :min="30" :max="240" :disabled="!edit && step == 1"></el-input-number>
          （分钟）
        </el-form-item>
        <el-form-item label="总座位数：" prop="count">
          <el-input-number v-model="form.count" :min="1" :max="1000" :disabled="!edit && step == 1"></el-input-number>
        </el-form-item>
        <el-form-item label="备注：" prop="memo">
          <el-input v-model="form.memo" placeholder="请输入备注" :disabled="!edit && step == 1"></el-input>
        </el-form-item>
        <el-form-item label="任课教师：">
          <el-select v-model="form.teacher" placeholder="请选择" :disabled="!edit && step == 1">
            <el-option
              v-for="item in teacherList"
              :key="item.id"
              :value="item"
              :label="item.name"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="已选课学生：" v-show="step == 1">
          <el-button type="info" @click="showContainsUser(true)" icon="el-icon-info">点击查看已选择该课程的学生</el-button>
          <el-button type="success" @click="showContainsUser(false)" icon="el-icon-circle-plus">点击增加该课程的学生</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="$router.back(-1)">返 回</el-button>
          <el-button v-if="edit" type="success" @click="handleUpdate">修 改</el-button>
          <el-button v-if="!edit && step == 0" type="success" @click="handleAdd">添 加</el-button>
        </el-form-item>
      </el-form>
    </el-main>
    <el-dialog :visible.sync="dialogVisible" width="70%">
      <el-table
        :data="showUserList"
        height="350"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别">
        </el-table-column>
        <el-table-column
          prop="age"
          label="年龄">
        </el-table-column>
        <el-table-column
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button
              v-if="containsUser"
              size="mini"
              type="danger"
              @click="handleDeleteUser(scope.row.id)">解除绑定
            </el-button>
            <el-button
              v-if="!containsUser"
              size="mini"
              type="success"
              @click="handleAddUser(scope.row.id)">添加
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="pagination.number"
          :page-size="pagination.size"
          layout="total, prev, pager, next, jumper"
          :total="pagination.total">
        </el-pagination>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
  import Constant from '@/global/URLConstant'
  import EventConstant from '@/global/EventConstant'
  import ElFormItem from "../../../node_modules/element-ui/packages/form/src/form-item";
  import ElDialog from "../../../node_modules/element-ui/packages/dialog/src/component";
  export default {
    components: {
      ElDialog,
      ElFormItem
    },
    created() {
      this.getTeacherList();
      this.$bus.emit(EventConstant.SHOW_BACK_BTN, {show: true});
      if (this.edit) {
        this.step = 1;
        this.$http.get(Constant.PATH_COURSE + this.form.id).then(response => {
          this.form = response.body.result;
          this.form.teacher={
            id:this.form.teacherId,
            name:this.form.teacherName
          }
        });
      }
    },
    data() {
      return {
        edit:this.$route.params.edit,
        title: this.$route.params.title,
        form: {
          id: this.$route.params.id
        },
        step:0,
        teacherList: [],
        showUserList: [],
        dialogVisible: false,
        containsUser: false,
        pagination: {
          number: 1,
          size: 10,
          total: 0
        },
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
      handleAddUser(id) {
        this.$http.post(Constant.PATH_COURSE + this.form.id + "/user", {id:id}).then(response => {
          this.showContainsUser(false);
        });
      },
      handleDeleteUser(id) {
        this.$http.delete(Constant.PATH_COURSE_DEL_USER + this.form.id, {params:{userId:id}}).then(response => {
          this.showContainsUser(true);
        });
      },
      showContainsUser(flag){
        this.dialogVisible = true;
        this.containsUser = flag;
        if (this.containsUser) {
          //已选
          this.$http.get(Constant.PATH_USER_LIST_BY_PARAM,{params:{courseId:this.form.id,isSel:1,roleCode:'002'}}).then(response => {
            this.showUserList = response.body.result;
          });
        } else {
          //未选
          this.$http.get(Constant.PATH_USER_LIST_BY_PARAM,{params:{courseId:this.form.id,isSel:0,roleCode:'002'}}).then(response => {
            this.showUserList = response.body.result;
          });
        }
      },
      handleCurrentChange(currentPage){
        this.pagination.number = currentPage;
        this.getList();
      },
      getTeacherList(){
        this.$http.get(Constant.PATH_USER_LIST_BY_PARAM,{params:{roleCode:'001'}}).then(response => {
          this.teacherList = response.body.result;
        });
      },
      handleAdd() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.form.teacherId = this.form.teacher.id;
            this.form.teacherName = this.form.teacher.name;
            this.$http.post(Constant.PATH_COURSE, this.form).then(response => {
                this.step = 1;
                this.form.id = response.body.result;
            });
          }
        });
      },
      handleUpdate(){
        this.$refs.form.validate((valid) => {
          if (valid) {
            var id = this.form.teacherId;
            this.form.teacher = {
              id: id
            };
            this.$http.put(Constant.PATH_COURSE + this.form.id, this.form).then(response => {
            });
          }
        });
      }
    }
  }
</script>
