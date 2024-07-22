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
            this.options = {
                mode: editorItemExtensions[item.extension],
                theme: 'darcula',
                lineNumbers: true,
                line: true,
            }
            this.fetchItemContent();
        });
    },
    methods: {
        fetchItemContent() {
            const url = this.getUrl()
                + "?"
                + new URLSearchParams({
                    path: encodeURIComponent(this.item.path)
                });

            this.$http.get(url).then((data) => {
                if (data.result) {
                    this.content = data.result.content;
                    this.showEditor = true;
                }
                this.showErrorModal(data, "File content errors");
            });
        },
        saveChanges() {
            this.$http.post(this.getUrl(), this.getOption(), false).then((data) => {
                if (data.result) {
                    window.showAlert(data.status, data.message);
                    this.showEditor = false;
                }
                this.showErrorModal(data, "Failed updating file");
            });
        },
        getOption() {
            const formData = new FormData();
            formData.append("path", this.item.path);
            formData.append("item", new Blob([this.content]), this.item.name);

            return  {
                body: formData,
            }
        },
        getUrl() {
            return this.settingsStore.baseUrl
                + "disks/"
                + this.item.diskName
                + "/items/"
                + this.item.name.replace("." + this.item.extension, "");
        }
    }
}
</script>

<template>
    <div v-if="showEditor" class="modal-wrapper">
        <div class="modal" ref="modal">
            <h3 class="headline">{{ item.name }}</h3>
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
    margin-bottom: 1em;
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
</style>