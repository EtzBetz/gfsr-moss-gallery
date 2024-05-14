<script setup lang="ts">
  import { computed, ref } from 'vue';

  const props = defineProps<{
    width: number;
    x_size: number;
    y_size: number;
    index: number;
    src: string;
    margin: number;
    shown: boolean;
    x_mirror: boolean;
    y_mirror: boolean;
  }>();

  const maximized = ref(false);

  const x_index = computed(() => {
    return Math.floor((props.index - 1) / props.y_size);
  });
  const y_index = computed(() => {
    return (props.index - 1) % props.y_size;
  });
  const x_margin_diff = computed(() => {
    return props.x_size * props.margin;
  });
  const y_margin_diff = computed(() => {
    return props.y_size * props.margin;
  });

  function clickHandler(event: any) {
    if (props.src === 'moss') return;
    maximized.value = true;
  }
</script>

<template>
  <div
    class="image-container"
    :style="{
      top:
        'calc(((100vh - ' + y_margin_diff + 'px) / ' + y_size + ') * ' + y_index + ' + (' + y_index * margin + 'px))',
      left:
        'calc(((' +
        width +
        'vw - ' +
        x_margin_diff +
        'px) / ' +
        x_size +
        ') * ' +
        x_index +
        ' + (' +
        (x_index + 1) * margin +
        'px))',
    }"
  >
    <img
      @click="clickHandler"
      class="image"
      :src="`/src/assets/${src}.png`"
      :style="{
        maxHeight: 'calc((100vh / ' + y_size + ') - 2 * ' + margin + 'px)',
        minHeight: 'calc((100vh / ' + y_size + ') - 2 * ' + margin + 'px)',
        maxWidth: 'calc((' + width + 'vw / ' + x_size + ') - 2 * ' + margin + 'px)',
        minWidth: 'calc((' + width + 'vw / ' + x_size + ') - 2 * ' + margin + 'px)',
      }"
      :class="{
        image: true,
        'image--hidden': !shown,
        'image--x_mirror': x_mirror,
        'image--y_mirror': y_mirror,
      }"
    />
  </div>
</template>

<style scoped lang="scss">
  .image-container {
    position: absolute;
    transition:
      top 1s ease-in-out,
      left 1s ease-in-out;
  }

  .image {
    position: absolute;
    object-fit: contain;
    transition:
      transform 0.5s ease-in-out,
      opacity 0.5s ease-in-out;

    &.image--hidden {
      opacity: 0;
      transition-delay: 0.5s;
    }

    &.image--x_mirror {
      scale: -1 1;
    }

    &.image--y_mirror {
      scale: 1 -1;

      &.image--x_mirror {
        scale: -1 -1;
      }
    }

    &:hover {
      transform: scale(1.1);
    }
  }
</style>
