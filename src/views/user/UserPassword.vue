<script setup>
import { ref } from "vue";
import { userUPdataPwdService } from "../../api/user";
import { useRouter } from "vue-router";

const router = useRouter();

const Form = ref({
  old_pwd: "",
  new_pwd: "",
  re_pwd: "",
});

const formRef = ref();

const rules = ref({
  old_pwd: [
    {
      required: true,
      message: "请输入原始密码",
      trigger: "blur",
    },
    {
      min: 6,
      max: 12,
      message: "密码长度应该 6 到 12 个字符",
      trigger: "blur",
    },
  ],
  new_pwd: [
    {
      required: true,
      message: "请输入新密码",
      trigger: "blur",
    },
    {
      min: 6,
      max: 12,
      message: "密码长度应该 6 到 12 个字符",
      trigger: "blur",
    },
    {
      validator: (rule, value, callback) => {
        if (value === Form.value.old_pwd) {
          callback(new Error("新密码不能与原始密码相同"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
  re_pwd: [
    {
      required: true,
      message: "请输入确认密码",
      trigger: "blur",
    },
    {
      min: 6,
      max: 12,
      message: "密码长度应该 6 到 12 个字符",
      trigger: "blur",
    },
    {
      validator: (rule, value, callback) => {
        if (value !== Form.value.new_pwd) {
          callback(new Error("两次密码输入不一致"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
});

const upData = async () => {
  await formRef.value.validate();
  await userUPdataPwdService(Form.value);
  ElMessage({
    message: "修改成功",
    type: "success",
    plain: true,
  });
  localStorage.clear();
  router.push("/login");
};
</script>
<template>
  <card title="重置密码">
    <el-form :model="Form" ref="formRef" :rules="rules">
      <el-form-item label="原始密码" prop="old_pwd">
        <el-input
          placeholder="请输入原始密码"
          v-model="Form.old_pwd"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="new_pwd">
        <el-input placeholder="请输入新密码" v-model="Form.new_pwd"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="re_pwd">
        <el-input placeholder="请输入确认密码" v-model="Form.re_pwd"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="upData">提交</el-button>
      </el-form-item>
    </el-form>
  </card>
</template>
