<template>
	<div class="popup" :class="{ 'popup--opened': opened }">
		<div class="popup__icon">
			<BellIcon class="icon" />
		</div>
		<div class="popup__message">
			<div class="popup__message__title">{{ title }}</div>
			<div class="popup__message__desc">{{ message }}</div>
		</div>
		<button @click="handleClose" class="popup__close">
			<XIcon class="icon-sm" />
		</button>
	</div>
</template>

<script>
import { BellIcon, XIcon } from "@heroicons/vue/solid";

export default {
	name: "Popup",
	components: {
		BellIcon,
		XIcon,
	},
	data() {
		return {};
	},
	methods: {
		handleClose() {
			this.$store.commit("closePopup");
		},
	},
	computed: {
		opened() {
			return this.$store.state.popup.opened;
		},
		title() {
			return this.$store.state.popup.data.title;
		},
		message() {
			return this.$store.state.popup.data.message;
		},
	},
};
</script>

<style lang="scss" scoped>
.popup {
	position: fixed;
	bottom: 2rem;
	left: 50%;
	transform: translate(-50%, calc(2rem + 100%));
	width: 400px;
	max-width: 92vw;

	background: $clr-neutral-1;
	box-shadow: $shadow;
	border-radius: 0.5rem;

	@extend .flex-y-center;
	gap: 0.5rem;
	padding: 1rem 1rem;
	z-index: 20;

	color: $clr-dark-2;

	@include transition-base(transform);

	&--opened {
		transform: translate(-50%, 0);
	}

	@include responsive($screen-md) {
		width: 560px;
	}

	&__icon {
		@extend .flex-center;
		background: $clr-neutral-2;
		border-radius: 0.5rem;
		height: 3.25rem;
		width: 3.25rem;
		.icon {
			height: 1.75rem;
		}
	}

	&__message {
		margin-left: 0.5rem;
		flex: 1;

		&__title {
			font-weight: 500;
			color: $clr-dark-1;
			@include responsive($screen-md) {
				font-size: $font-lg;
			}
		}

		&__desc {
			margin-top: 0.25rem;
			font-size: $font-sm;
		}
	}

	&__close {
		@extend .flex-center, .btn, .btn__hover--shrink, .btn__hover--shrink;
		height: 2.5rem;
		width: 2.5rem;
		border-radius: 100%;
	}
}
</style>
