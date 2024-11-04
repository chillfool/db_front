<template>
  <div>
    <div class="header" v-show="$route.meta.is_store">
      <div class="box">
        <h1>
          <img src="../static/yln.png" alt="404" width="56" height="45" />
        </h1>
        <nav class="title">App Store</nav>
        <nav class="tag">
          <router-link to="/">商店首页</router-link>
        </nav>
      </div>
      <div class="box">
        <input class="text" type="text" v-model="keyword" @keyup.enter="search" placeholder="请输入你想要的商品">
        <button class="button" @click="search">搜索</button>
        <nav class="tag">
          <router-link to="/Login">Login</router-link>
        </nav>
        <nav class="tag">
          <router-link to="/Register">Register</router-link>
        </nav>
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
  name: 'App',
  data () {
    return {
      keyword: '',
      softwares: [],
      mods: [],
      isLogin: false
    }
  },
  methods: {
    async search () {
      await axios.get('http://localhost:8080/api/user/search',{
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

<style>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px; /* 稍微增加高度以容纳更多内容 */
  background-color: #ffcccb; /* 更改为柔和的粉色 */
  padding: 0 20px; /* 增加内边距以提供更多空间 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加阴影以增加深度 */
}

.box {
  display: flex;
  align-items: center;
  gap: 10px; /* 使用gap属性增加子元素之间的间距 */
}

.tag {
  color: #333; /* 更改为深色以提高可读性 */
  background-color: #ffe4e1; /* 添加背景色以突出显示 */
  padding: 5px 20px; /* 增加内边距以提供更好的点击区域 */
  border-radius: 25px; /* 使用更大的圆角 */
  transition: background-color 0.3s ease, color 0.3s ease; /* 添加过渡效果 */
}

.tag:hover {
  background-color: #ff9999; /* 悬停时更改背景色 */
  color: #fff; /* 悬停时更改文本色 */
}

.title {
  color: lightskyblue; /* 更改为深色以提高可读性 */
  font-size: 18px; /* 增加字体大小 */
  font-weight: bold; /* 加粗字体以突出显示 */
  padding: 0 10px; /* 调整内边距以与图像保持平衡 */
}

.text {
  height: 30px; /* 调整高度以匹配其他元素 */
  font-size: 16px; /* 增加字体大小 */
  border: 1px solid #ff9999; /* 更改边框色以与主题相匹配 */
  padding: 5px 20px; /* 增加内边距以提供更好的输入体验 */
  border-radius: 25px; /* 使用更大的圆角 */
}

.button {
  width: 80px; /* 增加宽度以提供更好的点击体验 */
  height: 35px; /* 增加高度以匹配其他元素 */
  font-size: 16px; /* 增加字体大小 */
  margin-left: 10px; /* 更改边距以与其他元素保持平衡 */
  border: none; /* 移除边框以使用背景色填充 */
  background-color: #ff9999; /* 更改背景色以与主题相匹配 */
  color: #fff; /* 设置文本色为白色以提高可读性 */
  border-radius: 25px; /* 使用更大的圆角 */
  cursor: pointer; /* 添加鼠标悬停时的指针样式 */
  transition: background-color 0.3s ease; /* 添加过渡效果 */
}

.button:hover {
  background-color: #ff6666; /* 悬停时更改背景色 */
}

.router-link-exact-active, .router-link-active {
  text-decoration: none;
  color: #ff6666; /* 更改活动链接的文本色 */
}

a {
  text-decoration: none;
  color: inherit; /* 继承父元素的文本色 */
}
</style>
