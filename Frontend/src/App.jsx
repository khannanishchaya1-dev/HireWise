import { useState } from 'react'
import{Route,Routes,Link} from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import Landing from './pages/Landing';
import OurTeam from './pages/OurTeam';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import ProtectedRoute from './pages/ProtectedWrapper';
import ResumeUpload from './pages/ResumeUpload';
import SkillGap from './pages/SkillGap';
import Features from './pages/Features';
import PreviousAnalyses from './pages/PreviousAnalyses';
import FindInterviewQ from './pages/FindInterviewQ';

import './App.css'


function App() {
  

  return (
    <>
     <Toaster position="top-center" reverseOrder={false} />
     <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/ourTeam' element={<OurTeam/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/home' element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />
      <Route
  path="/resume-analysis"
  element={
    <ProtectedRoute>
      <ResumeUpload />
    </ProtectedRoute>
  }
/>
<Route
  path="/skill-gap"
  element={
    <ProtectedRoute>
      <SkillGap />
    </ProtectedRoute>
  }
/>
<Route
  path="/interview-preparation"
  element={
    <ProtectedRoute>
      <FindInterviewQ />
    </ProtectedRoute>
  }
/>
<Route
  path="/features"
  element={
    
      <Features />
    
  }
/>
<Route path="/previous-analyses" element={<PreviousAnalyses/>}/>
     </Routes>
     </>
  )
}

export default App;
