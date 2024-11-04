<template>
<div>
  <div class="app-cards" v-for="item in this.appIdList" :key="item.id">
    <router-link to="'/Details' + item.id">
      <div class="app-card">
        <img src="'http://localhost:8080/api/software_images/' + item.id" alt="App" class="image">
        <div class="content">
          <h2 class="title">{{item.name}}</h2>
        </div>
      </div>
    </router-link>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      appIdList: []
    }
  },
  mounted () {
    this.loadAppIdList()
  },
  methods: {
    async loadAppIdList () {
      fetch('http://localhost:8080/api/all_software_id')
        .then(response => response.json()).then(
          data => {
            this.appIdList = JSON.parse(data)[0]
          }
        )
    }
  }
}
</script>

<style scoped>
.app-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  padding: 16px;
}

.app-card {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  text-align: center;
  transition: transform 0.3s;
}

.app-card:hover {
  transform: translateY(-4px);
}

.app-card .image {
  max-width: 100%;
  height: auto;
  object-fit: cover;
}

.app-card .content {
  padding: 16px;
}

.app-card .title {
  font-size: 18px;
  font-weight: bold;
  margin: 0;
  color: #333;
}

.app-card .description {
  font-size: 14px;
  color: #666;
  margin: 8px 0;
}

.app-card .cta {
  background-color: #007bff;
  color: #ffffff;
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s;
}

.app-card .cta:hover {
  background-color: #0056b3;
}
</style>
