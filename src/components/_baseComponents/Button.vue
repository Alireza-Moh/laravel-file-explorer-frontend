<script>
export default {
    name: "Button",
    props: {
        text: {
            type: String,
            default: 'Save'
        },
        type: {
            type: String,
            default: 'save'
        },
        onClick: {
            type: Function
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            spinnerDisplay: 'none',
            disableBtn: false
        }
    },
    computed: {
        buttonId() {
            return this.type === 'save' ? 'save-btn' : 'cancel-btn';
        }
    },
    mounted() {
        this.$emitter.on("setButtonAnimation", () => {
            this.setButtonAnimation();
        });

        this.$emitter.on("resetButtonAnimation", () => {
            this.resetButtonAnimation();
        });
    },
    methods: {
        setButtonAnimation() {
            this.disableBtn = true;
            this.spinnerDisplay = 'block';
        },
        resetButtonAnimation() {
            this.disableBtn = false;
            this.spinnerDisplay = 'none';
        }
    }
}
</script>

<template>
    <button :id="buttonId"
            type="button"
            :disabled="disableBtn || disabled"
            @click="onClick">
        {{ text }}
    </button>
</template>

<style scoped>
button {
    border: none;
    border-radius: 4px;
    padding: 8px 30px;
    color: #fff;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
}

#save-btn {
    background-color: #7071E8;
    margin-right: 10px;
    position: relative;
    transition: all 0.2s ease-in-out;
}

#save-btn:hover {
    background-color: #4d4dbf;
}

#cancel-btn {
    background-color: #FE0000;
    transition: all 0.3s linear;
}

#cancel-btn:hover {
    background-color: #c40606;
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

button:disabled {
    cursor: not-allowed;
    opacity: 0.7;
}
</style>