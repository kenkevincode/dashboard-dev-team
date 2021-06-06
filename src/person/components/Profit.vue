<template>
  <div class="mt-2">
    <v-layout justify-space-between>
      <div>Profit</div>
      <div>
        +${{prof.Amount}}
      </div>
    </v-layout>
    <div>
    <v-chip
      :style="{backgroundColor: '#' + prof.Color, width: '360px', height: '16px'}"
      class='rounded-lg'
      text-color="white"
    >
    </v-chip>
  </div>
</div>
</template>

<script>
export default {
  name: 'Profit',
  props: {
    prof: {
      type: Object,
      required: true
    }
  }
}
</script>
