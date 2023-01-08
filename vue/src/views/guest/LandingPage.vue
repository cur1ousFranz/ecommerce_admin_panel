<template>
<div class="px-6 mx-12 my-8 md:px-12">
    <div class=" p-6 mx-auto bg-gray-100 shadow-lg lg:w-5/12">
        <h1 class="text-2xl font-semibold">Sign In</h1>
        <form @submit.prevent="signIn">
          <div class="space-y-8 mt-8">
              <div>
                <input v-model="model.email" type="text" 
                :class=" model.errors.email ? 'w-full py-2 border border-red-500 focus:outline-red-500 px-2' : 'w-full py-2 border px-2'" placeholder="Email Address">
                <p class="text-sm absolute text-red-500"> {{ model.errors.email }}</p>
                <p class="text-sm absolute text-red-500"> {{ model.errors.invalid_credentials }}</p>
              </div>
              <div>
                <input v-model="model.password" type="password" :class=" model.errors.password ? 'w-full py-2 border border-red-500 focus:outline-red-500 px-2' : 'w-full py-2 border px-2'" placeholder="Password">
                <p class="text-sm absolute text-red-500"> {{ model.errors.password }}</p>
                <div class="flex items-start mt-8">
                    <div class="flex items-center h-5">
                    <input v-model="model.remember" type="checkbox" class="w-4 h-4 mt-1 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    </div>
                    <label for="remember" class="ml-2 text-gray-900">
                      Remember me
                    </label>
                </div>
              </div>

              <button class="px-3 py-2 mt-4 w-full bg-gray-800 text-white hover:bg-gray-700">
                  <div v-if="loadStatus">
                    Please wait...
                  </div>
                  <div v-else>
                    Sign In
                  </div>
              </button>
              <!-- <div class="text-center">
                  <router-link :to="{ name: 'ForgotPassword' }" class="text-sm text-gray-600 underline text-center m-0">
                      Forgot your password?
                  </router-link>
              </div> -->
          </div>
        </form>
    </div>
</div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import { useRouter } from 'vue-router'
import store from "../../store";

  const router = useRouter()
  const loadStatus = computed(() => store.state.authLoadStatus.loadStatus)
  const model = ref({
    email : '',
    password : '',
    remember : false,
    otp_code : '',
    errors : {
      email : '',
      password : '',
      invalid_credentials : '',
    },
  })

  if(localStorage.getItem('TOKEN')){
    router.push({ name : 'Home'})
  }

  const signIn = async () => {
    model.value.errors.email = ''
    model.value.errors.password = ''
    model.value.errors.invalid_credentials = ''

    const formData = new FormData()
    formData.append('email', model.value.email)
    formData.append('password', model.value.password)
    formData.append('remember', model.value.remember)
    try {
      await store.dispatch('signInAdminUser', formData)
      window.location = '/home'

    } catch (err) {
      store.state.authLoadStatus.loadStatus = false
      if (err.response.data.errors.hasOwnProperty('email')) {
        model.value.errors.email = err.response.data.errors.email[0]
      }
      if(err.response.data.errors.hasOwnProperty('password')){
        model.value.errors.password = err.response.data.errors.password[0]
      }
      if(err.response.data.errors.hasOwnProperty('invalid_credentials')){
        model.value.errors.invalid_credentials = err.response.data.errors.invalid_credentials[0]
      }
    }
  }

</script>

<style>

</style>