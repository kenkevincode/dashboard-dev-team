<template>
<v-container fluid fill-height>
  <v-layout flex align-center justify-center>
    <v-flex xs9 sm6 md4 >
      <v-toolbar class="pt-5 light-blue lighten-2" min-width="330">
        <v-toolbar-title class="white--text pb-5"><h4>Sign In</h4></v-toolbar-title>
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
                min="8"
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
                  <v-btn @click="submit" :class=" { 'light-blue lighten-3 white--text' : valid, disabled: !valid }"
                  :loading="loading"
                  > Sign In</v-btn>
                  <router-link to='/registr' >Need an Account?</router-link>
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
import { authorize, signIn } from '@/firebase/auth'

export default {
  name: 'SignIn',
  data: () => ({
    valid: false,
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
    ],
    password: '',
    passwordRules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 8 || 'Min 8 characters'
    },
    loading: false,
    showPassword: false,
    error: ''
  }),
  created () {
    authorize()
  },
  methods: {
    async submit () {
      if (!this.$refs.form.validate()) return

      this.loading = true
      try {
        await signIn(this.email, this.password)
        this.$router.replace({ name: 'PeopleDashboard' })
      } catch (error) {
        this.error = error.message || error.toString()
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
