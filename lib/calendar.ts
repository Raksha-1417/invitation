export async function generateICS(): Promise<void> {
  const { createEvent } = await import('ics')

  const { error, value } = createEvent({
    title: 'Rohit & Nandini Wedding',
    description:
      'Wedding ceremony of Rohit & Nandini. With the blessings of the Ankad family. Vivah — 26 April 2026, 12:43 PM',
    location:
      'Swapnapurti Lawns, Opp Shell Petrol Pump, Near Mirchi Hotel, Nandur Naka, Nashik',
    start: [2026, 4, 26, 12, 43],
    end: [2026, 4, 26, 16, 0],
    url: 'rohit-nandini.vercel.app',
    organizer: { name: 'Ankad Family' },
    status: 'CONFIRMED',
    busyStatus: 'BUSY',
  })

  if (error || !value) return

  const blob = new Blob([value], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'rohit-nandini-wedding.ics'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
