const DEPLOY_URL = 'https://naveen-shreya.vercel.app'
export const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/jxqQPP7D2MW8DiaQ9'
export const WHATSAPP_NUMBER = '+91 9741624840'
export const WHATSAPP_NUMBER_BOOKING = '+91 9591617518'

export function getWhatsAppShareUrl(): string {
  const message = `Naveen & Shreya ❤️

It started with a “yes”…
and grew into something beautiful.

Join us as we begin our forever ✨

View wedding details: ${DEPLOY_URL}`
  return `https://wa.me/?text=${encodeURIComponent(message)}`
}

export function getDesignerWhatsAppUrl(): string {
  return `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}`
}
