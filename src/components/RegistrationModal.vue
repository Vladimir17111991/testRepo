<template>
  <div class="registration-modal">
    <div class="registration-modal__container">
      <CaptionComponent class="registration-modal__title">Регистрация</CaptionComponent>
      <form class="registration-modal__form">
        <div class="registration-modal__form-group">
          <CaptionComponent class="registration-modal__label">Номер телефона</CaptionComponent>
          <div class="registration-modal__input-container">
            <div class="registration-modal__flag-content">
              <Flag class="registration-modal__flag" />
            </div>
            <input
              v-model="form.phone"
              class="registration-modal__input registration-modal__input-telefon"
              :class="{ 'registration-modal__input--error': errors.phone || phoneExists }"
              placeholder="+375"
              autocomplete="off"
              @input="formatPhone"
              @blur="validatePhone"
            />
          </div>
          <CaptionComponent v-if="errors.phone" class="registration-modal__error-message">
            {{ errors.phone }}
          </CaptionComponent>
          <CaptionComponent
            v-if="phoneExists && !errors.phone"
            class="registration-modal__error-message"
          >
            Такой номер уже зарегистрирован
          </CaptionComponent>
        </div>
        <div class="registration-modal__form-group">
          <label class="registration-modal__label">Пароль</label>
          <div class="registration-modal__password-wrapper">
            <input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              class="registration-modal__input registration-modal__input-password"
              :class="{ 'registration-modal__input--error': errors.password }"
              placeholder="Придумайте пароль"
              autocomplete="off"
              @input="validatePassword"
            />
            <ButtonComponent
              class="registration-modal__password-show"
              @click="showPassword = !showPassword"
            >
              <ShowPassword v-if="showPassword" />
              <HidePassword v-else />
            </ButtonComponent>
          </div>
          <div v-if="errors.password" class="registration-modal__error-message">
            {{ errors.password }}
          </div>
        </div>
      </form>
      <div class="registration-modal__checkboxes">
        <div class="registration-modal__checkbox-group">
          <Checkbox v-model="checkboxAgeConfirm" />
          <CaptionComponent class="registration-modal__checkbox-group-title">
            Мне больше 21 года
            <br />
            Я согласен и принимаю
            <a href="#" class="registration-modal__checkbox-group-link">«Правила приема ставок»</a>
            и
            <a href="#" class="registration-modal__checkbox-group-link"
              >«Политику конфиденциальности»</a
            >
          </CaptionComponent>
        </div>
        <div class="registration-modal__checkbox-group">
          <Checkbox v-model="checkboxTermsConfirm" />
          <CaptionComponent class="registration-modal__checkbox-group-title">
            Я принимаю участие и согласен с
            <a href="#" class="registration-modal__checkbox-group-link">условиями бонуса</a>
          </CaptionComponent>
        </div>
      </div>
      <ButtonComponent
        class="registration-modal__button"
        :disabled="!isFormValid"
        @click="handleSubmit"
      >
        <CaptionComponent uppercase>Регистрация</CaptionComponent>
      </ButtonComponent>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';

import Flag from '../img/svg/Flag.svg?component';
import HidePassword from '../img/svg/HidePassword.svg?component';
import ShowPassword from '../img/svg/ShowPassword.svg?component';
import ButtonComponent from './shared/Button/ButtonComponent.vue';
import CaptionComponent from './shared/Caption/CaptionComponent.vue';
import Checkbox from './shared/Checkbox/Checkbox.vue';

const form = reactive({
  phone: '',
  password: '',
});

interface Errors {
  phone: string;
  password: string;
}
const showPassword = ref(false);
const phoneExists = ref(false);
const checkboxAgeConfirm = ref(false);
const checkboxTermsConfirm = ref(false);
const STORAGE_KEY = 'registeredPhone';
const getStoredPhone = (): string | null => {
  return localStorage.getItem(STORAGE_KEY);
};
const savePhoneToStorage = (phone: string): void => {
  localStorage.setItem(STORAGE_KEY, phone);
};
const errors = reactive<Errors>({
  phone: '',
  password: '',
});
const isFormValid = computed(() => {
  const phoneValid = form.phone.length === 19 && !errors.phone && !phoneExists.value;
  const passwordValid = form.password.length >= 6 && !errors.password;
  const checkboxesValid = checkboxTermsConfirm.value && checkboxAgeConfirm.value;

  return phoneValid && passwordValid && checkboxesValid;
});

const formatPhone = (): void => {
  const cleanPhone = form.phone.replace(/\D/g, '').replace(/^375/, '').substring(0, 9);

  const parts = [
    cleanPhone.substring(0, 2),
    cleanPhone.substring(2, 5),
    cleanPhone.substring(5, 7),
    cleanPhone.substring(7, 9),
  ].filter((part) => part.length > 0);

  if (parts.length === 0) {
    form.phone = '+375 ';

    return;
  }

  form.phone = `+375 (${parts[0]}${parts[1] ? `) ${parts[1]}` : ''}${
    parts[2] ? `-${parts[2]}` : ''
  }${parts[3] ? `-${parts[3]}` : ''}`;
};
const validatePhone = (): void => {
  const phoneDigits = form.phone.replace(/\D/g, '');

  if (phoneDigits.length !== 12) {
    errors.phone = 'Введите корректный номер телефона';

    return;
  }
  const storedPhone = getStoredPhone();

  phoneExists.value = storedPhone === form.phone;

  errors.phone = '';
};

// Валидация пароля
const validatePassword = () => {
  if (form.password.length < 6) {
    errors.password = 'Пароль должен содержать не менее 6 символов';

    return;
  }

  errors.password = '';
};

const handleSubmit = async () => {
  validatePhone();
  validatePassword();

  if (!isFormValid.value) return;
  savePhoneToStorage(form.phone);
};
</script>

<style scoped lang="scss">
@use '/src/scss/globals' as *;

.registration-modal {
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: em(24 24 0 0, $fz);
  background: #0f0219;

  &__container {
    display: flex;
    flex-direction: column;

    gap: em(24, $fz);
    padding: em(34 48 48, $fz);
    width: 100%;
    max-width: 400px;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__title {
    margin: 0;
    font-size: 22px;
    font-weight: 500;
    color: #fff;
  }

  &__password-show {
    position: absolute;
    top: 50%;
    right: 12px;
    cursor: pointer;
    padding: 4px;
    border: none;
    border-radius: 4px;
    background: none;
    color: #666;
    transform: translateY(-50%);
  }

  &__checkboxes {
    display: flex;
    flex-direction: column;
    gap: em(8, $fz);
  }

  &__checkbox-group {
    display: flex;
    align-items: center;
    gap: em(8, $fz);
  }

  &__checkbox-group-title {
    $fz: 11;

    font-size: em($fz, $fz_base);
    font-weight: 400;
    line-height: em(14, $fz);
    color: #bbc6f2;
  }

  &__checkbox-group-link {
    text-decoration: underline;
  }

  &__input {
    box-sizing: border-box;

    width: 100%;
    outline: none;
    border: 1px solid #e1e5e9;
    border-radius: em(8, $fz);
    background: #f1f3f6;
    font-size: em(13, $fz);
    transition: all 0.2s;

    &:focus {
      border-color: #5ab828;
    }

    &--error {
      border-color: #f91717;
    }
  }

  &__input-container {
    position: relative;
  }

  &__input-telefon {
    padding: em(12 11 12 55, $fz);
  }

  &__input-password {
    padding: em(12 55 12 11, $fz);
  }

  &__password-wrapper {
    position: relative;
  }

  &__flag {
    width: em(18, $fz);
    height: em(18, $fz);
  }

  &__flag-content {
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    width: em(44, $fz);
    inset: em(2, $fz);
    border-radius: em(6, $fz);
    background: #fff;
  }

  &__button {
    $fz: 16;

    cursor: pointer;
    padding: em(17 90, $fz);
    width: 100%;
    border: none;
    border-radius: em(8, $fz);
    background: #5ab828;
    font-size: em(13, $fz_base);
    font-weight: 500;
    color: #fff;
    transition: all 0.2s linear;
    user-select: none;

    &:hover:not(:disabled) {
      box-shadow: 0 0 em(15, $fz) 0 #4bd70080;
    }

    &:disabled {
      cursor: not-allowed;
      box-shadow: none;
      background: #6c757d;
      transform: none;
    }
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: em(8, $fz);
  }

  &__label {
    $fz: 16;

    display: block;
    margin-bottom: em(8, $fz);
    font-size: em(13, $fz_base);
    font-weight: 500;
    color: #bbc6f2;
  }

  &__error-message {
    display: flex;
    align-items: center;
    margin-top: 4px;
    font-size: 12px;
    color: #dc3545;
  }

  @include media('screen', '>=xs') {
    border-radius: 0;
    background: #000000b2;
    backdrop-filter: blur(15px);

    &__container {
      padding: em(34 20 30, $fz);
    }
  }

  @include media('screen', '>=l') {
    &__container {
      justify-content: center;
      padding: em(27 100, $fz);
      max-width: initial;
      height: 100%;
      gap: em(23, $fz);
    }

    &__label {
      margin-bottom: em(8, $fz);
    }
  }
}
</style>
