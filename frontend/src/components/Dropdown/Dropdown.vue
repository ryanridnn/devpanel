<template>
	<div v-if="opened" ref="dropdown" class="dropdown">
		<div class="dropdown__anchor">
			<div class="dropdown__body">
				<button
					v-for="(action, index) in actions"
					:key="index"
					class="dropdown__item relative"
					@click="onActionClick(action.handler)"
				>
					{{ action.text }}
				</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Dropdown",
	props: {
		opened: Boolean,
		close: Function,
		actions: Array,
	},
	methods: {
		handleOutsideClick(e) {
			if (this.$el && !this.$el.contains(e.target)) {
				document.removeEventListener("click", this.handleOutsideClick);
				this.close();
			}
		},
		async onActionClick(handler) {
			document.removeEventListener("click", this.handleOutsideClick);
			handler();
			this.close();
		},
	},
	watch: {
		opened() {
			if (this.opened)
				setTimeout(
					() =>
						document.addEventListener(
							"click",
							this.handleOutsideClick
						),
					5
				);
		},
	},
};
</script>

<style lang="scss" scoped>
.dropdown {
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	z-index: 3;

	&__anchor {
		height: 0;
		width: 0;
		border-left: 10px solid transparent;
		border-right: 10px solid transparent;

		border-bottom: 12px solid $clr-secondary;
	}

	&__body {
		display: flex;
		flex-direction: column;

		position: absolute;
		right: -0.25rem;
		bottom: 0;
		transform: translate(0, 98%);

		min-width: 200px;
		padding: 0.5rem 0.375rem;
		background: $clr-secondary;
		border-radius: 0.5rem;
		overflow: hidden;
	}

	&__item {
		width: 100%;
		text-align: left;
		padding: 1.125rem 0.625rem;
		background: $clr-secondary;
		border-radius: 0.25rem;
		color: $clr-neutral-1;
		@include transition-base(background);

		&::before {
			content: "";
			position: absolute;
			bottom: 0;
			left: 50%;
			transform: translateX(-50%);
			height: 1px;
			width: 95%;
			background: $clr-secondary-greyish;
		}

		&:last-child::before {
			display: none;
		}

		&:hover {
			background: $clr-secondary-greyish;
			color: $clr-dark-1;
		}

		&:focus {
			background: $clr-secondary-greyish;
			color: $clr-dark-1;
		}
	}
}
</style>
