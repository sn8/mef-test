<template>
  <div id="app">
    <div class="list">
      <div
        v-for="(item, index) in list"
        :key="index"
        class="list-item"
      >
        <div class="image">
          <img src="./assets/hugh.jpg">
        </div>
        <div class="info">
          <h2>Hugh is</h2>
          <div>
            <numeric-input v-model="item.value" /> hours old
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NumericInput from '@/components/NumericInput.vue';

export default {
  name: 'App',
  components: {
    NumericInput,
  },
  data: () => ({
    list: [
      { value: 7 },
      { value: 10000 },
      { value: 1000000 },
      { value: 10000000 },
    ],
  }),
};
</script>
