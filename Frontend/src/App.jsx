import { useState } from 'react'
import{Route,Routes,Link} from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import Landing from './pages/Landing';
import OurTeam from './pages/OurTeam';
import './App.css'

function App() {
  

  return (
    <>
     <Toaster position="top-center" reverseOrder={false} />
     <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/ourteam' element={<OurTeam/>} />
     </Routes>
     </>
  )
}

export default App;
