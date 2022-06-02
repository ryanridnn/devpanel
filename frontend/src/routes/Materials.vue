<template>
	<div class="materials">
		<Header :handleAdd="() => setAddModal(true)" />
		<Search
			:searchHandler="handleSearch"
			placeholder="Search materials..."
			class="materials__search"
		/>
		<div class="materials__list" v-if="materials.length > 0">
			<MaterialCard
				v-for="(material, index) in materials"
				:key="index"
				:material="material"
				:update="() => setCurrentUpdatingMaterial(material._id)"
			/>
		</div>
		<div class="no-content" v-else>No materials</div>
		<AddMaterial
			:opened="isAddModalOpened"
			:close="() => setAddModal(false)"
		/>
		<UpdateMaterial
			:material="currentUpdatingMaterial"
			:opened="currentUpdatingMaterial._id ? true : false"
			:close="() => setCurrentUpdatingMaterial(null)"
		/>
	</div>
</template>

<script>
import Header from "../components/Header/Header.vue";
import Search from "../components/Search/Search.vue";
import MaterialCard from "../components/MaterialCard/MaterialCard.vue";
import AddMaterial from "../components/AddMaterial/AddMaterial.vue";
import UpdateMaterial from "../components/UpdateMaterial/UpdateMaterial.vue";

import { v4 } from "uuid";
import { faker } from "@faker-js/faker";

export default {
	name: "Materials",
	components: {
		Header,
		Search,
		MaterialCard,
		AddMaterial,
		UpdateMaterial,
	},
	data() {
		return {
			search: "",
			isAddModalOpened: false,
			currentUpdatingMaterial: {},
		};
	},
	computed: {
		tag() {
			return this.$route.params.tag;
		},
		materials() {
			if (this.tag) {
				return this.$store.state.materials
					.filter((material) => {
						const match = material.tags.some(
							(tag) => tag._id === this.tag
						);

						return match;
					})
					.filter(
						(material) =>
							material.name.match(new RegExp(this.search, "i")) ||
							material.url.match(new RegExp(this.search, "i"))
					);
			}

			return this.$store.state.materials.filter(
				(material) =>
					material.name.match(new RegExp(this.search, "i")) ||
					material.url.match(new RegExp(this.search, "i"))
			);
		},
	},
	methods: {
		setAddModal(bool) {
			this.isAddModalOpened = bool;
		},
		setCurrentUpdatingMaterial(id) {
			const match = this.materials.find(
				(material) => material._id === id
			);

			this.currentUpdatingMaterial = match || {};
		},
		handleSearch(e) {
			this.search = e.target.value;
		},
	},
};
</script>

<style lang="scss" scoped>
.materials {
	display: flex;
	flex-direction: column;
	gap: 1.25rem;
	padding: 1.25rem 0 4rem;

	&__search {
		margin-bottom: 0.25rem;
	}

	&__list {
		display: grid;
		grid-gap: 1.125rem;
		grid-template-columns: 1fr;

		@include responsive($screen-sm) {
			& {
				grid-template-columns: 1fr 1fr;
			}
		}

		@include responsive($screen-md) {
			& {
				grid-template-columns: 1fr;
			}
		}

		@include responsive($screen-lg) {
			& {
				grid-template-columns: 1fr 1fr;
			}
		}

		@include responsive($screen-xl) {
			& {
				grid-template-columns: 1fr 1fr 1fr;
			}
		}

		@include responsive($screen-2xl) {
			& {
				grid-template-columns: 1fr 1fr 1fr 1fr;
			}
		}
	}
}
</style>
