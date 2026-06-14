import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function SkillGap() {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [skillGapResult, setSkillGapResult] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (file) => {
    if (file && file.type !== "application/pdf") {
      return toast.error("Only PDF files are allowed");
    }
    setResume(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    handleFileChange(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resume) {
      return toast.error("Please upload your resume");
    }

    if (!jobDescription.trim()) {
      return toast.error("Please enter a job description");
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("resume", resume);
      formData.append("jobDescription", jobDescription);

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/features/skill-gap`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        setSkillGapResult(response.data.skillGapAnalysis);
        setShowModal(true);
        toast.success("Skill gap analysis completed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to analyze");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#001E2B] text-white">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold">
          Skill Gap
          <span className="text-[#00ED64]"> Detection</span>
        </h1>

        <p className="text-gray-400 mt-3 max-w-xl">
          Upload your resume and paste a job description to identify missing
          skills and improve your chances of getting selected.
        </p>

        <div className="mt-10 bg-[#112733] border border-[#1f3a47] rounded-3xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <label
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-colors ${
                dragActive
                  ? "border-[#00ED64] bg-[#00ED64]/5"
                  : "border-[#00ED64]/40 hover:border-[#00ED64]/70"
              }`}
            >
              <svg
                className="w-10 h-10 text-[#00ED64] mb-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 7.5 7.5 12M12 7.5v9"
                />
              </svg>

              <h3 className="text-2xl font-semibold">Upload Resume</h3>
              <p className="text-gray-400 mt-2">
                PDF files only &middot; drag &amp; drop or click to browse
              </p>

              <input
                type="file"
                accept=".pdf"
                onChange={(e) => handleFileChange(e.target.files[0])}
                className="hidden"
              />

              {resume && (
                <p className="mt-4 inline-flex items-center gap-2 bg-[#00ED64]/10 text-[#00ED64] px-4 py-1.5 rounded-full text-sm">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {resume.name}
                </p>
              )}
            </label>

            <div>
              <label className="block mb-2 text-lg font-medium">
                Job Description
              </label>

              <textarea
                rows={10}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here..."
                className="w-full bg-[#0D2530] border border-[#1f3a47] rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00ED64]/50 focus:border-[#00ED64] transition resize-none"
              />
              <p className="mt-2 text-xs text-gray-500 text-right">
                {jobDescription.length} characters
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00ED64] text-black py-4 rounded-xl font-semibold transition hover:scale-[1.02] hover:shadow-lg hover:shadow-[#00ED64]/20 disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  Analyzing...
                </>
              ) : (
                "Analyze Skill Gap"
              )}
            </button>
          </form>
        </div>
      </div>

      {showModal && skillGapResult && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#112733] border border-[#1f3a47] rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-y-auto p-8"
          >
            <div className="flex justify-between items-center mb-6 sticky top-0 bg-[#112733] pb-4 -mt-2 pt-2">
              <h2 className="text-3xl font-bold">Skill Gap Analysis</h2>

              <button
                onClick={() => setShowModal(false)}
                aria-label="Close"
                className="text-2xl text-gray-400 hover:text-white transition w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10"
              >
                &times;
              </button>
            </div>

            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <div className="bg-[#0D2530] p-5 rounded-xl border border-[#1f3a47]">
                <h4 className="text-gray-400 text-sm mb-1">Total Skills</h4>
                <p className="text-4xl font-bold">
                  {skillGapResult.totalSkillsInJD}
                </p>
              </div>

              <div className="bg-[#0D2530] p-5 rounded-xl border border-[#1f3a47]">
                <h4 className="text-gray-400 text-sm mb-1">Matched</h4>
                <p className="text-4xl font-bold text-green-400">
                  {skillGapResult.matchedSkillsCount}
                </p>
              </div>

              <div className="bg-[#0D2530] p-5 rounded-xl border border-[#1f3a47]">
                <h4 className="text-gray-400 text-sm mb-1">Missing</h4>
                <p className="text-4xl font-bold text-red-400">
                  {skillGapResult.missingSkillsCount}
                </p>
              </div>

              <div className="bg-[#0D2530] p-5 rounded-xl border border-[#1f3a47]">
                <h4 className="text-gray-400 text-sm mb-1">Match Score</h4>
                <p className="text-4xl font-bold text-[#00ED64]">
                  {skillGapResult.matchScore}%
                </p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-green-400 mb-3">
                Matched Skills
              </h3>

              <div className="flex flex-wrap gap-2">
                {skillGapResult.matchedSkills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-green-500/10 text-green-300 border border-green-500/20 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-red-400 mb-3">
                Missing Skills
              </h3>

              <div className="flex flex-wrap gap-2">
                {skillGapResult.missingSkills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-red-500/10 text-red-300 border border-red-500/20 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#00ED64] mb-3">
                Recommendations
              </h3>

              <ul className="space-y-2">
                {skillGapResult.recommendations.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-gray-200"
                  >
                    <span className="text-[#00ED64] mt-0.5">&#8594;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#00ED64] mb-3">
                Learning Roadmap
              </h3>

              <ol className="space-y-3">
                {skillGapResult.learningRoadmap.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00ED64]/10 text-[#00ED64] text-sm font-semibold flex items-center justify-center">
                      {index + 1}
                    </span>
                    <span className="text-gray-200">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
