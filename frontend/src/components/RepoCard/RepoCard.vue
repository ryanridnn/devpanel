<template>
	<div class="repo">
		<div class="repo__top">
			<div class="repo__main-detail">
				<div class="repo__name">{{ repo.name }}</div>
				<div class="repo__option relative">
					<DotsHorizontalIcon
						@click="setDropdownOpened(true)"
						class="icon-sm"
					/>
					<Dropdown
						:actions="dropdownActions"
						:opened="dropdownOpened"
						:close="() => setDropdownOpened(false)"
					/>
				</div>
			</div>
			<div class="repo__desc">
				{{ repo.desc }}
			</div>
			<ul class="repo__tags">
				<li
					v-for="{ _id, name: tag } in repo.tags"
					:key="_id"
					class="repo__tag"
				>
					<span class="circle"></span>
					<span>{{ tag }}</span>
				</li>
			</ul>
		</div>
		<button class="repo__bottom" @click="handleSeeRepo">See Repo</button>
	</div>
</template>

<script>
import Dropdown from "../Dropdown/Dropdown.vue";

import { DotsHorizontalIcon } from "@heroicons/vue/solid";

export default {
	name: "repoCard",
	props: {
		repo: Object,
		update: Function,
	},
	components: {
		DotsHorizontalIcon,
		Dropdown,
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
						this.$store.dispatch("deleteRepo", this.repo._id),
				},
			],
		};
	},
	methods: {
		setDropdownOpened(bool) {
			this.dropdownOpened = bool;
		},
		handleSeeRepo() {
			if (this.repo.path.source === "github") {
				window.open(this.repo.path.url, "_blank");
			} else {
				navigator.clipboard.writeText(`cd ${this.repo.path.url}`);
				this.$store.commit("openPopup", {
					title: "Cd command has been copied",
					message: "Paste it to your terminal and run it",
				});
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.repo {
	display: flex;
	flex-direction: column;
	background: $clr-neutral-1;
	border-radius: 0.5rem;
	box-shadow: $shadow;
	border: $border-2;
	overflow-x: hidden;

	&__top {
		gap: 0.75rem;
		padding: 1rem 1.25rem 1.25rem;
		flex: 1;
	}

	&__main-detail {
		@extend .flex-y-center;
		justify-content: space-between;
		margin-top: 0.25rem;
		flex: 1;
	}

	&__name {
		font-size: $font-2xl;
		font-weight: 700;
		text-transform: capitalize;
		margin-right: 0.5rem;

		flex: 1;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	&__option {
		padding: 0.125rem;
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
		padding: 1rem 0 1rem 1.25rem;
		background: $clr-neutral-3;
		border: $border-1;
		color: $clr-dark-2;
		font-weight: 500;
		border-bottom-left-radius: 0.5rem;
		border-bottom-right-radius: 0.5rem;
	}
}
</style>
