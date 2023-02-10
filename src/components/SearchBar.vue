<script setup lang="ts">
import { watchDebounced } from "@vueuse/shared";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useProductStore } from "../stores/product.store";

const route = useRoute();
const productStore = useProductStore();
const search = ref("");

watchDebounced(
	[route, search],
	() => {
		productStore.fetchProducts(search.value, <string>route.params.tag, <string>route.params.brand);
	},
	{ immediate: true, debounce: 500 }
);
</script>

<template>
	<div>
		<form class="w-full flex">
			<input type="text" class="rounded-r-none h-10 flex-grow m-0 text-lg" v-model="search" />
			<button class="rounded-l-none h-10 bg-amber-500 text-black border border-black">🔎</button>
		</form>
		<div class="w-full py-1 px-2 flex text-sm items-center gap-2">
			<span>
				{{ productStore.products.length }} Ergebnisse für "{{ search || "Alle Produkte" }}"</span
			>
			<span v-if="route.params.tag || route.params.brand">
				in {{ route.params.tag || route.params.brand }}</span
			>
			<label for="sort" class="ml-auto text-end">Sortieren nach: </label>
			<select name="sort" v-model="productStore.sort" class="rounded-lg px-1">
				<option disabled value="id">Please select one</option>
				<option value="name asc">Name: Aufsteigend</option>
				<option value="name desc">Name: Absteigend</option>
				<option value="price asc">Preis: Aufsteigend</option>
				<option value="price desc">Preis: Absteigend</option>
			</select>
		</div>
	</div>
</template>
