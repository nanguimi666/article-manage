<script setup>
import { userUPdataAvatarService } from "@/api/user.js";
import { useUserStore } from "../../stores";
import { ref } from "vue";
const userStore = useUserStore();
const uploadRef = ref();
const imgUrl = ref(userStore.user.user_pic);
const base64Url = ref();

const uploadFile = (uploadFile) => {
  imgUrl.value = URL.createObjectURL(uploadFile.raw);
  // 将原始文件转成base64
  const reader = new FileReader();
  reader.readAsDataURL(uploadFile.raw);
  reader.onload = () => {
    base64Url.value = reader.result;
  };
};

const upData = async () => {
  await userUPdataAvatarService(base64Url.value);
  await userStore.getUser();
  ElMessage({
    message: "更换成功",
    type: "success",
    plain: true,
  });
};
defineExpose({ open });
</script>
<template>
  <card title="头像展示">
    <el-upload
      ref="uploadRef"
      :show-file-list="false"
      :auto-upload="false"
      :on-change="uploadFile"
    >
      <img v-if="imgUrl" :src="imgUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
    <br />
    <el-button
      type="primary"
      @click="uploadRef.$el.querySelector('input').click()"
      >选择图片</el-button
    >
    <el-button type="success" @click="upData">上传图片</el-button>
  </card>
</template>
