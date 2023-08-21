<template>
  <div class="card mb-4">
    <div class="card-header pb-0">
      <h6>Item List</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center justify-content-center mb-0">
          <thead>
            <tr>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">id</th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ">name</th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in list" :key="index">
              <td>
                <router-link :to="'/entry/'+item.entry_id">
                  <p class="text-sm font-weight-bold mb-0">{{ item.entry_id }}</p>
                </router-link>
              </td>
              <td>
                <h6 class="mb-0 text-sm">{{ item.name }}</h6>
              </td>
              <td>
                <div class=" px-8">
                  <span class="text-xs font-weight-bold">{{ item.description }}</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "projects-table",
  props: ['list'],
}
</script>
