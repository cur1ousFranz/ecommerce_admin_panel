<template>
    <transition name="modal-fade">
        <div class="modal-backdrop" @click.self="close">
            <div class="modal">
                <header class="modal-header text-xl text-start">
                    <slot name="header">
                        This is the default title!
                    </slot>
                </header>

                <section class="modal-body px-5">
                    <slot name="body">
                    This is the default body!
                    </slot>
                </section>

                <footer class="modal-footer">
                    <div class="flex justify-end space-x-3">
                        <button class="px-3 py-2 border border-gray-900 text-gray-900 text-sm" type="button" @click="close" >
                            Cancel
                        </button>
                        <button class="px-3 py-2 bg-gray-900 text-white text-sm" type="button" @click="confirm">
                            <span v-if="loading">Loading...</span>
                            <span v-if="!loading">Confirm</span>
                        </button>
                    </div>
                </footer>
            </div>
        </div>
    </transition>
</template>

<script>
  export default {
    name: 'Modal',
    props: {
        loading: {
            type: Boolean,
        },
    },
    methods: {
      close() {
        this.$emit('close');
      },
      confirm() {
        this.$emit('someEvent')
      },
    },
  };
</script>

<style scoped>
    .modal-backdrop {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.3);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modal {
        background: #FFFFFF;
        overflow-x: auto;
        display: flex;
        flex-direction: column;
        width: 65%;
    }

    .modal-header {
        padding: 35px;
    }

    .modal-body {
        max-height: 400px;
        overflow-y: auto;
    }

    .modal-footer {
        padding: 15px;
        display: flex;
        text-align: center;
    }

    .modal-header {
        position: relative;
        justify-content: center;
    }


    .modal-footer {
        border-top: 1px solid #eeeeee;
        flex-direction: column;
        justify-content: flex-end;
    }

    .modal-fade-enter,
    .modal-fade-leave-to {
        opacity: 0;
    }

    .modal-fade-enter-active,
    .modal-fade-leave-active {
        transition: opacity .5s ease;
    }
</style>
