<template>
  <div class="download-page">
    <div class="left-section">
      <img :src=imageUrl alt="Software Image" class="software-image" />
      <button @click="downloadSoftware" class="download-btn">下载软件</button>
    </div>
    <div class="right-section">
      <button @click="toggleModsList" class="toggle-mods-btn">显示/隐藏MOD列表<i v-if="isModsListOpen" class="fas fa-caret-up"></i><i v-else class="fas fa-caret-down"></i></button>
      <transition name="slide-fade">
        <ul v-if="isModsListOpen" class="mods-list">
          <li v-for="mod in mods" :key="mod.mid" class="mod-item" @click="downloadMod(mod)">
            {{ mod.name }}
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      imageUrl: '',
      softwareImage: '',
      mods: [],
      isModsListOpen: false
    };
  },
  async created() {
    const softwareId = this.$route.params.id;
    await this.fetchSoftwareImage(softwareId);
    await this.fetchMods(softwareId);
  },
  methods: {
    async fetchSoftwareImage(softwareId) {
      try {
        const response = await axios.get(`http://localhost:8080/api/software_images/${softwareId}`);
        this.imageUrl = `http://localhost:8080/api/software_images/${softwareId}`;
        this.softwareImage = `data:image/png;base64,${response.data}`;
      } catch (error) {
        console.error('Failed to fetch software image:', error);
      }
    },
    async fetchMods(softwareId) {
      try {
        const response = await axios.get(`http://localhost:8080/api/software/mods/${softwareId}`);
        this.mods = response.data.mods;
      } catch (error) {
        console.error('Failed to fetch mods:', error);
      }
    },
    async downloadSoftware() {
      try {
        const response = await axios.post('http://localhost:8080/api/user/download', {
          type: 'software',
          id: this.$route.params.id
        }, {
          responseType: 'json'
        });
        this.downloadFile(response.data.file_name, response.data.file);
      } catch (error) {
        console.error('Failed to download software:', error);
      }
    },
    async downloadMod(mod) {
      try {
        const response = await axios.post('http://localhost:8080/api/user/download', {
          type: 'mod',
          id: mod.mid
        }, {
          responseType: 'json'
        });
        this.downloadFile(response.data.file_name, response.data.file);
      } catch (error) {
        console.error('Failed to download mod:', error);
      }
    },
    downloadFile(fileName, fileContent) {
      const blob = this.base64ToBlob(fileContent);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
    },
    base64ToBlob(base64String) {
      const byteCharacters = atob(base64String);
      const byteArrays = [];
      for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }
      return new Blob(byteArrays, { type: 'application/zip' });
    },
    toggleModsList() {
      this.isModsListOpen = !this.isModsListOpen;
    }
  }
};
</script>

<style scoped>
.download-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
}

.left-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 50px;
}

.software-image {
  max-width: 300px;
  max-height: 300px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.download-btn {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.download-btn:hover {
  background-color: rgba(0, 0, 0, 0.7);
}

.right-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.toggle-mods-btn {
  margin-bottom: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.toggle-mods-btn:hover {
  background-color: rgba(0, 0, 0, 0.7);
}

.mods-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: 200px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.mod-item {
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.mod-item:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter, .slide-fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
</style>
