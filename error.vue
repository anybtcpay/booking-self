<script setup>
const props = defineProps({
  error: Object,
  required: true
});

useContentHead({
  title: props.error.statusCode,
  description: props.error.message
})

const {
  locale,
  t
} = useI18n();

let translatedErrorMessage
switch(props.error.statusCode) {
  case 401:
    translatedErrorMessage = t('error.unauthorized')
    break;
  case 403:
    translatedErrorMessage = t('error.unauthorized')
    break;
  case 404:
    translatedErrorMessage = t('error.pageNotFound')
    break;
  default:
    translatedErrorMessage = t('error.somethingWentWrong')
}

const handleError = () => clearError({ redirect: `/${locale.value}` });
</script>

<template>
  <div class="hero is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <p class="title">{{ translatedErrorMessage }}</p>
        <DevOnly v-if="props.error.statusCode !== 404">
          <div class="block content">
            <div>{{ error.statusMessage || error.message }}</div>
            <div>{{ error.stack }}</div>
          </div>
        </DevOnly>
        <button @click="handleError" class="button is-primary is-outlined">{{ $t('error.backToTheHomePage') }}</button>
      </div>
    </div>
  </div>
</template>
