<script setup lang="ts">
import ProductList from "../components/ProductList.vue";
import SearchBar from "../components/SearchBar.vue";
import Tags from "../components/Tags.vue";
</script>

<template>
	<div class="max-w-[1200px]">
		<SearchBar />
		<div class="flex gap-2">
			<Tags class="hidden md:block" />
			<ProductList />
		</div>
	</div>
</template>
