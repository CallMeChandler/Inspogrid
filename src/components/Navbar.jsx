import React from 'react'

const Navbar = () => {
  return (
    <nav className='w-full bg-gradient-to-r from-[#0C1727] to-[#1f2937] px-6 py-4 shadow-md '>
      <div className="flex items-center justify between gap-0">
        <img src="public/images/logo_nobg.png" alt="InspoGrid Logo" className="w-20 h-20" />
        <h1 className='text-2xl font-bold text-[#f1f5f9] tracking-wide'>
            Inspo<span className='text-[#38bdf8] drop-shadow-[0_0_4px_#38bdf8]'>Grid</span>
        </h1>
        <div className="ml-auto text-sm text-[#94a3b8] aurora-glow">#AuroraDream</div>
      </div>
    </nav>
  )
}

export default Navbar