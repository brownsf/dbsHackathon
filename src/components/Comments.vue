<template>
  <div class="commentContainer">
    <v-card tile>
      <v-toolbar
        card
        dark
        color="primary">
        <v-btn
          icon
          dark
          @click="$emit('close')">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>Comments for {{ singleTopic.name }}</v-toolbar-title>
        <v-spacer/>
        <v-toolbar-items>
          <v-btn
            dark
            flat
            @click.native="dialog = true">add</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-container
        grid-list-md
        text-xs-center>
        <v-layout
          row
          wrap>
          <v-flex xs12>
            <v-list subheader>
              <v-subheader>Recent comments:</v-subheader>
              <v-progress-linear
                v-if="loading"
                class="loader" />
              <v-alert
                v-if="error"
                class="errorAlert">Error loading topic details</v-alert>
              <template v-for="(item, index) in singleTopic.comments">
                <v-list-tile

                  :key="item.id">
                  <v-list-tile-content>
                    <v-list-tile-title v-html="item.message"/>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider :key="`divider-${index}`"/>
              </template>
            </v-list>
          </v-flex>
        </v-layout>
      </v-container>
      <v-dialog
        v-model="dialog"
        max-width="500px">
        <v-card>
          <v-card-title>
            Add Comment
          </v-card-title>
          <v-form ref="form">
            <v-card-text>
              <v-layout row>
                <v-flex
                  xs12
                  sm8
                  offset-sm2>
                  <v-text-field
                    v-model="comment"
                    :rules="[v=>!!v||'Comment is required']"
                    label="Comment"
                    validate-on-blur
                    multi-line
                  />
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-card-actions>
              <v-btn
                color="primary"
                class="saveComment"
                flat
                @click="saveComment">Add</v-btn>

              <v-btn
                color="secondary"
                flat
                @click.stop="dialog=false">Cancel</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>
<style>
.commentContainer {
  width: 100%;
  background: rgba(255, 255, 255, 0.7);
}
</style>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  props: {
    selected: {
      type: Number,
      default: () => 0,
    },
  },
  data: () => ({
    dialog: false,
    comment: '',
  }),
  computed: {
    ...mapState({
      loading: state => state.singleTopicLoad,
      error: state => state.singleTopicError,
    }),
    ...mapGetters(['singleTopic']),
  },
  watch: {
    selected: {
      handler(newVal) {
        // watch it
        this.getTopic(newVal);
      },
    },
  },
  methods: {
    getTopic(id) {
      if (id) {
        this.$store.dispatch('getTopic', id);
      }
    },
    saveComment() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('addComment', {
          topic_id: this.singleTopic.id,
          message: this.comment,
        }).then(() => {
          this.dialog = false;
        });
      }
    },
  },
};
</script>
