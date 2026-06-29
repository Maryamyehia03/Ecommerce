"use client"
import { SessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'
import CartProvider from './app/context/Cartcontext'
import WishlistProvider from './app/context/WishlistContext'

export default function Providers({ children }:{children: ReactNode}) {
  return (
    <SessionProvider>
      <CartProvider>
        <WishlistProvider>
          {children}
        </WishlistProvider>
      </CartProvider>
    </SessionProvider>
  )
}
