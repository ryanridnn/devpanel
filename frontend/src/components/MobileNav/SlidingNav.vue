<template>
	<div class="nav">
		<div class="nav__top">
			<div class="nav__topbar">
				<logo class="nav__logo" />
				<button
					class="nav__close btn btn__focus-shrink"
					@click="toggleMenu"
				>
					<XIcon class="icon" />
				</button>
			</div>
			<nav>
				<ul class="nav__list">
					<li
						v-for="path in PATHS"
						:key="path"
						class="nav__item"
						:class="{
							'nav__item--active': routePath === path,
						}"
					>
						<router-link :to="'/' + path" class="nav__link">
							<span>{{ path }}</span>
							<TemplateIcon class="icon" />
						</router-link>
						<ul v-if="routePath === path" class="nav__sublist">
							<li
								v-for="({ _id, name }, index) in tags"
								:key="index"
								class="nav__subitem"
								:class="{
									'nav__subitem--active':
										routeTagParam === _id,
								}"
							>
								<div class="nav__subitem__content">
									<router-link
										v-if="tagEditingId !== _id"
										:to="'/' + path + '/' + _id"
										class="nav__sublink"
										>{{ name }}</router-link
									>
									<form
										v-else
										@submit.prevent="
											() => handleEditSubmit(_id, name)
										"
										class="nav__subitem-edit"
									>
										<input
											v-model.trim="editTag"
											autofocus
											type="text"
											class="nav__subitem-edit__input"
											placeholder="tag..."
										/>
									</form>
								</div>
								<div class="nav__tag-option relative">
									<CogIcon
										class="icon-sm"
										@click="
											setDropdownOpenedIndex(
												this.dropdownOpenedIndex !==
													null
													? null
													: index
											)
										"
									/>
									<Dropdown
										:actions="getActions(_id)"
										:opened="dropdownOpenedIndex === index"
										:close="
											() => setDropdownOpenedIndex(null)
										"
									/>
								</div>
							</li>

							<li class="nav__subitem-add">
								<button
									v-if="!addingTag"
									@click="toggleAddingTag"
									class="nav__subitem-add__button"
								>
									<PlusIcon class="icon-sm" />
									<span>Add more</span>
								</button>
								<form
									v-else
									@submit.prevent="handleAddingTag"
									class="nav__subitem-add__form"
								>
									<input
										v-model.trim="tag"
										autofocus
										type="text"
										class="nav__subitem-add__input"
										placeholder="tag..."
									/>
								</form>
							</li>
						</ul>
					</li>
				</ul>
			</nav>
		</div>
		<!-- <div class="nav__bottom">
			<CollectionIcon class="icon" />
			<span>Note</span>
		</div> -->
	</div>
</template>

<script>
import Dropdown from "../Dropdown/Dropdown.vue";
import Logo from "../../assets/logo.svg";

import {
	TemplateIcon,
	TerminalIcon,
	BookOpenIcon,
	XIcon,
	PlusIcon,
	CogIcon,
} from "@heroicons/vue/solid";

import { CollectionIcon } from "@heroicons/vue/outline";

const PATHS = ["projects", "repos", "materials"];

export default {
	name: "SlidingNav",
	components: {
		Logo,
		TemplateIcon,
		TerminalIcon,
		BookOpenIcon,
		CollectionIcon,
		XIcon,
		PlusIcon,
		CogIcon,
		Dropdown,
	},
	props: {
		menuOpened: Boolean,
		toggleMenu: Function,
		routePath: String,
		routeTagParam: String,
	},
	data() {
		return {
			tag: null,
			editTag: null,
			addingTag: false,
			PATHS,
			selectedPathTags: null,
			tagEditingId: null,
			dropdownOpenedIndex: null,
		};
	},
	methods: {
		async toggleAddingTag() {
			const tag = {
				name: this.tag,
				menu: this.routePath,
			};

			if (tag.name) {
				await this.$store.dispatch("addTag", tag);

				this.$store.commit("openPopup", {
					title: "Success",
					message: "Tag is Added!",
				});

				this.tag = null;
			}

			this.addingTag = !this.addingTag;
		},
		handleAddingTag() {
			this.toggleAddingTag();
		},
		setDropdownOpenedIndex(num) {
			this.dropdownOpenedIndex = num;
		},
		getActions(id) {
			return [
				{
					text: "Update",
					handler: () => {
						this.setTagEditingId(id);

						this.$store.commit("openPopup", {
							title: "Success",
							message: "Tag is Updated!",
						});
					},
				},
				{
					text: "Delete",
					handler: async () => {
						this.$store.dispatch("deleteTag", {
							id,
							routePath: this.routePath,
						});

						if (this.routeTagParam === id) {
							this.$router.push("/" + this.routePath);
						}

						this.$store.commit("openPopup", {
							title: "Success",
							message: "Tag is deleted!",
						});
					},
				},
			];
		},
		setTagEditingId(id) {
			if (!id) {
				this.tagEditingId = null;
				return;
			}
			const tag = this.tags.find((t) => t._id === id);

			this.editTag = tag.name;

			this.tagEditingId = id;
		},
		async handleEditSubmit(id, prevName) {
			if (this.editTag !== prevName) {
				await this.$store.dispatch("editTag", {
					id,
					name: this.editTag,
				});

				this.setTagEditingId(null);
			}
		},
	},
	computed: {
		tags() {
			return this.$store.state.tags[this.routePath];
		},
	},
	watch: {
		menuOpened() {
			if (!this.menuOpened) this.addingTag = false;
		},
		routePath() {
			this.tagEditingIndex = null;
		},
	},
};
</script>

<style lang="scss" scoped>
.nav {
	display: flex;
	flex-direction: column;
	z-index: 10;

	&__top {
		padding: 2rem 2rem 0;
		flex: 1;
	}

	&__topbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	&__logo {
		height: 1.25rem;
	}

	&__close {
		@extend .flex-center, .btn, .btn__hover--shrink, .btn__focus--shrink;

		background: $clr-primary-light;
		border-radius: 0.25rem;
		color: $clr-neutral-1;
		height: 2.25rem;
		width: 2.25rem;

		@include transition-base(transform);

		&:focus {
			transform: scale(0.9);
		}
	}

	nav {
		margin-top: 1.75rem;
	}

	&__list {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	&__item {
		text-transform: capitalize;
	}

	&__item--active {
		.nav__link {
			color: $clr-on-primary;
			font-weight: 500;
		}
	}

	&__separator {
		height: 1.6px;
		width: 100%;
		background: $clr-primary-dark;
	}

	&__link {
		display: flex;
		justify-content: space-between;
		align-items: center;

		font-size: $font-lg;
		color: $clr-on-primary-blend-1;
	}

	&__sublist {
		background: $clr-primary-dark;
		margin-top: 1rem;
		border-radius: 0.5rem;
		padding: 0.75rem 1rem;
	}

	&__subitem-add {
		&__button {
			@extend .flex-y-center;
			gap: 0.375rem;
			width: 100%;
			padding: 0.5rem 0;
			background: none;
			color: $clr-on-primary;
			font-size: $font-sm;
		}

		&__input {
			width: 100%;
			padding: 0.5rem 0;
			background: none;
			border: none;
			border-radius: 0.25rem;
			outline: none;
			color: $clr-on-primary-blend-1;

			@include transition-base(padding);

			&:focus {
				padding: 0.5rem;
				border: 1px solid $clr-on-primary-blend-2;
			}

			&::placeholder {
				color: $clr-on-primary-blend-2;
			}
		}
	}

	&__subitem-edit {
		&__input {
			width: 100%;
			padding: 0.5rem 0;
			background: none;
			border: none;
			border-radius: 0.25rem;
			outline: none;
			color: $clr-on-primary-blend-1;

			@include transition-base(padding);

			&:focus {
				padding: 0.5rem;
				border: 1px solid $clr-on-primary-blend-2;
			}

			&::placeholder {
				color: $clr-on-primary-blend-2;
			}
		}
	}

	&__subitem {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;

		&--active {
			.nav__sublink {
				color: $clr-on-primary;
				font-weight: 500;
			}

			.nav__tag-option {
				color: $clr-on-primary;
			}
		}

		&__content {
			width: 100%;
		}
	}

	&__sublink {
		flex: 1;
		display: block;
		padding: 0.5rem 0;
		color: $clr-on-primary-blend-1;
	}

	&__tag-option {
		cursor: pointer;
		color: $clr-on-primary-blend-1;
	}

	&__bottom {
		@extend .flex-center;
		gap: 0.5rem;

		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 1.25rem;
		background: $clr-primary-light;
		font-size: $font-lg;
	}
}
</style>
