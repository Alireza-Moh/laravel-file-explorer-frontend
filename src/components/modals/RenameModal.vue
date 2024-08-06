<script>
export default {
    name: "RenameModal",
    data() {
        return {
            showRenameModal: false,
            enteredName: null,
            label: "",
            functionOnSave: null,
            showSpinner: false,
            spinnerDisplay: 'none',
            disableBtn: false
        }
    },
    mounted() {
        this.$emitter.on("showRenameModal", (data) => {
            this.label = data.label;
            this.functionOnSave = data.functionOnSave;
            this.enteredName = data.itemName;
            this.showRenameModal = true;
        });

        this.$emitter.on("hideRenameModal", () => {
            this.showRenameModal = false;
            this.disableBtn = false;
            this.spinnerDisplay = 'none';
        });
    },
    methods: {
        invokeSaveFunction() {
            this.disableBtn = true;
            this.spinnerDisplay = 'block';
            this.functionOnSave(this.enteredName);
        }
    }
}
</script>

<template>
    <div v-if="showRenameModal" class="modal-wrapper">
        <div class="modal">
            <div class="input-box">
                <label for="itemName">{{ label }}</label>
                <input id="itemName"
                       v-model="enteredName"
                       name="itemName"
                       required
                       type="text">
                <span class="error"></span>
            </div>
            <div class="button-box">
                <button id="save-btn"
                        type="button"
                        :disabled="disableBtn"
                        @click="invokeSaveFunction">
                    Save
                </button>

                <button id="cancel-btn"
                        type="button"
                        :disabled="disableBtn"
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
    position: relative;
    transition: all 0.2s ease-in-out;
}

.modal .button-box #cancel-btn:hover {
    background-color: #c40606;
}

.modal .button-box #save-btn:hover {
    background-color: #4d4dbf;
}

#save-btn::after {
    display: v-bind(spinnerDisplay);
    content: "";
    position: absolute;
    width: 14px;
    height: 14px;
    top: 0;
    left: 3px;
    bottom: 0;
    margin: auto;
    border: 4px solid transparent;
    border-top-color: #ffffff;
    border-radius: 50%;
    animation: button-loading-spinner 1s ease infinite;
}

@keyframes button-loading-spinner {
    from {
        transform: rotate(0turn);
    }

    to {
        transform: rotate(1turn);
    }
}

.modal .button-box button:disabled {
    cursor: not-allowed;
    opacity: 0.7;
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