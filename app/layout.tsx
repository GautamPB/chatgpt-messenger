// layout.tsx is a common template which is rendered in every page
import '@/styles/globals.css'
import Sidebar from '@/components/Sidebar'
import { SessionProvider } from '@/components/SessionProvider'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import Login from '@/components/Login'
import ClientProvider from '@/components/ClientProvider'

export const metadata = {
    title: 'Chat GPT Messenger',
    description: 'Messenger built with Chat GPT',
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await getServerSession(authOptions)

    return (
        <html lang="en">
            {/* all pages will be injected into the children prop */}
            <body>
                <SessionProvider session={session}>
                    {!session ? (
                        <Login />
                    ) : (
                        <div className="flex">
                            {/* Sidebar */}
                            <div className="bg-[#202123] max-w-xs h-screen overflow-y-auto md:min-w-[20rem]">
                                <Sidebar />
                            </div>

                            <ClientProvider />

                            <div className="bg-[#343541] flex-1">
                                {children}
                            </div>
                        </div>
                    )}
                </SessionProvider>
            </body>
        </html>
    )
}
