import type { Metadata } from "next"
import { PropsWithChildren } from "react"
import "@/css/style.css"
import "@/css/satoshi.css"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard Application",
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-black dark:bg-gray-900 dark:text-white">
        {children}
      </body>
    </html>
  )
}
