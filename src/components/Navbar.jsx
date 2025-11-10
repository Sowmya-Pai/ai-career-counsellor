import React from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../theme/ThemeContext'

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  return (
    <header className={isDark ? "bg-slate-900 shadow-sm" : "bg-white shadow-sm"}>
      <div className="max-w-4xl mx-auto p-4 flex items-center justify-between">
        <Link to="/" className={`font-bold text-lg ${isDark ? "text-white" : "text-slate-900"}`}>AI Career Counsellor</Link>
        <nav className="space-x-4 flex items-center">
          <Link to="/" className={`text-sm hover:underline ${isDark ? "text-slate-300" : "text-gray-600"}`}>Home</Link>
          <Link to="/assessment" className={`text-sm hover:underline ${isDark ? "text-slate-300" : "text-gray-600"}`}>Assessment</Link>
          <button onClick={toggleTheme} className={`text-sm px-2 py-1 rounded ${isDark ? "bg-white text-slate-900" : "bg-slate-900 text-white"}`}>
            {isDark ? "Light mode" : "Dark mode"}
          </button>
          {/* Combined Report removed */}
        </nav>
      </div>
    </header>
  )
}
