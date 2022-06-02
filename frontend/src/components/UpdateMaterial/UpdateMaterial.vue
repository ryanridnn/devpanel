<template>
	<Modal title="Update" :opened="opened" :close="close">
		<div class="form">
			<div class="form__name">
				<label for="update__name">Name</label>
				<input
					v-model="name"
					type="text"
					placeholder="ex: Javascript project"
					id="update__name"
				/>
			</div>
			<div class="form__url">
				<label for="update__desc">URL</label>
				<input
					v-model="URL"
					type="text"
					placeholder="ex: Social media app built with vue.js"
					id="update__desc"
				/>
			</div>
			<div class="form__tags">
				<label for="update__tags">Tags</label>
				<TagsInput
					:docId="_id"
					:initialTags="tags"
					tagsMenu="materials"
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

import { CameraIcon } from "@heroicons/vue/solid";

export default {
	name: "UpdateMaterial",
	props: {
		opened: Boolean,
		close: Function,
		material: Object,
	},
	components: {
		Modal,
		CameraIcon,
		TagsInput,
	},
	data() {
		return {
			_id: null,
			name: null,
			URL: null,
			tags: [],
		};
	},
	methods: {
		async handleSubmit() {
			const material = {
				_id: this._id,
				name: this.name,
				url: this.URL,
				tags: this.tags,
			};

			if (
				!material._id ||
				!material.name ||
				!material.url ||
				!material.tags
			) {
				return;
			} else if (
				material.name === this.material.name &&
				material.url === this.material.url
			) {
				if (
					material.tags.length === this.material.tags.length &&
					material.tags.every((tag) =>
						this.material.tags.some((t) => t._id === tag._id)
					)
				) {
					return;
				}
			}

			await this.$store.dispatch("updateMaterial", material);
			this.close();
		},
		setTags(tags) {
			this.tags = tags;
		},
	},
	watch: {
		material() {
			const { _id, name, url, tags } = { ...this.material };

			this._id = _id;
			this.name = name;
			this.URL = url;
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
