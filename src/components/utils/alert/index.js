import Vue from 'vue'
import tpl from './tpl'

let Alert = Vue.extend(tpl)

Vue.prototype.$alert = (msg, callback) => {

    let alert = new Alert({
        el: document.createElement('div')
    })

    alert.show(msg,()=>{
        if(callback) callback()
    })

    document.body.appendChild(alert.$el)
}