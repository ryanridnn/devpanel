<template>
	<div class="project">
		<div class="project__top">
			<div class="project__avatar">
				<div class="project__avatar-wrapper">
					<img
						v-if="project.avatar"
						:src="src"
						alt="project avatar"
					/>
					<div class="placeholder">
						<CameraIcon class="icon-sm" />
					</div>
				</div>
			</div>
			<div class="project__detail">
				<div class="project__main-detail">
					<div class="project__main-detail__left">
						<div
							v-if="!project.deployed.isDeployed"
							class="project__name"
						>
							{{ project.name }}
						</div>
						<a
							v-else
							:href="project.deployed.url"
							target="_blank"
							class="project__name project__name--link"
						>
							{{ project.name }}
						</a>
						<div
							v-if="project.deployed.isDeployed"
							class="project__deployed"
						>
							<span class="circle"></span>
							<span>Deployed</span>
						</div>
					</div>
					<button class="project__option relative">
						<DotsHorizontalIcon
							@click="setDropdownOpened(true)"
							class="icon-sm"
						/>
						<Dropdown
							:actions="dropdownActions"
							:opened="dropdownOpened"
							:close="() => setDropdownOpened(false)"
						/>
					</button>
				</div>
				<div class="project__desc">
					{{ project.desc }}
				</div>
				<ul class="project__tags">
					<li
						v-for="{ _id, name: tag } in project.tags"
						:key="_id"
						class="project__tag"
					>
						<span class="circle"></span>
						<span>{{ tag }}</span>
					</li>
				</ul>
			</div>
		</div>
		<button class="project__bottom" @click="handleSeeProject">
			See Project
		</button>
	</div>
</template>

<script>
import Dropdown from "../Dropdown/Dropdown.vue";

import { DotsHorizontalIcon, CameraIcon } from "@heroicons/vue/solid";

export default {
	name: "ProjectCard",
	props: {
		project: Object,
		update: Function,
	},
	components: {
		DotsHorizontalIcon,
		Dropdown,
		CameraIcon,
	},
	data() {
		return {
			dropdownOpened: false,
			dropdownActions: [
				{
					text: "Update",
					handler: this.update,
				},
				{
					text: "Delete",
					handler: () =>
						this.$store.dispatch("deleteProject", this.project._id),
				},
			],
		};
	},
	methods: {
		setDropdownOpened(bool) {
			this.dropdownOpened = bool;
		},
		handleSeeProject() {
			if (this.project.path.source === "github") {
				window.open(this.project.path.url, "_blank");
			} else {
				navigator.clipboard.writeText(`cd ${this.project.path.url}`);
				this.$store.commit("openPopup", {
					title: "Cd command has been copied",
					message: "Paste it to your terminal and run it",
				});
			}
		},
	},
	computed: {
		src() {
			return import.meta.env.VITE_SERVER_URL + this.project.avatar;
		},
	},
};
</script>

<style lang="scss" scoped>
.project {
	display: flex;
	flex-direction: column;
	background: $clr-neutral-1;
	border-radius: 0.5rem;
	box-shadow: $shadow;
	border: $border-2;
	overflow-x: hidden;

	&__top {
		flex: 1;
		display: flex;
		gap: 0.75rem;
		padding: 1rem 1.25rem 1.625rem;
	}

	&__avatar-wrapper {
		height: 2rem;
		width: 2rem;
		border-radius: 100%;
		overflow: hidden;

		img {
			height: 100%;
		}

		.placeholder {
			@extend .flex-center;
			width: 100%;
			height: 100%;
			background: $clr-secondary-greyish;

			.icon-sm {
				color: $clr-dark-2;
			}
		}
	}

	&__detail {
		flex: 1;
		min-width: 0;
	}

	&__main-detail {
		@extend .flex-y-center;
		justify-content: space-between;
		margin-top: 0.25rem;
		max-width: 100%;
		gap: 0.5rem;

		&__left {
			@extend .flex-y-center;
			min-width: 0;
		}
	}

	&__name {
		min-width: 0;
		font-size: $font-2xl;
		font-weight: 700;
		text-transform: capitalize;
		margin-right: 0.5rem;

		flex: 1;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;

		&--link {
			color: $clr-secondary;
		}
	}

	&__deployed {
		@extend .flex-y-center;

		font-size: $font-xs;
		color: $clr-dark-2;
		gap: 0.125rem;
		.circle {
			width: 0.5rem;
			height: 0.5rem;
			background: $clr-secondary;
			border-radius: 100%;
			margin-right: 0.25rem;
		}
	}

	&__option {
		padding: 0.125rem;
		background: none;
		cursor: pointer;
	}

	&__desc {
		@extend .p, .p--sm;

		margin-top: 0.75rem;
		color: $clr-dark-2;

		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	&__tags {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
		margin-top: 1rem;
		font-size: $font-sm;
		color: $clr-dark-2;
	}

	&__tag {
		@extend .flex-y-center;
		text-transform: capitalize;

		.circle {
			height: 0.75rem;
			width: 0.75rem;
			border-radius: 100%;
			background: $clr-secondary;
			margin-right: 0.5rem;
		}

		&:nth-child(1) {
			.circle {
				background: $clr-tag-1;
			}
		}

		&:nth-child(2) {
			.circle {
				background: $clr-tag-2;
			}
		}

		&:nth-child(3) {
			.circle {
				background: $clr-tag-3;
			}
		}
	}

	&__bottom {
		display: flex;
		width: 100%;
		padding: 1rem 0 1rem 4rem;
		background: $clr-neutral-3;
		border: $border-1;
		color: $clr-dark-2;
		font-weight: 500;
		border-bottom-left-radius: 0.5rem;
		border-bottom-right-radius: 0.5rem;
	}

	&__bottom.with-dropdown {
		@extend .flex-y-center;
		padding: 0 {
			right: 2rem;
		}

		button {
			flex: 1;
			text-align: left;
			padding: 1rem 0 1rem 4rem;
			background: none;
			color: $clr-dark-2;
		}
	}
}
</style>
