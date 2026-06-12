
import React from "react";
import {
  ArrowRight,
  CheckCircle,
  FileText,
  Brain,
  Sparkles,
} from "lucide-react";
import Navbar from "../components/Navbar";
import {Link} from 'react-router-dom';
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";


const Landing = () => {
const { user, setUser } = useUser();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#001E2B] text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-green-500/20 blur-[120px]" />
      <div className="absolute bottom-20 right-10 h-72 w-72 rounded-full bg-emerald-400/20 blur-[120px]" />

      {/* Navbar */}
       <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
         <Navbar />
       </nav>
     

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 border border-green-500/20 bg-green-500/10 px-4 py-2 rounded-full text-sm text-[#00ED64]">
              <Sparkles size={16} />
              AI Powered Interview Preparation
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mt-8 leading-tight">
              Crack Interviews
              <span className="block text-[#00ED64]">
                With AI Assistance
              </span>
            </h1>

            <p className="mt-6 text-lg text-gray-400 max-w-xl">
              Upload your resume, analyze job descriptions, identify
              skill gaps, generate AI interview questions and build
              ATS-optimized resumes.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
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

              <button className="border border-gray-700 px-6 py-3 rounded-xl hover:bg-white/5">
                Watch Demo
              </button>
            </div>

            <div className="grid grid-cols-2 gap-5 mt-12">
              <div className="flex items-center gap-2">
                <CheckCircle
                  className="text-[#00ED64]"
                  size={18}
                />
                <span>Resume Analysis</span>
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle
                  className="text-[#00ED64]"
                  size={18}
                />
                <span>Skill Gap Detection</span>
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle
                  className="text-[#00ED64]"
                  size={18}
                />
                <span>AI Questions</span>
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle
                  className="text-[#00ED64]"
                  size={18}
                />
                <span>ATS Resume Builder</span>
              </div>
            </div>
          </div>

          {/* Dashboard Card */}
          <div className="relative">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-semibold">
                  Candidate Analysis
                </h3>

                <span className="bg-green-500/20 text-[#00ED64] px-3 py-1 rounded-full text-sm">
                  Match Score 92%
                </span>
              </div>

              <div className="space-y-5">
                <div className="bg-[#0C2A36] p-5 rounded-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <FileText className="text-[#00ED64]" />
                    Resume Analysis
                  </div>

                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div className="bg-[#00ED64] h-3 rounded-full w-[92%]" />
                  </div>
                </div>

                <div className="bg-[#0C2A36] p-5 rounded-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <Brain className="text-[#00ED64]" />
                    Skill Matching
                  </div>

                  <div className="space-y-2">
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

                <div className="bg-[#0C2A36] p-5 rounded-xl">
                  <h4 className="font-semibold mb-4">
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
      <section className="max-w-7xl mx-auto px-8 pb-24">
        <div className="grid md:grid-cols-4 gap-6">
          {[
            ["10K+", "Questions Generated"],
            ["95%", "Resume Accuracy"],
            ["85%", "Faster Preparation"],
            ["100%", "ATS Compatible"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center"
            >
              <h3 className="text-4xl font-bold text-[#00ED64]">
                {value}
              </h3>

              <p className="text-gray-400 mt-2">{label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Landing