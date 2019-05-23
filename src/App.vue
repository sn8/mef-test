<template>
  <div id="app">
    <div class="list">
      <div
        v-for="(item, index) in list"
        :key="index"
        class="list-item"
        @click.capture="setFocusOnInput(index)"
      >
        <div class="image">
          <img src="./assets/hugh.jpg">
        </div>
        <div class="info">
          <h2>Hugh is</h2>
          <div>
            <numeric-input
              :class="`input-${index}`"
              placeholder="7"
              v-model="item.value"
            />
            <span class="description">hours old</span>
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
      { value: '' },
      { value: 10000 },
      { value: 1000000 },
      { value: 10000000 },
    ],
  }),
  methods: {
    setFocusOnInput(index) {
      document.querySelector(`.input-${index}`).focus();
    },
  },
};
</script>
