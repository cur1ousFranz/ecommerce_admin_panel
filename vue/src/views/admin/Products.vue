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
    <ProductModal v-show="isModalVisible" @close="closeModal" @some-event="confirmCreateProduct" >
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
                </div>
                <div class="w-full space-y-2">
                  <div class="space-y-2">
                      <label for="price">Price</label>
                      <input v-on:keypress="numberkey" id="price" type="text" class='w-full py-2 border px-2' placeholder="₱" maxlength="10">
                  </div>
                  <div class="space-y-2">
                    <label for="qty_stock">Qty Stock (All Sizes)</label>
                    <input v-on:keypress="numberkey" id="qty_stock" type="text" class='w-full py-2 border px-2' placeholder="Ex. 10" maxlength="10">
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
                <div class="space-y-2" v-if="attribute.name === 'Color'">
                  <label>Color: <span class="text-gray-700 font-semibold">{{ model.details.color }}</span></label>
                  <div class="grid grid-cols-8">
                    <Color @click="selectColor('yellow')" color="yellow" :currentColor="model.details.color" circleColor="text-yellow-500"/>
                    <Color @click="selectColor('green')" color="green" :currentColor="model.details.color" circleColor="text-green-500"/>
                    <Color @click="selectColor('blue')" color="blue" :currentColor="model.details.color" circleColor="text-blue-500"/>
                    <Color @click="selectColor('violet')" color="violet" :currentColor="model.details.color" circleColor="text-violet-500"/>
                    <Color @click="selectColor('red')" color="red" :currentColor="model.details.color" circleColor="text-red-600"/>
                    <Color @click="selectColor('orange')" color="orange" :currentColor="model.details.color" circleColor="text-orange-500"/>
                    <Color @click="selectColor('gray')" color="gray" :currentColor="model.details.color" circleColor="text-gray-500"/>
                    <Color @click="selectColor('pink')" color="pink" :currentColor="model.details.color" circleColor="text-pink-500"/>
                    <Color @click="selectColor('black')" color="black" :currentColor="model.details.color" circleColor="text-black"/>
                    <Color @click="selectColor('white')" color="white" :currentColor="model.details.color" circleColor="text-white"/>
                    <Color @click="selectColor('brown')" color="brown" :currentColor="model.details.color" circleColor="text-amber-600"/>
                  </div>
                </div>
                <div v-if="attribute.name === 'Size'">
                  <h1 class="text-gray-800">Size</h1>
                  <div class="grid grid-cols-8 gap-2">
                    <Size v-for="size in model.sizes.sizeList" :key="size" 
                    @click="showSizeModal(size.name)" :size="size" />
                  </div>
                </div>
                <div v-if="attribute.name !== 'Color' && attribute.name !== 'Size'">
                  <div class="flex justify-between">
                    <label :for="attribute.name">{{ attribute.name }}</label>
                    <button @click="showValueModal(attribute.name, attribute.id)">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                      class="bi bi-plus-circle mt-2" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                      </svg>
                    </button>
                  </div>
                  <!-- TODO | LOOP VALUES ON SPECIFIC ATTRIBUTE -->
                  <select :id="attribute.name" class=' w-full py-2 border px-2 my-2'>
                    <option selected disabled>Select</option>
                    <option v-for="value in attribute.values" :key="value.id" :value="value.name">{{ value.name }}</option>
                  </select>
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

    </ProductModal>
    <CreateValueModal v-show="isValueModalVisible" @closeValueModal="closeValueModal" 
    @createValue="confirmCreateValue">

      <template v-slot:header>
        Create {{ model.attributes.attributeName }} Value
      </template>

      <template v-slot:body>
        <input v-model="model.attributes.newAttributeValue" type="text" 
        :class=" model.errors.valueError
        ? 'w-full py-2 border border-red-500 focus:outline-red-500 px-2' 
        : 'w-full py-2 border px-2'" placeholder="Value">
        <p class="text-sm absolute text-red-500"> {{ model.errors.valueError }}</p>
      </template>
    </CreateValueModal>

    <CreateValueModal v-show="isSizeModalVisible" @closeValueModal="closeSizeModal" 
    @createValue="confirmSelectSize">

      <template v-slot:header>
        Enter total of {{ model.sizes.selectedSize }} size
      </template>

      <template v-slot:body>
        <input v-model="model.sizes.totalOfSize" type="text" :class="model.errors.sizeError
          ? 'w-full py-2 border border-red-500 focus:outline-red-500 px-2' 
          : 'w-full py-2 border px-2'" v-on:keypress="numberkey" placeholder="Total" min="0" maxlength="3">
      </template>
    </CreateValueModal>

  </div>
</template>

<script setup>
import { ref } from '@vue/reactivity'
import { computed, onMounted, watch } from '@vue/runtime-core'
import alert from '../../alert.js'
import numberkey from '../../numberkey.js'
import store from '../../store'
import ProductModal from '../../components/ProductModal.vue'
import CreateValueModal from '../../components/CreateValueModal.vue'
import Color from '../../components/Icons/Color.vue'
import Size from '../../components/Icons/Size.vue'

  const isModalVisible = ref(false)
  const isValueModalVisible = ref(false)
  const isSizeModalVisible = ref(false)
  const model = ref({
    details : {
      sku : '',
      name : '',
      description : '',
      price : '',
      qty_stock : '',
      color : 'yellow',
    },
    categories : {
      mainCategoryId : 1,
      subCategoryId : 4,
    },
    attributes : {
      attributeId : 4,
      attributeList : null,
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
    errors : {
      valueError : '',
      sizeError : ''
    },
    
  })

  const mainCategories = computed(() => store.state.categories.mainCategory)
  const subCategories = computed(() => store.state.categories.subCategory)

  watch(() => store.state.categories.attribute,
    (newVal, oldVal) => {
        model.value.attributes.attributeList = {
          ...JSON.parse(JSON.stringify(newVal)),
        }
      }
  )

  onMounted(async () => {
    await store.dispatch('getMainCategory')
    await store.dispatch('getSubCategory', model.value.categories.mainCategoryId)
    await store.dispatch('getAttribute', model.value.categories.subCategoryId)
  })

  const showSizeModal = (size) => {
    isSizeModalVisible.value = true
    selectSize(size)
  }
  const closeSizeModal = () => isSizeModalVisible.value = false
  const showModal = () => isModalVisible.value = true
  const closeModal = () => isModalVisible.value = false
  const closeValueModal = () => isValueModalVisible.value = false
  const showValueModal = (attributeName, attributeId) => {
    isValueModalVisible.value = true
    model.value.attributes.attributeName = attributeName
    model.value.attributes.attributeId = attributeId
  }

  const confirmSelectSize = () => {
    const size = model.value.sizes.selectedSize
    model.value.sizes.sizeList.forEach(obj => {
        if(obj.name === size){
          obj.count = parseInt(model.value.sizes.totalOfSize)
        }
    })
    model.value.sizes.totalOfSize = 0
    model.value.sizes.selectedSize = ''
    closeSizeModal()
  }

  const confirmCreateProduct = () => {
    console.log('confirmed')
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

  const selectColor = (color) => model.value.details.color = color
  const selectSize = (size) => model.value.sizes.selectedSize = size

  const chooseCategory = async () => { 
    const res = await store.dispatch('getSubCategory', model.value.categories.mainCategoryId)
    model.value.categories.subCategoryId = res.data.data[0].id
    await store.dispatch('getAttribute', model.value.categories.subCategoryId)
  }

  const chooseSubCategory = async () => { 
    await store.dispatch('getAttribute', model.value.categories.subCategoryId)
  }

</script>