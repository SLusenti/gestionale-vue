<template>
  <div class="py-4 container-fluid">
    <h1>{{ entry.name }}</h1>
    <p>{{ entry.description }}</p>
    <div v-if="links !== null">
      <carousel :items-to-show="1.5">
        <slide v-for="(item, index) in links" :key="index">
          <img :src="item" style="max-width:200px;max-height: 200px;" />
        </slide>

        <template #addons>
          <navigation />
          <pagination />
        </template>
      </carousel>
    </div>
    <div class="card mb-4" style="margin-top: 30px;">
      <div class="table-responsive p-0">
        <table class="table align-items-center justify-content-center mb-0">
          <tbody>
            <tr v-for="(item, index) in entry.spec" :key="index">
              <td>
                <p class="text-sm font-weight-bold mb-0">{{ index }}</p>
              </td>
              <td>
                <h6 class="mb-0 text-sm">{{ item }}</h6>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
export default {
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  data: function () {
    return {
      links: null
    }
  },
  name: "entry",
  computed: {
    entry: function () {
      //console.log(this.$route.params.id,this.$store.state.entries.filter((entry) => entry.entry_id === this.$route.params.id)[0]);
      //var entry = this.$store.state.entries.filter
      return this.$store.state.entries.filter((entry) => entry.entry_id === this.$route.params.id)[0]
    }
  },
  methods: {
    getImage: async function (id) {
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json", "token": this.$store.state.user.token },
      };
      var url = "http://localhost:8000/images/" + id
      //console.log(url)

      const response = await fetch(url, requestOptions);
      const data = await response.blob()
      //console.log(URL.createObjectURL(data));
      return URL.createObjectURL(data);
    },
  },
  mounted() {
    var links = []
    for (var v in this.entry.images) {
      this.getImage(this.entry.images[v]).then(
        function (c) {
          //console.log("ok",c)
          links.push(c)
        }
      )
    }
    //console.log(links)
    this.links = links
  }
}
</script>