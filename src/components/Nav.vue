<template>
	<v-toolbar dark color="primary" class="Nav">
		<v-toolbar-side-icon></v-toolbar-side-icon>

		<v-toolbar-title class="Nav--title">{{ title }}</v-toolbar-title>

		<v-spacer>
			<div class="Nav--center" v-for="(i, val) in list" :key="val">
				<v-menu offset-y>
					<template v-slot:activator="{ on }">
						<v-btn
							color="success"
							dark
							v-on="on"
							style="width: 100px"
						>
							{{ i.name }}
						</v-btn>
					</template>
					<v-list>
						<v-list-tile
							v-for="(item, index) in i.list"
							:key="index"
							@click="canRoute(item.path, item.name)"
						>
							<v-list-tile-title style="font-size: 12px">{{ item.name }}</v-list-tile-title>
						</v-list-tile>
					</v-list>
				</v-menu>
			</div>
		</v-spacer>
		<v-btn icon>
			<v-icon>search</v-icon>
		</v-btn>

		<v-btn icon>
			<v-icon>apps</v-icon>
		</v-btn>

		<v-btn icon>
			<v-icon>refresh</v-icon>
		</v-btn>

		<v-btn icon>
			<v-icon>more_vert</v-icon>
		</v-btn>
	</v-toolbar>
</template>

<script>
  export default {
    name: "Nav",
    data() {
      return {
      	title: "站点管理1",
        list: [
          {
          	name: "站点管理",
            list: [
              { name: "站点管理1", path: "AdministrationSite" },
              { name: "公告管理", path: "AdministrationNotice" },
              { name: "维护管理" },
              { name: "套餐管理" },
              { name: "APP管理" }
            ]
          },
          {
	          name: "账号管理",
            list: [
              { name: "站点管理2" },
              { name: "公告管理" },
              { name: "维护管理" },
              { name: "套餐管理" },
              { name: "APP管理" }
            ]
          },
          {
	          name: "公告管理",
            list: [
              { name: "站点管理3" },
              { name: "公告管理" },
              { name: "维护管理" },
              { name: "套餐管理" },
              { name: "APP管理" }
            ]
          },
          {
	          name: "权限管理",
            list: [
              { name: "站点管理4" },
              { name: "公告管理" },
              { name: "维护管理" },
              { name: "套餐管理" },
              { name: "APP管理" }
            ]
          },
          {
	          name: "权限管理",
            list: [
              { name: "站点管理5" },
              { name: "公告管理" },
              { name: "维护管理" },
              { name: "套餐管理" },
              { name: "APP管理" }
            ]
          },
          {
	          name: "站点管理",
            list: [
              { name: "站点管理6" },
              { name: "公告管理" },
              { name: "维护管理" },
              { name: "套餐管理" },
              { name: "APP管理" }
            ]
          }
        ],
        left: 244,
        siteIndex: 0,
        listIndex: 0
      }
    },
    created() {
    },
    methods: {
	    canRoute(path, name) {
	    	console.log("path", path);
	    	this.$router.push({ name: path });
	    	this.title = name;
	    }
    }
  }
</script>

<style scoped lang="scss">
.Nav {
	@at-root #{&}--title {
		width: 160px;
	}
	@at-root #{&}--center {
		display: inline-block;
	}
}
</style>
