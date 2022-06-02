<template>
	<Modal title="Update" :opened="opened" :close="close">
		<div class="form">
			<div class="form__name">
				<label for="uptade__name">Name</label>
				<input
					v-model="name"
					type="text"
					placeholder="ex: Javascript project"
					id="uptade__name"
				/>
			</div>
			<div class="form__desc">
				<label for="update__desc">Description</label>
				<input
					v-model="desc"
					type="text"
					placeholder="ex: Social media app built with vue.js"
					id="update__desc"
				/>
			</div>
			<div class="form__path">
				<label for="update__path">Path to project</label>
				<div class="form__input-group">
					<select v-model="path.source">
						<option value="github" default>Github</option>
						<option value="local">Local</option>
					</select>
					<input
						v-model="path.url"
						type="text"
						placeholder="ex: http://github.com/user/repo"
						id="update__path"
					/>
				</div>
			</div>
			<div class="form__tags">
				<label for="update__tags">Tags</label>
				<TagsInput
					:docId="_id"
					:initialTags="tags"
					tagsMenu="repos"
					:setTags="setTags"
					inputId="update__tags"
				/>
			</div>
			<button type="submit" class="form__submit" @click="handleSubmit">
				Update
			</button>
		</div>
	</Modal>
</template>

<script>
import Modal from "../Modal/Modal.vue";
import TagsInput from "../TagsInput/TagsInput.vue";

import { CameraIcon, XIcon } from "@heroicons/vue/solid";

export default {
	name: "AddRepo",
	props: {
		opened: Boolean,
		close: Function,
		repo: Object,
	},
	components: {
		Modal,
		CameraIcon,
		XIcon,
		TagsInput,
	},
	data() {
		return {
			_id: null,
			name: null,
			desc: null,
			path: {
				source: "github",
				url: null,
			},
			tags: [],
		};
	},
	methods: {
		setTags(tags) {
			this.tags = tags;
		},
		async handleSubmit() {
			const repo = {
				_id: this._id,
				name: this.name,
				desc: this.desc,
				path: this.path,
				tags: this.tags,
			};

			if (
				!repo._id ||
				!repo.name ||
				!repo.desc ||
				!repo.path.source ||
				!repo.path.url ||
				repo.tags.length === 0
			) {
				return;
			}

			if (
				repo._id === this.repo._id &&
				repo.name === this.repo.name &&
				repo.desc === this.repo.desc &&
				repo.path.source === this.repo.path.source &&
				repo.path.url === this.repo.path.url
			) {
				if (
					repo.tags.length === this.repo.tags.length &&
					repo.tags.every((tag) =>
						this.repo.tags.some((t) => t._id === tag._id)
					)
				) {
					return;
				}
			}

			await this.$store.dispatch("updateRepo", repo);
			this.close();
		},
	},
	computed: {
		filteredTags() {
			this.tagIndex = 0;

			const matches = this.allTags
				.map((tag) => tag.match(new RegExp(this.tag)))
				.filter((tag) => tag !== null)
				.map((tag) => tag.input);

			return matches;
		},
	},
	watch: {
		repo() {
			const { _id, name, desc, path, tags } = { ...this.repo };

			this._id = _id;
			this.name = name;
			this.desc = desc;
			this.path = path || { source: "Github", url: null };
			this.tags = tags ? [...tags] : [];
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
