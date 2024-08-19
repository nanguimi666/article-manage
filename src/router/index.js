import { createWebHistory, createRouter } from "vue-router";

import { useUserStore } from "../stores";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",

      redirect: "/login",
    },
    {
      path: "/login",
      component: () => import("@/views/login/LoginRegister.vue"),
    },
    {
      path: "/article",
      component: () => import("@/views/layout/LayoutContainer.vue"),
      children: [
        {
          path: "channel",
          component: () => import("@/views/article/ArticleChannel.vue"),
        },
        {
          path: "manage",
          component: () => import("@/views/article/ArticleManage.vue"),
        },

        {
          path: "userAvatar",
          component: () => import("@/views/user/UserAvatar.vue"),
        },
        {
          path: "userPassword",
          component: () => import("@/views/user/UserPassword.vue"),
        },
        {
          path: "userProfile",
          component: () => import("@/views/user/UserProfile.vue"),
        },
      ],
    },
  ],
});

router.beforeEach((to) => {
  const UserStore = useUserStore();
  if (!UserStore.token && to.path !== "/login") return "/login";
});

export { router };
