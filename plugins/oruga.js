import { defineNuxtPlugin } from '#app';
import {
  OField,
  ODatepicker,
  OInput,
  OSelect,
  OCheckbox,
  OButton,
  OModal,
  OCollapse,
  ONotification,
  Config,
} from '@oruga-ui/oruga-next';
import { bulmaConfig } from '@oruga-ui/theme-bulma';

const myConfig = Object.assign(bulmaConfig, {
  notification: {
      ...bulmaConfig.notification,
      position: 'bottom-right'
  }
})

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('OField', OField);
  nuxtApp.vueApp.component('ODatepicker', ODatepicker);
  nuxtApp.vueApp.component('OInput', OInput);
  nuxtApp.vueApp.component('OSelect', OSelect);
  nuxtApp.vueApp.component('OCheckbox', OCheckbox);
  nuxtApp.vueApp.component('OButton', OButton);
  nuxtApp.vueApp.component('OModal', OModal);
  nuxtApp.vueApp.component('OCollapse', OCollapse);
  nuxtApp.vueApp.component('ONotification', ONotification);
  nuxtApp.vueApp.use(Config, myConfig);
});
