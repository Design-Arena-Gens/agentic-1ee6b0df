'use client'

import { useState } from 'react'
import { Search, Filter, Plus, ExternalLink, Clock, AlertCircle } from 'lucide-react'

type Ticket = {
  id: string
  title: string
  priority: 'Low' | 'Medium' | 'High' | 'Critical'
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed'
  assignee: string
  requester: string
  createdAt: string
  sla: string
  source: 'ServiceNow' | 'Jira' | 'Freshservice'
  category: string
}

const mockTickets: Ticket[] = [
  {
    id: 'SNOW-1234',
    title: 'Unable to access VPN from home office',
    priority: 'High',
    status: 'In Progress',
    assignee: 'John Doe',
    requester: 'Sarah Johnson',
    createdAt: '2025-11-05 09:30',
    sla: '2h 15m remaining',
    source: 'ServiceNow',
    category: 'Network'
  },
  {
    id: 'JIRA-5678',
    title: 'Printer not responding - 3rd floor',
    priority: 'Medium',
    status: 'Open',
    assignee: 'Unassigned',
    requester: 'Mike Chen',
    createdAt: '2025-11-05 10:15',
    sla: '4h 30m remaining',
    source: 'Jira',
    category: 'Hardware'
  },
  {
    id: 'FS-9012',
    title: 'O365 license activation issue',
    priority: 'Critical',
    status: 'In Progress',
    assignee: 'Jane Smith',
    requester: 'David Park',
    createdAt: '2025-11-05 08:00',
    sla: '45m remaining',
    source: 'Freshservice',
    category: 'Software'
  },
  {
    id: 'SNOW-1235',
    title: 'New user onboarding - IT equipment setup',
    priority: 'Medium',
    status: 'Open',
    assignee: 'John Doe',
    requester: 'HR Department',
    createdAt: '2025-11-05 11:00',
    sla: '1d 2h remaining',
    source: 'ServiceNow',
    category: 'Access Management'
  },
  {
    id: 'JIRA-5679',
    title: 'MacBook Pro running slow - performance issue',
    priority: 'Low',
    status: 'Open',
    assignee: 'Unassigned',
    requester: 'Emily Brown',
    createdAt: '2025-11-05 09:45',
    sla: '1d 6h remaining',
    source: 'Jira',
    category: 'Hardware'
  },
  {
    id: 'FS-9013',
    title: 'Password reset required - account locked',
    priority: 'High',
    status: 'Resolved',
    assignee: 'Jane Smith',
    requester: 'Robert Wilson',
    createdAt: '2025-11-05 07:30',
    sla: 'Met SLA',
    source: 'Freshservice',
    category: 'Access Management'
  },
]

export default function TicketManagement() {
  const [tickets] = useState<Ticket[]>(mockTickets)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('All')
  const [filterPriority, setFilterPriority] = useState<string>('All')

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'All' || ticket.status === filterStatus
    const matchesPriority = filterPriority === 'All' || ticket.priority === filterPriority
    return matchesSearch && matchesStatus && matchesPriority
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-300'
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-300'
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'Low': return 'bg-green-100 text-green-800 border-green-300'
      default: return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-blue-100 text-blue-800'
      case 'In Progress': return 'bg-purple-100 text-purple-800'
      case 'Resolved': return 'bg-green-100 text-green-800'
      case 'Closed': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getSourceIcon = (source: string) => {
    const colors = {
      'ServiceNow': 'bg-blue-500',
      'Jira': 'bg-blue-600',
      'Freshservice': 'bg-green-500'
    }
    return colors[source as keyof typeof colors] || 'bg-gray-500'
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Ticket Management</h2>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus size={20} />
          <span>New Ticket</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search tickets..."
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
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </select>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="All">All Priorities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <button className="flex items-center justify-center space-x-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter size={20} />
            <span>More Filters</span>
          </button>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ticket ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assignee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SLA
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Source
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{ticket.id}</div>
                    <div className="text-xs text-gray-500">{ticket.category}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{ticket.title}</div>
                    <div className="text-xs text-gray-500">Requester: {ticket.requester}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(ticket.status)}`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {ticket.assignee}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1">
                      {ticket.sla.includes('remaining') && ticket.sla.includes('45m') ? (
                        <AlertCircle size={16} className="text-red-500" />
                      ) : (
                        <Clock size={16} className="text-gray-400" />
                      )}
                      <span className={`text-xs ${ticket.sla.includes('45m') ? 'text-red-600 font-semibold' : 'text-gray-600'}`}>
                        {ticket.sla}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${getSourceIcon(ticket.source)}`}></div>
                      <span className="text-xs text-gray-600">{ticket.source}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900">
                      <ExternalLink size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600">Total Tickets</div>
          <div className="text-2xl font-bold text-gray-900">{filteredTickets.length}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600">Open</div>
          <div className="text-2xl font-bold text-blue-600">
            {filteredTickets.filter(t => t.status === 'Open').length}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600">In Progress</div>
          <div className="text-2xl font-bold text-purple-600">
            {filteredTickets.filter(t => t.status === 'In Progress').length}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600">Resolved Today</div>
          <div className="text-2xl font-bold text-green-600">
            {filteredTickets.filter(t => t.status === 'Resolved').length}
          </div>
        </div>
      </div>
    </div>
  )
}
