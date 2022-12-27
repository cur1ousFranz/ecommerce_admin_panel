<template>
  <div>
    This is from Home
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

  const router = useRouter()
  if(!localStorage.getItem('TOKEN')){
    router.push({ name : 'LandingPage'})
  }


</script>

<style>

</style>