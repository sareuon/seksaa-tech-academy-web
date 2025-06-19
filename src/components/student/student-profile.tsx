'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Student } from '@/types/student';

interface StudentProfileProps {
  student: Student;
}

export default function StudentProfile({ student }: StudentProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [preferences, setPreferences] = useState(student.preferences);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'graduated': return 'bg-blue-100 text-blue-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Profile</h2>
          <p className="text-gray-600">Manage your personal information and preferences</p>
        </div>
        <Button 
          onClick={() => setIsEditing(!isEditing)}
          variant={isEditing ? 'outline' : 'default'}
          className={!isEditing ? 'bg-orange-500 hover:bg-orange-600 text-white' : ''}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </Button>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="academic">Academic Info</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Picture */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Picture</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <img
                  src={student.personalInfo.profileImage}
                  alt="Profile"
                  className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-gray-200"
                />
                {isEditing && (
                  <Button variant="outline" size="sm">
                    Change Photo
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Personal Information */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Your basic personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">First Name</label>
                    {isEditing ? (
                      <input 
                        type="text" 
                        defaultValue={student.personalInfo.firstName}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{student.personalInfo.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Last Name</label>
                    {isEditing ? (
                      <input 
                        type="text" 
                        defaultValue={student.personalInfo.lastName}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{student.personalInfo.lastName}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    {isEditing ? (
                      <input 
                        type="email" 
                        defaultValue={student.personalInfo.email}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{student.personalInfo.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Phone</label>
                    {isEditing ? (
                      <input 
                        type="tel" 
                        defaultValue={student.personalInfo.phone}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{student.personalInfo.phone}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Date of Birth</label>
                    <p className="mt-1 text-gray-900">{formatDate(student.personalInfo.dateOfBirth)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Address Information */}
          <Card>
            <CardHeader>
              <CardTitle>Address</CardTitle>
              <CardDescription>Your current address information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">Street Address</label>
                  {isEditing ? (
                    <input 
                      type="text" 
                      defaultValue={student.personalInfo.address.street}
                      className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="mt-1 text-gray-900">{student.personalInfo.address.street}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">City</label>
                  {isEditing ? (
                    <input 
                      type="text" 
                      defaultValue={student.personalInfo.address.city}
                      className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="mt-1 text-gray-900">{student.personalInfo.address.city}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Province</label>
                  {isEditing ? (
                    <input 
                      type="text" 
                      defaultValue={student.personalInfo.address.province}
                      className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="mt-1 text-gray-900">{student.personalInfo.address.province}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Emergency Contact</CardTitle>
              <CardDescription>Emergency contact information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Name</label>
                  {isEditing ? (
                    <input 
                      type="text" 
                      defaultValue={student.personalInfo.emergencyContact.name}
                      className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="mt-1 text-gray-900">{student.personalInfo.emergencyContact.name}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Relationship</label>
                  {isEditing ? (
                    <input 
                      type="text" 
                      defaultValue={student.personalInfo.emergencyContact.relationship}
                      className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="mt-1 text-gray-900">{student.personalInfo.emergencyContact.relationship}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Phone</label>
                  {isEditing ? (
                    <input 
                      type="tel" 
                      defaultValue={student.personalInfo.emergencyContact.phone}
                      className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="mt-1 text-gray-900">{student.personalInfo.emergencyContact.phone}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {isEditing && (
            <div className="flex space-x-3">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                Save Changes
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="academic" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Academic Status</CardTitle>
                <CardDescription>Your current academic standing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Student ID</span>
                  <span className="font-mono text-sm">{student.academicInfo.studentId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Status</span>
                  <Badge className={getStatusColor(student.academicInfo.status)}>
                    {student.academicInfo.status}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Current GPA</span>
                  <span className="text-lg font-bold text-green-600">{student.academicInfo.gpa.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Total Credits</span>
                  <span className="font-semibold">{student.academicInfo.totalCredits}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Enrolled</span>
                  <span className="text-sm">{formatDate(student.academicInfo.enrollmentDate)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Expected Graduation</span>
                  <span className="text-sm">{formatDate(student.academicInfo.expectedGraduation)}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Programs</CardTitle>
                <CardDescription>Your enrolled programs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Current Programs</h4>
                  <div className="space-y-2">
                    {student.academicInfo.currentPrograms.map((program) => (
                      <Badge key={program} variant="default" className="mr-2">
                        {program}
                      </Badge>
                    ))}
                  </div>
                </div>
                {student.academicInfo.completedPrograms.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Completed Programs</h4>
                    <div className="space-y-2">
                      {student.academicInfo.completedPrograms.map((program) => (
                        <Badge key={program} variant="secondary" className="mr-2">
                          {program}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>My Achievements</CardTitle>
              <CardDescription>Badges and accomplishments you've earned</CardDescription>
            </CardHeader>
            <CardContent>
              {student.achievements.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {student.achievements.map((achievement) => (
                    <div key={achievement.id} className="border rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                      <span className="text-4xl mb-2 block">{achievement.icon}</span>
                      <h4 className="font-semibold text-gray-900 mb-1">{achievement.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <Badge variant="outline" className="text-xs">
                          {achievement.category}
                        </Badge>
                        <span>{formatDate(achievement.earnedDate)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <span className="text-4xl mb-2 block">🏆</span>
                  <p>No achievements yet. Keep working hard!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Preferences</CardTitle>
              <CardDescription>Customize your portal experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Language & Region</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Language</label>
                    <select 
                      value={preferences.language}
                      onChange={(e) => setPreferences({...preferences, language: e.target.value})}
                      className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="en">English</option>
                      <option value="km">ខ្មែរ (Khmer)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Timezone</label>
                    <select 
                      value={preferences.timezone}
                      onChange={(e) => setPreferences({...preferences, timezone: e.target.value})}
                      className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="Asia/Phnom_Penh">Asia/Phnom Penh</option>
                      <option value="Asia/Bangkok">Asia/Bangkok</option>
                      <option value="UTC">UTC</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Notifications</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Email Notifications</p>
                      <p className="text-sm text-gray-600">Receive notifications via email</p>
                    </div>
                    <Switch 
                      checked={preferences.notifications.email}
                      onCheckedChange={(checked) => 
                        setPreferences({
                          ...preferences, 
                          notifications: {...preferences.notifications, email: checked}
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Push Notifications</p>
                      <p className="text-sm text-gray-600">Receive push notifications in browser</p>
                    </div>
                    <Switch 
                      checked={preferences.notifications.push}
                      onCheckedChange={(checked) => 
                        setPreferences({
                          ...preferences, 
                          notifications: {...preferences.notifications, push: checked}
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">SMS Notifications</p>
                      <p className="text-sm text-gray-600">Receive notifications via SMS</p>
                    </div>
                    <Switch 
                      checked={preferences.notifications.sms}
                      onCheckedChange={(checked) => 
                        setPreferences({
                          ...preferences, 
                          notifications: {...preferences.notifications, sms: checked}
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Appearance</h4>
                <div>
                  <label className="text-sm font-medium text-gray-700">Theme</label>
                  <select 
                    value={preferences.theme}
                    onChange={(e) => setPreferences({...preferences, theme: e.target.value as 'light' | 'dark'})}
                    className="mt-1 w-full max-w-xs p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 