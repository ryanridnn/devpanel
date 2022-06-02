import Vuex from "vuex";
import axios from "axios";

export default new Vuex.Store({
	state: {
		projects: [],
		repos: [],
		materials: [],
		tags: {
			projects: [],
			repos: [],
			materials: [],
		},
		popup: {
			opened: false,
			data: {
				title: null,
				message: null,
			},
			timeout: null,
		},
	},
	getters: {},
	mutations: {
		setProjects(state, payload) {
			state.projects = payload;
		},
		setRepos(state, payload) {
			state.repos = payload;
		},
		setMaterials(state, payload) {
			state.materials = payload;
		},
		setProjectsTags(state, payload) {
			state.tags.projects = payload;
		},
		setReposTags(state, payload) {
			state.tags.repos = payload;
		},
		setMaterialsTags(state, payload) {
			state.tags.materials = payload;
		},
		addTag(state, { tag, menu }) {
			state.tags[menu] = [...state.tags[menu], tag];
		},
		addProject(state, payload) {
			state.projects = [...state.projects, payload];
		},
		addRepo(state, payload) {
			state.repos = [...state.repos, payload];
		},
		addMaterial(state, payload) {
			state.materials = [...state.materials, payload];
		},
		replaceTag(state, payload) {
			const index = state.tags[payload.menu].findIndex(
				(tag) => tag._id === payload._id
			);

			state.tags[payload.menu][index] = payload;
		},
		replaceProject(state, payload) {
			const index = state.projects.findIndex(
				(project) => project._id === payload._id
			);

			state.projects[index] = payload;
		},
		replaceRepo(state, payload) {
			const index = state.repos.findIndex(
				(repo) => repo._id === payload._id
			);

			state.repos[index] = payload;
		},
		replaceMaterial(state, payload) {
			const index = state.materials.findIndex(
				(material) => material._id === payload._id
			);

			state.materials[index] = payload;
		},
		deleteTag(state, tag) {
			state.tags[tag.menu] = state.tags[tag.menu].filter(
				(t) => t._id !== tag._id
			);
		},
		deleteProject(state, id) {
			state.projects = state.projects.filter(
				(project) => project._id !== id
			);
		},
		deleteRepo(state, id) {
			state.repos = state.repos.filter((repo) => repo._id !== id);
		},
		deleteMaterial(state, id) {
			state.materials = state.materials.filter(
				(material) => material._id !== id
			);
		},
		openPopup(state, { title, message }) {
			state.popup.opened = false;
			clearTimeout(state.popup.timeout);
			state.popup.opened = true;
			state.popup.data.title = title;
			state.popup.data.message = message;

			state.popup.timeout = setTimeout(() => {
				state.popup.opened = false;
				state.popup.data.title = null;
				state.popup.data.message = null;

				clearTimeout(state.popup.timeout);
			}, 4000);
		},
		closePopup(state) {
			clearTimeout(state.popup.timeout);

			state.popup.opened = false;
			state.popup.data.title = null;
			state.popup.data.message = null;
		},
	},
	actions: {
		async getAllProjects({ commit }) {
			try {
				const res = await axios.get(
					import.meta.env.VITE_API_URL + "/projects/"
				);
				commit("setProjects", res.data.projects);
			} catch (e) {
				console.log(e.response);
			}
		},

		async getAllRepos({ commit }) {
			try {
				const res = await axios.get(
					import.meta.env.VITE_API_URL + "/repos/"
				);
				commit("setRepos", res.data.repos);
			} catch (e) {
				console.log(e.response);
			}
		},

		async getAllMaterials({ commit }) {
			try {
				const res = await axios.get(
					import.meta.env.VITE_API_URL + "/materials/"
				);
				commit("setMaterials", res.data.materials);
			} catch (e) {
				console.log(e.response);
			}
		},
		async getAllTags({ commit }) {
			try {
				const res = await axios.get(
					import.meta.env.VITE_API_URL + "/tags/projects"
				);
				commit("setProjectsTags", res.data.tags);
			} catch (e) {
				console.log(e.response);
			}

			try {
				const res = await axios.get(
					import.meta.env.VITE_API_URL + "/tags/repos"
				);
				commit("setReposTags", res.data.tags);
			} catch (e) {
				console.log(e.response);
			}

			try {
				const res = await axios.get(
					import.meta.env.VITE_API_URL + "/tags/materials"
				);
				commit("setMaterialsTags", res.data.tags);
			} catch (e) {
				console.log(e.response);
			}
		},
		async addTag({ commit }, tag) {
			try {
				const res = await axios.post(
					import.meta.env.VITE_API_URL + "/tags",
					tag
				);
				commit("addTag", {
					tag: res.data.tag,
					menu: res.data.tag.menu,
				});
			} catch (e) {
				console.log(e.response);
			}
		},
		async addProject({ state, commit }, project) {
			try {
				const res = await axios({
					method: "post",
					url: import.meta.env.VITE_API_URL + "/projects",
					data: project,
					headers: { "Content-Type": "multipart/form-data" },
				});
				const payload = res.data.project;
				payload.tags = getTags(state.tags.projects, payload.tags);
				commit("addProject", payload);
				commit("openPopup", {
					title: "Success",
					message: "Project is Created!",
				});
			} catch (e) {
				console.log(e.response);
			}
		},
		async addRepo({ state, commit }, repo) {
			try {
				const res = await axios.post(
					import.meta.env.VITE_API_URL + "/repos",
					repo
				);

				commit("addRepo", res.data.repo);
				commit("openPopup", {
					title: "Success",
					message: "Repo is Created!",
				});
			} catch (e) {
				console.log(e.response);
			}
		},
		async addMaterial({ state, commit }, material) {
			try {
				const res = await axios.post(
					import.meta.env.VITE_API_URL + "/materials",
					material
				);

				commit("addMaterial", res.data.material);
				commit("openPopup", {
					title: "Success",
					message: "Material is Created!",
				});
			} catch (e) {
				console.log(e.response);
			}
		},
		async editTag({ commit }, { id, name }) {
			try {
				const res = await axios.patch(
					import.meta.env.VITE_API_URL + "/tags",
					{ _id: id, name }
				);
				commit("replaceTag", res.data.tag);
			} catch (e) {
				console.log(e.response);
			}
		},
		async updateProject({ commit }, project) {
			try {
				const res = await axios({
					method: "patch",
					url: import.meta.env.VITE_API_URL + "/projects",
					data: project,
					headers: { "Content-Type": "multipart/form-data" },
				});
				commit("replaceProject", res.data.project);
				commit("openPopup", {
					title: "Success",
					message: "Project is Edited!",
				});
			} catch (e) {
				console.log(e.response);
			}
		},
		async updateRepo({ commit }, repo) {
			try {
				const res = await axios.patch(
					import.meta.env.VITE_API_URL + "/repos",
					repo
				);
				commit("replaceRepo", res.data.repo);
				commit("openPopup", {
					title: "Success",
					message: "Repo is Edited!",
				});
			} catch (e) {
				console.log(e.response);
			}
		},
		async updateMaterial({ commit }, material) {
			try {
				const res = await axios.patch(
					import.meta.env.VITE_API_URL + "/materials",
					material
				);

				commit("replaceMaterial", res.data.material);
				commit("openPopup", {
					title: "Success",
					message: "Material is Edited!",
				});
			} catch (e) {
				console.log(e.response);
			}
		},
		async deleteTag({ state, commit }, { id: tagId, routePath }) {
			const tag = state.tags[routePath].find((tag) => tag._id === tagId);

			if (tag) {
				try {
					axios.delete(
						import.meta.env.VITE_API_URL + "/tags/" + tag._id
					);

					commit("deleteTag", tag);
				} catch (e) {
					console.log(e.response);
				}
			}
		},
		async deleteProject({ commit }, id) {
			try {
				await axios.delete(
					import.meta.env.VITE_API_URL + "/projects/" + id
				);
				commit("deleteProject", id);
				commit("openPopup", {
					title: "Success",
					message: "Project is Deleted!",
				});
			} catch (e) {
				console.log(e.response);
			}
		},
		async deleteRepo({ commit }, id) {
			try {
				await axios.delete(
					import.meta.env.VITE_API_URL + "/repos/" + id
				);
				commit("deleteRepo", id);
				commit("openPopup", {
					title: "Success",
					message: "Repo is Deleted!",
				});
			} catch (e) {
				console.log(e.response);
			}
		},
		async deleteMaterial({ commit }, id) {
			try {
				await axios.delete(
					import.meta.env.VITE_API_URL + "/materials/" + id
				);
				commit("deleteMaterial", id);
				commit("openPopup", {
					title: "Success",
					message: "Material is Deleted!",
				});
			} catch (e) {
				console.log(e.response);
			}
		},
	},
});

//  utils

const getTags = (tags, tagsIds) => {
	return tagsIds.map((tagId) => tags.find((tag) => tag._id === tagId));
};
