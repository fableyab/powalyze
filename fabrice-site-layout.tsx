export const metadata = {
  title: 'Fabrice Fays - PMO Senior & Data Analyst | Haute-Savoie Genève',
  description: 'Expert en pilotage de projets IT et Power BI. PMO Senior basé en Haute-Savoie. Missions temporaires, dashboards Power BI, gouvernance de projets.'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
