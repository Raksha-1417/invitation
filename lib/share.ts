const DEPLOY_URL = 'https://rohit-nandini.vercel.app'
export const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/xDXkPKzS7PEKkJ9y5'
export const WHATSAPP_NUMBER = '+91 8796119608'

export function getWhatsAppShareUrl(): string {
  const message = `Rohit & Nandini are getting married! ❤️

With love in our hearts and joy in every moment, we invite you to celebrate the beginning of our forever together.${DEPLOY_URL}`
  return `https://wa.me/?text=${encodeURIComponent(message)}`
}

export function getDesignerWhatsAppUrl(): string {
  return `https://wa.me/${WHATSAPP_NUMBER}`
}
