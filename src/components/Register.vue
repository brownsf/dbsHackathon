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
          v-model="firstName"
          :counter="10"
          :rules="fNameRules"
          label="First Name"
          required
        />
        <v-text-field
          v-model="lastName"
          :rules="lNameRules"
          :counter="10"
          label="Last Name"
          required
        />
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        />


        <v-text-field
          v-model="password"
          :rules="passwordRules"
          :append-icon="e1 ? 'visibility' : 'visibility_off'"
          :append-icon-cb="() => (e1 = !e1)"
          :type="e1 ?  'text': 'password'"
          name="input-10-1"
          label="Enter your password"
          hint="At least 8 characters"
          min="8"
          counter
        />
        <v-alert
          :value="error"
          type="error">
         <p v-if="error.constraint">Already Registerd</p>
         <p v-else>Registration Error</p>
        </v-alert>
        <v-btn
          :disabled="!valid"
          class="sbButton"
          @click="submit"
        >submit</v-btn>
        <v-btn @click="clear">clear</v-btn>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data: () => ({
    e1: false,
    valid: true,
    firstName: '',
    lastName: '',
    lNameRules: [v => !!v || 'Last Name is required'],
    fNameRules: [v => !!v || 'First Name is required'],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v =>
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        'E-mail must be valid',
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Password is required',
      v =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})/.test(
          v,
        ) ||
        'The password must contain at least: 1 uppercase letter, 1 lowercase letter, 1 number, and one special character (E.g. , . _ & ? etc)',
    ],
  }),
  computed:
   mapState({
    error: state => state.authError || false,
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        this.$store.dispatch('register', {
          first_name: this.firstName,
          last_name: this.lastName,
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
