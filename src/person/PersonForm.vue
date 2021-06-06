<template>
<v-dialog v-model='isVisible' width='500px'>
  <v-layout flex align-center justify-center>
    <v-flex width='500'>
      <v-toolbar class="pt-5 light-blue lighten-1">
        <v-toolbar-title class="white--text pb-5"><h2>Person card form</h2></v-toolbar-title>
      </v-toolbar>
      <v-card>
        <v-card-text class="pt-4">
          <div>
            <v-form v-model="valid" ref="form">

              <v-file-input
                v-model='photo'
                :rules="fileRules"
                accept='image/png, image/jpeg, image/bmp'
                placeholder='Pick an photo'
                prepend-icon='mdi-camera'
              ></v-file-input>

              <v-text-field
                label='Enter your name'
                v-model="name"
                min="5"
                :rules="[nameRules.required, nameRules.min]"
                counter
                hide-details='auto'
                required>
              </v-text-field>

              <v-text-field
                label='Title'
                v-model='title'
                :rules="[titleRules.required, titleRules.min]"
                counter
                hide-details='auto'
                required
              ></v-text-field>

              <v-combobox class="mt-10"
                v-model="tags"
                :items="items"
                tags
                clearable
                label="Write or select your favorite hobbies"
                multiple
                >
                <template v-slot:selection="{ attrs, item, select, selected }">

                  <v-chip
                    v-bind="attrs"
                    :input-value="selected"
                    close
                    @click="select"
                    @click:close="removeTags(item)"
                  >
                    <strong>{{ item }}</strong>&nbsp;
                  </v-chip>
                </template>
              </v-combobox>

              <v-text-field
                label='Attention'
                v-model='attention'
                type='number'
                hide-details='auto'
              ></v-text-field>

              <v-text-field
                label='Profit'
                v-model='profit'
                hide-details='auto'
                type='number'
              ></v-text-field>

              <v-card-title class='px-0'>
                <h3>{{ this.error }}</h3>
              </v-card-title>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color='teal darken-1' text @click='onCloseClick'>
                  Close
                </v-btn>
                <v-btn text @click="addPersonCard"
                :class=" { 'light-blue lighten-1 white--text' : valid, disabled: !valid }"
                :loading='loading'> Save In</v-btn>
              </v-card-actions>
            </v-form>
          </div>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</v-dialog>
</template>

<script>
export default {
  name: 'PersonForm',
  data: () => ({
    valid: false,
    id: '',
    photo: null,
    fileRules: [
      value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!'
    ],
    name: '',
    nameRules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 5 || 'Min 5 characters'
    },
    title: '',
    titleRules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 3 || 'Min 3 characters'
    },
    tags: [],
    items: ['JS', 'Python', 'C++', 'Vue.js', 'HTML6', 'CSS', 'Vuetify'],
    attention: '',
    profit: '',
    loading: false,
    isVisible: false,
    error: ''
  }),
  methods: {
    show (flag) {
      this.isVisible = flag
    },
    reset () {
      this.name = ''
      this.title = ''
      this.photo = null
      this.tags = []
      this.attention = ''
      this.profit = ''
    },
    addPersonCard () {
      if (!this.$refs.form.validate()) return

      this.loading = true

      const reader = new FileReader()
      reader.onload = () => {
        const tags = this.tags.map(t => ({ Name: t }))
        const profit = [{ Amount: this.profit }]
        const attention = [{ Amount: this.attention }]
        const personCard = {
          Id: Date.now().toString(),
          Name: this.name,
          Title: this.title,
          Photo: reader.result,
          Tags: tags,
          Attention: attention,
          Profit: profit
        }
        this.loading = false
        this.reset()
        this.show(false)
        this.$emit('addPersonCard', personCard)
      }
      reader.readAsDataURL(this.photo)
    },
    removeTags (item) {
      this.tags.splice(this.tags.indexOf(item), 1)
      this.tags = [...this.tags]
    },
    onCloseClick () {
      this.reset()
      this.show(false)
    }
  }
}
</script>
