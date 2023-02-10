<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth.store";

const authStore = useAuthStore();
const router = useRouter();

const username = ref("");
const password = ref("");
const error = ref("");

async function login() {
	error.value = "";

	await authStore
		.logIn(username.value, password.value)
		.then(({ success }) => {
			if (success) {
				router.push({ name: "Profile" });
			}
		})
		.catch((e) => {
			error.value = e.response?.data?.message || "Login failed";
		});
}
</script>

<template>
	<form class="flex flex-col gap-4" action="submit" @submit.prevent="login">
		<h1>Login</h1>
		<div>
			<label class="block" for="username">Username</label>
			<input type="text" id="username" v-model="username" />
		</div>
		<div>
			<label class="block" for="password">Password</label>
			<input type="text" id="password" v-model="password" />
		</div>
		<button type="submit" class="bg-green-600">Login</button>
	</form>
	<span v-if="error" class="text-red-500">{{ error }}</span>
</template>
