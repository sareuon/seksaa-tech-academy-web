'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StudentDashboard from './student-dashboard';
import StudentCourses from './student-courses';
import StudentAssignments from './student-assignments';
import StudentMessages from './student-messages';
import StudentProfile from './student-profile';
import { Student, StudentData } from '@/types/student';
import studentsData from '@/data/students.json';

export default function StudentPortalClient() {
  const t = useTranslations('student');
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real application, this would be fetched based on authentication
    // For demo purposes, we'll use the first student
    const data = studentsData as StudentData;
    if (data.students && data.students.length > 0) {
      setCurrentStudent(data.students[0]);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your portal...</p>
        </div>
      </div>
    );
  }

  if (!currentStudent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-red-600">Access Denied</CardTitle>
            <CardDescription className="text-center">
              Please log in to access your student portal.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              Login to Portal
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const unreadMessages = currentStudent.messages.filter(msg => !msg.read).length;
  const unreadNotifications = currentStudent.notifications.filter(notif => !notif.read).length;
  const pendingAssignments = currentStudent.assignments.filter(assignment => 
    assignment.status === 'pending' || assignment.status === 'in-progress'
  ).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <img
                src={currentStudent.personalInfo.profileImage}
                alt="Profile"
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  Welcome, {currentStudent.personalInfo.firstName}!
                </h1>
                <p className="text-sm text-gray-500">
                  Student ID: {currentStudent.academicInfo.studentId}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {unreadNotifications > 0 && (
                <Badge variant="destructive" className="animate-pulse">
                  {unreadNotifications} notifications
                </Badge>
              )}
              {unreadMessages > 0 && (
                <Badge variant="secondary">
                  {unreadMessages} messages
                </Badge>
              )}
              <Badge 
                variant={currentStudent.academicInfo.status === 'active' ? 'default' : 'secondary'}
                className="capitalize"
              >
                {currentStudent.academicInfo.status}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-5">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <span>📊</span>
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="courses" className="flex items-center space-x-2">
              <span>📚</span>
              <span className="hidden sm:inline">Courses</span>
            </TabsTrigger>
            <TabsTrigger value="assignments" className="flex items-center space-x-2 relative">
              <span>📝</span>
              <span className="hidden sm:inline">Assignments</span>
              {pendingAssignments > 0 && (
                <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs">
                  {pendingAssignments}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center space-x-2 relative">
              <span>💬</span>
              <span className="hidden sm:inline">Messages</span>
              {unreadMessages > 0 && (
                <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs">
                  {unreadMessages}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <span>👤</span>
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <StudentDashboard student={currentStudent} />
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            <StudentCourses student={currentStudent} />
          </TabsContent>

          <TabsContent value="assignments" className="space-y-6">
            <StudentAssignments student={currentStudent} />
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <StudentMessages student={currentStudent} />
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <StudentProfile student={currentStudent} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 