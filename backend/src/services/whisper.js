const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

class WhisperService {
    constructor() {
        this.tempDir = path.join(__dirname, '../temp');
        this.ensureTempDir();
    }

    ensureTempDir() {
        if (!fs.existsSync(this.tempDir)) {
            fs.mkdirSync(this.tempDir, { recursive: true });
        }
    }

    async transcribeAudio(audioFilePath, model = 'base') {
        return new Promise((resolve, reject) => {
            const outputPath = path.join(this.tempDir, `transcript_${Date.now()}.txt`);

            // Command to run Whisper locally
            const whisperProcess = spawn('whisper', [
                audioFilePath,
                '--model', model,
                '--output_format', 'txt',
                '--output_dir', this.tempDir,
                '--verbose', 'False'
            ]);

            let stdout = '';
            let stderr = '';

            whisperProcess.stdout.on('data', (data) => {
                stdout += data.toString();
            });

            whisperProcess.stderr.on('data', (data) => {
                stderr += data.toString();
            });

            whisperProcess.on('close', (code) => {
                if (code === 0) {
                    try {
                        // Read the generated transcript file
                        const transcriptFiles = fs.readdirSync(this.tempDir)
                            .filter(file => file.endsWith('.txt') && file.includes(path.basename(audioFilePath, path.extname(audioFilePath))));

                        if (transcriptFiles.length > 0) {
                            const transcriptPath = path.join(this.tempDir, transcriptFiles[0]);
                            const transcript = fs.readFileSync(transcriptPath, 'utf8');

                            // Clean up transcript file
                            fs.unlinkSync(transcriptPath);

                            resolve(transcript.trim());
                        } else {
                            reject(new Error('Transcript file not found'));
                        }
                    } catch (error) {
                        reject(error);
                    }
                } else {
                    reject(new Error(`Whisper process failed with code ${code}: ${stderr}`));
                }
            });

            whisperProcess.on('error', (error) => {
                reject(new Error(`Failed to start Whisper process: ${error.message}`));
            });
        });
    }

    async transcribeAudioBuffer(audioBuffer, filename, model = 'base') {
        const tempFilePath = path.join(this.tempDir, `temp_${Date.now()}_${filename}`);

        try {
            // Write buffer to temporary file
            fs.writeFileSync(tempFilePath, audioBuffer);

            // Transcribe the temporary file
            const transcript = await this.transcribeAudio(tempFilePath, model);

            // Clean up temporary file
            fs.unlinkSync(tempFilePath);

            return transcript;
        } catch (error) {
            // Clean up temporary file if it exists
            if (fs.existsSync(tempFilePath)) {
                fs.unlinkSync(tempFilePath);
            }
            throw error;
        }
    }

    async isWhisperInstalled() {
        return new Promise((resolve) => {
            const checkProcess = spawn('whisper', ['--help']);

            checkProcess.on('close', (code) => {
                resolve(code === 0);
            });

            checkProcess.on('error', () => {
                resolve(false);
            });
        });
    }

    async getAvailableModels() {
        return ['tiny', 'base', 'small', 'medium', 'large'];
    }
}

module.exports = new WhisperService(); 