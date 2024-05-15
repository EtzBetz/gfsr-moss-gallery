<script setup lang="ts">
  import { computed, ref, watch } from 'vue';

  const props = defineProps<{
    width: number;
    xSize: number;
    ySize: number;
    index: number;
    person: number;
    src: string;
    margin: number;
    shown: boolean;
    xMirror: boolean;
    yMirror: boolean;
  }>();

  const maximized = ref(false);
  const isOnTop = ref(false);
  const personData = ref([
    {
      name: 'Jane Goodall',
      birth: 1934,
      death: -1,
      department: 'Biologie',
      skill: 'Primatenforschung',
      info: 'Jane Goodall ist eine renommierte britische Primatenforscherin, bekannt für ihre bahnbrechende Arbeit mit Schimpansen in Tansania und als Aktivistin für den Naturschutz.',
    },
    {
      name: 'Lise Meitner',
      birth: 1878,
      death: 1968,
      department: 'Kernphysik',
      skill: 'Mutter der Kernspaltung',
      info: 'Lise Meitner war eine österreichische Physikerin, die einen maßgeblichen Beitrag zur Entdeckung der Kernspaltung leistete, die letztendlich die Grundlage für die Entwicklung der Atomenergie bildete.',
    },
    {
      name: 'Marie Curie',
      birth: 1867,
      death: 1934,
      department: 'Chemie und Physik',
      skill: 'Mehrfache Nobelpreisträgerin',
      info: 'Marie Curie war eine polnisch-französische Physikerin und Chemikerin, bekannt für ihre bahnbrechenden Entdeckungen auf dem Gebiet der Radioaktivität. Sie war die erste Frau, die einen Nobelpreis erhielt, und die einzige Person, die Nobelpreise in zwei verschiedenen wissenschaftlichen Disziplinen gewann.',
    },
    {
      name: 'Rosalind Franklin',
      birth: 1920,
      death: 1958,
      department: 'Biologie',
      skill: 'DNA-Strukturanalyse',
      info: 'Rosalind Franklin war eine britische Biophysikerin, die entscheidende Daten zur DNA-Struktur lieferte, die zur Entschlüsselung der Doppelhelix-Struktur beitrugen, die James Watson und Francis Crick 1953 veröffentlichten.',
    },
    {
      name: 'Vera Rubin',
      birth: 1928,
      death: 2016,
      department: 'Astrophysik',
      skill: 'Entdeckung der dunklen Materie',
      info: 'Vera Rubin war eine amerikanische Astronomin, die Beweise für die Existenz der Dunklen Materie im Universum lieferte, durch ihre Beobachtungen von Galaxien und ihre Entdeckung der Anomalien in ihren Rotationsgeschwindigkeiten.',
    },
  ]);

  const xIndex = computed(() => {
    return Math.floor((props.index - 1) / props.ySize);
  });
  const yIndex = computed(() => {
    return (props.index - 1) % props.ySize;
  });
  const xMarginDiff = computed(() => {
    return props.xSize * props.margin;
  });
  const yMarginDiff = computed(() => {
    return props.ySize * props.margin;
  });

  watch(
    () => props.index,
    (newValue, oldValue) => {
      isOnTop.value = true;
      setTimeout(() => {
        isOnTop.value = false;
      }, 1000);
    },
  );

  function clickHandler(event: any) {
    if (props.src === 'moss') return;
    maximized.value = true;
  }
</script>

<template>
  <div
    class="image-container"
    :style="{
      top: 'calc(((100vh - ' + yMarginDiff + 'px) / ' + ySize + ') * ' + yIndex + ' + (' + yIndex * margin + 'px))',
      left:
        'calc(((' +
        width +
        'vw - ' +
        xMarginDiff +
        'px) / ' +
        xSize +
        ') * ' +
        xIndex +
        ' + (' +
        (xIndex + 1) * margin +
        'px))',
    }"
  >
    <img
      @click="clickHandler"
      class="image"
      :src="`/src/assets/${src}.png`"
      :style="{
        maxHeight: 'calc((100vh / ' + ySize + ') - 2 * ' + margin + 'px)',
        minHeight: 'calc((100vh / ' + ySize + ') - 2 * ' + margin + 'px)',
        maxWidth: 'calc((' + width + 'vw / ' + xSize + ') - 2 * ' + margin + 'px)',
        minWidth: 'calc((' + width + 'vw / ' + xSize + ') - 2 * ' + margin + 'px)',
      }"
      :class="{
        'image--hidden': !shown,
        'image--x_mirror': xMirror,
        'image--y_mirror': yMirror,
        'image--onTop': isOnTop,
      }"
    />
    <div
      class="image-info"
      :class="{
        'image-info--left': index >= 7,
      }"
      v-if="person !== -1"
    >
      <!--   {{ props.person }}   -->
      <p class="image-info__name">
        <span>{{ personData[props.person].name }}</span>
      </p>
      <p class="image-info__dates">
        <span class="image-info__dates__birth">{{ personData[props.person].birth }}</span
        ><span
          class="image-info__dates__death"
          v-if="personData[props.person].death !== -1"
          >{{ personData[props.person].death }}</span
        >
      </p>
      <p class="image-info__department">
        <span>{{ personData[props.person].department }}</span>
      </p>
      <p class="image-info__skill">
        <span>{{ personData[props.person].skill }}</span>
      </p>
      <p class="image-info__info">
        <span>{{ personData[props.person].info }}</span>
      </p>
    </div>
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
    user-drag: none;
    -webkit-user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;

    &.image--onTop {
      z-index: 100;
    }

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
  }

  .image-info {
    position: absolute;
    display: flex;
    flex-direction: column;
    translate: 220px 34px;
    min-height: 292px;
    max-height: 292px;
    min-width: 480px;
    background: linear-gradient(90deg, rgba(#ffffff, 100%) 0%, rgba(#ffffff, 80%) 80%, rgba(#ffffff, 50%) 100%);
    color: black;
    z-index: 100;
    padding: 20px;
    font-stretch: expanded;
    transition: opacity 0.5s ease-in-out;
    opacity: 0;
    pointer-events: none;

    &.image-info--left {
      //text-align: right;
      translate: -100% 34px;
      background: linear-gradient(-90deg, rgba(#ffffff, 100%) 0%, rgba(#ffffff, 80%) 80%, rgba(#ffffff, 50%) 100%);

      align-items: flex-end;
    }

    & .image-info__name {
      text-transform: uppercase;
      font-size: 24px;
      font-family: 'BrownPro', sans-serif;
    }

    & .image-info__dates {
      display: flex;
      flex-direction: row;
      gap: 70px;
      margin-bottom: 10px;

      & .image-info__dates__birth:before,
      & .image-info__dates__death:before {
        display: inline-block;
        scale: 0.8;
        translate: 0 -2px;
      }

      & .image-info__dates__birth:before {
        content: '*';
      }

      & .image-info__dates__death:before {
        content: '†';
      }
    }

    & .image-info__department {
      font-family: 'BrownPro-Light', sans-serif;
    }

    & .image-info__skill {
      font-family: 'BrownPro-Light', sans-serif;
    }

    & .image-info__info {
      font-family: 'BrownPro-Light', sans-serif;
      margin-top: 20px;
      margin-bottom: 5px;
      flex-grow: 1;
      align-content: flex-end;
    }
  }
</style>
