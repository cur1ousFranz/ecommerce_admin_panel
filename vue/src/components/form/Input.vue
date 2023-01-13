<template>
  <div class="relative mb-4">
    <label v-if="label" class="">{{ label }}</label>
    <input
      :value="modelValue"
      :type="type"
      @input="$emit('update:modelValue', $event.target.value)"
      :class="
        error
          ? 'w-full py-2 border border-red-500 focus:outline-red-500 px-2'
          : 'w-full py-2 border px-2'
      "
      :placeholder="placeHolder"
      maxlength="30"
      v-bind="$attrs"
    />
    <p class="text-sm absolute text-red-500"> {{ error }}</p>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: [String, Boolean],
    default: false,
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
  type : {
    type : String,
    default : 'text'
  }, 
  placeHolder : {
    type : String,
    default : ''
  },    
  error : {
    type : String,
    default : ""
  },

});
</script>

<style>
</style>