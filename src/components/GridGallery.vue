<script setup lang="ts">
  import WelcomeItem from './WelcomeItem.vue';
  import DocumentationIcon from './icons/IconDocumentation.vue';
  import ToolingIcon from './icons/IconTooling.vue';
  import EcosystemIcon from './icons/IconEcosystem.vue';
  import CommunityIcon from './icons/IconCommunity.vue';
  import SupportIcon from './icons/IconSupport.vue';
  import { ref } from 'vue';
  import GalleryImage from '@/components/GalleryImage.vue';
  import { useCounterStore } from '@/stores/counter';

  const store = useCounterStore();

  store.shuffle_indexes();

  setInterval(() => {
    store.shuffle_indexes();
  }, 10000);

  const page_width = ref(60);
  const x_size = ref(4);
  const y_size = ref(3);
  const margin = ref(10);
</script>

<template>
  <div
    class="grid"
    :style="{
      minWidth: '' + page_width + 'vw',
      maxWidth: '' + page_width + 'vw',
    }"
  >
    <gallery-image
      v-for="i in x_size * y_size"
      :key="i"
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

<style scoped>
  .grid {
    min-height: 100vh;
    max-height: 100vh;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
</style>
