import React from 'react'

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className='px-6 py-2'>
        <input
        type="text"
        placeholder="Search quotes or authors..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full px-4 py-2 rounded-md bg-[#1e293b] text-white placeholder-[#94a3b8] border border-[#334155] focus:outline-none focus:ring-2 focus:ring-[#38bdf8]"
      />     
    </div>
  )
}

export default SearchBar
