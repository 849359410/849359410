<template>
	<div class="init AdministrationSite">
		<div class="AdministrationSite-content">
			<!-- 搜索区域 -->
			<div class="AdministrationSite-content_search">
	      <span class="select">
	        <select v-model="apiMethod" @change="initData">
	          <option value="0" selected="selected">全部</option>
	          <option
	            v-for="(item, key) in lotteryType"
	            :key="key"
	            :value="key"
	          >
	            {{ item }}
	          </option>
	        </select>
	      </span>
				<span class="AdministrationSite-content_time">
	        <v-menu
	          v-model="menu"
	          class="date-eTime"
	          :nudge-right="40"
	          transition="scale-transition"
	        >
	          <v-text-field
	            slot="activator"
	            clearable
	            height="30"
	            label="Solo"
	            single-line
	            locale="zh-cn"
	            placeholder="选择日期"
	            solo
	            v-model="time"
	          >
	          </v-text-field>
	          <v-date-picker
	            v-model="time"
	            no-title
	            class="mt-3"
	            locale="zh-cn"
	            min="2016-06-15"
	            :max="new Date().toISOString().substr(0, 10)"
	            @input="menu = false"
	          >
	          </v-date-picker>
	          </v-menu>
	        </span>
				<v-btn class="AdministrationSite-content_btn" color="info" @click="initData">查询</v-btn>
				<v-btn class="AdministrationSite-content_btn"
				       style="float: right"
				       color="info"
				       @click="canAdd()">
					添加
				</v-btn>
			</div>

			<table border="1">
				<thead>
				<tr>
					<th>站点编号</th>
					<th>站点名称</th>
					<th>站点别名</th>
					<th>站点域名</th>
					<th>添加时间</th>
					<th>修改时间</th>
					<th>站点状态</th>
					<th>操作</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for="(item, index) in list" :key="index">
					<td>{{ item.id }}</td>
					<td>{{ item.name }}</td>
					<td>{{ item.alias }}</td>
					<td>{{ item.domain }}</td>
					<td>{{ item.add_time | formatDate('yyyy-MM-dd h:m:s') }}</td>
					<td>{{ item.update_time | formatDate('yyyy-MM-dd h:m:s') }}</td>
					<td :class="item.status === 1 ? 'text-green' : 'text-red'">
						{{ status[item.status] }}
					</td>
					<td>
						<span class="text-blue" @click="canUpdate(item)">修改</span>&nbsp;
						<span class="text-blue" @click="delSite(item.id, 1)">启用</span>&nbsp;
						<span class="text-blue" @click="delSite(item.id, 2)">停用</span>&nbsp;
						<span class="text-red" @click="delSite(item.id, 3)">删除</span>
					</td>
				</tr>
				<tr v-if="!list.length">
					<td colspan="8">暂无数据</td>
				</tr>
				</tbody>
			</table>
		</div>

		<v-dialog
			v-model="dialog"
			:width="width"
			content-class="text-xs-center"
		>
			<v-card class="add_text">
				<form @submit.prevent="canSiteAdd">
					<v-card-title
						class="headline grey lighten-2 add_title"
						primary-title
					>
						{{ addAndUpdate === 1 ? '添加站点' : '修改站点' }}
					</v-card-title>

					<v-card-text>
						<v-text-field
							v-model="SiteUpdate.id"
							v-if="addAndUpdate === 2"
							:readonly="addAndUpdate === 2"
							label="站点编号"
							required
						>
							<template v-slot:prepend>
								<div style="width: 100px;margin-top: 4px">站点编号：</div>
							</template>
						</v-text-field>
						<v-text-field
							v-model="addAndUpdate === 1 ? SiteAdd.alias : SiteUpdate.alias"
							required
							:rules="aliasErrors"
							type="text"
							label="站点别名"
							:readonly="addAndUpdate === 2"
							required
						>
							<template v-slot:prepend>
								<div style="width: 100px;margin-top: 4px">站点别名：</div>
							</template>
						</v-text-field>
						<v-text-field
							v-model="SiteUpdate.key"
							v-if="addAndUpdate === 2"
							:readonly="addAndUpdate === 2"
							label="站点密钥"
							required
						>
							<template v-slot:prepend>
								<div style="width: 100px;margin-top: 4px">站点密钥：</div>
							</template>
						</v-text-field>
						<v-text-field
							v-model="addAndUpdate === 1 ? SiteAdd.name : SiteUpdate.name"
							label="站点名称"
							:rules="nameErrors"
							required
						>
							<template v-slot:prepend>
								<div style="width: 100px;margin-top: 4px">站点名称：</div>
							</template>
						</v-text-field>
						<v-text-field
							v-model="addAndUpdate === 1 ? SiteAdd.domain : SiteUpdate.domain"
							:rules="domainErrors"
							label="如 http://www.baidu.com"
							required
						>
							<template v-slot:prepend>
								<div style="width: 100px;margin-top: 4px">站点域名：</div>
							</template>
						</v-text-field>
					</v-card-text>

					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn
							color="primary"
							flat
							type="submit"
						>
							确认
						</v-btn>
					</v-card-actions>
				</form>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
export default {
  name: "AdministrationSite",
  data() {
    return {
      menu: false,
      list: [],
      apiMethod: 0,
	    addAndUpdate: 1,
      lotteryType: {
        1: "彩票【官】",
        2: "彩票【信】"
      },
      time: "",
	    dialog: false,
	    width: 500,
	    SiteAdd: {
		    alias: "",
		    name: "",
		    domain: ""
	    },
	    SiteUpdate: {
		    alias: "",
		    name: "",
		    domain: "",
		    key: "",
		    id: 0
	    },
	    aliasErrors: [
	    	v => !!v || "请输入站点别名"
	    ],
	    nameErrors: [
	    	v => !!v || "请输入站点名称"
	    ],
	    domainErrors: [
		    v => !!v || "请输入站点域名",
		    v => !!/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/.test(v) || "请输入正确的域名"
	    ],
	    status: {
				1: '启用',
				2: '停用',
				3: '删除'
	    },
	    siteId: 0
    };
  },
	created() {
  	// this.initData();
		this.$root.$emit('handleSuccess', '1234');
	},
  methods: {
    initData() {
	    this.$root.$emit('handleError', 'xxx');
	    this.$utils.api("API_POST_SITE_LIST").then(
		    (success) => {
			    this.$root.$emit("handleSuccess", success.message);
					this.list = success.data;
		    }, error => this.$root.$emit('handleError', error)
	    )
    },
	  canSiteAdd() {
    	if (this.addAndUpdate === 2) return this.canSiteUpdate();
    	this.$utils.api("API_POST_SITE_ADD", { params: this.SiteAdd }).then(
		    (success) => {
			    this.$root.$emit("handleSuccess", success.message);
		    	this.dialog = false;
		    }, error => this.$root.$emit('handleError', error)
	    )
	  },
	  canSiteUpdate(id) {
		  this.$utils.api("API_POST_SITE_UPDATE", { params: {
				  id: id || this.siteId,
				  name: this.addAndUpdate > 1 ? this.SiteUpdate.name : "",
				  domain: this.addAndUpdate > 1 ? this.SiteUpdate.domain : ""
			  } }).then(
			  (success) => {
				  this.$root.$emit("handleSuccess", success.message);
				  this.dialog = false;
				  this.initData();
			  }, error => this.$root.$emit('handleError', error)
		  )
	  },
	  delSite(id, status) {
		  this.$utils.api("API_POST_SITE_STATUS", { params: {
		  	  id: id,
				  status: status
			  } }).then(
			  (success) => {
				  this.$root.$emit("handleSuccess", success.message);
				  this.initData();
			  }, error => this.$root.$emit('handleError', error)
		  )
	  },
	  canAdd() {
		  this.dialog = true;
		  this.width = 500;
		  this.addAndUpdate = 1;
	  },
	  canUpdate(item) {
    	this.dialog = true;
    	this.width = 650;
    	this.addAndUpdate = 2;
    	this.SiteUpdate.alias = item.alias;
    	this.SiteUpdate.name = item.name;
    	this.SiteUpdate.domain = item.domain;
    	this.SiteUpdate.key = item.api_key;
    	this.SiteUpdate.id = item.id;
    	this.siteId = item.id;
	  }
  }
};
</script>

<style scoped lang="scss">
.AdministrationSite {
  @at-root #{&}-content {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    @at-root #{&}_search {
      select {
        font-family: sans-serif;
        font-size: 12px;
        line-height: 30px;
        margin: 7px 6px 12px 0;
        vertical-align: middle;
        background-color: white;
        border: 1px solid #ddd;
        height: 30px;
        padding: 0 10px;
        border-radius: 3px;
        width: 105px;
        outline: none;
      }
      select:hover {
        border: 1px solid #e94335;
      }
    }
    @at-root #{&}_time {
      .v-input {
        height: 36px;
      }
    }
    @at-root #{&}_btn {
      height: 30px;
      margin-bottom: 11px;
      min-width: 18px;
    }
  }
  table {
    width: 100%;
    table-layout: fixed;
    text-align: center;
    border: 1px solid #ddd;
    border-collapse: collapse !important;
    tbody {
      tr {
        font-size: 12px;
        color: grey;
        height: 24px;
        line-height: 24px;
	      span {
		      cursor: pointer;
	      }
      }
      tr:nth-child(2n) {
        background-color: #fafafa;
      }
    }
  }
	.text-blue {
		color: #337ab7;
	}
	.text-red {
		color: #ff5252;
	}
	.text-green {
		color: #008000;
	}
}
</style>
<style lang="scss">
	.text-xs-center {
		.v-input__slot {
			border: none !important;
			width: 100% !important;
		}
		.add_title {
			height: 44px;
			font-size: 20px!important;
			line-height: 44px!important;
			display: block!important;
			padding: 0!important;
			text-align: center!important;
		}
	}
</style>
