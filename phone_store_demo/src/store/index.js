import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        host: 'http://l92.168.0.102:8181',
        //定义规格
        specsId: '',
        //定义数量
        quantity: ''
    },
    mutations: {},
    actions: {},
    modules: {}
})
