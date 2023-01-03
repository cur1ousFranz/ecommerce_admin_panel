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
          Create Product
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
                </div>
                <div class="w-full space-y-2">
                    <div class="space-y-2">
                        <label for="price">Price</label>
                        <input v-on:keypress="numbersOnly" id="price" type="text" class='w-full py-2 border px-2' placeholder="₱" maxlength="10">
                    </div>
                    <div class="space-y-2">
                      <label for="qty_stock">Qty Stock</label>
                      <input v-on:keypress="numbersOnly" id="qty_stock" type="text" class='w-full py-2 border px-2' placeholder="Ex. 10" maxlength="10">
                    </div>
                    <div class="space-y-2">
                      <label for="Color">Color: <span class="text-gray-700 font-semibold">{{ model.color }}</span></label>
                      <div class="grid grid-cols-8">
                        <svg @click="selectColor('yellow')" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" :class="[ model.color === 'yellow' ? 'bi bi-circle-fill m-1 rounded-full cursor-pointer ring ring-gray-500 ring-offset-2' : 'bi bi-circle-fill m-1 rounded-full cursor-pointer hover:ring hover:ring-gray-500 hover:ring-offset-2']" viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="8" class="text-yellow-500"/>
                        </svg>
                        <svg @click="selectColor('green')" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" :class="[ model.color === 'green' ? 'bi bi-circle-fill m-1 rounded-full cursor-pointer ring ring-gray-500 ring-offset-2' : 'bi bi-circle-fill m-1 rounded-full cursor-pointer hover:ring hover:ring-gray-500 hover:ring-offset-2']" viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="8" class="text-green-500"/>
                        </svg>
                        <svg @click="selectColor('blue')" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" :class="[ model.color === 'blue' ? 'bi bi-circle-fill m-1 rounded-full cursor-pointer ring ring-gray-500 ring-offset-2' : 'bi bi-circle-fill m-1 rounded-full cursor-pointer hover:ring hover:ring-gray-500 hover:ring-offset-2']" viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="8" class="text-blue-500"/>
                        </svg>
                        <svg @click="selectColor('violet')" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" :class="[ model.color === 'violet' ? 'bi bi-circle-fill m-1 rounded-full cursor-pointer ring ring-gray-500 ring-offset-2' : 'bi bi-circle-fill m-1 rounded-full cursor-pointer hover:ring hover:ring-gray-500 hover:ring-offset-2']" viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="8" class="text-violet-500"/>
                        </svg>
                        <svg @click="selectColor('red')" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" :class="[ model.color === 'red' ? 'bi bi-circle-fill m-1 rounded-full cursor-pointer ring ring-gray-500 ring-offset-2' : 'bi bi-circle-fill m-1 rounded-full cursor-pointer hover:ring hover:ring-gray-500 hover:ring-offset-2']" viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="8" class="text-red-600"/>
                        </svg>
                        <svg @click="selectColor('orange')" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" :class="[ model.color === 'orange' ? 'bi bi-circle-fill m-1 rounded-full cursor-pointer ring ring-gray-500 ring-offset-2' : 'bi bi-circle-fill m-1 rounded-full cursor-pointer hover:ring hover:ring-gray-500 hover:ring-offset-2']" viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="8" class="text-orange-500"/>
                        </svg>
                        <svg @click="selectColor('gray')" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" :class="[ model.color === 'gray' ? 'bi bi-circle-fill m-1 rounded-full cursor-pointer ring ring-gray-500 ring-offset-2' : 'bi bi-circle-fill m-1 rounded-full cursor-pointer hover:ring hover:ring-gray-500 hover:ring-offset-2']" viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="8" class="text-gray-500"/>
                        </svg>
                        <svg @click="selectColor('pink')" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" :class="[ model.color === 'pink' ? 'bi bi-circle-fill m-1 rounded-full cursor-pointer ring ring-gray-500 ring-offset-2' : 'bi bi-circle-fill m-1 rounded-full cursor-pointer hover:ring hover:ring-gray-500 hover:ring-offset-2']" viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="8" class="text-pink-500"/>
                        </svg>
                        <svg @click="selectColor('black')" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" :class="[ model.color === 'black' ? 'bi bi-circle-fill m-1 rounded-full cursor-pointer ring ring-gray-500 ring-offset-2' : 'bi bi-circle-fill m-1 rounded-full cursor-pointer hover:ring hover:ring-gray-500 hover:ring-offset-2']" viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="8" class="text-black"/>
                        </svg>
                        <svg @click="selectColor('white')" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" :class="[ model.color === 'white' ? 'bi bi-circle-fill m-1 rounded-full cursor-pointer ring ring-gray-500 ring-offset-2' : 'bi bi-circle-fill m-1 rounded-full cursor-pointer border-2 hover:ring hover:ring-gray-500 hover:ring-offset-2']" viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="8" class="text-white"/>
                        </svg>
                        <svg @click="selectColor('brown')" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" :class="[ model.color === 'brown' ? 'bi bi-circle-fill m-1 rounded-full cursor-pointer ring ring-gray-500 ring-offset-2' : 'bi bi-circle-fill m-1 rounded-full cursor-pointer hover:ring hover:ring-gray-500 hover:ring-offset-2']" viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="8" class="text-amber-600"/>
                        </svg>
                      </div>
                    </div>
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
                    <select @change="chooseCategory" v-model="model.mainCategoryId" id="category" class='w-full py-2 border px-2'>
                      <option v-for="category in mainCategories" :key="category.id" :value="category.id">
                        {{ category.name }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="w-full space-y-2">
                  <div class="space-y-2">
                    <label for="sub_category">Sub Category</label>
                    <select  @change="chooseSubCategory" v-model="model.subCategoryId" id="category" class='w-full py-2 border px-2'>
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
            <div v-for="attribute in attributes" :key="attribute.id" class="w-full py-2 flex flex-col space-x-0 md:space-x-6 md:flex-row">
              <!-- TODO ATTRIBUTES -->
              <!-- <div>
                <label v-if="attribute.name === 'Activity'" for="activity">Activity</label>
                <input v-if="attribute.name === 'Activity'" id="activity" type="text" class='w-full py-2 border px-2' placeholder="Ex. Black T-Shirt">

              </div> -->
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
import { computed, onMounted } from '@vue/runtime-core'
import store from '../../store'
import ProductModal from '../../components/ProductModal.vue'

  const isModalVisible = ref(false)
  const model = ref({
    sku : '',
    name : '',
    description : '',
    price : '',
    qty_stock : '',
    color : 'yellow',
    mainCategoryId : 1,
    subCategoryId : 4,
    attributeId : 4,
  })

  const mainCategories = computed(() => store.state.categories.mainCategory)
  const subCategories = computed(() => store.state.categories.subCategory)
  const attributes = computed(() => store.state.categories.attribute)
  onMounted(async () => {
    await store.dispatch('getMainCategory')
    await store.dispatch('getSubCategory', model.value.mainCategoryId)
    await store.dispatch('getAttribute', model.value.subCategoryId)
  })

  const showModal = () => isModalVisible.value = true
  const closeModal = () => isModalVisible.value = false

  const confirm = () => {
    console.log('confirmed')
  }

  const numbersOnly = (evt) => {
    evt = (evt) ? evt : window.event
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
      evt.preventDefault()
    } else {
      return true
    }
  }

  const selectColor = (color) => {
    model.value.color = color
  }

  const chooseCategory = async () => { 
    const res = await store.dispatch('getSubCategory', model.value.mainCategoryId)
    model.value.subCategoryId = res.data.data[0].id
    await store.dispatch('getAttribute', model.value.subCategoryId)
  }

  const chooseSubCategory = async () => { 
    await store.dispatch('getAttribute', model.value.subCategoryId)
  }

</script>