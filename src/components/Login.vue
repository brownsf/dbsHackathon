<template>
  <v-layout
    row
    wrap>
    <v-flex
      xs12
      md4
      justify-center>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        />


        <v-text-field
          v-model="password"
          :append-icon="e1 ? 'visibility' : 'visibility_off'"
          :append-icon-cb="() => (e1 = !e1)"
          :type="e1 ? 'text': 'password'"
          :rules="passwordRules"
          name="input-10-1"
          label="Enter your password"
          hint="At least 8 characters"
          min="8"
          counter
          required
        />
        <v-alert
          :value="error"
          type="error">
          {{ errorMessage }}
        </v-alert>

        <v-btn
          :disabled="!valid"
          class="sbButton"
          @click="submit"
        >submit</v-btn>
        <v-btn @click="clear">clear</v-btn>
        <p class="newAccount"><router-link to="register">Create new account</router-link></p>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<style scoped>
.newAccount{
  margin-top: 15px
}
.newAccount a{
  text-decoration: none;
}
</style>


<script>
import { mapState } from 'vuex';

export default {
  data: () => ({
    e1: false,
    valid: true,
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Password is required',
    ],
  }),
  computed: mapState({
    error: state => state.loginError || false,
    errorMessage: state => state.loginErrorMessage,
  }),
  created() {
    this.$store.dispatch('loginReset');
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        this.$store.dispatch('login', {
          email: this.email,
          password: this.password,
        })
          .then(() => {
            this.$router.push('/');
          });
      }
    },
    clear() {
      this.$refs.form.reset();
    },
  },
};
</script>
