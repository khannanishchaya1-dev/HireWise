import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import toast from "react-hot-toast";

// Natural design width of the resume (A4-ish proportions at this width)
const RESUME_WIDTH = 900;

export default function ResumeBuilder() {
  const { id } = useParams();

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [contact, setContact] = useState({
    phone: "",
    email: "",
    github: "",
    linkedin: "",
  });
  const [showContactModal, setShowContactModal] = useState(false);

  const previewRef = useRef(null);
  const [scale, setScale] = useState(1);

  // Scale the fixed-width resume down on small screens.
  // Uses CSS `zoom` (not `transform: scale`) so the shrink affects layout too —
  // the parent auto-sizes to the shrunk content with no JS height measurement
  // or overflow-hidden hacks needed.
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

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/features/build-resume/${id}`,
          {
            withCredentials: true,
          }
        );

        setResume(response.data.resume);
      } catch (error) {
        toast.error("Failed to load resume");
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [id]);

  const downloadPDF = async () => {
    const element = previewRef.current;
    if (!element) return;

    // Temporarily remove the mobile zoom-out so the PDF is captured at full resolution
    const previousZoom = element.style.zoom;
    element.style.zoom = 1;

    await new Promise((resolve) => requestAnimationFrame(resolve));

    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: "#ffffff",
    });

    element.style.zoom = previousZoom;

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

    pdf.save(`${resume.candidateName}_Resume.pdf`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#001E2B] text-white flex items-center justify-center">
        Loading Resume...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#001E2B] py-6 sm:py-10 px-3 sm:px-4">
      <div className="max-w-5xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
          <h1 className="text-2xl sm:text-4xl font-bold text-white text-center sm:text-left">
            ATS Resume Builder
          </h1>

          <div className="flex gap-3 justify-center sm:justify-end">
            <button
              onClick={() => setShowContactModal(true)}
              className="bg-[#112733] border border-[#1f3a47] text-white px-5 py-3 rounded-xl font-semibold text-sm sm:text-base whitespace-nowrap"
            >
              Edit Contact Info
            </button>

            <button
              onClick={downloadPDF}
              className="bg-[#00ED64] text-black px-5 py-3 rounded-xl font-semibold text-sm sm:text-base whitespace-nowrap"
            >
              Download PDF
            </button>
          </div>
        </div>

        {/* Contact Information Modal */}
        {showContactModal && (
          <div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4"
            onClick={() => setShowContactModal(false)}
          >
            <div
              className="bg-[#112733] border border-[#1f3a47] rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white text-xl font-semibold">
                  Contact Information
                </h2>

                <button
                  onClick={() => setShowContactModal(false)}
                  className="text-white text-2xl leading-none px-2"
                  aria-label="Close"
                >
                  &times;
                </button>
              </div>

              <div className="grid gap-4">
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={contact.phone}
                  onChange={(e) =>
                    setContact({
                      ...contact,
                      phone: e.target.value,
                    })
                  }
                  className="bg-[#0D2530] border border-[#1f3a47] rounded-lg p-3 text-white w-full"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  value={contact.email}
                  onChange={(e) =>
                    setContact({
                      ...contact,
                      email: e.target.value,
                    })
                  }
                  className="bg-[#0D2530] border border-[#1f3a47] rounded-lg p-3 text-white w-full"
                />

                <input
                  type="text"
                  placeholder="GitHub URL (https://github.com/username)"
                  value={contact.github}
                  onChange={(e) =>
                    setContact({
                      ...contact,
                      github: e.target.value,
                    })
                  }
                  className="bg-[#0D2530] border border-[#1f3a47] rounded-lg p-3 text-white w-full"
                />

                <input
                  type="text"
                  placeholder="LinkedIn URL (https://linkedin.com/in/username)"
                  value={contact.linkedin}
                  onChange={(e) =>
                    setContact({
                      ...contact,
                      linkedin: e.target.value,
                    })
                  }
                  className="bg-[#0D2530] border border-[#1f3a47] rounded-lg p-3 text-white w-full"
                />
              </div>

              <button
                onClick={() => setShowContactModal(false)}
                className="mt-6 w-full bg-[#00ED64] text-black px-6 py-3 rounded-xl font-semibold"
              >
                Done
              </button>
            </div>
          </div>
        )}

        {/* ATS Resume Preview - scaled down to fit a single mobile screen width */}
        <div className="w-full flex justify-center">
          <div
            id="resume-preview"
            ref={previewRef}
            className="bg-white text-black rounded-xl shadow-xl p-10"
            style={{
              width: `${RESUME_WIDTH}px`,
              flexShrink: 0,
              zoom: scale,
            }}
          >
            {/* Header */}

            <div className="text-center border-b-2 border-black pb-5">
              <h1 className="text-4xl font-bold uppercase">
                {resume.candidateName}
              </h1>

              <div className="mt-3 flex flex-row flex-wrap justify-center items-center gap-2 text-xs sm:text-sm">
                {[
                  contact.phone && (
                    <span key="phone">{contact.phone}</span>
                  ),
                  contact.email && (
                    <span key="email">{contact.email}</span>
                  ),
                  contact.github && (
                    <a
                      key="github"
                      href={contact.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 underline"
                    >
                      GitHub
                    </a>
                  ),
                  contact.linkedin && (
                    <a
                      key="linkedin"
                      href={contact.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 underline"
                    >
                      LinkedIn
                    </a>
                  ),
                ]
                  .filter(Boolean)
                  .map((item, i, arr) => (
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

              <p className="mt-3 text-sm leading-7">{resume.summary}</p>
            </section>

            {/* Skills */}

            <section className="mt-6">
              <h2 className="text-lg font-bold uppercase border-b-2 border-black pb-1">
                Technical Skills
              </h2>

              <p className="mt-3 text-sm leading-7">
                {resume.skills?.join(" • ")}
              </p>
            </section>

            {/* Projects */}

            <section className="mt-6">
              <h2 className="text-lg font-bold uppercase border-b-2 border-black pb-1">
                Projects
              </h2>

              <div className="space-y-5 mt-4">
                {resume.projects?.map((project, index) => (
                  <div key={index}>
                    <h3 className="font-bold">{project.title}</h3>

                    <ul className="list-disc ml-6 mt-2 text-sm">
                      {project.description
                        ?.split(".")
                        .filter(Boolean)
                        .map((point, i) => (
                          <li key={i}>{point.trim()}</li>
                        ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Experience */}

            {/* Education */}

            <section className="mt-6">
              <h2 className="text-lg font-bold uppercase border-b-2 border-black pb-1">
                Education
              </h2>

              <div className="space-y-4 mt-4">
                {resume.education?.map((edu, index) => (
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