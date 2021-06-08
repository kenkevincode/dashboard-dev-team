<template>
  <v-flex xs12 sm6 md4 lg3 xl3 class='my-10'>
    <v-card
      class='ma-auto rounded-lg'
      width='280'
      height='600'
      @click='openPersonCardDialog'>

      <div class="tags">
        <Tag
          v-for="(tag, idx) in tags"
          :key='idx'
          :tag='tag'
        />
      </div>

      <v-img class='rounded-lg' :src='personCard.Photo' height='240px'></v-img>

      <v-card-text>
        <v-card-title class='px-0'>
          <h3>{{ personCard.Name }}</h3>
        </v-card-title>

        <v-card-subtitle class='px-0'>
          {{ personCard.Title }}
        </v-card-subtitle>

        <v-divider></v-divider>

        <div>
          <Profit
            v-for="(prof, idx) in profit"
            :key='idx'
            :prof='prof' />
        </div>

        <div class="mt-2">
          <v-layout justify-space-between>
            <div>Attention</div>
            <div>
              {{ attentionAmount }}h
            </div>
          </v-layout>
          <v-row class="mt-1 mx-0 auto">
            <Attention
              v-for='attent in attention'
              :key='attent.idx'
              :attent='attent'
            />
          </v-row>
        </div>
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
import Tag from '@/person/components/Tag'
import Profit from '@/person/components/Profit'
import Attention from '@/person/components/Attention'

export default {
  name: 'PersonCard',
  components: {
    Tag,
    Profit,
    Attention
  },
  data: () => ({
  }),
  props: {
    personCard: {
      type: Object,
      required: true
    }
  },
  computed: {
    tags () {
      return this.personCard.Tags
    },
    attention () {
      return this.personCard.Attention
    },
    profit () {
      return this.personCard.Profit
    },
    attentionAmount () {
      return this.personCard.Attention.map(p => p.Amount).reduce((acc, v) => {
        acc += parseInt(v)
        return acc
      }, 0)
    }
  },
  methods: {
    openPersonCardDialog () {
      this.$emit('openPersonCardDialog', this.personCard)
    }
  }
}
</script>

<style lang="scss">
  .tags {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    position: absolute;
    z-index: 1;
    right: 0;
    overflow: hidden;
    &__tag {
      margin: 4px 0 0 40%;
      transition: margin-left 0.5s;
      &:hover {
        margin-left: 0;
      }
    }
  }
  .attention {
    padding: 0 auto;
    margin-top: 8px;
  }
</style>
