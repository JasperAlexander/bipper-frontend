import '@/app/globals.css'
import styles from '@/app/layout.module.css'
import { Inter } from '@next/font/google'
import Providers from '@/app/providers'
import { ReactNode } from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import HeaderContent from './headercontent'

const inter = Inter({ subsets: ['latin'] })

export default async function RootLayout({
  href,
  children,
}: {
  href: string
  children: ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers session={session}>
          <div className={styles.container}>
            <header className={styles.header}>
              <HeaderContent href={href} />
            </header>
            <main className={styles.main}>
              <div className={styles.mainContent}>{children}</div>
            </main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
