<template>
  <div class="about">
    <h1>This is an about page</h1>
    <Button @click="_changeHomePage({value: 'HomePage2', init: true})">This is an about page</Button>
    <Table/>
  </div>
</template>

<script>
// @ is an alias to /src
import { Button, Table } from 'iview'

import { mapActions } from 'vuex'

export default {
  name: 'About',
  components: {
    Button,
    Table
  },
  methods: {
    ...mapActions('menu', [
      '_changeHomePage'
    ])
  }
}
</script>
