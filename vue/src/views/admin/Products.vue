<template>
  <div class="space-y-2">
    <div class="flex justify-between">
        <div>
            <p>Show 
                <span>
                    <select name="" id="" class="border px-2">
                        <option value="">10</option>
                        <option value="">20</option>
                        <option value="">30</option>
                    </select>
                </span>
                Entries
            </p>
        </div>
        <div class="flex space-x-3">
            <input type="text" class=' py-2 border px-2' placeholder="Search">
            <button @click="showModal" class="px-3 py-2 space-x-2 bg-gray-800 text-sm text-white hover:bg-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="inline-block bi bi-plus-square" viewBox="0 0 16 16">
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
                <span>PRODUCT</span>
            </button>
        </div>
    </div>
    <table class="table-fixed shadow-md h-full w-full text-sm text-gray-500">
      <thead class="text-xs text-gray-900 uppercase">
        <tr>
          <th scope="col" class="py-3 px-6">SKU</th>
          <th scope="col" class="py-3 px-6">Name</th>
          <th scope="col" class="py-3 px-6">Qty</th>
          <th scope="col" class="py-3 px-6">Price</th>
          <th scope="col" class="py-3 px-6">Sale Price</th>
        </tr>
      </thead>
      <tbody class="text-center">
        <tr>
          <td>sho/us-/yes/no</td>
          <td>Jordan 21</td>
          <td>10</td>
          <td>₱ 1,200</td>
          <td>0</td>
        </tr>
      </tbody>
    </table>
    <ProductModal v-show="isModalVisible" @close="closeModal" @some-event="confirm" >
        <template v-slot:header>
          Product
        </template>

        <template v-slot:body>
            <div>
                <h1 class="font-semibold ">Details</h1>
            </div>
            <div class="w-full py-2 flex flex-col space-x-0 md:space-x-6 md:flex-row">
                <div class="w-full space-y-2">
                    <div class="space-y-2">
                        <label for="sku">SKU</label>
                        <input id="sku" type="text" class='w-full py-2 border px-2' placeholder="Ex. TSH-FFF-M">
                    </div>
                    <div class="space-y-2">
                        <label for="name">Name</label>
                        <input id="name" type="text" class='w-full py-2 border px-2' placeholder="Ex. Oxygn Apparrel">
                    </div>
                    <div class="space-y-2">
                        <label for="deescription">Description</label>
                        <input id="deescription" type="text" class='w-full py-2 border px-2' placeholder="Ex. Black T-Shirt">
                    </div>
                    <div class="space-y-2">
                        <label for="qty_stock">Qty Stock</label>
                        <input id="qty_stock" type="text" class='w-full py-2 border px-2' placeholder="Ex. 10">
                    </div>
                </div>
                <div class="w-full space-y-2">
                    <div class="space-y-2">
                        <label for="price">Price</label>
                        <input id="price" type="text" class='w-full py-2 border px-2' placeholder="Price">
                    </div>
                    <div class="space-y-2">
                        <label for="category">Category</label>
                        <input id="category" type="text" class='w-full py-2 border px-2' placeholder="Category">
                    </div>
                    <div class="space-y-2">
                        <label for="attribute">Attribute</label>
                        <input id="attribute" type="text" class='w-full py-2 border px-2' placeholder="Description">
                    </div>
                    <div class="space-y-2">
                        <label for="value">Value</label>
                        <input id="value" type="text" class='w-full py-2 border px-2' placeholder="Value">
                    </div>
                </div>
            </div>
            <div class="mb-6 space-x-6">
                <h1 class="font-semibold  mt-3">Product Image</h1>
                <label for="image" class="cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="92" height="92" fill="currentColor" class="bi bi-plus border border-gray-900 py-5 px-5" viewBox="0 0 16 16">
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>
                </label>
                <input id="image" type="file" class='w-2 py-2 border px-2' hidden>
            </div>
        </template>

        <template v-slot:footer>
          This is a new modal footer.
        </template>
    </ProductModal>
  </div>
</template>

<script setup>
import { ref } from '@vue/reactivity'
import ProductModal from '../../components/ProductModal.vue'

    const isModalVisible = ref(false)

    function showModal(){
      isModalVisible.value = true
    }

    function confirm(){
      console.log('confirmed');
    }

    function closeModal(){
      isModalVisible.value = false
    }
</script>

<style>
</style>