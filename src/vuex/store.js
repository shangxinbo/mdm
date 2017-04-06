
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const state = {
    showLayer: false,
    toast:'',    //msg string
    changeMypassDialogShow:false
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
    // 显示遮罩层
    SHOW_CHANGEPASS(state) {
        state.changeMypassDialogShow = true
    },
    // 隐藏遮罩层
    HIDE_CHANGEPASS(state) {
        state.changeMypassDialogShow = false
    },
}

export default new Vuex.Store({
    strict:true,
    state,
    mutations
})