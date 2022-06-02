<template>
	<div class="repos">
		<Header :handleAdd="() => setAddModal(true)" />
		<Search
			:searchHandler="handleSearch"
			placeholder="Search repos..."
			class="repos__search"
		/>
		<div class="repos__list" v-if="repos.length > 0">
			<RepoCard
				v-for="(repo, index) in repos"
				:key="index"
				:repo="repo"
				:update="() => setCurrentUpdatingRepo(repo._id)"
			/>
		</div>
		<div class="no-content" v-else>No Repos</div>
		<AddRepo :opened="isAddModalOpened" :close="() => setAddModal(false)" />
		<UpdateRepo
			:repo="currentUpdatingRepo"
			:opened="currentUpdatingRepo._id ? true : false"
			:close="() => setCurrentUpdatingRepo(null)"
		/>
	</div>
</template>

<script>
import Header from "../components/Header/Header.vue";
import Search from "../components/Search/Search.vue";
import RepoCard from "../components/RepoCard/RepoCard.vue";
import AddRepo from "../components/AddRepo/AddRepo.vue";
import UpdateRepo from "../components/UpdateRepo/UpdateRepo.vue";

export default {
	name: "Repos",
	components: {
		Header,
		Search,
		RepoCard,
		AddRepo,
		UpdateRepo,
	},
	data() {
		return {
			search: "",
			isAddModalOpened: false,
			currentUpdatingRepo: {},
		};
	},
	computed: {
		tag() {
			return this.$route.params.tag;
		},
		repos() {
			if (this.tag) {
				return this.$store.state.repos
					.filter((repo) => {
						const match = repo.tags.some(
							(tag) => tag._id === this.tag
						);

						return match;
					})
					.filter(
						(repo) =>
							repo.name.match(new RegExp(this.search, "i")) ||
							repo.desc.match(new RegExp(this.search, "i"))
					);
			}

			return this.$store.state.repos.filter(
				(repo) =>
					repo.name.match(new RegExp(this.search, "i")) ||
					repo.desc.match(new RegExp(this.search, "i"))
			);
		},
	},
	methods: {
		setAddModal(bool) {
			this.isAddModalOpened = bool;
		},
		setCurrentUpdatingRepo(id) {
			const match = this.repos.find((repo) => repo._id === id);

			this.currentUpdatingRepo = match || {};
		},
		handleSearch(e) {
			this.search = e.target.value;
		},
	},
};
</script>

<style lang="scss" scoped>
.repos {
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
