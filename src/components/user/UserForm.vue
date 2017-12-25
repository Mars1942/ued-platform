<template>
  <el-container>
    <el-header class="header-title">
      {{title}}
    </el-header>
    <el-main>
      <el-form :model="form" :rules="rules" ref="form" class="form-add" label-width="100px">
        <el-form-item label="用户姓名：" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="登录名：">
          <el-input v-model="form.loginName" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="passWord">
          <el-input :type="showPassword ? 'text':'password'" placeholder="请输入密码" v-model="form.passWord"></el-input>
        </el-form-item>
        <el-form-item>
          <el-switch
            v-model="showPassword"
            active-text="显示密码">
          </el-switch>
        </el-form-item>
        <el-form-item label="用户性别：">
          <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option label="男" value="0"></el-option>
            <el-option label="女" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户年龄：">
          <el-input-number v-model="form.age" :min="1" :max="200"></el-input-number>
        </el-form-item>
        <el-form-item label="用户角色：">
          <el-select multiple v-model="selectRoleList" placeholder="请选择">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="$router.back(-1)">返 回</el-button>
          <el-button v-if="form.id" type="success" @click="handleUpdate">修 改</el-button>
          <el-button v-if="!form.id" type="success" @click="handleAdd">添 加</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
  import Constant from '@/global/URLConstant'
  import EventConstant from '@/global/EventConstant'
  import ElFormItem from "../../../node_modules/element-ui/packages/form/src/form-item";
  export default {
    components: {ElFormItem},
    created() {
      this.$bus.emit(EventConstant.SHOW_BACK_BTN, {show: true});
      this.getRoleList();
      if(this.form.id){
        this.$http.get(Constant.PATH_USER + this.form.id).then(response => {
          if (response.body.result.sex != null) {
            response.body.result.sex += '';
          }
          this.form = response.body.result;
          var uToRList = response.body.result.uToRList;
          for (var i = 0; i < uToRList.length; i++) {
            this.selectRoleList.push((uToRList[i].role.id));
          }
        });
      }

    },
    data() {
      return {
        showPassword: false,
        title: this.$route.params.title,
        form: {
          id: this.$route.params.id
        },
        roleList: [],
        selectRoleList: [],
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
      getRoleList(){
        this.$http.get(Constant.PATH_ROLE_LIST_ALL).then(response => {
          this.roleList = response.body.result;
        });
      },
      handleAdd() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.form.roleIds = this.selectRoleList;
            this.$http.post(Constant.PATH_USER, this.form).then(response => {
            });
          }
        });
      },
      handleUpdate(){
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.form.roleIds = this.selectRoleList;
            this.$http.put(Constant.PATH_USER + this.form.id, this.form).then(response => {
            });
          }
        });
      }
    }
  }
</script>
