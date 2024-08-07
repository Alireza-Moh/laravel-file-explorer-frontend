<script>
import Button from "@/components/_baseComponents/Button.vue";

export default {
    name: "RenameModal",
    components: {Button},
    data() {
        return {
            showRenameModal: false,
            enteredName: null,
            label: "",
            functionOnSave: null,
            showSpinner: false
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
            this.$emitter.emit("resetButtonAnimation");
        });
    },
    methods: {
        invokeSaveFunction() {
            this.$emitter.emit("setButtonAnimation");
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
                <Button text="Save"
                        :on-click="invokeSaveFunction"/>

                <Button text="Cancel"
                        type="cancel"
                        :on-click="() => {showRenameModal = false}"/>
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