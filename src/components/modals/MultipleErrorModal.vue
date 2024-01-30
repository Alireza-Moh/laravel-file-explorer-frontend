<script>
export default {
  name: "MultipleErrorModal",
  emits: ["hideErrorModal"],
  props: {
    errors: Object
  },
}
</script>

<template>
  <div class="modal-wrapper">
    <div class="confirm-wrapper">
      <div class="headline">Download Errors:</div>
      <div class="error-box">
        <div v-for="(fileErrors, fileName) in errors" class="error-wrapper">
          <div class="file-name">{{fileName}}</div>
          <ul class="errors-box">
            <li v-for="error in fileErrors" class="error">{{error}}</li>
          </ul>
        </div>
      </div>
      <button type="button" class="ok-btn" @click="$emit('hideErrorModal')">Ok</button>
    </div>
  </div>
</template>

<style scoped>
.confirm-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.35) 0 5px 10px;
  padding: 2em;
  min-width: 500px;
  border-radius: 4px;
  z-index: 999;
  color: #000000;
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
</style>