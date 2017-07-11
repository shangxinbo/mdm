import Vue from 'vue'
import tpl from './tpl'

let Confirm = Vue.extend(tpl)

Vue.prototype.$confirm = (msg, callback) => {

    let confirm = new Confirm({
        el: document.createElement('div')
    })

    confirm.show(msg, () => {
        if (callback) callback()
    })

    document.body.appendChild(confirm.$el)
}