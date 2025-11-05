'use client'

import { useState } from 'react'
import { Send, Bot, User, MessageSquare, Lightbulb, AlertTriangle } from 'lucide-react'

type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  type?: 'text' | 'suggestion' | 'alert'
}

const initialMessages: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: "Hello! I'm your AI IT Support Assistant. I can help you with:\n\n• Level 1 & 2 technical support\n• Ticket triage and routing\n• Vulnerability analysis\n• Endpoint troubleshooting\n• User onboarding/offboarding\n• SLA tracking\n\nHow can I assist you today?",
    timestamp: '2025-11-05 09:00',
    type: 'text'
  }
]

const suggestedQueries = [
  'Show me critical vulnerabilities',
  'List all open tickets',
  'Which endpoints need attention?',
  'Troubleshoot VPN connection issue',
  'Create new user onboarding checklist',
  'What are the SLA breach risks?',
]

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || input
    if (!textToSend.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleString(),
      type: 'text'
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(textToSend)
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date().toLocaleString(),
        type: 'text'
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase()

    if (lowerQuery.includes('critical') || lowerQuery.includes('vulnerab')) {
      return "I've analyzed the current vulnerabilities:\n\n🔴 **3 Critical Vulnerabilities Detected:**\n\n1. CVE-2024-1234 - SQL Injection (CVSS 9.8)\n   - Affects 5 web servers\n   - Recommended: Apply patch immediately\n\n2. CVE-2024-5678 - Remote Code Execution (CVSS 9.1)\n   - Affects 12 Windows servers\n   - Patch available from Microsoft\n\n3. CVE-2024-9012 - XSS in Portal (CVSS 7.5)\n   - Affects 3 applications\n   - Already patched on 1 system\n\nWould you like me to create tickets for the remediation team?"
    }

    if (lowerQuery.includes('ticket') || lowerQuery.includes('open')) {
      return "📋 **Current Open Tickets Summary:**\n\n• Total Open: 156 tickets\n• Critical Priority: 7 tickets\n• SLA at Risk: 3 tickets\n\n**Urgent Attention Required:**\n- SNOW-1234: VPN access issue (2h 15m remaining)\n- FS-9012: O365 license issue (45m remaining) ⚠️\n- JIRA-5678: Printer issue 3rd floor (4h 30m remaining)\n\nThe FS-9012 ticket is approaching SLA breach. Would you like me to escalate it?"
    }

    if (lowerQuery.includes('endpoint') || lowerQuery.includes('health')) {
      return "💻 **Endpoint Health Status:**\n\n✅ Healthy: 245 devices (82%)\n⚠️ Warning: 42 devices (14%)\n🔴 Critical: 13 devices (4%)\n\n**Devices Requiring Immediate Attention:**\n\n1. DESKTOP-WIN-12 (David Park)\n   - CPU: 95%, Memory: 97%, Disk: 95%\n   - Multiple crashes detected\n   - Recommendation: Schedule maintenance\n\n2. LAPTOP-MAC-05 (Mike Chen)\n   - Memory: 92%, Disk: 88%\n   - High resource usage\n   - Suggestion: Close unused applications\n\nWould you like me to notify these users?"
    }

    if (lowerQuery.includes('vpn') || lowerQuery.includes('troubleshoot')) {
      return "🔧 **VPN Connection Troubleshooting Guide:**\n\n**Common Issues & Solutions:**\n\n1. **Authentication Failed:**\n   - Verify username/password\n   - Check if account is locked\n   - Ensure MFA is configured\n\n2. **Connection Timeout:**\n   - Check internet connectivity\n   - Verify VPN server status (currently: ✅ Online)\n   - Test firewall rules\n\n3. **Certificate Issues:**\n   - Check certificate expiration\n   - Reinstall VPN client if needed\n\n**Quick Diagnostics:**\n- VPN Server Status: Operational\n- Active Connections: 234/500\n- Recent Outages: None\n\nShould I create a ticket for this issue?"
    }

    if (lowerQuery.includes('onboard') || lowerQuery.includes('user') || lowerQuery.includes('checklist')) {
      return "👤 **User Onboarding Checklist:**\n\n**Pre-Day 1:**\n✅ Create AD account\n✅ Setup email account\n✅ Order hardware (laptop, mouse, keyboard)\n✅ Request software licenses\n\n**Day 1:**\n⏳ Configure workstation\n⏳ Install required software\n⏳ Setup VPN access\n⏳ Configure O365 apps\n⏳ Enable MFA\n\n**Week 1:**\n⏳ Schedule IT orientation\n⏳ Setup mobile device (if applicable)\n⏳ Configure printer access\n⏳ Grant application permissions\n\n**Current New Hire:** Alex Martinez\nStatus: 2/10 tasks completed\nStart Date: 2025-11-10\n\nWould you like to assign pending tasks to team members?"
    }

    if (lowerQuery.includes('sla') || lowerQuery.includes('breach')) {
      return "⏰ **SLA Status & Breach Risks:**\n\n**High Risk (less than 1 hour):**\n🔴 FS-9012 - O365 license issue (45m remaining)\n   Action: Escalate to Level 2 immediately\n\n**Medium Risk (1-3 hours):**\n🟡 SNOW-1234 - VPN access issue (2h 15m)\n   Action: Continue monitoring\n\n**On Track:**\n✅ 150 tickets within SLA timeframe\n\n**Performance Metrics (Last 7 Days):**\n- SLA Met: 92%\n- Average Resolution Time: 4.2 hours\n- First Response Time: 12 minutes\n\n**Recommendation:** Assign additional resources to FS-9012 to prevent breach."
    }

    // Default response
    return "I understand you're asking about: '" + query + "'\n\nI can help you with various IT operations tasks. Here are some things I can assist with:\n\n• Ticket management and triage\n• Vulnerability analysis and remediation\n• Endpoint health monitoring\n• User onboarding/offboarding workflows\n• SLA tracking and breach prevention\n• Troubleshooting guides\n\nCould you provide more details about what you need help with?"
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">AI Technical Support Assistant</h2>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow flex flex-col h-[600px]">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`flex space-x-3 max-w-3xl ${
                      message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}
                  >
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        message.role === 'user' ? 'bg-blue-500' : 'bg-purple-500'
                      }`}
                    >
                      {message.role === 'user' ? (
                        <User className="w-5 h-5 text-white" />
                      ) : (
                        <Bot className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div
                      className={`rounded-lg p-4 ${
                        message.role === 'user'
                          ? 'bg-blue-100 text-gray-900'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <p className="text-xs text-gray-500 mt-2">{message.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex space-x-3 max-w-3xl">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-purple-500">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="rounded-lg p-4 bg-gray-100">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me anything about IT operations..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isTyping}
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={isTyping || !input.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Suggested Queries */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              <h3 className="text-lg font-semibold text-gray-900">Suggested Queries</h3>
            </div>
            <div className="space-y-2">
              {suggestedQueries.map((query, index) => (
                <button
                  key={index}
                  onClick={() => handleSendMessage(query)}
                  disabled={isTyping}
                  className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                >
                  {query}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-2 mb-4">
              <MessageSquare className="w-5 h-5 text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-900">Quick Stats</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Queries Today</span>
                <span className="text-sm font-semibold text-gray-900">142</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Avg Response Time</span>
                <span className="text-sm font-semibold text-gray-900">1.2s</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Accuracy Rate</span>
                <span className="text-sm font-semibold text-green-600">94%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Issues Resolved</span>
                <span className="text-sm font-semibold text-gray-900">87</span>
              </div>
            </div>
          </div>

          {/* Active Alerts */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <h3 className="text-lg font-semibold text-gray-900">Active Alerts</h3>
            </div>
            <div className="space-y-3">
              <div className="p-2 bg-red-50 border border-red-200 rounded">
                <p className="text-xs font-semibold text-red-800">SLA Breach Risk</p>
                <p className="text-xs text-red-600">1 ticket &lt; 1 hour</p>
              </div>
              <div className="p-2 bg-orange-50 border border-orange-200 rounded">
                <p className="text-xs font-semibold text-orange-800">Critical Vulns</p>
                <p className="text-xs text-orange-600">3 requiring action</p>
              </div>
              <div className="p-2 bg-yellow-50 border border-yellow-200 rounded">
                <p className="text-xs font-semibold text-yellow-800">Endpoints Warning</p>
                <p className="text-xs text-yellow-600">13 devices critical</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
