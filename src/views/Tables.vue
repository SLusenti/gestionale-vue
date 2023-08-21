<template>
  <div class="py-4 container-fluid">
    <div class="mt-4 row">
      <div class="input-group"  style="margin-bottom: 10px;">
        <dropdown :title="filterType">
          <div style="text-align: center;" @click="changefilterType('ID')">ID</div>
          <div style="text-align: center;" @click="changefilterType('Name')">Name</div>
        </dropdown>
        <input type="text" :value="filter" @keyup.enter="onEnterFilter" @input="updateFilter($event.target.value)" class="form-control" placeholder="Type here..." />
      </div>

      <div class="col-12">
        <projects-table :list="entries" />
      </div>
    </div>
    <argon-pagination>
      <argon-pagination-item prev />
      <argon-pagination-item @click="changePage(item)" v-for="(item, index) in pageRange" :key="index"
        :label="item.toString()" :active="pageCurrent == item" />
      <argon-pagination-item next />
    </argon-pagination>
  </div>
</template>

<script>

import Dropdown from "@/components/BaseDropdown.vue";
import ProjectsTable from "./components/ProjectsTable.vue";
import ArgonPagination from "@/components/ArgonPagination.vue";
import ArgonPaginationItem from "@/components/ArgonPaginationItem.vue";
export default {
  name: "tables",
  components: {
    ProjectsTable,
    ArgonPagination,
    ArgonPaginationItem,
    Dropdown,
  },
  data() {
    return {
      pageCurrent: 1,
      pageMax: 1,
      entries: [],
      filterType: "Name",
      filter: ""
    }
  },
  methods: {
    getEntries: async function () {
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json", "token": this.$store.state.user.token },
      };
      var url = ""
      if ( this.filter === "" ) {
        url = "http://localhost:8000/api-v1/entry?" + "page=" + this.pageCurrent.toString()
      } else {
        url = "http://localhost:8000/api-v1/entry?" 
              + "page=" + this.pageCurrent.toString() 
              + "&" + this.filterType.toLowerCase() + "="+ this.filter
      }
      //console.log(url)
     
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      // console.log(data);
      this.entries = data;
      this.$store.state.entries = data;
    },
    getPageMax: async function () {
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json", "token": this.$store.state.user.token },
      };
      var url = ""
      if ( this.filter === "" ) {
        url = 'http://localhost:8000/api-v1/pages'
      } else {
        url = 'http://localhost:8000/api-v1/pages?' + this.filterType.toLowerCase() + "="+ this.filter
      }
      
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      //console.log(data.pages);
      this.pageMax = data.pages;
    },
    changePage: function (page) {
      this.pageCurrent = page
      this.getEntries()
      //console.log(this.pageCurrent)
    },
    changefilterType: function(filterType) {
      this.filterType = filterType
    },
    updateFilter: function(e) {
      if (typeof e == typeof "string") {
        this.filter = e
        
      }
    },
    onEnterFilter: function() {
      this.getEntries()
      this.getPageMax()
    }
  },
  computed: {
    pageRange: function () {
      var ans = [];
      for (let i = 1; i <= this.pageMax; i++) {
        ans[i - 1] = i
      }
      return ans;
    }
  },
  mounted() {
    this.getPageMax()
    this.getEntries()
  }
};
</script>
