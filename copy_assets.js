const fs = require('fs');
const path = require('path');

const brainDir = `C:\\Users\\Ismael\\.gemini\\antigravity-ide\\brain\\9130a9b7-260a-4306-9967-7978e8f32770`;
const targetDir = `c:\\Users\\Ismael\\Documents\\Proje_camili`;

const imagesDir = path.join(targetDir, 'images');
const soundsDir = path.join(targetDir, 'sounds');

if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });
if (!fs.existsSync(soundsDir)) fs.mkdirSync(soundsDir, { recursive: true });

const brainFiles = fs.readdirSync(brainDir);

const map = {
  leao: 'leao.png',
  cachorro: 'cachorro.png',
  gato: 'gato.png',
  vaca: 'vaca.png',
  galinha: 'galinha.png',
  elefante: 'elefante.png'
};

for (const key in map) {
  const match = brainFiles.find(f => f.startsWith(key + '_png_') && f.endsWith('.png'));
  if (match) {
    const src = path.join(brainDir, match);
    const dest = path.join(imagesDir, map[key]);
    fs.copyFileSync(src, dest);
    console.log(`Copied ${match} -> ${dest}`);
  }
}

// Generate tiny valid silent/tone audio placeholder MP3/WAV files for all 6 animals so sounds directory has ready files!
// Create a small valid silent audio buffer (WAV format) for sounds
function createWavBuffer(durationSec = 1, frequency = 440) {
  const sampleRate = 22050;
  const numSamples = Math.floor(sampleRate * durationSec);
  const dataSize = numSamples * 2;
  const buffer = Buffer.alloc(44 + dataSize);

  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20); // PCM
  buffer.writeUInt16LE(1, 22); // mono
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * 2, 28);
  buffer.writeUInt16LE(2, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const sample = Math.sin(2 * Math.PI * frequency * t) * 0.3 * Math.exp(-t * 2);
    buffer.writeInt16LE(Math.floor(sample * 32767), 44 + i * 2);
  }

  return buffer;
}

const soundFrequencies = {
  'leao.mp3': 180,
  'cachorro.mp3': 400,
  'gato.mp3': 700,
  'vaca.mp3': 220,
  'galinha.mp3': 600,
  'elefante.mp3': 150
};

for (const soundName in soundFrequencies) {
  const dest = path.join(soundsDir, soundName);
  const wavBuf = createWavBuffer(1.2, soundFrequencies[soundName]);
  fs.writeFileSync(dest, wavBuf);
  console.log(`Created audio asset -> ${dest}`);
}
