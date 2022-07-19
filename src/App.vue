<template>
  <v-app>
    <v-app-bar
      app
    >
      <v-toolbar-title class="headline text-uppercase">
        <span>Issue</span>
        <span class="font-weight-light">Tracker</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn
      @click="logout" 
      v-if="loggedin"
      target="_blank"
      text
      >Logout
      <span class="mr-2"></span>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
  loggedin: false,
  }),
  created() {
    if(localStorage.getItem('token')) {
      this.loggedin = true
    }
  },
  computed: {
    loggedIn() {
      return this.$store.getters['user/loggedIn']
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push( 'login' )
    }
  }
};
</script>
