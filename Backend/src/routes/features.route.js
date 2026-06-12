const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const {resumeAnalysis,skillGapDetection,getPreviousAnalyses,generateInterviewQuestionsController,getDashboardStats}=require('../controller/feature.controller');
const upload = require('../middleware/file.middleware');
router.post('/resume-analysis',authMiddleware, upload.single('resume'), resumeAnalysis);
router.post(
  "/skill-gap",
  authMiddleware,
  upload.single("resume"),
  skillGapDetection
);
router.get(
  "/previous-analyses",
  authMiddleware,
  getPreviousAnalyses
);
router.post("/interview-questions",authMiddleware,upload.single("resume"),generateInterviewQuestionsController);
router.get("/get-stats",authMiddleware,getDashboardStats);
module.exports = router;