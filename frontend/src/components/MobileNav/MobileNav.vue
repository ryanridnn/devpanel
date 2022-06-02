<template>
	<div class="mobile-nav">
		<button class="mobile-nav__toggler" @click="toggleMenu">
			<MenuAlt1Icon class="icon" />
		</button>
		<div class="mobile-nav__route">
			<span class="mobile-nav__path">{{ routePath }}</span>
			<span v-if="routeTagParam" class="mobile-nav__tag"
				>/{{ routeTagName }}</span
			>
		</div>
		<SlidingNav
			class="mobile-nav__menu"
			:class="{ 'mobile-nav__menu--active': menuOpened }"
			:menuOpened="menuOpened"
			:toggleMenu="toggleMenu"
			:routePath="routePath"
			:routeTagParam="routeTagParam"
		/>
	</div>
</template>

<script>
import SlidingNav from "./SlidingNav.vue";

import { MenuAlt1Icon } from "@heroicons/vue/solid";

export default {
	name: "MobileNav",
	components: {
		MenuAlt1Icon,
		SlidingNav,
	},
	data() {
		return {
			menuOpened: false,
		};
	},
	methods: {
		toggleMenu() {
			this.menuOpened = !this.menuOpened;
		},
	},
	computed: {
		routePath() {
			let path = this.$route.path.split("/")[1];
			return path;
		},
		routeTagParam() {
			let params = this.$route.params.tag;
			return params;
		},
		routeTagName() {
			return (
				this.$store.state.tags[this.routePath].find(
					(tag) => tag._id === this.routeTagParam
				)?.name || null
			);
		},
	},
	watch: {
		$route() {
			this.menuOpened = false;
		},
	},
};
</script>

<style lang="scss" scoped>
.mobile-nav {
	@extend .flex-y-center;
	padding-top: 1rem;
	gap: 0.75rem;

	@include responsive($screen-md) {
		display: none;
	}

	&__toggler {
		@extend .btn, .btn__hover--shrink;

		display: flex;
		justify-content: center;
		align-items: center;
		height: 2.25rem;
		width: 2.25rem;
		background: $clr-primary;
		color: $clr-on-primary;
		border-radius: 0.25rem;
	}

	&__path {
		font-size: $font-lg;
		font-weight: 600;
		text-transform: capitalize;
	}

	&__tag {
		@extend .mobile-nav__path;

		margin-left: 0.5rem;
		font-size: $font-sm;
		color: $clr-dark-2;
	}

	&__menu {
		@include transition(transform, 0.35s, ease);

		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: $clr-primary;
		color: $clr-on-primary;
		transform: translate(-100%);

		// transition: transform 0.4s ease;

		&--active {
			transform: translate(0);
		}
	}
}
</style>
