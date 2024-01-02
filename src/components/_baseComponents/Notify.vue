<script>
export default {
  name: "Notify",
  data() {
    return {
      type: String,
      message: String,
      showTime: Number,
      timeout: null,
      showAlert: false
    }
  },
  created() {
    window.showAlert = (type, message, showTime = 5000)  => {
      this.showAlert = true;
      this.type = type;
      this.message = message;
      this.showTime = showTime;

      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.startTimeout();
    };
  },
  methods: {
    startTimeout() {
      this.timeout = setTimeout(() => {
        this.showAlert = false;
      }, this.showTime)
    }
  }
}
</script>

<template>
  <div v-if="showAlert" class="message-box" :class="type">
    <img v-if="type === 'success'" src="../../assets/img/done.svg" alt="message icon">
    <img v-if="type === 'failed'" src="../../assets/img/failed.svg" alt="message icon">
    <span class="text">{{message}}</span>
  </div>
</template>

<style scoped>
.message-box {
  z-index: 9999;
  position: absolute;
  top: 10%;
  right: 2%;
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 15px 20px;
  border-radius: 4px;
  min-width: 350px;
  font-size: 14px;
  box-shadow: rgba(0, 0, 0, 0.35) 0 5px 10px;
}

.message-box.success {
  background-color: #D6EDD9;
  color: #155724;
}

.message-box.failed {
  background-color: #f8d7da;
  color: #58151c;
}
</style>