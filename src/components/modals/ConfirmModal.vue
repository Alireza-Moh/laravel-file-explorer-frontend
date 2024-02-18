<script>
export default {
    name: "ConfirmModal",
    props: {
        confirmMethodOnYes: {
            type: Function
        },
        confirmMethodOnNo: {
            type: Function
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
                <button class="yes" type="button" @click="confirmMethodOnYes">Yes</button>
                <button class="no" type="button" @click="confirmMethodOnNo">No</button>
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

.confirm-action-box button {
    padding: 8px 1em;
    width: 100px;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    color: #fff;
    transition: all 0.2s ease-in-out;
}

.confirm-action-box button.yes {
    background-color: #7071E8;
}

.confirm-action-box button.no {
    background-color: #FE0000;
}

.confirm-action-box button.yes:hover {
    background-color: #4d4dbf;
}

.confirm-action-box button.no:hover {
    background-color: #e2e2e7;
}
</style>