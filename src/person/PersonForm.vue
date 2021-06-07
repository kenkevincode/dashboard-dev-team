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

              <!-- <v-file-input
                v-model='photo'
                :rules="fileRules"
                accept='image/png, image/jpeg, image/bmp'
                placeholder='Pick an photo'
                prepend-icon='mdi-camera'
              ></v-file-input> -->
              <v-text-field
                label='Enter image url'
                v-model="photo"
                :rules="[nameRules.required]"
                counter
                hide-details='auto'
                required>
              </v-text-field>

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
                :items="TAGS"
                item-text="Name"
                tags="tags"
                clearable
                label="Your favorite hobbies"
                placeholder='Write or select '
                multiple>
                <template v-slot:selection="{ attrs, item, select, selected }">
                  <v-chip
                    class="tag"
                    v-bind="attrs"
                    :input-value="selected"
                    close
                    @click="select"
                    @click:close="removeTags(item)"
                    :style="{backgroundColor: '#' + item.Color}"
                  >
                    <span class="tag__name" @click="onTagClick">{{ item.Name }}</span>
                    <input class="tag__color" type="color" @change="onTagColorChange(item, $event)" />
                  </v-chip>
                </template>
              </v-combobox>

              <v-row>
                <v-col
                  cols="12"
                  md="6">
                  <v-combobox class="mt-10"
                  v-model="profit"
                  :items="PROFITS"
                  item-text="Amount"
                  type="number"
                  profit
                  clearable
                  label="Profit"
                  placeholder='Write or select $'
                  multiple>
                    <template v-slot:selection="{ attrs, item, select, selected }">
                      <v-chip
                        class="tag"
                        v-bind="attrs"
                        :input-value="selected"
                        close

                        @click="select"
                        @click:close="removeProfit(item)"
                        :style="{backgroundColor: '#' + item.Color}"
                      >
                        <span class="tag__name" @click="onTagClick">{{ item.Amount }}</span>
                        <input class="tag__color" type="color" @change="onTagColorChange(item, $event)" />
                      </v-chip>
                    </template>
                  </v-combobox>
                </v-col>

                <v-col
                  cols="12"
                  md="6">
                  <v-combobox class="mt-10"
                  v-model="attention"
                  :items="ATTENSIONS"
                  item-text="Amount"
                  type="number"
                  attention
                  clearable
                  label="Attention"
                  placeholder='Write or select hours'
                  multiple>
                    <template v-slot:selection="{ attrs, item, select, selected }">
                      <v-chip
                        class="tag"
                        v-bind="attrs"
                        :input-value="selected"
                        close
                        @click="select"
                        @click:close="removeAttention(item)"
                        :style="{backgroundColor: '#' + item.Color}"
                      >
                        <span class="tag__name" @click="onTagClick">{{ item.Amount }}</span>
                        <input class="tag__color" type="color" @change="onTagColorChange(item, $event)" />

                      </v-chip>
                    </template>
                  </v-combobox>
                </v-col>
              </v-row>

              <v-card-title class='px-0'>
                <h3>{{ this.error }}</h3>
              </v-card-title>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color='teal darken-1' text @click='onCloseClick'>
                  Close
                </v-btn>
                <v-btn text @click="updatePersonCard"
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

const TAGS = ['JS', 'Python', 'C++', 'Vue.js'].map(t => ({ Name: t, Color: '#808080' }))
const ATTENSIONS = ['12', '24'].map(a => ({ Amount: a, Color: '#808080' }))
const PROFITS = ['50', '100'].map(p => ({ Amount: p, Color: '#808080' }))

export default {
  name: 'PersonForm',
  data: () => ({
    valid: false,
    id: '',
    photo: '',
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
    TAGS,
    attention: [],
    ATTENSIONS,
    profit: [],
    PROFITS,
    loading: false,
    isVisible: false,
    error: ''
  }),
  methods: {
    show (flag) {
      this.isVisible = flag
    },
    setLoading (flag) {
      this.loading = flag
    },
    init (personCard) {
      if (personCard) {
        this.id = personCard.Id
        this.name = personCard.Name
        this.title = personCard.Title
        this.photo = personCard.Photo
        this.tags = personCard.Tags
        this.profit = personCard.Profit
        this.attention = personCard.Attention
      } else {
        this.reset()
      }
    },
    reset () {
      this.id = ''
      this.name = ''
      this.title = ''
      this.photo = ''
      this.tags = []
      this.profit = []
      this.attention = []
    },
    updatePersonCard () {
      if (!this.$refs.form.validate()) return

      const personCard = {
        Id: this.id,
        Name: this.name,
        Title: this.title,
        Photo: this.photo,
        Tags: this.tags,
        Attention: this.attention,
        Profit: this.profit
      }
      this.reset()
      this.show(false)

      this.$emit('updatePersonCard', personCard)

      // for local photo createForm

      // const reader = new FileReader()
      // reader.onload = () => {
      //   const tags = this.tags.map(t => ({ Name: t }))
      //   const profit = this.profit.map(p => ({ Amount: p }))
      //   const attention = this.attention.map(a => ({ Amount: a }))

      //   const personCard = {
      //     Id: Date.now().toString(),
      //     Name: this.name,
      //     Title: this.title,
      //     Photo: reader.result,
      //     Tags: tags,
      //     Attention: attention,
      //     Profit: profit
      //   }
      //   this.loading = false
      //   this.reset()
      //   this.show(false)
      //   this.$emit('addPersonCard', personCard)
      // }
      // reader.readAsDataURL(this.photo)
    },
    selectTag (item) {
      this.tags.push(item)
    },
    removeTags (item) {
      this.tags.splice(this.tags.indexOf(item), 1)
      this.tags = [...this.tags]
    },
    removeAttention (item) {
      this.attention.splice(this.attention.indexOf(item), 1)
      this.attention = [...this.attention]
    },
    removeProfit (item) {
      this.profit.splice(this.profit.indexOf(item), 1)
      this.profit = [...this.profit]
    },
    onCloseClick () {
      this.reset()
      this.show(false)
    },
    onTagClick (event) {
      const colorInput = event.target.nextSibling
      colorInput.click()
    },
    onTagColorChange (tag, event) {
      let color = event.target.value
      color = color.replace('#', '')
      tag.Color = color
    }
  }
}
</script>

<style lang="scss">
.tag {
  position: relative;
  overflow: hidden;
  &__name {
    display: block;
    color: white;
  }
  &__color {
    position: absolute;
    left: 100%;
  }
}
</style>
