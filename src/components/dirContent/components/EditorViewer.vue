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
import globalMixin from "@/components/mixins/globalMixin.js";
import editorItemExtensions from "@/services/editorItemExtensions.js";

export default {
    name: "EditorViewer",
    components: {Codemirror},
    mixins: [globalMixin],
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
            this.$API.get(this.getUrl()).then(response => {
                if (response.data.result) {
                    this.content = response.data.result.content;
                    this.setupEditorSettings(response.data.result.readOnly);
                    this.showEditor = true;
                }
            }).catch(error => {
                window.showAlert(error.response.data.status, error.response.data.message);
            });
        },
        saveChanges() {
            this.$API.post(this.getUrl(), this.getOption()).then(response => {
                window.showAlert(response.data.status, response.data.message);
            }).catch(error => {
                window.showAlert(error.response.data.status, error.response.data.message);
            });
        },
        getOption() {
            const formData = new FormData();
            formData.append("path", this.item.path);
            formData.append("item", new Blob([this.content]), this.item.name);

            return formData
        },
        getUrl() {
            return "disks/"
                + this.item.diskName
                + '/content'
                + "/items?"
                + new URLSearchParams({
                    path: encodeURIComponent(this.item.path)
                });
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
                <button id="save-btn"
                        type="button"
                        @click="saveChanges">
                    Save
                </button>
                <button id="cancel-btn"
                        type="button"
                        @click="showEditor = false">
                    Cancel
                </button>
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

button {
    border: none;
    border-radius: 4px;
    padding: 8px 30px;
    color: #fff;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
}

#cancel-btn {
    background-color: #FE0000;
    transition: all 0.3s linear;
}

#save-btn {
    background-color: #7071E8;
    margin-right: 10px;
    transition: all 0.2s ease-in-out;
}

#cancel-btn:hover {
    background-color: #c40606;
}

#save-btn:hover {
    background-color: #4d4dbf;
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