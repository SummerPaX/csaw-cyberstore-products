import axios from "axios";
import { acceptHMRUpdate, defineStore } from "pinia";
import { Product } from "../interfaces";

export const useProductStore = defineStore("products", {
	state: () => ({
		products: <Product[]>[],
		tags: <string[]>[],
		brands: [] as string[],
		sort: "id",
	}),
	getters: {
		sortedProducts: (state) => {
			return [...state.products].sort((a, b) => {
				if (state.sort === "name asc") {
					return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
				} else if (state.sort === "name desc") {
					return a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 1;
				} else if (state.sort === "price asc") {
					return a.price - b.price;
				} else if (state.sort === "price desc") {
					return b.price - a.price;
				}
				return 0;
			});
		},
	},
	actions: {
		async fetchProducts(search?: string, tag?: string, brand?: string) {
			const query = new URLSearchParams();
			if (search) query.append("q", search);
			if (tag) query.append("tag", tag);
			if (brand) query.append("brand", brand);

			const response = await axios.get<Product[]>(
				"http://localhost:3000/products?" + query.toString()
			);

			if (!response.data) throw Error("no data returned");

			this.products = response.data;
		},
		async fetchTagsAndBrands() {
			const tagsRequest = axios.get<string[]>("http://localhost:3000/products/tags");
			const brandsRequest = axios.get<string[]>("http://localhost:3000/products/brands");

			const [tagsResponse, brandsResponse] = await Promise.all([tagsRequest, brandsRequest]);

			if (!tagsResponse.data || !brandsResponse) throw Error("no data returned");

			this.tags = tagsResponse.data;
			this.brands = brandsResponse.data;
		},
	},
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot));
}
