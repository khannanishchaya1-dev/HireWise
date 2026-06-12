const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const {resumeAnalysis,skillGapDetection}=require('../controller/feature.controller');
const upload = require('../middleware/file.middleware');
router.post('/resume-analysis',authMiddleware, upload.single('resume'), resumeAnalysis);
router.post(
  "/skill-gap",
  authMiddleware,
  upload.single("resume"),
  skillGapDetection
);

module.exports = router;