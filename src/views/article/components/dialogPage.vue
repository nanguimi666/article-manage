<script setup>
import { ref } from "vue";
import {
  artAddChannelService,
  artEditChannelService,
} from "../../../api/article";
import { ElMessage } from "element-plus";

const rules = {
  cate_name: [
    {
      required: true,
      message: "请输入名称",
      trigger: "blur",
    },
    {
      pattern: /^\S{1,15}$/,
      message: "名称长度应该 1 到 15 个字符",
      trigger: "blur",
    },
  ],
  cate_alias: [
    {
      required: true,
      message: "请输入别名",
      trigger: "blur",
    },
    {
      pattern: /^[a-zA-Z0-9]{1,10}$/,
      message: "别名长度在 1 到 10 个字符",
      trigger: "blur",
    },
  ],
};
const Form = ref({
  cate_name: "",
  cate_alias: "",
});
const dialogVisible = ref(false);
const open = (row) => {
  dialogVisible.value = true;
  Form.value = { ...row };
};
const emit = defineEmits(["success"]);
const formRef = ref();
const submit = async () => {
  await formRef.value.validate();
  Form.value.id
    ? await artEditChannelService(Form.value)
    : await artAddChannelService(Form.value);
  ElMessage({
    type: "success",
    message: Form.value.id ? "编辑成功" : "添加成功",
  });
  dialogVisible.value = false;
  emit("success");
};

defineExpose({ open });
</script>
<template>
  <el-dialog
    v-model="dialogVisible"
    :title="Form.id ? '编辑' : '添加'"
    width="400"
  >
    <el-form :model="Form" :rules="rules" ref="formRef">
      <el-form-item label="名称" prop="cate_name">
        <el-input placeholder="请输入名称" v-model="Form.cate_name"></el-input>
      </el-form-item>
      <el-form-item label="别名" prop="cate_alias">
        <el-input placeholder="请输入别名" v-model="Form.cate_alias"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submit"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
