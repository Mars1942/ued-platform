<template>
  <el-container class="box">
    <el-header>
      <el-row>
        <el-col :span="24" class="header-top">&nbsp;</el-col>
      </el-row>
      <el-row type="flex" justify="start" class="row-center header-main">
        <el-col :span="2" class="row-center">
          <img src="./../assets/logo.png"/>
        </el-col>
        <el-col :span="6" class="row-center">
          <span class="title">
            学生选课系统
          </span>
        </el-col>
        <el-col :span="4" :offset="12" class="row-center text-center">
          <el-row class="user-row" type="flex" justify="start">
            <el-col :span="6" class="row-center text-center">
              <i class="el-icon-fa-user-circle user-image"></i>
            </el-col>
            <el-col :span="10" class="text-center">
              諸葛孔明
            </el-col>
            <el-col :span="3" class="text-center">|</el-col>
            <el-col :span="5" class="text-center">
              <el-button type="text">退出</el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-header>
    <div class="main-container">
      <el-container class="el-main-container">
        <el-aside width="200px">
          <el-menu default-active="/admin-main/user-list" router>
            <el-menu-item index="/admin-main/user-list">
              <i class="el-icon-fa-user-o"></i>
              <span>用户管理</span>
            </el-menu-item>
            <el-menu-item index="/admin-main/app-list">
              <i class="el-icon-menu"></i>
              <span>功能管理</span>
            </el-menu-item>
            <el-menu-item index="/admin-main/role-list">
              <i class="el-icon-fa-user-secret"></i>
              <span>角色管理</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </div>
  </el-container>
</template>
<script>
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";
  export default {
    components: {
      ElCol,
      ElRow
    },
    data() {
      return {}
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      toggle(){
        this.isCollapse = !this.isCollapse;
      }
    }
  }
</script>
<style lang="less" scoped>
  @import './../style';

  .box{height:100%;}
  .row-center {
    align-items: center;
  }

  .el-header {
    background: #FFFFFF;
    padding: 0;
    align-items: center;
    box-shadow: 0 0 2px #888;
  }

  .header-main {
    height: 56px;
  }

  .title {
    margin: 0;
    font-size: 20px;
  }

  .header-top {
    background: @base-color;
    height: 5px;
  }

  .el-container {
    align-items:stretch;
    background: @container-bg-color;
  }

  .main-container {
    height:100%;
    margin-top: 1px;
    overflow: auto;
    background: @container-bg-color;
  }

  .el-main-container {
    margin: 40px;
    border: 1px solid #DFDFDF;
  }

  .el-aside {
    background: @color-bg-white;
  }

  .el-main {
    background: @color-bg-white;
    padding: 0;
    min-height:600px;
  }

  .el-menu {
    height: 100%;
  }

  .user-row {
    width: 150px;
    font-size: 14px;
    align-items: baseline;
  }

  .text-center {
    text-align: center;
  }

  .user-image {
    font-size: 25px
  }
</style>
