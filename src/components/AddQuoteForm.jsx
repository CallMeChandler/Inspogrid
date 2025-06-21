import React, { useState } from 'react'

const moods = ['Happy', 'Sad', 'Motivated', 'Lost', 'Nostalgic', 'Focused', 'Anxious', 'Chill']

const AddQuoteForm = ({ onAdd, onClose, moods }) => {
    const [quoteText, setQuoteText] = useState('')
    const [selectedMood, setSelectedMood] = useState('')
    const [author, setAuthor] = useState('')


    const handleSubmit = (e) => {
        e.preventDefault()
        if (!quoteText.trim() || !selectedMood) return
        const newQuote = {
            id: Date.now(),
            text: quoteText.trim(),
            mood: selectedMood,
            author: author.trim() || "Anonymous",
            isCustom: true
        }

        onAdd(newQuote)
        setQuoteText('')
        setSelectedMood('')
        onClose()
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
            <form
                onSubmit={handleSubmit}
                className="bg-[#1e293b] rounded-lg p-6 w-[90%] max-w-md shadow-lg space-y-4"
            >
                <h2 className="text-xl text-white font-semibold">Add a New Quote</h2>
                <textarea
                    className="w-full p-3 rounded bg-[#0f172a] text-white"
                    rows="3"
                    placeholder="Type your quote..."
                    value={quoteText}
                    onChange={(e) => setQuoteText(e.target.value)}
                    required
                />
                <select value={selectedMood} onChange={(e) => setSelectedMood(e.target.value)} className="w-full p-2 rounded bg-[#0f172a] text-white">
                    <option value="">Select mood</option>
                    {moods.map((m) => (
                        <option key={m} value={m}>{m}</option>
                    ))}
                </select>
                <input
                    type="text"
                    className="w-full p-2 rounded bg-[#0f172a] text-white"
                    placeholder="Author (optional)"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />

                <div className="flex justify-between">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-[#38bdf8] text-[#0f172a] font-bold rounded hover:bg-[#0ea5e9]"
                    >
                        Add Quote
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddQuoteForm
