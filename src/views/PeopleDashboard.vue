<template>
  <v-container fluid class="my-10" justify="center">
    <PageLoader ref="loader" />
    <PersonForm ref="PersonForm" @addPersonCard="addPersonCard"/>
    <v-layout>
      <v-flex>
        <v-row>
          <PersonCard
            v-for='personCard in people'
            :key='personCard.id'
            :personCard='personCard'
            @openPersonCardDialog="openPersonCardDialog"
          />
        <AddPersonButton
        @openPersonForm="openPersonForm"/>
        </v-row>
      </v-flex>
    </v-layout>
    <PersonCardDialog :personCard='currentPerson' v-model='dialogVisible'/>
  </v-container>
</template>

<script>
import PageLoader from '@/components/PageLoader'
import AddPersonButton from '@/person/components/AddPersonButton'
import PersonCard from '@/person/PersonCard'
import PersonForm from '@/person/PersonForm'
import PersonCardDialog from '@/person/PersonCardDialog'
import { getPeople } from '@/net/people'

export default {
  name: 'PeopleDashboard',
  components: {
    PageLoader,
    AddPersonButton,
    PersonCard,
    PersonForm,
    PersonCardDialog
  },
  data: () => ({
    people: [],
    dialogVisible: false,
    currentPerson: {},
    page: 0,
    perPage: 7
  }),
  mounted () {
    this.getAll()
  },
  methods: {
    async getAll () {
      this.$refs.loader.show(true)
      try {
        const response = await getPeople({ pp: this.perPage, p: this.page })
        this.people = response.data
      } catch (error) {
        console.error('getPeople error:', error)
      } finally {
        this.$refs.loader.show(false)
      }
    },
    addPersonCard (PersonCard) {
      this.people.push(PersonCard)
    },
    openPersonCardDialog (PersonCard) {
      this.currentPerson = PersonCard
      this.dialogVisible = true
    },
    openPersonForm () {
      this.$refs.PersonForm.show(true)
    }
  }
}
</script>
