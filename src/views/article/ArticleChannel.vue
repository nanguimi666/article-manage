<script setup>
import { ref } from "vue";
import { Edit, Delete } from "@element-plus/icons-vue";
import { artGetChannelsService, artDelChannelService } from "../../api/article";
import { ElMessage, ElMessageBox } from "element-plus";
import dialogPage from "../article/components/dialogPage.vue";
const channelList = ref([]);
const loading = ref(false);

const gerChannelList = async () => {
  loading.value = true;
  const res = await artGetChannelsService();
  console.log(res.data);
  channelList.value = res.data;
  loading.value = false;
};

const dialog = ref();
gerChannelList();
const add = () => {
  dialog.value.open();
};
const edit = (row) => {
  dialog.value.open(row);
};
const del = async (id) => {
  // await ElMessageBox.confirm("是否删除", "man", {
  //   type: "warning",
  //   confirmButtonText: "确定",
  //   cancelButtonText: "取消",
  // });
  await artDelChannelService(id);
  ElMessage({
    message: "删除成功",
    type: "success",
    plain: true,
  });
  gerChannelList();
};
const success = () => {
  gerChannelList();
};
</script>
<template>
  <card title="文章分类 ">
    <template #button>
      <el-button type="primary" @click="add">添加</el-button>
    </template>
    <el-table :data="channelList" v-loading="loading">
      <el-table-column
        type="index"
        prop="id"
        label="序号"
        width="100"
      ></el-table-column>
      <el-table-column prop="cate_name" label="名称"></el-table-column>
      <el-table-column prop="cate_alias" label="别名"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            type="info"
            plain
            :icon="Edit"
            circle
            @click="edit(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            plain
            :icon="Delete"
            circle
            @click="del(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>

      <template #empty> <el-empty description="无数据"></el-empty> </template>
    </el-table>
    <dialog-page ref="dialog" @success="success"></dialog-page>
  </card>
</template>
