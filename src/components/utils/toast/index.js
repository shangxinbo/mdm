import Vue from 'vue'
import tpl from './tpl'

let Toast = Vue.extend(tpl)

Vue.prototype.$toast = (msg, callback, time) => {

    let toast = new Toast({
        el: document.createElement('div')
    })

    let t = parseInt(time) ? parseInt(time) : 2000

    toast.show(msg)

    setTimeout(() => {
        toast.close()
        if (callback) callback()
    }, t)

    document.body.appendChild(toast.$el)
}