import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useGalleryStore = defineStore('counter', () => {
  // const count = ref(0);
  // const doubleCount = computed(() => count.value * 2);
  // function increment() {
  //   count.value++;
  // }

  const person_indexes = ref([0, 0, 0, 0, 0]);

  const opened_index = ref(null);

  function shuffle_indexes() {
    const indexes = 3 * 4;
    const positions: Array<number> = [];
    for (let i = 1; i <= indexes; i++) {
      if (person_indexes.value.includes(i)) continue;
      positions.push(i);
    }
    for (let i = 0; i < person_indexes.value.length; i++) {
      setTimeout(() => {
        const index = Math.floor(Math.random() * positions.length);
        const previous_index = person_indexes.value[i];
        person_indexes.value[i] = positions[index];
        positions.splice(index, 1);
        positions.push(previous_index);
      }, 1000 * i);
    }
  }

  return {
    person_indexes,
    opened_index,

    shuffle_indexes,
  };
});
