<template>
	<Modal title="Add" :opened="opened" :close="close">
		<div class="form">
			<div class="form__avatar">
				<div class="label">Avatar</div>
				<div class="form__avatar__preview preview">
					<div v-if="!previewurl" class="preview__nopreview">
						<CameraIcon class="icon" />
					</div>
					<img
						v-else
						:src="previewurl"
						alt="preview"
						class="preview__img"
					/>
				</div>
				<label for="avatar" class="form__avatar__label"
					>Select Avatar</label
				>
				<input
					@change="changeAvatar"
					type="file"
					class="form__avatar__input"
					id="avatar"
				/>
			</div>
			<div class="form__name">
				<label for="name">Name</label>
				<input
					v-model="name"
					type="text"
					placeholder="ex: Javascript project"
					id="name"
				/>
			</div>
			<div class="form__desc">
				<label for="desc">Description</label>
				<input
					v-model="desc"
					type="text"
					placeholder="ex: Social media app built with vue.js"
					id="desc"
				/>
			</div>
			<div class="form__path">
				<label for="path">Path to project</label>
				<div class="form__input-group">
					<select v-model="path.source">
						<option value="github" default>Github</option>
						<option value="local">Local</option>
					</select>
					<input
						v-model="path.url"
						type="text"
						placeholder="ex: http://github.com/user/repo"
						id="path"
					/>
				</div>
			</div>
			<div class="form__tags">
				<label for="tags">Tags</label>
				<TagsInput
					tagsMenu="projects"
					:setTags="setTags"
					inputId="tags"
				/>
			</div>

			<div class="form__deployed">
				<div class="form__deployed__label-group">
					<label for="deployed">Deployed</label>
					<label
						for="deployedToggle"
						class="form__deployed__toggle"
						:class="{
							'form__deployed__toggle--active':
								deployed.isDeployed,
						}"
					>
						<div class="circle"></div>
					</label>
					<input
						v-model="deployed.isDeployed"
						type="checkbox"
						class="form__deployed__checkbox"
						id="deployedToggle"
					/>
				</div>
				<input
					v-model="deployed.url"
					type="text"
					placeholder="ex: Social media app built with vue.js"
					id="deployed"
					:autofocus="!deployed.isDeployed"
					:disabled="!deployed.isDeployed"
				/>
			</div>
			<button type="submit" class="form__submit" @click="handleSubmit">
				Add
			</button>
		</div>
	</Modal>
</template>

<script>
import Modal from "../Modal/Modal.vue";
import TagsInput from "../TagsInput/TagsInput.vue";

import { CameraIcon } from "@heroicons/vue/solid";

export default {
	name: "AddProject",
	props: {
		opened: Boolean,
		close: Function,
	},
	components: {
		Modal,
		CameraIcon,
		TagsInput,
	},
	data() {
		return {
			avatar: null,
			name: null,
			desc: null,
			path: {
				source: "github",
				url: null,
			},
			deployed: {
				isDeployed: false,
				url: null,
			},
			tags: [],
			previewurl: null,
		};
	},
	methods: {
		changeAvatar(e) {
			const file = e.target.files[0];

			if (!file) return;

			this.avatar = file;
			const url = URL.createObjectURL(file);
			this.previewurl = url;

			e.target.value = null;
		},
		async handleSubmit() {
			if (
				!this.name ||
				!this.desc ||
				!this.path.source ||
				!this.path.url ||
				this.deployed.isDeployed === null
			) {
				this.$store.commit("openPopup", {
					title: "Fill the form",
					message: "You need to fill the form in order to add.",
				});
				return;
			}

			const project = new FormData();

			project.append("name", this.name);
			project.append("desc", this.desc);
			if (this.avatar) {
				project.append("avatar", this.avatar, this.avatar.name);
			}
			project.append("pathSource", this.path.source);
			project.append("pathUrl", this.path.url);
			project.append("isDeployed", this.deployed.isDeployed);
			project.append("deployedUrl", this.deployed.url);

			this.tags.forEach((tag) => {
				project.append("tags[]", tag._id);
			});

			await this.$store.dispatch("addProject", project);

			this.close();
		},
		setTags(tags) {
			this.tags = tags;
		},
	},
	watch: {
		"deployed.isDeployed"() {
			if (!this.deployed.isDeployed) this.deployed.url = null;
		},
	},
};
</script>

<style lang="scss" scoped>
.form {
	display: flex;
	flex-direction: column;
	gap: 1.375rem;
	height: 100%;
	min-height: 0;
	overflow-y: auto;

	padding: 1.5rem 1.25rem;

	@include responsive($screen-sm) {
		margin-bottom: 0rem;
	}

	& > div {
		display: flex;
		flex-direction: column;
		gap: 0.625rem;
		width: 100%;

		input[type="text"],
		select {
			background: $clr-secondary-greyish;
			border: none;
			border-radius: 0.25rem;
			outline: none;
			font-size: $font-base;
			padding: 1rem 1.25rem;
			border: 0.02px solid #00000000;

			@include transition-base(all);

			&:focus {
				box-shadow: $shadow;
				border: 0.02px solid $clr-dark-2;
			}
		}
	}

	&__input-group {
		display: flex;
		gap: 0.5rem;
	}

	label,
	.label {
		font-weight: 500;
	}

	&__avatar {
		align-items: center;
		gap: 0.75rem !important;
		margin-top: 0.5rem;

		&__preview {
			height: 5rem;
			width: 5rem;
			border-radius: 100%;
			background: $clr-secondary-greyish;
			overflow: hidden;

			.preview__nopreview {
				@extend .flex-center;

				height: 100%;
				width: 100%;

				.icon {
					color: $clr-dark-3;
				}
			}

			.preview__img {
				height: 100%;
			}
		}

		&__label {
			@extend .btn, .btn__hover--shrink, .btn__focus--shrink;

			font-size: $font-sm;
			padding: 0.5rem 0.75rem;
			background: $clr-secondary-greyish;
			color: $clr-secondary;
			border-radius: 0.25rem;
		}

		&__input {
			display: none;
		}
	}

	&__path {
		width: 100%;

		select {
			font-size: $font-sm;
			padding: 0rem 0.5rem !important;
			color: $clr-dark-1;
			box-shadow: none;

			option {
				color: $clr-dark-2;
			}
		}

		input {
			flex: 1;
			overflow: hidden;
		}
	}

	&__deployed {
		&__label-group {
			@extend .flex-y-center;
			gap: 0.5rem;
		}

		&__toggle {
			cursor: pointer;
			@extend .toggle;

			div {
				@extend .toggle__circle;
			}
		}

		&__toggle--active {
			@extend .toggle--active;
		}

		&__checkbox {
			display: none;
		}
	}

	&__submit {
		margin-top: 1rem;
		padding: 1.125rem;
		border-radius: 0.25rem;
		background: $clr-secondary;
		color: $clr-neutral-1;
		font-weight: 500;
	}
}
</style>
