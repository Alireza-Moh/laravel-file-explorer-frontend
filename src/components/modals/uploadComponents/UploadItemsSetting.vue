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
    <fieldset class="radio-wrapper">
        <legend>If file exist</legend>
        <div class="inner-wrapper">
            <div class="radio-box">
                <label for="skip">Skip</label>
                <input v-model="ifFileExist"
                       name="fileExist"
                       type="radio"
                       value="0"
                       @change="setSetting">
            </div>
            <div class="radio-box">
                <label for="overwrite">Overwrite</label>
                <input v-model="ifFileExist"
                       name="fileExist"
                       type="radio"
                       value="1"
                       @change="setSetting">
            </div>
        </div>
    </fieldset>
</template>

<style scoped>
.radio-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 1em 0;
    padding: 10px;
    border: 1px dashed #929fb1;
    border-radius: 4px;
    color: #929fb1;
    font-size: 17px;
}

.inner-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
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

body.dark-mode .radio-wrapper {
    border: 1px dashed #303134;
}
</style>