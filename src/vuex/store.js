
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const state = {
    showLayer: false,
    toast:'' //msg string
}

const mutations = {
    // 显示遮罩层
    SHOW_LAYER(state) {
        state.showLayer = true
    },
    // 隐藏遮罩层
    HIDE_LAYER(state) {
        state.showLayer = false
    },
    SHOW_TOAST(state,msg) {
        state.toast = msg
    },
    HIDE_TOAST(state) {
        state.toast = ''
    },
}

export default new Vuex.Store({
    strict:true,
    state,
    mutations
})