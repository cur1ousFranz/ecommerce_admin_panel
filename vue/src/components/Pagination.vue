<template>
  <ul class="flex list-reset border border-grey-light rounded w-auto font-sans">
    <li v-if="pagination.current_page > 1">
      <a
        class="block text-white bg-gray-800 px-3 py-2"
        href="#"
        @click.prevent="change(pagination.current_page - 1)"
      >
        Previous
      </a>
    </li>
    <li v-for="page in pages" :key="page">
      <a
        :class="[
          page == pagination.current_page
            ? 'text-gray-900 border border-gray-900'
            : 'hover:bg-blue text-blue border-r border-grey-light',
          'block px-3 py-2',
        ]"
        href="#"
        @click.stop="change(page)"
      >
        {{ page }}
      </a>
    </li>
    <li v-if="pagination.current_page < pagination.last_page">
      <a
        class="block text-white bg-gray-800 text-blue px-3 py-2"
        href="#"
        @click.prevent="change(pagination.current_page + 1)"
      >
        Next
      </a>
    </li>
  </ul>
</template>

<script>
import { computed } from '@vue/runtime-core';
export default {
  props: {
    pagination: {
      type: Object,
      required: true,
    },
    offset: {
      type: Number,
      default: 4,
    },
  },
  computed: {
    pages() {
        if (!this.pagination.to) {
            return null;
        }
        let from = this.pagination.current_page - this.offset;
        if (from < 1)  from = 1

        let to = from + this.offset * 2;
        if (to >= this.pagination.last_page) to = this.pagination.last_page

        let pages = []
        for (let page = from; page <= to; page++) {
            pages.push(page)
        }

      return pages.length != 1 ? pages : '' 
    },
  },
  methods: {
    change: function (page) {
      this.pagination.current_page = page;
      this.$emit("paginate");
    },
  },
};
</script>