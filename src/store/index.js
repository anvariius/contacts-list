import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    apiUrl: 'https://randomuser.me/api/?results=200'
  },
  getters: {
    //вывод текущего типа отображения
    getViewType: () => {
      const viewType = window.localStorage.getItem('viewType');
      return viewType ? viewType : 'table';
    },
    //получение текущей авторизации
    checkAuth: () => {
      return window.localStorage.getItem('auth');
    }
  },
  mutations: {
    //запись авторизации
    setAuth(state, role) {
      window.localStorage.setItem('auth', role);
    },
    //удаление авторизации
    logOut() {
      window.localStorage.removeItem('auth');
    },
    //установка типа отображения
    setViewType(state, viewType) {
      window.localStorage.setItem('viewType', viewType);
    }
  }
})
