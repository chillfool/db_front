<template>
    <div class="software-details">
      <!-- 软件名居中放大显示在最上方 -->
      <h1 class="software-title">{{ softwareName }}这个地方放软件名</h1>

      <!-- 原有的图片居中放在中间 -->
      <div class="image-container">
        <img :src="imageUrl" alt="Software Image" />
      </div>

      <!-- 添加一个将软件加入购物车的按钮 -->
      <div class="action-button-container">
        <button @click="addToCart">{{ addToCartText }}</button>
      </div>

      <!-- 价格、下载量、开发者名称放在最下方 -->
      <div class="software-info">
        <p><strong>Price:</strong> ${{ price }}</p>
        <p><strong>Download Count:</strong> {{ downloadCount }}</p>
        <p><strong>Developer:</strong> {{ developerName }}</p>
      </div>
    </div>
  </template>

  <script>
  import axios from 'axios';

  export default {
    data () {
      return {
        imageUrl: '',
        softwareId: this.$route.params.id,
        softwareDetails: null, // 用于存储从后端获取的软件详情
        addToCartText: 'Add to Cart' // 初始文本为“Add to Cart”，可以根据状态改变
      };
    },
    computed: {
      softwareName () {
        return this.softwareDetails ? this.softwareDetails.software_name : '';
      },
      price () {
        return this.softwareDetails ? this.softwareDetails.price : 0;
      },
      downloadCount () {
        return this.softwareDetails ? this.softwareDetails.download_count : 0;
      },
      developerName () {
        return this.softwareDetails ? this.softwareDetails.developer_name : '';
      }
    },
    created () {
      this.fetchSoftwareDetails();
    },
    methods: {
      async fetchSoftwareDetails () {
        this.imageUrl = `http://localhost:8080/api1/images/${this.softwareId}`;
        try {
          const response = await axios.post('http://localhost:8080/api/software/details', { id: this.softwareId });
          this.softwareDetails = response.data;
        } catch (error) {
          console.error('Error fetching software details:', error);
        }
      },
      async addToCart () {

        try {
          const response = await axios.get(`http://localhost:8080/api/user/add/${this.softwareId}`);
          if (response.data.success) {
            this.addToCartText = 'Added to Cart'; // 如果添加成功，改变按钮文本
            // 可以考虑添加其他UI反馈，如Toast消息
          } else {
            // 处理添加失败的情况
            console.error('Failed to add to cart:', response.data.error);
          }
        } catch (error) {
          console.error('Error adding to cart:', error);
        }
      }
    }
  };
  </script>

  <style scoped>
  .software-details {
    text-align: center;
    padding: 20px;
  }

  .software-title {
    font-size: 2em;
    margin-bottom: 20px;
  }

  .image-container {
    margin: 20px 0;
  }

  .image-container img {
    max-width: 80%;
    height: auto;
    border-radius: 10px; /* 可选：添加圆角 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 可选：添加阴影 */
  }

  .action-button-container {
    margin-bottom: 20px;
  }

  .action-button-container button {
    padding: 10px 20px;
    font-size: 1em;
    border: none;
    border-radius: 5px;
    background-color: #4CAF50; /* 绿色背景 */
    color: white; /* 白色文字 */
    cursor: pointer;
    transition: background-color 0.3s ease; /* 添加过渡效果 */
  }

  .action-button-container button:hover {
    background-color: #45a049; /* 鼠标悬停时颜色稍深 */
  }

  .software-info {
    margin-top: 20px;
  }

  .software-info p {
    font-size: 1em;
    color: #555; /* 灰色文字 */
  }

  .software-info strong {
    color: #333; /* 更深的灰色或黑色 */
  }
  </style>
