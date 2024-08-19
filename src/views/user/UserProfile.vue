<script setup>
import { useUserStore } from "../../stores";
import { ref } from "vue";
import { userUPdataService } from "../../api/user";

const formRef = ref();
const {
  user: { email, id, nickname, username },
  getUser,
} = useUserStore();
const Form = ref({
  email,
  id,
  nickname,
  username,
});

const upData = async () => {
  await formRef.value.validate();
  await userUPdataService(Form.value);
  getUser();
  ElMessage({
    message: "修改成功",
    type: "success",
    plain: true,
  });
};
</script>
<template>
  <card title="基本资料">
    <el-form :model="Form" ref="formRef">
      <el-form-item label="账号" prop="username">
        <el-input disabled v-model="Form.username"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="Form.nickname"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="Form.email"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="upData">提交修改</el-button>
    </template>
  </card>
</template>
