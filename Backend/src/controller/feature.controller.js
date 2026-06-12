const pdfParse = require('pdf-parse');
const resumeAnalysisModel = require('../models/resumeAnalysis.model')

const {resumeAnalysisbyAi} = require('../service/aiService'); 
const resumeAnalysis = async (req, res) => {
  try{
const resumeFile = req.file;
const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(resumeFile.buffer))).getText();

const {candidateName,skills, projects,experience,education,strengths,weaknesses,overallScore,atsScore,summary } = await resumeAnalysisbyAi(resumeContent.text);
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
});
console.log("Model Created");
if(analysisModel){
  res.status(201).json({success:true,analysisModel});
}
  }catch(error){
    res.status(500).json({message:"Internal Server error"});
  }



}


module.exports={
  resumeAnalysis
}