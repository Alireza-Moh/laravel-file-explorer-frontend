<script>
export default {
    name: "ItemEmptyCell",
}
</script>

<template>
    <div class="empty-wrapper">
        <div class="empty-box">
        </div>
    </div>
</template>

<style scoped>
.empty-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
    padding-left: 10px;
}

.empty-box {
    width: 30px;
    height: 30px;
    background-color: #eee;
    border-radius: 4px;
}
</style>