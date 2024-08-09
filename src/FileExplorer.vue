<script>
import TopMenu from "@/components/_baseComponents/TopMenu.vue";
import DiskList from "@/components/DiskList.vue";
import ItemActionList from "@/components/dirContent/itemActions/ItemActionList.vue";
import DirTree from "@/components/dirTree/components/DirTree.vue";
import TreeContainer from "@/components/dirTree/TreeContainer.vue";
import DirContentTable from "@/components/dirContent/DirContentTable.vue";
import Notify from "@/components/_baseComponents/Notify.vue";
import ImageViewer from "@/components/dirContent/components/ImageViewer.vue";
import VideoPlayer from "@/components/dirContent/components/VideoPlayer.vue";
import Loader from "@/components/_baseComponents/Loader.vue";
import {useSettingsStore} from "@/stores/settingsStore.js";
import {useDisksStore} from "@/stores/disksStore.js";
import {useDiskDirsStore} from "@/stores/diskDirsStore.js";
import {useDirItemsStore} from "@/stores/dirItemsStore.js";
import {useSelectedItemsStore} from "@/stores/selectedtemsStore.js";
import ErrorModal from "@/components/modals/ErrorModal.vue";
import RenameModal from "@/components/modals/RenameModal.vue";
import Editor from "@/components/dirContent/components/Editor.vue";
import PageLoader from "@/components/_baseComponents/PageLoader.vue";
import AudioPlayer from "@/components/dirContent/components/AudioPlayer.vue";
import globalMixin from "@/components/mixins/globalMixin.js";
import PDFModal from "@/components/modals/PDFModal.vue";
import Api from "@/services/Api.js";
import {getCurrentInstance} from "vue";

export default {
    name: "FileExplorer",
    mixins: [globalMixin],
    components: {
        PDFModal,
        AudioPlayer,
        PageLoader,
        Editor,
        RenameModal,
        ErrorModal,
        Loader,
        VideoPlayer,
        ImageViewer,
        Notify,
        DirContentTable,
        TreeContainer,
        TopMenu,
        DiskList,
        ItemActionList,
        DirTree
    },
    props: {
      setting: {
          type: Object,
          required: true
      }
    },
    data() {
        return {
            isLoading: true,
            settingsStore: useSettingsStore(),
            disksStore: useDisksStore(),
            diskDirsStore: useDiskDirsStore(),
            dirItemsStore: useDirItemsStore(),
            selectedItemsStore: useSelectedItemsStore(),
            hideTree: false,
            navTranslate: "-100%",
            contentMove: 0,
            isFetchingDataAfterInit: false
        }
    },
    created() {
        this.settingsStore.setBaseUrl(this.setting.baseUrl);
        getCurrentInstance().appContext.config.globalProperties.$API = new Api(this.setting.baseUrl);

        if (window.innerWidth <= 900) {
            this.hideTree = true;
        }

        this.initExplorer();
    },
    mounted() {
        this.$emitter.on("toggleTree", () => {
            this.hideTree = !this.hideTree;
            this.navTranslate = 0;
            this.contentMove = "250px"
        });

        this.$emitter.on("fetchingData", () => {
            this.isFetchingDataAfterInit = !this.isFetchingDataAfterInit;
        });
    },
    methods: {
        initExplorer() {
            this.$API.get('init-explorer').then(response => {
                const receivedData = response.data.result;

                if (receivedData) {
                    this.storeDisks(receivedData.disks);
                    this.storeAllDirectoriesForDisk(receivedData);
                    this.dirItemsStore.addNewDirWithItems(
                        receivedData.selectedDisk,
                        receivedData.selectedDir,
                        receivedData.selectedDirPath,
                        receivedData.selectedDirItems
                    );
                    this.storeDefaultFileExplorerViewData(receivedData);
                    this.settingsStore.setAclEnabled(receivedData.isAclEnabled);
                }
                this.isLoading = false;
            }).catch(error => {
                console.log(error)
                window.showAlert("failed", "No data could be found", 5000);
            });
        },
        storeDisks(disks) {
            this.disksStore.setDisks(disks);
        },
        storeAllDirectoriesForDisk(receivedData) {
            this.diskDirsStore.addDiskDirs(
                receivedData.selectedDisk,
                receivedData.selectedDir,
                receivedData.dirsForSelectedDisk
            );
        },
        storeDefaultFileExplorerViewData(receivedData) {
            this.settingsStore.setDefaultFileExplorerViewData(
                receivedData.selectedDisk,
                receivedData.selectedDir,
                receivedData.selectedDirPath,
                receivedData.dirsForSelectedDisk,
                receivedData.selectedDirItems
            );
        }
    }
}
</script>

<template>
    <PageLoader v-if="isFetchingDataAfterInit"/>
    <div class="main-wrapper">
        <Notify v-once/>
        <TopMenu v-once/>
        <Loader v-if="isLoading"/>
        <main v-else>
            <TreeContainer/>
            <div :class="{moveLeft: hideTree}" class="content-box">
                <div class="nav-box">
                    <DiskList/>
                    <ItemActionList/>
                </div>
                <DirContentTable/>
            </div>
            <ImageViewer v-once/>
            <VideoPlayer v-once/>
            <AudioPlayer v-once/>
            <ErrorModal/>
            <RenameModal/>
            <Editor/>
            <PDFModal/>
        </main>
    </div>
</template>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    background-color: #fff;
}

.content-box {
    margin-left: 250px;
    border-left: 1px solid #e8ebef;
    transition: all 0.3s linear;
}

.content-box.moveLeft {
    margin-left: 0;
}

body.dark-mode {
    background-color: #202124;
}

body.dark-mode .content-box {
    border-left: 1px solid #303134;
}

body.dark-mode .rename-input {
    border: 1px solid #303134;
}

body.dark-mode .selected {
    background-color: #303134 !important;
}

body.dark-mode .rename-input {
    background-color: #303134;
    color: #f1f3f4;
}

/*================== these styles define global CSS styling across the application ================*/
.selected {
    background-color: #F2F2F3 !important;
}

.rename-input {
    padding: 5px 12px;
    border: 1px solid #e8ebef;
    border-radius: 4px;
    outline: none;
    width: 100%;
}

.name-cell {
    display: flex;
    align-items: center;
    gap: 20px;
    width: 65%;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
}

.date-cell {
    width: 20%;
    text-align: right;
}

.size-cell {
    width: 15%;
    text-align: right;
}

.delete-icon {
    color: #FE0000;
    cursor: pointer;
}

.error {
    color: #c40606;
    font-size: 14px;
}

.modal-wrapper {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
}

.modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.35) 0 5px 10px;
    padding: 2em;
    width: 500px;
    border-radius: 4px;
    z-index: 2;
}

.modal-content {
    margin: auto;
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.close {
    color: #fff;
    font-size: 40px;
    position: absolute;
    top: 20px;
    right: 30px;
    cursor: pointer;
}

@media screen and (max-width: 570px) {
    .modal {
        width: 400px !important;
    }
}

@media screen and (max-width: 400px) {
    .modal {
        width: 350px !important;
    }
}

body.dark-mode .modal {
    background-color: #202124;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    color: #f1f3f4;
}

@media screen and (max-width: 900px) {
    .nav {
        transform: translateX(v-bind(navTranslate));
    }

    .content-box {
        margin-left: v-bind(contentMove);
    }
}

@media screen and (max-width: 700px) {
    .size-cell {
        display: none;
    }
}

@media screen and (max-width: 570px) {
    .name-cell {
        width: 100%;
    }
    .date-cell {
        display: none;
    }
}

body.dark-mode .error {
    color: #c30c0c;
}
</style>
