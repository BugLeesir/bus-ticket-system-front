export default {
  path: "/userManager",
  meta: {
    icon: "ri:contacts-book-2-fill",
    title: "用户管理",
    rank: 1
  },
  children: [
    {
      path: "/userManager/member",
      name: "member",
      component: () => import("@/views/userManager/member.vue"),
      meta: {
        icon: "mdi:account",
        title: "会员信息管理"
      }
    },
    {
      path: "/userManager/admin",
      name: "admin",
      component: () => import("@/views/userManager/admin.vue"),
      meta: {
        icon: "mdi:account-cog",
        title: "管理员信息管理"
      }
    }
  ]
} satisfies RouteConfigsTable;
