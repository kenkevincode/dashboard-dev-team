<template>
  <v-row justify='center'>
    <v-dialog v-model='dialogVisible' width='360' class='rounded-lg'>
      <v-card height='700'
        class='ma-auto'>
        <div class="tags">
          <Tag
            v-for='tag in tags'
            :key='tag.name'
            :tag='tag'
          />
        </div>

        <v-img class='' :src='personCard.Photo' height='330px'></v-img>

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

          <div class="mt-2 px-10">
            Amount
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
    </v-dialog>
  </v-row>
</template>

<script>
import Tag from '@/person/components/Tag'
import Profit from '@/person/components/Profit'
import Attention from '@/person/components/Attention'

export default {
  name: 'PersonCardDialog',
  components: {
    Tag,
    Profit,
    Attention
  },
  props: {
    personCard: {
      type: Object,
      required: true
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  created () {
    this.dialogVisible = this.value
  },
  data: () => ({
    dialogVisible: false
  }),
  computed: {
    tags () {
      return this.personCard.Tags
    },
    attention () {
      return this.personCard.Attention
    },
    profit () {
      return this.personCard.Profit
    }
  },
  watch: {
    value (newValue) {
      this.dialogVisible = newValue
    },
    dialogVisible (newValue) {
      this.$emit('input', newValue)
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
  }
</style>
