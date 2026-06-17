import { useLocation, useNavigate } from "react-router-dom";

export default function TemplateSelection() {
  const navigate = useNavigate();
  const { state: formData } = useLocation();

  const chooseATS = () => {
    navigate("/resume/ats-template", {
      state: formData,
    });
  };

  const chooseModern = () => {
    navigate("/resume/modern-template", {
      state: formData,
    });
  };

  return (
    <div className="min-h-screen bg-[#001E2B] text-white px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center">
          Choose your
          <span className="text-[#00ED64]"> resume template</span>
        </h1>

        <p className="text-center text-gray-400 mt-3 max-w-xl mx-auto">
          Select a professional template and generate your ATS-friendly
          resume.
        </p>

        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 mt-12">
          {/* ATS TEMPLATE */}
          <div className="bg-[#112733] border border-[#1f3a47] rounded-2xl p-5 sm:p-6 hover:border-[#00ED64] transition flex flex-col">
            <div className="bg-white rounded-lg p-4 text-black h-[260px] sm:h-[350px] overflow-hidden">
              <h2 className="font-bold text-lg sm:text-xl">JOHN DOE</h2>

              <p className="text-xs sm:text-sm mt-1 text-gray-600">
                Email | Phone | LinkedIn | GitHub
              </p>

              <hr className="my-3 border-gray-300" />

              <h3 className="font-bold text-sm sm:text-base">SUMMARY</h3>
              <p className="text-[11px] sm:text-xs mt-1 text-gray-600">
                Professional summary...
              </p>

              <h3 className="font-bold text-sm sm:text-base mt-3">SKILLS</h3>
              <p className="text-[11px] sm:text-xs text-gray-600">
                React &bull; Node &bull; MongoDB
              </p>

              <h3 className="font-bold text-sm sm:text-base mt-3">
                PROJECTS
              </h3>
              <p className="text-[11px] sm:text-xs text-gray-600">
                Project details...
              </p>

              <h3 className="font-bold text-sm sm:text-base mt-3">
                EDUCATION
              </h3>
              <p className="text-[11px] sm:text-xs text-gray-600">
                Degree details...
              </p>
            </div>

            <h2 className="text-xl sm:text-2xl font-semibold mt-6">
              ATS Professional
            </h2>

            <p className="text-gray-400 mt-3 text-sm sm:text-base flex-1">
              Optimized for ATS systems and recruiter screening. Best for
              software engineering, internships, and fresher roles.
            </p>

            <button
              onClick={chooseATS}
              className="mt-6 w-full bg-[#00ED64] text-black py-3 rounded-xl font-semibold hover:scale-[1.02] transition"
            >
              Use template
            </button>
          </div>

          {/* MODERN TEMPLATE */}
          <div className="bg-[#112733] border border-[#1f3a47] rounded-2xl p-5 sm:p-6 hover:border-[#00ED64] transition flex flex-col">
            <div className="bg-white rounded-lg overflow-hidden h-[260px] sm:h-[350px]">
              <div className="bg-[#001E2B] text-white p-3 sm:p-4">
                <h2 className="font-bold text-lg sm:text-xl">JOHN DOE</h2>

                <p className="text-xs sm:text-sm text-gray-300">
                  Full Stack Developer
                </p>
              </div>

              <div className="grid grid-cols-3 h-full">
                <div className="border-r border-gray-200 p-2 sm:p-3 text-black">
                  <h3 className="font-bold text-[10px] sm:text-xs">SKILLS</h3>

                  <p className="text-[9px] sm:text-[10px] mt-2 text-gray-600 leading-relaxed">
                    React
                    <br />
                    Node
                    <br />
                    MongoDB
                  </p>
                </div>

                <div className="col-span-2 p-2 sm:p-3 text-black">
                  <h3 className="font-bold text-[10px] sm:text-xs">ABOUT</h3>

                  <p className="text-[9px] sm:text-[10px] mt-2 text-gray-600">
                    Professional summary...
                  </p>

                  <h3 className="font-bold text-[10px] sm:text-xs mt-3">
                    PROJECTS
                  </h3>

                  <p className="text-[9px] sm:text-[10px] text-gray-600">
                    Project details...
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-semibold mt-6">
              Modern Developer
            </h2>

            <p className="text-gray-400 mt-3 text-sm sm:text-base flex-1">
              Clean modern layout ideal for startups, portfolios, and
              developer-focused roles.
            </p>

            <button
              onClick={chooseModern}
              className="mt-6 w-full bg-[#00ED64] text-black py-3 rounded-xl font-semibold hover:scale-[1.02] transition"
            >
              Use template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}