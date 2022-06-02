<template>
	<div class="search" :class="{ 'search--focus': focus }">
		<input
			type="text"
			:placeholder="placeholder"
			@input="(e) => searchHandler(e)"
			class="search__input"
			ref="input"
		/>
		<div class="search__icon">
			<SearchIcon class="icon" />
		</div>
	</div>
</template>

<script>
import { SearchIcon } from "@heroicons/vue/solid";

export default {
	name: "Search",
	components: {
		SearchIcon,
	},
	props: {
		searchHandler: Function,
		placeholder: String,
	},
	data() {
		return {
			focus: false,
		};
	},
	methods: {
		toggleFocus() {
			console.log("hello");
			this.focus = !this.focus;
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
.search {
	@extend .flex-center;
	width: 100%;
	padding: 0 1rem 0 0;
	background: $clr-neutral-1;
	border-radius: 0.25rem;

	@include transition-base(box-shadow);

	&--focus {
		box-shadow: $shadow;
	}

	&__input {
		flex: 1;
		background: none;
		border: none;
		padding: 1rem 0 1rem 1rem;

		&:focus {
			outline: none;
		}
	}
}
</style>
