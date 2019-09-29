import Vue from 'vue/dist/vue.esm'
import ElementUI from 'element-ui';
import RoulletHeader from './components/header.vue'
import Roullet from './components/roullet.vue'

Vue.component('roullet-header', RoulletHeader)
Vue.component('roullet', Roullet)
Vue.use(ElementUI);

new Vue({
  el: '#app'
})
