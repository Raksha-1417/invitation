const DEPLOY_URL = 'rohit-nandini.vercel.app'
export const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/xDXkPKzS7PEKkJ9y5'
export const WHATSAPP_NUMBER = '919833000000'

export function getWhatsAppShareUrl(): string {
  const message = `You're invited to Rohit & Nandini's wedding on 26th April 2026. Open the invitation: ${DEPLOY_URL}`
  return `https://wa.me/?text=${encodeURIComponent(message)}`
}

export function getDesignerWhatsAppUrl(): string {
  return `https://wa.me/${WHATSAPP_NUMBER}`
}
