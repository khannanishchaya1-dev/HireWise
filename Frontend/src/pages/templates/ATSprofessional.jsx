import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

// Natural design width of the resume (A4-ish proportions at this width)
const RESUME_WIDTH = 900;
// A4 aspect ratio height for this width (297/210 * 900)
const RESUME_HEIGHT = (RESUME_WIDTH * 297) / 210;

// Fallback dummy content used when a section/field has no data
const DUMMY = {
  fullName: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  linkedin: "https://linkedin.com/in/johndoe",
  github: "https://github.com/johndoe",
  summary:
    "Motivated software engineer with experience building scalable web applications using modern technologies. Strong problem-solving skills and a passion for writing clean, maintainable code.",
  skills: ["React", "Node.js", "MongoDB", "JavaScript", "Tailwind CSS"],
  projects: [
    {
      title: "Sample Project",
      description:
        "Built a full-stack web application with authentication, REST APIs, and a responsive UI. Deployed to production with CI/CD pipelines.",
    },
  ],
  education: [
    {
      degree: "B.Tech in Computer Science",
      institute: "Sample University",
      year: "2020 - 2024",
    },
  ],
};

export default function ATSProfessional() {
  const { state } = useLocation();
  const data = state || {};
  const [downloading, setDownloading] = useState(false);

const downloadPDF = async () => {
  setDownloading(true);
  try {
    await reactToPrintFn();
  } finally {
    setDownloading(false);
  }
};

  const previewRef = useRef(null);
  const wrapperRef = useRef(null);
  const [scale, setScale] = useState(1);

  // Scale the fixed-width resume down on small screens using transform.
  // The wrapper is given an explicit height equal to the scaled-down content
  // height so it doesn't collapse (transform doesn't affect layout flow).
  useEffect(() => {
    const updateScale = () => {
      const containerWidth = wrapperRef.current?.parentElement?.offsetWidth;
      if (window.innerWidth < 768 && containerWidth) {
        setScale(Math.min(1, containerWidth / RESUME_WIDTH));
      } else {
        setScale(1);
      }
    };

    updateScale();

    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const reactToPrintFn = useReactToPrint({
    contentRef: previewRef,
    documentTitle: `${data.fullName || DUMMY.fullName}_Resume`,
    // Force full A4 size on the printed page regardless of the on-screen
    // mobile zoom/transform applied to the preview.
    pageStyle: `
      @page {
        size: A4;
        margin: 0;
      }
      @media print {
        html, body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        #resume-preview {
          width: 210mm !important;
          transform: none !important;
          box-shadow: none !important;
          border-radius: 0 !important;
        }
      }
    `,
  });

  // Resolve fields with dummy fallbacks
  const fullName = data.fullName || DUMMY.fullName;
  const email = data.email || DUMMY.email;
  const phone = data.phone || DUMMY.phone;
  const linkedin = data.linkedin || DUMMY.linkedin;
  const github = data.github || DUMMY.github;
  const summary = data.summary || DUMMY.summary;

  const skills =
    data.skills?.filter(Boolean)?.length > 0
      ? data.skills.filter(Boolean)
      : DUMMY.skills;

  const projects =
    data.projects?.filter((p) => p.title || p.description)?.length > 0
      ? data.projects
      : DUMMY.projects;

  const education =
    data.education?.filter((e) => e.degree || e.institute)?.length > 0
      ? data.education
      : DUMMY.education;

  // Experience: only render the section if real experience data exists.
  // No dummy fallback — a missing experience section is normal (e.g. freshers).
  const experience = data.experience?.filter((e) => e.role || e.company) || [];

  return (
    <div className="min-h-screen bg-[#001E2B] py-6 sm:py-10 px-3 sm:px-4">
      <div className="max-w-5xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
          <h1 className="text-2xl sm:text-4xl font-bold text-white text-center sm:text-left">
            ATS Professional Resume
          </h1>

          <button
            onClick={downloadPDF}
            disabled={downloading}
            className="bg-[#00ED64] text-black px-5 py-3 rounded-xl font-semibold text-sm sm:text-base hover:scale-[1.02] transition self-center sm:self-auto disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2"
          >
            {downloading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4"
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
              "Download PDF"
            )}
          </button>
        </div>

        {/* Resume Preview - scaled down to fit a single mobile screen width */}
        <div
          ref={wrapperRef}
          className="w-full flex justify-center"
          style={{
            height: scale < 1 ? `${RESUME_HEIGHT * scale}px` : "auto",
          }}
        >
          <div
            id="resume-preview"
            ref={previewRef}
            className="bg-white text-black rounded-xl shadow-xl p-10"
            style={{
              width: `${RESUME_WIDTH}px`,
              flexShrink: 0,
              transform: `scale(${scale})`,
              transformOrigin: "top center",
            }}
          >
            {/* Header */}
            <div className="text-center border-b-2 border-black pb-5">
              <h1 className="text-4xl font-bold uppercase">{fullName}</h1>

              <div className="mt-3 flex flex-row flex-wrap justify-center items-center gap-2 text-xs sm:text-sm">
                {[
                  email && <span key="email">{email}</span>,
                  phone && <span key="phone">{phone}</span>,
                  linkedin && (
                    <a
                      key="linkedin"
                      href={linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 underline"
                    >
                      LinkedIn
                    </a>
                  ),
                  github && (
                    <a
                      key="github"
                      href={github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 underline"
                    >
                      GitHub
                    </a>
                  ),
                ]
                  .filter(Boolean)
                  .map((item, i) => (
                    <span key={i} className="flex items-center gap-2">
                      {i > 0 && <span className="text-gray-400">|</span>}
                      {item}
                    </span>
                  ))}
              </div>
            </div>

            {/* Summary */}
            <section className="mt-6">
              <h2 className="text-lg font-bold uppercase border-b-2 border-black pb-1">
                Professional Summary
              </h2>

              <p className="mt-3 text-sm leading-7">{summary}</p>
            </section>

            {/* Skills */}
            <section className="mt-6">
              <h2 className="text-lg font-bold uppercase border-b-2 border-black pb-1">
                Skills
              </h2>

              <p className="mt-3 text-sm leading-7">{skills.join(" • ")}</p>
            </section>

            {/* Projects */}
            <section className="mt-6">
              <h2 className="text-lg font-bold uppercase border-b-2 border-black pb-1">
                Projects
              </h2>

              <div className="space-y-5 mt-4">
                {projects.map((project, index) => (
                  <div key={index}>
                    <h3 className="font-bold text-base">{project.title}</h3>

                    <p className="text-sm mt-2 leading-6">
                      {project.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Experience - only rendered if real experience data exists */}
            {experience.length > 0 && (
              <section className="mt-6">
                <h2 className="text-lg font-bold uppercase border-b-2 border-black pb-1">
                  Experience
                </h2>

                <div className="space-y-4 mt-4">
                  {experience.map((exp, index) => (
                    <div key={index}>
                      <div className="flex justify-between">
                        <h3 className="font-bold">{exp.role}</h3>

                        <span className="text-sm">{exp.duration}</span>
                      </div>

                      <p className="text-sm text-gray-700">{exp.company}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            <section className="mt-6">
              <h2 className="text-lg font-bold uppercase border-b-2 border-black pb-1">
                Education
              </h2>

              <div className="space-y-4 mt-4">
                {education.map((edu, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row sm:justify-between"
                  >
                    <div>
                      <h3 className="font-bold">{edu.degree}</h3>

                      <p className="text-sm">{edu.institute}</p>
                    </div>

                    <span className="text-sm">{edu.year}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}