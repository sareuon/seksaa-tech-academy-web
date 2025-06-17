'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { 
  Users, 
  GraduationCap, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
  PieChart,
  Activity,
  Bell,
  Settings,
  UserPlus,
  BookOpen,
  Calendar,
  MessageSquare,
  Shield,
  Server,
  Database,
  Cpu,
  HardDrive
} from 'lucide-react'
import { 
  getDashboardMetrics,
  getRecentActivities,
  getUnreadNotifications,
  getQuickActionsByPermission,
  getSystemHealth,
  getDashboardSummary,
  getEnrollmentTrends,
  getProgramPerformance
} from '@/lib/data'
import type { AdminUser, DashboardMetrics } from '@/types'

interface AdminDashboardProps {
  currentUser: AdminUser
}

export default function AdminDashboard({ currentUser }: AdminDashboardProps) {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading dashboard data
    const loadDashboardData = async () => {
      setLoading(true)
      // In real implementation, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setMetrics(getDashboardMetrics())
      setLoading(false)
    }

    loadDashboardData()
  }, [])

  const recentActivities = getRecentActivities(5)
  const notifications = getUnreadNotifications()
  const quickActions = getQuickActionsByPermission(currentUser.permissions)
  const systemHealth = getSystemHealth()
  const enrollmentTrends = getEnrollmentTrends(6)
  const programPerformance = getProgramPerformance()

  if (loading || !metrics) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const getMetricIcon = (type: string) => {
    const icons = {
      students: Users,
      revenue: DollarSign,
      enrollments: GraduationCap,
      completion: CheckCircle,
      placement: TrendingUp,
      rating: BarChart3,
      instructors: Users
    }
    return icons[type as keyof typeof icons] || Activity
  }

  const getMetricColor = (type: string) => {
    const colors = {
      students: 'text-blue-600 bg-blue-100',
      revenue: 'text-green-600 bg-green-100',
      enrollments: 'text-purple-600 bg-purple-100',
      completion: 'text-orange-600 bg-orange-100',
      placement: 'text-indigo-600 bg-indigo-100',
      rating: 'text-pink-600 bg-pink-100',
      instructors: 'text-cyan-600 bg-cyan-100'
    }
    return colors[type as keyof typeof colors] || 'text-gray-600 bg-gray-100'
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`
  }

  const getActivityIcon = (type: string) => {
    const icons = {
      enrollment: UserPlus,
      program_update: BookOpen,
      instructor_added: GraduationCap,
      testimonial_approved: MessageSquare,
      blog_published: BookOpen,
      payment: DollarSign,
      system: Settings
    }
    return icons[type as keyof typeof icons] || Activity
  }

  const getNotificationColor = (type: string) => {
    const colors = {
      urgent: 'border-red-200 bg-red-50 text-red-800',
      warning: 'border-yellow-200 bg-yellow-50 text-yellow-800',
      info: 'border-blue-200 bg-blue-50 text-blue-800',
      success: 'border-green-200 bg-green-50 text-green-800'
    }
    return colors[type as keyof typeof colors] || 'border-gray-200 bg-gray-50 text-gray-800'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Welcome back, {currentUser.name}</p>
            </div>
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <div className="relative">
                <Button variant="outline" size="sm" className="relative">
                  <Bell className="h-4 w-4" />
                  {notifications.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                      {notifications.length}
                    </Badge>
                  )}
                </Button>
              </div>
              
              {/* User Avatar */}
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {currentUser.name.split(' ').map(n => n[0]).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Students</p>
                    <p className="text-3xl font-bold text-gray-900">{metrics.overview.totalStudents.toLocaleString()}</p>
                    <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                      <TrendingUp className="h-3 w-3" />
                      +12% from last month
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                    <p className="text-3xl font-bold text-gray-900">{formatCurrency(metrics.overview.monthlyRevenue)}</p>
                    <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                      <TrendingUp className="h-3 w-3" />
                      +{metrics.revenue.growthRate.toFixed(1)}% growth
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Enrollments</p>
                    <p className="text-3xl font-bold text-gray-900">{metrics.overview.activeEnrollments}</p>
                    <p className="text-sm text-blue-600 flex items-center gap-1 mt-1">
                      <Clock className="h-3 w-3" />
                      {metrics.enrollments.thisMonth} this month
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <GraduationCap className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Job Placement Rate</p>
                    <p className="text-3xl font-bold text-gray-900">{formatPercentage(metrics.overview.jobPlacementRate)}</p>
                    <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                      <CheckCircle className="h-3 w-3" />
                      Above target
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-indigo-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Charts and Analytics */}
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="programs">Programs</TabsTrigger>
                  <TabsTrigger value="students">Students</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  {/* Enrollment Trends */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        Enrollment Trends
                      </CardTitle>
                      <CardDescription>Monthly enrollment and revenue trends</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {enrollmentTrends.map((trend, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium">{trend.month}</p>
                              <p className="text-sm text-gray-600">{trend.enrollments} enrollments</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-green-600">{formatCurrency(trend.revenue)}</p>
                              <p className="text-sm text-gray-600">Revenue</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Revenue Breakdown */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <PieChart className="h-5 w-5" />
                        Revenue by Program
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {Object.entries(metrics.revenue.byProgram).map(([programId, revenue]) => {
                          const percentage = (revenue / metrics.revenue.thisMonth) * 100
                          return (
                            <div key={programId} className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="capitalize">{programId.replace('-', ' ')}</span>
                                <span className="font-medium">{formatCurrency(revenue)}</span>
                              </div>
                              <Progress value={percentage} className="h-2" />
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="programs" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Program Performance</CardTitle>
                      <CardDescription>Enrollment and completion rates by program</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {programPerformance.map((program) => (
                          <div key={program.programId} className="p-4 border rounded-lg">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-medium">{program.programName}</h4>
                              <Badge variant="secondary">{program.enrollments} students</Badge>
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <p className="text-gray-600">Revenue</p>
                                <p className="font-bold text-green-600">{formatCurrency(program.revenue)}</p>
                              </div>
                              <div>
                                <p className="text-gray-600">Completion</p>
                                <p className="font-bold">{formatPercentage(program.completionRate)}</p>
                              </div>
                              <div>
                                <p className="text-gray-600">Rating</p>
                                <p className="font-bold">{program.averageRating.toFixed(1)}/5</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="students" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Student Demographics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-3">Gender Distribution</h4>
                          <div className="space-y-2">
                            {Object.entries(metrics.students.genderDistribution).map(([gender, percentage]) => (
                              <div key={gender} className="flex justify-between">
                                <span className="capitalize">{gender}</span>
                                <span>{formatPercentage(percentage)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-3">Location Distribution</h4>
                          <div className="space-y-2">
                            {Object.entries(metrics.students.locationDistribution).map(([location, percentage]) => (
                              <div key={location} className="flex justify-between">
                                <span className="capitalize">{location.replace('-', ' ')}</span>
                                <span>{formatPercentage(percentage)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {quickActions.slice(0, 6).map((action) => {
                    const IconComponent = getActivityIcon(action.icon.toLowerCase())
                    return (
                      <Button
                        key={action.id}
                        variant="outline"
                        className="w-full justify-start"
                        size="sm"
                      >
                        <IconComponent className="h-4 w-4 mr-2" />
                        {action.title}
                      </Button>
                    )
                  })}
                </CardContent>
              </Card>

              {/* Recent Activities */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Activities</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentActivities.map((activity) => {
                    const IconComponent = getActivityIcon(activity.type)
                    return (
                      <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <IconComponent className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                          <p className="text-xs text-gray-600 truncate">{activity.description}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(activity.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>

              {/* System Health */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Server className="h-5 w-5" />
                    System Health
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Status</span>
                    <Badge className={systemHealth.status === 'healthy' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {systemHealth.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Server Load</span>
                        <span>{systemHealth.serverLoad}%</span>
                      </div>
                      <Progress value={systemHealth.serverLoad} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Memory Usage</span>
                        <span>{systemHealth.memoryUsage}%</span>
                      </div>
                      <Progress value={systemHealth.memoryUsage} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Disk Usage</span>
                        <span>{systemHealth.diskUsage}%</span>
                      </div>
                      <Progress value={systemHealth.diskUsage} className="h-2" />
                    </div>
                  </div>

                  <div className="pt-3 border-t text-xs text-gray-600 space-y-1">
                    <div className="flex justify-between">
                      <span>Uptime</span>
                      <span>{systemHealth.uptime}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Active Users</span>
                      <span>{systemHealth.activeUsers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Database Size</span>
                      <span>{systemHealth.databaseSize}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Notifications */}
              {notifications.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Notifications
                      <Badge variant="secondary">{notifications.length}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {notifications.slice(0, 3).map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 rounded-lg border ${getNotificationColor(notification.type)}`}
                      >
                        <div className="flex items-start gap-2">
                          <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">{notification.title}</p>
                            <p className="text-xs mt-1">{notification.message}</p>
                            {notification.actionRequired && (
                              <Badge variant="outline" className="mt-2 text-xs">
                                Action Required
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    {notifications.length > 3 && (
                      <Button variant="outline" size="sm" className="w-full">
                        View All Notifications
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 