<script>
export default {
    name: "UploadItemsList",
    emits: ["removeItem"],
    props: {
        items: {
            type: Array
        },
        errors: {
            type: Object
        }
    },
}
</script>

<template>
    <div v-if="items.length" class="selected-files-box">
        <div class="headline">
            <p>Selected Files:</p>
        </div>
        <div class="files-box">
            <div v-for="(item, index) in items" :key="index">
                <div class="file">
                    <span>{{ item.name }}</span>
                    <span class="delete-icon"
                          @click="$emit('removeItem', item.name)">
            X
          </span>
                </div>
                <div v-for="(fileName, index) in Object.keys(errors)"
                     :key="index"
                     class="errors">
                    <template v-if="fileName === item.name">
                        <div v-for="error in errors[fileName]" class="error">
                            {{ error }}
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.selected-files-box {
    margin-top: 1em;
}

.selected-files-box .headline {
    font-weight: bold;
    font-size: 18px;
    color: #929fb1;
}

.files-box {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 1em;
    max-height: 200px;
    overflow-y: scroll;
    overflow-x: hidden;
    padding: 10px 10px 10px 0;
}

.file {
    background-color: #F2F2F3;
    padding: 6px 15px;
    border-radius: 4px;
    color: #000000;
    font-size: 13px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
}


.error {
    padding-left: 3px;
}

body.dark-mode .file {
    background-color: #303134;
    color: #bdc1c6;
}
</style>