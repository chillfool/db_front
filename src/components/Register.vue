<!-- 更改过-->
<template>  
    <div class="register-container">  
      <h2>注册</h2>  
      <form @submit.prevent="registerUser">  
        <div class="form-group">  
          <label for="username">用户名</label>  
          <input  
            type="text"  
            id="username"  
            v-model="username"  
            required  
          />  
        </div>  
        <div class="form-group">  
          <label for="password">密码</label>  
          <input  
            type="password"  
            id="password"  
            v-model="password"  
            required  
          />  
        </div>  
        <button type="submit" class="register-button">注册</button>  
      </form>  
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>  
    </div>  
  </template>  
    
  <script>  
  import axios from 'axios';  
    
  export default {  
    data() {  
      return {  
        username: '',  
        password: '',  
        errorMessage: ''  
      };  
    },  
    methods: {  
      async registerUser() {  
        try {  
          const response = await axios.post('http://localhost:8080/api/register', {  
            username: this.username,  
            password: this.password  
          });  
            
          // 根据后端返回的响应处理注册成功的情况  
          // 比如可以跳转到登录页面或者显示一个成功消息  
          alert('注册成功!');  
          this.$store.dispatch('setLogin',true);
          this.$store.dispatch('setUserName',this.username);
          this.$router.push('/');  
        } catch (error) {  
          // 处理错误，比如后端返回的错误信息  
          if (error.response && error.response.data && error.response.data.message) {  
            this.errorMessage = error.response.data.message;  
          } else {  
            this.errorMessage = '注册失败，请稍后再试。';  
          }  
        }  
      }  
    }  
  };  
  </script>  
    
  <style scoped>  
  .register-container {  
    max-width: 400px;  
    margin: 0 auto;  
    padding: 20px;  
    border: 1px solid #ccc;  
    border-radius: 10px;  
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);  
  }  
    
  h2 {  
    text-align: center;  
    margin-bottom: 20px;  
  }  
    
  .form-group {  
    margin-bottom: 15px;  
  }  
    
  label {  
    display: block;  
    margin-bottom: 5px;  
  }  
    
  input {  
    width: 100%;  
    padding: 8px;  
    box-sizing: border-box;  
  }  
    
  .register-button {  
    width: 100%;  
    padding: 10px;  
    background-color: #42b983;  
    color: white;  
    border: none;  
    border-radius: 5px;  
    cursor: pointer;  
    font-size: 16px;  
  }  
    
  .register-button:hover {  
    background-color: #369a6e;  
  }  
    
  .error-message {  
    color: red;  
    text-align: center;  
    margin-top: 10px;  
  }  
  </style>