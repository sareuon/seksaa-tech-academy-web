'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import { 
  getAllScheduleClasses, 
  getScheduleClassesByProgram, 
  getScheduleClassesByInstructor, 
  getScheduleClassesByFormat,
  getDayName,
  formatTime,
  getClassAvailability,
  getAllPrograms,
  getInstructorsByIds,
  type ScheduleClass
} from '@/lib/data'
import { Calendar, Clock, MapPin, Users, Video, Monitor, Building, Filter, Search, BookOpen, Star } from 'lucide-react'

export default function SchedulePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProgram, setSelectedProgram] = useState<string>('all')
  const [selectedInstructor, setSelectedInstructor] = useState<string>('all')
  const [selectedFormat, setSelectedFormat] = useState<string>('all')
  const [selectedDay, setSelectedDay] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'timetable'>('timetable')
  const [bookingClass, setBookingClass] = useState<ScheduleClass | null>(null)
  const [bookingForm, setBookingForm] = useState({
    studentName: '',
    studentEmail: '',
    studentPhone: '',
    isTrialClass: false,
    notes: ''
  })

  const allClasses = getAllScheduleClasses()
  const allPrograms = getAllPrograms()
  const allInstructors = getInstructorsByIds(Array.from(new Set(allClasses.map(cls => cls.instructorId))))

  const filteredClasses = useMemo(() => {
    let filtered = allClasses

    if (searchTerm) {
      filtered = filtered.filter(cls => 
        cls.programTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cls.instructorName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedProgram !== 'all') {
      filtered = getScheduleClassesByProgram(selectedProgram)
    }

    if (selectedInstructor !== 'all') {
      filtered = filtered.filter(cls => cls.instructorId === selectedInstructor)
    }

    if (selectedFormat !== 'all') {
      filtered = filtered.filter(cls => cls.format === selectedFormat)
    }

    if (selectedDay !== 'all') {
      filtered = filtered.filter(cls => cls.dayOfWeek === parseInt(selectedDay))
    }

    return filtered
  }, [searchTerm, selectedProgram, selectedInstructor, selectedFormat, selectedDay, allClasses])

  const timetableData = useMemo(() => {
    const days = [1, 2, 3, 4, 5, 6, 0] // Monday to Sunday
    const timeSlots = [
      '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', 
      '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'
    ]

    const timetable: { [key: string]: ScheduleClass[] } = {}
    
    days.forEach(day => {
      timeSlots.forEach(time => {
        const key = `${day}-${time}`
        timetable[key] = filteredClasses.filter(cls => {
          const classStartHour = parseInt(cls.startTime.split(':')[0])
          const slotHour = parseInt(time.split(':')[0])
          return cls.dayOfWeek === day && classStartHour === slotHour
        })
      })
    })

    return { days, timeSlots, timetable }
  }, [filteredClasses])

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!bookingClass) return

    // Here you would typically send the booking request to your backend
    console.log('Booking request:', {
      classId: bookingClass.id,
      ...bookingForm
    })

    // Reset form and close dialog
    setBookingForm({
      studentName: '',
      studentEmail: '',
      studentPhone: '',
      isTrialClass: false,
      notes: ''
    })
    setBookingClass(null)
    
    // Redirect to confirmation page
    window.location.href = '/schedule/booking-confirmation'
  }

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'online': return <Video className="h-4 w-4" />
      case 'in-person': return <Building className="h-4 w-4" />
      case 'hybrid': return <Monitor className="h-4 w-4" />
      default: return <BookOpen className="h-4 w-4" />
    }
  }

  const getFormatColor = (format: string) => {
    switch (format) {
      case 'online': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'in-person': return 'bg-green-100 text-green-800 border-green-200'
      case 'hybrid': return 'bg-purple-100 text-purple-800 border-purple-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case 'available': return 'text-green-600'
      case 'limited': return 'text-yellow-600'
      case 'full': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Class Schedule & Booking
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Browse our weekly class schedule and book your spot in upcoming sessions. 
              Choose from online, in-person, or hybrid learning formats.
            </p>
          </div>

          {/* Filters */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              <div className="lg:col-span-2">
                <Label htmlFor="search">Search Classes</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Search by program or instructor..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="program">Program</Label>
                <Select value={selectedProgram} onValueChange={setSelectedProgram}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Programs" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Programs</SelectItem>
                    {allPrograms.map(program => (
                      <SelectItem key={program.id} value={program.id}>
                        {program.title.en}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="instructor">Instructor</Label>
                <Select value={selectedInstructor} onValueChange={setSelectedInstructor}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Instructors" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Instructors</SelectItem>
                    {allInstructors.map(instructor => (
                      <SelectItem key={instructor.id} value={instructor.id}>
                        {instructor.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="format">Format</Label>
                <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Formats" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Formats</SelectItem>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="in-person">In-Person</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="day">Day</Label>
                <Select value={selectedDay} onValueChange={setSelectedDay}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Days" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Days</SelectItem>
                    <SelectItem value="1">Monday</SelectItem>
                    <SelectItem value="2">Tuesday</SelectItem>
                    <SelectItem value="3">Wednesday</SelectItem>
                    <SelectItem value="4">Thursday</SelectItem>
                    <SelectItem value="5">Friday</SelectItem>
                    <SelectItem value="6">Saturday</SelectItem>
                    <SelectItem value="0">Sunday</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  {filteredClasses.length} classes found
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'timetable' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('timetable')}
                >
                  Timetable View
                </Button>
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  Grid View
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {viewMode === 'timetable' ? (
          /* Timetable View */
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 w-20">
                      Time
                    </th>
                    {timetableData.days.map(day => (
                      <th key={day} className="px-4 py-3 text-center text-sm font-medium text-gray-900">
                        {getDayName(day)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {timetableData.timeSlots.map(timeSlot => (
                    <tr key={timeSlot} className="hover:bg-gray-50">
                      <td className="px-4 py-4 text-sm font-medium text-gray-900 bg-gray-50">
                        {formatTime(timeSlot)}
                      </td>
                      {timetableData.days.map(day => {
                        const classes = timetableData.timetable[`${day}-${timeSlot}`]
                        return (
                          <td key={`${day}-${timeSlot}`} className="px-2 py-2 align-top">
                            {classes.map(cls => {
                              const availability = getClassAvailability(cls)
                              return (
                                <div
                                  key={cls.id}
                                  className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-3 mb-2 hover:shadow-md transition-shadow cursor-pointer"
                                  onClick={() => setBookingClass(cls)}
                                >
                                  <div className="flex items-center gap-2 mb-2">
                                    {getFormatIcon(cls.format)}
                                    <Badge className={`text-xs ${getFormatColor(cls.format)}`}>
                                      {cls.format}
                                    </Badge>
                                  </div>
                                  <h4 className="font-medium text-sm text-gray-900 mb-1 line-clamp-2">
                                    {cls.programTitle}
                                  </h4>
                                  <p className="text-xs text-gray-600 mb-2">
                                    {cls.instructorName}
                                  </p>
                                  <div className="flex items-center justify-between text-xs">
                                    <span className="text-gray-500">
                                      {formatTime(cls.startTime)} - {formatTime(cls.endTime)}
                                    </span>
                                    <span className={`font-medium ${getAvailabilityColor(availability.status)}`}>
                                      {availability.available} spots
                                    </span>
                                  </div>
                                  {cls.location && (
                                    <div className="flex items-center gap-1 mt-1">
                                      <MapPin className="h-3 w-3 text-gray-400" />
                                      <span className="text-xs text-gray-500 truncate">
                                        {cls.location}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              )
                            })}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClasses.map(cls => {
              const availability = getClassAvailability(cls)
              return (
                <Card key={cls.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setBookingClass(cls)}>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={`${getFormatColor(cls.format)}`}>
                        <div className="flex items-center gap-1">
                          {getFormatIcon(cls.format)}
                          {cls.format}
                        </div>
                      </Badge>
                      <Badge variant={availability.status === 'available' ? 'default' : availability.status === 'limited' ? 'secondary' : 'destructive'}>
                        {availability.available} spots left
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{cls.programTitle}</CardTitle>
                    <CardDescription>{cls.instructorName}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        {getDayName(cls.dayOfWeek)}s
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        {formatTime(cls.startTime)} - {formatTime(cls.endTime)}
                      </div>
                      {cls.location && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="h-4 w-4" />
                          {cls.location}
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="h-4 w-4" />
                        {cls.currentStudents}/{cls.maxStudents} students
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Class Capacity</span>
                          <span>{Math.round(availability.percentage)}% full</span>
                        </div>
                        <Progress value={availability.percentage} className="h-2" />
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="text-lg font-bold text-blue-600">
                          ${cls.price} {cls.currency}
                        </div>
                        {cls.isTrialAvailable && (
                          <Badge variant="outline" className="text-green-600 border-green-200">
                            <Star className="h-3 w-3 mr-1" />
                            Trial Available
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {filteredClasses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Calendar className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No classes found</h3>
            <p className="text-gray-600">
              Try adjusting your filters to see more classes.
            </p>
          </div>
        )}
      </div>

      {/* Booking Dialog */}
      <Dialog open={!!bookingClass} onOpenChange={() => setBookingClass(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Book Your Class</DialogTitle>
            <DialogDescription>
              {bookingClass && (
                <>
                  {bookingClass.programTitle} with {bookingClass.instructorName}
                  <br />
                  {getDayName(bookingClass.dayOfWeek)}s, {formatTime(bookingClass.startTime)} - {formatTime(bookingClass.endTime)}
                </>
              )}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleBooking} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="studentName">Full Name *</Label>
                <Input
                  id="studentName"
                  value={bookingForm.studentName}
                  onChange={(e) => setBookingForm(prev => ({ ...prev, studentName: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="studentEmail">Email *</Label>
                <Input
                  id="studentEmail"
                  type="email"
                  value={bookingForm.studentEmail}
                  onChange={(e) => setBookingForm(prev => ({ ...prev, studentEmail: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="studentPhone">Phone Number *</Label>
              <Input
                id="studentPhone"
                value={bookingForm.studentPhone}
                onChange={(e) => setBookingForm(prev => ({ ...prev, studentPhone: e.target.value }))}
                required
              />
            </div>

            {bookingClass?.isTrialAvailable && (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isTrialClass"
                  checked={bookingForm.isTrialClass}
                  onCheckedChange={(checked) => setBookingForm(prev => ({ ...prev, isTrialClass: checked as boolean }))}
                />
                <Label htmlFor="isTrialClass" className="text-sm">
                  Book as trial class (Free)
                </Label>
              </div>
            )}

            <div>
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                placeholder="Any special requirements or questions..."
                value={bookingForm.notes}
                onChange={(e) => setBookingForm(prev => ({ ...prev, notes: e.target.value }))}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setBookingClass(null)}>
                Cancel
              </Button>
              <Button type="submit">
                {bookingForm.isTrialClass ? 'Book Trial Class' : 'Submit Booking Request'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
} 