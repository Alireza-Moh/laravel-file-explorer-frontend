<script>
import ItemVideoCell from "@/components/dirContent/components/ItemVideoCell.vue";
import ItemImageCell from "@/components/dirContent/components/ItemImageCell.vue";
import ItemName from "@/components/dirContent/components/ItemName.vue";
import ItemEmptyCell from "@/components/dirContent/components/ItemEmptyCell.vue";

export default {
    name: "PreviewView",
    components: {ItemEmptyCell, ItemName, ItemImageCell, ItemVideoCell},
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
    },
    computed: {
        isFile() {
            return this.item.type === 'file' && this.item.url;
        }
    }
}
</script>

<template>
    <template v-if="isFile">
        <ItemImageCell v-if="isImage" :item-url="item.url" />
        <ItemVideoCell v-else-if="isVideo" :item-url="item.url" :video-type="videoType" />
        <ItemEmptyCell v-else />
    </template>
    <ItemName :item-name="item.name" />
</template>