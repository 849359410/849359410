<template>
  <div class="init AdministrationNotice" >
    <div class="AdministrationNotice-content" :style="`height: ${clientHeight}px`">

      <!-- 搜索区域 -->

      <div class="AdministrationNotice-content_search">
        <span class="select">
          <select v-model="apiMethod">
            <option value="0" selected="selected">全部</option>
            <option v-for="(item, key) in lotteryType"
                    :key="key"
                    :value="key">
              {{item}}
            </option>
          </select>
        </span>
	      <input type="text" style="border: 1px solid;" @blur="checkUserName" v-model="Uds">
        <span class="AdministrationNotice-content_time">
	        <!-- 时间选择组件 -->
	        登录时间：
					<data-Pick :data-last="true"></data-Pick>
        </span>

        <v-btn class="AdministrationNotice-content_btn" color="info">查询</v-btn>
      </div>

	    <div :style="`height: ${Height}px`" style="overflow-y: scroll">
		    <v-card>
			    <v-card-title>
				    会员列表
				    <v-spacer></v-spacer>
				    <v-text-field
					    v-model="search"
					    append-icon="search"
					    label="搜索"
					    single-line
					    hide-details
				    ></v-text-field>
			    </v-card-title>
			    <v-data-table
				    :headers="headers"
				    :items="list"
				    :pagination.sync="pagination"
				    :search="search"
				    hide-actions
				    must-sort
				    class="elevation-1"
			    >
				    <template v-slot:items="props">
					    <td class="text-xs-center">{{ props.item.name }}</td>
					    <td class="text-xs-center">{{ props.item.id }}</td>
					    <td class="text-xs-center">{{ props.item.siteId }}</td>
					    <td class="text-xs-center">{{ props.item.tc }}</td>
					    <td class="text-xs-center">{{ props.item.mc }}</td>
					    <td class="text-xs-center">{{ props.item.zym }}</td>
					    <td class="text-xs-center">{{ props.item.zd }}</td>
					    <td class="text-xs-center">{{ props.item.ed }}</td>
				    </template>
				    <template v-slot:no-data>
					    <td class="text-xs-center" colspan="8">暂无数据</td>
				    </template>
				    <template v-slot:no-results>
					    <v-alert :value="true" color="error" icon="warning">
						    没找到 "{{ search }}" .
					    </v-alert>
				    </template>
			    </v-data-table>
		    </v-card>

	    </div>
    </div>
	  <!--<pageIndex :pageLength="pageLength"></pageIndex>-->
	  <div class="text-xs-center pt-2">
		  <v-pagination v-model="pagination.page" :length="total"></v-pagination>
	  </div>
  </div>
</template>

<script>
import dataPick from "../../../components/dataPick";
export default {
  name: "AdministrationNotice",
  data() {
    return {
      list: [
        { id: 1, name: "站点公告", siteId: "站点公告", tc: "站点公告", mc: "聊天平台", zym: "baidu.com", zd: "站点线路", ed: "站点公告" },
        { id: 2, name: "站点公告", siteId: "站点公告", tc: "站点公告", mc: "聊天平台", zym: "baidu.com", zd: "站点线路", ed: "站点公告" },
        { id: 3, name: "站点公告", siteId: "站点公告", tc: "站点公告", mc: "聊天平台", zym: "baidu.com", zd: "站点线路", ed: "站点公告" },
        { id: 4, name: "站点公告", siteId: "站点公告", tc: "站点公告", mc: "聊天平台", zym: "baidu.com", zd: "站点线路", ed: "站点公告" },
        { id: 5, name: "站点公告", siteId: "站点公告", tc: "站点公告", mc: "聊天平台", zym: "baidu.com", zd: "站点线路", ed: "站点公告" },
        { id: 6, name: "站点公告", siteId: "站点公告", tc: "站点公告", mc: "聊天平台", zym: "baidu.com", zd: "站点线路", ed: "站点公告" },
        { id: 7, name: "站点公告", siteId: "站点公告", tc: "站点公告", mc: "聊天平台", zym: "baidu.com", zd: "站点线路", ed: "站点公告" },
        { id: 8, name: "站点公告", siteId: "站点公告", tc: "站点公告", mc: "聊天平台", zym: "baidu.com", zd: "站点线路", ed: "站点公告" },
        { id: 9, name: "站点公告", siteId: "站点公告", tc: "站点公告", mc: "聊天平台", zym: "baidu.com", zd: "站点线路", ed: "站点公告" },
        { id: 10, name: "站点公告", siteId: "站点公告", tc: "站点公告", mc: "聊天平台", zym: "baidu.com", zd: "站点线路", ed: "站点公告" },
        { id: 11, name: "站点公告", siteId: "站点公告", tc: "站点公告", mc: "聊天平台", zym: "baidu.com", zd: "站点线路", ed: "站点公告" },
        { id: 12, name: "站点公告", siteId: "站点公告", tc: "站点公告", mc: "聊天平台", zym: "baidu.com", zd: "站点线路", ed: "站点公告" },
        { id: 13, name: "站点公告", siteId: "站点公告", tc: "站点公告", mc: "聊天平台", zym: "baidu.com", zd: "站点线路", ed: "站点公告" },
        { id: 14, name: "站点公告", siteId: "站点公告", tc: "站点公告", mc: "聊天平台", zym: "baidu.com", zd: "站点线路", ed: "站点公告" },
        { id: 15, name: "站点公告", siteId: "站点公告", tc: "站点公告", mc: "聊天平台", zym: "baidu.com", zd: "站点线路", ed: "站点公告" },
        { id: 16, name: "站点公告", siteId: "站点公告", tc: "站点公告", mc: "聊天平台", zym: "baidu.com", zd: "站点线路", ed: "站点公告" },
        { id: 17, name: "站点公告", siteId: "站点公告", tc: "站点公告", mc: "聊天平台", zym: "baidu.com", zd: "站点线路", ed: "站点公告" },
        { id: 18, name: "站点公告", siteId: "站点公告", tc: "站点公告", mc: "聊天平台", zym: "baidu.com", zd: "站点线路", ed: "站点公告" },
        { id: 19, name: "站点公告", siteId: "站点公告", tc: "站点公告", mc: "聊天平台", zym: "baidu.com", zd: "站点线路", ed: "站点公告" },
        { id: 20, name: "站点公告", siteId: "站点公告", tc: "站点公告", mc: "聊天平台", zym: "baidu.com", zd: "站点线路", ed: "站点公告" },
        { id: 21, name: "站点公告", siteId: "站点公告", tc: "站点公告", mc: "聊天平台", zym: "baidu.com", zd: "站点线路", ed: "站点公告" },
        { id: 22, name: "站点公告", siteId: "站点公告", tc: "站点公告", mc: "聊天平台", zym: "baidu.com", zd: "站点线路", ed: "站点公告" },
        { id: 23, name: "站点公告", siteId: "站点公告", tc: "站点公告", mc: "聊天平台", zym: "baidu.com", zd: "站点线路", ed: "站点公告" },
        { id: 24, name: "站点公告", siteId: "站点公告", tc: "站点公告", mc: "聊天平台", zym: "baidu.com", zd: "站点线路", ed: "站点公告" },
        { id: 25, name: "站点公告", siteId: "站点公告", tc: "站点公告", mc: "聊天平台", zym: "baidu.com", zd: "站点线路", ed: "站点公告" },
        { id: 26, name: "站点公告", siteId: "站点公告", tc: "站点公告", mc: "聊天平台", zym: "baidu.com", zd: "站点线路", ed: "站点公告" },
        { id: 27, name: "站点公告", siteId: "站点公告", tc: "站点公告", mc: "聊天平台", zym: "baidu.com", zd: "站点线路", ed: "站点公告" },
        { id: 28, name: "站点公告", siteId: "站点公告", tc: "站点公告", mc: "聊天平台", zym: "baidu.com", zd: "站点线路", ed: "站点公告" },
        { id: 29, name: "站点公告", siteId: "站点公告", tc: "站点公告", mc: "聊天平台", zym: "baidu.com", zd: "站点线路", ed: "站点公告" },
        { id: 30, name: "站点公告", siteId: "站点公告", tc: "站点公告", mc: "聊天平台", zym: "baidu.com", zd: "站点线路", ed: "站点公告" },
        { id: 31, name: "站点公告", siteId: "站点公告", tc: "站点公告", mc: "聊天平台", zym: "baidu.com", zd: "站点线路", ed: "站点公告" },
        { id: 32, name: "站点公告", siteId: "站点公告", tc: "站点公告", mc: "聊天平台", zym: "baidu.com", zd: "站点线路", ed: "站点公告" },
        { id: 33, name: "站点公告", siteId: "站点公告", tc: "站点公告", mc: "聊天平台", zym: "baidu.com", zd: "站点线路", ed: "站点公告" },
        { id: 34, name: "站点公告", siteId: "站点公告", tc: "站点公告", mc: "聊天平台", zym: "baidu.com", zd: "站点线路", ed: "站点公告" },
        { id: 35, name: "站点公告", siteId: "站点公告", tc: "站点公告", mc: "聊天平台", zym: "baidu.com", zd: "站点线路", ed: "站点公告" },
        { id: 36, name: "站点公告", siteId: "站点公告", tc: "站点公告", mc: "聊天平台", zym: "baidu.com", zd: "站点线路", ed: "站点公告" },
        { id: 37, name: "站点公告", siteId: "站点公告", tc: "站点公告", mc: "聊天平台", zym: "baidu.com", zd: "站点线路", ed: "站点公告" },
        { id: 38, name: "站点公告", siteId: "站点公告", tc: "站点公告", mc: "聊天平台", zym: "baidu.com", zd: "站点线路", ed: "站点公告" },
        { id: 39, name: "站点公告", siteId: "站点公告", tc: "站点公告", mc: "聊天平台", zym: "baidu.com", zd: "站点线路", ed: "站点公告" },
        { id: 40, name: "站点公告", siteId: "站点公告", tc: "站点公告", mc: "聊天平台", zym: "baidu.com", zd: "站点线路", ed: "站点公告" },
        { id: 41, name: "站点公告", siteId: "站点公告", tc: "站点公告", mc: "聊天平台", zym: "baidu.com", zd: "站点线路", ed: "站点公告" },
        { id: 42, name: "站点公告", siteId: "站点公告", tc: "站点公告", mc: "聊天平台", zym: "baidu.com", zd: "站点线路", ed: "站点公告" }
      ],
	    params: {
		    account: "",
		    name: "",
		    Sex: "",
		    site_id: "",
		    limit: 20,
		    page: 1
	    },
	    sex: {
      	0: "隐藏",
      	1: "男",
      	2: "女"
	    },
      apiMethod: 0,
      lotteryType: {
        1: '彩票【官】',
        2: '彩票【信】'
      },
	    pageLength: 1,
	    clientHeight: 0,
	    Height: 0,
	    pagination: {
		    descending: false,
		    page: 1,          // 页数
		    rowsPerPage: 20,  // 每页显示条数
		    sortBy: null,
		    totalItems: 42,   // 总条数
	    },
	    selected: [],
	    headers: [
		    { text: '站点公告', align: 'center', sortable: false, value: 'id' },
		    { text: '站点公告', align: 'center', sortable: false, value: 'name' },
		    { text: '站点公告', align: 'center', sortable: false, value: 'siteId' },
		    { text: '站点公告', align: 'center', sortable: false, value: 'tc' },
		    { text: '站点公告', align: 'center', sortable: false, value: 'mc' },
		    { text: '站点公告', align: 'center', sortable: false, value: 'zym' },
		    { text: '站点公告', align: 'center', sortable: false, value: 'zd' },
		    { text: '站点公告', align: 'center', sortable: false, value: 'ed' }
	    ],
	    search: '',
	    Uds: ''
    }
  },
	watch: {
		params: {
			handler(n) {
				console.log("params", n);
			},
			deep: true
		}
	},
	components: {dataPick},
	computed: {
		total () {
			if (this.pagination.rowsPerPage == null ||
				this.pagination.totalItems == null
			) return 0;
			return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage);
		}
	},
	mounted() {
  	this.$on("pages", (n) => {
  		console.log("返回的页数", n);
	  });
  	this.$on("dataTime", (n) => {
  		console.log("返回的时间", n);
	  });
	},
	created() {
  	setTimeout(() => {
  		this.pageLength = 10;
	  }, 1000);
		this.initData();
		// alert(this.$getCookie("clientHeight"));
		console.log('浏览器窗口高度', this.$getCookie("clientHeight"));
		this.clientHeight = Number(this.$getCookie("clientHeight")) - 72;
		this.Height = this.clientHeight - 69;
	},
	methods: {
		checkUserName() {
			console.log(this.Uds)
			console.log(/^\d{1-9}$|^\d+(\d+)?[-]?(\d)?\d+$|(^\d$)/.test(this.Uds));
		},
		initData() {
		  this.$utils.api("API_POST_USER_REGISTER").then(
			  (success) => {
				  // this.list = success.data;
			  }, error => this.$root.$emit('handleError', error)
		  )
	  }
	}
}
</script>

<style scoped lang="scss">
  .AdministrationNotice {
    @at-root #{&}-content {
	    overflow: hidden;
      border: 1px solid #ccc;
      border-radius: 5px;
      padding: 0 0 5px 0;
      @at-root #{&}_search {
	      padding-left: 10px;
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
      @at-root #{&}_btn {
        height: 30px;
        margin-bottom: 11px;
        min-width: 18px;
      }
    }
  }
</style>
