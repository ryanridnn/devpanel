<template>
	<div class="material">
		<div class="material__top">
			<div class="material__name">{{ material.name }}</div>
			<div class="material__main-detail">
				<a :href="material.url" class="material__url">
					{{ material.url }}
				</a>
				<div class="material__option relative">
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
			<ul class="material__tags">
				<li
					v-for="{ _id, name: tag } in material.tags"
					:key="_id"
					class="material__tag"
				>
					<span class="circle"></span>
					<span>{{ tag }}</span>
				</li>
			</ul>
		</div>
		<a :href="material.url" target="_blank" class="material__bottom"
			>See Material</a
		>
	</div>
</template>

<script>
import Dropdown from "../Dropdown/Dropdown.vue";

import { DotsHorizontalIcon } from "@heroicons/vue/solid";

export default {
	name: "repoCard",
	props: {
		material: Object,
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
						this.$store.dispatch(
							"deleteMaterial",
							this.material._id
						),
				},
			],
		};
	},
	methods: {
		setDropdownOpened(bool) {
			this.dropdownOpened = bool;
		},
	},
};
</script>

<style lang="scss" scoped>
.material {
	display: flex;
	flex-direction: column;
	background: $clr-neutral-1;
	border-radius: 0.5rem;
	box-shadow: $shadow;
	border: $border-2;

	&__top {
		width: 100%;
		flex: 1;
		padding: 1.25rem;
	}

	&__main-detail {
		@extend .flex-y-center;
		justify-content: space-between;
		gap: 0.25rem;
		margin-top: 0.75rem;
	}

	&__name {
		font-family: $font-secondary;
		font-size: $font-lg;
		font-weight: 800;
		text-transform: capitalize;
		margin-right: 0.5rem;

		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	&__option {
		padding: 0.125rem;
	}

	&__url {
		@extend .p, .p--sm;

		color: $clr-secondary;
		flex: 1;
		white-space: nowrap;
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
