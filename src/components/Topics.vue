<template>
  <v-layout row>
    <v-flex
      sm12
      md8
      offset-md2>
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
          <template
            v-for="topic in getTopics"
          >
            <div
              :key="topic.id"
              class="topicItem">
              <v-list-tile>
                <v-list-tile-content @click="selectTopic(topic)">
                  <v-list-tile-title>{{ topic.name }}</v-list-tile-title>
                  <v-list-tile-sub-title>{{ topic.description }}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action
                  class="voter"
                  @click="vote(topic.id)">
                  <v-badge
                    left
                    color="red">
                    <span slot="badge">{{ topic.votes }}</span>
                    <v-icon>thumb_up</v-icon>
                  </v-badge>
                </v-list-tile-action>
              </v-list-tile>
            </div>
          </template>
        </v-list>
      </v-card>
    </v-flex>
    <v-dialog
      v-model="addDialog"
      max-width="500px">
      <v-card>
        <v-form ref="form">
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
              class="saveTopic"
              flat
              @click="saveTopic">Save</v-btn>

            <v-btn
              color="secondary"
              flat
              @click.stop="addDialog=false">Cancel</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="showDetails"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
    >
      <comments-comp
        :selected="selectedTopic.id"
        @close="showDetails=false" />
    </v-dialog>
  </v-layout>

</template>
<style scoped>
.topicItem {
  cursor: pointer;
}
.topicItem:hover {
  background: rgba(0, 0, 0, 0.25);
}
</style>

<script>
import { mapState, mapGetters } from 'vuex';
import comments from './Comments';

export default {
  components: {
    'comments-comp': comments,
  },
  data: () => ({
    addDialog: false,
    description: '',
    name: '',
    showDetails: false,
    selectedTopic: {},
    descRules: [
      v => !!v || 'Description is required',
      v => v.length <= 25 || 'Max 25 characters',
    ],
    selectTopic(topic) {
      this.showDetails = true;
      this.selectedTopic = topic;
    },
  }),

  computed: {
    ...mapState({
      loading: state => state.topicLoad,
    }),
    ...mapGetters(['getTopics']),
  },
  created() {
    if (this.$store.getters.isAuth) {
      this.$store.dispatch('getAllTopics');
    } else {
      this.$router.push('/login');
    }
  },
  methods: {
    saveTopic() {
      const { name, description } = this;
      this.$store
        .dispatch('addTopic', {
          name,
          description,
        })
        .then(() => {
          this.addDialog = false;
          this.$store.dispatch('getAllTopics');
        });
      this.name = '';
      this.description = '';
    },
    vote(id) {
      this.$store.dispatch('vote', { id }).then(() => {});
    },
  },
};
</script>
