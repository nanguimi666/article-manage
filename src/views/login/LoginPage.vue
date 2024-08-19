<script setup>
import { ref } from "vue";
import { userRegService, userLogService } from "@/api/user";
// import { router } from "@/router";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores";

const router = useRouter();
const form = ref();
const Form = ref({
  username: "",
  password: "",
  repassword: "",
});

const props = defineProps({
  islogreg: Boolean,
});

const emit = defineEmits(["logreg"]);
const rules = ref({
  username: [
    {
      required: true,
      message: "请输入用户名",
      trigger: "blur",
    },
    {
      min: 3,
      max: 10,
      message: "长度应在3到10",
      trigger: "blur",
    },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    {
      min: 6,
      max: 20,
      message: "密码长度在 6 到 20 个字符",
      trigger: "blur",
    },
  ],

  repassword: [
    {
      required: true,
      message: "请再次输入密码",
      trigger: "blur",
    },
    {
      pattern: /^\S{6,15}$/,
      message: "密码长度在 6 到 15 个字符",
      trigger: "blur",
    },
    {
      validator: (rule, value, callback) => {
        if (value !== Form.value.password) {
          callback(new Error("两次密码输入不一致！"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
});

const logreg = async () => {
  if (props.islogreg !== true) {
    await form.value.validate();
    const res = await userLogService(Form.value);
    useUserStore().setToken(res.token);

    ElNotification({
      title: "Success",
      message: "登录成功",
      type: "success",
    });
    router.push("/article/channel");
  } else {
    await form.value.validate();
    await userRegService(Form.value);
    ElMessage({
      message: "注册成功",
      type: "success",
      plain: true,
    });
    emit("logreg");
  }
};
</script>
<template>
  <el-form :model="Form" :rules="rules" ref="form">
    <el-form-item label="邮箱或手机" label-position="top" prop="username">
      <el-input
        v-model="Form.username"
        style="width: 100%"
        placeholder="请输入账号"
      />
    </el-form-item>

    <el-form-item label="密码" label-position="top" prop="password">
      <el-input
        style="width: 100%"
        v-model="Form.password"
        type="password"
        placeholder="请输入密码"
        show-password
      />
    </el-form-item>

    <el-form-item
      label="密码"
      label-position="top"
      prop="repassword"
      v-if="islogreg"
    >
      <el-input
        style="width: 100%"
        v-model="Form.repassword"
        type="password"
        placeholder="请再次输入密码"
        show-password
      />
    </el-form-item>
    <el-button type="success" style="width: 100%" @click="logreg">
      <slot>登录</slot>
    </el-button>
  </el-form>
</template>
