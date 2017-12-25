<template>
  <el-container>
    <el-header class="header-title">
      {{title}}
    </el-header>
    <el-main>
      <el-form :model="form" :rules="rules" ref="form" class="form-add" label-width="100px">
        <el-form-item label="角色名称：" prop="name">
          <el-input v-model="form.name" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="功能：">
          <el-select multiple v-model="selectApplicationList" placeholder="请选择">
            <el-option
              v-for="item in applicationList"
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
      this.getApplicationList();
      this.$bus.emit(EventConstant.SHOW_BACK_BTN, {show: true});
      if (this.form.id) {
        this.$http.get(Constant.PATH_ROLE + this.form.id).then(response => {
          this.form = response.body.result;
          var rToAList = response.body.result.rToAList;
          for (var i = 0; i < rToAList.length; i++) {
            this.selectApplicationList.push((rToAList[i].application.id));
          }
        });
      }
    },
    data() {
      return {
        title: this.$route.params.title,
        form: {
          id: this.$route.params.id,
          name: ''
        },
        applicationList: [],
        selectApplicationList: [],
        rules: {
          name: [
            {required: true, message: '角色名不能为空', trigger: 'blur'},
            {min: 1, max: 12, message: '长度在 1 到 12 个字符', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      getApplicationList(){
        this.$http.get(Constant.PATH_APPLICATION_LIST_ALL).then(response => {
          this.applicationList = response.body.result;
        });
      },
      handleDelete(id){
        this.openConfirm(id);
      },
      handleAdd() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.form.applicationIds = this.selectApplicationList;
            this.$http.post(Constant.PATH_ROLE, this.form).then(response => {
            });
          }
        });
      },
      handleUpdate(){
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.form.applicationIds = this.selectApplicationList;
            this.$http.put(Constant.PATH_ROLE + this.form.id, this.form).then(response => {
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
