<template>
  <v-navigation-drawer
    stateless
    class="menu"
    fixed
    value="true"
    ref="testDom"
  >
    <v-list class="menu--list">
      <v-list-group
        v-for="(admin, i) in admins"
        :value="menuDateActive === i"
        :key="i"
        @click=""
      >
        <template v-slot:activator>
          <v-list-tile>
            <v-list-tile-title class="menu--list_title">{{ admin.name }}</v-list-tile-title>
          </v-list-tile>
        </template>
        <v-list-tile
          class="leftxxx"
          v-for="(item, index) in admin.list"
          :key="index"
          @click="canRoute(item)"
        >
          <v-list-tile-title
	          v-text="item.name"
	          :style="listIndex === item.path ? 'color: red' : ''"
	          class="menu--list_title menu--list_can"
          >
          </v-list-tile-title>
        </v-list-tile>

      </v-list-group>
    </v-list>
  </v-navigation-drawer>

</template>

<script>
export default {
    name: "Menu",
  data() {
    return {
    	listIndex: "",
	    menuDateActive: 0,
      admins: [
        {
          name: "站点公告",
          list: [
            { name: "站点公告", id: 1, path: "AdministrationSite" },
            { name: "站点公告", id: 2, path: "AdministrationNotice" },
            { name: "站点公告", id: 3, path: "" },
          ]
        },
        {
          name: "站点公告",
          list: [
            { name: "站点公告", id: 4, path: "" },
            { name: "站点公告", id: 5, path: "" },
            { name: "站点公告", id: 6, path: "" },
          ]
        },
        {
          name: "站点公告",
          list: [
            { name: "站点公告", id: 7, path: "" },
            { name: "站点公告", id: 8, path: "" },
            { name: "站点公告", id: 9, path: "" },
          ]
        },
        {
          name: "站点公告",
          list: [
            { name: "站点公告", id: 10, path: "" },
            { name: "站点公告", id: 11, path: "" },
            { name: "站点公告", id: 12, path: "" },
          ]
        }
      ]
    }
  },
	watch: {
		$route: {
			handler(n) {
				this.listIndex = n.name;
			},
			deep: true
		}
	},
	created() {

		setTimeout(() => {console.log(this.$refs.testDom)}, 2000)
	},
	methods: {
		canRoute(item) {
			this.listIndex = item.path;
			this.$router.push({ name: item.path });
		}
	}
}
</script>

<style scoped lang="scss">
.menu {
	width: 240px !important;
  @at-root #{&}--list {
    width: 100%;
	  padding: 0!important;
    @at-root #{&}_title {
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      color: white;
    }
    @at-root #{&}_can {
      font-size: 14px;
      text-align: left;
      padding-left: 30%;
      cursor: pointer;
    }
  }
	.leftxxx {
		cursor: pointer !important;
	}
	.leftxxx:hover {
		background-color: transparent;
	}
}
</style>
