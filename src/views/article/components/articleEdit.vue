<script setup>
import { ref } from "vue";
import channelSelect from "./channelSelect.vue";
import { Plus } from "@element-plus/icons-vue";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import {
  artpubLishService,
  artGetDatailService,
  artEditService,
} from "../../../api/article";
import { baseURL } from "@/utils/request.js";
import axios from "axios";
const imgUrl = ref("");
const visibleDrawer = ref(false);
const editorRef = ref();
const emit = defineEmits(["success"]);

const definForm = () => {
  return {
    title: "",
    cate_id: "",
    cover_img: "",
    content: "",
    state: "",
  };
};
const Form = ref(definForm());
const open = async (row) => {
  visibleDrawer.value = true;
  if (row.id) {
    const res = await artGetDatailService(row.id);
    Form.value = res.data;
    //图片单独处理回显
    imgUrl.value = baseURL + Form.value.cover_img;
    const file = await imgUrlToFileObject(imgUrl.value, Form.value.cover_img);
    Form.value.cover_img = file;
  } else {
    Form.value = definForm();
    imgUrl.value = "";
    editorRef.value.setHTML("");
  }
};
async function imgUrlToFileObject(imgUrl, filename) {
  try {
    const response = await axios.get(imgUrl, { responseType: "arraybuffer" });
    const blob = new Blob([response.data], {
      type: response.headers["content-type"],
    });
    const file = new File([blob], filename, {
      type: response.headers["content-type"],
    });
    return file;
  } catch (error) {
    console.error("Error:", error);
  }
  return null;
}
defineExpose({ open });

const uploadFile = (uploadFile) => {
  imgUrl.value = URL.createObjectURL(uploadFile.raw);
  Form.value.cover_img = uploadFile.raw;
};
const publish = async (state) => {
  Form.value.state = state;
  const fd = new FormData();
  for (let key in Form.value) {
    fd.append(key, Form.value[key]);
  }
  if (Form.value.id) {
    await artEditService(fd);
    ElMessage({
      message: "编辑成功",
      type: "success",
      plain: true,
    });
    visibleDrawer.value = false;
    emit("success", "edit");
  } else {
    await artpubLishService(fd);
    ElMessage({
      message: "添加成功",
      type: "success",
      plain: true,
    });
    visibleDrawer.value = false;
    emit("success", "add");
  }
};
</script>
<template>
  <el-drawer v-model="visibleDrawer" title="标题" direction="rtl" size="30%">
    <el-form :model="Form">
      <el-form-item label="文章标题" prop="title">
        <el-input placeholder="请输入文章标题" v-model="Form.title"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <channelSelect
          style="width: 100%"
          v-model="Form.cate_id"
        ></channelSelect>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">
        <el-upload
          :show-file-list="false"
          :auto-upload="false"
          :on-change="uploadFile"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div>
          <quill-editor
            ref="editorRef"
            theme="snow"
            v-model:content="Form.content"
            content-type="html"
            style="height: 100px"
          >
          </quill-editor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="publish('已发布')">发布</el-button>
        <el-button type="info " @click="publish('草稿')">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
