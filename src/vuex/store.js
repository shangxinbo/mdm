
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const state = {
    showLayer: false,
    toast:{
        msg:'',   //msg string
        during:1000
    },   
    changeMypassDialogShow:false,
    callInfo:null,
    showCallSet:false,
    dialing:false,
    tel_pre:null,
    filter_date:7,
    yunying_role:{
        1:false,
        2:false,
        3:false,
        4:false,
        5:false
    }
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
    SHOW_TOAST(state,msg,during) {
        state.toast = {
            msg:msg,
            during:during?during:2000
        }
    },
    HIDE_TOAST(state) {
        state.toast = {}
    },
    SHOW_CHANGEPASS(state) {
        state.changeMypassDialogShow = true
    },
    HIDE_CHANGEPASS(state) {
        state.changeMypassDialogShow = false
    },
    SHOW_CALL_SET(state){
        state.showCallSet = true
    },
    HIDE_CALL_SET(state){
        state.showCallSet = false
    },
    RESET_CALLINFO(state,opt){
        state.callInfo = opt
    },
    CHANGE_DIAL_STATUS(state,bool){
        state.dialing = bool
    },
    SET_TEL_PREFIX(state,str){
        state.tel_pre = str
    },
    SET_FILTER_DATE(state,val){
        state.filter_date = val
    },
    CHANGE_POWER(state,arr){
        if(arr.length>0){
            arr.forEach(el=>{
                state.yunying_role[el] = true
            })
        }
    }
}

export default new Vuex.Store({
    state,
    mutations
})