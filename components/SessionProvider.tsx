// client side component (anything which requires window or local storage)
// next 13 components are by default, server components
'use client';

import { Session } from 'next-auth';
import { SessionProvider as Provider } from 'next-auth/react';
import React from 'react';

type Props = {
    children: React.ReactNode;
    session: Session | null;
};

export function SessionProvider({ children, session }: Props) {
    return <Provider>{children}</Provider>;
}
