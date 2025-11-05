'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import { AlertTriangle, CheckCircle, Clock, Activity } from 'lucide-react'

const ticketData = [
  { name: 'Mon', open: 24, resolved: 18 },
  { name: 'Tue', open: 31, resolved: 22 },
  { name: 'Wed', open: 28, resolved: 25 },
  { name: 'Thu', open: 35, resolved: 29 },
  { name: 'Fri', open: 42, resolved: 38 },
  { name: 'Sat', open: 15, resolved: 12 },
  { name: 'Sun', open: 12, resolved: 10 },
]

const vulnerabilityTrend = [
  { month: 'Jan', critical: 12, high: 28, medium: 45, low: 89 },
  { month: 'Feb', critical: 15, high: 32, medium: 41, low: 85 },
  { month: 'Mar', critical: 9, high: 25, medium: 38, low: 78 },
  { month: 'Apr', critical: 7, high: 22, medium: 35, low: 72 },
  { month: 'May', critical: 5, high: 18, medium: 32, low: 68 },
  { month: 'Jun', critical: 3, high: 15, medium: 28, low: 65 },
]

const endpointStatus = [
  { name: 'Healthy', value: 245, color: '#10b981' },
  { name: 'Warning', value: 42, color: '#f59e0b' },
  { name: 'Critical', value: 13, color: '#ef4444' },
]

const stats = [
  { title: 'Active Tickets', value: '156', icon: Clock, color: 'bg-blue-500', change: '+12%' },
  { title: 'Resolved Today', value: '38', icon: CheckCircle, color: 'bg-green-500', change: '+8%' },
  { title: 'Critical Alerts', value: '7', icon: AlertTriangle, color: 'bg-red-500', change: '-15%' },
  { title: 'Endpoints Online', value: '287', icon: Activity, color: 'bg-purple-500', change: '+3%' },
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">IT Operations Dashboard</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <p className="text-sm text-green-600 mt-1">{stat.change} from yesterday</p>
              </div>
              <div className={`${stat.color} rounded-full p-3`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ticket Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Ticket Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ticketData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="open" fill="#3b82f6" name="Open" />
              <Bar dataKey="resolved" fill="#10b981" name="Resolved" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Endpoint Status */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Endpoint Health Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={endpointStatus}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {endpointStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Vulnerability Trends */}
        <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Vulnerability Trends (6 Months)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={vulnerabilityTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="critical" stroke="#ef4444" strokeWidth={2} name="Critical" />
              <Line type="monotone" dataKey="high" stroke="#f59e0b" strokeWidth={2} name="High" />
              <Line type="monotone" dataKey="medium" stroke="#3b82f6" strokeWidth={2} name="Medium" />
              <Line type="monotone" dataKey="low" stroke="#10b981" strokeWidth={2} name="Low" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Critical Alerts</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {[
            { severity: 'Critical', message: 'SQL Injection vulnerability detected in Web Server 03', time: '5 mins ago', status: 'Active' },
            { severity: 'High', message: 'Outdated SSL certificate on Mail Server', time: '23 mins ago', status: 'In Progress' },
            { severity: 'Critical', message: 'Unauthorized access attempt on HR Database', time: '1 hour ago', status: 'Investigating' },
            { severity: 'High', message: 'Memory usage exceeded 90% on Production Server', time: '2 hours ago', status: 'Resolved' },
          ].map((alert, index) => (
            <div key={index} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center space-x-4">
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded ${
                    alert.severity === 'Critical' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'
                  }`}
                >
                  {alert.severity}
                </span>
                <div>
                  <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                  <p className="text-xs text-gray-500">{alert.time}</p>
                </div>
              </div>
              <span
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  alert.status === 'Resolved' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}
              >
                {alert.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
