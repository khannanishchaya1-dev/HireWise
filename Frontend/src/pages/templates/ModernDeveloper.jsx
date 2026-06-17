import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

// Natural design width of the resume (A4-ish proportions at this width)
const RESUME_WIDTH = 900;

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

export default function ModernDeveloper() {
  const { state } = useLocation();
  const data = state || {};

  const previewRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [downloading, setDownloading] = useState(false);

  // Scale the fixed-width resume down on small screens.
  // Uses CSS `zoom` so the shrink affects layout too.
  useEffect(() => {
    const updateScale = () => {
      if (window.innerWidth < 768) {
        setScale(Math.min(1, window.innerWidth / RESUME_WIDTH));
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
    // mobile zoom applied to the preview.
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
          zoom: 1 !important;
          box-shadow: none !important;
          border-radius: 0 !important;
        }
      }
    `,
  });

  const downloadPDF = async () => {
    setDownloading(true);
    try {
      await reactToPrintFn();
    } finally {
      setDownloading(false);
    }
  };

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
            Modern Developer Resume
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
        <div className="w-full flex justify-center">
          <div
            id="resume-preview"
            ref={previewRef}
            className="bg-white rounded-xl overflow-hidden shadow-xl"
            style={{
              width: `${RESUME_WIDTH}px`,
              flexShrink: 0,
              zoom: scale,
            }}
          >
            {/* HEADER */}
            <div className="bg-[#02435f] text-white p-8">
              <h1 className="text-4xl font-bold">{fullName}</h1>

              <p className="text-white mt-2 text-lg">
                Full Stack Developer
              </p>

              <div className="flex flex-wrap gap-4 mt-4 text-sm">
  {email && <span>{email}</span>}

  {phone && <span>{phone}</span>}

  {linkedin && (
    <a
      href={linkedin}
      target="_blank"
      rel="noreferrer"
      className="underline"
    >
      LinkedIn
    </a>
  )}

  {github && (
    <a
      href={github}
      target="_blank"
      rel="noreferrer"
      className="underline"
    >
      GitHub
    </a>
  )}
</div>
</div>

            {/* BODY */}
            <div className="grid md:grid-cols-3">
              {/* LEFT SIDEBAR */}
              <div className="bg-gray-100 p-6 text-black">
                <h2 className="font-bold text-lg border-b border-gray-300 pb-2">
                  Skills
                </h2>

                <div className="mt-4 flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-[#02435f] text-white px-3 py-1 rounded-full text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <h2 className="font-bold text-lg border-b border-gray-300 pb-2 mt-8">
                  Education
                </h2>

                <div className="mt-4 space-y-4">
                  {education.map((edu, index) => (
                    <div key={index}>
                      <h3 className="font-semibold">{edu.degree}</h3>

                      <p className="text-sm">{edu.institute}</p>

                      <p className="text-xs text-gray-600">{edu.year}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* MAIN CONTENT */}
              <div className="md:col-span-2 p-8 text-black">
                {/* SUMMARY */}
                <section>
                  <h2 className="text-xl font-bold text-[#001E2B]">
                    Professional Summary
                  </h2>

                  <p className="mt-3 text-gray-700 leading-7">{summary}</p>
                </section>

                {/* PROJECTS */}
                <section className="mt-8">
                  <h2 className="text-xl font-bold text-[#001E2B]">
                    Projects
                  </h2>

                  <div className="space-y-6 mt-4">
                    {projects.map((project, index) => (
                      <div key={index}>
                        <h3 className="font-bold text-lg">{project.title}</h3>

                        <p className="mt-2 text-gray-700 leading-6">
                          {project.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* EXPERIENCE - only rendered if real experience data exists */}
                {experience.length > 0 && (
                  <section className="mt-8">
                    <h2 className="text-xl font-bold text-[#001E2B]">
                      Experience
                    </h2>

                    <div className="space-y-5 mt-4">
                      {experience.map((exp, index) => (
                        <div key={index}>
                          <div className="flex justify-between">
                            <h3 className="font-semibold">{exp.role}</h3>

                            <span className="text-sm text-gray-500">
                              {exp.duration}
                            </span>
                          </div>

                          <p className="text-gray-700">{exp.company}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}