import Vue from "vue";
import Toast from "./Toast";
function open(propsData) {
	console.log('propsData', propsData);
	const ToastComponent = Vue.extend(Toast),
		toastDom = document.createElement("div");
	toastDom.id = "toast";
	document.body.appendChild(toastDom);
	return new ToastComponent({
		el: "#toast",
		propsData
	});
}
export default {
	info(message) {
		const propsData = {
			snackbar: true,
			color: "info",
			mode: "multi-line",
			position: "top",
			timeout: 2000,
			texts: message
		};
		return open(propsData);
	},
	success(message) {
		const propsData = {
			snackbar: true,
			color: "success",
			mode: "multi-line",
			position: "top",
			timeout: 2000,
			texts: message
		};
		return open(propsData);
	},
	error(message) {
		const propsData = {
			snackbar: true,
			color: "error",
			mode: "multi-line",
			position: "top",
			timeout: 2000,
			texts: message
		};
		return open(propsData);
	}
};
//# sourceMappingURL=index.js.map
