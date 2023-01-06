<template>
    <div class="relative cursor-pointer text-sm border rounded-full text-center border-black hover:border-2">
        {{ size.name }}
        <div>
            <span class="absolute -my-8 ml-2 px-2 rounded-full text-sm bg-red-600 text-white">
                {{ size.count === 0 ? '' : size.count }}
            </span>
        </div>
    </div>
</template>

<script setup>
defineProps({
    size : {
        type: Object,
    },
})

</script>

<style>

</style>