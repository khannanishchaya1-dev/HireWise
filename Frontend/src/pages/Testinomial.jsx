export default function Testimonials() {
  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "Frontend Developer",
      text:
        "HireWise helped me identify missing skills in my resume and improve my ATS score from 62 to 86. The AI recommendations were surprisingly accurate."
    },
    {
      name: "Priya Verma",
      role: "Software Engineering Student",
      text:
        "The resume analysis feature showed weaknesses I never noticed before. The ATS Resume Builder helped me create a much cleaner resume."
    },
    {
      name: "Aman Gupta",
      role: "Full Stack Developer",
      text:
        "I used the Skill Gap Detection feature before applying to jobs. It showed exactly what technologies were missing compared to job descriptions."
    },
    {
      name: "Sneha Kapoor",
      role: "Computer Science Student",
      text:
        "The AI Interview Questions feature gave me role-specific questions based on my resume. It felt like practicing with a real interviewer."
    },
    {
      name: "Vikram Singh",
      role: "Backend Developer",
      text:
        "Instead of spending hours preparing, HireWise generated personalized interview questions and highlighted important topics to revise."
    },
    {
      name: "Ananya Patel",
      role: "Final Year Student",
      text:
        "The platform gave me confidence before placements. Resume analysis, ATS score, and interview preparation in one place is incredibly useful."
    }
  ];

  return (
    <div className="min-h-screen bg-[#001E2B] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">

        <h1 className="text-5xl font-bold text-center">
          What Our
          <span className="text-[#00ED64]">
            {" "}Users Say
          </span>
        </h1>

        <p className="text-center text-gray-400 mt-4 max-w-3xl mx-auto">
          Thousands of candidates use HireWise to improve
          their resumes, identify skill gaps, and prepare
          confidently for interviews.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">

          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-[#112733] border border-[#1f3a47] rounded-2xl p-6"
            >
              <div className="text-[#00ED64] text-4xl mb-4">
                "
              </div>

              <p className="text-gray-300 leading-7">
                {testimonial.text}
              </p>

              <div className="mt-6 border-t border-[#1f3a47] pt-4">
                <h3 className="font-semibold text-lg">
                  {testimonial.name}
                </h3>

                <p className="text-gray-400 text-sm">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}

        </div>

        {/* Stats Section */}

        <div className="grid md:grid-cols-4 gap-6 mt-20">

          <div className="bg-[#112733] rounded-2xl p-6 text-center border border-[#1f3a47]">
            <h2 className="text-4xl font-bold text-[#00ED64]">
              10K+
            </h2>
            <p className="text-gray-400 mt-2">
              Resumes Analyzed
            </p>
          </div>

          <div className="bg-[#112733] rounded-2xl p-6 text-center border border-[#1f3a47]">
            <h2 className="text-4xl font-bold text-[#00ED64]">
              95%
            </h2>
            <p className="text-gray-400 mt-2">
              ATS Accuracy
            </p>
          </div>

          <div className="bg-[#112733] rounded-2xl p-6 text-center border border-[#1f3a47]">
            <h2 className="text-4xl font-bold text-[#00ED64]">
              50K+
            </h2>
            <p className="text-gray-400 mt-2">
              Questions Generated
            </p>
          </div>

          <div className="bg-[#112733] rounded-2xl p-6 text-center border border-[#1f3a47]">
            <h2 className="text-4xl font-bold text-[#00ED64]">
              4.9/5
            </h2>
            <p className="text-gray-400 mt-2">
              User Rating
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}