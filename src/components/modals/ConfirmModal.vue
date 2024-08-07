<script>
import Button from "@/components/_baseComponents/Button.vue";

export default {
    name: "ConfirmModal",
    components: {Button},
    props: {
        confirmMethodOnYes: {
            type: Function
        },
        confirmMethodOnNo: {
            type: Function
        }
    },
    methods: {
        yes() {
            this.$emitter.emit("setButtonAnimation");
            this.confirmMethodOnYes();
        },
        no() {
            this.$emitter.emit("resetButtonAnimation");
            this.confirmMethodOnNo();
        }
    }
}
</script>

<template>
    <div class="modal-wrapper">
        <div class="modal">
            <div class="confirm-message-box">
                <slot name="confirmQuestion"></slot>
            </div>
            <div class="confirm-action-box">
                <Button text="Yes"
                        :on-click="yes"/>

                <Button text="No"
                        type="cancel"
                        :on-click="no"/>
            </div>
        </div>
    </div>
</template>

<style scoped>
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
</style>