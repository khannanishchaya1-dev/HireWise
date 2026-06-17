import React, { useState } from "react";
import {useNavigate} from "react-router-dom"

const emptyProject = { title: "", description: "" };
const emptyEducation = { institute: "", degree: "", year: "" };
const emptyExperience = { company: "", role: "", duration: "" };

export default function Form() {

  const navigate=useNavigate();
  const handleContinue = () => {
  navigate("/resume/templates", {
    state: formData,
  });
};
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",

    summary: "",

    skills: [""],

    projects: [{ ...emptyProject }],

    education: [{ ...emptyEducation }],

    experience: [{ ...emptyExperience }],
  });

  // ---------- Personal info ----------
  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // ---------- Skills ----------
  const addSkill = () => {
    setFormData((prev) => ({
      ...prev,
      skills: [...prev.skills, ""],
    }));
  };

  const updateSkill = (index, value) => {
    setFormData((prev) => {
      const updatedSkills = [...prev.skills];
      updatedSkills[index] = value;
      return { ...prev, skills: updatedSkills };
    });
  };

  const removeSkill = (index) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  // ---------- Projects ----------
  const addProject = () => {
    setFormData((prev) => ({
      ...prev,
      projects: [...prev.projects, { ...emptyProject }],
    }));
  };

  const updateProject = (index, field, value) => {
    setFormData((prev) => {
      const updatedProjects = [...prev.projects];
      updatedProjects[index] = {
        ...updatedProjects[index],
        [field]: value,
      };
      return { ...prev, projects: updatedProjects };
    });
  };

  const removeProject = (index) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  // ---------- Education ----------
  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [...prev.education, { ...emptyEducation }],
    }));
  };

  const updateEducation = (index, field, value) => {
    setFormData((prev) => {
      const updatedEducation = [...prev.education];
      updatedEducation[index] = {
        ...updatedEducation[index],
        [field]: value,
      };
      return { ...prev, education: updatedEducation };
    });
  };

  const removeEducation = (index) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  // ---------- Experience ----------
  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experience: [...prev.experience, { ...emptyExperience }],
    }));
  };

  const updateExperience = (index, field, value) => {
    setFormData((prev) => {
      const updatedExperience = [...prev.experience];
      updatedExperience[index] = {
        ...updatedExperience[index],
        [field]: value,
      };
      return { ...prev, experience: updatedExperience };
    });
  };

  const removeExperience = (index) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // navigate to templates / submit to backend here
  };

  const inputClass =
    "bg-[#0D2530] border border-[#1f3a47] p-3 rounded-lg text-white placeholder-gray-500 outline-none focus:border-[#00ED64] focus:ring-2 focus:ring-[#00ED64]/20 transition w-full";

  return (
    <div className="min-h-screen bg-[#001E2B] text-white">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold">
          Build
          <span className="text-[#00ED64]"> Resume</span>
        </h1>

        <p className="text-gray-400 mt-2">
          Create an ATS-friendly resume in minutes.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-8">
          {/* Personal Information */}
          <section className="bg-[#112733] border border-[#1f3a47] rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-semibold mb-5">
              Personal information
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full name"
                value={formData.fullName}
                onChange={(e) => updateField("fullName", e.target.value)}
                className={inputClass}
              />

              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                className={inputClass}
              />

              <input
                type="text"
                placeholder="Phone number"
                value={formData.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                className={inputClass}
              />

              <input
                type="text"
                placeholder="LinkedIn URL"
                value={formData.linkedin}
                onChange={(e) => updateField("linkedin", e.target.value)}
                className={inputClass}
              />

              <input
                type="text"
                placeholder="GitHub URL"
                value={formData.github}
                onChange={(e) => updateField("github", e.target.value)}
                className={`${inputClass} md:col-span-2`}
              />
            </div>
          </section>

          {/* Professional Summary */}
          <section className="bg-[#112733] border border-[#1f3a47] rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-semibold mb-4">
              Professional summary
            </h2>

            <textarea
              rows="5"
              placeholder="Write a short professional summary..."
              value={formData.summary}
              onChange={(e) => updateField("summary", e.target.value)}
              className={`${inputClass} resize-none`}
            />
          </section>

          {/* Skills */}
          <section className="bg-[#112733] border border-[#1f3a47] rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-semibold mb-4">Skills</h2>

            <div className="space-y-3">
              {formData.skills.map((skill, index) => (
                <div key={index} className="flex gap-3">
                  <input
                    value={skill}
                    onChange={(e) => updateSkill(index, e.target.value)}
                    placeholder="e.g. React, Node.js, SQL"
                    className={inputClass}
                  />

                  {formData.skills.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      aria-label="Remove skill"
                      className="px-4 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition flex-shrink-0"
                    >
                      &times;
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addSkill}
              className="mt-4 bg-[#00ED64]/10 text-[#00ED64] border border-[#00ED64]/20 px-4 py-2 rounded-lg font-medium hover:bg-[#00ED64]/20 transition"
            >
              + Add skill
            </button>
          </section>

          {/* Experience */}
          <section className="bg-[#112733] border border-[#1f3a47] rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-semibold mb-4">Experience</h2>

            <div className="space-y-4">
              {formData.experience.map((exp, index) => (
                <div
                  key={index}
                  className="bg-[#0D2530] border border-[#1f3a47] p-4 sm:p-5 rounded-xl space-y-3"
                >
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-400">
                      Experience {index + 1}
                    </p>

                    {formData.experience.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeExperience(index)}
                        aria-label="Remove experience"
                        className="text-red-400 hover:text-red-300 transition text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-3">
                    <input
                      placeholder="Company"
                      value={exp.company}
                      onChange={(e) =>
                        updateExperience(index, "company", e.target.value)
                      }
                      className={inputClass}
                    />

                    <input
                      placeholder="Role / Title"
                      value={exp.role}
                      onChange={(e) =>
                        updateExperience(index, "role", e.target.value)
                      }
                      className={inputClass}
                    />
                  </div>

                  <input
                    placeholder="Duration (e.g. Jan 2023 - Present)"
                    value={exp.duration}
                    onChange={(e) =>
                      updateExperience(index, "duration", e.target.value)
                    }
                    className={inputClass}
                  />
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addExperience}
              className="mt-4 bg-[#00ED64]/10 text-[#00ED64] border border-[#00ED64]/20 px-4 py-2 rounded-lg font-medium hover:bg-[#00ED64]/20 transition"
            >
              + Add experience
            </button>
          </section>

          {/* Education */}
          <section className="bg-[#112733] border border-[#1f3a47] rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-semibold mb-4">Education</h2>

            <div className="space-y-4">
              {formData.education.map((edu, index) => (
                <div
                  key={index}
                  className="bg-[#0D2530] border border-[#1f3a47] p-4 sm:p-5 rounded-xl space-y-3"
                >
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-400">
                      Education {index + 1}
                    </p>

                    {formData.education.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeEducation(index)}
                        aria-label="Remove education"
                        className="text-red-400 hover:text-red-300 transition text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <input
                    placeholder="Institute / University"
                    value={edu.institute}
                    onChange={(e) =>
                      updateEducation(index, "institute", e.target.value)
                    }
                    className={inputClass}
                  />

                  <div className="grid md:grid-cols-2 gap-3">
                    <input
                      placeholder="Degree"
                      value={edu.degree}
                      onChange={(e) =>
                        updateEducation(index, "degree", e.target.value)
                      }
                      className={inputClass}
                    />

                    <input
                      placeholder="Year (e.g. 2020 - 2024)"
                      value={edu.year}
                      onChange={(e) =>
                        updateEducation(index, "year", e.target.value)
                      }
                      className={inputClass}
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addEducation}
              className="mt-4 bg-[#00ED64]/10 text-[#00ED64] border border-[#00ED64]/20 px-4 py-2 rounded-lg font-medium hover:bg-[#00ED64]/20 transition"
            >
              + Add education
            </button>
          </section>

          {/* Projects */}
          <section className="bg-[#112733] border border-[#1f3a47] rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-semibold mb-4">Projects</h2>

            <div className="space-y-4">
              {formData.projects.map((project, index) => (
                <div
                  key={index}
                  className="bg-[#0D2530] border border-[#1f3a47] p-4 sm:p-5 rounded-xl space-y-3"
                >
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-400">
                      Project {index + 1}
                    </p>

                    {formData.projects.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeProject(index)}
                        aria-label="Remove project"
                        className="text-red-400 hover:text-red-300 transition text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <input
                    placeholder="Project title"
                    value={project.title}
                    onChange={(e) =>
                      updateProject(index, "title", e.target.value)
                    }
                    className={inputClass}
                  />

                  <textarea
                    rows="3"
                    placeholder="Description"
                    value={project.description}
                    onChange={(e) =>
                      updateProject(index, "description", e.target.value)
                    }
                    className={`${inputClass} resize-none`}
                  />
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addProject}
              className="mt-4 bg-[#00ED64]/10 text-[#00ED64] border border-[#00ED64]/20 px-4 py-2 rounded-lg font-medium hover:bg-[#00ED64]/20 transition"
            >
              + Add project
            </button>
          </section>

          <button
            type="submit"
            onClick={handleContinue}
            className="w-full bg-[#00ED64] text-black py-4 rounded-xl font-semibold hover:scale-[1.02] transition"
          >
            Continue to templates
          </button>
        </form>
      </div>
    </div>
  );
}