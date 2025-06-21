import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { div } from 'framer-motion/client'
import html2canvas from "html2canvas"

const InspoGrid = ({ selectedMood, setSelectedMood, searchQuery, favorites, toggleFavorite, onlyFavorites, customQuotes = [], handleDeleteQuote }) => {

    const dummyQuotes = [
        { id: 1, text: "Stay hungry, stay foolish.", author: "Steve Jobs", mood: "Motivated" },
        { id: 2, text: "The only way out is through.", author: "Robert Frost", mood: "Lost" },
        { id: 3, text: "Keep going. Everything you need will come to you.", author: "Anonymous", mood: "Focused" },
        { id: 4, text: "Your time is limited, don’t waste it living someone else’s life.", author: "Steve Jobs", mood: "Motivated" },
        { id: 5, text: "What you seek is seeking you.", author: "Rumi", mood: "Nostalgic" },
        { id: 6, text: "You are not a drop in the ocean. You are the entire ocean in a drop.", author: "Rumi", mood: "Chill" }
    ]

    const handleQuoteDownload = (id) => {
        console.log("Clicked Download for ID:", id)
        const target = document.getElementById(`quote-${id}`)
        console.log("Target:", target)
        if (!target) return

        html2canvas(target, {
            backgroundColor: null,
            scale: 2, // for higher resolution
        }).then((canvas) => {
            console.log("Canvas:", canvas)
            const link = document.createElement("a")
            link.download = `quote-${id}.png`
            link.href = canvas.toDataURL("image/png")
            link.click()
        })
    }

    let filteredQuotes = [...customQuotes, ...dummyQuotes];

    if (selectedMood) {
        filteredQuotes = filteredQuotes.filter(
            (q) => q.mood.toLowerCase() === selectedMood.toLowerCase()
        )
    }

    if (searchQuery.trim() !== "") {
        filteredQuotes = filteredQuotes.filter(
            (q) =>
                q.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
                q.author.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }

    if (onlyFavorites) {
        filteredQuotes = filteredQuotes.filter(quote =>
            favorites.some(fav => fav.id === quote.id && fav.type === "quote")
        );
    }



    return (
        <div>
            {selectedMood && (
                <div className="flex justify-between items-center px-6 py-2">
                    <h2 className="text-xl font-semibold text-[#f1f5f9] tracking-wide">
                        🎯 Showing quotes for: <span className="text-[#38bdf8] aurora-glow">#{selectedMood}</span>
                    </h2>
                    <button
                        onClick={() => setSelectedMood(null)}
                        className="text-xl text-[#94a3b8] hover:text-[#f1f5f9] transition font-bold"
                    >
                        × Clear
                    </button>
                </div>
            )}


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 py-4">
                <AnimatePresence>
                    {filteredQuotes.map((quote) => (
                        <motion.div
                            key={quote.id}
                            id={`quote-${quote.id}`}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="bg-[#1e293b] rounded-xl p-6 shadow-md hover:shadow-lg border border-[#334155] flex flex-col justify-between h-full relative"
                        >
                            {/* ❤️ Favorite Button */}
                            <button
                                onClick={() => toggleFavorite(quote.id, "quote")}
                                className="absolute bottom-2 left-1 text-2xl"
                            >
                                {favorites.some(fav => fav.id === quote.id && fav.type === "quote") ? "❤️" : "🤍"}
                            </button>
                            {quote.isCustom && (
                                <button
                                    onClick={() => handleDeleteQuote(quote.id)}
                                    className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs hover:bg-red-700"
                                >
                                    🗑️
                                </button>
                            )}

                            <button
                                onClick={() => handleQuoteDownload(quote.id)}
                                className="absolute bottom-2 left-9 text-xl text-white rounded hover:bg-[#0ea5e9] shadow-md"
                            >
                                ⬇️
                            </button>

                            <p className="text-lg font-medium text-[#f1f5f9] mb-4">"{quote.text}"</p>
                            <p className="text-sm text-[#94a3b8] text-right">
                                — {quote.author || "Anonymous"}
                            </p>
                        </motion.div>
                    ))}

                    {filteredQuotes.length === 0 && (
                        <p className="text-center col-span-full text-[#94a3b8]">
                            No inspiration found for this mood.
                        </p>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default InspoGrid
