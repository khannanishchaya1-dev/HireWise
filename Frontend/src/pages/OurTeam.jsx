import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import Image from "../assets/nish.jpeg";
import Krishna from "../assets/Krishna.jpeg";

const teamMembers = [
  {
    name: "Nishchaya Khanna",
    role: "Founder & Full Stack Developer",
    image: Image,
    description:
      "Building AI-powered solutions to help students and professionals prepare for interviews and careers.",
  },

  {
    name: "Krishna Sharma",
    role: "AI Engineer",
    image: Krishna,
    description:
      "Developing intelligent resume analysis and interview systems.",
  },

  {
    name: "Gemini",
    role: "AI Analysis Assistant",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg",
    description:
      "Powers in-depth resume and interview analysis, providing smart feedback and insights.",
  },
];

export default function Team() {
  return (
    <div className="min-h-screen bg-[#001E2B] text-white">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-[#00ED64] font-medium text-sm sm:text-base">
            Meet The Team
          </span>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mt-4">
            The People Behind
            <span className="text-[#00ED64]"> HireWise</span>
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto mt-4 sm:mt-6 text-sm sm:text-base">
            Passionate developers and innovators working to revolutionize
            interview preparation through AI.
          </p>
        </div>

        {/* Team Members */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-[#112733] border border-white/10 rounded-3xl overflow-hidden hover:border-[#00ED64]/50 transition duration-300"
            >
              <img
                src={member.image}
                alt={member.name}
                className={`w-full h-60 sm:h-72 ${
                  member.name === "Gemini"
                    ? "object-contain bg-white p-10"
                    : "object-cover"
                }`}
              />

              <div className="p-5 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-bold">{member.name}</h3>

                <p className="text-[#00ED64] mt-1 text-sm sm:text-base">
                  {member.role}
                </p>

                <p className="text-gray-400 mt-4 text-sm sm:text-base">
                  {member.description}
                </p>

                <div className="flex gap-4 mt-6">
  <a
    href="https://github.com/yourusername"
    target="_blank"
    rel="noopener noreferrer"
    className="p-2 rounded-lg bg-[#001E2B] hover:bg-[#00ED64] hover:text-black transition"
  >
    <FaGithub size={18} />
  </a>

  <a
    href="https://linkedin.com/in/yourprofile"
    target="_blank"
    rel="noopener noreferrer"
    className="p-2 rounded-lg bg-[#001E2B] hover:bg-[#00ED64] hover:text-black transition"
  >
    <FaLinkedin size={18} />
  </a>

  <a
    href="mailto:your@email.com"
    className="p-2 rounded-lg bg-[#001E2B] hover:bg-[#00ED64] hover:text-black transition"
  >
    <FaEnvelope size={18} />
  </a>
</div>
              </div>
            </div>
          ))}
        </div>

        {/* Collaborate Section */}
        <div className="mt-16 sm:mt-24 text-center">
          <div className="bg-[#112733] rounded-3xl p-6 sm:p-10 border border-[#00ED64]/20">
            <h2 className="text-2xl sm:text-4xl font-bold">Want to Collaborate?</h2>

            <p className="text-gray-400 mt-3 sm:mt-4 text-sm sm:text-base">
              We are always open to innovative ideas and partnerships.
            </p>

            <button className="mt-6 bg-[#00ED64] text-black px-6 sm:px-8 py-3 rounded-xl font-semibold hover:scale-105 transition">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}