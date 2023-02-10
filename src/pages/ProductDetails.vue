<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { Product } from "../interfaces";
import { useProductStore } from "../stores/product.store";

const route = useRoute();
const productStore = useProductStore();
const product = computed<Product | undefined>(() => {
	return productStore.products?.find((item) => item.id === parseInt(<string>route.params.id));
});

const decimalPlaces = computed(() => {
	const price = product.value?.price || 0;
	const decimals = (price - Math.floor(price)) * 100;
	return decimals > 0 ? decimals.toPrecision(2) + " " : " ";
});
</script>

<template>
	<div v-if="!product">A Product with this Id could not be found</div>
	<div v-else class="flex flex-col">
		<a tabindex="0" class="w-fit cursor-pointer" @click="$router.back()">‹ Back to Results</a>
		<div class="flex flex-col sm:flex-row p-2 gap-2">
			<img
				class="h-96 w-80 shrink-0 object-contain border rounded-lg p-4"
				:src="product.image"
				:alt="product.name"
			/>
			<div class="min-h-40 flex flex-col gap-4 w-full">
				<div class="flex gap-2">
					<span
						class="bg-stone-900 text-white text-sm px-2 py-0.5 rounded-full"
						v-for="tag in product.tags"
						>{{ tag }}</span
					>
					<span class="bg-stone-900 text-white text-sm px-2 py-0.5 rounded-full">{{
						product.brand
					}}</span>
				</div>
				<div class="flex items-start w-full">
					<h2 class="text-2xl">{{ product.name }}</h2>
				</div>
				<div class="text-3xl flex">
					{{ Math.floor(product.price) }}
					<span class="text-base">{{ decimalPlaces }}€</span>
				</div>
				<p>{{ product.description }}</p>
				<div class="mt-auto">
					<label for="amount">Amount: </label>
					<input
						type="number"
						name="amount"
						class="w-10 py-0 px-1 text-center rounded-sm"
						value="1"
					/>
				</div>
				<button class="bg-amber-300 text-black mr-auto whitespace-nowrap" disabled>
					Add to Cart
				</button>
			</div>
		</div>
	</div>
</template>
