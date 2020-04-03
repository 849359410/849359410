export default [
  {
    // 公告管理 (首页)
    path: "/",
    name: "AdministrationSite",
    component: () => {
      return import("../views/submenu/siteAdministration/AdministrationSite.vue");
    }
  },
	{
		// 公告管理
		path: "/administrationNotice",
		name: "AdministrationNotice",
		component: () => {
			return import("../views/submenu/siteAdministration/AdministrationNotice.vue");
		}
	},
  {
    path: '*"',
    redirect: "/"
  }
];
