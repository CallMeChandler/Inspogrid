import React, { useState } from 'react'

const MoodSelector = ({ selectedMood, setSelectedMood, moods }) => {
    return (
        <div style={{ padding: '1rem', display: 'flex', gap: '0.5rem', flexWrap: "wrap" }}>
            {moods.map((mood) => (
                <button key={mood} onClick={() => setSelectedMood(mood)} className={`px-4 py-2 rounded-full text-lg font-medium transition-all duration-150 border ${selectedMood === mood
                        ? 'bg-[#38bdf8] text-[#0f172a] border-[#38bdf8]'
                        : 'bg-transparent text-[#94a3b8] border-[#475569] hover:bg-[#1e293b]'
                    }`}>
                    #{mood}
                </button>
            ))}
        </div>
    )
}

export default MoodSelector
