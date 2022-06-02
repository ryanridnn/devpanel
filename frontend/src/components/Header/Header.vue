<template>
	<div @click="handleAdd" class="mobile-add">
		<PlusIcon class="icon" />
	</div>
</template>

<script>
import { PlusIcon } from "@heroicons/vue/solid";

export default {
	name: "Header",
	components: {
		PlusIcon,
	},
	props: {
		handleAdd: Function,
	},
	computed: {
		tag() {
			return this.$route.params.tag;
		},
	},
};
</script>

<style lang="scss" scoped>
.header {
	display: none;
	justify-content: space-between;
	align-items: center;

	&__title {
		font-size: 2rem;
		font-weight: 600;
		text-transform: capitalize;
	}

	&__add {
		display: flex;
		gap: 0.25rem;
		padding: 0.75rem 0.75rem;
		background: $clr-secondary;
		color: $clr-neutral-1;
		border-radius: 0.25rem;
	}
}

.mobile-add {
	@extend .flex-center, .btn, .btn__hover--shrink;

	position: fixed;
	bottom: 2rem;
	right: 2rem;
	height: 3.5rem;
	width: 3.5rem;
	border-radius: 100%;
	background: $clr-secondary;
	box-shadow: $shadow;
	z-index: 1;

	.icon {
		height: 2rem;
		color: $clr-neutral-1;
	}
}
</style>
