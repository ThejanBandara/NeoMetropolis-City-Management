'use client'
import Sidebar from '@/components/Sidebar'
import { useAuth } from '@/lib/context/AuthContext'
import { redirect } from 'next/navigation';
import { useEffect } from 'react'

export default function Home() {

  const user = useAuth();

  useEffect(() => {
    if (!user.user) {
      redirect('/login')
    }
  }, [])

  return (
    <main className='w-full h-screen'>
      <Sidebar />
    </main>
  )
}
