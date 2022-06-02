<template>
	<div class="modal" :class="{ 'modal--active': opened }">
		<div class="modal__top">
			<div class="modal__title">{{ title }}</div>
			<button @click="close" class="modal__close">
				<XIcon class="icon" />
			</button>
			<div class="modal__top__bg">
				<Rect class="rect" />
				<Path1 class="path1" />
				<Path2 class="path2" />
			</div>
		</div>
		<div class="modal__bottom">
			<slot></slot>
		</div>
	</div>
</template>

<script>
import Rect from "../../assets/modal-bg/rect.svg";
import Path1 from "../../assets/modal-bg/path1.svg";
import Path2 from "../../assets/modal-bg/path2.svg";

import { XIcon } from "@heroicons/vue/solid";

export default {
	name: "Modal",
	props: {
		title: String,
		opened: Boolean,
		close: Function,
	},
	components: {
		XIcon,
		Rect,
		Path1,
		Path2,
	},
};
</script>

<style lang="scss" scoped>
.modal {
	display: flex;
	flex-direction: column;

	position: fixed;
	top: 0;
	left: 50%;
	width: 100%;
	height: 100vh;
	z-index: 11;

	transform: translateY(115vh) translateX(-50%);

	@include transition(transform, 0.475s, ease);

	@include responsive($screen-sm) {
		border-radius: 0.75rem;
		overflow: hidden;
		max-width: 480px;
		min-height: 0;
		height: auto;
		max-height: 100vh;
		top: auto;
		bottom: 0;
		padding-bottom: 2rem;

		&__bottom {
			border-bottom-left-radius: 0.75rem;
			border-bottom-right-radius: 0.75rem;
		}
	}

	&--active {
		transform: translateY(0) translateX(-50%);
	}

	&__top {
		@extend .flex-y-center;

		position: relative;
		justify-content: space-between;
		padding: 1rem 1.25rem;
		z-index: 2;

		&__bg {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			overflow: hidden;
			z-index: -1;
			background: $clr-primary;

			.rect {
				width: 100%;
			}

			.path1 {
				position: absolute;
				width: 100%;
				right: 3rem;
				top: 0;
			}

			.path2 {
				position: absolute;
				right: 0;
				top: 0;
				width: 100%;
			}
		}
	}

	&__title {
		font-size: $font-2xl;
		font-weight: 500;
		color: $clr-neutral-1;
	}

	&__close {
		background: none;
		color: $clr-neutral-1;

		.icon {
			height: 1.75rem;
		}
	}

	&__bottom {
		display: flex;
		flex-direction: column;
		min-height: 0;
		height: 100%;
		overflow-y: auto;
		background: $clr-neutral-1;

		& > * {
			flex: 1;
			min-height: 0;
		}
	}
}
</style>
