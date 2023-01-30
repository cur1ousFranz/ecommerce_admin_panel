<template>
  <div class="space-y-2">
   
    <div v-if="model.errors.connection" class="relative flex justify-center">
      <div class="absolute border -mt-4 w-1/2 rounded text-center p-4 z-10 bg-red-500 text-white">
        <p>Something went wrong!</p>
      </div>
    </div>
    <div class="flex flex-col-reverse md:flex-row md:justify-between">
      <div class="flex flex-col py-2 space-y-2 md:space-y-0 md:space-x-4 md:flex-row ">
          <p class="text-sm">Show
              <span>
                  <select @change="chooseEntry" v-model="model.entries.currentEntry"  class="border px-2">
                      <option v-for="entry in model.entries.showEntries" :key="entry" :value="entry">
                        {{ entry }}
                      </option>
                  </select>
              </span>
              Entries
          </p>
          <div class="flex justify-between">
            <p class="text-sm">
              Sort By:
              <span>
                    <select @change="chooseSort" v-model="model.sort.currentSort" class="border px-2">
                        <option v-for="sort in model.sort.sortList" :key="sort" :value="sort">
                          {{ sort }}
                        </option>
                    </select>
                </span>
            </p>
          </div>
      </div>
      <div class="flex justify-between space-x-2">
        <div class="px-2 border flex justify-between">
          <input v-model="model.details.search" @keyup="searchProduct" type="text" 
          class='px-4 py-2 ring-white focus:ring-0 focus:outline-none' placeholder="Search">
          <span @click="clearSearch" :class="[model.details.search ? 'mt-3 cursor-pointer hover:text-red-500' 
          : 'hidden mt-3 cursor-pointer hover:text-red-500']">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
            </svg>
          </span>
        </div>
        <button @click="showProductModal(false)" class="px-3 py-2 space-x-2 bg-gray-800 text-sm text-white hover:bg-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="inline-block bi bi-plus-square" viewBox="0 0 16 16">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
            <span>PRODUCT</span>
        </button>
      </div>
    </div>
    <table class="table-auto shadow-md h-full w-full text-sm text-gray-500">
      <thead class="text-xs text-gray-900 border-b border-t uppercase">
        <tr>
          <th scope="col" class="py-3 px-6">SKU</th>
          <th scope="col" class="py-3 px-6">Name</th>
          <th scope="col" class="py-3 px-6">Qty / Sold</th>
          <th scope="col" class="py-3 px-6">Price</th>
          <th scope="col" class="py-3 px-6">Sale Price</th>
        </tr>
      </thead>
      <tbody v-if="model.products.productList" class="text-center">
        <tr v-for="product in model.products.productList.data" :key="product.id" class="hover:text-gray-900 hover:bg-gray-200">
          <td class="py-2">{{ product.product_item.sku }}</td>
          <td class="py-2">{{ product.name }}</td>
          <td class="py-2">{{ product.product_item.qty_stock }} / 0</td>
          <td class="py-2">₱ {{ formatPrice(product.product_item.price) }}</td>
          <td class="py-2 flex justify-between">
            <p class="text-center w-full">
              {{ product.product_item.sale_price ?? 0  }}
            </p>
            <div class="">
              <div class="relative inline-block text-left">
                <button class="text-gray-400 hover:text-gray-900" @click="showDotDropdown(product.id)">
                  <span class="inline-block">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                      <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                    </svg>
                  </span>
                </button>
                <div :id="product.id" class="dot-dropdown absolute right-0 z-10 border w-36 rounded-md shadow-lg hidden">
                  <div class="rounded-md bg-white shadow-xs text-center">
                    <div class="flex justify-start px-4 py-2 space-x-2 w-full hover:bg-gray-200 hover:text-black">
                      <!-- EDIT BUTTON -->
                      <button @click="showProductModal(true, product.id)" class="flex space-x-2 w-full">
                        <span class="mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                          </svg>
                        </span>
                        <p>Edit</p>
                      </button>
                    </div>
                    <div class="flex justify-start px-4 py-2 space-x-2 w-full hover:bg-gray-200 hover:text-black">
                        <!-- DELETE BUTTON -->
                       <button @click="showDeleteProductModal(product.id)" class="flex space-x-2 w-full">
                        <span class="mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                          </svg>
                        </span>
                        <p>Delete</p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
      <tbody v-if="productsLoading">
        <tr>
          <td colspan="5" class="py-6 text-center">
            Loading...
          </td>
        </tr>
      </tbody>
    </table>
    <div class="flex justify-between py-1">
      <p class="text-gray-500 text-sm">Result total: {{ model.products.productList.total }}</p>
      <Pagination :pagination="model.products.productList" @paginate="view" :offset="4"></Pagination>
    </div>

    <!-- PRODUCT MODAL -->
    <ProductModal v-show="isProductModalVisible" @close="closeProductModal" @some-event="confirmProduct" 
    :loading="productLoading">
        <template v-slot:header>
          {{ isEditing ? 'Edit Product' : 'Create Product '}}
        </template>

        <template v-slot:body>
          <div>
            <h1 class="font-semibold ">Details</h1>
          </div>
          <div class="w-full py-2 flex flex-col space-x-0 md:space-x-6 md:flex-row">
            <div class="w-full space-y-4">
                <Input v-model="model.details.sku" label="SKU" placeholder="Ex. TSH-FFF-M" 
                :error="model.errors.sku"/>
                <Input v-model="model.details.name" label="Name" placeholder="Ex. Oxygn Apparrel" 
                :error="model.errors.name"/>
              </div>
            <div class="w-full space-y-4">
              <Input v-model="model.details.price" v-on:keypress="numberkey" label="Price" placeholder="₱" 
              :error="model.errors.price"/>
              <Input v-model="model.details.qty_stock" v-on:keypress="numberkey" 
              label="Qty Stock (All Sizes)" placeholder="Ex. 10" :error="model.errors.qty_stock"/>
            </div>
          </div>
          <div>
            <hr class="mt-4">
            <h1 class="font-semibold my-3">Product Category</h1>
          </div>
          <div class="w-full py-2 flex flex-col space-x-0 md:space-x-6 md:flex-row">
              <div class="w-full space-y-2">
                <div class="space-y-2">
                  <label for="category">Category</label>
                  <select @change="chooseCategory" v-model="model.categories.mainCategoryId" id="category" class='w-full py-2 border px-2'>
                    <option v-for="category in mainCategories" :key="category.id" :value="category.id">
                      {{ category.name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="w-full space-y-2">
                <div class="space-y-2">
                  <label for="sub_category">Sub Category</label>
                  <select  @change="chooseSubCategory" v-model="model.categories.subCategoryId" id="category" class='w-full py-2 border px-2'>
                    <option v-for="category in subCategories" :key="category.id" :value="category.id" >
                      {{ category.name }}
                    </option>
                  </select>
                </div>
              </div>
          </div>
          <div>
            <hr class="mt-4">
            <h1 class="font-semibold my-3">Product Attributes</h1>
          </div>
          <div class="w-full grid grid-cols-1 py-2 gap-x-5 md:grid-cols-2">
            <div v-for="attribute in model.attributes.attributeList" :key="attribute.id">
              <div id="color" class="space-y-2 relative" v-if="attribute.name === 'Color'">
                <label class="mt-5 inline-block">Color: <span class="text-gray-700 font-semibold mt-4">{{ model.details.color }}</span></label>
                <div class="grid grid-cols-8">
                  <Color v-for="color in model.colors" :key="color" 
                  @click="selectColor(color.color)" :color="color.color" 
                  :currentColor="model.details.color" :circleColor="color.class"/>
                </div>
              </div>
              <div id="size" class="relative" v-if="attribute.name === 'Size'">
                <h1 class="text-gray-800 mt-5">Size</h1>
                <div class="grid grid-cols-4 lg:grid-cols-8 gap-2">
                  <Size v-for="size in model.sizes.sizeList" :key="size" 
                  @click="showSizeModal(size.name)" :size="size" />
                </div>
              </div>
              <div v-if="attribute.name !== 'Color' && attribute.name !== 'Size'" class="relative">
                <div class="flex justify-between">
                  <label :for="attribute.name" class="mt-5">{{ attribute.name }}</label>
                  <button @click="showValueModal(attribute.name, attribute.id)" class="mt-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-plus-circle mt-2" viewBox="0 0 16 16">
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>
                  </button>
                </div>
                <select :id="attribute.name" 
                class='attribute w-full py-2 border px-2 mt-2'>
                  <option selected disabled>Select</option>
                  <option v-for="value in attribute.values" :key="value.id" :value="value.name" class="flex justify-between">
                    {{ value.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div id="imageSelect" class="relative mb-6 space-x-6">
            <h1 class="font-semibold  my-4">Product Image 
              ( {{ model.images.imageBase64.length }}/6 ) 
              <span class="text-gray-600 font-light">Recommended Size ( 600 x 799 )</span>
            </h1>
            <div class="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              
              <div v-for="(image, index) in model.images.imageBase64" :key="image" class="relative">
                <img :src="image" class="border shadow-md mt-1" 
                style="min-height: 112px; min-width: 112px; max-height: 112px; max-width: 112px" :alt="image">
                <span @click="removeImage(index)" class="absolute -mt-28 ml-24 cursor-pointer hover:text-red-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                  </svg>
                </span>
              </div>
              <div v-if="model.images.imageBase64.length < 6 && !isEditing">
                <label for="image" class="cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="112" height="112" fill="currentColor" class="bi bi-plus border border-gray-900 py-5 px-5" viewBox="0 0 16 16">
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>
                </label>
                <input @change="chooseImage" id="image" type="file" 
                class='w-2 py-2 border px-2' accept="image/png, image/jpeg, image/webp" hidden multiple>
              </div>
            </div>
          </div>
        </template>

    </ProductModal>
    
    <Modal v-show="isValueModalVisible" @closeModal="closeValueModal" 
    @confirmModal="confirmCreateValue">

      <template v-slot:header>
        Create {{ model.attributes.attributeName }} Value
      </template>

      <template v-slot:body>
        <Input v-model="model.attributes.newAttributeValue" label="Value" placeholder="Value" 
        :error="model.errors.valueError"/>
      </template>
    </Modal>

    <Modal v-show="isSizeModalVisible" @closeModal="closeSizeModal" 
    @confirmModal="confirmSelectSize">

      <template v-slot:header>
        Enter total of {{ model.sizes.selectedSize }} size
      </template>

      <template v-slot:body>
        <Input v-model="model.sizes.totalOfSize" v-on:keypress="numberkey" maxlength="4" label="Total" placeholder="Total" 
        :error="model.errors.valueError"/>
<!-- 
        <input v-model="model.sizes.totalOfSize" type="text" class="w-full py-2 border px-2" 
        v-on:keypress="numberkey" placeholder="Total" min="0" maxlength="3"> -->
      </template>
    </Modal>

    <Modal v-show="isDeleteModalVisible" @closeModal="closeDeleteProductModal" @confirmModal="confirmDeleteProduct(model.products.currentProduct.id)">
      <template v-slot:header>
       <span class="inline-block">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-trash text-red-500" viewBox="0 0 16 16">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
          <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
        </svg>
        </span> 
        Delete
      </template>

      <template v-slot:body>
        <p class="text-lg text-center">
          You want to permanently deleted this product with <br> 
         SKU: <span class="font-semibold italic"  v-if="model.products.currentProduct">
          {{ model.products.currentProduct.product_item.sku  }}</span> ?
        </p>
      </template>
    </Modal>

    <Modal v-show="isDeleteImageModal" @closeModal="closeDeleteImageModal" 
    @confirmModal="confirmDeleteImageModal">
      <template v-slot:header>
       <span class="inline-block">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-trash text-red-500" viewBox="0 0 16 16">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
          <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
        </svg>
        </span> 
        Delete
      </template>

      <template v-slot:body>
        <p class="text-lg text-center">
          You want to permanently deleted this image? 
        </p>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from '@vue/reactivity'
import { computed, onMounted, watch } from '@vue/runtime-core'
import alert from '../../alert.js'
import axiosClient from '../../axios'
import numberkey from '../../numberkey.js'
import store from '../../store'
import ProductModal from '../../components/ProductModal.vue'
import Pagination from '../../components/Pagination.vue'
import Modal from '../../components/Modal.vue'
import Color from '../../components/Icons/Color.vue'
import Size from '../../components/Icons/Size.vue'
import Input from '../../components/form/Input.vue'

  const isProductModalVisible = ref(false)
  const isValueModalVisible = ref(false)
  const isSizeModalVisible = ref(false)
  const isDeleteModalVisible = ref(false)
  const isDeleteImageModal = ref(false)
  const isEditing = ref(false)
  const model = ref({
    details : {
      sku : '',
      name : '',
      price : '',
      qty_stock : '',
      color : '',
      search : ''
    },
    categories : {
      mainCategoryId : 1,
      subCategoryId : 4,
    },
    attributes : {
      attributeId : 4,
      attributeList : [],
      attributeName : '',
      newAttributeValue : '',
    },
    values : '',
    sizes : {
      sizeList : [ 
        { name : 'XXS', count : 0 }, { name : 'XS', count : 0 }, { name : 'S', count : 0 }, 
        { name : 'M', count : 0 }, { name : 'L', count : 0 }, { name : 'XL', count : 0 },
        { name : 'XXL', count : 0 }, { name : 'XXXL', count : 0 }, { name : '1XL', count : 0 },    
        { name : '2XL', count : 0 }, { name : '3XL', count : 0 }, { name : '4XL', count : 0 },   
        { name : '5XL', count : 0 }, 
      ],
      selectedSize : '',
      totalOfSize : 0,
    },
    images : {
      imageBase64: [],
      productImages: [],
      deletedImage : [],
      deleteImageIndex : null
    },
    products : {
      productList : [],
      currentProduct : '',
    },
    colors : [
      { color : 'Yellow', class : 'text-yellow-500'},  { color : 'Green', class : 'text-green-500'}, 
      { color : 'Blue', class : 'text-blue-500'},  { color : 'Violet', class : 'text-violet-500'}, 
      { color : 'Red', class : 'text-red-500'},  { color : 'Orange', class : 'text-orange-500'}, 
      { color : 'Gray', class : 'text-gray-500'},  { color : 'Pink', class : 'text-pink-500'}, 
      { color : 'Black', class : 'text-black'},  { color : 'White', class : 'text-white'}, 
      { color : 'Brown', class : 'text-amber-600'}, 
    ],
    entries : {
      showEntries : [10, 25, 50, 100],
      currentEntry : 10
    },
    sort : {
      sortList : ['Latest', 'Oldest', 'Sku', 'Name', 'Qty', 'Price'],
      currentSort : 'Latest'
    },
    paginate : {
      currentPage : 1
    },
    errors : {
      valueError : '',
      sku : '',
      name : '',
      price : '',
      qty_stock : '',
      connection : false
    },
    
  })

  const mainCategories = computed(() => store.state.categories.mainCategory)
  const subCategories = computed(() => store.state.categories.subCategory)
  const productsLoading = computed(() => store.state.products.loading)
  const productLoading = computed(() => store.state.products.createProductLoading)

  watch(() => store.state.categories.attribute,
    (newVal, oldVal) => model.value.attributes.attributeList = newVal
  )

  watch(() => store.state.products.data,
    (newVal, oldVal) => model.value.products.productList = newVal
  )

  watch(() => store.state.products.currentProduct,
    (newVal, oldVal) =>  model.value.products.currentProduct = newVal
  )

  onMounted(async () => {
    try {
      await store.dispatch('getMainCategory')
      await store.dispatch('getSubCategory', model.value.categories.mainCategoryId)
      getAttribute()
      getAllProducts()
    } catch (error) {
      model.value.errors.connection = true
    }
  })

  // MODALS
  const showSizeModal = (size) => {
    isSizeModalVisible.value = true
    selectSize(size)
  }
  const closeSizeModal = () => isSizeModalVisible.value = false
  const showProductModal = async (editing, id = null) => {
    isEditing.value = editing
    if(editing){
      await store.dispatch('getProduct', id)
      const dropdown = document.getElementById(`${id}`)
      dropdown.classList.add('hidden')

      // Setting all fields baseon on current product details
      const product = model.value.products.currentProduct
      isProductModalVisible.value = true
      model.value.details.sku = product.product_item.sku
      model.value.details.name = product.name
      model.value.details.price = product.product_item.price
      model.value.details.qty_stock = product.product_item.qty_stock
      model.value.images.imageBase64 = JSON.parse(product.product_item.product_image)
      model.value.sizes.sizeList = JSON.parse(product.description).Size
      model.value.details.color = JSON.parse(product.description).Color
      
      // Changing id's of categories and call category request
      model.value.categories.mainCategoryId = product.categories[0].parent_id
      model.value.categories.subCategoryId = product.categories[0].id
      chooseCategory()

      // Adding delay so that all attributes 'select element' should be filled in DOM.
      // Selecting all attribute's value based on current products attributes
      setTimeout(() => {
        for (const [key, value] of Object.entries(JSON.parse(product.description))) {
          if(key !== 'color' && key !== 'size'){
            const element = document.getElementById(`${key}`)
            if (element) element.value = value
          }
        }
      }, 2000)

    } else {
      isProductModalVisible.value = true
    }
  }
  const closeProductModal = () => {
    isProductModalVisible.value = false
    // Reset the fields to default values
    if(isEditing.value){
      model.value.details.sku = ''
      model.value.details.name = ''
      model.value.details.price = ''
      model.value.details.qty_stock = ''
      model.value.details.color = ''
      model.value.images.imageBase64 = []
      model.value.sizes.sizeList.forEach(el => el.count = 0)
      model.value.categories.mainCategoryId = 1
      model.value.categories.subCategoryId = 4
      chooseCategory()
    }
  }
  const closeValueModal = () => isValueModalVisible.value = false
  const showValueModal = (attributeName, attributeId) => {
    isValueModalVisible.value = true
    model.value.attributes.attributeName = attributeName
    model.value.attributes.attributeId = attributeId
  }
  const closeDeleteProductModal = () => isDeleteModalVisible.value = false
  const showDeleteProductModal = async (id) => {
    isDeleteModalVisible.value = true
    const dropdown = document.getElementById(`${id}`)
    dropdown.classList.add('hidden')
    await store.dispatch('getProduct', id)
  }
  const closeDeleteImageModal = () => isDeleteImageModal.value = false
  const confirmDeleteImageModal = () => {
    const index = model.value.images.deleteImageIndex
    const image = model.value.images.imageBase64.splice(index, 1)
    model.value.images.deletedImage.push(image)
    isDeleteImageModal.value = false
  }

  // MODAL FUNCTIONS
  const confirmSelectSize = () => {
    const size = model.value.sizes.selectedSize
    const totalSize = model.value.sizes.totalOfSize
    model.value.sizes.sizeList.forEach(obj => {
        if(obj.name === size){
          obj.count = totalSize != 0 ? parseInt(totalSize) : 0
        }
    })
    closeSizeModal()
    model.value.sizes.selectedSize = ''
    model.value.sizes.totalOfSize = 0
  }

  const confirmProduct = async () => {

    // Removing all errors
    const errors = document.querySelectorAll('.error')
    errors.forEach(element => element.remove())
    model.value.errors.name = ''
    model.value.errors.sku = ''
    model.value.errors.qty_stock = ''
    model.value.errors.price = ''

    // Validate all attributes if all fields are selected
    const attributes = document.querySelectorAll('.attribute')
    let attributeSelected = false

    attributes.forEach(element   => {
      if(element.value == 'Select'){
        element.classList.add('border-red-500')
        let parent = element.parentElement
        const paragraph = document.createElement("p");
        paragraph.classList = 'error absolute text-red-500 text-sm'
        const node = document.createTextNode(`${element.id} is required.`);
        paragraph.appendChild(node);
        parent.appendChild(paragraph);
      }else{
        element.classList.remove('border-red-500')
        attributeSelected = true
      }
    })
    
    // Validate if there is attribute "Size" in attiribute list.
    // if there is, then validate if user already selected sizes
    const array = model.value.attributes.attributeList
    let exist = false
    let sizeSelected = false
    array.forEach(el => el.name === 'Size' ? exist = true : '')
    
    if(exist) model.value.sizes.sizeList.forEach(el => el.count != 0 ? sizeSelected = true : '')

    if(!sizeSelected){
      let element = document.querySelector('#size')
      const paragraph = document.createElement("p");
      paragraph.classList = 'error absolute text-red-500 text-sm'
      const node = document.createTextNode(`Size is required.`);
      paragraph.appendChild(node);
      element.appendChild(paragraph);
    }

    // Validate if there is color selected
    let colorSelected = true
    if(model.value.details.color === ''){
      colorSelected = false
      let element = document.querySelector('#color')
      const paragraph = document.createElement("p");
      paragraph.classList = 'error absolute text-red-500 text-sm'
      const node = document.createTextNode(`Color is required.`);
      paragraph.appendChild(node);
      element.appendChild(paragraph);
    }

    // Validate if there are images uploaded
    let imageSelected = false
    if(model.value.images.imageBase64.length < 2){
      let element = document.querySelector('#imageSelect')
      const paragraph = document.createElement("p");
      paragraph.classList = 'error absolute text-red-500 text-sm'
      const node = document.createTextNode(`Must atleast 2 images.`);
      paragraph.appendChild(node);
      element.appendChild(paragraph);
    }else{
      imageSelected = true
    }
    
    // Validate qty stock if equal with sizes count
    let qtyStockSizeEqual = false
    let total = 0
    model.value.sizes.sizeList.forEach(el => total += el.count)
    if(total != model.value.details.qty_stock && sizeSelected){
      let element = document.querySelector('#size')
      const paragraph = document.createElement("p");
      paragraph.classList = 'error absolute text-red-500 text-sm'
      const node = document.createTextNode(`Sizes total must equal in Qty Stock.`);
      paragraph.appendChild(node);
      element.appendChild(paragraph);
    } else{
      qtyStockSizeEqual = true
    }
    
    try {
      if(attributeSelected && sizeSelected && colorSelected && imageSelected && qtyStockSizeEqual){
        const attributeObj = {}
        attributes.forEach(element => attributeObj[element.id] = element.value)
        attributeObj.Color = model.value.details.color
        attributeObj.Size = model.value.sizes.sizeList

        const formData = new FormData()
        if(isEditing.value){
          model.value.images.deletedImage.forEach(element => formData.append('deleted_image[]', element))
        } else {
          model.value.images.productImages.forEach(element => formData.append('product_image[]', element))
        }

        formData.append('name', model.value.details.name)
        formData.append('description', JSON.stringify(attributeObj)) 
        formData.append('sku', model.value.details.sku)
        formData.append('qty_stock', model.value.details.qty_stock)
        formData.append('price', model.value.details.price)
        formData.append('entry', model.value.entries.currentEntry)
        formData.append('sort', model.value.sort.currentSort)
        formData.append('current_page', model.value.paginate.currentPage)
        if(!isEditing.value){
          formData.append('category_id', model.value.categories.subCategoryId)
          await store.dispatch('createProduct', formData)
        } else {
          formData.append('product_id', model.value.products.currentProduct.id)
          formData.append("_method", "put");
          await store.dispatch('updateProduct', formData)
        }   

        // Reset fields after success creating product
        model.value.details.sku = ''
        model.value.details.name = ''
        model.value.details.price = ''
        model.value.details.qty_stock = ''
        model.value.details.color = ''
        model.value.images.imageBase64 = []
        model.value.images.productImages = []
        model.value.sizes.sizeList.forEach(el => el.count = 0)
        closeProductModal()
        isEditing.value ? alert('Product updated success!') : alert('Product created success!')
       
      }
    } catch (err) {
      if (err.response.data.errors.hasOwnProperty('sku')) {
        model.value.errors.sku = err.response.data.errors.sku[0]
      }
      if(err.response.data.errors.hasOwnProperty('name')){
        model.value.errors.name = err.response.data.errors.name[0]
      }
      if(err.response.data.errors.hasOwnProperty('qty_stock')){
        model.value.errors.qty_stock = err.response.data.errors.qty_stock[0]
      }
      if(err.response.data.errors.hasOwnProperty('price')){
        model.value.errors.price = err.response.data.errors.price[0]
      }
      store.state.products.createProductLoading = false
    }

  }

  const confirmCreateValue = async () => {
    model.value.errors.valueError = ''
    const formData = new FormData()
    formData.append('name', model.value.attributes.newAttributeValue)
    formData.append('attribute_id', model.value.attributes.attributeId)
    formData.append('category_id', model.value.categories.subCategoryId)
    try {
      await store.dispatch('createValue', formData)
      closeValueModal()
      alert('Value created successfully!')
      model.value.attributes.newAttributeValue = ''
    } catch (error) {
      model.value.errors.valueError = error.response.data.errors.name[0];
    }
  }

  const confirmDeleteProduct = async (product_id) => {
    if(product_id){
      const formData = new FormData()
      formData.append('entry', model.value.entries.currentEntry)
      formData.append('sort', model.value.sort.currentSort)
      formData.append('current_page', model.value.paginate.currentPage)
      formData.append('product_id', product_id)
      formData.append("_method", "delete")
      await store.dispatch('deleteProduct', formData)
      isDeleteModalVisible.value = false
      alert('Product deleted successfully!')
    }
  }

  const selectColor = (color) => model.value.details.color = color
  const selectSize = (size) => {
    model.value.sizes.selectedSize = size
    model.value.sizes.sizeList.forEach(obj => {
      if(obj.name === size){
        model.value.sizes.totalOfSize = obj.count
      }
    })
  }

  const chooseCategory = async () => {
    try {
      const res = await store.dispatch('getSubCategory', model.value.categories.mainCategoryId)
      model.value.categories.subCategoryId = res.data.data[0].id
      getAttribute()
    } catch (error) {
      model.value.errors.connection = true
    }
  }

  const chooseSubCategory = async () =>  getAttribute()

  const chooseImage = () => {
    let image = document.querySelector('#image')
    for (let index = 0; index < image.files.length; index++) {
      let file = image.files[index]
      if(file.type === 'image/png' || file.type === 'image/webp' || file.type === 'image/jpeg'){
        let reader = new FileReader();
        reader.onloadend = () => {
          if(model.value.images.imageBase64.length < 6){
            model.value.images.imageBase64.push(reader.result);
            model.value.images.productImages.push(file);
          }
        }
        reader.readAsDataURL(file);
      }
    }
  }

  const removeImage = (index) => {

    if(isEditing.value) {
      // Show confirmation if editing product
      if(model.value.images.imageBase64.length < 3){
        const errors = document.querySelectorAll('.error')
        errors.forEach(element => element.remove())

        let element = document.querySelector('#imageSelect')
        const paragraph = document.createElement("p");
        paragraph.classList = 'error absolute text-red-500 text-sm'
        const node = document.createTextNode(`Must atleast 2 images.`);
        paragraph.appendChild(node);
        element.appendChild(paragraph);
      }else{
        isDeleteImageModal.value = true
        model.value.images.deleteImageIndex = index
      }
      
    } else {
      model.value.images.imageBase64.splice(index, 1)
      model.value.images.productImages.splice(index, 1)
    }
  }

  const view = async () => {
    try {
      let current_page = model.value.products.productList.current_page
      let pageNum = current_page ? current_page : 1
      model.value.paginate.currentPage = pageNum
      const formData = new FormData()
      formData.append('entry', model.value.entries.currentEntry)
      formData.append('sort', model.value.sort.currentSort)
      formData.append('current_page', model.value.paginate.currentPage)
      formData.append("_method", "get")
      const res = await axiosClient.post(`/product/?page=${pageNum}`, formData)
      model.value.products.productList = res.data.data
    } catch (error) {
      model.value.errors.connection = true
    }
  }

  const showDotDropdown = (id) => {
    const dropdown = document.getElementById(`${id}`)
    const dropdowns = document.querySelectorAll('.dot-dropdown')

    dropdowns.forEach(element => {
      const button = element.previousSibling

      if(element.id === dropdown.id){
        if(element.classList.contains('hidden')){
          element.classList.remove('hidden')
          button.classList.add('text-gray-900')
        }else{
          element.classList.add('hidden')
          button.classList.remove('text-gray-900')
        }
      }else{
        element.classList.add('hidden')
        button.classList.remove('text-gray-900')
      }
    })
  }

  const chooseEntry = () => getAllProducts()
  const chooseSort = async () => getAllProducts()
  const searchProduct = () => {
    // Debouncing
    setTimeout(() => {
      const formData = new FormData()
      formData.append('search', model.value.details.search)
      formData.append('entry', model.value.entries.currentEntry)
      store.dispatch('searchProduct', formData)
    }, 500)
  }

  const clearSearch = () => {
    model.value.details.search = ''
    searchProduct()
  }

  const getAllProducts = async () => {
    try {
      const formData = new FormData()
      formData.append('entry', model.value.entries.currentEntry)
      formData.append('sort', model.value.sort.currentSort)
      formData.append('current_page', model.value.paginate.currentPage)
      formData.append("_method", "get")
      const res = await store.dispatch('getAllProducts', formData)
      return res.data
    } catch (error) {
      model.value.errors.connection = true
    }
  } 

  const getAttribute = async () => {
    try {
      const res = await store.dispatch('getAttribute', model.value.categories.subCategoryId)
      return res
    } catch (error) {
      model.value.errors.connection = true
    }
  }

  const formatPrice = (price) => {
    return price.toLocaleString()
  }
</script>