<!-- 更改过-->
<template>
  <div class="login-container">
    <h2>登录</h2>
    <form @submit.prevent="login">
      <div>
        <label for="username">用户名:</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div>
        <label for="password">密码:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">登录</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      success: false
    };
  },
  methods: {
    async login() {
      try {
        const response = await fetch('http://localhost:8080/api/login', {

          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
          }),
        });

        if (response.ok) {
          //将response内容打印到控制台上
          console.log(response);
          this.$store.dispatch('setuid',response.body.id);
          this.$store.dispatch('setType',response.body.type);
          this.success = true;
          this.$store.dispatch('setLogin',true);
          this.$store.dispatch('setUserName',this.username);
          // 登录成功，跳转到 Home 页面
          this.$router.push('/');
        } else {
          // 登录失败，显示错误信息
          alert('登录失败，请检查用户名和密码，您正在登陆的账号为'+ this.username);
        }
      } catch (error) {
        console.error('登录请求失败:', error);
      }
    },
    change() {
      this.$store.dispatch('setLogin',true);
    }
  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

form div {
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
