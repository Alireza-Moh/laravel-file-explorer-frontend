<script setup>

</script>

<template>
    <div class="wrapper">
        <div class="text">Loading data...</div>
        <span class="loader"></span>
    </div>
</template>

<style scoped>
.wrapper {
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    gap: 2em;
}

.loader {
    position: relative;
    width: 64px;
    height: 64px;
    background-color: rgba(0, 0, 0, 0.5);
    transform: rotate(45deg);
    overflow: hidden;
}

.loader:after {
    content: '';
    position: absolute;
    inset: 8px;
    margin: auto;
    background: #222b32;
}

.loader:before {
    content: '';
    position: absolute;
    inset: -15px;
    margin: auto;
    background: #7071E8;
    animation: diamondLoader 2s linear infinite;
}

@keyframes diamondLoader {
    0%, 10% {
        transform: translate(-64px, -64px) rotate(-45deg)
    }
    90%, 100% {
        transform: translate(0px, 0px) rotate(-45deg)
    }
}
</style>