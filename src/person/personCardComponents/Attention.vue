<template>
  <v-col cols="6" class="my-1">
    <v-chip
      class="px-4 ma-auto rounded-lg "
      :style="{backgroundColor: '#' + attent.Color, width: (100 - (attent.Amount / 10)) + 'px', height: '48px'}"
      label
      text-color="white"
    >
      {{attent.Amount}}%
    </v-chip>
  </v-col>
</template>

<script>
export default {
  name: 'Attention',
  props: {
    attent: {
      type: Object,
      required: true
    }
  }
}
</script>
