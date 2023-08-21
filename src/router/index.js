import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Tables from "../views/Tables.vue";
import Profile from "../views/Profile.vue";
import Signin from "../views/Signin.vue";
import store from "../store/index"
import Entry from "../views/Entry.vue"

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/signin",
  },
  {
    path: "/dashboard-default",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/tables",
    name: "Tables",
    component: Tables,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/entry/:id",
    name: "Entry",
    component: Entry
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

router.beforeEach((to, from, next)=>{
  //console.log(store.state.user.token)
  if ( to.path !== '/signin' && store.state.user.token === "" ){
    next({
      path: '/signin',
      replace: true
    })
  } else {
    next();
  }
})


export default router;
