<template>
  <div>

    <nav class="py-4 flex justify-between px-14 border-b">
        <router-link :to="{ name : 'LandingPage' }" class="text-white cursor-pointer">
            <img src="/img/nav-logo.png" class="w-36" alt="">
        </router-link>
        <div class="hidden space-x-3 relative md:flex">
          <!-- <router-link v-else :to="{ name : 'Signin'}" class="px-3 py-2 hover:text-gray-600">Sign In</router-link> -->
        </div>
    </nav>

    <main>
      <router-view/>
    </main>

  </div>
</template>

<script setup>

</script>

<style>

</style>