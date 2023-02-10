import axios from "axios";
import {
	createRouter,
	createWebHistory,
	RouteLocationNormalized,
	RouteRecordRaw,
} from "vue-router";
import { useAuthStore } from "../stores/auth.store";

const authGuard = (to: RouteLocationNormalized) => {
	const store = useAuthStore();

	return store.isLoggedIn ? true : { name: "Login", query: { ref: to.name?.toString() } };
};

const routes = [
	{ name: "Home", path: "/", component: import("../pages/Home.vue") },
	{ name: "Login", path: "/login", component: import("../pages/Login.vue") },
	{
		name: "Profile",
		path: "/profile",
		component: import("../pages/Profile.vue"),
		beforeEnter: authGuard,
	},
	{
		name: "ProductDetails",
		path: "/product/:id",
		component: import("../pages/ProductDetails.vue"),
		beforeEnter: authGuard,
	},
	{
		name: "ProductsLayout",
		path: "/products",
		beforeEnter: authGuard,
		children: [
			{
				path: "",
				component: import("../pages/Products.vue"),
			},
			{
				name: "ProductsByTag",
				path: "tags/:tag",
				component: import("../pages/Products.vue"),
			},
			{
				name: "ProductsByBrand",
				path: "brands/:brand",
				component: import("../pages/Products.vue"),
			},
		],
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

// Global navigation Guard to set the Axios Header if user is logged in and the header has not been set yet
router.beforeEach(() => {
	const store = useAuthStore();

	if (store.isLoggedIn && !axios.defaults.headers.common.Authorization) {
		axios.defaults.headers.common.Authorization = `Bearer ${store.token}`;
	}
});

export default router;
