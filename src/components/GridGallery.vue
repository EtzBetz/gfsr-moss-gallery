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

  const pageWidth = ref(75);
  const xSize = ref(4);
  const ySize = ref(3);
  const margin = ref(10);
</script>

<template>
  <div
    class="grid"
    :style="{
      minWidth: '' + pageWidth + 'vw',
      maxWidth: '' + pageWidth + 'vw',
    }"
  >
    <gallery-image
      v-for="i in xSize * ySize"
      :key="i"
      :person="-1"
      :index="i"
      :width="pageWidth"
      :xSize="xSize"
      :ySize="ySize"
      :src="'moss'"
      :margin="margin"
      :shown="!store.personIndexes.includes(i)"
      :xMirror="i % 3 === 1"
      :yMirror="i % 2 === 1"
    />
    <gallery-image
      :key="0"
      :person="0"
      :index="store.personIndexes[0]"
      :width="pageWidth"
      :xSize="xSize"
      :ySize="ySize"
      :src="'Jane Goodall'"
      :margin="margin"
      :shown="true"
      :xMirror="false"
      :yMirror="false"
    />
    <gallery-image
      :key="1"
      :person="1"
      :index="store.personIndexes[1]"
      :width="pageWidth"
      :xSize="xSize"
      :ySize="ySize"
      :src="'Lise Meitner'"
      :margin="margin"
      :shown="true"
      :xMirror="false"
      :yMirror="false"
    />
    <gallery-image
      :key="2"
      :person="2"
      :index="store.personIndexes[2]"
      :width="pageWidth"
      :xSize="xSize"
      :ySize="ySize"
      :src="'Marie Curie'"
      :margin="margin"
      :shown="true"
      :xMirror="false"
      :yMirror="false"
    />
    <gallery-image
      :key="3"
      :person="3"
      :index="store.personIndexes[3]"
      :width="pageWidth"
      :xSize="xSize"
      :ySize="ySize"
      :src="'Rosalind Franklin'"
      :margin="margin"
      :shown="true"
      :xMirror="false"
      :yMirror="false"
    />
    <gallery-image
      :key="4"
      :person="4"
      :index="store.personIndexes[4]"
      :width="pageWidth"
      :xSize="xSize"
      :ySize="ySize"
      :src="'Vera Rubin'"
      :margin="margin"
      :shown="true"
      :xMirror="false"
      :yMirror="false"
    />
  </div>
</template>

<style scoped lang="scss">
  .grid {
    min-height: 100vh;
    max-height: 100vh;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
</style>
