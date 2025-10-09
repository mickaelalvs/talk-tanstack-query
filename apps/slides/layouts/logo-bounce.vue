<template>
    <div class="dvd-bounce-layout">
        <Background />
        <slot />
    </div>
</template>

<style scoped>
.dvd-bounce-layout {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>
