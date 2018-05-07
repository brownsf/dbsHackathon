<template>
  <v-toolbar>
    <v-toolbar-title>Tech-Board</v-toolbar-title>
    <v-spacer/>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn
        flat
        to="topics">Topics</v-btn>
      <v-btn flat>Users</v-btn>
      <v-btn
        v-if="loggedIn"
        flat
        to="login">Login</v-btn>
      <v-btn
        v-else
        flat>Logout</v-btn>
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
};
</script>

