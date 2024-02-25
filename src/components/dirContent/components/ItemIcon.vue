<script>
export default {
    name: "ItemIcon",
    props: {
        type: {
            type: String
        }
    },
}
</script>

<template>
    <img v-if="type === 'dir'" src="@assets/folder-fill.svg" alt="folder icon">
    <img v-if="type === 'file'" src="@assets/file-earmark-fill.svg" alt="folder icon">
</template>