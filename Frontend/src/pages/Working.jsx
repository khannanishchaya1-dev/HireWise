export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Upload Your Resume",
      description:
        "Upload your PDF resume and let HireWise analyze your skills, projects, education, and overall profile."
    },
    {
      step: "02",
      title: "Get AI Resume Analysis",
      description:
        "Receive ATS score, strengths, weaknesses, recommendations, and a complete breakdown of your resume."
    },
    {
      step: "03",
      title: "Identify Skill Gaps",
      description:
        "Compare your resume against any job description to discover missing skills and improve job readiness."
    },
    {
      step: "04",
      title: "Generate Interview Questions",
      description:
        "Get personalized interview questions generated from your resume, target role, company type, and difficulty level."
    },
    {
      step: "05",
      title: "Build ATS-Friendly Resume",
      description:
        "Transform your analyzed resume into a clean ATS-optimized format ready for recruiters."
    },
    {
      step: "06",
      title: "Track Your Growth",
      description:
        "Monitor ATS scores, skills, and interview preparation progress as you improve your profile."
    }
  ];

  return (
    <div className="min-h-screen bg-[#001E2B] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">

        <h1 className="text-5xl font-bold text-center">
          How
          <span className="text-[#00ED64]">
            {" "}HireWise Works
          </span>
        </h1>

        <p className="text-center text-gray-400 mt-4 max-w-3xl mx-auto">
          A simple AI-powered workflow that helps you analyze,
          improve, and prepare for your dream job.
        </p>

        <div className="mt-16 space-y-8">
          {steps.map((item) => (
            <div
              key={item.step}
              className="flex flex-col md:flex-row gap-6 bg-[#112733] border border-[#1f3a47] rounded-2xl p-8"
            >
              <div className="text-5xl font-bold text-[#00ED64] min-w-[120px]">
                {item.step}
              </div>

              <div>
                <h2 className="text-2xl font-semibold">
                  {item.title}
                </h2>

                <p className="text-gray-400 mt-3 leading-7">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}

        <div className="text-center mt-20">
          <h2 className="text-3xl font-bold">
            Ready to Crack Your Next Interview?
          </h2>

          <p className="text-gray-400 mt-4">
            Let AI guide your preparation journey.
          </p>

          <button className="mt-6 bg-[#00ED64] text-black px-8 py-4 rounded-xl font-semibold hover:scale-105 transition">
            Get Started
          </button>
        </div>

      </div>
    </div>
  );
}