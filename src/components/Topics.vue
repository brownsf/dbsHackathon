<template>
  <v-layout row>
    <v-flex
      xs12
      sm8
      offset-sm2>
      <v-card>
        <v-toolbar
          color="teal"
          dark>
          <v-toolbar-title>Topics</v-toolbar-title>
          <v-spacer/>
          <v-btn
            icon
            @click.stop="addDialog = true">
            <v-icon>add</v-icon>
          </v-btn>
        </v-toolbar>
        <v-progress-linear
          v-if="loading"
          :indeterminate="true"/>
        <v-list
          two-line
          subheader>
          <v-list-tile
            v-for="topic in topics"
            :key="topic.id">
            <v-list-tile-content>
              <v-list-tile-title>{{ topic.name }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ topic.description }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
    <v-dialog
      v-model="addDialog"
      max-width="500px">
      <v-card>
        <v-card-title>
          Add Topic
        </v-card-title>
        <v-card-text>
          <v-layout row>
            <v-flex
              xs12
              sm8
              offset-sm2>
              <v-text-field
                v-model="name"
                :rules="[v=>!!v||'Name is required']"
                label="Name"
                validate-on-blur
              />
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex
              xs12
              sm8
              offset-sm2>
              <v-text-field
                :rules="descRules"
                v-model="description"
                label="Description"
                validate-on-blur
              />
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            flat
            @click.stop="addDialog=false">Save</v-btn>

          <v-btn
            color="secondary"
            flat
            @click.stop="addDialog=false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>

</template>
<script>
import { mapState } from 'vuex';

export default {
  data: () => ({
    addDialog: false,
    description: '',
    name: '',
    descRules: [
      v => !!v || 'Description is required',
      v => v.length <= 25 || 'Max 25 characters',
    ],
  }),

  computed: mapState({
    topics: state => state.topics,
    loading: state => state.topicLoad,
  }),
  created() {
    if (this.$store.getters.isAuth) {
      this.$store.dispatch('getAllTopics');
    } else {
      this.$router.push('/login');
    }
  },
};
</script>