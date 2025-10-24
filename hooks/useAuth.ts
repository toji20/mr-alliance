'use server'

import { useSession } from 'next-auth/react'

export async function useAuth() {
  const { data: session, status } = useSession()
  
  return {
    user: session?.user,
    isAdmin: session?.user?.role === 'ADMIN',
    isLoading: status === 'loading',
    isAuthenticated: status === 'authenticated'
  }
}