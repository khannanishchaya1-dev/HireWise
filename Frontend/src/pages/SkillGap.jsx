
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function SkillGap() {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] =
    useState("");

  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] =
    useState(false);

  const [skillGapResult, setSkillGapResult] =
    useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resume) {
      return toast.error(
        "Please upload your resume"
      );
    }

    if (!jobDescription.trim()) {
      return toast.error(
        "Please enter a job description"
      );
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("resume", resume);
      formData.append(
        "jobDescription",
        jobDescription
      );

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/features/skill-gap`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        setSkillGapResult(
          response.data.skillGapAnalysis
        );

        setShowModal(true);

        toast.success(
          "Skill Gap Analysis Completed"
        );
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to analyze"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#001E2B] text-white">
      <div className="max-w-5xl mx-auto px-6 py-12">

        <h1 className="text-4xl font-bold">
          Skill Gap
          <span className="text-[#00ED64]">
            {" "}Detection
          </span>
        </h1>

        <p className="text-gray-400 mt-3">
          Upload your resume and paste a
          job description to identify
          missing skills and improve your
          chances of getting selected.
        </p>

        <div className="mt-10 bg-[#112733] border border-[#1f3a47] rounded-3xl p-8">

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="border-2 border-dashed border-[#00ED64]/40 rounded-2xl p-10 text-center">

              <h3 className="text-2xl font-semibold">
                Upload Resume
              </h3>

              <p className="text-gray-400 mt-2">
                PDF files only
              </p>

              <input
                type="file"
                accept=".pdf"
                onChange={(e) =>
                  setResume(
                    e.target.files[0]
                  )
                }
                className="mt-5 block w-full text-sm text-gray-300"
              />

              {resume && (
                <p className="mt-3 text-[#00ED64]">
                  Selected: {resume.name}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-lg font-medium">
                Job Description
              </label>

              <textarea
                rows={10}
                value={jobDescription}
                onChange={(e) =>
                  setJobDescription(
                    e.target.value
                  )
                }
                placeholder="Paste the Job Description here..."
                className="w-full bg-[#0D2530] border border-[#1f3a47] rounded-xl p-4 text-white focus:outline-none focus:border-[#00ED64]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00ED64] text-black py-4 rounded-xl font-semibold hover:scale-[1.02] transition disabled:opacity-50"
            >
              {loading
                ? "Analyzing..."
                : "Analyze Skill Gap"}
            </button>
          </form>
        </div>
      </div>

      {showModal && skillGapResult && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">

          <div className="bg-[#112733] border border-[#1f3a47] rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-y-auto p-8">

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">
                Skill Gap Analysis
              </h2>

              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="grid md:grid-cols-4 gap-4 mb-8">

              <div className="bg-[#0D2530] p-5 rounded-xl">
                <h4>Total Skills</h4>

                <p className="text-4xl font-bold">
                  {
                    skillGapResult.totalSkillsInJD
                  }
                </p>
              </div>

              <div className="bg-[#0D2530] p-5 rounded-xl">
                <h4>Matched</h4>

                <p className="text-4xl font-bold text-green-400">
                  {
                    skillGapResult.matchedSkillsCount
                  }
                </p>
              </div>

              <div className="bg-[#0D2530] p-5 rounded-xl">
                <h4>Missing</h4>

                <p className="text-4xl font-bold text-red-400">
                  {
                    skillGapResult.missingSkillsCount
                  }
                </p>
              </div>

              <div className="bg-[#0D2530] p-5 rounded-xl">
                <h4>Match Score</h4>

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
                {skillGapResult.matchedSkills.map(
                  (skill) => (
                    <span
                      key={skill}
                      className="bg-green-500/20 px-3 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-red-400 mb-3">
                Missing Skills
              </h3>

              <div className="flex flex-wrap gap-2">
                {skillGapResult.missingSkills.map(
                  (skill) => (
                    <span
                      key={skill}
                      className="bg-red-500/20 px-3 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#00ED64] mb-3">
                Recommendations
              </h3>

              <ul className="space-y-2">
                {skillGapResult.recommendations.map(
                  (item, index) => (
                    <li key={index}>
                      ➜ {item}
                    </li>
                  )
                )}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#00ED64] mb-3">
                Learning Roadmap
              </h3>

              <ol className="space-y-2">
                {skillGapResult.learningRoadmap.map(
                  (item, index) => (
                    <li key={index}>
                      {index + 1}. {item}
                    </li>
                  )
                )}
              </ol>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
