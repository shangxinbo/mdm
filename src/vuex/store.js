
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const state = {
    showLayer: false
}

const mutations = {
    //全屏
    PAGE_NO_SCROLL(state) {
        state.wholePage = true
    },
    PAGE_WIDTH_SCROLL(state) {
        state.wholePage = false
    },
    // 显示遮罩层
    SHOW_LAYER(state) {
        state.showLayer = true
    },
    // 隐藏遮罩层
    HIDE_LAYER(state) {
        state.showLayer = false
    },
    // 关闭所有弹窗
    CLOSE_DIALOG(state) {
        state.dialog.crowdInit = false
        state.dialog.crowdCreate = false
        state.dialog.crowdSelect = false
        state.showLayer = false
    }
}

export default new Vuex.Store({
    strict:true,
    state,
    mutations
})