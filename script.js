const accentMap = {
  custom: {
    label: 'Custom hybrid',
    traits: ['blended vowels', 'dynamic cadence', 'layered phrasing'],
    pitch: 'mid',
    rate: 'balanced',
    confidence: 'high'
  },
  'british-american': {
    label: 'British + American',
    traits: ['clear diction', 'soft clipped vowels', 'confident rhythm'],
    pitch: 'mid-high',
    rate: 'measured',
    confidence: 'high'
  },
  'irish-english': {
    label: 'Irish + English',
    traits: ['light lilt', 'playful phrasing', 'witty timing'],
    pitch: 'warm',
    rate: 'lively',
    confidence: 'medium-high'
  },
  'indian-british': {
    label: 'Indian + British',
    traits: ['rounded vowels', 'formal cadence', 'precise enunciation'],
    pitch: 'smooth',
    rate: 'balanced',
    confidence: 'strong'
  },
  'latin-american': {
    label: 'Latin + American',
    traits: ['expressive rhythm', 'warm resonance', 'easy flow'],
    pitch: 'rich',
    rate: 'energetic',
    confidence: 'high'
  },
  'african-british': {
    label: 'African + British',
    traits: ['deep resonance', 'controlled bass', 'clear emphasis'],
    pitch: 'low-mid',
    rate: 'steady',
    confidence: 'strong'
  },
  'eastern-european': {
    label: 'Eastern European + British',
    traits: ['sharp consonants', 'precise delivery', 'cool neutrality'],
    pitch: 'tight',
    rate: 'focused',
    confidence: 'medium-high'
  }
};

const eraMap = {
  none: {
    label: 'Modern cinematic',
    cadence: 'measured',
    timbre: 'cinematic',
    energy: 'steady'
  },
  victorian: {
    label: 'Victorian',
    cadence: 'formal',
    timbre: 'velvet',
    energy: 'controlled'
  },
  'jazz-age': {
    label: 'Jazz Age',
    cadence: 'laid-back swing',
    timbre: 'smoky',
    energy: 'flirtatious'
  },
  'retro-80s': {
    label: 'Retro 80s',
    cadence: 'dramatic',
    timbre: 'bright',
    energy: 'punchy'
  },
  futuristic: {
    label: 'Futuristic',
    cadence: 'precise',
    timbre: 'glossy',
    energy: 'innovative'
  },
  medieval: {
    label: 'Medieval',
    cadence: 'ceremonial',
    timbre: 'earthy',
    energy: 'grave'
  },
  'modern-era': {
    label: 'Modern cinematic',
    cadence: 'balanced',
    timbre: 'clear',
    energy: 'confident'
  }
};

const voiceTextureMap = {
  warm: 'Warm',
  smooth: 'Smooth',
  sharp: 'Sharp',
  gravelly: 'Gravelly',
  airy: 'Airy',
  bold: 'Bold'
};

const nameFragments = [
  'Velvet', 'Echo', 'Raven', 'Cinder', 'Vanta', 'Sable', 'Marlow', 'Ember', 'Cassian', 'Vale', 'Aster', 'Thorne'
];

const descriptorFragments = [
  'The Quiet Hunter',
  'The Last Lantern',
  'The Velvet Vagrant',
  'The Silver Echo',
  'The Midnight Courier',
  'The Iron Whisper',
  'The Hollow Prince',
  'The Glass Siren'
];

const sampleLines = [
  '“I know exactly what the room is afraid to hear.”',
  '“There is a difference between speaking and being understood.”',
  '“Every great lie begins with a calm voice.”',
  '“The truth is louder when it finally finds the right mouth.”',
  '“You can hear fear before you ever see it.”'
];

const styleKeywords = {
  confident: ['confident', 'bold', 'assertive', 'commanding'],
  soft: ['soft', 'gentle', 'warm', 'hushed', 'calm'],
  sinister: ['dark', 'dangerous', 'shadowy', 'brooding', 'sharp'],
  elegant: ['elegant', 'polished', 'refined', 'cultured', 'graceful'],
  nervous: ['anxious', 'frantic', 'tense', 'shaky', 'uncertain'],
  witty: ['witty', 'quick', 'playful', 'clever', 'charming']
};

const voiceNameEl = document.getElementById('voiceName');
const accentLabel = document.getElementById('accentLabel');
const eraLabel = document.getElementById('eraLabel');
const pitchLabel = document.getElementById('pitchLabel');
const rateLabel = document.getElementById('rateLabel');
const voiceSummary = document.getElementById('voiceSummary');
const textureLabel = document.getElementById('textureLabel');
const cadenceLabel = document.getElementById('cadenceLabel');
const timbreLabel = document.getElementById('timbreLabel');
const confidenceLabel = document.getElementById('confidenceLabel');
const sampleLine = document.getElementById('sampleLine');
const promptPack = document.getElementById('promptPack');
const characterInput = document.getElementById('characterInput');
const accentMode = document.getElementById('accentMode');
const eraMode = document.getElementById('eraMode');
const genderBias = document.getElementById('genderBias');
const voiceType = document.getElementById('voiceType');
const generateBtn = document.getElementById('generateBtn');
const randomizeBtn = document.getElementById('randomizeBtn');
const speakBtn = document.getElementById('speakBtn');

function getTextKeywords(text) {
  const lower = text.toLowerCase();
  const matched = [];

  Object.entries(styleKeywords).forEach(([key, words]) => {
    if (words.some((word) => lower.includes(word))) matched.push(key);
  });

  return matched.length ? matched : ['confident'];
}

function randomFrom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function buildProfile() {
  const description = characterInput.value.trim();
  const accentChoice = accentMap[accentMode.value] || accentMap.custom;
  const eraChoice = eraMap[eraMode.value] || eraMap.none;
  const texture = voiceTextureMap[voiceType.value] || 'Warm';
  const keywords = getTextKeywords(description || 'A layered, cinematic voice with charm and control.');
  const spirit = keywords[0];

  const pitchMap = {
    low: 'Low',
    'low-mid': 'Low-mid',
    mid: 'Mid',
    'mid-high': 'Mid-high',
    high: 'High',
    warm: 'Warm',
    smooth: 'Smooth',
    rich: 'Rich',
    tight: 'Tight'
  };

  const rateMap = {
    calm: 'Calm',
    measured: 'Measured',
    balanced: 'Balanced',
    lively: 'Lively',
    energetic: 'Energetic',
    steady: 'Steady',
    focused: 'Focused',
    strong: 'Strong'
  };

  const pitch = pitchMap[accentChoice.pitch] || 'Mid';
  const rate = rateMap[accentChoice.rate] || 'Balanced';
  const confidence = accentChoice.confidence || 'high';
  const cadence = eraChoice.cadence || 'balanced';
  const timbre = eraChoice.timbre || 'velvet';
  const energy = eraChoice.energy || 'steady';

  const name = `${randomFrom(nameFragments)} ${randomFrom(descriptorFragments)}`;
  const summary = `${description ? 'Based on the description, this voice feels' : 'This voice feels'} ${spirit}, ${texture.toLowerCase()} and ${energy}, with ${accentChoice.traits.join(', ')}. The delivery glides with a ${cadence} cadence and a ${timbre} timbre suited to ${eraChoice.label.toLowerCase()} character work.`;

  const prompt = {
    name, 
    accentBlend: accentChoice.label,
    era: eraChoice.label,
    genderEnergy: genderBias.value,
    voiceTexture: texture,
    pitch,
    rate,
    cadence,
    timbre,
    confidence,
    description: description || 'A charismatic narrator with a layered accent and memorable delivery.',
    sampleLine: sampleLine.textContent
  };

  voiceNameEl.textContent = name;
  accentLabel.textContent = accentChoice.label;
  eraLabel.textContent = eraChoice.label;
  pitchLabel.textContent = pitch;
  rateLabel.textContent = rate;
  textureLabel.textContent = texture;
  cadenceLabel.textContent = cadence;
  timbreLabel.textContent = timbre;
  confidenceLabel.textContent = confidence;
  voiceSummary.textContent = summary;
  promptPack.textContent = JSON.stringify(prompt, null, 2);

  const randomSample = randomFrom(sampleLines);
  sampleLine.textContent = randomSample;

  return prompt;
}

function randomizeCharacter() {
  const randomDescription = [
    'A mysterious royal investigator with a refined British rhythm, warm American softness, and sharp theatrical confidence.',
    'A wandering smuggler with a playful Irish edge, smoky low voice, and a sly, dangerous sense of humor.',
    'An ambitious diplomat from a futuristic city, speaking with polished diction, a slight Indian cadence, and precise control.',
    'A rebellious warrior from a cold mountain kingdom, carrying a heavy medieval gravity with a modern cinematic clarity.'
  ];

  characterInput.value = randomFrom(randomDescription);
  accentMode.value = randomFrom(Object.keys(accentMap));
  eraMode.value = randomFrom(Object.keys(eraMap));
  genderBias.value = randomFrom(['neutral', 'masculine', 'feminine', 'androgynous']);
  voiceType.value = randomFrom(Object.keys(voiceTextureMap));
  buildProfile();
}

function speakPreview() {
  const prompt = buildProfile();
  const utterance = new SpeechSynthesisUtterance(prompt.sampleLine.replace(/[“”]/g, ''));

  const voices = window.speechSynthesis.getVoices();
  const preferredLanguage = prompt.accentBlend.includes('Indian') ? 'en-IN' : 'en-US';
  const matchVoice = voices.find((voice) => voice.lang.startsWith(preferredLanguage)) || voices[0];

  if (matchVoice) {
    utterance.voice = matchVoice;
  }

  utterance.rate = prompt.rate === 'Lively' || prompt.rate === 'Energetic' ? 1.1 : 0.92;
  utterance.pitch = 1.0;
  utterance.volume = 1;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

generateBtn.addEventListener('click', buildProfile);
randomizeBtn.addEventListener('click', randomizeCharacter);
speakBtn.addEventListener('click', speakPreview);

if (window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = () => {
    buildProfile();
  };
}

buildProfile();
