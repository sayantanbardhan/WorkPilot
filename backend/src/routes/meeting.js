const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const meetingController = require('../controllers/meetingController');

// Meeting processing endpoint
router.post('/process', upload.single('audio'), meetingController.processMeeting);

// Autonomous meeting processing endpoint
router.post('/process-autonomous', upload.single('audio'), meetingController.processMeetingAutonomous);

// Transcription endpoint
router.post('/transcribe', upload.single('audio'), meetingController.transcribeAudio);

module.exports = router; 