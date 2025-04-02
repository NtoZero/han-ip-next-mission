export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>
        <div>
          <div>Global Layout</div>
          {children}
        </div>
      </body>
    </html>
  )
}
