<template>
  <div>
    <v-app-bar color='grey lighten-4' elevation="4">
      <span>
        <a :href="devTeam" :style="{textDecoration: 'none', color: 'black', fontSize: '1.5rem'}" >DevTeaM</a>
      </span>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-history</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-map-marker</v-icon>
      </v-btn>

      <div :style="{width: '216px',height: '28px', border: '2px solid grey', borderRadius: '20px', margin: '0 40px'  }">
        <input type="text" :style="{padding: ' 0 6px', outline: 'none'}"/>
      </div>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-spacer></v-spacer>
      <v-btn color='black' text @click='login'
      :loading="loading"
      >
        Log in
      </v-btn>
      <v-btn color='black' text @click='logOut'
      :loading="loading"
      >
        Sign out
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import { authorize, signOut } from '@/firebase/auth'

export default {
  name: 'Navbar',
  data: () => ({
    devTeam: 'https://dev-team.club/',
    loading: false
  }),
  created () {
    authorize()
  },
  methods: {
    async logOut () {
      this.loading = true
      try {
        await signOut()
        this.loading = false
        this.$router.replace({ name: 'SignIn' })
      } catch (error) {
        alert('signIn error:', error)
      }
    },
    login () {
      this.$router.replace({ name: 'SignUp' })
    }
  }
}
</script>
