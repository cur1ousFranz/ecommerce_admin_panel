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
            <button @click="showProductModal" class="px-3 py-2 space-x-2 bg-gray-800 text-sm text-white hover:bg-gray-700">
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
    <ProductModal v-show="isModalVisible" @close="closeProductModal" @some-event="confirmCreateProduct" >
        <template v-slot:header>
          Create Product
        </template>

        <template v-slot:body>
            <div>
                <h1 class="font-semibold ">Details</h1>
            </div>
            <div class="w-full py-2 flex flex-col space-x-0 md:space-x-6 md:flex-row">
                <div class="w-full space-y-4">
                    <div class="relative">
                        <label for="sku">SKU</label>
                        <input v-model="model.details.sku" id="sku" type="text" 
                        :class=" model.errors.sku ? 'w-full py-2 border border-red-500 focus:outline-red-500 px-2' : 'w-full py-2 border px-2'"
                         placeholder="Ex. TSH-FFF-M">
                        <p class="text-sm absolute text-red-500"> {{ model.errors.sku }}</p>
                    </div>
                    <div class="relative">
                        <label for="name">Name</label>
                        <input v-model="model.details.name" id="name" type="text" 
                        :class=" model.errors.name ? 'w-full py-2 border border-red-500 focus:outline-red-500 px-2' : 'w-full py-2 border px-2'" placeholder="Ex. Oxygn Apparrel">
                        <p class="text-sm absolute text-red-500"> {{ model.errors.name }}</p>
                    </div>
                </div>
                <div class="w-full space-y-4">
                  <div class="relative">
                      <label for="price">Price</label>
                      <input v-model="model.details.price" v-on:keypress="numberkey" id="price" type="text" 
                      :class=" model.errors.price ? 'w-full py-2 border border-red-500 focus:outline-red-500 px-2' : 'w-full py-2 border px-2'" placeholder="₱" maxlength="10">
                      <p class="text-sm absolute text-red-500"> {{ model.errors.price }}</p>
                  </div>
                  <div class="relative">
                    <label for="qty_stock">Qty Stock (All Sizes)</label>
                    <input v-model="model.details.qty_stock" v-on:keypress="numberkey" id="qty_stock" type="text" 
                    :class=" model.errors.qty_stock ? 'w-full py-2 border border-red-500 focus:outline-red-500 px-2' : 'w-full py-2 border px-2'" placeholder="Ex. 10" maxlength="10">
                    <p class="text-sm absolute text-red-500"> {{ model.errors.qty_stock }}</p>
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
                <div id="color" class="space-y-2 relative" v-if="attribute.name === 'Color'">
                  <label class="mt-5 inline-block">Color: <span class="text-gray-700 font-semibold mt-4">{{ model.details.color }}</span></label>
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
                  <select @change="selectAttributeValue" :id="attribute.name" 
                  class='attribute w-full py-2 border px-2 mt-2'>
                    <option selected disabled>Select</option>
                    <option v-for="value in attribute.values" :key="value.id" :value="value.name">
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
                <div v-if="model.images.imageBase64.length < 6">
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
    <Modal v-show="isValueModalVisible" @closeValueModal="closeValueModal" 
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
    </Modal>

    <Modal v-show="isSizeModalVisible" @closeValueModal="closeSizeModal" 
    @createValue="confirmSelectSize">

      <template v-slot:header>
        Enter total of {{ model.sizes.selectedSize }} size
      </template>

      <template v-slot:body>
        <input v-model="model.sizes.totalOfSize" type="text" class="w-full py-2 border px-2" 
        v-on:keypress="numberkey" placeholder="Total" min="0" maxlength="3">
      </template>
    </Modal>
    <!-- TODO:: DISPLAY PRODUCTS -->
    <pre>{{ model.products.productList}}</pre>
  </div>
</template>

<script setup>
import { ref } from '@vue/reactivity'
import { computed, onMounted, watch } from '@vue/runtime-core'
import alert from '../../alert.js'
import numberkey from '../../numberkey.js'
import store from '../../store'
import ProductModal from '../../components/ProductModal.vue'
import Modal from '../../components/Modal.vue'
import Color from '../../components/Icons/Color.vue'
import Size from '../../components/Icons/Size.vue'

  const isModalVisible = ref(false)
  const isValueModalVisible = ref(false)
  const isSizeModalVisible = ref(false)
  const model = ref({
    details : {
      sku : '',
      name : '',
      price : '',
      qty_stock : '',
      color : '',
    },
    categories : {
      mainCategoryId : 1,
      subCategoryId : 4,
    },
    attributes : {
      attributeId : 4,
      attributeList : [],
      attributeListValue : [],
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
    },
    products : {
      productList : []
    },
    errors : {
      valueError : '',
      sku : '',
      name : '',
      price : '',
      qty_stock : '',
    },
    
  })

  const mainCategories = computed(() => store.state.categories.mainCategory)
  const subCategories = computed(() => store.state.categories.subCategory)

  watch(() => store.state.categories.attribute,
    (newVal, oldVal) => {
        model.value.attributes.attributeList = newVal
      }
  )

  watch(() => store.state.products.data,
    (newVal, oldVal) => {
        model.value.products.productList = newVal
      }
  )

  onMounted(async () => {
    await store.dispatch('getMainCategory')
    await store.dispatch('getSubCategory', model.value.categories.mainCategoryId)
    await store.dispatch('getAttribute', model.value.categories.subCategoryId)
    await store.dispatch('getAllProducts')
  })

  const showSizeModal = (size) => {
    isSizeModalVisible.value = true
    selectSize(size)
  }
  const closeSizeModal = () => isSizeModalVisible.value = false
  const showProductModal = () => isModalVisible.value = true
  const closeProductModal = () => isModalVisible.value = false
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
          obj.count = model.value.sizes.totalOfSize != 0 ? parseInt(model.value.sizes.totalOfSize) : 0
        }
    })
    closeSizeModal()
    model.value.sizes.selectedSize = ''
    model.value.sizes.totalOfSize = 0
  }

  const confirmCreateProduct = async () => {

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
        attributeSelected = false
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
    
    // Validate if there is attribute "Size" and if 
    // user already selected sizes
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
    console.log(total);
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
        attributeObj.color = model.value.details.color
        attributeObj.size = model.value.sizes.sizeList

        const formData = new FormData()
        model.value.images.productImages.forEach(element => formData.append('product_image[]', element))

        formData.append('category_id', model.value.categories.subCategoryId)
        formData.append('name', model.value.details.name)
        formData.append('description', JSON.stringify(attributeObj)) 
        formData.append('sku', model.value.details.sku)
        formData.append('qty_stock', model.value.details.qty_stock)
        formData.append('price', model.value.details.price)
        const res = await store.dispatch('createProduct', formData)

        // Reset fields after success creating product
        model.value.details.sku = ''
        model.value.details.name = ''
        model.value.details.price = ''
        model.value.details.qty_stock = ''
        model.value.details.color = ''
        model.value.images.imageBase64 = []
        model.value.images.productImages = []
        model.value.sizes.sizeList.forEach(el => el.count = 0)
        alert('Product created success!')
        closeProductModal()
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
    const res = await store.dispatch('getSubCategory', model.value.categories.mainCategoryId)
    model.value.categories.subCategoryId = res.data.data[0].id
    await store.dispatch('getAttribute', model.value.categories.subCategoryId)
  }

  const chooseSubCategory = async () => { 
    await store.dispatch('getAttribute', model.value.categories.subCategoryId)
    model.value.attributes.attributeListValue = []
  }

  const chooseImage = () => {
    let image = document.querySelector('#image')
    for (let index = 0; index < image.files.length; index++) {
      let file = image.files[index]
      if(file.type === 'image/png' || file.type === 'image/webp' || file.type === 'image/jpeg'){
        let reader = new FileReader();
        reader.onloadend = () => {
          if(model.value.images.imageBase64.length < 6){
            model.value.images.imageBase64.push(reader.result);
          }
        }
        reader.readAsDataURL(file);
      }
      model.value.images.productImages.push(file);
    }
  }

  const removeImage = (index) => {
    model.value.images.imageBase64.splice(index, 1)
    model.value.images.productImages.splice(index, 1)
  }

  const selectAttributeValue = (event) => {
    let property = event.target.id
    let value = event.target.value
    let exist = false

    model.value.attributes.attributeListValue.forEach(element => {
      if(element.name === property){
        element.value = value
        exist = true
      }
    })

    if(!exist){
      model.value.attributes.attributeListValue.push({ name : property, value : value})
    }

  }

</script>