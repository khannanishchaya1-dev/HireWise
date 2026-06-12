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

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-[#001E2B] flex items-center justify-center text-white">
        Loading analyses...
      </div>
    );
  }

  // Empty State
  if (analyses.length === 0) {
    return (
      <div className="min-h-screen bg-[#001E2B] text-white flex flex-col items-center justify-center px-6">
        <h2 className="text-3xl font-bold mb-3">
          No Previous Analyses Found
        </h2>

        <p className="text-gray-400 mb-6 text-center">
          Upload your first resume and get AI-powered insights.
        </p>

        <button
          onClick={() => navigate("/resume-analysis")}
          className="bg-[#00ED64] text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
        >
          Analyze Resume
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#001E2B] text-white p-8">
      <h1 className="text-3xl font-bold mb-6">
        Previous Analyses
      </h1>

      <div className="space-y-4">
        {analyses.map((analysis) => (
          <div
            key={analysis._id}
            className="bg-[#112733] p-5 rounded-xl"
          >
           <div
  key={analysis._id}
  className="bg-[#112733] p-5 rounded-xl flex flex-col md:flex-row md:items-center md:justify-between gap-4"
>
  <div>
    <h2 className="text-xl font-semibold">
      {analysis.candidateName}
    </h2>

    <p className="text-gray-400">
      ATS Score: {analysis.atsScore}
    </p>

    <p className="text-gray-400">
      Overall Score: {analysis.overallScore}
    </p>

    <p className="text-sm text-gray-500 mt-2">
      {new Date(analysis.createdAt).toLocaleDateString()}
    </p>
  </div>

  <button
    onClick={() => {
      setSelectedAnalysis(analysis);
      setShowModal(true);
    }}
    className="bg-[#00ED64] text-black px-5 py-2 rounded-lg font-medium hover:scale-105 transition self-start md:self-center"
  >
    View Report
  </button>
</div>
          </div>
        ))}
      </div>
      {showModal && selectedAnalysis && (
  <div className="fixed inset-0 bg-black/70 flex items-start justify-center z-50 p-6 overflow-y-auto">
  <div className="bg-[#112733] w-full max-w-4xl rounded-3xl border border-[#1f3a47] p-8 my-8">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">
          Resume Analysis
        </h2>

        <button
          onClick={() => setShowModal(false)}
          className="text-2xl text-gray-400"
        >
          ✕
        </button>
      </div>
<p className="text-sm text-gray-400">
  Analyzed on{" "}
  {new Date(selectedAnalysis.createdAt).toLocaleString()}
</p>
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-[#00ED64]">
          {selectedAnalysis.candidateName}
        </h3>

        <p className="text-gray-400 mt-2">
          {selectedAnalysis.summary}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="bg-[#0D2530] p-5 rounded-xl">
          <h4 className="text-gray-400">
            ATS Score
          </h4>

          <p className="text-4xl font-bold text-[#00ED64]">
            {selectedAnalysis.atsScore}
          </p>
        </div>

        <div className="bg-[#0D2530] p-5 rounded-xl">
          <h4 className="text-gray-400">
            Overall Score
          </h4>

          <p className="text-4xl font-bold text-[#00ED64]">
            {selectedAnalysis.overallScore}
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-3">
          Skills
        </h3>

        <div className="flex flex-wrap gap-2">
          {selectedAnalysis.skills?.map((skill) => (
            <span
              key={skill}
              className="bg-[#00ED64]/20 text-[#00ED64] px-3 py-1 rounded-full"
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

        {selectedAnalysis.strengths?.map((item, i) => (
          <p key={i}>✅ {item}</p>
        ))}
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-red-400 mb-3">
          Areas to Improve
        </h3>

        {selectedAnalysis.weaknesses?.map((item, i) => (
          <p key={i}>⚠️ {item}</p>
        ))}
      </div>

      <div>
        <h3 className="text-xl font-semibold text-[#00ED64] mb-3">
          Recommendations
        </h3>

        {selectedAnalysis.recommendations?.map((item, i) => (
          <p key={i}>➜ {item}</p>
        ))}
      </div>

    </div>
  </div>
)}
    </div>
  );
}