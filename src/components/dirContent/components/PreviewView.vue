<script>
import ItemVideoCell from "@/components/dirContent/components/ItemVideoCell.vue";
import ItemImageCell from "@/components/dirContent/components/ItemImageCell.vue";
import ItemName from "@/components/dirContent/components/ItemName.vue";

export default {
  name: "PreviewView",
  components: {ItemName, ItemImageCell, ItemVideoCell},
  props: {
    item: {
      type: Object
    },
    isImage: {
      type: Boolean
    },
    isVideo: {
      type: Boolean
    },
    videoType: {
      type: String
    }
  }
}
</script>

<template>
  <ItemImageCell v-if="isImage"
                 :item-url="item.url"/>

  <ItemVideoCell v-if="isVideo"
                 :item-url="item.url"
                 :video-type="videoType"/>

  <ItemName :item-name="item.name"/>
</template>