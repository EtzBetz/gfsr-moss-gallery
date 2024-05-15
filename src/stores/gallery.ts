import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useGalleryStore = defineStore('counter', () => {
  // const count = ref(0);
  // const doubleCount = computed(() => count.value * 2);
  // function increment() {
  //   count.value++;
  // }

  const personIndexes = ref([0, 0, 0, 0, 0]);

  const openedIndex = ref(null);

  function shuffleIndexes() {
    const indexes = 3 * 4;
    const positions: Array<number> = [];
    for (let i = 1; i <= indexes; i++) {
      if (personIndexes.value.includes(i)) continue;
      positions.push(i);
    }
    for (let i = 0; i < personIndexes.value.length; i++) {
      setTimeout(() => {
        const index = Math.floor(Math.random() * positions.length);
        const previousIndex = personIndexes.value[i];
        personIndexes.value[i] = positions[index];
        positions.splice(index, 1);
        positions.push(previousIndex);
      }, 1000 * i);
    }
  }

  return {
    personIndexes: personIndexes,
    openedIndex: openedIndex,

    shuffleIndexes: shuffleIndexes,
  };
});
