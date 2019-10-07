import Vue from 'vue/dist/vue.esm'
import ElementUI from 'element-ui';
import RoulletHeader from './components/header.vue'
import Roullet from './components/roullet.vue'
import RoulletFooter from './components/footer.vue'

Vue.component('roullet-header', RoulletHeader)
Vue.component('roullet', Roullet)
Vue.component('roullet-footer', RoulletFooter)
Vue.use(ElementUI);

new Vue({
  el: '#app'
})
