import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((nuxtApp) => {

  const { public: { deploymentDomain }} = useRuntimeConfig();

  return {
    provide: {
      createInvoice: async ({
        buyerTime,
        buyerExtras,
        buyerName,
        buyerEmail,
        buyerFingerprint,
        buyerPGP,
        buyerDetails,
        buyerService,
        buyerGateway
      }) => {

        // Get buyer locale
        const { locale: { value: locale }} = nuxtApp.$i18n;

        // Get the service specific settings from md file
        const  {
          currency,
          price,
        } = await queryContent(`/services/${buyerService}`).locale(locale).findOne()

        // Get merchant email requirement settings
        const {
          fields: {
            email
          }
        } = await queryContent(`/settings`).findOne();


        // Set the expiration and monitoring in minutes for shitcoins based on the gateway selected
        // Leave the btcpay store default for bitcoin
        let expirationMinutes, monitoringMinutes
        switch(buyerGateway) {
          case 'altcoins':
            expirationMinutes = 1
            monitoringMinutes = null
            break;
          case 'fiat':
            expirationMinutes = 60 * 24 * 2
            monitoringMinutes = 60 * 24 * 7
            break;
          default:
            expirationMinutes = null
            monitoringMinutes = null
        }
      
        // Create the invoice on btcpay Greenfield api
        // And get the invoiceId page
        const { id: invoiceId } = await $fetch('/api/invoices', {
          method: 'POST',
          // Create the request body for btcpay
          body: {
            currency,
            amount: buyerTime.length * price,
            metadata: {
              orderId: `${buyerService}-${buyerTime.map(t => new Date(t).getTime()).join('-')}`,
              buyerTime,
              buyerExtras,
              buyerName,
              buyerEmail,
              buyerFingerprint,
              buyerPGP,
              buyerDetails,
              buyerLanguage: locale,
              buyerService,
              buyerGateway
            },
            checkout: {
              // Expiration 1 minutes for test purpose only
              // Remove it when done
              expirationMinutes: 1,
              monitoringMinutes,
              redirectAutomatically: false,
              requiresRefundEmail: email === 'required'
            }
          }
        });

        // Create the webhhok for notification about the invoice
        // With the same id of the invoiceId
        // The secret is added serverside
        await $fetch('/api/webhooks', {
          method: 'POST',
          body: {
            id: invoiceId,
            url: `${deploymentDomain}/api/socket`,
            automaticRedelivery: false
          }
        })
        
        await navigateTo({
          path: `/${locale}/invoice/${invoiceId}`
        })
      }
    }
  }
})