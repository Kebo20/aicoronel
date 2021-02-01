import Vue from 'vue'
import Vuex from 'vuex'
import  createPersistedState  from  'vuex-persistedstate'

Vue.use(Vuex)

const state = {
  sidebarShow: 'responsive',
  sidebarMinimize: false,
  user: '',
  rol: '',
  token:''
}

const mutations = {
  toggleSidebarDesktop(state) {
    const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarOpened ? false : 'responsive'
  },
  toggleSidebarMobile(state) {
    const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarClosed ? true : 'responsive'
  },
  set(state, [variable, value]) {
    state[variable] = value
  },
  rol(state, rol) {
    state.rol = rol
  },
  user(state, user) {
    state.user = user
  }
  ,
  token(state, token) {
    state.token = token
  }
}

const getters = {
  rol: state => state.state.rol,
  user: state => state.state.user,
  token: state => state.state.token,



}


export default new Vuex.Store({
  state,
  mutations,
  getters,
  plugins: [createPersistedState()]
})