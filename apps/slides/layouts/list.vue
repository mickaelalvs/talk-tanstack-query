<script setup lang="ts">
import Background from '../components/Background.vue'
import FallingPhone from '../components/decorations/FallingPhone.vue';
import PhoneCorner from '../components/decorations/PhoneCorner.vue';
</script>

<template>
    <Background />
    <FallingPhone class="h-[200px]" />
    <PhoneCorner side="right" class="!h-[150px]" />
    <h1 class="absolute left-22 top-10 text-3xl font-black text-[var(--theme-color-cloudBurst)]">
        <slot name="title" />
    </h1>
    <div class="relative z-1 p-20 w-full h-full flex justify-center flex-col gap-4 text-3xl liste font-semibold">
        <slot></slot>
    </div>
</template>

<style>
.liste ul {
    line-height: 3.5rem;
    list-style-type: disc;
    padding-left: 2rem;
}

.liste ul ul {
    list-style-type: circle;
    padding-left: 2rem;
}

.liste li {
    margin-bottom: 0.5rem;
    color: var(--theme-color-cloudBurst);

    span {
        color: var(--theme-color-copper);
    }
}

.liste ul li::marker {
    color: var(--theme-color-roofTerracotta);
    font-size: 1.5em;
}
</style>
