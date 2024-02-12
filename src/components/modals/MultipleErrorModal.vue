<script>
export default {
  name: "MultipleErrorModal",
  data() {
    return {
      showErrorModal: false,
      errors: {},
      showErrorKey: true,
      headline: "Errors"
    }
  },
  mounted() {
    this.$emitter.on("showErrorModal", (data) => {
      this.headline = data.headline;
      this.errors = data.errors;
      this.showErrorKey = data.showErrorKey;
      this.showErrorModal = true;
    });
  }
}
</script>

<template>
  <div v-if="showErrorModal" class="modal-wrapper">
    <div class="modal">
      <div class="headline">{{headline}}</div>
      <div class="error-box">
        <div v-for="(fileErrors, fileName) in errors" class="error-wrapper">
          <div class="file-name" v-if="showErrorKey">{{fileName}}</div>
          <ul class="errors-box">
            <li v-for="error in fileErrors" class="error">{{error}}</li>
          </ul>
        </div>
      </div>
      <button type="button"
              class="ok-btn"
              @click="showErrorModal = false">
        Ok
      </button>
    </div>
  </div>
</template>

<style scoped>
.modal-wrapper {
  z-index: 5;
}

.headline {
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2em;
}

.error-box {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 1.5em;
}

.ok-btn {
  border: none;
  border-radius: 4px;
  padding: 8px 30px;
  color: #fff;
  font-size: 0.9rem;
  cursor: pointer;
  background-color: #7071E8;
}

.ok-btn:hover  {
  background-color: #4d4dbf;
}

.file-name {
  font-weight: 600;
  color: #212121;
  padding-bottom: 5px;
}

.errors-box {
  margin-left: 40px;
}

.error-wrapper {
  margin-bottom: 1em;
}

.error-wrapper:last-child {
  margin-bottom: 0;
}

body.dark-mode .headline {
  color: #f1f3f4;
}
</style>