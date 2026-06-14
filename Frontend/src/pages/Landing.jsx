import React from "react";
import {
  ArrowRight,
  CheckCircle,
  FileText,
  Brain,
  Sparkles,
} from "lucide-react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";


const Landing = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#001E2B] text-white overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-green-500/20 blur-[120px]" />
      <div className="absolute bottom-20 right-10 h-72 w-72 rounded-full bg-emerald-400/20 blur-[120px]" />

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-4 sm:px-8 py-6 max-w-7xl mx-auto">
        <Navbar />
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 border border-green-500/20 bg-green-500/10 px-4 py-2 rounded-full text-xs sm:text-sm text-[#00ED64]">
              <Sparkles size={16} />
              AI Powered Interview Preparation
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mt-6 sm:mt-8 leading-tight">
              Crack Interviews
              <span className="block text-[#00ED64]">
                With AI Assistance
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-gray-400 max-w-xl mx-auto lg:mx-0">
              Upload your resume, analyze job descriptions, identify
              skill gaps, generate AI interview questions and build
              ATS-optimized resumes.
            </p>

            <div className="flex flex-wrap gap-4 mt-8 sm:mt-10 justify-center lg:justify-start">
              {user ? (
                <Link to="/home">
                  <button className="flex items-center gap-2 bg-[#00ED64] text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition">
                    Go To Home
                    <ArrowRight size={18} />
                  </button>
                </Link>
              ) : (
                <Link to="/register">
                  <button className="flex items-center gap-2 bg-[#00ED64] text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition">
                    Start Free
                    <ArrowRight size={18} />
                  </button>
                </Link>
              )}

              <button className="border border-gray-700 px-6 py-3 rounded-xl hover:bg-white/5 transition">
                Watch Demo
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mt-10 sm:mt-12 max-w-md mx-auto lg:mx-0">
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <CheckCircle className="text-[#00ED64]" size={18} />
                <span className="text-sm sm:text-base">Resume Analysis</span>
              </div>

              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <CheckCircle className="text-[#00ED64]" size={18} />
                <span className="text-sm sm:text-base">Skill Gap Detection</span>
              </div>

              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <CheckCircle className="text-[#00ED64]" size={18} />
                <span className="text-sm sm:text-base">AI Questions</span>
              </div>

              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <CheckCircle className="text-[#00ED64]" size={18} />
                <span className="text-sm sm:text-base">ATS Resume Builder</span>
              </div>
            </div>
          </div>

          {/* Dashboard Card */}
          <div className="relative">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 sm:p-8 shadow-2xl">
              <div className="flex flex-wrap justify-between items-center gap-3 mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-semibold">
                  Candidate Analysis
                </h3>

                <span className="bg-green-500/20 text-[#00ED64] px-3 py-1 rounded-full text-xs sm:text-sm whitespace-nowrap">
                  Match Score 92%
                </span>
              </div>

              <div className="space-y-4 sm:space-y-5">
                <div className="bg-[#0C2A36] p-4 sm:p-5 rounded-xl">
                  <div className="flex items-center gap-3 mb-3 text-sm sm:text-base">
                    <FileText className="text-[#00ED64]" size={20} />
                    Resume Analysis
                  </div>

                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div className="bg-[#00ED64] h-3 rounded-full w-[92%]" />
                  </div>
                </div>

                <div className="bg-[#0C2A36] p-4 sm:p-5 rounded-xl">
                  <div className="flex items-center gap-3 mb-3 text-sm sm:text-base">
                    <Brain className="text-[#00ED64]" size={20} />
                    Skill Matching
                  </div>

                  <div className="space-y-2 text-sm sm:text-base">
                    <div className="flex justify-between">
                      <span>React</span>
                      <span className="text-[#00ED64]">✓</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Node.js</span>
                      <span className="text-[#00ED64]">✓</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Docker</span>
                      <span className="text-red-400">Missing</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Redis</span>
                      <span className="text-red-400">Missing</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0C2A36] p-4 sm:p-5 rounded-xl">
                  <h4 className="font-semibold mb-4 text-sm sm:text-base">
                    Interview Readiness
                  </h4>

                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div className="bg-[#00ED64] h-3 rounded-full w-[84%]" />
                  </div>

                  <p className="mt-3 text-sm text-gray-400">
                    AI generated 25 interview questions based on
                    your target role.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pb-16 sm:pb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[
            ["10K+", "Questions Generated"],
            ["95%", "Resume Accuracy"],
            ["85%", "Faster Preparation"],
            ["100%", "ATS Compatible"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-8 text-center hover:bg-white/10 transition"
            >
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#00ED64]">
                {value}
              </h3>

              <p className="text-gray-400 mt-2 text-xs sm:text-sm md:text-base">{label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Landing;