const Layout = () => import("@/layout/index.vue");
export default {
  path: "/productionWaring",
  redirect: "/productionWaring/index",
  meta: {
    title: "产量统计预警",
    icon: "cib:telegram-plane"
  },
  children: [
    {
      path: "/productionWaring/index",
      component: () => import("@/views/productionWaring/index.vue"),
      name: "ProductionWaring",
      meta: {
        title: "产量统计预警"
      }
    }
  ]
};
