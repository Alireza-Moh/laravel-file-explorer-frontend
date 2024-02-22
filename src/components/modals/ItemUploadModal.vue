<script>
import Alert from "@/components/_baseComponents/Alert.vue";
import UploadItemsList from "@/components/modals/uploadComponents/UploadItemsList.vue";
import UploadItemsDropBox from "@/components/modals/uploadComponents/UploadItemsDropBox.vue";
import UploadItemsSetting from "@/components/modals/uploadComponents/UploadItemsSetting.vue";
import UploadItemsActionButtons from "@/components/modals/uploadComponents/UploadItemsActionButtons.vue";

export default {
    name: "ItemUploadModal",
    components: {UploadItemsActionButtons, UploadItemsSetting, UploadItemsDropBox, UploadItemsList, Alert},
    data() {
        return {
            items: [],
            ifItemExist: 0,
            maxUploadItems: 10,
            errors: [],
        }
    },
    computed: {
        maxUploadItemsReached() {
            return this.items.length > this.maxUploadItems;
        }
    },
    methods: {
        removeItemFromList(itemName) {
            this.items = this.items.filter(item => item.name !== itemName);
        },
        updateComp(errors) {
            this.errors = errors;
            this.$refs.fileListComp.$forceUpdate()
        }
    }
}
</script>

<template>
    <div class="modal-wrapper">
        <div class="modal">
            <div class="upload-box">
                <div class="header">
                    <h3>Upload Files</h3>
                </div>
                <Alert v-if="maxUploadItemsReached"
                       message="Limit: Maximum of 10 files per upload"
                       type="warning"/>
                <UploadItemsDropBox v-model="items"
                                    :max-upload-items-reached="maxUploadItemsReached"/>
                <UploadItemsSetting v-model="ifItemExist"/>
                <UploadItemsList ref="fileListComp"
                                 :errors="errors"
                                 :items="items"
                                 @remove-item="removeItemFromList"/>
                <UploadItemsActionButtons
                    :if-item-exist="ifItemExist"
                    :items="items"
                    :max-upload-items="maxUploadItems"
                    :max-upload-items-reached="maxUploadItemsReached"
                    @update-items-list-comp="updateComp"/>
            </div>
        </div>
    </div>
</template>

<style scoped>
.header {
    text-align: center;
    margin-bottom: 2em;
    color: #929fb1;
    font-size: 22px;
    text-transform: uppercase;
}

.selected {
    color: #000000;
    cursor: default;
}

body.dark-mode .modal .input-box input {
    background-color: #303134;
    border: 1px solid #202124;
    color: #f1f3f4;
}
</style>