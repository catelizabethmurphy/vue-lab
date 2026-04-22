<script setup>
import { ref, onMounted, computed } from 'vue'
import * as d3 from 'd3'
import { DataRow } from './components'

const dataArray = ref([])
const searchQuery = ref('')
const sortField = ref('CreatedDate')
const sortOrder = ref('asc')
const currentPage = ref(1)
const itemsPerPage = 10

// this is basically just loading and processing the data by
onMounted(async () => {
  const parseDate = d3.timeParse('%-m/%-d/%Y %I:%M:%S %p')

  const lines = await d3.csv('./balt_311.csv')
  const processed = lines.map(d => ({
    ...d,
    Agency: d.Agency.trim(),
    CreatedDate: parseDate(d.CreatedDate),
    CloseDate: parseDate(d.CloseDate),
    DueDate: parseDate(d.DueDate),
    StatusDate: parseDate(d.StatusDate),
    Latitude: +d.Latitude,
    Longitude: +d.Longitude,
    PoliceDistrict: d.PoliceDistrict.trim(),
    PolicePost: d.PolicePost.trim(),
    Neighborhood: d.Neighborhood.trim(),
    ZipCode: d.ZipCode.trim()
  })).filter(d => d.Neighborhood && d.Agency)

  setTimeout(() => {
    dataArray.value = processed
    console.log('Processed data:', processed)
  }, 2000)
  
})

let sortedData = computed(() => {
  return dataArray.value
    .filter(d => 
      d.Neighborhood.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      d.Agency.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      d.SRType.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      d.CreatedDate.toLocaleString().toLowerCase().includes(searchQuery.value.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortField.value]
      const bValue = b[sortField.value]

      if (aValue < bValue) return sortOrder.value === 'asc' ? -1 : 1
      if (aValue > bValue) return sortOrder.value === 'asc' ? 1 : -1
      return 0
  })
})

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return sortedData.value.slice(start, start + itemsPerPage)
})

const totalPages = computed(() => Math.max(1, Math.ceil(sortedData.value.length / itemsPerPage)))

function setSort(field) {
  if (sortField.value === field) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = field
    sortOrder.value = 'asc'
  }

  currentPage.value = 1
}

function onSearch() {
  currentPage.value = 1
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1
  }
}

function previousPage() {
  if (currentPage.value > 1) {
    currentPage.value -= 1
  }
}

</script>

<template>
  <div class="container">
    <h1>311 Calls in Baltimore City</h1>
    <p>Explore calls made in 2025</p>
    <!-- only show the table if we have data, otherwise show nothing or a loading state -->
    <div v-if="dataArray.length">
      <!-- search input — all we're saying is "hey, when this changes, update the searchQuery and run the onSearch function" -->
      <input
      type="text"
      placeholder="Search by neighborhood, agency, date or call type..."
      :value="searchQuery"
      @input="searchQuery = $event.target.value; onSearch()"
      />

      <p class="result-count">{{ sortedData.length }} calls</p>

      <table>
        <thead>
          <!-- this is where we set up the headers, and also make them clickable to sort by that field -->
          <tr>
            <th class="sortable" @click="setSort('Agency')">
              Agency
              <span v-if="sortField === 'Agency'">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
            </th>
            <th class="sortable" @click="setSort('CreatedDate')">
              Created Date
              <span v-if="sortField === 'CreatedDate'">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
            </th>
            <th class="sortable" @click="setSort('Neighborhood')">
              Neighborhood
              <span v-if="sortField === 'Neighborhood'">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
            </th>
            <th class="sortable" @click="setSort('SRType')">
              Type
              <span v-if="sortField === 'SRType'">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <DataRow v-for="(item, index) in paginatedData" :key="index" :data="item" />
        </tbody>
      </table>

      <div class="pagination">
        <button @click="previousPage" :disabled="currentPage === 1">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  font-family: "PT Sans", sans-serif;
  padding: 1rem;
  max-width: 90rem;
  margin: 0 auto;
}

h1 {
  color: #000000;
  margin-bottom: 1rem;
}

p {
  font-size: 1.1rem;
  color: #000000;
}

.sortable {
  cursor: pointer;
  user-select: none;
}
</style>
