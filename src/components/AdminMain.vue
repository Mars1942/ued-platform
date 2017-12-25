<template>
  <el-container class="box">
    <el-header class="app-header">
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
          <el-row class="user-row" type="flex" justify="end" style="color:#909399;">
              {{userInfo.name}}&nbsp;&nbsp;|&nbsp;&nbsp;<el-button type="text" @click="logoff">退出</el-button>
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
              <span>应用管理</span>
            </el-menu-item>
            <el-menu-item index="/admin-main/role-list">
              <i class="el-icon-fa-user-secret"></i>
              <span>角色管理</span>
            </el-menu-item>
            <el-menu-item index="/admin-main/course-list">
              <i class="el-icon-fa-graduation-cap"></i>
              <span>课程管理</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="right-container">
          <el-button type="primary" class="btn-back" size="mini" icon="el-icon-back" round @click="$router.back(-1)" v-show="showBackBtn">返回</el-button>
          <router-view/>
        </el-main>
      </el-container>
    </div>
  </el-container>
</template>
<script>
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";
  import EventConstant from '@/global/EventConstant';
  export default {
    created() {
      this.$bus.on(EventConstant.SHOW_BACK_BTN, (data)=>{
        this.showBackBtn = data.show;
      });
    },
    beforeDestroy() {
      this.$bus.off(EventConstant.SHOW_BACK_BTN);
    },
    components: {
      ElCol,
      ElRow
    },
    data() {
      return {
        userInfo: JSON.parse(sessionStorage.getItem("userInfo")),
        showBackBtn:false
      }
    },
    methods: {
      logoff(){
        sessionStorage.removeItem("userInfo");
        this.$router.push('/');
      }
    }
  }
</script>
<style lang="less">
  @import './../style';

  .app-header {
    background: #FFFFFF;
    padding: 0;
    align-items: center;
    box-shadow: 0 0 2px #888;
    .header-top {
      background: @base-color;
      height: 5px;
    }
    .header-main {
      height: 56px;
    }
    .row-center {
      align-items: center;
    }
    .user-row {
      width: 150px;
      font-size: 14px;
      align-items: baseline;
    }
    .user-image {
      font-size: 25px
    }
    .title {
      margin: 0;
      font-size: 20px;
    }
  }

  .box {
    height: 100%;
    align-items: stretch;
    background: @container-bg-color;
  }

  .main-container {
    height: 100%;
    margin-top: 1px;
    overflow-y: auto;
    overflow-x: hidden;
    background: @container-bg-color;
    .el-main-container {
      margin: 40px;
      border: 1px solid #DFDFDF;
    }
    .el-aside {
      background: @color-bg-white;
    }
    .el-menu {
      height: 100%;
    }
    .el-main {
      background: @color-bg-white;
      padding: 0;
      min-height: 600px;
      overflow-y: auto;
      overflow-x: hidden;
    }
    .right-container {
      position: relative;
    }

    .btn-back {
      position: absolute;
      z-index: 999;
      right: 20px;
      top: 20px;
      background: @base-color;
      color: @color-bg-white;
    }
  }

  .text-center {
    text-align: center;
  }

  .header-title {
    padding: 20px;
  }

  .el-form{
    padding: 20px;
  }

</style>
