export default {
  profile: "Perfil",
  // components/merchantServiceSelector.vue
  offers: "Ofertas que puedes reservar",
  // components/serviceBookingForm.vue
  buyerDate: "Fecha",
  buyerTime: "Horario",
  selectDateFirst: "Primero seleciona una fecha",
  from: "Desde",
  to: "hasta",
  buyerExtras: "Extras",
  buyerName: "Nombre",
  buyerEmail: "Correo",
  buyerFingerprint: "Huella digital de la clave pública PGP",
  buyerPGP: "Clave pública PGP",
  fingerprintOnServer: "Asegúrese de que la clave pública esté presente en keys.openpgp.org",
  buyerDetails: "Detalles",
  buyerLanguage: "Idioma",
  buyerService: "Servicio",
  buyerGateway: "Tipo de pago",
  bookEvent: "Reservar",
  clearSelection: "Quitar selección",
  // components/invoice/invoiceProfile.vue
  invoice: "Factura",
  booking: "Reserva",
  surcharge: "Debido a los procesadores de pagos, se cobre un recargo en los pagos en shitcoins ({gateways}).",
  and: "y",
  notProvided: "No proporcionado",
  // components/invoice/bitcoin/invoiceBitcoinNew.vue
  invoiceNew: "Nueva factura",
  invoiceId: "ID de la factura",
  oderId: "ID del pedido",
  viewDetails: "Ver detalles",
  hideDetails: "Ocultar detalles",
  totalPrice: "Precio total",
  totalFiat: "Fiat total",
  exchangeRate: "Tarifa de cambio",
  amountDue: "Cantidad debida",
  recommendedFee: "Tarifa recomendada",
  payWith: "Pagar con",
  bitcoin: "Bitcoin",
  lnurl: "Lnurl",
  lightning: "Lightning",
  address: "Dirección",
  invoice: "Factura",
  amount: "Monto",
  payInWallet: "Pagar con billetera",
  // components/invoice/bitcoin/invoiceBitcoinExpired.vue
  invoiceExpired: "Factura vencida",
  invoiceValidity: "Una factura en bitcoin solo es válida por {minutes} minutos",
  payWithBitcoin: "Pagar en Bitcoin",
  // components/invoice/bitcoin/invoiceBitcoinReceived.vue
  invoicePaid: "Factura pagada",
  invoiceReceived: "han sido pagados",
  printReceipt: "Imprimir el recibo",
  // components/invoice/fiat/invoiceFiatSelector.vue
  selectPaymentMethod: 'Seleccionar un método de pago',
  // components/invoice/fiat/invoiceFiatSepa.vue
  buyerLegalName: 'Nombre y appellido',
  buyerLegalAddress: 'Dirección',
  buyerLegalCity: 'Ciudad',
  buyerLegalZip: 'Código postal',
  buyerLegalCountry: 'País',
  buyerBic: 'BIC del banco',
  buyerIban: 'IBAN',
  // error.vue
  pageNotFound: "Esta página no se pudo encontrar",
  unauthorized: "No autorizado",
  somethingWentWrong: "Algo salió mal",
  backToTheHomePage: "Volver a la página de inicio",
  // plugins/validateCustomRules.js
  customRules: {
    arrayLengthBetween: "Puede reservar entre 0:{min} y 1:{max} espacios para cada día",
    validateIban: "Formato IBAN no válido",
    validateBic: "BIC del banco no válido",
    _isOnServer: "No encontramos una clave pública en el servidor\nkeys.openpgp.org\nasociado con la huella digital proporcionada",
    _isAssociatedWithEmail: "La clave pública con huella digital propociondada\nno está asociada con el correo electrónico {target}"
  }
}
