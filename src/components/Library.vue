<template>
  <div>
    <div class="sidebar">
      <div class="home" @click="toggleMenu">
        <img src="../../static/e3312d1d8176effc2ded8415bbe37d2.jpg" alt="Home" class="home-image"/>
      </div>
      <div class="menu" v-show="isMenuVisible" @click.stop="toggleMenu">
        <transition name="slide-fade">
          <div v-for="item in this.softwares" :key="item.sid">
            <router-link to="'/DownLoad/' + item.sid">
              <div class="sss" v-show="isContentVisible">
                {{item.name}}
              </div>
            </router-link>
          </div>
        </transition>
      </div>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      isContentVisible: false,
      isMenuVisible: false,
      softwares: []//{id:,name:}
    };
  },
  mounted() {
    this.loadLibrary();
  },
  methods: {
    toggleMenu() {
      this.isContentVisible = !this.isContentVisible;
      this.isMenuVisible = !this.isMenuVisible;
    },
    async loadLibrary() {
      await axios.get('http://localhost:8080/api/user/lib/',{
        params: {
          uid: this.$store.state.userId
        }
      }).then(res => {
        this.softwares = res.data.softwares;
      })
    }
  }
};
</script>

<style scoped>
.sidebar {
  position: relative;
  width: 100%;
  height: 100%;
}

.home {
  position: absolute;
  top: 10px; /* Adjust as needed */
  left: 10px; /* Adjust as needed */
  cursor: pointer;
}

.home-image {
  width: 60px; /* Adjust size as needed */
  height: 60px; /* Adjust size as needed */
  border: 2px solid #fff;
  border-radius: 50%; /* Make it round */
  animation: pulse 1.5s infinite; /* Add animation */
}

@keyframes pulse {
  0% {
    transform: scale(1);
    border-color: #fff;
  }
  50% {
    transform: scale(1.1);
    border-color: #ff0;
  }
  100% {
    transform: scale(1);
    border-color: #fff;
  }
}

.sss {
  color: #fff;
  position: fixed;
  width: 286px;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 11;
  overflow-y: auto;
  background: #000;
}

.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(-286px);
  opacity: 0;
}

.menu {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  opacity: 0.5;
  z-index: 10;
  background: rgba(0, 0, 0, 0.5);
}
</style>
