const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const {resumeAnalysis}=require('../controller/feature.controller');
const upload = require('../middleware/file.middleware');
router.post('/resume-analysis',authMiddleware, upload.single('resume'), resumeAnalysis);

module.exports = router;