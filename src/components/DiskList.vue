<script>
import {useSettingsStore} from "@/stores/settingsStore.js";
import {useDisksStore} from "@/stores/disksStore.js";
import {useDirItemsStore} from "@/stores/dirItemsStore.js";
import {useDiskDirsStore} from "@/stores/diskDirsStore.js";
import globalMixin from "@/components/mixins/globalMixin.js";

export default {
    name: "DiskList",
    mixins: [globalMixin],
    data() {
        return {
            selectedDisk: null,
            disks: [],
            settingsStore: useSettingsStore(),
            disksStore: useDisksStore(),
            dirItemsStore: useDirItemsStore(),
            diskDirsStore: useDiskDirsStore()
        }
    },
    created() {
        this.selectedDisk = this.settingsStore.defaultFileExplorerViewData.selectedDisk;
        this.disks = this.disksStore.disks;
    },
    methods: {
        isSelectedDisk(diskName) {
            return diskName === this.selectedDisk;
        },
        getDiskDirs(diskName) {
            const diskDirs = this.diskDirsStore.getDiskDirs(diskName);
            if (diskDirs) {
                this.handleExistingDiskDirs(diskName, diskDirs);
            } else {
                this.fetchDiskDirs(diskName);
            }
        },
        handleExistingDiskDirs(diskName, diskDirs) {
            this.selectedDisk = diskName;
            const dirItems = this.dirItemsStore.getDirItems(diskName, diskDirs.selectedDir);
            this.settingsStore.setDefaultFileExplorerViewData(
                diskName,
                diskDirs.selectedDir,
                diskDirs.selectedDirPath,
                diskDirs.dirs,
                dirItems.dirItems
            );
        },
        fetchDiskDirs(diskName) {
            this.$API.get("disks/" + diskName).then(response => {
                const result = response.data.result;

                this.updateDiskDirsStore(result, diskName);
                this.updateDirItemsStore(diskName, result);
                this.updateDefaultFileExplorerViewData(diskName, result);
                this.selectedDisk = diskName;
            }).catch(error => {
                window.showAlert(error.response.data.status, error.response.data.message);
            });
        },
        updateDiskDirsStore(data, diskName) {
            this.diskDirsStore.addDiskDirs(diskName, data.selectedDir, data.dirs);
        },
        updateDirItemsStore(diskName, data) {
            this.dirItemsStore.addNewDirWithItems(
                diskName,
                data.selectedDir,
                data.selectedDirPath,
                data.selectedDirItems
            );
        },
        updateDefaultFileExplorerViewData(diskName, data) {
            this.settingsStore.setDefaultFileExplorerViewData(
                diskName,
                data.selectedDir,
                data.selectedDirPath,
                data.dirs,
                data.selectedDirItems
            );

        }
    }
}
</script>

<template>
    <div class="global-nav">
        <template v-if="disks.length">
            <button v-for="diskName in disks"
                    :key="diskName"
                    :class="{selected: isSelectedDisk(diskName)}"
                    :disabled="isSelectedDisk(diskName)"
                    class="action-btn"
                    @click="getDiskDirs(diskName)">
                <img alt="hdd" class="svg-img" src="@assets/hdd.svg">
                <span class="action-btn__text">{{ diskName }}</span>
            </button>
        </template>
        <div v-else
             id="empty-disk"
             class="action-btn selected">No disks found
        </div>
    </div>
</template>

<style>
.global-nav {
    padding: 15px;
    border-bottom: 1px solid #e8ebef;
    display: flex;
    align-items: center;
    gap: 10px;
}

.action-btn {
    border: none;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    color: #000000;
    transition: all 0.2s linear;
}

.action-btn:hover {
    background-color: #F2F2F3;
}

body.dark-mode .global-nav {
    border-bottom: 1px solid #303134;
}

body.dark-mode .action-btn {
    color: #f1f3f4;
}

body.dark-mode .action-btn:hover {
    background-color: #303134;
}
</style>