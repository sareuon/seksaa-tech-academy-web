'use client'

import { useState } from 'react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  MessageSquare,
  BarChart3,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  LogOut,
  User,
  Shield,
  FileText,
  CreditCard,
  HelpCircle
} from 'lucide-react'
import { getUnreadNotifications } from '@/lib/data'
import type { AdminUser } from '@/types'

interface AdminLayoutProps {
  children: React.ReactNode
  currentUser: AdminUser
}

export default function AdminLayout({ children, currentUser }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = '/admin' // Static for export
  const notifications = getUnreadNotifications()

  const navigation = [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: LayoutDashboard,
      permission: 'all'
    },
    {
      name: 'Students',
      href: '/admin/students',
      icon: Users,
      permission: 'students',
      badge: '342'
    },
    {
      name: 'Programs',
      href: '/admin/programs',
      icon: GraduationCap,
      permission: 'programs'
    },
    {
      name: 'Instructors',
      href: '/admin/instructors',
      icon: User,
      permission: 'instructors'
    },
    {
      name: 'Enrollments',
      href: '/admin/enrollments',
      icon: CreditCard,
      permission: 'students',
      badge: '12'
    },
    {
      name: 'Schedule',
      href: '/admin/schedule',
      icon: Calendar,
      permission: 'schedules'
    },
    {
      name: 'Blog & Content',
      href: '/admin/content',
      icon: BookOpen,
      permission: 'blog'
    },
    {
      name: 'Testimonials',
      href: '/admin/testimonials',
      icon: MessageSquare,
      permission: 'testimonials'
    },
    {
      name: 'Analytics',
      href: '/admin/analytics',
      icon: BarChart3,
      permission: 'analytics'
    },
    {
      name: 'Inquiries',
      href: '/admin/inquiries',
      icon: HelpCircle,
      permission: 'inquiries',
      badge: notifications.filter(n => n.type === 'info').length.toString()
    }
  ]

  const hasPermission = (permission: string) => {
    if (currentUser.permissions.includes('all')) return true
    return currentUser.permissions.includes(permission)
  }

  const filteredNavigation = navigation.filter(item => hasPermission(item.permission))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <Link href="/admin" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Admin</span>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {filteredNavigation.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              
              return (
                <Link
                  key={item.name}
                  href={item.href as any}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5" />
                    {item.name}
                  </div>
                  {item.badge && (
                    <Badge 
                      variant={isActive ? 'default' : 'secondary'} 
                      className="text-xs"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                {currentUser.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {currentUser.name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {currentUser.role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </p>
              </div>
            </div>
            
            <div className="space-y-1">
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search students, programs..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                {notifications.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {notifications.length}
                  </Badge>
                )}
              </Button>

              {/* Quick Actions */}
              <div className="hidden md:flex items-center gap-2">
                <Button size="sm" variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Add Student
                </Button>
                <Button size="sm">
                  <GraduationCap className="h-4 w-4 mr-2" />
                  New Program
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  )
} 