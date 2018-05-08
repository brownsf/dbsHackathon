<template>
  <v-toolbar>
    <v-toolbar-title>Tech-Board</v-toolbar-title>
    <v-spacer/>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn
        class="link"
        flat
        to="topics">Topics</v-btn>
        <v-btn
        class="link"
         v-if="loggedIn"
        flat>Logout</v-btn>
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
    }
  }
};
</script>

