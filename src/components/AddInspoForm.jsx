import React, { useState } from 'react'

const moods = ['Happy', 'Sad', 'Motivated', 'Lost', 'Nostalgic', 'Focused', 'Anxious', 'Chill']

const AddInspoForm = ({ onAdd, onClose, moods }) => {
    const [url, setUrl] = useState('')
    const [mood, setMood] = useState('Chill')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!url.trim()) return

        const newImage = {
            id: Date.now(),
            url,
            mood,
            isCustom: true
        }
        onAdd(newImage)
        onClose()
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <form onSubmit={handleSubmit} className="bg-[#1e293b] p-6 rounded-xl shadow-xl w-full max-w-md space-y-4">
                <h2 className="text-xl font-semibold text-white">Add Inspiration</h2>
                <input
                    type="text"
                    placeholder="Image URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full p-2 rounded bg-[#0f172a] text-white border border-[#334155]"
                    required
                />
                <select value={mood} onChange={(e) => setMood(e.target.value)} className="w-full p-2 rounded bg-[#0f172a] text-white border border-[#334155]">
                    <option value="">Select mood</option>
                    {moods.map((m) => (
                        <option key={m} value={m}>{m}</option>
                    ))}
                </select>
                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm bg-gray-600 text-white rounded"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 text-sm bg-[#38bdf8] text-[#0f172a] font-medium rounded"
                    >
                        Add
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddInspoForm
