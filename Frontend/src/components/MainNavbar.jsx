import React from 'react'
import { FaUserCircle } from "react-icons/fa";
import {Link} from "react-router-dom"
const MainNavbar = (props) => {
  return (
   <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
             <h1 className="text-2xl font-bold">
               Hire<span className="text-[#00ED64]">Wise</span>
             </h1>
   
             <div className="relative">
     <button
       onClick={() => props.setOpen(!props.open)}
       className="text-3xl text-white hover:text-[#00ED64]"
     >
       <FaUserCircle />
     </button>
   
  {props.open && (
  <div className="absolute right-0 mt-3 w-56 bg-[#112733] border border-[#1f3a47]  rounded-xl shadow-lg overflow-hidden">
    
    <div className="px-4 py-3 border-b border-[#1f3a47]  ">
      <p className="text-white font-semibold  hover:text-[#00ED64]">
        {props.user?.username}
      </p>

      <p className="text-gray-400 text-sm  hover:text-[#00ED64]">
        {props.user?.email}
      </p>
    </div>

    <Link
      to="/"
      className="block px-4 py-3 text-gray-300 hover:bg-[#0D2530] border border-[#1f3a47] hover:text-[#00ED64]"
    >
      About Us
    </Link>

    <button
      onClick={props.handleLogout}
      className="w-full text-left px-4 py-3 text-red-400 hover:bg-[#0D2530]"
    >
      Logout
    </button>

  </div>
)}
   </div>
           </div>
  )
}

export default MainNavbar