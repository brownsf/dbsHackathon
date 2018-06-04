<template>
  <v-toolbar>
    <v-toolbar-title>
      <v-btn
        flat
        class="linkyarn"
        to="/">Tech-Board</v-btn>
    </v-toolbar-title>
    <v-spacer/>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn
        class="link"
        flat
        to="topics">Topics</v-btn>
      <v-btn
        v-if="loggedIn"
        class="link"
        id="logoutBtn"
        flat
        @click="logout">Logout</v-btn>
      <v-btn
        v-else
        flat
        class="link"
        to="login">Login</v-btn>

    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  computed: {
    loggedIn() {
      return this.$store.getters.isAuth;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('logout').then(() => this.$router.push('/login'));
    },
  },
};
</script>

