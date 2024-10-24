<template>
  <div>
    <div class="header">
      <div class="box">
        <h1>
          <img src="../static/yln.png" alt="404" width="56" height="45" />
          <span class="title">App Store</span>
        </h1>
        <nav class="tag">
          <router-link to="/">商店首页</router-link>
        </nav>
      </div>
      <div class="box">
        <input class="text" type="text" name="keyword" placeholder="请输入你想要的商品">
        <input class="button" type="button" value="搜索">
        <nav class="tag">
          <router-link to="/login}">Login</router-link>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  background-color: lightpink;
  color: lightskyblue;
}
.box {
  display: flex;
  align-items: center;
}
.tag {
  color: lightskyblue;
}
.text {
  height: 22px;
  font-size: 14px;
  border: 1px solid lavender;
  padding: 3px 16px;
  border-bottom-left-radius: 20px;
  border-top-left-radius: 20px;
}
.button{
  width: 60px;
  height: 30px;
  font-size: 14px;
  margin-right: 35px;
  border: 1px solid lavender;
  background-color: lightpink;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}
</style>
