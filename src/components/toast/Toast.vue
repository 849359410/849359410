<template>
	<v-snackbar
		v-model="snackbar"
		:color="color"
		:top="position === 'top'"
		:right="position === 'right'"
		:bottom="position === 'bottom'"
		:left="position === 'left'"
		:multi-line="mode === 'multi-line'"
		:timeout="timeout"
		:vertical="mode === 'vertical'"
	>
		{{ texts }}
	</v-snackbar>
</template>

<script>
import { VSnackbar } from "vuetify";

export default {
	name: "Toast",
	comments: { VSnackbar },
	props: {
		toast: {
			type: Object,
			default() {
				return {};
			}
		},
		snackbar: {
			type: Boolean,
			default: false
		},
		color: {
			type: String,
			default: "info"
		},
		mode: {
			type: String,
			default: "multi-line"
		},
		position: {
			type: String,
			default: "top"
		},
		timeout: {
			type: Number,
			default: 2000
		},
		texts: {
			type: String,
			default: ""
		}
	}
};
</script>
<style scoped lang="scss">
.v-snack--top {
	padding-top: 100px;
}
</style>
