<template>
  <div>
    <h1>您收到的消息</h1>
    <div class="message-list-page">
      <ul>
        <li v-for="(message, index) in messages" :key="message.id" class="message-item">
          <span>{{ message.title}}</span>
          <button @click="viewMessage(message)" class="action-button">详情</button>
          <button @click="deleteMessage(index)" class="action-button">删除</button>
        </li>
      </ul>
      <MessageDialog v-if="isMessageDialogVisible"
                    :message="currentMessage"
                    :isVisible="isMessageDialogVisible"
                    @close="closeMessageDialog"/>
    </div>
  </div>
</template>

<script>
import MessageDialog from './MessageDialog.vue';
import axios from "axios";

export default {
  components: {
    MessageDialog
  },
  data() {
    return {
      messages: [],
      isMessageDialogVisible: false,
      currentMessage: null,
      userid: this.$store.state.userId,
    };
  },
  methods: {
    viewMessage (message) {
      this.currentMessage = message;
      this.isMessageDialogVisible = true;
    },
    async deleteMessage (index) {
      await axios.post('http://localhost:8080/api/message/query/',{
        userid: this.userid,
        messageId: this.messages[index]
      })
      this.messages.splice(index, 1);
    },
    closeMessageDialog () {
      this.isMessageDialogVisible = false;
      this.currentMessage = null;
    },
    async loadUserInfo () {
      await axios.get('http://localhost:8080/api/message/query/',{
        params: {
          id: this.userid
        }
      }).then(res => {
        this.messages = res.data.message;
      })
    }
  },
  mounted() {
    this.loadUserInfo();
  },
};
</script>

<style scoped>
.message-list-page {
  max-width: 100%;
  margin: 0; /* 更改为0以确保内容从左上角开始 */
  padding: 20px;
  font-family: Arial, sans-serif;
  text-align: center; /* 这行可以省略，因为它是默认值 */
}

h1 {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
  border-bottom: 2px solid #007bff;
  padding-bottom: 10px;
}

ul {
  padding-left: 0; /* 移除默认的ul内边距，确保内容左对齐 */
  list-style-type: none; /* 移除默认的列表样式 */
}

.message-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px; /* 增加消息条目之间的间距 */
  padding: 15px; /* 增加内边距以加长消息条目显示框 */
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  transition: transform 0.1s, box-shadow 0.1s;
  width: 100%; /* 确保消息条目宽度占满父容器 */
  box-sizing: border-box; /* 包括内边距和边框在内计算宽度 */
}

.message-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.message-item span {
  flex-grow: 1;
  font-size: 16px;
  line-height: 1.6; /* 稍微增加行高以提高可读性 */
  padding-right: 30px; /* 增加右侧内边距为按钮留出更多空间 */
}

.action-button {
  margin-left: 15px; /* 增加按钮与消息文本之间的间距 */
  padding: 10px 20px; /* 增加按钮内边距以使其更大 */
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.1s;
  font-size: 16px; /* 设置按钮字体大小 */
}

.action-button:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

.action-button:active {
  background-color: #004085;
  transform: scale(0.95);
}
</style>
