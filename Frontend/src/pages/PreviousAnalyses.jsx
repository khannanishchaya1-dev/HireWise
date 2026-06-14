import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PreviousAnalyses() {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchAnalyses();
  }, []);

  const fetchAnalyses = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/features/previous-analyses`,
        { withCredentials: true }
      );

      setAnalyses(res.data.analyses || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const scoreColor = (score) => {
    if (score >= 75) return "text-[#00ED64]";
    if (score >= 50) return "text-amber-400";
    return "text-red-400";
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-[#001E2B] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#1f3a47] border-t-[#00ED64] rounded-full animate-spin" />
          <p className="text-gray-400">Loading analyses...</p>
        </div>
      </div>
    );
  }

  // Empty State
  if (analyses.length === 0) {
    return (
      <div className="min-h-screen bg-[#001E2B] text-white flex flex-col items-center justify-center px-6">
        <div className="w-16 h-16 rounded-2xl bg-[#112733] border border-[#1f3a47] flex items-center justify-center mb-5">
          <svg
            className="w-8 h-8 text-[#00ED64]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>

        <h2 className="text-3xl font-bold mb-3">No previous analyses found</h2>

        <p className="text-gray-400 mb-6 text-center max-w-md">
          Upload your first resume and get AI-powered insights.
        </p>

        <button
          onClick={() => navigate("/resume-analysis")}
          className="bg-[#00ED64] text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
        >
          Analyze resume
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#001E2B] text-white p-4 sm:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Previous analyses</h1>
            <p className="text-gray-400 mt-1 text-sm">
              {analyses.length} {analyses.length === 1 ? "report" : "reports"}{" "}
              on file
            </p>
          </div>

          <button
            onClick={() => navigate("/resume-analysis")}
            className="hidden sm:flex items-center gap-2 bg-[#00ED64] text-black px-5 py-2.5 rounded-xl font-semibold hover:scale-105 transition"
          >
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            New analysis
          </button>
        </div>

        <div className="space-y-4">
          {analyses.map((analysis) => (
            <div
              key={analysis._id}
              className="bg-[#112733] border border-[#1f3a47] p-5 sm:p-6 rounded-2xl hover:border-[#00ED64]/40 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#0D2530] border border-[#1f3a47] flex items-center justify-center text-[#00ED64] font-semibold flex-shrink-0">
                    {analysis.candidateName?.charAt(0)?.toUpperCase() || "?"}
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold">
                      {analysis.candidateName}
                    </h2>

                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="text-sm bg-[#0D2530] px-3 py-1 rounded-full text-gray-300">
                        ATS score:{" "}
                        <span
                          className={`font-semibold ${scoreColor(
                            analysis.atsScore
                          )}`}
                        >
                          {analysis.atsScore}
                        </span>
                      </span>

                      <span className="text-sm bg-[#0D2530] px-3 py-1 rounded-full text-gray-300">
                        Overall score:{" "}
                        <span
                          className={`font-semibold ${scoreColor(
                            analysis.overallScore
                          )}`}
                        >
                          {analysis.overallScore}
                        </span>
                      </span>
                    </div>

                    <p className="text-sm text-gray-500 mt-2 flex items-center gap-1.5">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {new Date(analysis.createdAt).toLocaleDateString(
                        undefined,
                        { year: "numeric", month: "short", day: "numeric" }
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 self-start md:self-center">
                  <button
                    onClick={() => {
                      setSelectedAnalysis(analysis);
                      setShowModal(true);
                    }}
                    className="bg-[#00ED64] text-black px-5 py-2 rounded-lg font-medium hover:scale-105 transition"
                  >
                    View report
                  </button>

                  <button
                    onClick={() => navigate(`/resume-builder/${analysis._id}`)}
                    className="bg-[#0D2530] border border-[#1f3a47] text-white px-5 py-2 rounded-lg font-medium hover:border-[#00ED64]/50 hover:scale-105 transition"
                  >
                    Build ATS resume
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && selectedAnalysis && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-start justify-center z-50 p-4 sm:p-6 overflow-y-auto"
          onClick={() => setShowModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#112733] w-full max-w-4xl rounded-3xl border border-[#1f3a47] p-6 sm:p-8 my-8"
          >
            <div className="flex justify-between items-center mb-2 sticky top-0 bg-[#112733] pt-2 -mt-2 pb-2">
              <h2 className="text-2xl sm:text-3xl font-bold">
                Resume analysis
              </h2>

              <button
                onClick={() => setShowModal(false)}
                className="text-2xl text-gray-400 hover:text-white transition w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10"
                aria-label="Close"
              >
                &times;
              </button>
            </div>

            <p className="text-sm text-gray-400 mb-6">
              Analyzed on{" "}
              {new Date(selectedAnalysis.createdAt).toLocaleString()}
            </p>

            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-[#00ED64]">
                {selectedAnalysis.candidateName}
              </h3>

              <p className="text-gray-400 mt-2 leading-relaxed">
                {selectedAnalysis.summary}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-[#0D2530] p-5 rounded-xl border border-[#1f3a47]">
                <h4 className="text-gray-400 text-sm mb-1">ATS score</h4>

                <p
                  className={`text-4xl font-bold ${scoreColor(
                    selectedAnalysis.atsScore
                  )}`}
                >
                  {selectedAnalysis.atsScore}
                </p>
              </div>

              <div className="bg-[#0D2530] p-5 rounded-xl border border-[#1f3a47]">
                <h4 className="text-gray-400 text-sm mb-1">Overall score</h4>

                <p
                  className={`text-4xl font-bold ${scoreColor(
                    selectedAnalysis.overallScore
                  )}`}
                >
                  {selectedAnalysis.overallScore}
                </p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3">Skills</h3>

              <div className="flex flex-wrap gap-2">
                {selectedAnalysis.skills?.map((skill) => (
                  <span
                    key={skill}
                    className="bg-[#00ED64]/10 text-[#00ED64] border border-[#00ED64]/20 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-green-400 mb-3">
                Strengths
              </h3>

              <div className="space-y-2">
                {selectedAnalysis.strengths?.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-gray-300">
                    <svg
                      className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-red-400 mb-3">
                Areas to improve
              </h3>

              <div className="space-y-2">
                {selectedAnalysis.weaknesses?.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-gray-300">
                    <svg
                      className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                      />
                    </svg>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#00ED64] mb-3">
                Recommendations
              </h3>

              <div className="space-y-2">
                {selectedAnalysis.recommendations?.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-gray-300">
                    <span className="text-[#00ED64] mt-0.5">&#8594;</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
