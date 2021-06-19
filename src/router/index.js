import Vue from 'vue'
import VueRouter from 'vue-router'


// Views
import Login from '../views/account/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import AdminRegistration from '../views/AdminRegistration.vue'
import DriverRegistration from '../views/DriverRegistration.vue'
import DriverVerification from '../views/DriverVerification.vue'
import RemitRider from '../views/RemitRider.vue'
import AllRemit from '../views/Remits.vue'
import RiderManagement from '../views/RiderManagement.vue'

// Components
import Navbar from '../components/header/Navbar.vue'
import Sidebar from '../components/navigations/Sidebar.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Login
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/loading',
    name: 'Loading',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Loading.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    components: {
      default: Dashboard,
      navbar: Navbar,
      sidebar: Sidebar
    }
  },
  {
    path: '/admin-registration',
    name: 'AdminRegsitration',
    components: {
      default: AdminRegistration,
      navbar: Navbar,
      sidebar: Sidebar
    }
  },
  {
    path: '/driver-registration',
    name: 'DriverRegsitration',
    components: {
      default: DriverRegistration,
      navbar: Navbar,
      sidebar: Sidebar
    }
  },
  {
    path: '/driver-verification',
    name: 'DriverVerification',
    components: {
      default: DriverVerification,
      navbar: Navbar,
      sidebar: Sidebar
    }
  },
  {
    path: '/remit-rider',
    name: 'RemitRider',
    components: {
      default: RemitRider,
      navbar: Navbar,
      sidebar: Sidebar
    }
  },
  {
    path: '/remits',
    name: 'RemitRider',
    components: {
      default: AllRemit,
      navbar: Navbar,
      sidebar: Sidebar
    }
  },
  {
    path: '/rider-management',
    name: 'RiderManagement',
    components: {
      default: RiderManagement,
      navbar: Navbar,
      sidebar: Sidebar
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
