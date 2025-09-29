<template>
  <button class="button" :disabled="disabled">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'ButtonComponent',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="scss">
.button {
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  user-select: none;

  &:disabled {
    opacity: 0.4;
    cursor: no-drop;
    box-shadow: none;
    pointer-events: none;
  }
}
</style>
