<template>
  <v-flex xs12 sm6 md4 lg3 xl3 class='my-10'>
    <v-sheet
      class='ma-auto'
      width='280'
      height='600'
      @click='openPersonForm'>

      <v-img
      src="../../assets/addPersonButton.png" alt="addPersonButton">
      </v-img>

    </v-sheet>
  </v-flex>
</template>

<script>
export default {
  name: 'AddPersonButton',
  methods: {
    openPersonForm () {
      this.$emit('openPersonForm')
    }
  }
}
</script>
