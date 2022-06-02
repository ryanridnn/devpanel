<template>
	<div class="projects">
		<Header :handleAdd="() => setAddModal(true)" />
		<Search
			:searchHandler="handleSearch"
			placeholder="Search your project..."
			class="projects__search"
		/>
		<div class="projects__list" v-if="projects.length > 0">
			<ProjectCard
				v-for="project in projects"
				:project="project"
				:key="project._id"
				:update="() => setCurrentProjectUpdating(project._id)"
			/>
		</div>
		<div class="no-content" v-else>No projects</div>
		<AddProject
			:opened="isAddModalOpened"
			:close="() => setAddModal(false)"
		/>
		<UpdateProject
			:opened="currentProjectUpdating._id ? true : false"
			:close="() => setCurrentProjectUpdating(null)"
			:project="currentProjectUpdating"
		/>
	</div>
</template>

<script>
import Header from "../components/Header/Header.vue";
import Search from "../components/Search/Search.vue";
import ProjectCard from "../components/ProjectCard/ProjectCard.vue";
import AddProject from "../components/AddProject/AddProject.vue";
import UpdateProject from "../components/UpdateProject/UpdateProject.vue";

import { PlusIcon } from "@heroicons/vue/solid";

import { v4 } from "uuid";
import { faker } from "@faker-js/faker";

export default {
	name: "Projects",
	components: {
		Header,
		Search,
		PlusIcon,
		ProjectCard,
		AddProject,
		UpdateProject,
	},
	data() {
		return {
			search: "",
			isAddModalOpened: false,
			currentProjectUpdating: {},
		};
	},
	methods: {
		setAddModal(bool) {
			this.isAddModalOpened = bool;
		},
		setUpdateModal(bool) {
			this.isUpdateModalOpened = bool;
		},
		setCurrentProjectUpdating(id) {
			const match = this.projects.find((project) => project._id === id);

			this.currentProjectUpdating = match || {};
		},
		handleSearch(e) {
			this.search = e.target.value;
		},
	},
	computed: {
		tag() {
			return this.$route.params.tag;
		},
		projects() {
			if (this.tag) {
				const projects = this.$store.state.projects
					.filter((project) => {
						const match = project.tags.some(
							(tag) => tag._id === this.tag
						);

						return match;
					})
					.filter(
						(project) =>
							project.name.match(new RegExp(this.search, "i")) ||
							project.desc.match(new RegExp(this.search, "i"))
					);

				return projects;
			}

			return this.$store.state.projects.filter(
				(project) =>
					project.name.match(new RegExp(this.search, "i")) ||
					project.desc.match(new RegExp(this.search, "i"))
			);
		},
	},
};
</script>

<style lang="scss" scoped>
.projects {
	display: flex;
	flex-direction: column;
	gap: 1.25rem;
	width: 100%;
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
