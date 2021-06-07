<template>
  <v-container fluid fill-height>
    <v-layout flex align-center justify-center>
      <v-flex xs9 sm6 md4>
        <v-toolbar class="pt-5 light-blue lighten-2" min-width="340">
          <v-toolbar-title class="white--text pb-5"
            ><h4>Sign Up</h4>
          </v-toolbar-title>
        </v-toolbar>
        <v-card min-width="330">
          <v-card-text class="pt-4">
            <div>
              <v-form v-model="valid" ref="form">
                <v-text-field
                  label="Enter your e-mail address"
                  v-model="email"
                  :rules="emailRules"
                  required
                ></v-text-field>

                <v-text-field
                  label="Enter your password"
                  v-model="password"
                  min-length="8"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"
                  :type="showPassword ? 'text' : 'password'"
                  :rules="[passwordRules.required, passwordRules.min]"
                  counter
                  required
                ></v-text-field>

                <v-card-title class='px-0'>
                  <h3>{{ error }}</h3>
                </v-card-title>

                <v-layout justify-space-between>
                  <v-btn @click="submit" :class="{ 'light-blue lighten-3 white--text': valid, disabled: !valid }"
                  :loading="loading"
                  >Sign Up</v-btn>
                  <router-link to="/login">Login</router-link>
                </v-layout>
              </v-form>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import { signUp } from '@/firebase/auth'

export default {
  name: 'SignUp',
  data: () => ({
    valid: false,
    emailRules: [
      v => !!v || 'E-mail is required',
      v =>
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        'E-mail must be valid'
    ],
    passwordRules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 8 || 'Min 8 characters'
    },
    showPassword: false,
    email: '',
    password: '',
    loading: false,
    error: ''
  }),
  methods: {
    async submit () {
      if (!this.$refs.form.validate()) return

      this.loading = true
      try {
        await signUp(this.email, this.password)
        this.$router.replace({ name: 'SignIn' })
      } catch (error) {
        this.error = error.message || error.toString()
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
