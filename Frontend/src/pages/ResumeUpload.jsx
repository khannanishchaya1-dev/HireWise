import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ResumeUpload() {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
const [showModal, setShowModal] = useState(false);
const navigate = useNavigate();

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resume) {
      return toast.error("Please select a resume");
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("resume", resume);

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/features/resume-analysis`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.success) {
  setAnalysisResult(response.data.analysisModel);
  setShowModal(true);

  toast.success("Resume analyzed successfully!");
}

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to analyze resume"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#001E2B] text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">

        <h1 className="text-4xl font-bold">
          Resume
          <span className="text-[#00ED64]">
            {" "}Analysis
          </span>
        </h1>

        <p className="text-gray-400 mt-3">
          Upload your resume and get AI-powered insights,
          ATS score, strengths, weaknesses and recommendations.
        </p>

        <div className="mt-10 bg-[#112733] border border-[#1f3a47] rounded-3xl p-8">

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="border-2 border-dashed border-[#00ED64]/40 rounded-2xl p-12 text-center">

              <h3 className="text-2xl font-semibold">
                Upload Resume
              </h3>

              <p className="text-gray-400 mt-3">
                PDF files only
              </p>

              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="mt-6 block w-full text-sm text-gray-300"
              />

              {resume && (
                <div className="mt-4 text-[#00ED64]">
                  Selected: {resume.name}
                </div>
              )}
            </div>

            <div className="flex gap-4">
  <button
    type="submit"
    disabled={loading}
    className="flex-1 bg-[#00ED64] text-black py-4 rounded-xl font-semibold hover:scale-[1.02] transition disabled:opacity-50"
  >
    {loading ? "Analyzing Resume..." : "Analyze Resume"}
  </button>

  <button
    type="button"
    onClick={() => navigate("/previous-analyses")}
    className="flex-1 bg-[#112733] border border-[#00ED64] text-[#00ED64] py-4 rounded-xl font-semibold hover:bg-[#00ED64]/10 transition"
  >
    Previous Analyses
  </button>
</div>
          </form>
        </div>

        {/* Features */}

        <div className="grid md:grid-cols-3 gap-5 mt-10">

          <div className="bg-[#112733] p-6 rounded-2xl border border-[#1f3a47]">
            <h3 className="font-semibold text-[#00ED64]">
              ATS Score
            </h3>

            <p className="text-gray-400 mt-2">
              Check how ATS-friendly your resume is.
            </p>
          </div>

          <div className="bg-[#112733] p-6 rounded-2xl border border-[#1f3a47]">
            <h3 className="font-semibold text-[#00ED64]">
              Skill Analysis
            </h3>

            <p className="text-gray-400 mt-2">
              Discover your strengths and weaknesses.
            </p>
          </div>

          <div className="bg-[#112733] p-6 rounded-2xl border border-[#1f3a47]">
            <h3 className="font-semibold text-[#00ED64]">
              Recommendations
            </h3>

            <p className="text-gray-400 mt-2">
              Get personalized suggestions for improvement.
            </p>
          </div>

        </div>
      </div>
      {showModal && analysisResult && (
  <div className="fixed inset-0 bg-black/70 flex items-start justify-center z-50 p-6 overflow-y-auto">
  <div className="bg-[#112733] w-full max-w-4xl rounded-3xl border border-[#1f3a47] p-8 my-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-white">
          Resume Analysis
        </h2>

        <button
          onClick={() => setShowModal(false)}
          className="text-gray-400 hover:text-white text-2xl"
        >
          ✕
        </button>
      </div>

      {/* Candidate */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-[#00ED64]">
          {analysisResult.candidateName}
        </h3>

        <p className="text-gray-400 mt-2">
          {analysisResult.summary}
        </p>
      </div>

      {/* Scores */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="bg-[#0D2530] p-5 rounded-xl">
          <h4 className="text-gray-400">ATS Score</h4>
          <p className="text-4xl font-bold text-[#00ED64]">
            {analysisResult.atsScore}
          </p>
        </div>

        <div className="bg-[#0D2530] p-5 rounded-xl">
          <h4 className="text-gray-400">
            Overall Score
          </h4>

          <p className="text-4xl font-bold text-[#00ED64]">
            {analysisResult.overallScore}
          </p>
        </div>
      </div>

      {/* Skills */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-3">
          Skills
        </h3>

        <div className="flex flex-wrap gap-2">
          {analysisResult.skills.map((skill) => (
            <span
              key={skill}
              className="bg-[#00ED64]/20 text-[#00ED64] px-3 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Strengths */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-green-400 mb-3">
          Strengths
        </h3>

        <ul className="space-y-2">
          {analysisResult.strengths.map((strength, i) => (
            <li key={i}>
              ✅ {strength}
            </li>
          ))}
        </ul>
      </div>

      {/* Weaknesses */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-red-400 mb-3">
          Areas to Improve
        </h3>

        <ul className="space-y-2">
          {analysisResult.weaknesses.map((weakness, i) => (
            <li key={i}>
              ⚠️ {weakness}
            </li>
          ))}
        </ul>
      </div>

      {/* Recommendations */}
      <div>
        <h3 className="text-xl font-semibold text-[#00ED64] mb-3">
          Recommendations
        </h3>

        <ul className="space-y-2">
          {analysisResult.recommendations.map(
            (recommendation, i) => (
              <li key={i}>
                ➜ {recommendation}
              </li>
            )
          )}
        </ul>
      </div>

    </div>
  </div>
)}
    </div>
    
  );
  
}