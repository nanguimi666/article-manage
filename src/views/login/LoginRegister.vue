<script setup>
import LoginPage from "./LoginPage.vue";
import { ref } from "vue";
const activeName = ref("login");
const logreg = () => {
  activeName.value = "login";
};
</script>
<template>
  <div
    style="
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      width: 100%;
    "
  >
    <el-tabs v-model="activeName" style="width: 240px">
      <el-tab-pane label="登录" name="login">
        <LoginPage> </LoginPage>
      </el-tab-pane>
      <el-tab-pane label="注册" name="register">
        <LoginPage :islogreg="true" @logreg="logreg"> 注册</LoginPage>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<style scoped></style>
