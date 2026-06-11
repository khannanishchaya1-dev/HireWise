import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import { useEffect } from "react";


export default function Home() {
  const [open, setOpen] = useState(false);
  const { user, setUser } = useUser();
  const navigate = useNavigate();


  useEffect(() => {
    console.log("Current User:", user);

    if (user) {
      console.log("User Logged In");
    } else {
      console.log("User Not Logged In");
    }
  }, [user]);
  const handleLogout=async ()=>{
    try{
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,{
      withCredentials:true
    });
    if(response.status === 200){
    
    setUser(null);
    navigate("/login");
    }
  }catch(error){
    console.log(error.response?.data?.message);
  }
  }
  return (
    <div className="min-h-screen bg-[#001E2B] text-white">
      {/* Navbar */}
      <nav className="border-b border-[#1f3a47]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            Hire<span className="text-[#00ED64]">Wise</span>
          </h1>

          <div className="relative">
  <button
    onClick={() => setOpen(!open)}
    className="text-3xl text-white hover:text-[#00ED64]"
  >
    <FaUserCircle />
  </button>

  {open && (
    <div className="absolute right-0 mt-3 w-56 bg-[#112733] border border-[#1f3a47] rounded-xl shadow-lg overflow-hidden">
      <div className="px-4 py-3 border-b border-[#1f3a47]">
        <p className="text-white font-semibold">
          {user?.username}
        </p>

        <p className="text-gray-400 text-sm">
          {user?.email}
        </p>
      </div>

      <button
        onClick={handleLogout}
        className="w-full text-left px-4 py-3 text-red-400 hover:bg-[#0D2530]"
      >
        Logout
      </button>
    </div>
  )}
</div>
        </div>
      </nav>

      {/* Welcome Section */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-4xl font-bold">
          Welcome Back 👋
        </h2>

        <p className="text-gray-400 mt-2">
          Continue your interview preparation journey.
        </p>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mt-10">
          <div className="bg-[#112733] p-6 rounded-xl border border-[#1f3a47]">
            <h3 className="text-[#00ED64] text-3xl font-bold">
              12
            </h3>
            <p className="text-gray-400 mt-2">
              Resumes Analyzed
            </p>
          </div>

          <div className="bg-[#112733] p-6 rounded-xl border border-[#1f3a47]">
            <h3 className="text-[#00ED64] text-3xl font-bold">
              45
            </h3>
            <p className="text-gray-400 mt-2">
              Interview Questions
            </p>
          </div>

          <div className="bg-[#112733] p-6 rounded-xl border border-[#1f3a47]">
            <h3 className="text-[#00ED64] text-3xl font-bold">
              8
            </h3>
            <p className="text-gray-400 mt-2">
              Skill Gaps Found
            </p>
          </div>

          <div className="bg-[#112733] p-6 rounded-xl border border-[#1f3a47]">
            <h3 className="text-[#00ED64] text-3xl font-bold">
              92%
            </h3>
            <p className="text-gray-400 mt-2">
              Resume Match Score
            </p>
          </div>
        </div>

        {/* Main Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          <div className="bg-[#112733] p-6 rounded-xl border border-[#1f3a47]">
            <h3 className="text-xl font-semibold">
              Resume Analysis
            </h3>

            <p className="text-gray-400 mt-3">
              Upload your resume and extract skills,
              experience, and strengths.
            </p>

            <button className="mt-4 bg-[#00ED64] text-black px-4 py-2 rounded-lg">
              Analyze Resume
            </button>
          </div>

          <div className="bg-[#112733] p-6 rounded-xl border border-[#1f3a47]">
            <h3 className="text-xl font-semibold">
              Skill Gap Detection
            </h3>

            <p className="text-gray-400 mt-3">
              Compare your resume with job descriptions.
            </p>

            <button className="mt-4 bg-[#00ED64] text-black px-4 py-2 rounded-lg">
              Check Skills
            </button>
          </div>

          <div className="bg-[#112733] p-6 rounded-xl border border-[#1f3a47]">
            <h3 className="text-xl font-semibold">
              AI Interview Questions
            </h3>

            <p className="text-gray-400 mt-3">
              Generate personalized interview questions.
            </p>

            <button className="mt-4 bg-[#00ED64] text-black px-4 py-2 rounded-lg">
              Generate Questions
            </button>
          </div>

          <div className="bg-[#112733] p-6 rounded-xl border border-[#1f3a47]">
            <h3 className="text-xl font-semibold">
              ATS Resume Builder
            </h3>

            <p className="text-gray-400 mt-3">
              Create ATS-friendly resumes instantly.
            </p>

            <button className="mt-4 bg-[#00ED64] text-black px-4 py-2 rounded-lg">
              Build Resume
            </button>
          </div>

          <div className="bg-[#112733] p-6 rounded-xl border border-[#1f3a47]">
            <h3 className="text-xl font-semibold">
              Mock Interviews
            </h3>

            <p className="text-gray-400 mt-3">
              Practice interview rounds with AI.
            </p>

            <button className="mt-4 bg-[#00ED64] text-black px-4 py-2 rounded-lg">
              Start Interview
            </button>
          </div>

          <div className="bg-[#112733] p-6 rounded-xl border border-[#1f3a47]">
            <h3 className="text-xl font-semibold">
              Progress Tracker
            </h3>

            <p className="text-gray-400 mt-3">
              Monitor your preparation progress.
            </p>

            <button className="mt-4 bg-[#00ED64] text-black px-4 py-2 rounded-lg">
              View Progress
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}