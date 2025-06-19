'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Student, CourseEnrollment } from '@/types/student';
import studentsData from '@/data/students.json';

interface StudentCoursesProps {
  student: Student;
}

export default function StudentCourses({ student }: StudentCoursesProps) {
  const [selectedCourse, setSelectedCourse] = useState<CourseEnrollment | null>(null);
  
  // Get course resources from data
  const courseResources = studentsData.courseResources || [];
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-progress': return 'default';
      case 'completed': return 'secondary';
      case 'dropped': return 'destructive';
      default: return 'outline';
    }
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-600';
    if (grade.startsWith('B')) return 'text-blue-600';
    if (grade.startsWith('C')) return 'text-yellow-600';
    return 'text-gray-600';
  };

  const getCourseResources = (courseId: string) => {
    const courseResourceGroup = courseResources.find(group => group.courseId === courseId);
    return courseResourceGroup?.resources || [];
  };

  const formatFileSize = (size: string) => {
    return size;
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'document': return '📄';
      case 'video': return '🎥';
      case 'slides': return '📊';
      case 'dataset': return '📈';
      case 'notebook': return '📓';
      case 'link': return '🔗';
      default: return '📎';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Courses</h2>
          <p className="text-gray-600">Manage your enrolled courses and access resources</p>
        </div>
        <Badge variant="outline" className="text-sm">
          {student.coursesEnrolled.length} courses enrolled
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Course List */}
        <div className="lg:col-span-1 space-y-4">
          {student.coursesEnrolled.map((course) => (
            <Card 
              key={course.courseId}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedCourse?.courseId === course.courseId ? 'ring-2 ring-orange-500' : ''
              }`}
              onClick={() => setSelectedCourse(course)}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{course.courseName}</CardTitle>
                    <CardDescription className="mt-1">
                      {course.instructor}
                    </CardDescription>
                  </div>
                  <Badge variant={getStatusColor(course.status)} className="ml-2">
                    {course.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-sm font-medium">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="w-full" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Current Grade</span>
                    <span className={`text-sm font-bold ${getGradeColor(course.grade)}`}>
                      {course.grade}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Credits</span>
                    <span className="text-sm font-medium">{course.credits}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Course Details */}
        <div className="lg:col-span-2">
          {selectedCourse ? (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{selectedCourse.courseName}</CardTitle>
                    <CardDescription className="text-base mt-2">
                      Instructor: {selectedCourse.instructor}
                    </CardDescription>
                  </div>
                  <Badge variant={getStatusColor(selectedCourse.status)}>
                    {selectedCourse.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="schedule">Schedule</TabsTrigger>
                    <TabsTrigger value="resources">Resources</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium text-gray-900">Course Information</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Course ID:</span>
                            <span className="font-medium">{selectedCourse.courseId}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Credits:</span>
                            <span className="font-medium">{selectedCourse.credits}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Enrolled:</span>
                            <span className="font-medium">
                              {new Date(selectedCourse.enrollmentDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium text-gray-900">Academic Progress</h4>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-600">Completion</span>
                              <span className="font-medium">{selectedCourse.progress}%</span>
                            </div>
                            <Progress value={selectedCourse.progress} />
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Current Grade:</span>
                            <span className={`font-bold ${getGradeColor(selectedCourse.grade)}`}>
                              {selectedCourse.grade}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="schedule" className="space-y-4 mt-4">
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">Class Schedule</h4>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <h5 className="font-medium text-gray-700 mb-2">Days</h5>
                            <div className="space-y-1">
                              {selectedCourse.schedule.days.map((day) => (
                                <Badge key={day} variant="outline" className="mr-1">
                                  {day}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-700 mb-2">Time</h5>
                            <p className="text-sm text-gray-600">{selectedCourse.schedule.time}</p>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-700 mb-2">Location</h5>
                            <p className="text-sm text-gray-600">{selectedCourse.schedule.room}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="resources" className="space-y-4 mt-4">
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">Course Resources</h4>
                      {getCourseResources(selectedCourse.courseId).length > 0 ? (
                        <div className="space-y-3">
                          {getCourseResources(selectedCourse.courseId).map((resource) => (
                            <div key={resource.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                              <div className="flex items-center space-x-3">
                                <span className="text-2xl">{getResourceIcon(resource.type)}</span>
                                <div>
                                  <h5 className="font-medium text-gray-900">{resource.title}</h5>
                                  <p className="text-sm text-gray-500">
                                    {resource.type} • {formatFileSize(resource.size)} • 
                                    Uploaded {new Date(resource.uploadDate).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <Button variant="outline" size="sm">
                                Download
                              </Button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <span className="text-4xl mb-2 block">📚</span>
                          <p>No resources available for this course yet.</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ) : (
            <Card className="h-96 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <span className="text-4xl mb-2 block">📚</span>
                <p>Select a course to view details</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
} 