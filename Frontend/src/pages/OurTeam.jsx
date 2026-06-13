import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import Image from "../assets/nish.jpeg";
import Krishna from "../assets/Krishna.jpeg"
const teamMembers = [
  {
    name: "Nishchaya",
    role: "Founder & Full Stack Developer",
    image:
      Image,
    description:
      "Building AI-powered solutions to help students and professionals prepare for interviews and careers.",
  },
  {
    name: "Team Member",
    role: "Frontend Developer",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500",
    description:
      "Creating beautiful and responsive user experiences.",
  },
  {
    name: "Krishna Sharma",
    role: "AI Engineer",
    image:Krishna,
    description:
      "Developing intelligent resume analysis and interview systems.",
  },
];

export default function Team() {
  return (
    <div className="min-h-screen bg-[#001E2B] text-white">
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <span className="text-[#00ED64] font-medium">
            Meet The Team
          </span>

          <h1 className="text-5xl md:text-6xl font-bold mt-4">
            The People Behind
            <span className="text-[#00ED64]"> HireWise</span>
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto mt-6">
            Passionate developers and innovators working to
            revolutionize interview preparation through AI.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-[#112733] border border-white/10 rounded-3xl overflow-hidden hover:border-[#00ED64]/50 transition duration-300"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-72 object-cover"
              />

              <div className="p-6">
                <h3 className="text-2xl font-bold">
                  {member.name}
                </h3>

                <p className="text-[#00ED64] mt-1">
                  {member.role}
                </p>

                <p className="text-gray-400 mt-4">
                  {member.description}
                </p>

                <div className="flex gap-4 mt-6">
                  <a
                    href="#"
                    className="p-2 rounded-lg bg-[#001E2B] hover:bg-[#00ED64] hover:text-black transition"
                  >
                    <FaGithub size5={18} />
                  </a>

                  <a
                    href="#"
                    className="p-2 rounded-lg bg-[#001E2B] hover:bg-[#00ED64] hover:text-black transition"
                  >
                    <FaLinkedin size={18} />
                  </a>

                  <a
                    href="#"
                    className="p-2 rounded-lg bg-[#001E2B] hover:bg-[#00ED64] hover:text-black transition"
                  >
                    <FaEnvelope size={18} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 text-center">
          <div className="bg-[#112733] rounded-3xl p-10 border border-[#00ED64]/20">
            <h2 className="text-4xl font-bold">
              Want to Collaborate?
            </h2>

            <p className="text-gray-400 mt-4">
              We are always open to innovative ideas and
              partnerships.
            </p>

            <button className="mt-6 bg-[#00ED64] text-black px-8 py-3 rounded-xl font-semibold">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}