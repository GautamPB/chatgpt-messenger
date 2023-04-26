'use client'

import { collection, orderBy, query } from 'firebase/firestore'
import NewChat from './NewChat'
import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { db } from '@/firebase'
import ChatRow from './ChatRow'

function Sidebar() {
    const { data: session } = useSession()

    const [chats, loading, error] = useCollection(
        session &&
            query(
                collection(db, 'users', session?.user?.email!, 'chats'),
                orderBy('createdAt', 'asc')
            )
    )

    return (
        <div className="p-2 flex flex-col h-screen">
            <div className="flex-1">
                {/* New chat button */}
                <NewChat />

                {/* chat rows */}
                {chats?.docs.map((chat) => (
                    <ChatRow key={chat.id} id={chat.id} />
                ))}
            </div>

            {session && (
                <img
                    onClick={() => signOut()}
                    src={session?.user?.image!}
                    alt="Profile Picture"
                    className="h-12 w-12 transition duration-300 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50"
                />
            )}
        </div>
    )
}

export default Sidebar
