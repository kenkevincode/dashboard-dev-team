<template>
  <v-chip
    class="tags__tag rounded-sm"
    :style="{backgroundColor: '#' + tag.Color}"
    label
    text-color="white"
  >
    {{tag.Name}}
  </v-chip>
</template>

<script>
export default {
  name: 'Tag',
  props: {
    tag: {
      type: Object,
      required: true
    }
  }
}
</script>
