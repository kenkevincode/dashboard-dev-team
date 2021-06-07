<template>
  <v-app>
    <Navbar />
    <router-view />
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'
import { init } from '@/firebase/auth'

export default {
  name: 'App',
  components: {
    Navbar
  },
  created () {
    init()
  }
}
</script>
