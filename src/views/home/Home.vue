<template>
  <div class="home">
    <!-- 头部区域 -->
    <div class="home-header">
      <div>
        <img src="~assets/logo.png" alt="" />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </div>
    <!-- 主体区域 -->
    <div class="home-container"> 
      <!-- 侧边栏 -->
      <div class="container-aside" :width="isCollapse ? '64px' : '200px'">
        <el-aside >
          <!-- 侧边栏按钮 -->
          <div class="toggle-button" :class="{isclose:isCollapse}"  @click="toggleCollapse">|||</div>
          <!-- 侧边栏菜单区域 -->
          <el-menu
            background-color="#333744"
            text-color="#fff"
            active-text-color="#409EFF"
            unique-opened
            :collapse="isCollapse" 
            :collapse-transition="false"
            router
           
          >
            <!-- 一级菜单 -->
            <el-submenu v-for="(item,index) in userList" :key="index" :index="item.id + ''">
              <!-- 一级菜单的模板区域 -->
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{item.authName}}</span>
              </template>

              <!-- 二级菜单 -->
              <el-menu-item v-for="(item,index) in item.children" :key="index" :index="'/' + item.path">
                <template slot="title">
                  <!-- 图标 -->
                  <!-- <i class="el-icon-menu"></i> -->
                  <!-- 文本 -->
                  <span>{{item.authName}}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
      </div>
      <!-- 内容 -->
      <div class="container-main">Main</div>
    </div>
  </div>
</template>

<script>
import {getMenus} from 'network/user'

export default {
  name:'Home',
  data() {
    return {
      userList:[],
      isCollapse:false
    }
  },
  created() {
    getMenus().then(res => {
      console.log(res.data.data);
      this.userList = res.data.data
    })
  },
  methods: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    logout() {}
  }
};
</script>

<style lang="scss" scoped>
.home-header {
  height: 60px;
  background-color: #373d41;
  display: flex;
  padding: 0 20px;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-content: center;
    img {
      height: 50px;
    }
    span {
      margin-top: 10px;
      margin-left: 15px;
    }
  }
}
.home-container {
  display: flex;
}
.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
.isclose {
  width: 64px;
}
</style>