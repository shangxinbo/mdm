// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import polyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import store from './vuex/store'
import router from './router'
import Ajax from './services/ajax'

import webSocktDebugSwf from 'assets/js/WebSocketMain.swf'

window.WEB_SOCKET_SWF_LOCATION = webSocktDebugSwf
window.WEB_SOCKET_DEBUG = true

import 'assets/js/swfobject'
import 'assets/js/base64'
import 'assets/js/web_socket'
import 'assets/js/json2'
import 'assets/js/mycomm.agent'

window.mycomm_agent = new window.MyCommAgent()

Vue.use(Ajax)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App style="height:100%"/>',
    components: { App }
})
