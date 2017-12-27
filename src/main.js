// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
//import '../static/css/theme-green/index.css';
import store from "./store/store.js";
import App from './App.vue';
import router from './router';
Vue.use(ElementUI)

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {
        App
    }

})
