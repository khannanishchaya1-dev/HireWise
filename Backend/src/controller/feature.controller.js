const pdfParse = require('pdf-parse');
const resumeAnalysisModel = require('../models/resumeAnalysis.model')

const {resumeAnalysisbyAi,skillGapDetectionByAi} = require('../service/aiService'); 
const resumeAnalysis = async (req, res) => {
  try{
const resumeFile = req.file;
const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(resumeFile.buffer))).getText();

const {candidateName,skills, projects,experience,education,strengths,weaknesses,overallScore,atsScore,summary, recommendations } = await resumeAnalysisbyAi(resumeContent.text);
console.log("Before creating Model");
console.log(candidateName,
  skills,
  projects,
  experience,
  education,
  strengths,
  weaknesses,
  overallScore,
  atsScore,
  summary)
const formattedProjects = projects.map((project) => ({
  title: project.name,
  description: project.description,
}));

const formattedEducation = education.map((edu) => ({
  institute: edu.institute,
  degree: edu.degree,
  year: edu.year,
}));

const formattedExperience = experience.map((exp) => ({
  company: exp.company,
  role: exp.role,
  duration: exp.duration,
}));

const analysisModel = await resumeAnalysisModel.create({
  user: req.user.id,

  candidateName,

  skills,

  projects: formattedProjects,

  education: formattedEducation,

  experience: formattedExperience,

  strengths,

  weaknesses,

  overallScore,

  atsScore,

  summary,
  recommendations
});
console.log("Model Created");
if(analysisModel){
  res.status(201).json({success:true,analysisModel});
}
  }catch(error){
    res.status(500).json({message:"Internal Server error"});
  }



}
const skillGapDetection = async (req, res) => {
  try {
    const resumeFile = req.file;
    const { jobDescription } = req.body;

    if (!resumeFile) {
      return res.status(400).json({
        success: false,
        message: "Resume is required",
      });
    }

    if (!jobDescription) {
      return res.status(400).json({
        success: false,
        message: "Job Description is required",
      });
    }

    const resumeContent = await (
      new pdfParse.PDFParse(
        Uint8Array.from(resumeFile.buffer)
      )
    ).getText();

    if (!resumeContent.text) {
      return res.status(400).json({
        success: false,
        message: "Unable to extract resume content",
      });
    }

    const skillGapAnalysis =
      await skillGapDetectionByAi(
        resumeContent.text,
        jobDescription
      );

    return res.status(200).json({
      success: true,
      skillGapAnalysis,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



module.exports={
  resumeAnalysis,
  skillGapDetection,
}