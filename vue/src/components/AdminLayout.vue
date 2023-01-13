<template>
  <div class="flex">

    <div class="flex flex-no-wrap">
        <!-- Sidebar starts -->
        <!-- Remove class [ hidden ] and replace [ sm:flex ] with [ flex ] -->
        <div style="min-height: 716px" class="w-64 absolute bg-gray-800 shadow h-full flex-col justify-start hidden md:flex md:relative">
          <div class="h-16 w-full flex justify-center py-4 text-white">
            <h1 class="text-5xl">ATC</h1>
          </div>
          <ul class="mt-12">
              <li class="flex w-full justify-between cursor-pointer items-center mb-6 text-gray-400 hover:text-gray-300">
                  <router-link :to="{ name : 'Home' }" class="px-8 flex items-center w-full">
                      <span class="text-sm ml-2">Home</span>
                  </router-link>
              </li>
              <li class="flex w-full justify-between cursor-pointer items-center mb-6 text-gray-400 hover:text-gray-300">
                  <router-link :to="{ name : 'Products' }" class="px-8 flex items-center w-full">
                      <span class="text-sm ml-2">Products</span>
                  </router-link>
              </li>
              <li class="flex w-full justify-between cursor-pointer items-center mb-6 text-gray-400 hover:text-gray-300">
                  <a href="javascript:void(0)" class="px-8 flex items-center w-full">
                      <span class="text-sm ml-2">Reports</span>
                  </a>
              </li>
              <li class="flex w-full justify-between cursor-pointer items-center mb-6 text-gray-400 hover:text-gray-300">
                  <a href="javascript:void(0)" class="px-8 flex items-center w-full" >
                      <span class="text-sm ml-2">Deliverables</span>
                  </a>
              </li>
              <li class="flex w-full justify-between cursor-pointer items-center mb-6 text-gray-400 hover:text-gray-300">
                  <a href="javascript:void(0)" class="px-8 flex items-center w-full">
                      <span class="text-sm ml-2">Invoices</span>
                  </a>
              </li>
              <li class="flex w-full justify-between cursor-pointer items-center mb-6 text-gray-400 hover:text-gray-300">
                  <a href="javascript:void(0)" class="px-8 flex items-center w-full">
                      <span class="text-sm ml-2">Inventory</span>
                  </a>
              </li>
          </ul>
        </div>

        <div class="w-64 absolute bg-gray-800 shadow h-full flex-col z-40 justify-start md:hidden transition duration-150 ease-in-out" id="mobile-nav">
            <button aria-label="toggle sidebar" id="openSideBar" class="h-10 w-10 bg-gray-800 absolute right-0 mt-16 -mr-10 flex items-center shadow rounded-tr rounded-br justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 rounded focus:ring-gray-800" @click="sidebarHandler(true)">
                <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_icons_at_bottom-svg7.svg" alt="toggler">
            </button>
            <button aria-label="Close sidebar" id="closeSideBar" class="hidden h-10 w-10 bg-gray-800 absolute right-0 mt-16 -mr-10 md:flex md:justify-center items-center shadow rounded-tr rounded-br cursor-pointer text-white" @click="sidebarHandler(false)">
              X
            </button>
            <div class="h-16 w-full flex justify-center py-4 text-white">
              <h1 class="text-5xl">ATC</h1>
            </div>
            <ul class="mt-12">
              <li class="flex w-full justify-between cursor-pointer items-center mb-6 text-gray-400 hover:text-gray-300">
                  <router-link :to="{ name : 'Home' }" class="px-8 flex items-center w-full">
                      <span class="text-sm ml-2">Home</span>
                  </router-link>
              </li>
                            <li class="flex w-full justify-between cursor-pointer items-center mb-6 text-gray-400 hover:text-gray-300">
                  <router-link :to="{ name : 'Products' }" class="px-8 flex items-center w-full">
                      <span class="text-sm ml-2">Products</span>
                  </router-link>
              </li>
              <li class="flex w-full justify-between cursor-pointer items-center mb-6 text-gray-400 hover:text-gray-300">
                  <a href="javascript:void(0)" class="px-8 flex items-center w-full">
                      <span class="text-sm ml-2">Reports</span>
                  </a>
              </li>
              <li class="flex w-full justify-between cursor-pointer items-center mb-6 text-gray-400 hover:text-gray-300">
                  <a href="javascript:void(0)" class="px-8 flex items-center w-full" >
                      <span class="text-sm ml-2">Deliverables</span>
                  </a>
              </li>
              <li class="flex w-full justify-between cursor-pointer items-center mb-6 text-gray-400 hover:text-gray-300">
                  <a href="javascript:void(0)" class="px-8 flex items-center w-full">
                      <span class="text-sm ml-2">Invoices</span>
                  </a>
              </li>
              <li class="flex w-full justify-between cursor-pointer items-center mb-6 text-gray-400 hover:text-gray-300">
                  <a href="javascript:void(0)" class="px-8 flex items-center w-full">
                      <span class="text-sm ml-2">Inventory</span>
                  </a>
              </li>
            </ul>
        </div>
        <!-- Sidebar ends -->
    </div>
                
    <div class="space-y-12 w-full ">
      <div class="container p-4 border-b">
        <div class="flex justify-end">
          <div v-if="authenticated" class="relative inline-block text-left">
            <div>
              <span class="rounded-md shadow-sm">
                <button @click="showDropdown" type="button" class="inline-flex justify-center w-full rounded-full px-3 py-1 text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">
                   <img src="/img/profile-default.png" class="w-7" alt="">
                </button>
              </span>
            </div>
            <div v-if="show" class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg">
              <div class="rounded-md bg-white shadow-xs text-center">
                <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <a href="#" class="block px-4 py-2 cursor-pointer text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem">Profile</a>
                  <a @click="signOut" class="block px-4 py-2 cursor-pointer text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem">Logout</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="px-12">
        <main>  
          <router-view/>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import store from "../store";
  const show = ref(false)
  const authenticated = ref(false)
  if(localStorage.getItem('TOKEN')) {
    authenticated.value = true
  }
  const showDropdown = () => {
    show.value = !show.value
  }
  const signOut = async () => {
    await store.dispatch('signOutUser')
    window.location = '/'
  }
  
  onMounted(() => {
    document.querySelector("#mobile-nav").style.transform = "translateX(-260px)";
  })
  const sidebarHandler = (flag) => {
    if(flag){
      document.querySelector("#mobile-nav").style.transform = "translateX(0px)"
      document.querySelector("#openSideBar").classList.add("hidden")
      document.querySelector("#closeSideBar").classList.remove("hidden")
    }else{
      document.querySelector("#mobile-nav").style.transform = "translateX(-260px)"
      document.querySelector("#closeSideBar").classList.add("hidden")
      document.querySelector("#openSideBar").classList.remove("hidden");
    }
  }
</script>

<style>
</style>