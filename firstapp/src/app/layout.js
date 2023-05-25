'use client'

import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import Header from './Header'
import { SessionProvider } from 'next-auth/react'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Next.js</title>
      </head>
      <body>
        <SessionProvider>
          <Header />
          <ToastContainer />
          {children}
        </SessionProvider>
      </body>
    </html>)
}