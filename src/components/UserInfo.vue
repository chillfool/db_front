<template>
  <div class="user-detail">
    <h1>用户详情</h1>
    <p>用户名: {{ username }}</p>
    <p>余额: {{ balance }} 元</p>
    
    <button @click="toggleCart" class="cart-btn">购物车<i v-if="isCartOpen" class="fas fa-caret-up"></i><i v-else class="fas fa-caret-down"></i></button>
    
    <button @click="toggleUploadMod" class="upload-mod-btn">上传MOD<i v-if="isUploadModOpen" class="fas fa-caret-up"></i><i v-else class="fas fa-caret-down"></i></button>
    
    <transition name="slide-fade">
      <div v-if="isCartOpen" class="cart-items">
        <div v-for="(item, index) in cart" :key="index" class="cart-item" @click="buyItem(item)">
          <span>{{ item.name }}</span>
          <span>{{ item.price }} 元</span>
        </div>
      </div>
    </transition>
    
    <transition name="slide-fade">
      <div v-if="isUploadModOpen" class="upload-mod-form">
        <label for="softwareName">软件名称:</label>
        <input type="text" id="softwareName" v-model="softwareName" required class="input-field" />
        
        <label for="modFile">选择MOD文件:</label>
        <input type="file" id="modFile" ref="modFile" required class="input-field" />
        
        <button @click="uploadMod" class="upload-btn">上传MOD</button>
      </div>
    </transition>
    
    <p v-if="purchaseMessage" class="purchase-result">{{ purchaseMessage }}</p>
    <p v-if="uploadMessage" class="upload-result">{{ uploadMessage }}</p>
  </div>
</template>
<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      isCartOpen: false,
      isUploadModOpen: false,
      cart: [],
      balance: 0,
      username: '',
      purchaseMessage: '',
      uploadMessage: '',
      softwareName: ''
    };
  },
  computed: {
    ...mapState(['uid'])
  },
  methods: {
    toggleCart() {
      this.isCartOpen = !this.isCartOpen;
      if (this.isUploadModOpen) {
        this.toggleUploadMod(); // 如果上传MOD界面展开，则关闭
      }
    },
    toggleUploadMod() {
      this.isUploadModOpen = !this.isUploadModOpen;
      if (this.isCartOpen) {
        this.toggleCart(); // 如果购物车界面展开，则关闭
      }
    },
    async fetchUserStatus() {
      try {
        const response = await axios.post('http://localhost:8080/api/user/status', { uid: this.uid });
        this.username = response.data.username;
        this.balance = response.data.balance;
        this.cart = response.data.cart;
      } catch (error) {
        console.error('Failed to fetch user status:', error);
      }
    },
    async buyItem(item) {
      try {
        const response = await axios.post('http://localhost:8080/api/user/buy', { uid: this.uid, sid: item.sid });
        if (response.data.state === 'success') {
          this.purchaseMessage = `购买成功！当前余额：${response.data.balance} 元`;
          this.balance = response.data.balance;
          // 更新购物车列表
          this.cart = this.cart.filter(cartItem => cartItem.sid !== item.sid);
        } else {
          this.purchaseMessage = `购买失败！当前余额：${response.data.balance} 元`;
        }
      } catch (error) {
        this.purchaseMessage = '购买过程中发生错误！';
        console.error('Failed to buy item:', error);
      }
    },
    async uploadMod() {
      const fileInput = this.$refs.modFile;
      const formData = new FormData();
      formData.append('uploader_id', this.uid);
      formData.append('file_name', fileInput.files[0].name);
      formData.append('file', fileInput.files[0]);
      formData.append('softwareName', this.softwareName);

      try {
        const response = await axios.post('http://localhost:8080/api/user/upload_mod', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        if (response.data.status === 'success') {
          this.uploadMessage = 'MOD上传成功！';
        } else {
          this.uploadMessage = 'MOD上传失败！';
        }
      } catch (error) {
        this.uploadMessage = '上传过程中发生错误！';
        console.error('Failed to upload MOD:', error);
      }
    }
  },
  created() {
    this.fetchUserStatus();
  }
};
</script>
<style scoped>
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(10px);
  opacity: 0;
}
.user-detail {
  max-width: 600px;
  margin: auto;
  text-align: center;
}
.cart-btn, .upload-mod-btn {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.5); /* 半透明背景 */
  color: white; /* 文字颜色调整以确保可读性 */
  border: none;
  outline: none;
  transition: background-color 0.3s; /* 平滑过渡效果 */
}
.cart-btn:hover, .upload-mod-btn:hover {
  background-color: rgba(0, 0, 0, 0.7); /* 鼠标悬停时稍微加深背景色 */
}
.cart-items, .upload-mod-form {
  margin-top: 10px;
  border-top: 1px solid #d340b44a;
  padding-top: 10px;
}
.cart-item {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  cursor: pointer;
}
.cart-item:hover {
  background-color: #0f388475;
}
.purchase-result, .upload-result {
  margin-top: 20px;
  color: green;
  font-weight: bold;
}

/* 新增的上传MOD表单样式 */
.upload-mod-form label {
  display: block;
  margin-top: 10px;
}
.input-field {
  margin-top: 5px;
  padding: 5px;
  width: 80%;
  background-color: rgba(255, 255, 255, 0.5); /* 半透明输入框 */
  border: 1px solid #ccc;
  border-radius: 4px;
}
.upload-btn {
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: rgba(0, 123, 255, 0.7); /* 半透明背景 */
  color: white;
  border: none;
  outline: none;
  transition: background-color 0.3s;
}
.upload-btn:hover {
  background-color: rgba(0, 123, 255, 0.9); /* 鼠标悬停时稍微加深背景色 */
}
</style>