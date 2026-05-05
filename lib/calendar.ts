// Google Calendar URL — works on all platforms as a reliable fallback
export const GOOGLE_CALENDAR_URL =
  'https://calendar.google.com/calendar/render?action=TEMPLATE' +
  '&text=Naveen+%26+Shreya+Wedding' +
  '&dates=20260514T070200Z/20260514T103000Z' +
  '&details=Wedding+ceremony+of+Naveen+%26+Shreya.+Muhurtham+%E2%80%94+14+May+2026%2C+12%3A32+PM.+With+the+blessings+of+the+Pattar+family.' +
  '&location=Vaibhav+Hall%2C+Vaibhav+Nagar%2C+Bauxite+Road%2C+Belagavi' +
  '&sf=true&output=xml'

function isMobile(): boolean {
  if (typeof navigator === 'undefined') return false
  return (
    /iPad|iPhone|iPod/i.test(navigator.userAgent) ||
    /android/i.test(navigator.userAgent) ||
    // iPad on iOS 13+ reports as MacIntel with touch
    (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
  )
}

// Build a valid ICS string without any external library
function buildICS(): string {
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Naveen & Shreya Wedding//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    'UID:naveen-shreya-wedding-2026@invitation',
    'DTSTAMP:20260501T000000Z',
    'DTSTART:20260514T070200Z',   // 12:32 PM IST = 07:02 UTC
    'DTEND:20260514T103000Z',     // 04:00 PM IST = 10:30 UTC
    'SUMMARY:Naveen & Shreya Wedding',
    'DESCRIPTION:Wedding ceremony of Naveen & Shreya.\\nMuhurtham — 14 May 2026\\, 12:32 PM.\\nWith the blessings of the Pattar family.',
    'LOCATION:Vaibhav Hall\\, Vaibhav Nagar\\, Bauxite Road\\, Belagavi',
    'URL:https://naveen-shreya.vercel.app',
    'STATUS:CONFIRMED',
    'TRANSP:OPAQUE',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
}

export function generateICS(): void {
  if (isMobile()) {
    // iOS & Android: open Google Calendar directly — most reliable on all mobile browsers
    window.open(GOOGLE_CALENDAR_URL, '_blank', 'noopener,noreferrer')
    return
  }

  // Desktop: standard .ics blob download
  const blob = new Blob([buildICS()], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'naveen-shreya-wedding.ics'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

