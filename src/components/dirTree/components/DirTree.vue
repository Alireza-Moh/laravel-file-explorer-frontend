<script>
import DirLink from "@/components/dirTree/components/DirLink.vue";
import {useSettingsStore} from "@/stores/settingsStore.js";

export default {
    name: "DirTree",
    components: {DirLink},
    props: {
        dirs: {
            type: Array
        }
    },
    data() {
        return {
            isSubNavOpen: false,
            selectedDir: null,
            selectedSubNavToShow: null,
            settingsStore: useSettingsStore(),
        }
    },
    created() {
        this.selectedDir = this.settingsStore.defaultFileExplorerViewData.selectedDir;
    },
    mounted() {
        this.settingsStore.$subscribe((mutation, state) => {
            this.selectedDir = state.defaultFileExplorerViewData.selectedDir;
        });
    },
    methods: {
        openSubNav(dirName) {
            this.selectedSubNavToShow = dirName;
            this.isSubNavOpen = !this.isSubNavOpen;
        },
        isSelectedDir(dirName) {
            return dirName === this.selectedDir;
        },
    }
}
</script>

<template>
    <template v-if="dirs && dirs.length">
        <template v-for="dir in dirs">
            <DirLink v-if="!dir.subDir || (dir.subDir && dir.subDir.length === 0)"
                     :key="dir.name"
                     :dir="dir"/>

            <div v-else
                 :key="dir.name"
                 :class="{ selected: isSelectedDir(dir.name), 'opened-sub-dir': isSubNavOpen && selectedSubNavToShow === dir.name }"
                 class="nav__dropdown nav__link-with-dropdown nav__dropdown_nested">

                <DirLink :key="dir.name"
                         :dir="dir"
                         :show-cart-icon="true"
                         @open-sub-nav="openSubNav"/>

                <div class="nav__dropdown-collapse">

                    <DirTree v-if="dir.subDir"
                             :key="dir.name"
                             :dirs="dir.subDir"/>
                </div>
            </div>
        </template>
    </template>
</template>

<style scoped>
.nav__dropdown {
    overflow: hidden;
    max-height: 33px;
    cursor: pointer;
    transition: 0.2s ease-in-out;
}

.nav__dropdown-collapse {
    background-color: #F2EAD3;
    padding-left: 1em;
    border-left: 1px solid #4d4dbf;
}

.nav__dropdown-collapse:first-child {
    border-left: none;
}

.opened-sub-dir {
    max-height: 100rem;
}

body.dark-mode .nav__dropdown-collapse {
    background-color: #303134;
}
</style>