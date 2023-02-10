<script setup lang="ts">
import { useProductStore } from "../stores/product.store";

const productStore = useProductStore();

if (!productStore.tags.length || !productStore.brands.length) {
	productStore.fetchTagsAndBrands();
}
</script>

<template>
	<aside class="border rounded-lg px-8 py-4 h-fit">
		<h2 class="text-2xl">Categories</h2>
		<div class="pl-8 text-xl flex flex-col">
			<RouterLink
				class="whitespace-nowrap"
				v-for="tag in productStore.tags"
				:to="'/products/tags/' + tag"
			>
				{{ tag }}</RouterLink
			>
		</div>
		<h2 class="text-2xl">Brands</h2>
		<div class="pl-8 text-xl flex flex-col">
			<RouterLink
				class="whitespace-nowrap"
				v-for="brand in productStore.brands"
				:to="'/products/brands/' + brand"
			>
				{{ brand }}</RouterLink
			>
		</div>
	</aside>
</template>
