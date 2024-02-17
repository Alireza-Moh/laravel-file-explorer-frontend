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

export default {
  name: "EditorViewer",
  components: {Codemirror},
  data() {
    return {
      item: null,
      showEditor: false,
      content: "",
      options: {},
      settingsStore: useSettingsStore(),
      textExtensions: {
        sh: 'text/x-sh',
        css: 'text/css',
        less: 'text/x-less',
        sass: 'text/x-sass',
        scss: 'text/x-scss',
        html: 'text/html',
        js: 'text/javascript',
        ts: 'text/typescript',
        vue: 'text/x-vue',
        htaccess: 'text/plain',
        env: 'text/plain',
        txt: 'text/plain',
        log: 'text/plain',
        ini: 'text/x-ini',
        xml: 'application/xml',
        md: 'text/x-markdown',
        java: 'text/x-java',
        c: 'text/x-csrc',
        cpp: 'text/x-c++src',
        cs: 'text/x-csharp',
        scl: 'text/x-scala',
        php: 'application/x-httpd-php',
        sql: 'text/x-sql',
        pl: 'text/x-perl',
        py: 'text/x-python',
        swift: 'text/x-swift',
        rb: 'text/x-ruby',
        go: 'text/x-go',
        yaml: 'text/x-yaml',
        json: 'application/json',
      },
    }
  },
  mounted() {
    this.$emitter.on("showEditorViewer", (item) => {
      this.item = item;
      this.options = {
        mode: this.textExtensions[item.extension],
        theme: 'darcula',
        lineNumbers: true,
        line: true,
      }
      this.fetchItemContent();
    });
  },
  methods: {
    fetchItemContent() {
      const url = this.settingsStore.baseUrl
          + "disks/"
          + this.item.diskName
          + "/items/"
          + this.item.name.replace("." + this.item.extension, "");

      const options = {
        body: JSON.stringify({
          path: this.item.path
        })
      };
      this.$http.post(url, options).then((data) => {
        if (data.result) {
          this.content = data.result.content;
          this.showEditor = true;
        }
        if (data.errors) {
          this.$emitter.emit(
              "showErrorModal",
              {
                headline: "Failed fetching item content",
                errors: data.errors,
                showErrorKey: false
              }
          );
        }
      });
    },
    saveChanges() {
      const url = this.settingsStore.baseUrl
          + "changes/"
          + "disks/"
          + this.item.diskName
          + "/items/"
          + this.item.name.replace("." + this.item.extension, "");

      const options = {
        body: JSON.stringify({
          path: this.item.path,
          content: this.content
        })
      };
      this.$http.put(url, options).then((data) => {
        if (data.result) {
          window.showAlert(data.result.status, data.result.message);
          this.showEditor = false;
        }
      });
    }
  }
}
</script>

<template>
  <div v-if="showEditor" class="modal-wrapper">
    <div class="modal">
      <h3 class="headline">{{item.name}}</h3>
      <Codemirror v-model:value="content"
                  height="400"
                  width="935"
                  border
                  :options="options"/>
      <div class="button-box">
        <button type="button"
                id="save-btn"
                @click="saveChanges">
          Save
        </button>
        <button type="button"
                id="cancel-btn"
                @click="showEditor = false">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  width: 1000px;
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

#save-btn:hover  {
  background-color: #4d4dbf;
}
</style>