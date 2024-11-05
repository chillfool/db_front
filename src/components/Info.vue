<template>
  <transition name="fade">
    <div v-if="show" class="s-info" :style="style" :class="`info-${type}`">
      <div class="info-header">
        <div class="info-icon">
          <i v-if="type==='ok'" class="iconfont icon-iconfontgou2"></i>
          <i v-if="type==='warning'" class="iconfont icon-72jingshi"></i>
          <i v-if="type==='error'" class="iconfont icon-cuowu"></i>
        </div>
      </div>
      <div class="info-content">
        <p v-html="content"></p>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      style: {},
      show: false,
      type: 'ok',
      content: "",
      autoClose: true,
      showTime: 1000,
      x: null,
      y: null,
    };
  },
  mounted() {
    if (this.autoClose) {
      setTimeout(() => {
        this.close();
      }, this.showTime);
    }
    if (this.x && this.y) {
      // 假设这里的x和y是相对于屏幕左上角的坐标，我们不需要调整y来居中，而是直接设置到顶部
      this.$set(this.style, 'top', '20px'); // 顶部距离，可以根据需要调整
      this.$set(this.style, 'left', `calc(50% - 150px)`); // 宽度300px，所以偏移-150px实现居中
    } else {
      // 如果没有指定x和y，则默认显示在顶部居中
      this.$set(this.style, 'top', '20px');
      this.$set(this.style, 'left', '50%');
      this.$set(this.style, 'transform', 'translateX(-50%)');
    }
  },
  methods: {
    close() {
      this.show = false;
    }
  }
};
</script>

<style scoped>
.s-info {
  position: fixed;
  z-index: 8888;
  width: 300px;
  max-width: 90%; /* 响应式设计，防止在小屏幕上溢出 */
  box-sizing: border-box;
  padding: 16px 24px;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center; /* 使内容水平居中 */
}

.info-ok {
  background-color: darkslateblue;
  border-color: midnightblue;
  color: black;
}

.info-error {
  background-color: darkred;
  border-color: #fde2e2;
  color: #F56C6C;
}

.info-icon {
  margin-right: 16px;
  font-size: 24px;
}

.fade-enter, .fade-leave-active {
  opacity: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.35s;
}

.info-header {
  margin-bottom: 8px;
}

.info-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: bold;
  color: inherit;
}

.info-content p {
  margin: 0;
  word-wrap: break-word;
  color : white;
}
</style>
