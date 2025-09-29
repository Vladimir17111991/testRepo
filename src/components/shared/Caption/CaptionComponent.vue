<template>
  <span :class="captionModifiers" class="caption">
    <slot />
  </span>
</template>

<script>
export default {
  name: 'CaptionComponent',
  props: {
    uppercase: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: '',
    },
  },
  computed: {
    captionModifiers() {
      return {
        [`caption--${this.size}`]: this.size,
        'caption--uppercase': this.uppercase,
      };
    },
  },
};
</script>

<style lang="scss">
@use '/src/scss/globals' as *;

.caption {
  $map-sizes: (
    'xxxs': 8,
    'xxs': 10,
    'xs': 12,
    's': 14,
    'sm': 16,
    'm': 18,
    'ml': 20,
    'xl': 40,
  );

  font-size: var(--caption-fz, inherit);
  line-height: var(--caption-lh, inherit);

  &--uppercase {
    text-transform: uppercase;
  }

  @mixin size-classes($map, $variable-name, $base-size) {
    @each $name, $value in $map {
      &--#{$name} {
        --#{$variable-name}: #{em($value, $base-size)};
      }
    }
  }

  @include size-classes($map-sizes, 'caption-fz', $fz_base);

  @each $name, $value in $map-sizes {
    &--#{$name} {
      --caption-lh: #{em($value + 2, $value)};
    }
  }
}
</style>
