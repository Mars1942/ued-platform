<template>
  <el-container>
    <el-header class="header-title">
        {{title}}
    </el-header>
    <el-main>
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="应用名称：" prop="name">
          <el-input v-model="form.name" placeholder="请输入应用名称"></el-input>
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
  export default {
    created() {
      this.$bus.emit(EventConstant.SHOW_BACK_BTN, {show: true});
      if(this.form.id){
        this.$http.get(Constant.PATH_APPLICATION + this.form.id).then(response => {
          this.form = response.body.result;
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
        rules: {
          name: [
            {required: true, message: '应用名不能为空', trigger: 'blur'},
            {min: 1, max: 12, message: '长度在 1 到 12 个字符', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      handleAdd() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.$http.post(Constant.PATH_APPLICATION, this.form).then(response => {
            });
          }
        });
      },
      handleUpdate(){
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.$http.put(Constant.PATH_APPLICATION + this.form.id, this.form).then(response => {
            });
          }
        });
      }
    }
  }
</script>
