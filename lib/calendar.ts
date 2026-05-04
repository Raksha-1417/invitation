export async function generateICS(): Promise<void> {
  const { createEvent } = await import('ics')

  const { error, value } = createEvent({
    title: 'Naveen & Shreya Wedding',
    description:
      'Wedding ceremony of Naveen & Shreya. With the blessings of the Pattar family. Muhurtham — 14 May 2026, 12:32 PM',
    location:
      'Vaibhav Hall, Vaibhav Nagar, Bauxite Road, Belagavi',
    start: [2026, 4, 26, 12, 43],
    end: [2026, 4, 26, 16, 0],
    url: 'naveen-shreya.vercel.app',
    organizer: { name: 'Ankad Family' },
    status: 'CONFIRMED',
    busyStatus: 'BUSY',
  })

  if (error || !value) return

  const blob = new Blob([value], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'naveen-shreya-wedding.ics'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
