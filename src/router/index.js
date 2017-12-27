import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login/Login.vue'
import Reg from '../components/Reg.vue'
import Info from '../components/Info/Info.vue'
import User from '../components/Info/User/User.vue'
import Orderform from '../components/info/Orderform/Orderform.vue'
import Shops from '../components/info/Shops/Shops.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
        path: '/',
        name: 'Login',
        component: Login
    }, {
        path: '/reg',
        name: 'Reg',
        component: Reg
    }, {
        path: '/info',
        name: 'Info',
        component: Info,
        children: [{
            path: 'user',
            name: 'User',
            component: User,
        },{
            path: 'orderform',
            name: 'Orderform',
            component: Orderform,
        },{
            path: 'shops',
            name: 'Shops',
            component: Shops,
        }]
    }]
})
