<script setup>
import { Edit, Delete } from "@element-plus/icons-vue";
import { ref } from "vue";
import ChannelSelect from "./components/channelSelect.vue";
import { artGetListService, artDelService } from "../../api/article";
import dayjs from "dayjs";
import articleEdit from "./components/articleEdit.vue";
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: "",
  state: "",
});
const loading = ref(false);
const articleList = ref();
const total = ref(0);
const getArticleList = async () => {
  loading.value = true;
  const res = await artGetListService(params.value);
  articleList.value = res.data;
  total.value = res.total;
  loading.value = false;
};
getArticleList();

const sizeChange = (size) => {
  params.value.pagenum = 1;
  params.value.pagesize = size;
  getArticleList();
};
const currentChange = (page) => {
  params.value.pagenum = page;
  getArticleList();
};
const service = () => {
  params.value.pagenum = 1;
  getArticleList();
};
const reset = () => {
  params.value = {
    pagenum: 1,
    pagesize: 5,
    cate_id: "",
    state: "",
  };

  getArticleList();
};

const drawer = ref();
const add = () => {
  drawer.value.open({});
};
const del = async (id) => {
  console.log(id);
  await artDelService(id);
  ElMessage({
    message: "编辑成功",
    type: "success",
    plain: true,
  });
  getArticleList();
};
const edit = (row) => {
  drawer.value.open(row);
};

const success = (type) => {
  if (type === "add") {
    const lastpage = Math.ceil(Number(total.value + 1) / params.value.pagesize);
    params.value.pagenum = lastpage;
  }
  getArticleList();
};
</script>

<template>
  <card title="文章管理 ">
    <template #button>
      <el-button plain type="primary" @click="add">添加文章</el-button>
    </template>
    <el-form inline>
      <el-form-item label="文章分类" prop="">
        <ChannelSelect v-model="params.cate_id"></ChannelSelect>
      </el-form-item>
      <el-form-item label="文章状态" prop="">
        <el-select style="width: 200px" v-model="params.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="" @click="service">查询</el-button>
        <el-button type="" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="articleList" v-loading="loading" border stripe>
      <el-table-column label="文章标题" prop="title">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发表时间" prop="pub_date">
        <template #default="{ row }">
          {{ dayjs(row.pub_date).format("YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>

      <el-table-column label="操作" prop="">
        <template #default="{ row }">
          <el-button
            plain
            type="info"
            circle
            :icon="Edit"
            @click="edit(row)"
          ></el-button>
          <el-button
            plain
            type="danger"
            circle
            :icon="Delete"
            @click="del(row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <el-pagination
        v-model:current-page="params.pagenum"
        v-model:page-size="params.pagesize"
        :page-sizes="[2, 3, 4, 5, 10]"
        layout="jumper,total,sizes,prev,pager,next"
        :total="total"
        @size-change="sizeChange"
        @current-change="currentChange"
      />
    </template>
    <articleEdit ref="drawer" @success="success"> </articleEdit>
  </card>
</template>
