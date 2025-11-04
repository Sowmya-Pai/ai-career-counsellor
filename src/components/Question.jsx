import React from 'react'

export default function Question({ question, value, onChange }) {
  return (
    <div className="p-3 border rounded">
      <div className="flex justify-between items-center mb-2">
        <div className="font-medium">{question.id}. {question.text}</div>
        <div className="text-xs text-gray-500">{question.type} • {question.tag}</div>
      </div>
      <div className="flex gap-2">
        {[1,2,3,4,5].map(v => (
          <label
            key={v}
            className={`flex-1 text-center p-2 rounded cursor-pointer ${value === v ? 'bg-slate-200' : 'bg-slate-50 hover:bg-slate-100'}`}
          >
            <input
              className="hidden"
              type="radio"
              name={`q-${question.id}`}
              checked={value === v}
              onChange={() => onChange(question.id, v)}
            />
            <div className="text-sm">{v}</div>
          </label>
        ))}
      </div>
    </div>
  )
}
