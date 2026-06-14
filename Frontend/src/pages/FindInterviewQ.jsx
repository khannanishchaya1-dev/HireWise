import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const DIFFICULTY_OPTIONS = ["Easy", "Medium", "Hard"];
const INTERVIEW_TYPE_OPTIONS = ["Technical", "HR", "Mixed"];
const COMPANY_TYPE_OPTIONS = ["Product Based", "Startup", "Service Based"];

export default function InterviewPrep() {
  const [resume, setResume] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const [formData, setFormData] = useState({
    role: "",
    difficulty: "Medium",
    interviewType: "Mixed",
    companyType: "Product Based",
  });

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

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
      return toast.error("Please upload a resume");
    }

    if (!formData.role.trim()) {
      return toast.error("Please enter target role");
    }

    try {
      setLoading(true);

      const data = new FormData();
      data.append("resume", resume);
      data.append("role", formData.role);
      data.append("difficulty", formData.difficulty);
      data.append("interviewType", formData.interviewType);
      data.append("companyType", formData.companyType);

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/features/interview-questions`,
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        setResult(response.data.result);
        setShowModal(true);
        toast.success("Interview questions generated");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#001E2B] text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold">
            AI Interview
            <span className="text-[#00ED64]"> Simulator</span>
          </h1>

          <p className="text-gray-400 mt-4">
            Prepare like it's interview day.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 bg-[#112733] border border-[#1f3a47] rounded-3xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">
                  Upload resume
                </label>

                <label
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragActive(true);
                  }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={handleDrop}
                  className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-colors ${
                    dragActive
                      ? "border-[#00ED64] bg-[#00ED64]/5"
                      : "border-[#00ED64]/40 hover:border-[#00ED64]/70"
                  }`}
                >
                  <svg
                    className="w-9 h-9 text-[#00ED64] mb-2"
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

                  <p className="text-gray-400 text-sm">
                    PDF files only &middot; drag &amp; drop or click to browse
                  </p>

                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileChange(e.target.files[0])}
                    className="hidden"
                  />

                  {resume && (
                    <p className="mt-3 inline-flex items-center gap-2 bg-[#00ED64]/10 text-[#00ED64] px-4 py-1.5 rounded-full text-sm">
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
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">
                  Target role
                </label>

                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="Frontend Developer"
                  className="w-full bg-[#0D2530] border border-[#1f3a47] rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00ED64]/50 focus:border-[#00ED64] transition"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-300">
                    Difficulty
                  </label>

                  <select
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
                    className="w-full bg-[#0D2530] border border-[#1f3a47] rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#00ED64]/50 focus:border-[#00ED64] transition appearance-none cursor-pointer"
                  >
                    {DIFFICULTY_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-300">
                    Interview type
                  </label>

                  <select
                    name="interviewType"
                    value={formData.interviewType}
                    onChange={handleChange}
                    className="w-full bg-[#0D2530] border border-[#1f3a47] rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#00ED64]/50 focus:border-[#00ED64] transition appearance-none cursor-pointer"
                  >
                    {INTERVIEW_TYPE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-300">
                    Company type
                  </label>

                  <select
                    name="companyType"
                    value={formData.companyType}
                    onChange={handleChange}
                    className="w-full bg-[#0D2530] border border-[#1f3a47] rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#00ED64]/50 focus:border-[#00ED64] transition appearance-none cursor-pointer"
                  >
                    {COMPANY_TYPE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
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
                    Generating...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    Begin mock interview
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Preview */}
          <div className="bg-[#112733] border border-[#1f3a47] rounded-3xl p-6 h-fit sticky top-6">
            <h3 className="text-xl font-semibold text-[#00ED64]">
              Interview setup
            </h3>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between border-b border-[#1f3a47] pb-3">
                <p className="text-gray-400 text-sm">Role</p>
                <p className="font-medium text-right truncate max-w-[60%]">
                  {formData.role || "-"}
                </p>
              </div>

              <div className="flex items-center justify-between border-b border-[#1f3a47] pb-3">
                <p className="text-gray-400 text-sm">Difficulty</p>
                <span className="text-sm bg-[#0D2530] px-3 py-1 rounded-full text-[#00ED64] font-medium">
                  {formData.difficulty}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-[#1f3a47] pb-3">
                <p className="text-gray-400 text-sm">Interview</p>
                <span className="text-sm bg-[#0D2530] px-3 py-1 rounded-full text-[#00ED64] font-medium">
                  {formData.interviewType}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-gray-400 text-sm">Company</p>
                <span className="text-sm bg-[#0D2530] px-3 py-1 rounded-full text-[#00ED64] font-medium text-right">
                  {formData.companyType}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Result Modal */}
      {showModal && result && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#112733] border border-[#1f3a47] rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-y-auto p-8"
          >
            <div className="flex justify-between items-center mb-6 sticky top-0 bg-[#112733] -mt-2 pt-2 pb-4">
              <h2 className="text-3xl font-bold">Interview questions</h2>

              <button
                onClick={() => setShowModal(false)}
                aria-label="Close"
                className="text-2xl text-gray-400 hover:text-white transition w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10"
              >
                &times;
              </button>
            </div>

            <div className="space-y-8">
              <QuestionSection
                title="Technical questions"
                questions={result.technicalQuestions}
              />

              <QuestionSection
                title="Project questions"
                questions={result.projectQuestions}
              />

              <QuestionSection
                title="Behavioral questions"
                questions={result.behavioralQuestions}
              />

              <QuestionSection
                title="HR questions"
                questions={result.hrQuestions}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function QuestionSection({ title, questions }) {
  if (!questions?.length) return null;

  return (
    <div>
      <h3 className="text-xl font-semibold text-[#00ED64] mb-3">{title}</h3>

      <ol className="space-y-3">
        {questions.map((q, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00ED64]/10 text-[#00ED64] text-sm font-semibold flex items-center justify-center mt-0.5">
              {i + 1}
            </span>
            <span className="text-gray-200 leading-relaxed">{q}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}