<script>
export default {
  name: "UploadItemsSetting",
  emits: ["update:modelValue"],
  data() {
    return {
      ifFileExist: 0
    }
  },
  methods: {
    setSetting() {
      this.$emit('update:modelValue', parseInt(this.ifFileExist));
    }
  }
}
</script>

<template>
  <div class="radio-wrapper">
    <h5>If file exist:</h5>
    <div class="inner-wrapper">
      <div class="radio-box">
        <label for="skip">Skip</label>
        <input type="radio"
               name="fileExist"
               value="0"
               v-model="ifFileExist"
               @change="setSetting">
      </div>
      <div class="radio-box">
        <label for="overwrite">Overwrite</label>
        <input type="radio"
               name="fileExist"
               value="1"
               v-model="ifFileExist"
               @change="setSetting">
      </div>
    </div>
  </div>
</template>

<style scoped>
.radio-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 1em 0;
  padding: 5px 0;
}

.radio-wrapper h5 {
  color: #929fb1;
  font-size: 17px;
}

.inner-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5em;
}

.radio-box {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  accent-color: #7071E8;
  color: #000000;
}

body.dark-mode .radio-box {
  color: #f1f3f4;
}
</style>