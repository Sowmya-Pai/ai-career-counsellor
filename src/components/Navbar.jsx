import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-4xl mx-auto p-4 flex items-center justify-between">
        <Link to="/" className="font-bold text-lg">AI Career Counsellor</Link>
        <nav className="space-x-4">
          <Link to="/" className="text-sm text-gray-600 hover:underline">Home</Link>
          <Link to="/assessment" className="text-sm text-gray-600 hover:underline">Assessment</Link>
          {/* Combined Report removed */}
        </nav>
      </div>
    </header>
  )
}
