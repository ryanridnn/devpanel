<template>
	<Modal title="Add" :opened="opened" :close="close">
		<div class="form">
			<div class="form__name">
				<label for="name">Name</label>
				<input
					v-model="name"
					type="text"
					placeholder="ex: Javascript project"
					id="name"
				/>
			</div>
			<div class="form__url">
				<label for="desc">URL</label>
				<input
					v-model="URL"
					type="text"
					placeholder="ex: Social media app built with vue.js"
					id="desc"
				/>
			</div>
			<div class="form__tags">
				<label for="tags">Tags</label>
				<TagsInput
					tagsMenu="materials"
					:setTags="setTags"
					inputId="tags"
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
	name: "AddMaterial",
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
			name: null,
			URL: null,
			tags: [],
		};
	},
	methods: {
		async handleSubmit() {
			const material = {
				name: this.name,
				url: this.URL,
				tags: this.tags,
			};

			if (!material.name || !material.url) {
				this.$store.commit("openPopup", {
					title: "Fill the form",
					message: "You need to fill the form in order to add.",
				});
				return;
			}

			await this.$store.dispatch("addMaterial", material);

			this.close();
		},
		setTags(tags) {
			this.tags = tags;
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
