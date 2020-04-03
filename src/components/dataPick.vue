<template>
	<span class="dataPick">
		<!-- 开始时间 -->
		<v-menu
			class="date-eTime"
			style="margin-left: 0"
			:nudge-right="40"
			transition="scale-transition">
			<v-text-field
				slot="activator"
				clearable
				height="30"
				label="Solo"
				single-line
				locale="zh-cn"
				placeholder="选择日期"
				solo
				v-model="time.sTime">
			</v-text-field>
			<v-date-picker
				v-model="time.sTime"
				no-title
				class="mt-3"
				locale="zh-cn"
				min="2016-06-15"
				:max="new Date().toISOString().substr(0, 10)"
			></v-date-picker>
		</v-menu>

		<span v-if="dataLast">~</span>

		<!-- 结束时间 -->
		<v-menu
			class="date-eTime"
			v-if="dataLast"
			:nudge-right="40"
			transition="scale-transition">
			<v-text-field
				slot="activator"
				clearable
				height="30"
				label="Solo"
				single-line
				locale="zh-cn"
				placeholder="选择日期"
				solo
				v-model="time.eTime">
			</v-text-field>
			<v-date-picker
				v-model="time.eTime"
				no-title
				class="mt-3"
				locale="zh-cn"
				min="2016-06-15"
				:max="new Date().toISOString().substr(0, 10)"
			></v-date-picker>
		</v-menu>
	</span>
</template>

<script>
	export default {
		name: "dataPick",
		data() {
			return {
				time: {
					sTime: "",
					eTime: ""
				}
			}
		},
		props: {
			// 是否显示后段时间选择
			dataLast: {
				type: Boolean,
				default: false
			}
		},
		watch: {
			time: {
				handler(n) {
					console.log("time", n);
					this.$parent.$emit("dataTime", n);
				},
				deep: true
			}
		}
	}
</script>

<style lang="scss">
	.dataPick {
		.v-input {
			height: 36px;
			.v-input__slot {
				box-shadow: none !important;
				border: 1px solid #ddd;
				width: 140px !important;
				font-size: 12px;
			}
		}
		.date-eTime {
			margin: 0 3px;
		}
	}
</style>
