'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/admin-layout'
import AdminDashboard from '@/components/admin/admin-dashboard'
import { getAdminUserById } from '@/lib/data'
import type { AdminUser } from '@/types'

export default function AdminPage() {
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulate authentication check
    const checkAuth = async () => {
      try {
        setLoading(true)
        
        // In a real application, this would check authentication tokens
        // For demo purposes, we'll use a mock admin user
        const mockUserId = 'admin-1' // This would come from auth context
        const user = getAdminUserById(mockUserId)
        
        if (!user) {
          setError('User not found')
          return
        }

        if (!user.isActive) {
          setError('Account is deactivated')
          return
        }

        setCurrentUser(user)
      } catch (err) {
        setError('Authentication failed')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Authenticating...</p>
        </div>
      </div>
    )
  }

  if (error || !currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-4">{error || 'You do not have permission to access this area.'}</p>
          <button
            onClick={() => window.location.href = '/'}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <AdminLayout currentUser={currentUser}>
      <AdminDashboard currentUser={currentUser} />
    </AdminLayout>
  )
} 