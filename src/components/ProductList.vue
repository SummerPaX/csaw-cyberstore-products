<script setup lang="ts">
import { useProductStore } from "../stores/product.store";
import ProductCard from "./ProductCard.vue";

const productStore = useProductStore();
</script>

<template>
	<div class="flex flex-col gap-2 w-full">
		<ProductCard
			v-for="product in productStore.sortedProducts"
			:key="product.id"
			:product="product"
		/>
	</div>
</template>
