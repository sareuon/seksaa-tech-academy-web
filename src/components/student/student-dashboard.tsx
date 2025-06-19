'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Student, DashboardStats } from '@/types/student';

interface StudentDashboardProps {
  student: Student;
}

export default function StudentDashboard({ student }: StudentDashboardProps) {
  // Calculate dashboard statistics
  const stats: DashboardStats = {
    totalCourses: student.coursesEnrolled.length,
    activeCourses: student.coursesEnrolled.filter(course => course.status === 'in-progress').length,
    completedAssignments: student.assignments.filter(assignment => assignment.status === 'submitted' || assignment.status === 'graded').length,
    pendingAssignments: student.assignments.filter(assignment => assignment.status === 'pending' || assignment.status === 'in-progress').length,
    overallGPA: student.academicInfo.gpa,
    totalCredits: student.academicInfo.totalCredits,
    attendanceRate: 92, // This would be calculated from actual attendance data
    achievementsCount: student.achievements.length,
  };

  const upcomingAssignments = student.assignments
    .filter(assignment => assignment.status === 'pending' || assignment.status === 'in-progress')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 3);

  const recentAchievements = student.achievements
    .sort((a, b) => new Date(b.earnedDate).getTime() - new Date(a.earnedDate).getTime())
    .slice(0, 3);

  const unreadNotifications = student.notifications.filter(notif => !notif.read);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-orange-500 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">
          Welcome back, {student.personalInfo.firstName}!
        </h2>
        <p className="text-blue-100 mb-4">
          Here's your academic overview for this semester.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold">{stats.activeCourses}</div>
            <div className="text-sm text-blue-100">Active Courses</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{stats.pendingAssignments}</div>
            <div className="text-sm text-blue-100">Pending Tasks</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{stats.overallGPA.toFixed(2)}</div>
            <div className="text-sm text-blue-100">Current GPA</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{stats.totalCredits}</div>
            <div className="text-sm text-blue-100">Total Credits</div>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Courses</CardTitle>
            <span className="text-2xl">📚</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCourses}</div>
            <p className="text-xs text-muted-foreground">
              {stats.activeCourses} active this semester
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assignments</CardTitle>
            <span className="text-2xl">📝</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedAssignments}</div>
            <p className="text-xs text-muted-foreground">
              {stats.pendingAssignments} pending
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance</CardTitle>
            <span className="text-2xl">📅</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.attendanceRate}%</div>
            <p className="text-xs text-muted-foreground">
              Excellent attendance record
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Achievements</CardTitle>
            <span className="text-2xl">🏆</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.achievementsCount}</div>
            <p className="text-xs text-muted-foreground">
              Badges earned this semester
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Course Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Course Progress</CardTitle>
          <CardDescription>Your progress in enrolled courses</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {student.coursesEnrolled.map((course) => (
            <div key={course.courseId} className="space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">{course.courseName}</h4>
                  <p className="text-sm text-gray-500">Instructor: {course.instructor}</p>
                </div>
                <div className="text-right">
                  <Badge variant={course.status === 'in-progress' ? 'default' : 'secondary'}>
                    {course.grade}
                  </Badge>
                  <p className="text-sm text-gray-500">{course.progress}% complete</p>
                </div>
              </div>
              <Progress value={course.progress} className="w-full" />
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Assignments */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Assignments</CardTitle>
            <CardDescription>Tasks due soon</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingAssignments.length > 0 ? (
              upcomingAssignments.map((assignment) => {
                const daysUntilDue = getDaysUntilDue(assignment.dueDate);
                return (
                  <div key={assignment.id} className="flex justify-between items-start p-3 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{assignment.title}</h4>
                      <p className="text-sm text-gray-500 mb-2">{assignment.courseId}</p>
                      <Badge 
                        variant={daysUntilDue <= 3 ? 'destructive' : daysUntilDue <= 7 ? 'secondary' : 'default'}
                        className="text-xs"
                      >
                        {daysUntilDue > 0 ? `${daysUntilDue} days left` : 'Overdue'}
                      </Badge>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      Due: {formatDate(assignment.dueDate)}
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500 text-center py-4">No upcoming assignments</p>
            )}
          </CardContent>
        </Card>

        {/* Recent Achievements */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Achievements</CardTitle>
            <CardDescription>Your latest accomplishments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentAchievements.length > 0 ? (
              recentAchievements.map((achievement) => (
                <div key={achievement.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                  <span className="text-2xl">{achievement.icon}</span>
                  <div className="flex-1">
                    <h4 className="font-medium">{achievement.title}</h4>
                    <p className="text-sm text-gray-500">{achievement.description}</p>
                    <p className="text-xs text-gray-400">Earned on {formatDate(achievement.earnedDate)}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No achievements yet</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Notifications */}
      {unreadNotifications.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>🔔</span>
              <span>Recent Notifications</span>
              <Badge variant="destructive">{unreadNotifications.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {unreadNotifications.slice(0, 5).map((notification) => (
              <div key={notification.id} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="flex-shrink-0">
                  {notification.priority === 'high' && <span className="text-red-500">🚨</span>}
                  {notification.priority === 'medium' && <span className="text-yellow-500">⚠️</span>}
                  {notification.priority === 'low' && <span className="text-blue-500">ℹ️</span>}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{notification.title}</h4>
                  <p className="text-sm text-gray-600">{notification.message}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(notification.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
} 