const pdfParse = require('pdf-parse');
const resumeAnalysisModel = require('../models/resumeAnalysis.model')

const {resumeAnalysisbyAi,skillGapDetectionByAi,generateInterviewQuestions} = require('../service/aiService'); 
const resumeAnalysis = async (req, res) => {
  try{
const resumeFile = req.file;
const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(resumeFile.buffer))).getText();

const {candidateName,skills, projects,experience,education,strengths,weaknesses,overallScore,atsScore,summary, recommendations } = await resumeAnalysisbyAi(resumeContent.text);
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

if(analysisModel){
  res.status(201).json({success:true,analysisModel});
}
  }catch(error){
    console.log(error);
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
async function getPreviousAnalyses(req, res) {
  try {
    const analyses = await resumeAnalysisModel
      .find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      analyses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
const generateInterviewQuestionsController =
  async (req, res) => {
    try {
      const resumeFile = req.file;

      const { role, difficulty,interviewType,companyType } =
        req.body;
console.log(role,interviewType,difficulty,companyType);
      if (!resumeFile) {
        return res.status(400).json({
          success: false,
          message:
            "Resume is required",
        });
      }
      if (
  !role ||
  !difficulty ||
  !interviewType ||
  !companyType
) {
  return res.status(400).json({
    success: false,
    message:
      "All fields are required",
  });
}

      const resumeContent =
        await (
          new pdfParse.PDFParse(
            Uint8Array.from(
              resumeFile.buffer
            )
          )
        ).getText();

      const result =
  await generateInterviewQuestions(
    resumeContent.text,
    role,
    difficulty,
    interviewType,
    companyType,
  );
      return res.status(200).json({
        success: true,
        result,
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };


const getDashboardStats = async (req, res) => {
  try {
    const analyses = await resumeAnalysisModel.find({
      user: req.user.id,
    });

    const totalResumeAnalyses =
      analyses.length;

    if (totalResumeAnalyses === 0) {
      return res.status(200).json({
        success: true,
        stats: {
          totalResumeAnalyses: 0,
          totalSkills: 0,
          averageATSScore: 0,
          bestATSScore: 0,
        },
      });
    }

    const totalSkills = new Set(
  analyses.flatMap(
    (analysis) => analysis.skills
  )
).size;

    const totalATSScore = analyses.reduce(
      (acc, analysis) =>
        acc + analysis.atsScore,
      0
    );

    const averageATSScore = Math.round(
      totalATSScore / totalResumeAnalyses
    );

    const bestATSScore = Math.max(
      ...analyses.map(
        (analysis) => analysis.atsScore
      )
    );

    return res.status(200).json({
      success: true,
      stats: {
        totalResumeAnalyses,
        totalSkills,
        averageATSScore,
        bestATSScore,
      },
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const ResumeAnalysis = require(
  "../models/resumeAnalysis.model"
);

const buildResume = async (req, res) => {
  try {
    const { id } = req.params;

    const analysis =
      await resumeAnalysisModel.findById(id);

    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: "Analysis not found",
      });
    }
console.log(analysis);
    return res.status(200).json({
      success: true,
      resume: analysis,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




module.exports={
  resumeAnalysis,
  skillGapDetection,
  getPreviousAnalyses,
  generateInterviewQuestionsController,
  getDashboardStats,
  buildResume,
}