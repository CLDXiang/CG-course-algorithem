<template>
  <span>
    <span>xMax: </span>
    <input
      type="number"
      min="1"
      :value="xMax"
      @input="(e) => $emit('update:xMax', e.target.value)"
    >
  </span>
  <span>
    <span>yMax: </span>
    <input
      type="number"
      min="1"
      :value="yMax"
      @input="(e) => $emit('update:yMax', e.target.value)"
    >
  </span>
  <slot />
  <span>
    <button @click="$emit('reset')">Reset</button>
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    /** x 轴最大值 */
    xMax: { type: String, required: true },
    /** y 轴最大值 */
    yMax: { type: String, required: true },
  },
  emits: ['update:xMax', 'update:yMax', 'reset'],
});
</script>
