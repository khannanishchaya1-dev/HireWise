import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function InterviewPrep() {
  const [resume, setResume] = useState(null);

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
      data.append(
        "difficulty",
        formData.difficulty
      );
      data.append(
        "interviewType",
        formData.interviewType
      );
      data.append(
        "companyType",
        formData.companyType
      );

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/features/interview-questions`,
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        setResult(response.data.result);
        setShowModal(true);

        toast.success(
          "Interview Questions Generated"
        );
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
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
            <span className="text-[#00ED64]">
              {" "}Simulator
            </span>
          </h1>

          <p className="text-gray-400 mt-4">
            Prepare like it's interview day.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Form */}

          <div className="lg:col-span-2 bg-[#112733] border border-[#1f3a47] rounded-3xl p-8">

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              <div>
                <label className="block mb-2">
                  Upload Resume
                </label>

                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) =>
                    setResume(
                      e.target.files[0]
                    )
                  }
                  className="w-full"
                />
              </div>

              <div>
                <label className="block mb-2">
                  Target Role
                </label>

                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="Frontend Developer"
                  className="w-full bg-[#0D2530] border border-[#1f3a47] rounded-xl p-3"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">

                <div>
                  <label className="block mb-2">
                    Difficulty
                  </label>

                  <select
                    name="difficulty"
                    value={
                      formData.difficulty
                    }
                    onChange={handleChange}
                    className="w-full bg-[#0D2530] border border-[#1f3a47] rounded-xl p-3"
                  >
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2">
                    Interview Type
                  </label>

                  <select
                    name="interviewType"
                    value={
                      formData.interviewType
                    }
                    onChange={handleChange}
                    className="w-full bg-[#0D2530] border border-[#1f3a47] rounded-xl p-3"
                  >
                    <option>Technical</option>
                    <option>HR</option>
                    <option>Mixed</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2">
                    Company Type
                  </label>

                  <select
                    name="companyType"
                    value={
                      formData.companyType
                    }
                    onChange={handleChange}
                    className="w-full bg-[#0D2530] border border-[#1f3a47] rounded-xl p-3"
                  >
                    <option>
                      Product Based
                    </option>
                    <option>Startup</option>
                    <option>
                      Service Based
                    </option>
                  </select>
                </div>

              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#00ED64] text-black py-4 rounded-xl font-semibold"
              >
                {loading
                  ? "Generating..."
                  : "🚀 Begin Mock Interview"}
              </button>

            </form>
          </div>

          {/* Preview */}

          <div className="bg-[#112733] border border-[#1f3a47] rounded-3xl p-6 h-fit">

            <h3 className="text-xl font-semibold text-[#00ED64]">
              Interview Setup
            </h3>

            <div className="mt-6 space-y-4">

              <div>
                <p className="text-gray-400">
                  Role
                </p>

                <p>{formData.role || "-"}</p>
              </div>

              <div>
                <p className="text-gray-400">
                  Difficulty
                </p>

                <p>
                  {formData.difficulty}
                </p>
              </div>

              <div>
                <p className="text-gray-400">
                  Interview
                </p>

                <p>
                  {
                    formData.interviewType
                  }
                </p>
              </div>

              <div>
                <p className="text-gray-400">
                  Company
                </p>

                <p>
                  {formData.companyType}
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Result Modal */}

      {showModal && result && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4">

          <div className="bg-[#112733] rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-y-auto p-8">

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">
                Interview Questions
              </h2>

              <button
                onClick={() =>
                  setShowModal(false)
                }
              >
                ✕
              </button>
            </div>

            <div className="space-y-8">

              <QuestionSection
                title="Technical Questions"
                questions={
                  result.technicalQuestions
                }
              />

              <QuestionSection
                title="Project Questions"
                questions={
                  result.projectQuestions
                }
              />

              <QuestionSection
                title="Behavioral Questions"
                questions={
                  result.behavioralQuestions
                }
              />

              <QuestionSection
                title="HR Questions"
                questions={
                  result.hrQuestions
                }
              />

            </div>

          </div>
        </div>
      )}
    </div>
  );
}

function QuestionSection({
  title,
  questions,
}) {
  if (!questions?.length) return null;

  return (
    <div>
      <h3 className="text-xl font-semibold text-[#00ED64] mb-3">
        {title}
      </h3>

      <ul className="space-y-2">
        {questions.map((q, i) => (
          <li key={i}>
            {i + 1}. {q}
          </li>
        ))}
      </ul>
    </div>
  );
}

