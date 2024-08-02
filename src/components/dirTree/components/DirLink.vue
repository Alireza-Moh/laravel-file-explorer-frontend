<script>
import RightClickContextMenu from "@/components/dirTree/components/RightClickContextMenu.vue";
import dirMixin from "@/components/dirContent/mixins/dirMixin.js";

export default {
    name: "DirLink",
    components: {RightClickContextMenu},
    mixins: [dirMixin],
    emits: ['openSubNav'],
    props: {
        dir: {
            type: Object,
            default: {}
        },
        showCartIcon: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            showRightContext: false,
            left: 0,
            top: 0,
            isSubNavOpen: false,
            selectedDir: null
        }
    },
    created() {
        this.selectedDir = this.settingsStore.defaultFileExplorerViewData.selectedDir;
    },
    mounted() {
        this.settingsStore.$subscribe((mutation, state) => {
            this.selectedDir = state.defaultFileExplorerViewData.selectedDir;
        });

        this.$emitter.on("closeRightContext", () => {
            this.showRightContext = false;
        });
    },
    methods: {
        isSelectedDir(dirName) {
            return dirName === this.selectedDir;
        },
        openSubNav() {
            this.isSubNavOpen = !this.isSubNavOpen;
            this.$emit("openSubNav", this.dir.name);
        },
        showContextMenu(event) {
            event.preventDefault();

            this.left = event.clientX;
            this.top = event.clientY;

            this.showRightContext = true;
        }
    }
}
</script>

<template>
    <div :class="{ 'selected': isSelectedDir(dir.name) }"
         class="nav__link"
         @contextmenu="showContextMenu">

        <div class="nav__link-wrapper" @click="openDir(dir)">
            <img alt="folder icon"
                 class="dir-folder-icon"
                 src="@assets/folder-fill.svg"/>
            <span class="nav__name">{{ dir.name }}</span>

        </div>
        <img v-if="showCartIcon"
             :class="{ 'opened-sub-dir': isSubNavOpen}"
             alt=""
             class="cheven_link svg-img"
             src="@assets/chevron-right.svg"
             @click="openSubNav"/>
    </div>

    <div v-if="showRightContext"
         class="context-overlay"
         @click="showRightContext = false">
        <RightClickContextMenu v-if="showRightContext"
                               :dir="dir"
                               :left="left"
                               :top="top"/>
    </div>
</template>

<style scoped>
.nav__link {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 10px 10px 0.8em;
    cursor: pointer;
    transition: all 0.3s linear;
}

.nav__link-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
}

.nav__name {
    font-size: .75rem;
    font-weight: 500;
    white-space: nowrap;
    color: #000000;
}

.nav__name:hover {
    color: #7071E8;
}

.context-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    z-index: 999;
}

.opened-sub-dir {
    transform: rotate(90deg);;
}

body.dark-mode .nav__name {
    color: #f1f3f4;
}

.nav__link.selected {
    background-color: #F2F2F3 !important;
}

body.dark-mode .nav__link.selected {
    background-color: #515152 !important;
}

body.dark-mode .nav__name:hover {
    color: #7071E8;
}

</style>