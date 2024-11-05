<template>
  <div>
    <div class="header" v-show="$route.meta.is_store">
      <div class="header-left">
        <div class="box">
          <h1>
            <img src="../static/yln.png" alt="404" width="56" height="45" />
          </h1>
          <nav class="title">App Store</nav>
        </div>
      </div>
      <div class="header-center">
        <div class="search-container">
          <input class="text" type="text" v-model="keyword" @keyup.enter="search" placeholder="请输入你想要的商品">
          <button class="button" @click="search">搜索</button>
        </div>
      </div>
      <div class="header-right">
        <nav class="tag" v-if="!isLoggedIn">
          <router-link to="/Login">Login</router-link>
        </nav>
        <nav class="tag" v-if="!isLoggedIn">
          <router-link to="/Register">Register</router-link>
        </nav>
        <div class="user-info" v-if="isLoggedIn">
          <router-link to="/UserInfo" class="user-name-link">
            <div class="user-name-circle">
              {{ userName }}
            </div>
          </router-link>
        </div>
        <div v-if="isLoggedIn" class="user-info">
          <router-link to="/MessageListPage">
            <img src="../static/927260acae7e343f8b2c893039c0df2.png" alt="infoList" class="user-info-img"/>
          </router-link>
        </div>
      </div>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from 'vuex';

export default {
  name: 'App',
  data () {
    return {
      keyword: '',
      softwares: [],
      mods: []
    }
  },
  computed: {
    ...mapState({
      isLoggedIn: state => state.isLoggedIn,
      userName: state => state.userName,
      userId: state => state.userId
    })
  },
  methods: {
    async search () {
      await axios.get('http://localhost:8080/api/user/search/',{
        params: {
          keyword: this.keyword
        }
      }).then(res => {
          this.softwares = res.data.softwares;
          this.mods = res.data.mods;
      })
      const softwaresStr = JSON.stringify(this.softwares);
      const modsStr = JSON.stringify(this.mods);
      await this.$router.push({name: 'Search', query: {softwares : softwaresStr, mods : modsStr}});
    }
  }
}

</script>

<style scoped>
body, html {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  background: url('../static/wallhaven-2yll2g_2560x1600.png') no-repeat center center fixed;
  background-size: cover;
  color: black;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  background: linear-gradient(to right, lightskyblue,lightblue);
  padding: 0 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
}

.header-left, .header-center, .header-right {
  display: flex;
  align-items: center;
}

.header-center {
  flex: 1;
  justify-content: center;
}

.search-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.box {
  display: flex;
  align-items: center;
  gap: 20px;
}

.tag {
  color: #fff;
  background: linear-gradient(to right, #8e44ad, lavender);
  padding: 8px 24px;
  border-radius: 30px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.tag:hover {
  background: linear-gradient(to right, lavender, #8e44ad);
  color: #ecf0f1;
}

.title {
  color: lightyellow;
  font-size: 24px;
  font-weight: bold;
  padding: 0;
}

.text {
  height: 40px;
  font-size: 18px;
  border: 2px mediumpurple;
  padding: 10px 24px;
  border-radius: 30px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #ecf0f1;
  color: #2c3e50;
  width: 500px;
}

.button {
  height: 40px;
  font-size: 18px;
  border: none;
  background: linear-gradient(to right, #8e44ad, lavender);
  color: #fff;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.1s ease;
  padding: 0 20px;
}

.button:hover {
  background: linear-gradient(to right, lavender, #9b59b6);
  transform: scale(1.05);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 20px;
}

.user-name-circle {
  width: 150px;
  height: 50px;
  border-radius: 25px; /* 增加圆角 */
  background: linear-gradient(to right, #8e44ad, lavender);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.1s ease;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 10px;
}

/* 图片边框和动画 */
.user-info img {
  height: 40px; /* 调整高度 */
  width: 40px;  /* 调整宽度 */
  margin-left: 10px;
  border: 2px solid lavender; /* 添加边框 */
  border-radius: 50%; /* 圆形边框 */
  animation: pulse 1.5s infinite; /* 添加动画 */
}

/* 动画定义 */
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.user-name-circle:hover {
  background: linear-gradient(to right, lavender, #9b59b6);
  color: #fff;
  transform: scale(1.05);
}


.router-link-exact-active, .router-link-active {
  text-decoration: none;
  color: lavender;
}

a {
  text-decoration: none;
  color: inherit;
}

</style>
