<script setup lang="ts">
  import GridGallery from '../components/GridGallery.vue';
  import { ref } from 'vue';
  import { useGalleryStore } from '@/stores/gallery';

  const store = useGalleryStore();

  store.shuffle_indexes();

  const shuffle_handler = ref(getShuffleInterval());
  const inactivity_handler = ref(getInactivityInterval());

  const isCursorActive = ref(false);

  function mouseMoveHandler() {
    isCursorActive.value = true;
    clearInterval(shuffle_handler.value);
    clearInterval(inactivity_handler.value);
    shuffle_handler.value = getShuffleInterval();
    inactivity_handler.value = getInactivityInterval();
  }

  function getShuffleInterval() {
    return setInterval(() => {
      store.shuffle_indexes();
    }, 15000);
  }

  function getInactivityInterval() {
    return setInterval(() => {
      isCursorActive.value = false;
    }, 5000);
  }
</script>

<template>
  <main
    @mousemove="mouseMoveHandler()"
    :class="{
      'main--cursor-active': isCursorActive,
    }"
  >
    <grid-gallery />
  </main>
</template>

<style lang="scss">
  .main--cursor-active .image:hover:has(~ .image-info) {
    transform: scale(1.1);
    ~ .image-info {
      opacity: 1;
    }
  }

  main:not(.main--cursor-active) {
    cursor: none;
  }

  main:not(.main--cursor-active) * {
    cursor: none;
    pointer-events: none;
  }
</style>
