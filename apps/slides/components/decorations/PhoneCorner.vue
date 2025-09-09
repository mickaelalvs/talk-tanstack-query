<script setup>
import { computed } from 'vue'

const props = defineProps({
    side: {
        type: String,
        default: 'right', // 'right' or 'left'
        validator: (v) => ['left', 'right'].includes(v)
    }
})

const imgClass = computed(() => {
    if (props.side === 'left') {
        return 'absolute left--5 bottom--4 h-[200px] z-2 scale-x-100'
    } else {
        return 'absolute right--5 bottom--4 h-[200px] z-2 scale-x-[-1]'
    }
})
</script>

<template>
    <img src="/assets/images/phone-2.png" alt="Phone on the table" :class="imgClass" />
</template>