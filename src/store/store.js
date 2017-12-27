import Vue from 'vue'
import Vuex from 'vuex'

import user from '../components/info/User/store.js'

Vue.use(Vuex)
Vue.config.productionTip = false
export default new Vuex.Store({
    modules: {
        user
    }
})
