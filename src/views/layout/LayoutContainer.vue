<script setup>
import { onMounted } from "vue";
import { useUserStore } from "../../stores";

import { useRoute, useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();
onMounted(() => {
  userStore.getUser();
});

const handleCommand = (path) => {
  if (path === "logout") {
    userStore.removeToken();
    userStore.setUser({});
    router.push("/login");
  } else {
    router.push(`/article/${path}`);
  }
};
</script>
<template>
  <el-container>
    <el-aside width="200px">
      <el-menu
        active-text-color="#ffd04b"
        router
        :default-active="useRoute().path"
      >
        <el-menu-item index="/article/channel">
          <template #title>
            <span> 文章分类</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/article/manage">
          <template #title>
            <span> 文章管理</span>
          </template>
        </el-menu-item>
        <el-sub-menu index="/article">
          <template #title>
            <span> 个人中心</span>
          </template>
          <el-menu-item index="/article/userProfile">基本资料</el-menu-item>
          <el-menu-item index="/article/userAvatar">更换头像</el-menu-item>
          <el-menu-item index="/article/userPassword">重置密码</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>

    <el-main>
      <div
        style="
          display: flex;
          justify-content: flex-end;
          align-items: center;
          margin-bottom: 16px;
        "
      >
        <el-avatar
          :size="32"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />

        <el-dropdown @command="handleCommand">
          <span>
            {{ userStore.user.nickname }}
            <el-icon>
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="userProfile"
                >基本资料</el-dropdown-item
              >
              <el-dropdown-item command="userAvatar">更换头像</el-dropdown-item>
              <el-dropdown-item command="userPassword"
                >重置密码</el-dropdown-item
              >
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>
