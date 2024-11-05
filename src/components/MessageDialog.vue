<template>
  <div v-if="isVisible" class="message-dialog overlay">
    <div class="message-dialog-content">
      <p class="message-text">{{ message.content }}</p>
      <button class="close-button" @click="closeDialog">关闭</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
    message: {
      type: Object,
      required: true,
    },
  },
  methods: {
    closeDialog() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.message-dialog-content {
  background: #ffffff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  width: 400px;
  max-width: 90%;
  box-sizing: border-box;
}

.message-text {
  font-size: 16px;
  line-height: 1.5;
  color: #333333;
  margin-bottom: 20px;
}

.close-button {
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.close-button:hover {
  background: #0056b3;
}
</style>
