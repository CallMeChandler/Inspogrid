import React, { useState } from 'react'

const AddMoodForm = ({ onAdd, onClose }) => {
    const [newMood, setNewMood] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!newMood.trim()) return
        onAdd(newMood.trim())
        setNewMood("")
        onClose()
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <form onSubmit={handleSubmit} className="bg-[#1e293b] text-white p-6 rounded-xl shadow-lg space-y-4 w-80">
                <h2 className="text-lg font-semibold">➕ Add New Mood</h2>
                <input
                    type="text"
                    value={newMood}
                    onChange={(e) => setNewMood(e.target.value)}
                    className="w-full px-4 py-2 bg-[#0f172a] text-white rounded border border-[#334155]"
                    placeholder="e.g., Inspired"
                />
                <div className="flex justify-end gap-2">
                    <button type="button" onClick={onClose} className="text-sm text-[#94a3b8] hover:text-white">Cancel</button>
                    <button type="submit" className="bg-[#38bdf8] px-4 py-1 rounded text-[#0f172a] hover:bg-[#0ea5e9]">Add</button>
                </div>
            </form>
        </div>
    )
}

export default AddMoodForm
