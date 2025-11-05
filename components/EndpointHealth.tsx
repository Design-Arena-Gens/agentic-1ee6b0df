'use client'

import { useState } from 'react'
import { Monitor, Smartphone, Wifi, HardDrive, Cpu, Activity, AlertCircle, CheckCircle, Search } from 'lucide-react'

type Endpoint = {
  id: string
  name: string
  type: 'Desktop' | 'Laptop' | 'Mobile' | 'Server' | 'Network Device'
  os: string
  user: string
  ipAddress: string
  status: 'Healthy' | 'Warning' | 'Critical' | 'Offline'
  lastSeen: string
  cpuUsage: number
  memoryUsage: number
  diskUsage: number
  uptime: string
  issues: string[]
}

const mockEndpoints: Endpoint[] = [
  {
    id: 'EP-001',
    name: 'DESKTOP-WIN-01',
    type: 'Desktop',
    os: 'Windows 11 Pro',
    user: 'Sarah Johnson',
    ipAddress: '192.168.1.101',
    status: 'Healthy',
    lastSeen: '2 mins ago',
    cpuUsage: 35,
    memoryUsage: 58,
    diskUsage: 65,
    uptime: '5d 12h',
    issues: []
  },
  {
    id: 'EP-002',
    name: 'LAPTOP-MAC-05',
    type: 'Laptop',
    os: 'macOS 14.2',
    user: 'Mike Chen',
    ipAddress: '192.168.1.105',
    status: 'Warning',
    lastSeen: '5 mins ago',
    cpuUsage: 78,
    memoryUsage: 92,
    diskUsage: 88,
    uptime: '2d 8h',
    issues: ['High memory usage', 'Disk space low']
  },
  {
    id: 'EP-003',
    name: 'DESKTOP-WIN-12',
    type: 'Desktop',
    os: 'Windows 10 Pro',
    user: 'David Park',
    ipAddress: '192.168.1.112',
    status: 'Critical',
    lastSeen: '1 hour ago',
    cpuUsage: 95,
    memoryUsage: 97,
    diskUsage: 95,
    uptime: '45m',
    issues: ['CPU throttling', 'Memory exhausted', 'Multiple crashes detected']
  },
  {
    id: 'EP-004',
    name: 'IPHONE-14-PRO',
    type: 'Mobile',
    os: 'iOS 17.2',
    user: 'Emily Brown',
    ipAddress: '192.168.1.156',
    status: 'Healthy',
    lastSeen: '10 mins ago',
    cpuUsage: 22,
    memoryUsage: 45,
    diskUsage: 72,
    uptime: '12d 5h',
    issues: []
  },
  {
    id: 'EP-005',
    name: 'PROD-SERVER-01',
    type: 'Server',
    os: 'Ubuntu 22.04 LTS',
    user: 'System',
    ipAddress: '10.0.1.10',
    status: 'Healthy',
    lastSeen: '1 min ago',
    cpuUsage: 42,
    memoryUsage: 68,
    diskUsage: 55,
    uptime: '45d 3h',
    issues: []
  },
  {
    id: 'EP-006',
    name: 'SWITCH-CORE-01',
    type: 'Network Device',
    os: 'Cisco IOS 15.2',
    user: 'Network Admin',
    ipAddress: '10.0.0.1',
    status: 'Warning',
    lastSeen: '3 mins ago',
    cpuUsage: 68,
    memoryUsage: 75,
    diskUsage: 45,
    uptime: '89d 12h',
    issues: ['High traffic load', 'Port 24 errors']
  },
  {
    id: 'EP-007',
    name: 'LAPTOP-WIN-08',
    type: 'Laptop',
    os: 'Windows 11 Pro',
    user: 'Robert Wilson',
    ipAddress: '192.168.1.108',
    status: 'Offline',
    lastSeen: '2 days ago',
    cpuUsage: 0,
    memoryUsage: 0,
    diskUsage: 0,
    uptime: '0h',
    issues: ['Device offline', 'No network connectivity']
  },
  {
    id: 'EP-008',
    name: 'MACBOOK-PRO-M3',
    type: 'Laptop',
    os: 'macOS 14.3',
    user: 'Jane Smith',
    ipAddress: '192.168.1.145',
    status: 'Healthy',
    lastSeen: '1 min ago',
    cpuUsage: 28,
    memoryUsage: 52,
    diskUsage: 48,
    uptime: '8d 18h',
    issues: []
  },
]

export default function EndpointHealth() {
  const [endpoints] = useState<Endpoint[]>(mockEndpoints)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<string>('All')
  const [filterStatus, setFilterStatus] = useState<string>('All')

  const filteredEndpoints = endpoints.filter(endpoint => {
    const matchesSearch = endpoint.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          endpoint.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          endpoint.ipAddress.includes(searchTerm)
    const matchesType = filterType === 'All' || endpoint.type === filterType
    const matchesStatus = filterStatus === 'All' || endpoint.status === filterStatus
    return matchesSearch && matchesType && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Healthy': return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'Warning': return <AlertCircle className="w-5 h-5 text-yellow-500" />
      case 'Critical': return <AlertCircle className="w-5 h-5 text-red-500" />
      case 'Offline': return <Activity className="w-5 h-5 text-gray-400" />
      default: return <Activity className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Healthy': return 'bg-green-100 text-green-800 border-green-200'
      case 'Warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200'
      case 'Offline': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Desktop': return <Monitor className="w-5 h-5" />
      case 'Laptop': return <Monitor className="w-5 h-5" />
      case 'Mobile': return <Smartphone className="w-5 h-5" />
      case 'Server': return <HardDrive className="w-5 h-5" />
      case 'Network Device': return <Wifi className="w-5 h-5" />
      default: return <Monitor className="w-5 h-5" />
    }
  }

  const getUsageColor = (usage: number) => {
    if (usage >= 90) return 'bg-red-500'
    if (usage >= 75) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const healthyCount = endpoints.filter(e => e.status === 'Healthy').length
  const warningCount = endpoints.filter(e => e.status === 'Warning').length
  const criticalCount = endpoints.filter(e => e.status === 'Critical').length
  const offlineCount = endpoints.filter(e => e.status === 'Offline').length

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Endpoint Health Monitor</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Healthy</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{healthyCount}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Warning</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">{warningCount}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Critical</p>
              <p className="text-3xl font-bold text-red-600 mt-2">{criticalCount}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Offline</p>
              <p className="text-3xl font-bold text-gray-600 mt-2">{offlineCount}</p>
            </div>
            <Activity className="w-8 h-8 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search endpoints..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="All">All Types</option>
            <option value="Desktop">Desktop</option>
            <option value="Laptop">Laptop</option>
            <option value="Mobile">Mobile</option>
            <option value="Server">Server</option>
            <option value="Network Device">Network Device</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="All">All Statuses</option>
            <option value="Healthy">Healthy</option>
            <option value="Warning">Warning</option>
            <option value="Critical">Critical</option>
            <option value="Offline">Offline</option>
          </select>
        </div>
      </div>

      {/* Endpoints Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredEndpoints.map((endpoint) => (
          <div key={endpoint.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-gray-600">
                    {getTypeIcon(endpoint.type)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{endpoint.name}</h3>
                    <p className="text-sm text-gray-600">{endpoint.os}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(endpoint.status)}
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(endpoint.status)}`}>
                    {endpoint.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <p className="text-gray-600">User</p>
                  <p className="font-medium text-gray-900">{endpoint.user}</p>
                </div>
                <div>
                  <p className="text-gray-600">IP Address</p>
                  <p className="font-medium font-mono text-gray-900">{endpoint.ipAddress}</p>
                </div>
                <div>
                  <p className="text-gray-600">Last Seen</p>
                  <p className="font-medium text-gray-900">{endpoint.lastSeen}</p>
                </div>
                <div>
                  <p className="text-gray-600">Uptime</p>
                  <p className="font-medium text-gray-900">{endpoint.uptime}</p>
                </div>
              </div>

              {/* Resource Usage */}
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600 flex items-center">
                      <Cpu className="w-4 h-4 mr-1" /> CPU
                    </span>
                    <span className="font-medium">{endpoint.cpuUsage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getUsageColor(endpoint.cpuUsage)}`}
                      style={{ width: `${endpoint.cpuUsage}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600 flex items-center">
                      <Activity className="w-4 h-4 mr-1" /> Memory
                    </span>
                    <span className="font-medium">{endpoint.memoryUsage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getUsageColor(endpoint.memoryUsage)}`}
                      style={{ width: `${endpoint.memoryUsage}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600 flex items-center">
                      <HardDrive className="w-4 h-4 mr-1" /> Disk
                    </span>
                    <span className="font-medium">{endpoint.diskUsage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getUsageColor(endpoint.diskUsage)}`}
                      style={{ width: `${endpoint.diskUsage}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Issues */}
              {endpoint.issues.length > 0 && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm font-semibold text-red-800 mb-2">Active Issues:</p>
                  <ul className="text-sm text-red-700 space-y-1">
                    {endpoint.issues.map((issue, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredEndpoints.length === 0 && (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <Monitor className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No endpoints found</h3>
          <p className="text-gray-500">Try adjusting your filters or search criteria</p>
        </div>
      )}
    </div>
  )
}
