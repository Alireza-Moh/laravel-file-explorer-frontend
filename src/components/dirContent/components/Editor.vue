<script>
import {useSettingsStore} from "@/stores/settingsStore.js";
import Codemirror from "codemirror-editor-vue3";
import 'codemirror/theme/darcula.css';
import 'codemirror/mode/shell/shell';
import 'codemirror/mode/css/css';
import 'codemirror/mode/sass/sass';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/vue/vue';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/php/php';
import 'codemirror/mode/sql/sql';
import 'codemirror/mode/perl/perl';
import 'codemirror/mode/python/python';
import 'codemirror/mode/swift/swift';
import 'codemirror/mode/ruby/ruby';
import 'codemirror/mode/go/go';
import 'codemirror/mode/yaml/yaml';
import 'codemirror/mode/properties/properties';
import editorItemExtensions from "@/services/editorItemExtensions.js";
import Button from "@/components/_baseComponents/Button.vue";

export default {
    name: "Editor",
    components: {Button, Codemirror},
    data() {
        return {
            item: null,
            showEditor: false,
            content: "",
            options: {},
            settingsStore: useSettingsStore(),
        }
    },
    mounted() {
        this.$emitter.on("showEditorViewer", (item) => {
            this.item = item;
            this.fetchItemContent();
        });
    },
    methods: {
        fetchItemContent() {
            const url = "disks/"
                + this.item.diskName
                + '/content'
                + "/items?"
                + new URLSearchParams({
                    path: encodeURIComponent(this.item.path)
                });

            this.$API.get(url).then(response => {
                if (response.data.result) {
                    this.content = response.data.result.content;
                    this.setupEditorSettings(response.data.result.readOnly);
                    this.showEditor = true;
                }
            }).catch(error => {
                window.showAlert(error.response.data.status, error.response.data.message);
            }).finally(() => {
                this.$emitter.emit("fetchingData");
            });
        },
        saveChanges() {
            this.$emitter.emit("setButtonAnimation");
            const url = "disks/"
                + this.item.diskName
                + '/content'
                + "/items/update"
            this.$API.post(url, this.getOption()).then(response => {
                window.showAlert(response.data.status, response.data.message);
            }).catch(error => {
                window.showAlert(error.response.data.status, error.response.data.message);
            }).finally(() => {
                this.$emitter.emit("resetButtonAnimation");
            });
        },
        getOption() {
            const formData = new FormData();
            formData.append("path", this.item.path);
            formData.append("item", new Blob([this.content]), this.item.name);

            return formData
        },
        setupEditorSettings(readOnly) {
            this.options = {
                mode: editorItemExtensions[this.item.extension],
                theme: 'darcula',
                lineNumbers: true,
                line: true,
                readOnly: readOnly
            }
        }
    }
}
</script>

<template>
    <div v-if="showEditor" class="modal-wrapper">
        <div class="modal" ref="modal">
            <div class="header">
                <h3 class="headline">{{ item.name }}</h3>
                <span class="mode">In ReadOnly mode</span>
            </div>
            <Codemirror v-model:value="content"
                        :options="options"
                        border
                        height="500"/>
            <div class="button-box">
                <Button text="Save"
                        :on-click="saveChanges"/>

                <Button text="Cancel"
                        type="cancel"
                        :on-click="() => {showEditor = false}"/>
            </div>
        </div>
    </div>
</template>

<style scoped>
.modal {
    width: 80%;
}

.headline {
    font-size: 1rem;
    font-weight: bold;
}

.button-box {
    display: flex;
    justify-content: flex-end;
    margin-top: 1em;
}

.header {
    margin-bottom: 1em;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.mode {
    color: #155724;
    font-size: 0.8rem;
}
</style>