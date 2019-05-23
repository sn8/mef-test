<template>
  <input
    v-model="inputValue"
    ref="numericInput"
    type="text"
    class="numeric-input"
    @keydown="onKeydown"
    @keydown.8="onBackspace"
    @keydown.46="onDelete"
    @input="onInput"
  />
</template>

<script>
import { getActualWidth, isDigit, setCaretPosition } from './utils';

export default {
  name: 'NumericInput',

  props: {
    value: {
      type: [Number, String],
      default: 0,
    },
    minWidth: {
      type: Number,
      default: 50,
    },
  },

  data: () => ({
    caretPosition: 0,
  }),

  computed: {
    inputValue: {
      get() {
        return this.value
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
      },
      set(value) {
        const output = value.split(' ').join('');
        this.$emit('input', output);
      },
    },
  },

  watch: {
    inputValue(newValue, oldValue) {
      const { caretPosition } = this;

      if (newValue.length > oldValue.length + 1) {
        const newValuePart = newValue.substr(0, caretPosition);
        const oldValuePart = oldValue.substr(0, caretPosition);
        if (newValuePart !== oldValuePart) {
          this.caretPosition += 1;
        }
      }

      if (oldValue.length > newValue.length + 1 && caretPosition > 0) {
        const newValuePart = newValue.substr(caretPosition, newValue.length);
        const oldValuePart = oldValue.substr(caretPosition, oldValue.length);
        if (newValuePart !== oldValuePart) {
          this.caretPosition -= 1;
        }
      }

      this.restoreCaretPosition();
    },
  },

  mounted() {
    this.setWidth();
    this.caretPosition = this.inputValue.length;
  },

  methods: {
    onKeydown(event) {
      const { key } = event;
      if (key.length === 1 && !event.ctrlKey && !isDigit(key)) {
        event.preventDefault();
      }
    },

    onBackspace(event) {
      const { selectionStart } = event.target;
      if (selectionStart === 0) return;

      const indent = selectionStart - 1;
      const value = this.inputValue.substr(indent, 1);
      if (!isDigit(value)) {
        this.caretPosition = indent;
        setCaretPosition(event.target, indent);
      }
    },

    onDelete(event) {
      const { length } = this.inputValue;
      const { selectionStart } = event.target;
      if (selectionStart === length) return;

      const indent = selectionStart + 1;
      const value = this.inputValue.substr(selectionStart, 1);
      if (!isDigit(value)) {
        this.caretPosition = indent;
        setCaretPosition(event.target, indent);
      }
    },

    onInput(event) {
      const { selectionStart } = event.target;
      this.caretPosition = selectionStart;
      this.setWidth();
    },

    async setWidth() {
      await this.$nextTick();
      const { minWidth } = this;
      const { numericInput } = this.$refs;
      const actualWidth = getActualWidth(numericInput);
      const width = actualWidth > minWidth ? actualWidth : minWidth;
      numericInput.style.width = `${width}px`;
    },

    async restoreCaretPosition() {
      await this.$nextTick();
      const { numericInput } = this.$refs;
      setCaretPosition(numericInput, this.caretPosition);
    },
  },
};
</script>
