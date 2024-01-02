<script>
export default {
  name: "ExplorerMenu",
  emits: ["update:modelValue"],
  props: {
    item: Object
  },
  data() {
    return {
      urlCopied: false,
      variantChanged: false
    }
  },
  mounted() {
  },
  methods: {
    copyUrl() {
      if (this.item) {
        navigator.clipboard.writeText(this.item.url);
        this.urlCopied = true;
      }
    },
    changeContentVariant() {
      this.variantChanged = !this.variantChanged;
      this.$emitter.emit('changeVariant');
    }
  },
  watch: {
    urlCopied(newValue) {
      if (newValue === true) {
        setInterval(() => {
          this.urlCopied = false;
        }, 2000);
      }
    }
  }
}
</script>

<template>
  <div class="sub-nav">
    <div class="path-box">
      <div class="path">
        <img src="../../../assets/img/folder-check.svg" alt="">
        <span v-if="item">{{item.url}}</span>
        <span v-else>Select checkbox to get path</span>
      </div>
      <img v-if="item && !urlCopied"
           src="../../../assets/img/copy.svg"
           alt=""
           width="16"
           height="16"
           class="copy-icon"
           @click="copyUrl">
      <img v-if="urlCopied" src="../../../assets/img/done.svg"
           alt=""
           width="16"
           height="16"
           class="copy-icon">
    </div>
    <input type="search"
           name="itemSearch"
           id="itemSearch"
           placeholder="Type to search"
           @input="$emit('update:modelValue', $event.target.value)">
    <button class="action-btn"
            :class="{'selected': variantChanged}"
            @click="changeContentVariant">
      <img src="../../../assets/img/list-ul.svg" alt="change list view">
    </button>
  </div>
</template>

<style scoped>
.sub-nav {
  padding: 15px;
  border-bottom: 1px solid #e8ebef;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.path-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.path {
  display: flex;
  align-items: center;
  gap: 10px;
}

.path-box {
  border: 1px solid #e8ebef;
  padding: 5px 12px;
  border-radius: 4px;
  font-size: 12px;
  flex-grow: 3;
}

.copy-icon {
  cursor: pointer;
}

#itemSearch {
  padding: 5px 12px;
  border: 1px solid #e8ebef;
  border-radius: 4px;
  outline-color: #7071E8;
  width: 300px;
}
</style>