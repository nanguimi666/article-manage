import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router/index";
import { pinia } from "./stores/index.js";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);
app.use(pinia).use(router).mount("#app");

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
