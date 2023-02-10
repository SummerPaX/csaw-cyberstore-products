import { useLocalStorage } from "@vueuse/core";
import axios from "axios";
import { acceptHMRUpdate, defineStore } from "pinia";
import { ProfileType } from "../interfaces";

export const useAuthStore = defineStore("auth", {
	state: () => ({
		token: useLocalStorage("access_token", ""),
		profile: undefined as ProfileType | undefined,
	}),
	getters: {
		isLoggedIn: (store) => {
			return store.token ? true : false;
		},
	},
	actions: {
		async logIn(username: string, password: string) {
			const response = await axios.post<{ access_token: string }>(
				"http://localhost:3000/auth/login",
				{ username, password }
			);

			if (!response?.data?.access_token) return { success: false };

			this.token = response.data.access_token;

			// Sets Auth Object for Axios
			axios.defaults.headers.common.Authorization = `Bearer ${this.token}`;

			return { success: true };
		},
		async logOut() {
			const response = await axios.get("http://localhost:3000/auth/logout");

			this.token = "";
			this.profile = undefined;
			axios.defaults.headers.common.Authorization = undefined;

			return response;
		},
		async getProfile() {
			const response = await axios.get("http://localhost:3000/auth/profile?delay=2000");
			this.profile = response.data;
			return response.data;
		},
		async checkEmail() {
			const response = await axios.get("http://localhost:3000/auth/check-email");
			return response.data;
		},
	},
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
