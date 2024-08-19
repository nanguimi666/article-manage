//axios配置

import axios from "axios";
import { useUserStore } from "@/stores";
import { ElMessage } from "element-plus";
import { router } from "@/router";
const baseURL = "http://big-event-vue-api-t.itheima.net";

const instance = axios.create({
  baseURL,
  timeout: 10000,
});

instance.interceptors.request.use(
  (config) => {
    const usestore = useUserStore();
    if (usestore.token) {
      config.headers.Authorization = usestore.token;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

instance.interceptors.response.use(
  (res) => {
    if (res.data.code === 0) {
      return res.data;
    }
    ElMessage.error(res.data.message || "服务异常");
    return Promise.reject(res.data);
  },
  (err) => {
    if (err.response?.status === 401) {
      router.push("/login");
    }
    ElMessage.error(err.data?.message || "服务异常");
    return Promise.reject(err);
  }
);

export default instance;
export { baseURL };
