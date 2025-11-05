'use client'

import { useState } from 'react'
import { UserPlus, UserMinus, Users, Search, CheckCircle, Clock, XCircle } from 'lucide-react'

type User = {
  id: string
  name: string
  email: string
  department: string
  role: string
  status: 'Active' | 'Pending' | 'Offboarding' | 'Inactive'
  startDate: string
  lastLogin: string
  assignedDevices: number
  pendingTasks: number
}

type OnboardingTask = {
  id: string
  userId: string
  task: string
  status: 'Pending' | 'In Progress' | 'Completed'
  assignee: string
}

const mockUsers: User[] = [
  {
    id: 'USR-001',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    department: 'Engineering',
    role: 'Senior Developer',
    status: 'Active',
    startDate: '2023-01-15',
    lastLogin: '2025-11-05 09:30',
    assignedDevices: 3,
    pendingTasks: 0
  },
  {
    id: 'USR-002',
    name: 'Alex Martinez',
    email: 'alex.martinez@company.com',
    department: 'Engineering',
    role: 'Software Engineer',
    status: 'Pending',
    startDate: '2025-11-10',
    lastLogin: 'Never',
    assignedDevices: 0,
    pendingTasks: 5
  },
  {
    id: 'USR-003',
    name: 'Emily Chen',
    email: 'emily.chen@company.com',
    department: 'Marketing',
    role: 'Marketing Manager',
    status: 'Active',
    startDate: '2022-06-20',
    lastLogin: '2025-11-05 08:15',
    assignedDevices: 2,
    pendingTasks: 0
  },
  {
    id: 'USR-004',
    name: 'Michael Brown',
    email: 'michael.brown@company.com',
    department: 'Sales',
    role: 'Account Executive',
    status: 'Offboarding',
    startDate: '2021-03-10',
    lastLogin: '2025-11-03 16:45',
    assignedDevices: 2,
    pendingTasks: 3
  },
  {
    id: 'USR-005',
    name: 'Jessica Lee',
    email: 'jessica.lee@company.com',
    department: 'HR',
    role: 'HR Specialist',
    status: 'Active',
    startDate: '2023-09-01',
    lastLogin: '2025-11-05 10:00',
    assignedDevices: 2,
    pendingTasks: 0
  },
]

const mockOnboardingTasks: OnboardingTask[] = [
  {
    id: 'TASK-001',
    userId: 'USR-002',
    task: 'Create AD account and email',
    status: 'Completed',
    assignee: 'John Doe'
  },
  {
    id: 'TASK-002',
    userId: 'USR-002',
    task: 'Order and configure laptop',
    status: 'In Progress',
    assignee: 'Jane Smith'
  },
  {
    id: 'TASK-003',
    userId: 'USR-002',
    task: 'Setup VPN access',
    status: 'Pending',
    assignee: 'Unassigned'
  },
  {
    id: 'TASK-004',
    userId: 'USR-002',
    task: 'Configure O365 licenses',
    status: 'Pending',
    assignee: 'Unassigned'
  },
  {
    id: 'TASK-005',
    userId: 'USR-002',
    task: 'Setup mobile device',
    status: 'Pending',
    assignee: 'Unassigned'
  },
]

export default function UserManagement() {
  const [users] = useState<User[]>(mockUsers)
  const [tasks] = useState<OnboardingTask[]>(mockOnboardingTasks)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('All')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'All' || user.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800'
      case 'Pending': return 'bg-yellow-100 text-yellow-800'
      case 'Offboarding': return 'bg-orange-100 text-orange-800'
      case 'Inactive': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTaskStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'In Progress': return <Clock className="w-5 h-5 text-blue-500" />
      case 'Pending': return <XCircle className="w-5 h-5 text-gray-400" />
      default: return <XCircle className="w-5 h-5 text-gray-400" />
    }
  }

  const activeCount = users.filter(u => u.status === 'Active').length
  const pendingCount = users.filter(u => u.status === 'Pending').length
  const offboardingCount = users.filter(u => u.status === 'Offboarding').length

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">User Management</h2>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            <UserPlus size={20} />
            <span>Onboard User</span>
          </button>
          <button className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
            <UserMinus size={20} />
            <span>Offboard User</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{users.length}</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{activeCount}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Onboarding</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">{pendingCount}</p>
            </div>
            <UserPlus className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Offboarding</p>
              <p className="text-3xl font-bold text-orange-600 mt-2">{offboardingCount}</p>
            </div>
            <UserMinus className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending (Onboarding)</option>
            <option value="Offboarding">Offboarding</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Users List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Devices
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tasks
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => setSelectedUser(user)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-xs text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.department}</div>
                        <div className="text-xs text-gray-500">{user.role}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.assignedDevices}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.pendingTasks > 0 ? (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                            {user.pendingTasks} pending
                          </span>
                        ) : (
                          <span className="text-xs text-gray-500">None</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* User Details / Onboarding Tasks */}
        <div className="lg:col-span-1">
          {selectedUser ? (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">User Details</h3>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-600">Name</p>
                  <p className="text-sm font-medium">{selectedUser.name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Email</p>
                  <p className="text-sm font-medium">{selectedUser.email}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Department</p>
                  <p className="text-sm font-medium">{selectedUser.department}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Role</p>
                  <p className="text-sm font-medium">{selectedUser.role}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Start Date</p>
                  <p className="text-sm font-medium">{selectedUser.startDate}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Last Login</p>
                  <p className="text-sm font-medium">{selectedUser.lastLogin}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Assigned Devices</p>
                  <p className="text-sm font-medium">{selectedUser.assignedDevices}</p>
                </div>

                {selectedUser.status === 'Pending' && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Onboarding Tasks</h4>
                    <div className="space-y-2">
                      {tasks.filter(t => t.userId === selectedUser.id).map(task => (
                        <div key={task.id} className="flex items-start space-x-2 p-2 bg-gray-50 rounded">
                          {getTaskStatusIcon(task.status)}
                          <div className="flex-1">
                            <p className="text-xs font-medium text-gray-900">{task.task}</p>
                            <p className="text-xs text-gray-500">Assignee: {task.assignee}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-center text-gray-500 py-12">
                <Users className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="text-sm">Select a user to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
