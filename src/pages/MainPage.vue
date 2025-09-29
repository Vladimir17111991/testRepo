<template>
  <div class="main-page">
    <div class="main-page__container">
      <div class="main-page__title">
        <CaptionComponent uppercase class="main-page__description">
          Casino <span class="main-page__sub-description"> Bet </span>
        </CaptionComponent>
      </div>
      <div class="main-page__free">
        <Free class="main-page__free-img" />
      </div>
      <div class="main-page__zeus">
        <img :src="'src/img/zeus.webp'" alt="zeus" class="main-page__zeus-img" />
      </div>
      <div class="main-page__triangle">
        <img :src="'src/img/triangle.png'" alt="triangle" class="main-page__triangle-img" />
      </div>
      <div class="main-page__blue-cube">
        <img :src="'src/img/blue-cube.webp'" alt="blue-cube" class="main-page__blue-cube-img" />
      </div>
      <div class="main-page__gold-cube">
        <img :src="'src/img/gold-cube.webp'" alt="gold-cube" class="main-page__gold-cube-img" />
      </div>
      <div class="main-page__registration">
        <RegistrationModal class="main-page__registration-modal" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import RegistrationModal from '../components/RegistrationModal.vue';
import CaptionComponent from '../components/shared/Caption/CaptionComponent.vue';
import Free from '../img/svg/Free.svg?component';
</script>
<style lang="scss">
@use '/src/scss/globals' as *;

.main-page {
  display: block;
  height: 100%;
  background-color: #52098b;
  background-image: url('../img/castle.png');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;

  &__container {
    display: grid;
    position: relative;
    grid-template-areas: '. title .' 'free free free' '. . .' 'registration registration registration';
    grid-template-rows: auto 0.3fr 1fr minmax(em(426, $fz), auto);
    grid-template-columns: 0.2fr 1fr 0.2fr;
    padding-top: clamp(em(15, $fz), 4vh, em(35, $fz));
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  &__title {
    display: flex;
    align-items: center;
    justify-content: center;
    grid-area: title;
    width: 100%;
    font-size: em(28, $fz);
    line-height: 1;
    letter-spacing: 2.4px;
  }

  &__description {
    display: flex;
    font-weight: 900;
    color: #fff;
  }

  &__sub-description {
    font-weight: 900;
    color: #ff0;
  }

  &__zeus {
    position: relative;
    z-index: 5;
    grid-area: 3/2/5/3;
  }

  &__zeus-img {
    display: flex;
    place-self: center;
    position: absolute;
    top: 0;
    width: em(399, $fz);
    object-fit: cover;
    transform: translate(-8%, -10%) scaleX(-1);
  }

  &__free {
    z-index: 10;
    grid-area: free;
  }

  &__free-img {
    display: flex;
    max-width: em(375, $fz);
    place-self: center;
  }

  &__triangle {
    position: relative;
    grid-area: 3/1/5/2;
  }

  &__triangle-img {
    position: absolute;
    left: 0;
    transform: translateY(-7%);
  }

  &__blue-cube {
    position: relative;

    grid-area: 1/3/4/3;
  }

  &__blue-cube-img {
    position: absolute;
    object-fit: cover;
    right: 0;
    bottom: 0;
    z-index: 50;
    width: em(256, $fz);
    height: em(176, $fz);
    overflow: hidden;
    pointer-events: none;

    transform: translate(50%, 50%);
  }

  &__gold-cube {
    position: relative;

    grid-area: 1/2/5/2;
  }

  &__gold-cube-img {
    position: absolute;
    bottom: 0;
    left: 50%;
    z-index: 10;
    width: em(256, $fz);
    height: em(176, $fz);
    overflow: hidden;
    object-fit: cover;
    pointer-events: none;
  }

  &__registration {
    position: relative;
    grid-area: registration;
    height: 100%;
  }

  &__registration-modal {
    z-index: 20;
    height: 100%;
  }

  @include media('screen', '>=xs') {
    &__container {
      grid-template-areas: '. . . . . .' 'title title title title title title' '. . free free . .' '. . free free . .' '. . . . . .';
      grid-template-rows: em(35, $fz) 0.2fr 0.7fr 0.9fr 0.5fr;
      grid-template-columns: 0.2fr 0.7fr 0.2fr 0.6fr 0.1fr 0.9fr;
      padding-top: 0;

      &::before {
        content: '';
        position: absolute;
        top: -85%;
        right: 0;
        width: 50%;
        height: 100%;
        border-radius: 50%;
        background: hsl(253deg 100% 65% / 78%);
        filter: blur(50px);
      }
    }

    &__registration {
      grid-area: 1/6/6/7;
    }

    &__zeus {
      grid-area: 4/2/6/4;

      &::before {
        content: '';
        position: absolute;
        left: 50%;
        width: 100%;
        height: 200%;
        border-radius: 50%;
        background: hsl(300deg 100% 60% / 88%);
        transform: translateX(-50%);

        filter: blur(80px);
      }
    }

    &__zeus-img {
      width: em(340, $fz);
      transform: translate(-8%, -10%) scaleX(-1);
    }

    &__free {
      align-self: center;
    }

    &__blue-cube {
      z-index: 10;
      grid-area: 2/4/3/6;
      transform: translateY(50%);
    }

    &__gold-cube {
      grid-area: 5/3/6/5;
    }

    &__triangle {
      grid-area: 4/1/6/3;
    }
  }

  @include media('screen', '>=l') {
    height: 100dvh;
    min-height: em(1080, $fz);

    &__container {
      grid-template-areas: '. . . . . .' 'title title title title title title' '. . free free free .' '. . free free free .' '. . . . . .';
      grid-template-rows: em(73, $fz) 0.17fr 1.5fr 1.2fr 0.5fr;
      grid-template-columns: 0.24fr 0.82fr 0.3fr 0.96fr 0.1fr 1.05fr;

      &::before {
        top: -75%;
        right: 0;
        width: 50%;
        height: 100%;
        background: hsl(253deg 100% 65% / 78%);
      }
    }

    &__title {
      font-size: em(57, $fz);
    }

    &__free-img {
      z-index: 10;
      max-width: em(736, $fz);
    }

    &__zeus {
      grid-area: 3/2/6/4;

      &::before {
        left: 50%;
        width: 100%;
        height: 200%;
        transform: translateX(-50%);
      }
    }

    &__zeus-img {
      z-index: 5;
      width: em(781, $fz);
      transform: translate(-7.4%, -7.6%) scaleX(-1);
    }

    &__triangle {
      grid-area: 4/1/6/3;
    }

    &__triangle-img {
      left: 0;
      width: em(673, $fz);
      height: em(821, $fz);
      transform: translateY(-29%);
    }

    &__blue-cube {
      grid-area: 1/4/3/6;
    }

    &__blue-cube-img {
      width: em(384, $fz);
      height: em(384, $fz);

      transform: translate(48%, 56%);
    }

    &__gold-cube {
      grid-area: 5/3/6/6;
    }

    &__gold-cube-img {
      left: 50%;
      z-index: 10;
      width: em(330, $fz);
      height: em(259, $fz);
    }
  }
}
</style>
