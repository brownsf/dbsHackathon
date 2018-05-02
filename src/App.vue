<template>
  <div id="app">
    <v-app>
      <v-content>
        <v-container>
          <v-layout row wrap>
            <v-flex xs12>
              <div class="headline">Hello world</div>
      </v-flex>
      </v-layout>
      </v-container>
        <router-view/>
      </v-content>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>
