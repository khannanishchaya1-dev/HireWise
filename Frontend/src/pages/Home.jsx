import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import MainNavbar from "../components/MainNavbar";


export default function Home() {
  const [open, setOpen] = useState(false);
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalResumeAnalyses: 0,
    totalSkills: 0,
    averageATSScore: 0,
    bestATSScore: 0,
  });

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/features/get-stats`,
          { withCredentials: true }
        );

        if (response.data.success) {
          setStats(response.data.stats);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchDashboardStats();
  }, []);

  useEffect(() => {
    console.log("Current User:", user);

    if (user) {
      console.log("User Logged In");
    } else {
      console.log("User Not Logged In");
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      const confirmLogout = window.confirm("Are you sure you want to logout?");
      if (!confirmLogout) return;
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`, {
        withCredentials: true,
      });
      console.log(response.status);
      if (response.status === 200) {
        toast.success("Logout successful!");
        setUser(null);
        navigate("/login");
      }
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#001E2B] text-white">
      {/* Navbar */}
      <nav className="border-b border-[#1f3a47]">
        <MainNavbar
          open={open}
          setOpen={setOpen}
          user={user}
          handleLogout={handleLogout}
        />
      </nav>

      {/* Welcome Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
          Welcome Back, {user?.username} 👋
        </h2>

        <p className="text-gray-400 mt-2 text-sm sm:text-base">
          Continue your interview preparation journey.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-10">

          <div className="bg-[#112733] p-4 sm:p-6 rounded-xl border border-[#1f3a47] text-center sm:text-left">
            <h3 className="text-[#00ED64] text-2xl sm:text-3xl font-bold">
              {stats.totalResumeAnalyses}
            </h3>
            <p className="text-gray-400 mt-2 text-xs sm:text-sm">
              Total Analyses
            </p>
          </div>

          <div className="bg-[#112733] p-4 sm:p-6 rounded-xl border border-[#1f3a47] text-center sm:text-left">
            <h3 className="text-[#00ED64] text-2xl sm:text-3xl font-bold">
              {stats.averageATSScore}%
            </h3>
            <p className="text-gray-400 mt-2 text-xs sm:text-sm">
              Average ATS Score
            </p>
          </div>

          <div className="bg-[#112733] p-4 sm:p-6 rounded-xl border border-[#1f3a47] text-center sm:text-left">
            <h3 className="text-[#00ED64] text-2xl sm:text-3xl font-bold">
              {stats.bestATSScore}%
            </h3>
            <p className="text-gray-400 mt-2 text-xs sm:text-sm">
              Best ATS Score
            </p>
          </div>

          <div className="bg-[#112733] p-4 sm:p-6 rounded-xl border border-[#1f3a47] text-center sm:text-left">
            <h3 className="text-[#00ED64] text-2xl sm:text-3xl font-bold">
              {stats.totalSkills}
            </h3>
            <p className="text-gray-400 mt-2 text-xs sm:text-sm">
              Unique Skills Found
            </p>
          </div>

        </div>

        {/* Main Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-10 sm:mt-12">

          <div className="bg-[#112733] p-6 rounded-xl border border-[#1f3a47] flex flex-col hover:border-[#00ED64]/50 transition-colors">
            <h3 className="text-lg sm:text-xl font-semibold">
              Resume Analysis
            </h3>
            <p className="text-gray-400 mt-3 text-sm flex-grow">
              Upload your resume and extract skills, experience, and strengths.
            </p>
            <Link to="/resume-analysis">
              <button className="mt-4 w-full bg-[#00ED64] text-black px-4 py-2 rounded-lg font-medium hover:bg-[#00d456] transition-colors">
                Analyze Resume
              </button>
            </Link>
          </div>

          <div className="bg-[#112733] p-6 rounded-xl border border-[#1f3a47] flex flex-col hover:border-[#00ED64]/50 transition-colors">
            <h3 className="text-lg sm:text-xl font-semibold">
              Skill Gap Detection
            </h3>
            <p className="text-gray-400 mt-3 text-sm flex-grow">
              Compare your resume with job descriptions.
            </p>
            <Link to="/skill-gap">
              <button className="mt-4 w-full bg-[#00ED64] text-black px-4 py-2 rounded-lg font-medium hover:bg-[#00d456] transition-colors">
                Check Skills
              </button>
            </Link>
          </div>

          <div className="bg-[#112733] p-6 rounded-xl border border-[#1f3a47] flex flex-col hover:border-[#00ED64]/50 transition-colors">
            <h3 className="text-lg sm:text-xl font-semibold">
              AI Interview Questions
            </h3>
            <p className="text-gray-400 mt-3 text-sm flex-grow">
              Generate personalized interview questions.
            </p>
            <Link to="/interview-preparation">
              <button className="mt-4 w-full bg-[#00ED64] text-black px-4 py-2 rounded-lg font-medium hover:bg-[#00d456] transition-colors">
                Generate Questions
              </button>
            </Link>
          </div>

          <div className="bg-[#112733] p-6 rounded-xl border border-[#1f3a47] relative flex flex-col hover:border-[#00ED64]/50 transition-colors">
            <span className="absolute top-4 right-4 bg-yellow-500/20 text-yellow-400 text-xs px-3 py-1 rounded-full">
              Newly Launched
            </span>
            <h3 className="text-lg sm:text-xl font-semibold pr-24">
              ATS Resume Builder
            </h3>
            <p className="text-gray-400 mt-3 text-sm flex-grow">
              Build recruiter-friendly resumes using professional templates optimized for Applicant Tracking Systems.
            </p>
            <Link to="/form">
              <button className="mt-4 w-full bg-[#00ED64] text-black px-4 py-2 rounded-lg font-medium hover:bg-[#00d456] transition-colors">
                Build Resume
              </button>
            </Link>
          </div>

          <div className="bg-[#112733] p-6 rounded-xl border border-[#1f3a47] relative flex flex-col opacity-80">
            <span className="absolute top-4 right-4 bg-yellow-500/20 text-yellow-400 text-xs px-3 py-1 rounded-full">
              Coming Soon
            </span>
            <h3 className="text-lg sm:text-xl font-semibold pr-24">
              Mock Interviews
            </h3>
            <p className="text-gray-400 mt-3 text-sm flex-grow">
              Experience realistic interview simulations with AI-generated follow-up questions and feedback tailored to your target role.
            </p>
            <button
              disabled
              className="mt-4 w-full bg-gray-700 text-gray-400 px-4 py-2 rounded-lg cursor-not-allowed"
            >
              Upcoming Feature
            </button>
          </div>

          <div className="bg-[#112733] p-6 rounded-xl border border-[#1f3a47] relative flex flex-col opacity-80">
            <span className="absolute top-4 right-4 bg-yellow-500/20 text-yellow-400 text-xs px-3 py-1 rounded-full">
              Coming Soon
            </span>
            <h3 className="text-lg sm:text-xl font-semibold pr-24">
              Progress Tracker
            </h3>
            <p className="text-gray-400 mt-3 text-sm flex-grow">
              Monitor your interview preparation journey, track improvements in ATS scores, skill gaps, and overall readiness over time.
            </p>
            <button
              disabled
              className="mt-4 w-full bg-gray-700 text-gray-400 px-4 py-2 rounded-lg cursor-not-allowed"
            >
              Upcoming Feature
            </button>
          </div>

        </div>
      </section>
    </div>
  );
}