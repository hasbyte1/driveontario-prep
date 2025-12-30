/**
 * Export questions from TypeScript to JSON for backend seeding
 * Run with: node scripts/export-questions.cjs
 */

const fs = require('fs');
const path = require('path');

const CATEGORIES = {
  SIGNS: "Road Signs & Signals",
  RULES: "Rules of the Road",
  SAFETY: "Safe Driving & Vehicle Handling",
  ALCOHOL: "Alcohol/Drugs & Penalties",
  LICENSE: "Licensing & Documents",
  MISC: "Miscellaneous"
};

// Image variable to path mapping
const imageMap = {
  'stopSign': '/assets/signs/stop-sign.png',
  'yieldSign': '/assets/signs/yield-sign.png',
  'curveWarning': '/assets/signs/curve-warning.png',
  'schoolZone': '/assets/signs/school-zone.png',
  'noEntry': '/assets/signs/no-entry.png',
  'speedLimit50': '/assets/signs/speed-limit-50.png',
  'trafficLightWarning': '/assets/signs/traffic-light-warning.png',
  'deerCrossing': '/assets/signs/deer-crossing.png',
  'turnRightOnly': '/assets/signs/turn-right-only.png',
  'steepHill': '/assets/signs/steep-hill.png',
};

// Read the source file
const questionsSource = fs.readFileSync(
  path.join(__dirname, '../src/data/questions.ts'),
  'utf-8'
);

// Find questions array
const startMarker = 'export const questions: Question[] = [';
const startIndex = questionsSource.indexOf(startMarker);
if (startIndex === -1) {
  console.error('Could not find questions array');
  process.exit(1);
}

// Extract just the questions array portion
let depth = 0;
let inArray = false;
let endIndex = startIndex + startMarker.length;

for (let i = endIndex; i < questionsSource.length; i++) {
  const char = questionsSource[i];
  if (char === '[') {
    depth++;
    inArray = true;
  } else if (char === ']') {
    if (depth === 0 && inArray) {
      endIndex = i;
      break;
    }
    depth--;
  }
}

const questionsContent = questionsSource.slice(startIndex + startMarker.length, endIndex);

// Parse individual question objects using regex
const questions = [];
const questionRegex = /\{\s*id:\s*"([^"]+)",\s*category:\s*CATEGORIES\.(\w+),\s*question:\s*"((?:[^"\\]|\\.)*)"/gs;

let match;
let fullContent = questionsContent;

// Split by closing brace followed by comma and opening brace (question boundaries)
const questionBlocks = fullContent.split(/\},\s*\{/);

for (let i = 0; i < questionBlocks.length; i++) {
  let block = questionBlocks[i];

  // Add back the braces we split on
  if (i > 0) block = '{' + block;
  if (i < questionBlocks.length - 1) block = block + '}';

  // Parse fields
  const idMatch = block.match(/id:\s*"([^"]+)"/);
  const categoryMatch = block.match(/category:\s*CATEGORIES\.(\w+)/);
  const questionMatch = block.match(/question:\s*"((?:[^"\\]|\\.)*)"/);
  const optionsMatch = block.match(/options:\s*\[([\s\S]*?)\]/);
  const correctMatch = block.match(/correctAnswer:\s*(\d+)/);
  const explanationMatch = block.match(/explanation:\s*"((?:[^"\\]|\\.)*)"/);
  const imageMatch = block.match(/imageUrl:\s*(\w+)/);

  if (idMatch && categoryMatch && questionMatch && optionsMatch && correctMatch && explanationMatch) {
    const categoryKey = categoryMatch[1];
    const category = CATEGORIES[categoryKey] || categoryKey;

    // Parse options
    const optionsStr = optionsMatch[1];
    const options = [];
    const optionMatches = optionsStr.matchAll(/"((?:[^"\\]|\\.)*)"/g);
    for (const om of optionMatches) {
      options.push(om[1].replace(/\\"/g, '"'));
    }

    const imageUrl = imageMatch ? imageMap[imageMatch[1]] : undefined;

    // Unescape the strings
    const unescape = (str) => str
      .replace(/\\"/g, '"')
      .replace(/\\'/g, "'")
      .replace(/\\n/g, '\n');

    questions.push({
      id: idMatch[1],
      category,
      question: unescape(questionMatch[1]),
      options: options.map(unescape),
      correctAnswer: parseInt(correctMatch[1], 10),
      explanation: unescape(explanationMatch[1]),
      imageUrl,
      isPremium: false,
      difficulty: category === "Alcohol/Drugs & Penalties" || category === "Safe Driving & Vehicle Handling" ? 2 : 1,
    });
  }
}

// Write to JSON file
const outputPath = path.join(__dirname, '../pocketbase/data/questions.json');
fs.writeFileSync(outputPath, JSON.stringify(questions, null, 2));

console.log(`Exported ${questions.length} questions to ${outputPath}`);

// Summary by category
const categoryCounts = {};
for (const q of questions) {
  categoryCounts[q.category] = (categoryCounts[q.category] || 0) + 1;
}

console.log('\nQuestions by category:');
for (const [category, count] of Object.entries(categoryCounts)) {
  console.log(`  ${category}: ${count}`);
}
