const jobMatchSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    resumeAnalysis: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ResumeAnalysis",
    },

    jobTitle: String,

    company: String,

    jobDescription: String,

    matchedSkills: [String],

    missingSkills: [String],

    matchScore: Number,

    recommendations: [String],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("JobMatch", jobMatchSchema);