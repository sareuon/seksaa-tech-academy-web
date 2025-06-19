'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Student, Message } from '@/types/student';

interface StudentMessagesProps {
  student: Student;
}

export default function StudentMessages({ student }: StudentMessagesProps) {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [showCompose, setShowCompose] = useState(false);
  
  const getMessageTypeIcon = (type: string) => {
    switch (type) {
      case 'instructor': return '👨‍🏫';
      case 'admin': return '🏢';
      case 'student': return '👨‍🎓';
      case 'system': return '🔔';
      default: return '💬';
    }
  };

  const getMessageTypeColor = (type: string) => {
    switch (type) {
      case 'instructor': return 'bg-blue-100 text-blue-800';
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'student': return 'bg-green-100 text-green-800';
      case 'system': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    }
  };

  const unreadMessages = student.messages.filter(msg => !msg.read);
  const sortedMessages = [...student.messages].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Messages</h2>
          <p className="text-gray-600">Communicate with instructors and administration</p>
        </div>
        <div className="flex items-center space-x-3">
          {unreadMessages.length > 0 && (
            <Badge variant="destructive" className="animate-pulse">
              {unreadMessages.length} unread
            </Badge>
          )}
          <Button 
            onClick={() => setShowCompose(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            Compose Message
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Message List */}
        <div className="lg:col-span-1 space-y-3">
          <div className="bg-white rounded-lg border">
            <div className="p-4 border-b">
              <h3 className="font-medium text-gray-900">Inbox</h3>
              <p className="text-sm text-gray-500">{student.messages.length} messages</p>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {sortedMessages.map((message) => (
                <div
                  key={message.id}
                  onClick={() => setSelectedMessage(message)}
                  className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedMessage?.id === message.id ? 'bg-orange-50 border-orange-200' : ''
                  } ${!message.read ? 'bg-blue-50' : ''}`}
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-lg">{getMessageTypeIcon(message.type)}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className={`text-sm font-medium truncate ${!message.read ? 'text-gray-900' : 'text-gray-700'}`}>
                          {message.from}
                        </p>
                        {!message.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                        )}
                      </div>
                      <p className={`text-sm truncate ${!message.read ? 'text-gray-900' : 'text-gray-600'}`}>
                        {message.subject}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getMessageTypeColor(message.type)}`}>
                          {message.type}
                        </span>
                        <p className="text-xs text-gray-500">
                          {formatDate(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Message Content */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">{getMessageTypeIcon(selectedMessage.type)}</span>
                    <div>
                      <CardTitle className="text-xl">{selectedMessage.subject}</CardTitle>
                      <CardDescription className="mt-1">
                        From: {selectedMessage.from} • {formatDate(selectedMessage.timestamp)}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getMessageTypeColor(selectedMessage.type)}>
                      {selectedMessage.type}
                    </Badge>
                    {!selectedMessage.read && (
                      <Badge variant="destructive" className="text-xs">
                        Unread
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Message Content */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                    {selectedMessage.content}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                    Reply
                  </Button>
                  <Button variant="outline">
                    Forward
                  </Button>
                  {!selectedMessage.read && (
                    <Button variant="outline">
                      Mark as Read
                    </Button>
                  )}
                  <Button variant="outline" className="text-red-600 hover:text-red-700">
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : showCompose ? (
            <Card>
              <CardHeader>
                <CardTitle>Compose New Message</CardTitle>
                <CardDescription>Send a message to your instructor or administration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">To</label>
                  <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                    <option value="">Select recipient...</option>
                    <option value="prof-sokha">Prof. Sokha Lim (AIML-101, AIML-103)</option>
                    <option value="dr-dara">Dr. Dara Kem (AIML-102)</option>
                    <option value="admin">Academic Office</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Subject</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Enter subject..."
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Message</label>
                  <textarea 
                    rows={8}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Type your message here..."
                  ></textarea>
                </div>
                
                <div className="flex space-x-3">
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                    Send Message
                  </Button>
                  <Button variant="outline">
                    Save Draft
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowCompose(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="h-96 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <span className="text-4xl mb-2 block">💬</span>
                <p>Select a message to read</p>
                <Button 
                  onClick={() => setShowCompose(true)}
                  className="mt-4 bg-orange-500 hover:bg-orange-600 text-white"
                >
                  Compose New Message
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">📧</span>
              <div>
                <p className="text-2xl font-bold">{student.messages.length}</p>
                <p className="text-sm text-gray-600">Total Messages</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">📬</span>
              <div>
                <p className="text-2xl font-bold">{unreadMessages.length}</p>
                <p className="text-sm text-gray-600">Unread</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">👨‍🏫</span>
              <div>
                <p className="text-2xl font-bold">
                  {student.messages.filter(m => m.type === 'instructor').length}
                </p>
                <p className="text-sm text-gray-600">From Instructors</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🏢</span>
              <div>
                <p className="text-2xl font-bold">
                  {student.messages.filter(m => m.type === 'admin').length}
                </p>
                <p className="text-sm text-gray-600">From Admin</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 