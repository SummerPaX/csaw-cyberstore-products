<script setup lang="ts">
import { useFavicon, useTitle } from "@vueuse/core";
import { useRouter } from "vue-router";
import { useAuthStore } from "./stores/auth.store";

useTitle("Pinia Store Login");
useFavicon("/pinia.svg");

const authStore = useAuthStore();

const router = useRouter();

function logOut() {
	authStore.logOut();
	router.push({ name: "Login" });
}
</script>

<template>
	<div class="bg-stone-900 flex w-full justify-center items-center gap-4 p-2 text-white">
		<div class="flex grow max-w-[1200px] gap-4 p-2">
			<!-- <RouterLink class="" v-for="route in routes" :to="route">{{ route.name }}</RouterLink> -->
			<RouterLink to="/">Home</RouterLink>
			<RouterLink to="/products">Products</RouterLink>
			<div class="ml-auto">
				<a class="cursor-pointer" v-if="authStore.isLoggedIn" @click="logOut">Logout</a>
				<RouterLink v-else to="/login">Login</RouterLink>
			</div>
		</div>
	</div>
	<div class="flex w-full justify-center p-4">
		<div>
			<RouterView></RouterView>
		</div>
	</div>
</template>

<style>
h1 {
	@apply text-3xl;
}

button {
	@apply rounded-xl text-white bg-stone-900 py-0.5 px-3;
}

input,
select {
	@apply rounded-xl border border-black py-0.5 px-3 m-0;
}

.router-link-active {
	@apply underline;
}

button:disabled {
	@apply opacity-50 -z-10;
}
</style>
