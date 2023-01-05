<template>
    <button :class="[ currentSize !== size ? 'text-sm border rounded-full text-center border-black hover:border-2' : ' text-sm border-2 rounded-full border-black text-center']">{{ size }}</button>
</template>

<script setup>
defineProps({
    size : {
        type: String,
    },
    currentSize : {
        type : String,
    },
})
</script>

<style>

</style>