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
      v-if="loggedIn"
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
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'App',

  data: () => ({
  }),
  created() {
    this.checkUserState()
  },
  computed: {
    ...mapGetters({
      loggedIn: 'user/loggedIn'
    })
  },
  methods: {
    ...mapActions({
      logoutUser: 'user/logoutUser',
      checkUserState: 'user/setLoggedInState'
    }),
    logout() {
      this.logoutUser()
      .then( ()=> {
      this.$router.push( 'login' )
      })
      /* localStorage.removeItem('token'); */
    }
  },
};
</script>
