<script setup>
// DataRow.vue - A component to display a single row of data in the table
// props is just the object for the row
const props = defineProps({
  data: {
    type: Object,
    required: true,
    default: () => ({})
  }
})

// helper functions
const formatSRType = value => value?.replace(/^.*-\s*/, '') ?? ''
const formatDate = value => value ? new Date(value).toLocaleString() : ''
</script>

<!-- no complex logic here, just display the data in the row -->
<template>
  <tr>
    <td>{{ data.Agency }}</td>
    <td>{{ formatDate(data.CreatedDate) }}</td>
    <td>{{ data.Neighborhood }}</td>
    <td>{{ formatSRType(data.SRType) }}</td>
  </tr>
</template>

<!-- no styles for now, but you could add here if you wanted-->
<style scoped>


</style>