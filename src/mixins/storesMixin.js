import {useSettingsStore} from "@/stores/settingsStore.js";
import {useDisksStore} from "@/stores/disksStore.js";
import {useDirItemsStore} from "@/stores/dirItemsStore.js";
import {useDiskDirsStore} from "@/stores/diskDirsStore.js";

export default {
    data() {
        return {
            settingsStore: useSettingsStore(),
            disksStore: useDisksStore(),
            diskDirsStore: useDiskDirsStore(),
            dirItemsStore: useDirItemsStore(),
        }
    }
}