const mongoose = require("mongoose");

const resumeAnalysisSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    candidateName:{
      type:String,
    },
    skills: [
      {
        type: String,
      },
    ],

    projects: [
      {
        title: String,
        description: String,
      },
    ],

    experience: [
      {
        company: String,
        role: String,
        duration: String,
      },
    ],

    education: [
      {
        institute: String,
        degree: String,
        year: String,
      },
    ],

    strengths: [
      {
        type: String,
      },
    ],

    weaknesses: [
      {
        type: String,
      },
    ],

    overallScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    atsScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },

    summary: {
      type: String,
    },
    recommendations:[
      {
      type:String
    }
  ]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "ResumeAnalysis",
  resumeAnalysisSchema
);