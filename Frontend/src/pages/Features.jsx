export default function Features() {
  const features = [
  {
    title: "Resume Analysis",
    description:
      "Many students apply to dozens of companies but never receive interview calls because their resumes fail ATS screening. HireWise analyzes your resume, identifies weak sections, highlights strengths, and provides actionable recommendations to improve your chances of getting shortlisted."
  },

  {
    title: "Skill Gap Detection",
    description:
      "Students often struggle to understand why they are not a good fit for a role. By comparing your resume against a job description, HireWise identifies missing skills, technologies, and requirements so you know exactly what to learn before applying."
  },

  {
    title: "AI Interview Questions",
    description:
      "Preparing from random interview questions wastes valuable time. HireWise generates role-specific interview questions based on your resume and target job role, helping you focus on topics that are most likely to appear in real interviews."
  },

  {
    title: "ATS Resume Builder",
    description:
      "A visually attractive resume is useless if recruiters and ATS systems cannot properly read it. Our ATS Resume Builder helps create clean, recruiter-friendly resumes optimized for automated screening systems used by modern companies."
  },

  {
    title: "Personalized Learning Roadmap",
    description:
      "Many candidates know they need improvement but don't know where to start. HireWise creates a customized learning roadmap based on your missing skills, helping you prioritize the technologies and concepts that will have the biggest impact on your career."
  },

  {
    title: "Job Readiness Score",
    description:
      "It is difficult to judge whether you're actually ready to apply for a role. HireWise calculates a Job Readiness Score using your skills, projects, experience, and job requirements to give you a realistic assessment of your current preparedness."
  }
];
  return (
    <div className="min-h-screen bg-[#001E2B] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">

        <h1 className="text-5xl font-bold text-center">
          Our
          <span className="text-[#00ED64]">
            {" "}Features
          </span>
        </h1>

        <p className="text-center text-gray-400 mt-4">
          Everything you need to crack interviews.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-14">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-[#112733] border border-[#1f3a47] rounded-2xl p-6"
            >
              <h3 className="text-xl font-semibold text-[#00ED64]">
                {feature.title}
              </h3>

              <p className="text-gray-400 mt-3">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}