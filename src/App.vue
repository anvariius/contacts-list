<template>
  <div id="app">
    <auth-view v-if="!auth" @setAuth="setAuth"/>
    <main-view v-else @logOut="logOut" :auth="auth"/>
  </div>
</template>

<style>
@import url('assets/css/reset.css');
@import url('assets/css/style.css');
</style>
<script>
import MainView from "@/views/MainView";
import AuthView from "@/views/AuthView";
export default {
  components: {AuthView, MainView},
  data() {
    return {
      //получаем роль авторизации
      auth: this.$store.getters.checkAuth
    }
  },
  methods: {
    //устанавливаем авторизацию в store
    setAuth(role) {
      this.$store.commit('setAuth', role);
      this.auth = role;
    },
    //удаляем авторизацию из store
    logOut() {
      this.$store.commit('logOut');
      this.auth = null;
    }
  }
}
</script>