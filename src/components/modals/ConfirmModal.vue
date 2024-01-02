<script>
export default {
  name: "ConfirmModal",
  props: {
    confirmMethodOnYes: Function,
    confirmMethodOnNo: Function,
  }
}
</script>

<template>
  <div class="confirm-wrapper">
    <div class="confirm-message-box">
      <slot name="confirmQuestion"></slot>
    </div>
    <div class="confirm-action-box">
      <button type="button" class="yes" @click="confirmMethodOnYes">Yes</button>
      <button type="button" class="no" @click="confirmMethodOnNo">No</button>
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
}

.confirm-message-box {
  font-size: 1rem;
}

.confirm-action-box {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
  margin-top: 2em;
}

.confirm-action-box button {
  padding: 8px 1em;
  width: 100px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  transition: all 0.2s ease-in-out;
}

.confirm-action-box button.yes {
  background-color: #7071E8;
  color: white;
}

.confirm-action-box button.yes:hover {
  background-color: #4d4dbf;
}

.confirm-action-box button.no:hover {
  background-color: #e2e2e7;
}

body.dark-mode .confirm-wrapper {
  background-color: #303134;
}
</style>