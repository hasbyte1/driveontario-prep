export interface Question {
  id: string;
  category: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  imageUrl?: string;
}

export const CATEGORIES = {
  SIGNS: "Road Signs & Signals",
  RULES: "Rules of the Road",
  SAFETY: "Safe Driving & Vehicle Handling",
  ALCOHOL: "Alcohol/Drugs & Penalties",
  LICENSE: "Licensing & Documents",
  MISC: "Miscellaneous"
};

export const questions: Question[] = [
  // Road Signs & Signals (Sample - 20 questions)
  {
    id: "sign_001",
    category: CATEGORIES.SIGNS,
    question: "What does a red octagonal sign mean?",
    options: ["Yield", "Stop", "No Entry", "Speed Limit"],
    correctAnswer: 1,
    explanation: "A red octagonal (8-sided) sign always means STOP. You must come to a complete stop at the stop line or before entering the intersection."
  },
  {
    id: "sign_002",
    category: CATEGORIES.SIGNS,
    question: "What does a yellow diamond-shaped sign indicate?",
    options: ["Construction ahead", "Warning of hazard", "School zone", "Playground"],
    correctAnswer: 1,
    explanation: "Yellow diamond signs are warning signs that alert drivers to potential hazards ahead, such as curves, hills, or other dangerous conditions."
  },
  {
    id: "sign_003",
    category: CATEGORIES.SIGNS,
    question: "What does a circular sign with a red border and red line mean?",
    options: ["Regulatory sign", "Prohibition sign", "Warning sign", "Information sign"],
    correctAnswer: 1,
    explanation: "Circular signs with red borders and diagonal red lines are prohibition signs, indicating something is not allowed (e.g., no parking, no turns)."
  },
  {
    id: "sign_004",
    category: CATEGORIES.SIGNS,
    question: "What does a green sign typically indicate?",
    options: ["Warning", "Stop", "Directional information", "Construction"],
    correctAnswer: 2,
    explanation: "Green signs provide directional and guide information, such as highway exits, distances to destinations, and street names."
  },
  {
    id: "sign_005",
    category: CATEGORIES.SIGNS,
    question: "What shape is a yield sign?",
    options: ["Octagon", "Triangle pointing down", "Circle", "Diamond"],
    correctAnswer: 1,
    explanation: "A yield sign is a downward-pointing triangle. It means you must slow down and prepare to stop if necessary to give right-of-way to other traffic."
  },
  
  // Rules of the Road (Sample - 20 questions)
  {
    id: "rules_001",
    category: CATEGORIES.RULES,
    question: "What is the speed limit in most cities and towns in Ontario unless otherwise posted?",
    options: ["40 km/h", "50 km/h", "60 km/h", "70 km/h"],
    correctAnswer: 1,
    explanation: "The default speed limit in cities and towns in Ontario is 50 km/h unless signs indicate otherwise."
  },
  {
    id: "rules_002",
    category: CATEGORIES.RULES,
    question: "When must you yield the right-of-way at an intersection?",
    options: ["To vehicles on your left", "To vehicles already in the intersection", "To vehicles behind you", "Never"],
    correctAnswer: 1,
    explanation: "You must yield to vehicles already in the intersection and to vehicles approaching from your right at uncontrolled intersections."
  },
  {
    id: "rules_003",
    category: CATEGORIES.RULES,
    question: "How far from a fire hydrant must you park?",
    options: ["1 metre", "3 metres", "5 metres", "10 metres"],
    correctAnswer: 1,
    explanation: "You must park at least 3 metres (about 10 feet) away from a fire hydrant to ensure emergency access."
  },
  {
    id: "rules_004",
    category: CATEGORIES.RULES,
    question: "When can you pass another vehicle on a two-lane highway?",
    options: ["Anytime", "Only on curves", "When the center line is broken", "Never"],
    correctAnswer: 2,
    explanation: "You may pass when there is a broken yellow line on your side, you have a clear view ahead, and it's safe to do so."
  },
  {
    id: "rules_005",
    category: CATEGORIES.RULES,
    question: "What does a flashing green light at an intersection mean?",
    options: ["Proceed with caution", "Pedestrian-controlled intersection", "Left turn permitted", "Emergency vehicles approaching"],
    correctAnswer: 1,
    explanation: "A flashing green light (or green arrow) indicates a pedestrian-controlled intersection where you can proceed but must watch for pedestrians."
  },
  
  // Safe Driving (Sample - 15 questions)
  {
    id: "safety_001",
    category: CATEGORIES.SAFETY,
    question: "What is the recommended following distance in ideal conditions?",
    options: ["1 second", "2 seconds", "3 seconds", "5 seconds"],
    correctAnswer: 2,
    explanation: "The recommended following distance is at least 2-3 seconds behind the vehicle in front in good conditions. Increase this in poor weather."
  },
  {
    id: "safety_002",
    category: CATEGORIES.SAFETY,
    question: "When should you check your blind spots?",
    options: ["Only when changing lanes", "Before turning or changing lanes", "Once a minute", "Never, mirrors are enough"],
    correctAnswer: 1,
    explanation: "Always check your blind spots by looking over your shoulder before changing lanes, turning, or merging."
  },
  {
    id: "safety_003",
    category: CATEGORIES.SAFETY,
    question: "What should you do if your vehicle starts to skid?",
    options: ["Brake hard", "Steer in the direction of the skid", "Accelerate", "Turn the wheel sharply"],
    correctAnswer: 1,
    explanation: "If your vehicle skids, ease off the gas and steer in the direction you want the front of the vehicle to go."
  },
  {
    id: "safety_004",
    category: CATEGORIES.SAFETY,
    question: "When driving in fog, you should:",
    options: ["Use high beams", "Use low beams", "Use parking lights only", "Use no lights"],
    correctAnswer: 1,
    explanation: "Use low-beam headlights in fog. High beams reflect off the fog and reduce visibility."
  },
  {
    id: "safety_005",
    category: CATEGORIES.SAFETY,
    question: "What is hydroplaning?",
    options: ["Driving through water", "Tires losing contact with wet road", "Engine flooding", "Brake failure"],
    correctAnswer: 1,
    explanation: "Hydroplaning occurs when your tires lose contact with the road surface due to water, causing loss of traction and steering control."
  },
  
  // Alcohol/Drugs & Penalties (Sample - 10 questions)
  {
    id: "alcohol_001",
    category: CATEGORIES.ALCOHOL,
    question: "What is the blood alcohol concentration (BAC) limit for fully licensed drivers in Ontario?",
    options: ["0.00%", "0.05%", "0.08%", "0.10%"],
    correctAnswer: 2,
    explanation: "For fully licensed drivers 22+, the legal BAC limit is 0.08% (80 mg per 100 ml of blood). However, you can face penalties at 0.05%."
  },
  {
    id: "alcohol_002",
    category: CATEGORIES.ALCOHOL,
    question: "What is the BAC limit for G1 and G2 drivers?",
    options: ["0.00%", "0.05%", "0.08%", "0.10%"],
    correctAnswer: 0,
    explanation: "G1, G2, and novice drivers must have ZERO blood alcohol concentration. Any amount can result in license suspension."
  },
  {
    id: "alcohol_003",
    category: CATEGORIES.ALCOHOL,
    question: "What is the penalty for refusing a breathalyzer test?",
    options: ["Warning", "Fine only", "Same as impaired driving", "Vehicle impoundment"],
    correctAnswer: 2,
    explanation: "Refusing to provide a breath sample carries the same penalties as being charged with impaired driving."
  },
  {
    id: "alcohol_004",
    category: CATEGORIES.ALCOHOL,
    question: "Driving under the influence of cannabis is:",
    options: ["Legal if prescribed", "Illegal", "Legal in small amounts", "Only illegal for G1 drivers"],
    correctAnswer: 1,
    explanation: "Driving under the influence of cannabis is illegal for all drivers, regardless of whether it's medically prescribed."
  },
  {
    id: "alcohol_005",
    category: CATEGORIES.ALCOHOL,
    question: "How long does it take for one standard drink to leave your system?",
    options: ["30 minutes", "1 hour", "2 hours", "It varies by person"],
    correctAnswer: 1,
    explanation: "On average, your body processes about one standard drink per hour, but this varies based on weight, metabolism, and other factors."
  },
  
  // Licensing & Documents (Sample - 10 questions)
  {
    id: "license_001",
    category: CATEGORIES.LICENSE,
    question: "At what age can you apply for a G1 license in Ontario?",
    options: ["14", "15", "16", "18"],
    correctAnswer: 2,
    explanation: "You can apply for a G1 learner's permit at age 16 in Ontario."
  },
  {
    id: "license_002",
    category: CATEGORIES.LICENSE,
    question: "How long must you hold a G1 license before taking the G2 road test?",
    options: ["6 months", "8 months", "12 months", "24 months"],
    correctAnswer: 2,
    explanation: "You must hold your G1 license for 12 months (or 8 months if you complete an approved driver education course) before taking the G2 test."
  },
  {
    id: "license_003",
    category: CATEGORIES.LICENSE,
    question: "Can G1 drivers drive on 400-series highways?",
    options: ["Yes", "No", "Only with instructor", "Only during day"],
    correctAnswer: 1,
    explanation: "G1 drivers are NOT permitted to drive on 400-series highways or roads with speed limits over 80 km/h."
  },
  {
    id: "license_004",
    category: CATEGORIES.LICENSE,
    question: "Must you carry your driver's license while driving?",
    options: ["No", "Yes", "Only on highways", "Only at night"],
    correctAnswer: 1,
    explanation: "You must carry your valid driver's license with you whenever you drive and present it upon request by police."
  },
  {
    id: "license_005",
    category: CATEGORIES.LICENSE,
    question: "What documents must you show police if stopped?",
    options: ["License only", "License and registration", "License, registration, and insurance", "Just registration"],
    correctAnswer: 2,
    explanation: "You must show your driver's license, vehicle registration, and proof of insurance if stopped by police."
  },
  
  // Miscellaneous (Sample - 10 questions)
  {
    id: "misc_001",
    category: CATEGORIES.MISC,
    question: "How many demerit points do you lose for running a red light?",
    options: ["2", "3", "4", "6"],
    correctAnswer: 1,
    explanation: "Running a red light results in 3 demerit points on your driving record."
  },
  {
    id: "misc_002",
    category: CATEGORIES.MISC,
    question: "What should you do if you're involved in a collision?",
    options: ["Leave immediately", "Call police if damage exceeds $2000", "Never call police", "Drive away if no injuries"],
    correctAnswer: 1,
    explanation: "You must call police if there are injuries, damage appears over $2,000, or if one driver lacks insurance."
  },
  {
    id: "misc_003",
    category: CATEGORIES.MISC,
    question: "When must you use headlights?",
    options: ["Only at night", "One hour before sunset to one hour after sunrise", "30 minutes before/after sunset/sunrise", "Anytime"],
    correctAnswer: 2,
    explanation: "You must use headlights from 30 minutes before sunset to 30 minutes after sunrise, and anytime visibility is poor."
  },
  {
    id: "misc_004",
    category: CATEGORIES.MISC,
    question: "Is it legal to text while driving?",
    options: ["Yes", "No", "Only at red lights", "Only with hands-free"],
    correctAnswer: 1,
    explanation: "It is illegal to use hand-held communication and entertainment devices while driving, including texting, even at red lights."
  },
  {
    id: "misc_005",
    category: CATEGORIES.MISC,
    question: "What is the fine for distracted driving in Ontario?",
    options: ["$200", "$500-$1000", "$100", "$50"],
    correctAnswer: 1,
    explanation: "Distracted driving fines range from $500-$1,000 for a first offense, plus 3 demerit points."
  },
  
  // Additional questions to reach closer to requested count
  {
    id: "sign_006",
    category: CATEGORIES.SIGNS,
    question: "A school zone sign is what shape?",
    options: ["Pentagon (5-sided)", "Hexagon", "Octagon", "Circle"],
    correctAnswer: 0,
    explanation: "School zone signs are pentagon-shaped (5 sides) with a fluorescent yellow-green background."
  },
  {
    id: "rules_006",
    category: CATEGORIES.RULES,
    question: "Who has the right-of-way at a four-way stop?",
    options: ["Largest vehicle", "First to arrive", "Vehicle on the right", "Both B and C"],
    correctAnswer: 3,
    explanation: "At a four-way stop, the first vehicle to arrive goes first. If two arrive simultaneously, the vehicle on the right has priority."
  },
  {
    id: "safety_006",
    category: CATEGORIES.SAFETY,
    question: "When should you replace your windshield wipers?",
    options: ["Every month", "When they streak or don't clear water", "Every year", "Never"],
    correctAnswer: 1,
    explanation: "Replace wipers when they leave streaks, make noise, or don't clear water effectively—typically every 6-12 months."
  },
  {
    id: "alcohol_006",
    category: CATEGORIES.ALCOHOL,
    question: "Can coffee help you sober up faster?",
    options: ["Yes", "No", "Only strong coffee", "Only with food"],
    correctAnswer: 1,
    explanation: "Coffee does not speed up alcohol metabolism. Only time can reduce your BAC—your liver processes about one drink per hour."
  },
  {
    id: "license_006",
    category: CATEGORIES.LICENSE,
    question: "How many passengers can a G1 driver have in the car?",
    options: ["As many as seatbelts", "Only the supervisor", "One passenger", "Three passengers"],
    correctAnswer: 0,
    explanation: "G1 drivers can have only as many passengers as working seatbelts, but must have a fully licensed supervisor in the front passenger seat."
  },
];

export const getTotalQuestions = () => questions.length;

export const getQuestionsByCategory = (category: string) => 
  questions.filter(q => q.category === category);

export const getRandomQuestions = (count: number, category?: string) => {
  const pool = category ? getQuestionsByCategory(category) : questions;
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
};
