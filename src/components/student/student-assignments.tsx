'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Student, Assignment } from '@/types/student';

interface StudentAssignmentsProps {
  student: Student;
}

export default function StudentAssignments({ student }: StudentAssignmentsProps) {
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'destructive';
      case 'in-progress': return 'secondary';
      case 'submitted': return 'default';
      case 'graded': return 'outline';
      default: return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return '⏳';
      case 'in-progress': return '✏️';
      case 'submitted': return '✅';
      case 'graded': return '📊';
      default: return '📝';
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const pendingAssignments = student.assignments.filter(a => a.status === 'pending' || a.status === 'in-progress');
  const submittedAssignments = student.assignments.filter(a => a.status === 'submitted');
  const gradedAssignments = student.assignments.filter(a => a.status === 'graded');

  const getAssignmentsByStatus = (status: string) => {
    return student.assignments.filter(a => a.status === status);
  };

  const calculateGradePercentage = (grade: number, maxPoints: number) => {
    return Math.round((grade / maxPoints) * 100);
  };

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 80) return 'text-blue-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Assignments</h2>
          <p className="text-gray-600">Track your assignments and submissions</p>
        </div>
        <div className="flex space-x-2">
          <Badge variant="destructive">{pendingAssignments.length} pending</Badge>
          <Badge variant="default">{submittedAssignments.length} submitted</Badge>
          <Badge variant="outline">{gradedAssignments.length} graded</Badge>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Assignments</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="submitted">Submitted</TabsTrigger>
          <TabsTrigger value="graded">Graded</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Assignment List */}
            <div className="space-y-4">
              {student.assignments.map((assignment) => {
                const daysUntilDue = getDaysUntilDue(assignment.dueDate);
                const isOverdue = daysUntilDue < 0 && assignment.status !== 'submitted' && assignment.status !== 'graded';
                
                return (
                  <Card 
                    key={assignment.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedAssignment?.id === assignment.id ? 'ring-2 ring-orange-500' : ''
                    } ${isOverdue ? 'border-red-300 bg-red-50' : ''}`}
                    onClick={() => setSelectedAssignment(assignment)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-lg flex items-center space-x-2">
                            <span>{getStatusIcon(assignment.status)}</span>
                            <span>{assignment.title}</span>
                          </CardTitle>
                          <CardDescription className="mt-1">
                            {assignment.courseId}
                          </CardDescription>
                        </div>
                        <Badge variant={getStatusColor(assignment.status)}>
                          {assignment.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Due Date:</span>
                          <span className={`font-medium ${isOverdue ? 'text-red-600' : ''}`}>
                            {formatDate(assignment.dueDate)}
                          </span>
                        </div>
                        {assignment.grade !== null && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Grade:</span>
                            <span className={`font-bold ${getGradeColor(calculateGradePercentage(assignment.grade, assignment.maxPoints))}`}>
                              {assignment.grade}/{assignment.maxPoints} ({calculateGradePercentage(assignment.grade, assignment.maxPoints)}%)
                            </span>
                          </div>
                        )}
                        {assignment.status === 'pending' || assignment.status === 'in-progress' ? (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Time Left:</span>
                            <span className={`font-medium ${daysUntilDue <= 3 ? 'text-red-600' : daysUntilDue <= 7 ? 'text-yellow-600' : 'text-green-600'}`}>
                              {daysUntilDue > 0 ? `${daysUntilDue} days` : 'Overdue'}
                            </span>
                          </div>
                        ) : null}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Assignment Details */}
            <div>
              {selectedAssignment ? (
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl flex items-center space-x-2">
                          <span>{getStatusIcon(selectedAssignment.status)}</span>
                          <span>{selectedAssignment.title}</span>
                        </CardTitle>
                        <CardDescription className="text-base mt-2">
                          Course: {selectedAssignment.courseId}
                        </CardDescription>
                      </div>
                      <Badge variant={getStatusColor(selectedAssignment.status)}>
                        {selectedAssignment.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Assignment Description */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {selectedAssignment.description}
                      </p>
                    </div>

                    {/* Assignment Details */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium text-gray-900">Assignment Info</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Due Date:</span>
                            <span className="font-medium">{formatDate(selectedAssignment.dueDate)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Max Points:</span>
                            <span className="font-medium">{selectedAssignment.maxPoints}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Weight:</span>
                            <span className="font-medium">{(selectedAssignment.weight * 100).toFixed(0)}%</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium text-gray-900">Submission Info</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Status:</span>
                            <Badge variant={getStatusColor(selectedAssignment.status)} className="text-xs">
                              {selectedAssignment.status}
                            </Badge>
                          </div>
                          {selectedAssignment.submissionDate && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Submitted:</span>
                              <span className="font-medium">{formatDate(selectedAssignment.submissionDate)}</span>
                            </div>
                          )}
                          {selectedAssignment.grade !== null && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Grade:</span>
                              <span className={`font-bold ${getGradeColor(calculateGradePercentage(selectedAssignment.grade, selectedAssignment.maxPoints))}`}>
                                {selectedAssignment.grade}/{selectedAssignment.maxPoints}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Feedback */}
                    {selectedAssignment.feedback && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Instructor Feedback</h4>
                        <div className="bg-blue-50 rounded-lg p-4">
                          <p className="text-sm text-gray-700">{selectedAssignment.feedback}</p>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                      {selectedAssignment.status === 'pending' || selectedAssignment.status === 'in-progress' ? (
                        <>
                          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                            Submit Assignment
                          </Button>
                          <Button variant="outline">
                            Save Draft
                          </Button>
                        </>
                      ) : selectedAssignment.status === 'submitted' ? (
                        <Button variant="outline" disabled>
                          Submitted - Awaiting Grade
                        </Button>
                      ) : (
                        <Button variant="outline">
                          View Submission
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="h-96 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <span className="text-4xl mb-2 block">📝</span>
                    <p>Select an assignment to view details</p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getAssignmentsByStatus('pending').concat(getAssignmentsByStatus('in-progress')).map((assignment) => {
              const daysUntilDue = getDaysUntilDue(assignment.dueDate);
              const isOverdue = daysUntilDue < 0;
              
              return (
                <Card key={assignment.id} className={isOverdue ? 'border-red-300 bg-red-50' : ''}>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <span>{getStatusIcon(assignment.status)}</span>
                      <span>{assignment.title}</span>
                    </CardTitle>
                    <CardDescription>{assignment.courseId}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Due:</span>
                        <span className={`font-medium ${isOverdue ? 'text-red-600' : ''}`}>
                          {formatDate(assignment.dueDate)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Points:</span>
                        <span className="font-medium">{assignment.maxPoints}</span>
                      </div>
                    </div>
                    <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                      Start Assignment
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="submitted" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getAssignmentsByStatus('submitted').map((assignment) => (
              <Card key={assignment.id}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <span>{getStatusIcon(assignment.status)}</span>
                    <span>{assignment.title}</span>
                  </CardTitle>
                  <CardDescription>{assignment.courseId}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Submitted:</span>
                      <span className="font-medium">{formatDate(assignment.submissionDate!)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Points:</span>
                      <span className="font-medium">{assignment.maxPoints}</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    View Submission
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="graded" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getAssignmentsByStatus('graded').map((assignment) => {
              const percentage = calculateGradePercentage(assignment.grade!, assignment.maxPoints);
              
              return (
                <Card key={assignment.id}>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <span>{getStatusIcon(assignment.status)}</span>
                      <span>{assignment.title}</span>
                    </CardTitle>
                    <CardDescription>{assignment.courseId}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Grade:</span>
                        <span className={`font-bold ${getGradeColor(percentage)}`}>
                          {assignment.grade}/{assignment.maxPoints} ({percentage}%)
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Submitted:</span>
                        <span className="font-medium">{formatDate(assignment.submissionDate!)}</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 