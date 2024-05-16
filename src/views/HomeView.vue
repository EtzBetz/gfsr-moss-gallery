<script setup lang="ts">
  import GridGallery from '../components/GridGallery.vue';
  import { ref } from 'vue';
  import { useGalleryStore } from '@/stores/gallery';

  const store = useGalleryStore();

  store.shuffleIndexes();

  const shuffleHandler = ref(getShuffleInterval());
  const inactivityHandler = ref(getInactivityInterval());

  const isCursorActive = ref(false);

  function mouseMoveHandler() {
    isCursorActive.value = true;
    clearInterval(shuffleHandler.value);
    clearInterval(inactivityHandler.value);
    shuffleHandler.value = getShuffleInterval();
    inactivityHandler.value = getInactivityInterval();
  }

  function getShuffleInterval() {
    return setInterval(() => {
      store.shuffleIndexes();
    }, 60000);
  }

  function getInactivityInterval() {
    return setInterval(() => {
      isCursorActive.value = false;
    }, 15000);
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
