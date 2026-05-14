import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CompareBar } from '@/components/layout/CompareBar'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Youth in Green Hydrogen - Policy & Knowledge Hub',
  description: 'Empowering African youth in green hydrogen policy and clean energy transition',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <CompareBar />
      </body>
    </html>
  )
}