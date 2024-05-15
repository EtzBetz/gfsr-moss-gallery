<script setup lang="ts">
  import WelcomeItem from './WelcomeItem.vue';
  import DocumentationIcon from './icons/IconDocumentation.vue';
  import ToolingIcon from './icons/IconTooling.vue';
  import EcosystemIcon from './icons/IconEcosystem.vue';
  import CommunityIcon from './icons/IconCommunity.vue';
  import SupportIcon from './icons/IconSupport.vue';
  import { ref } from 'vue';
  import GalleryImage from '@/components/GalleryImage.vue';
  import { useGalleryStore } from '@/stores/gallery';

  const store = useGalleryStore();

  store.shuffle_indexes();

  const shuffle_handler = ref(getShuffleInterval());
  const inactivity_handler = ref(getInactivityInterval());
  const page_width = ref(60);
  const x_size = ref(4);
  const y_size = ref(3);
  const margin = ref(10);

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
  <div
    @mousemove="mouseMoveHandler()"
    class="grid"
    :style="{
      minWidth: '' + page_width + 'vw',
      maxWidth: '' + page_width + 'vw',
    }"
    :class="{
      'grid--cursor-active': isCursorActive,
    }"
  >
    <gallery-image
      v-for="i in x_size * y_size"
      :key="i"
      :person="-1"
      :index="i"
      :width="page_width"
      :x_size="x_size"
      :y_size="y_size"
      :src="'moss'"
      :margin="margin"
      :shown="!store.person_indexes.includes(i)"
      :x_mirror="i % 3 === 1"
      :y_mirror="i % 2 === 1"
    />
    <gallery-image
      :key="0"
      :person="0"
      :index="store.person_indexes[0]"
      :width="page_width"
      :x_size="x_size"
      :y_size="y_size"
      :src="'Jane Goodall'"
      :margin="margin"
      :shown="true"
      :x_mirror="false"
      :y_mirror="false"
    />
    <gallery-image
      :key="1"
      :person="1"
      :index="store.person_indexes[1]"
      :width="page_width"
      :x_size="x_size"
      :y_size="y_size"
      :src="'Lise Meitner'"
      :margin="margin"
      :shown="true"
      :x_mirror="false"
      :y_mirror="false"
    />
    <gallery-image
      :key="2"
      :person="2"
      :index="store.person_indexes[2]"
      :width="page_width"
      :x_size="x_size"
      :y_size="y_size"
      :src="'Marie Curie'"
      :margin="margin"
      :shown="true"
      :x_mirror="false"
      :y_mirror="false"
    />
    <gallery-image
      :key="3"
      :person="3"
      :index="store.person_indexes[3]"
      :width="page_width"
      :x_size="x_size"
      :y_size="y_size"
      :src="'Rosalind Franklin'"
      :margin="margin"
      :shown="true"
      :x_mirror="false"
      :y_mirror="false"
    />
    <gallery-image
      :key="4"
      :person="4"
      :index="store.person_indexes[4]"
      :width="page_width"
      :x_size="x_size"
      :y_size="y_size"
      :src="'Vera Rubin'"
      :margin="margin"
      :shown="true"
      :x_mirror="false"
      :y_mirror="false"
    />
  </div>
</template>

<style lang="scss">
  .grid--cursor-active .image:hover:has(~ .image-info) {
    transform: scale(1.1);
    ~ .image-info {
      opacity: 1;
    }
  }
</style>

<style scoped lang="scss">
  .grid {
    min-height: 100vh;
    max-height: 100vh;
    position: relative;
    left: 50%;
    transform: translateX(-50%);

    &:not(.grid--cursor-active) {
      cursor: none;
    }

    &:not(.grid--cursor-active) * {
      cursor: none;
      pointer-events: none;
    }
  }
</style>
