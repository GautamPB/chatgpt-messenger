'use client'

import { useState, FormEvent } from 'react'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import { useSession } from 'next-auth/react'
import { addDoc, collection, doc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/firebase'
import toast from 'react-hot-toast'

type Props = {
    chatId: string
}

const ChatInput = ({ chatId }: Props) => {
    const [message, setMessage] = useState('')

    const { data: session } = useSession()

    // TODO: useSWR to get model
    const model = 'text-davinci-003'

    const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!message) {
            return
        }
        const input = message.trim()

        setMessage('')

        const response: Message = {
            text: input,
            createdAt: serverTimestamp(),
            user: {
                _id: session?.user?.email!,
                name: session?.user?.name!,
                avatar:
                    session?.user?.image! ||
                    `https://ui-avatars.com/api/?name=${session?.user?.name!}`,
            },
        }

        await addDoc(
            collection(
                db,
                'users',
                session?.user?.email!,
                'chats',
                chatId,
                'messages'
            ),
            response
        )

        // toast notification to say thinking...
        const notification = toast.loading('Chat GPT is thinking...')

        await fetch('/api/askQuestion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: input,
                chatId,
                model,
                session,
            }),
        }).then((res) => {
            // toast notification to say successful
            toast.success('ChatGPT has responded', {
                id: notification,
            })
        })
    }

    return (
        <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm">
            <form onSubmit={sendMessage} className="p-5 space-x-5 flex-1 flex">
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    type="text"
                    disabled={!session}
                    placeholder="Enter your message here..."
                    className="bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300"
                />
                <button
                    disabled={!message || !session}
                    type="submit"
                    className="bg-[#11a37f] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                    <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
                </button>
            </form>

            <div>{/* model selection */}</div>
        </div>
    )
}

export default ChatInput
