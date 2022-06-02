import { createRouter, createWebHistory } from "vue-router";

import Projects from "./Projects.vue";
import Repos from "./Repos.vue";
import Materials from "./Materials.vue";

const routes = [
	{
		path: "/projects",
		component: Projects,
		meta: {
			title: "Projects",
		},
	},
	{
		path: "/projects/:tag",
		component: Projects,
		meta: {
			title: "Projects",
		},
	},
	{
		path: "/repos",
		component: Repos,
		meta: {
			title: "Repos",
		},
	},
	{
		path: "/repos/:tag",
		component: Repos,
		meta: {
			title: "Repos",
		},
	},
	{
		path: "/materials",
		component: Materials,
		meta: {
			title: "Materials",
		},
	},
	{
		path: "/materials/:tag",
		component: Materials,
		meta: {
			title: "Materials",
		},
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
	scrollBehaviour() {
		return { x: 0, y: 0 };
	},
});

router.beforeEach((to, from, next) => {
	document.title = `${to.meta.title} - DevPanel`;
	next();
});

router.beforeEach((to, from, next) => {
	if (to.matched.length === 0) next("/projects");
	else next();
});

export default router;
