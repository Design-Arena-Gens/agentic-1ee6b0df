'use client'

import { useState } from 'react'
import Dashboard from '@/components/Dashboard'
import TicketManagement from '@/components/TicketManagement'
import VulnerabilityMonitor from '@/components/VulnerabilityMonitor'
import EndpointHealth from '@/components/EndpointHealth'
import AIAssistant from '@/components/AIAssistant'
import UserManagement from '@/components/UserManagement'
import { Menu, X } from 'lucide-react'

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'tickets', label: 'Ticket Management' },
    { id: 'vulnerabilities', label: 'Vulnerabilities' },
    { id: 'endpoints', label: 'Endpoint Health' },
    { id: 'users', label: 'User Management' },
    { id: 'assistant', label: 'AI Assistant' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-blue-600">IT Operations Hub</h1>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id)
                    setMobileMenuOpen(false)
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'tickets' && <TicketManagement />}
        {activeTab === 'vulnerabilities' && <VulnerabilityMonitor />}
        {activeTab === 'endpoints' && <EndpointHealth />}
        {activeTab === 'users' && <UserManagement />}
        {activeTab === 'assistant' && <AIAssistant />}
      </main>
    </div>
  )
}
