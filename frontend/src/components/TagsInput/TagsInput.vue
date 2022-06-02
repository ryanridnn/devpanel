<template>
	<div class="tags-input" :class="{ 'tags-input--focus': focus }">
		<ul v-if="tags.length > 0" class="tags-input__list tag-list">
			<li
				v-for="({ _id, name }, index) in tags"
				:key="_id"
				class="tag-list__item"
			>
				<span class="tag-list__tag">{{ name }}</span>
				<button @click="removeTag(index)" class="tag-list__remove">
					<XIcon class="icon-sm" />
				</button>
			</li>
		</ul>
		<div class="tags-input__inp relative">
			<input
				v-if="tags.length < 3"
				ref="input"
				v-model="tag"
				placeholder="ex: React"
				@keyup="handleTagKeyup"
				type="text"
				:id="inputId"
				autocomplete="off"
			/>
			<ul v-if="tag && filteredTags.length > 0" class="tags">
				<li
					v-for="({ _id, name }, index) in filteredTags"
					:key="_id"
					@click="addTag(index)"
					class="tags__item"
					:class="{
						'tags__item--highlighted': index === tagIndex,
					}"
				>
					{{ name }}
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { XIcon } from "@heroicons/vue/solid";

export default {
	name: "TagsInput",
	props: {
		docId: String,
		initialTags: {
			type: Array,
			default: [],
		},
		tagsMenu: String,
		setTags: Function,
		inputId: String,
	},
	components: {
		XIcon,
	},
	data() {
		return {
			tags: [],
			tag: null,
			tagIndex: 0,
			focus: false,
		};
	},
	methods: {
		addTag(index) {
			if (this.tags.some((tag) => tag === this.filteredTags[index]))
				return;

			this.tags.push(this.filteredTags[index]);
			this.setTags([...this.tags]);
			this.tag = null;
		},
		removeTag(index) {
			this.tags.splice(index, 1);
			this.setTags([...this.tags]);
		},
		handleTagKeyup(e) {
			if (e.code === "Enter") {
				if (
					this.filteredTags.length > 0 &&
					!this.tags.some(
						(tag) => tag === this.filteredTags[this.tagIndex]
					)
				) {
					this.tags.push(this.filteredTags[this.tagIndex]);
					this.setTags([...this.tags]);
					this.tag = null;
				}
			} else if (e.code === "ArrowUp") {
				this.tagIndex = Math.max(0, this.tagIndex - 1);
			} else if (e.code === "ArrowDown") {
				this.tagIndex = Math.min(
					this.filteredTags.length - 1,
					this.tagIndex + 1
				);
			}
		},
		toggleFocus() {
			this.focus = !this.focus;
		},
	},
	computed: {
		filteredTags() {
			this.tagIndex = 0;

			const matches = this.allTags.filter((tag) =>
				tag.name.match(new RegExp(this.tag, "i"))
			);

			return matches;
		},
		allTags() {
			const routePath = this.$route.path.split("/").join("");

			return this.$store.state.tags[routePath];
		},
	},
	watch: {
		docId() {
			this.tags = this.initialTags || [];
		},
	},
	mounted() {
		this.$refs.input.addEventListener("focus", this.toggleFocus);
		this.$refs.input.addEventListener("blur", this.toggleFocus);
	},
	beforeDestroy() {
		this.$refs.input.removeEventListener("blur", this.toggleFocus);
		this.$refs.input.removeEventListener("focus", this.toggleFocus);
	},
};
</script>

<style lang="scss" scoped>
.tags-input {
	@extend .flex-y-center;
	gap: 1rem;

	background: $clr-secondary-greyish;
	border: none;
	border-radius: 0.25rem;
	outline: none;
	font-size: $font-base;
	padding: 0 1.25rem;
	border: 0.02px solid #00000000;

	@include transition-base(all);

	&--focus {
		box-shadow: $shadow;
		border: 0.02px solid $clr-dark-2;
	}

	&:focus {
		box-shadow: $shadow;
		border: 0.02px solid $clr-dark-2;
	}

	&__col {
		@extend .flex-y-center;
		gap: 1rem;
		padding: 0 1.25rem !important;
	}

	&__inp {
		flex: 1;
	}

	input {
		width: 100%;
		padding: 1rem 0 !important;
		border: none !important;
		background: none;
		outline: none;

		&:focus {
			box-shadow: none !important;
			border: none !important;
		}
	}
}

.tag-list {
	display: flex;
	gap: 1rem;
	cursor: pointer;

	&__item {
		@extend .flex-y-center;

		padding: 1rem 0;
		gap: 0.5rem;
	}

	&__tag {
		text-transform: capitalize;
	}

	&__remove {
		@extend .flex-y-center;

		background: none;
		.icon {
			color: $clr-dark-3;
		}
	}
}

.tags {
	position: absolute;
	bottom: 0;
	left: 0;
	transform: translateY(100%);
	margin-top: 0.5rem;
	cursor: pointer;
	z-index: 2;

	background: $clr-primary-light;
	color: $clr-on-primary;
	border-radius: 0.25rem;
	overflow: hidden;
	box-shadow: $shadow;

	font-size: $font-sm;
	font-weight: 500;
	text-transform: capitalize;

	&__item {
		padding: 1rem;

		&--highlighted {
			background: $clr-primary;
		}
	}
}
</style>
