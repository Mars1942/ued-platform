<template>
  <div>
    <div class="fa fa-align-justify " v-model="isCollapse" @click="toggle"></div>
    <el-menu default-active="1" class="el-menu-vertical-demo" theme="dark" @open="handleOpen"
             @close="handleClose"
             :collapse="isCollapse">
      <el-submenu v-for="firstMenu in menuList" :index="firstMenu.id" :key="firstMenu.id">
        <template slot="title">
          <i class="el-icon-message"></i>
          <span slot="title">{{firstMenu.name}}</span>
        </template>
        <el-submenu v-for="secondMenu in firstMenu.menuList" :index="secondMenu.id" :key="secondMenu.id">
          <span slot="title">{{secondMenu.name}}</span>
          <el-menu-item v-for="thirdMenu in secondMenu.menuList" :index="thirdMenu.id" :key="thirdMenu.id">
            <span slot="title">{{thirdMenu.name}}</span>
          </el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        menuList: [
          {
            name: "一级导航栏1", id: "1", href: "", menuList: [
            {
              name: "二级导航1", id: "1-1", href: "", menuList: [
              {name: "三级导航1", id: "1-1-1", href: ""}
            ]
            }
          ]
          },
          {
            name: "一级导航栏2", id: "2", href: "", menuList: [
            {
              name: "二级导航2", id: "2-1", href: "", menuList: [
              {name: "三级导航2", id: "2-1-1", href: ""}
            ]
            }
          ]
          },
          {
            name: "一级导航栏3", id: "3", href: "", menuList: [
            {
              name: "二级导航3", id: "3-1", href: "", menuList: [
              {name: "三级导航3", id: "3-1-1", href: ""}
            ]
            }
          ]
          }
        ],
        isCollapse: true
      }
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
<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  .el-menu:not(.el-menu--collapse) {
    width: 200px;
  }
</style>
