import React from 'react'

// Static starter images
const moodImages = [
    { id: 1, url: "/images/calm1.jpg", mood: "Chill" },
    { id: 2, url: "/images/motivation1.jpg", mood: "Motivated" },
    { id: 3, url: "/images/focus1.jpg", mood: "Focused" },
    { id: 4, url: "/images/nostalgia1.jpg", mood: "Nostalgic" },
    { id: 5, url: "/images/sad1.jpg", mood: "Sad" },
    { id: 6, url: "/images/calm2.jpg", mood: "Chill" },
    { id: 7, url: "/images/motivation2.jpg", mood: "Motivated" },
]

const Moodboard = ({ selectedMood, setSelectedMood, customImages = [], favorites, toggleFavorite, onlyFavorites, handleDeleteImage }) => {
    // Combine static + user-added
    const allImages = [...moodImages, ...customImages]

    // Filter by mood
    let filteredImages = allImages;
    if (selectedMood) {
        filteredImages = filteredImages.filter(img => img.mood === selectedMood);
    }
    if (onlyFavorites) {
        filteredImages = filteredImages.filter(img =>
            favorites.some(fav => fav.id === img.id && fav.type === "image")
        );
    }



    return (
        <div>
            {selectedMood && (
                <div className="flex justify-between items-center px-6 py-2">
                    <h2 className="text-xl font-semibold text-[#f1f5f9] tracking-wide">
                        🎯 Showing images for: <span className="text-[#38bdf8] aurora-glow">#{selectedMood}</span>
                    </h2>
                    <button
                        onClick={() => setSelectedMood(null)}
                        className="text-xl text-[#94a3b8] hover:text-[#f1f5f9] transition font-bold"
                    >
                        × Clear
                    </button>
                </div>
            )}

            <div className="columns-2 sm:columns-3 md:columns-4 gap-4 px-8 py-6 space-y-4">
                {filteredImages.map((img) => (
                    <div
                        key={img.id}
                        className="break-inside-avoid overflow-hidden rounded-xl shadow-md hover:scale-105 transition-transform duration-200 relative"
                    >
                        <img src={img.url} alt={img.mood} className="w-full h-auto object-cover rounded" />

                        <div className="absolute bottom-2 right-2 bg-[#1e293b]/80 text-xs text-[#94a3b8] px-2 py-0.5 rounded-full shadow-sm aurora-glow">
                            #{img.mood}
                        </div>

                        {img.isCustom && (
                            <button
                                onClick={() => handleDeleteImage(img.id)}
                                className="absolute bottom-2 left-2 bg-red-600 text-white text-sm md:text-xl lg:text-2xl px-2 py-1 rounded-full hover:bg-red-700 transition"
                            >
                                🗑️
                            </button>
                        )}

                        <button
                            onClick={() => toggleFavorite(img.id, "image")}
                            className="absolute top-2 right-2 text-xl md:text-2xl lg:text-4xl"
                        >
                            {favorites.some(fav => fav.id === img.id && fav.type === "image") ? "❤️" : "🤍"}
                        </button>
                    </div>

                ))}
            </div>
        </div>
    )
}

export default Moodboard
