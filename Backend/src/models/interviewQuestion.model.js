const interviewQuestionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    role: String,

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
    },

    questions: [
      {
        question: String,
        answer: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("InterviewQuestion", interviewQuestionSchema);