<template>
    <Transition name="transition-opacity">
        <slot />
    </Transition>
</template>

<script setup lang="ts">
import { computed, defineProps, withDefaults } from 'vue';

const props = withDefaults(defineProps<{ durationSeconds?: number }>(), { durationSeconds: 0.3 });
const duration = computed(() => `${props.durationSeconds}s`);
</script>

<style scoped lang="scss">
.transition-opacity {
    &-enter-active,
    &-leave-active {
        transition: opacity v-bind(duration) linear;
    }

    &-enter-from,
    &-leave-to {
        opacity: 0;
    }

    &-enter-to,
    &-leave-from {
        opacity: 1;
    }
}
</style>
