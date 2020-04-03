<template>
  <v-app id="app">
	  <v-content>
		  <router-view></router-view>
	  </v-content>
	  <Menu-Vue></Menu-Vue>
  </v-app>
</template>

<script>
import MenuVue from "./components/Menu";
import { mapState, mapGetters } from 'vuex';

export default {
  name: "App",
  data() {
    return {
    };
  },
	computed: {
		...mapState({
			isLogin: state => state.user.isLogin
		}),
		...mapGetters(["letMoney"])
	},
	created() {
		this.$store.commit("IS_LOGIN", true);
		console.log('log出来', this.letMoney);
		console.log('log出来', this.isLogin);
		this.$setCookie('xxxx', 123);
		console.log("document", document.body.clientHeight);
		this.canAlert();
	},
	methods: {
		async canAlert() {
			let clientHeight = 0,
				bodyClientHeight = document.body.clientHeight,
				elementClientHeight = document.documentElement.clientHeight;
			if(bodyClientHeight && elementClientHeight) {
				clientHeight = (bodyClientHeight < elementClientHeight) ? bodyClientHeight : elementClientHeight;
			} else {
				clientHeight = (bodyClientHeight > elementClientHeight) ? bodyClientHeight : elementClientHeight;
			}
			return this.$setCookie('clientHeight', clientHeight);
		}
	},
	components: {
		MenuVue
	}
};
</script>
<style scoped lang="scss">
.ly-main-cont {
  .minWidth {
    min-width: 1000px;
    height: 100%;
  }
}

</style>
