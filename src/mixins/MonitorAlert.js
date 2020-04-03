export default {
	mounted() {
		// 监听成功信息
		this.$on("handleSuccess", successMsg => this.handleToastEvent(successMsg, "success"));
		// 监听错误信息
		this.$on("handleError", (errorMsg, typeStatus = 0) => {
			const errorType = typeof errorMsg;
			switch (errorType) {
				case "string":
					this.handleToastEvent(errorMsg, "error");
					break;
				case "object":
					if (errorMsg.hasOwnProperty("Code")) {
						this.handleToastEvent(errorMsg, "error", typeStatus);
					}
					if (errorMsg.hasOwnProperty("status")) {
						console.warn(errorMsg.message);
					}
					break;
				default:
			}
		});
	},
	methods: {
		// 处理烤面包提示
		handleToastEvent(message, type = "info", typeStatus) {
			if (!message || document.visibilityState !== "visible") return;
			if (
				typeof message === "object" &&
				Object.prototype.hasOwnProperty.call(message, "Code")
			) {
				if (typeStatus === 1) this.$toast[type](message.data);
				else this.$toast[type](message.message);
			} else {
				this.$toast[type](message);
			}
		}
	}
}
