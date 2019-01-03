<template>
  <div class="about">
    <h1>This is an about page</h1>
    <Button>This is an about page</Button>
    <Table/>
  </div>
</template>

<script>
// @ is an alias to /src
import { Button, Table } from 'iview'

export default {
  name: 'About',
  components: {
    Button,
    Table
  }
}
</script>
