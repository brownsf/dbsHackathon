<template>
  <div id="app">
    <v-app>
      <header-comp />
      <v-content>
        <v-container>
          <router-view/>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import headercomp from './components/Header';

export default {
  name: 'App',
  components: {
    'header-comp': headercomp,
  },
};
</script>
