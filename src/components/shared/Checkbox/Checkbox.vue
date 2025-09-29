<template>
  <div class="checkbox" :class="{ 'checkbox--active': isCheck }" @click="toggleCheckbox">
    <slot />
    <TransitionOpacity>
      <div v-if="isCheck" class="checkbox__mark">
        <svg
          width="10"
          height="8"
          viewBox="0 0 10 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 4L4 7L9 1"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </TransitionOpacity>
  </div>
</template>

<script setup lang="ts">
import TransitionOpacity from '../Transition/TransitionOpacity.vue';

const isCheck = defineModel<boolean>({ default: false });
const emits = defineEmits<{
  (e: 'toggle', value: boolean): void;
}>();
const toggleCheckbox = () => {
  isCheck.value = !isCheck.value;
  emits('toggle', isCheck.value);
};
</script>

<style lang="scss" scoped>
@use '/src/scss/globals' as *;

.checkbox {
  display: grid;
  position: relative;

  align-items: center;
  grid-auto-flow: column;
  grid-gap: em(10, $fz);
  width: 100%;
  max-width: em(18, $fz);
  height: em(18, $fz);
  border-radius: em(4, $fz);
  background: #f1f3f6;

  &--active {
    background: #5ab828;
  }

  &__mark {
    position: absolute;
    top: 50%;
    left: 50%;
    color: #fff;
    transform: translate(-50%, -60%);
    transform-origin: center center;
  }
}
</style>
