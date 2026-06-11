import React from 'react'
import {Link} from 'react-router-dom';

const Navbar = () => {
  return (
    <>
  
        <h1 className="text-3xl font-bold">
          Hire<span className="text-[#00ED64]">Wise</span>
        </h1>

        <div className="hidden md:flex gap-8 text-gray-300">
          <a href="#">Features</a>
          <a href="#">How It Works</a>
          <a href="#">Testimonials</a>
          <a href="#">Contact</a>
        </div>

        <button className="bg-[#00ED64] text-black px-5 py-2 rounded-lg font-semibold hover:scale-105 transition">
          <Link to="/ourTeam">
          Our Team
          </Link>
        </button>
    
      </>
  )
}

export default Navbar