import { useState } from 'react'
import { FiPlus } from "react-icons/fi"
import Navbar from './components/Navbar.jsx'
import MoodSelector from './components/MoodSelector.jsx'
import InspirationGrid from './components/InspirationGrid.jsx'
import SearchBar from './components/SearchBar.jsx'
import Moodboard from './components/Moodboard.jsx'
import AddInspoForm from './components/AddInspoForm.jsx'
import AddQuoteForm from './components/AddQuoteForm.jsx'
import AddMoodForm from './components/AddMoodForm.jsx'
import './index.css'

function App() {
  const defaultMoods = ['Happy', 'Sad', 'Motivated', 'Lost', 'Nostalgic', 'Focused', 'Anxious', 'Chill']

  const [customMoods, setCustomMoods] = useState(() => {
    const saved = localStorage.getItem("customMoods")
    return saved ? JSON.parse(saved) : []
  })
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const allMoods = [...defaultMoods, ...customMoods]

  const [selectedMood, setSelectedMood] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState("images")
  const [showAddForm, setShowAddForm] = useState(false)
  const [customImages, setCustomImages] = useState(() => {
    const saved = localStorage.getItem("inspoImages")
    return saved ? JSON.parse(saved) : []
  })
  const [showAddQuote, setShowAddQuote] = useState(false)
  const [customQuotes, setCustomQuotes] = useState(() => {
    const saved = localStorage.getItem("inspoQuotes")
    return saved ? JSON.parse(saved) : []
  })
  const [showAddMood, setShowAddMood] = useState(false)

  const toggleFavorite = (id, type) => {
    const exists = favorites.find(fav => fav.id === id && fav.type === type)
    let updated

    if (exists) {
      updated = favorites.filter(fav => !(fav.id === id && fav.type === type))
    } else {
      updated = [...favorites, { id, type }]
    }

    setFavorites(updated)
    localStorage.setItem("favorites", JSON.stringify(updated))
  }

  const handleDeleteImage = (id) => {
    const updated = customImages.filter(img => img.id !== id)
    setCustomImages(updated)
    localStorage.setItem("inspoImages", JSON.stringify(updated))
  }

  const handleDeleteQuote = (id) => {
    const updated = customQuotes.filter(q => q.id !== id)
    setCustomQuotes(updated)
    localStorage.setItem("inspoQuotes", JSON.stringify(updated))
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1f2937] text-white">
      <Navbar />
      <div className='px-6 py-3 flex gap-4 justify-center'>
        <button onClick={() => setViewMode("images")} className={`px-4 py-2 rounded-full text-lg font-medium ${viewMode === "images"
          ? "bg-[#38bdf8] text-[#0f172a]"
          : "bg-[#1e293b] text-[#94a3b8] border border-[#334155]"
          }`}>
          🖼️ Moodboard
        </button>
        <button onClick={() => setViewMode("quotes")} className={`px-4 py-2 rounded-full text-lg font-medium ${viewMode === "quotes"
          ? "bg-[#38bdf8] text-[#0f172a]"
          : "bg-[#1e293b] text-[#94a3b8] border border-[#334155]"
          }`}>
          📝 Quotes
        </button>
        <button onClick={() => setViewMode("favorites")} className={`px-4 py-2 rounded-full text-lg font-medium ${viewMode === "favorites"
          ? "bg-[#38bdf8] text-[#0f172a]"
          : "bg-[#1e293b] text-[#94a3b8] border border-[#334155]"
          }`}>
          💖 Favorites
        </button>

      </div>
      {(viewMode === "images") && (
        <div className="px-6 py-4 text-center text-[#94a3b8]">
          <MoodSelector selectedMood={selectedMood} setSelectedMood={setSelectedMood} moods={allMoods} />

          {/* Show Add Mood Button only for 'images' view */}
          {viewMode === "images" && (
            <button
              onClick={() => setShowAddMood(true)}
              className="mt-2 text-lg font-bold text-[#94a3b8] hover:text-white underline"
            >
              + Add New Mood
            </button>
          )}

          <Moodboard
            selectedMood={selectedMood}
            setSelectedMood={setSelectedMood}
            customImages={customImages}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            onlyFavorites={viewMode === "favorites"}
            handleDeleteImage={handleDeleteImage} // now works ✅
          />
        </div>
      )}


      {viewMode === "quotes" && (
        <>
          <MoodSelector selectedMood={selectedMood} setSelectedMood={setSelectedMood} moods={allMoods} favorites={favorites} toggleFavorite={toggleFavorite} />
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <InspirationGrid selectedMood={selectedMood} setSelectedMood={setSelectedMood} searchQuery={searchQuery} favorites={favorites} toggleFavorite={toggleFavorite} onlyFavorites={viewMode === "favorites"} customQuotes={customQuotes} handleDeleteQuote={handleDeleteQuote} />
          {customQuotes.length > 0 && (
            <div className="px-6 py-4 space-y-4">
              <h2 className="text-xl font-semibold text-[#38bdf8]">✨ Your Inspo Quotes</h2>
              {customQuotes.map((quote) => (
                <div key={quote.id} className="bg-[#1e293b] p-4 rounded-lg shadow-md">
                  <p className="text-lg">“{quote.text}”</p>
                  <p className="text-sm text-right text-[#94a3b8]">
                    — {quote.author || "Anonymous"} <span className="italic text-[#38bdf8]">#{quote.mood}</span>
                  </p>
                </div>
              ))}
            </div>
          )}

        </>
      )}
      {viewMode === "images" && (
        <button
          onClick={() => setShowAddForm(true)}
          className="fixed bottom-6 right-6 bg-[#38bdf8] hover:bg-[#0ea5e9] text-[#0f172a] rounded-full w-12 h-12 flex items-center justify-center text-2xl shadow-lg"
        >
          <FiPlus />
        </button>
      )}
      {viewMode === "quotes" && (
        <button
          onClick={() => setShowAddQuote(true)}
          className="fixed bottom-6 right-6 bg-[#38bdf8] hover:bg-[#0ea5e9] text-[#0f172a] rounded-full w-12 h-12 flex items-center justify-center text-2xl shadow-lg"
        >
          <FiPlus />
        </button>
      )}
      {showAddForm && (
        <AddInspoForm
          moods={allMoods}  // 💥 pass this prop
          onAdd={(img) => {
            const updated = [...customImages, img]
            setCustomImages(updated)
            localStorage.setItem("inspoImages", JSON.stringify(updated))
          }}
          onClose={() => setShowAddForm(false)}
        />
      )}

      {showAddQuote && (
        <AddQuoteForm
          moods={allMoods}  // 💥 pass this prop
          onAdd={(q) => {
            const updated = [...customQuotes, q]
            setCustomQuotes(updated)
            localStorage.setItem("inspoQuotes", JSON.stringify(updated))
          }}
          onClose={() => setShowAddQuote(false)}
        />
      )}
      {showAddMood && (
        <AddMoodForm
          onAdd={(mood) => {
            const updated = [...customMoods, mood]
            setCustomMoods(updated)
            localStorage.setItem("customMoods", JSON.stringify(updated))
          }}
          onClose={() => setShowAddMood(false)}
        />
      )}
      {viewMode === "favorites" && (
        <>
          {/* This renders FAVORITE IMAGES */}
          <div className="px-6 py-4 text-center text-[#94a3b8]">
            <Moodboard
              selectedMood={selectedMood}
              setSelectedMood={setSelectedMood}
              customImages={customImages}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              onlyFavorites={true}
              handleDeleteImage={handleDeleteImage}
            />
          </div>

          {/* This renders FAVORITE QUOTES */}
          <div className="px-6 py-4">
            <InspirationGrid
              selectedMood={selectedMood}
              setSelectedMood={setSelectedMood}
              searchQuery={searchQuery}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              onlyFavorites={true}
              customQuotes={customQuotes}
              handleDeleteQuote={handleDeleteQuote}
            />
          </div>
        </>
      )}


    </div>
  )
}

export default App
