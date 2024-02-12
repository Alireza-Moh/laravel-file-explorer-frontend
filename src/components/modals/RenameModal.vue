<script>
export default {
  name: "RenameModal",
  data() {
    return {
      showRenameModal: false,
      enteredName: null,
      label: "",
      functionOnSave: null,
      errors: {}
    }
  },
  mounted() {
    this.$emitter.on("showRenameModal", (data) => {
      this.label = data.label;
      this.functionOnSave = data.functionOnSave;
      this.errors = data.errors;
      this.enteredName = data.itemName;
      this.showRenameModal = true;
    });

    this.$emitter.on("hideRenameModal", () => {
      this.showRenameModal = false;
    })
  },
  methods: {
    invokeSaveFunction() {
      this.functionOnSave(this.enteredName);
    }
  }
}
</script>

<template>
  <div v-if="showRenameModal" class="modal-wrapper">
    <div class="modal">
      <div class="input-box">
        <label for="itemName">{{label}}</label>
        <input type="text"
               name="itemName"
               id="itemName"
               v-model="enteredName"
               required>
        <span class="error"
              v-if="errors && errors.path && errors.path[0]">
          {{ errors.path[0] }}
        </span>
      </div>
      <div class="button-box">
        <button type="button"
                id="save-btn"
                @click="invokeSaveFunction">
          Save
        </button>

        <button type="button"
                id="cancel-btn"
                @click="showRenameModal = false">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  display: flex;
  flex-direction: column;
  gap: 2em;
}

.modal .input-box {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

#itemName,
label {
  color: #000000;
}

.modal .input-box input {
  border: 1px solid #e8ebef;
  height: 38px;
  width: 100%;
  border-radius: 4px;
  padding-left: 10px;
  outline: none;
}

.modal .button-box button {
  border: none;
  border-radius: 4px;
  padding: 8px 30px;
  color: #fff;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
}

.modal .button-box #cancel-btn {
  background-color: #FE0000;
  transition: all 0.3s linear;
}

.modal .button-box #save-btn {
  background-color: #7071E8;
  margin-right: 10px;
  transition: all 0.2s ease-in-out;
}

.modal .button-box #cancel-btn:hover {
  background-color: #c40606;
}

.modal .button-box #save-btn:hover  {
  background-color: #4d4dbf;
}

body.dark-mode .modal .input-box input {
  border: 1px solid #303134;
}

body.dark-mode #itemName,
body.dark-mode label {
  color: #f1f3f4;
}

body.dark-mode .modal .input-box input {
  background-color: #303134;
  border: none;
  color: #f1f3f4;
}
</style>