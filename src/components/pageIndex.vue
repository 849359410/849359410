<template>
	<div class="text-xs-center" style="margin-top: 2px">
		<v-pagination
			v-model="page"
			:length="pageLength"
			:total-visible="7"
		></v-pagination>
	</div>
</template>

<script>
export default {
	name: "pageIndex",
	props: {
		pageLength: {
			type: Number,
			default: 1
		}
	},
	data() {
		return {
			page: 1
		}
	},
	watch: {
		pageLength: {
			handler(n) {
				console.log("xn", n);
			},
			deep: true
		},
		page: {
			handler(n) {
				console.log("mn", n);
				this.$parent.$emit("pages", n);
			},
			deep: true
		}
	}
}
</script>

<style scoped>

</style>
