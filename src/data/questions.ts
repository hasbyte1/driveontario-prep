// Import road sign images
import stopSign from "@/assets/signs/stop-sign.png";
import yieldSign from "@/assets/signs/yield-sign.png";
import curveWarning from "@/assets/signs/curve-warning.png";
import schoolZone from "@/assets/signs/school-zone.png";
import noEntry from "@/assets/signs/no-entry.png";
import speedLimit50 from "@/assets/signs/speed-limit-50.png";
import trafficLightWarning from "@/assets/signs/traffic-light-warning.png";
import deerCrossing from "@/assets/signs/deer-crossing.png";
import turnRightOnly from "@/assets/signs/turn-right-only.png";
import steepHill from "@/assets/signs/steep-hill.png";

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
  // ========== ROAD SIGNS & SIGNALS (100 questions) ==========
  {
    id: "sign_001",
    category: CATEGORIES.SIGNS,
    question: "What does this sign mean?",
    options: ["Yield", "Stop", "No Entry", "Speed Limit"],
    correctAnswer: 1,
    explanation: "A red octagonal (8-sided) sign always means STOP. You must come to a complete stop at the stop line or before entering the intersection.",
    imageUrl: stopSign
  },
  {
    id: "sign_002",
    category: CATEGORIES.SIGNS,
    question: "What does a yellow diamond-shaped sign indicate?",
    options: ["Construction ahead", "Warning of hazard", "School zone", "Playground"],
    correctAnswer: 1,
    explanation: "Yellow diamond signs are warning signs that alert drivers to potential hazards ahead, such as curves, hills, or other dangerous conditions.",
    imageUrl: curveWarning
  },
  {
    id: "sign_003",
    category: CATEGORIES.SIGNS,
    question: "What does this sign indicate?",
    options: ["Regulatory sign", "Prohibition sign", "Warning sign", "Information sign"],
    correctAnswer: 1,
    explanation: "Circular signs with red borders and diagonal red lines are prohibition signs, indicating something is not allowed (e.g., no parking, no turns).",
    imageUrl: noEntry
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
    question: "What does this sign mean?",
    options: ["Stop", "Slow down and give way", "No parking", "One way"],
    correctAnswer: 1,
    explanation: "A yield sign is a downward-pointing triangle. It means you must slow down and prepare to stop if necessary to give right-of-way to other traffic.",
    imageUrl: yieldSign
  },
  {
    id: "sign_006",
    category: CATEGORIES.SIGNS,
    question: "What shape is a school zone sign?",
    options: ["Pentagon (5-sided)", "Hexagon", "Octagon", "Circle"],
    correctAnswer: 0,
    explanation: "School zone signs are pentagon-shaped (5 sides) with a fluorescent yellow-green background.",
    imageUrl: schoolZone
  },
  {
    id: "sign_007",
    category: CATEGORIES.SIGNS,
    question: "What does this sign indicate?",
    options: ["Maximum speed", "Minimum speed", "Average speed", "Recommended speed"],
    correctAnswer: 0,
    explanation: "White rectangular signs with black numbers indicate maximum speed limits. You cannot exceed this speed under any conditions.",
    imageUrl: speedLimit50
  },
  {
    id: "sign_008",
    category: CATEGORIES.SIGNS,
    question: "What does this warning sign mean?",
    options: ["Railroad crossing", "Traffic signals ahead", "Intersection", "Construction"],
    correctAnswer: 1,
    explanation: "This diamond warning sign alerts you that traffic signals are ahead. Slow down and be prepared to stop.",
    imageUrl: trafficLightWarning
  },
  {
    id: "sign_009",
    category: CATEGORIES.SIGNS,
    question: "What does this sign warn about?",
    options: ["Farm animals", "Wildlife crossing", "Zoo ahead", "Animal shelter"],
    correctAnswer: 1,
    explanation: "Yellow diamond signs with animal silhouettes warn of wildlife crossing areas. Reduce speed and watch for animals.",
    imageUrl: deerCrossing
  },
  {
    id: "sign_010",
    category: CATEGORIES.SIGNS,
    question: "What does this blue circular sign indicate?",
    options: ["Turn right only", "No right turn", "Right lane ends", "Keep right"],
    correctAnswer: 0,
    explanation: "Blue circular signs with white arrows are mandatory direction signs, indicating the only permitted direction of travel.",
    imageUrl: turnRightOnly
  },
  {
    id: "sign_011",
    category: CATEGORIES.SIGNS,
    question: "What color are construction zone signs?",
    options: ["Yellow", "Orange", "Red", "Blue"],
    correctAnswer: 1,
    explanation: "Construction zone and temporary condition signs are orange with black lettering or symbols."
  },
  {
    id: "sign_012",
    category: CATEGORIES.SIGNS,
    question: "What does a white X with two Rs mean at a railway crossing?",
    options: ["Railroad crossing", "Rest area", "Restricted zone", "Roundabout"],
    correctAnswer: 0,
    explanation: "The white X with RR (Railroad) indicates a railway crossing. Always look and listen before crossing."
  },
  {
    id: "sign_013",
    category: CATEGORIES.SIGNS,
    question: "What does a red circle with a blue background and white P with a line through it mean?",
    options: ["Parking permitted", "No parking", "Paid parking", "Priority parking"],
    correctAnswer: 1,
    explanation: "This sign prohibits parking in the area. The red circle with a line through indicates prohibition."
  },
  {
    id: "sign_014",
    category: CATEGORIES.SIGNS,
    question: "What do brown signs typically indicate?",
    options: ["Hazards", "Recreation and cultural sites", "Detours", "Construction"],
    correctAnswer: 1,
    explanation: "Brown signs guide you to parks, historic sites, museums, and other recreational or cultural points of interest."
  },
  {
    id: "sign_015",
    category: CATEGORIES.SIGNS,
    question: "What does a flashing yellow light at an intersection mean?",
    options: ["Stop", "Proceed with caution", "Speed up", "No entry"],
    correctAnswer: 1,
    explanation: "A flashing yellow light means slow down and proceed with caution. Check for traffic before entering the intersection."
  },
  {
    id: "sign_016",
    category: CATEGORIES.SIGNS,
    question: "What does a flashing red light at an intersection mean?",
    options: ["Proceed with caution", "Treat it like a stop sign", "Speed limit enforced", "One-way street"],
    correctAnswer: 1,
    explanation: "A flashing red light means you must come to a complete stop and proceed when safe, treating it like a stop sign."
  },
  {
    id: "sign_017",
    category: CATEGORIES.SIGNS,
    question: "What does this warning sign indicate?",
    options: ["Speed bump", "Steep hill ahead", "Low bridge", "Narrow road"],
    correctAnswer: 1,
    explanation: "This diamond sign warns of a steep hill or grade ahead. Use lower gears and maintain control.",
    imageUrl: steepHill
  },
  {
    id: "sign_018",
    category: CATEGORIES.SIGNS,
    question: "What does a white sign with black arrow and the word 'ONLY' mean?",
    options: ["Recommended direction", "Mandatory turn direction", "Speed limit", "Lane ends"],
    correctAnswer: 1,
    explanation: "White rectangular signs with arrows and 'ONLY' indicate the only permitted direction of travel from that lane."
  },
  {
    id: "sign_019",
    category: CATEGORIES.SIGNS,
    question: "What do white pavement markings generally indicate?",
    options: ["Parking spaces", "Traffic going in the same direction", "Traffic going in opposite directions", "Pedestrian crossings"],
    correctAnswer: 1,
    explanation: "White pavement markings separate lanes of traffic moving in the same direction."
  },
  {
    id: "sign_020",
    category: CATEGORIES.SIGNS,
    question: "What do yellow pavement markings indicate?",
    options: ["Same direction traffic", "Opposite direction traffic", "Parking areas", "Bike lanes"],
    correctAnswer: 1,
    explanation: "Yellow pavement markings separate traffic moving in opposite directions or mark the left edge of divided highways."
  },

  // ========== RULES OF THE ROAD (150 questions) ==========
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
    explanation: "You may pass when there is a broken yellow line on your side, you have a clear view ahead, and it is safe to do so."
  },
  {
    id: "rules_005",
    category: CATEGORIES.RULES,
    question: "What does a flashing green light or green arrow at an intersection mean?",
    options: ["Proceed with caution", "Pedestrian-controlled intersection", "Emergency vehicles", "School zone"],
    correctAnswer: 1,
    explanation: "A flashing green light or green arrow indicates a pedestrian-controlled intersection. You can proceed but must watch for pedestrians."
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
    id: "rules_007",
    category: CATEGORIES.RULES,
    question: "Can you turn right on a red light in Ontario?",
    options: ["Never", "Yes, after stopping and yielding", "Only on highways", "Only at night"],
    correctAnswer: 1,
    explanation: "You can turn right on a red light after coming to a complete stop and yielding to traffic and pedestrians, unless a sign prohibits it."
  },
  {
    id: "rules_008",
    category: CATEGORIES.RULES,
    question: "What is the maximum speed limit on provincial highways in Ontario?",
    options: ["80 km/h", "90 km/h", "100 km/h", "110 km/h"],
    correctAnswer: 2,
    explanation: "The maximum speed limit on most provincial highways (400-series) in Ontario is 100 km/h unless posted otherwise."
  },
  {
    id: "rules_009",
    category: CATEGORIES.RULES,
    question: "How close to a crosswalk can you park?",
    options: ["1 metre", "3 metres", "6 metres", "No restriction"],
    correctAnswer: 2,
    explanation: "You must not park within 6 metres (about 20 feet) of a crosswalk at an intersection."
  },
  {
    id: "rules_010",
    category: CATEGORIES.RULES,
    question: "When are you required to use your horn?",
    options: ["When passing", "In emergencies only", "Every 5 minutes", "Never"],
    correctAnswer: 1,
    explanation: "Use your horn only when reasonably necessary to ensure safe operation or to warn others of your presence in emergencies."
  },
  {
    id: "rules_011",
    category: CATEGORIES.RULES,
    question: "Can you pass a school bus with flashing red lights?",
    options: ["Yes", "No", "Only on highways", "Only if no children visible"],
    correctAnswer: 1,
    explanation: "You must stop at least 20 metres away when a school bus has its red lights flashing. Passing is strictly prohibited."
  },
  {
    id: "rules_012",
    category: CATEGORIES.RULES,
    question: "What should you do when an emergency vehicle approaches with lights and sirens?",
    options: ["Speed up", "Pull to the right and stop", "Continue driving", "Change lanes"],
    correctAnswer: 1,
    explanation: "Pull to the right side of the road and stop to let emergency vehicles pass safely."
  },
  {
    id: "rules_013",
    category: CATEGORIES.RULES,
    question: "How far must you stop from a stopped school bus on an undivided road?",
    options: ["5 metres", "10 metres", "20 metres", "30 metres"],
    correctAnswer: 2,
    explanation: "You must stop at least 20 metres (about 60 feet) away from a school bus with flashing red lights on an undivided road."
  },
  {
    id: "rules_014",
    category: CATEGORIES.RULES,
    question: "What is the speed limit in a school zone when children are present?",
    options: ["20 km/h", "30 km/h", "40 km/h", "50 km/h"],
    correctAnswer: 2,
    explanation: "When the sign is in effect (usually when children are present), the speed limit in school zones is typically 40 km/h."
  },
  {
    id: "rules_015",
    category: CATEGORIES.RULES,
    question: "Can you make a U-turn on a highway?",
    options: ["Yes, anytime", "No, never", "Only where permitted by signs", "Only at night"],
    correctAnswer: 2,
    explanation: "U-turns on highways are only allowed where specifically permitted by signs. They are prohibited in most areas."
  },
  {
    id: "rules_016",
    category: CATEGORIES.RULES,
    question: "When entering a highway from an acceleration lane, you should:",
    options: ["Stop and wait", "Match highway speed", "Drive slowly", "Use high beams"],
    correctAnswer: 1,
    explanation: "Use the acceleration lane to match the speed of highway traffic before merging. Never stop in an acceleration lane."
  },
  {
    id: "rules_017",
    category: CATEGORIES.RULES,
    question: "How far from a stop sign must you stop if there is no stop line?",
    options: ["At the sign", "Before the crosswalk", "At the intersection", "10 metres back"],
    correctAnswer: 1,
    explanation: "If there is no stop line, stop before entering the crosswalk. If no crosswalk, stop at the edge of the intersection."
  },
  {
    id: "rules_018",
    category: CATEGORIES.RULES,
    question: "When parking uphill with a curb, which way should you turn your wheels?",
    options: ["Toward the curb", "Away from the curb", "Straight", "It does not matter"],
    correctAnswer: 1,
    explanation: "When parking uphill with a curb, turn your wheels away from the curb so the vehicle rolls back into the curb if brakes fail."
  },
  {
    id: "rules_019",
    category: CATEGORIES.RULES,
    question: "When parking downhill, which way should you turn your wheels?",
    options: ["Away from curb", "Toward the curb", "Straight", "Left always"],
    correctAnswer: 1,
    explanation: "When parking downhill, turn your wheels toward the curb so the curb stops the vehicle if it rolls."
  },
  {
    id: "rules_020",
    category: CATEGORIES.RULES,
    question: "What does a solid yellow line on your side of the center line mean?",
    options: ["Passing permitted", "Passing not permitted", "Yield", "Stop"],
    correctAnswer: 1,
    explanation: "A solid yellow line on your side means you cannot pass vehicles ahead. Passing is only allowed with a broken line."
  },

  // ========== SAFE DRIVING & VEHICLE HANDLING (100 questions) ==========
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
    options: ["Brake hard", "Steer in the direction you want to go", "Accelerate", "Turn wheel opposite"],
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
  {
    id: "safety_006",
    category: CATEGORIES.SAFETY,
    question: "When should you replace your windshield wipers?",
    options: ["Every month", "When they streak or don't clear water", "Every year", "Never"],
    correctAnswer: 1,
    explanation: "Replace wipers when they leave streaks, make noise, or don't clear water effectively—typically every 6-12 months."
  },
  {
    id: "safety_007",
    category: CATEGORIES.SAFETY,
    question: "What should you do if your brakes fail?",
    options: ["Pump the brake pedal", "Use parking brake gradually", "Downshift", "All of the above"],
    correctAnswer: 3,
    explanation: "If brakes fail, pump the pedal, downshift to lower gears, and use the parking brake gradually to slow down."
  },
  {
    id: "safety_008",
    category: CATEGORIES.SAFETY,
    question: "When driving on ice, you should:",
    options: ["Brake hard", "Accelerate quickly", "Drive slowly and smoothly", "Use cruise control"],
    correctAnswer: 2,
    explanation: "Drive slowly and make smooth, gradual movements when on ice. Sudden braking or steering can cause skids."
  },
  {
    id: "safety_009",
    category: CATEGORIES.SAFETY,
    question: "What is the safest way to handle a tire blowout?",
    options: ["Brake immediately", "Hold steering firmly and slow gradually", "Swerve to shoulder", "Accelerate"],
    correctAnswer: 1,
    explanation: "Hold the steering wheel firmly, ease off the gas, and slow down gradually. Avoid sudden braking or steering."
  },
  {
    id: "safety_010",
    category: CATEGORIES.SAFETY,
    question: "How often should you check your tire pressure?",
    options: ["Daily", "Weekly", "Monthly", "Yearly"],
    correctAnswer: 2,
    explanation: "Check tire pressure at least once a month and before long trips. Proper pressure improves safety and fuel efficiency."
  },
  {
    id: "safety_011",
    category: CATEGORIES.SAFETY,
    question: "When should you use your vehicles hazard lights?",
    options: ["In heavy rain", "When pulled over/stopped", "While driving slowly", "In traffic"],
    correctAnswer: 1,
    explanation: "Use hazard lights when your vehicle is stopped or disabled on the road to warn other drivers."
  },
  {
    id: "safety_012",
    category: CATEGORIES.SAFETY,
    question: "What should you do if you miss your exit on a highway?",
    options: ["Back up", "Stop and reverse", "Continue to next exit", "Cross median"],
    correctAnswer: 2,
    explanation: "Never stop or back up on a highway. Continue to the next exit and turn around safely."
  },
  {
    id: "safety_013",
    category: CATEGORIES.SAFETY,
    question: "What is the correct hand position on the steering wheel?",
    options: ["12 and 6 o'clock", "9 and 3 o'clock", "10 and 2 o'clock", "Any position"],
    correctAnswer: 1,
    explanation: "The recommended hand position is 9 and 3 o'clock for better control and safety with airbags."
  },
  {
    id: "safety_014",
    category: CATEGORIES.SAFETY,
    question: "How should you adjust your mirrors?",
    options: ["See your car doors", "Minimize blind spots", "See behind only", "Point downward"],
    correctAnswer: 1,
    explanation: "Adjust side mirrors to minimize blind spots. You should barely see the side of your car."
  },
  {
    id: "safety_015",
    category: CATEGORIES.SAFETY,
    question: "When is it safe to use cruise control?",
    options: ["In all conditions", "On dry highways only", "In rain", "On icy roads"],
    correctAnswer: 1,
    explanation: "Use cruise control only on dry highways with light traffic. Never use it in wet, icy, or heavy traffic conditions."
  },
  {
    id: "safety_016",
    category: CATEGORIES.SAFETY,
    question: "What should you do if an oncoming vehicle has high beams on?",
    options: ["Use your high beams", "Look toward right side of road", "Flash your lights", "Close eyes briefly"],
    correctAnswer: 1,
    explanation: "Look toward the right side of the road to avoid being blinded. Do not retaliate with your high beams."
  },
  {
    id: "safety_017",
    category: CATEGORIES.SAFETY,
    question: "What is the proper way to enter a curve?",
    options: ["Accelerate through it", "Brake during the curve", "Slow before entering", "Maintain speed"],
    correctAnswer: 2,
    explanation: "Slow down before entering a curve, then maintain steady speed through it. Braking in a curve can cause loss of control."
  },
  {
    id: "safety_018",
    category: CATEGORIES.SAFETY,
    question: "When should you check your oil level?",
    options: ["While engine is hot", "When engine is cold/off", "While driving", "Never"],
    correctAnswer: 1,
    explanation: "Check oil when the engine is cold or has been off for several minutes for an accurate reading."
  },
  {
    id: "safety_019",
    category: CATEGORIES.SAFETY,
    question: "What causes most skids?",
    options: ["Poor tires", "Driver error", "Road conditions", "Vehicle age"],
    correctAnswer: 1,
    explanation: "Most skids are caused by driver error—driving too fast for conditions, sudden braking, or sharp turns."
  },
  {
    id: "safety_020",
    category: CATEGORIES.SAFETY,
    question: "How can you prevent carbon monoxide poisoning in your vehicle?",
    options: ["Regular exhaust checks", "Keep windows open", "Don't idle in garage", "All of the above"],
    correctAnswer: 3,
    explanation: "Prevent CO poisoning by maintaining your exhaust system, never idling in closed spaces, and ensuring ventilation."
  },

  // ========== ALCOHOL/DRUGS & PENALTIES (50 questions) ==========
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
    explanation: "Driving under the influence of cannabis is illegal for all drivers, regardless of whether it is medically prescribed."
  },
  {
    id: "alcohol_005",
    category: CATEGORIES.ALCOHOL,
    question: "How long does it take for one standard drink to leave your system?",
    options: ["30 minutes", "1 hour", "2 hours", "It varies by person"],
    correctAnswer: 1,
    explanation: "On average, your body processes about one standard drink per hour, but this varies based on weight, metabolism, and other factors."
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
    id: "alcohol_007",
    category: CATEGORIES.ALCOHOL,
    question: "What happens if you are caught driving with a BAC between 0.05% and 0.08%?",
    options: ["Nothing", "Warning only", "License suspension and fine", "Jail time"],
    correctAnswer: 2,
    explanation: "With BAC between 0.05% and 0.08%, you face immediate license suspension, fines, and vehicle impoundment (Warn Range)."
  },
  {
    id: "alcohol_008",
    category: CATEGORIES.ALCOHOL,
    question: "How long can you lose your license for impaired driving (first offense)?",
    options: ["1 month", "3 months", "1 year minimum", "2 years"],
    correctAnswer: 2,
    explanation: "A first impaired driving conviction results in a minimum 1-year license suspension, plus fines and possible jail time."
  },
  {
    id: "alcohol_009",
    category: CATEGORIES.ALCOHOL,
    question: "Does drinking on an empty stomach affect you more?",
    options: ["No", "Yes", "Only with wine", "Only with beer"],
    correctAnswer: 1,
    explanation: "Drinking on an empty stomach causes alcohol to be absorbed faster, increasing BAC and impairment more quickly."
  },
  {
    id: "alcohol_010",
    category: CATEGORIES.ALCOHOL,
    question: "Can medications affect your driving ability?",
    options: ["No", "Yes", "Only prescriptions", "Only illegal drugs"],
    correctAnswer: 1,
    explanation: "Many medications (prescription and over-the-counter) can impair driving. Always check labels and consult your doctor."
  },

  // ========== LICENSING & DOCUMENTS (50 questions) ==========
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
  {
    id: "license_006",
    category: CATEGORIES.LICENSE,
    question: "How many passengers can a G1 driver have in the car?",
    options: ["As many as seatbelts", "Only the supervisor", "One passenger", "Three passengers"],
    correctAnswer: 0,
    explanation: "G1 drivers can have only as many passengers as working seatbelts, but must have a fully licensed supervisor in the front passenger seat."
  },
  {
    id: "license_007",
    category: CATEGORIES.LICENSE,
    question: "What is the BAC level for drivers under 21 years old?",
    options: ["0.00%", "0.05%", "0.08%", "0.10%"],
    correctAnswer: 0,
    explanation: "Drivers under 21 must maintain zero BAC (0.00%). Any detectable alcohol results in penalties."
  },
  {
    id: "license_008",
    category: CATEGORIES.LICENSE,
    question: "Can G1 drivers drive between midnight and 5 AM?",
    options: ["Yes", "No", "Only on weekends", "Only with parent"],
    correctAnswer: 1,
    explanation: "G1 drivers cannot drive between midnight and 5 AM unless accompanied by a driving instructor."
  },
  {
    id: "license_009",
    category: CATEGORIES.LICENSE,
    question: "What BAC level applies to commercial drivers?",
    options: ["0.00%", "0.04%", "0.05%", "0.08%"],
    correctAnswer: 1,
    explanation: "Commercial drivers must maintain a BAC below 0.04% while operating commercial vehicles."
  },
  {
    id: "license_010",
    category: CATEGORIES.LICENSE,
    question: "How long is a G2 license valid before you must take the full G test?",
    options: ["2 years", "5 years", "10 years", "Indefinitely"],
    correctAnswer: 1,
    explanation: "You have 5 years to take the G road test after obtaining your G2 license before having to restart the process."
  },

  // ========== MISCELLANEOUS (50 questions) ==========
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
    question: "What should you do if you are involved in a collision?",
    options: ["Leave immediately", "Call police if damage exceeds $2000", "Never call police", "Drive away if no injuries"],
    correctAnswer: 1,
    explanation: "You must call police if there are injuries, damage appears over $2,000, or if one driver lacks insurance."
  },
  {
    id: "misc_003",
    category: CATEGORIES.MISC,
    question: "When must you use headlights?",
    options: ["Only at night", "One hour before sunset", "30 minutes before/after sunset/sunrise", "Anytime"],
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
  {
    id: "misc_006",
    category: CATEGORIES.MISC,
    question: "How many demerit points result in license suspension for G1/G2 drivers?",
    options: ["6 points", "9 points", "12 points", "15 points"],
    correctAnswer: 1,
    explanation: "G1 and G2 drivers face license suspension at 9 or more demerit points (fully licensed drivers at 15)."
  },
  {
    id: "misc_007",
    category: CATEGORIES.MISC,
    question: "Must you wear a seatbelt in Ontario?",
    options: ["No", "Yes", "Only on highways", "Only in front seat"],
    correctAnswer: 1,
    explanation: "Everyone in the vehicle must wear a properly fastened seatbelt. It is the law in Ontario."
  },
  {
    id: "misc_008",
    category: CATEGORIES.MISC,
    question: "Can you drive in Ontario with an out-of-country license?",
    options: ["No", "Yes, for up to 60 days", "Yes, indefinitely", "Only with translator"],
    correctAnswer: 1,
    explanation: "Visitors can drive in Ontario with a valid license from their country for up to 60 days."
  },
  {
    id: "misc_009",
    category: CATEGORIES.MISC,
    question: "What does the term 'defensive driving' mean?",
    options: ["Aggressive tactics", "Anticipating hazards", "Driving slowly", "Honking frequently"],
    correctAnswer: 1,
    explanation: "Defensive driving means anticipating potential hazards and taking actions to avoid collisions caused by others."
  },
  {
    id: "misc_010",
    category: CATEGORIES.MISC,
    question: "How often must vehicles undergo emissions testing in Ontario?",
    options: ["Annually", "Every 2 years", "Every 5 years", "No longer required"],
    correctAnswer: 3,
    explanation: "As of April 2019, Ontario no longer requires Drive Clean emissions testing for light vehicles."
  },
  
  // ========== ADDITIONAL RULES OF THE ROAD QUESTIONS ==========
  {
    id: "rules_201",
    category: CATEGORIES.RULES,
    question: "How far must you stop from a railway crossing when a train is approaching?",
    options: ["At least 3 metres", "At least 5 metres", "At least 10 metres", "At least 15 metres"],
    correctAnswer: 1,
    explanation: "When a train is coming, you must stop at least 5 metres from the nearest rail or gate. Never race a train to a crossing."
  },
  {
    id: "rules_202",
    category: CATEGORIES.RULES,
    question: "What should you do if you get trapped on a railway crossing?",
    options: ["Stay in vehicle", "Immediately get everyone out and away", "Sound horn", "Wait for help"],
    correctAnswer: 1,
    explanation: "If trapped on a crossing, immediately get everyone out and away from the vehicle. Move to a safe place and contact authorities."
  },
  {
    id: "rules_203",
    category: CATEGORIES.RULES,
    question: "How far must you stop behind a stopped school bus with flashing red lights?",
    options: ["10 metres", "15 metres", "20 metres", "30 metres"],
    correctAnswer: 2,
    explanation: "When approaching a stopped school bus from behind with its red lights flashing, you must stop at least 20 metres away."
  },
  {
    id: "rules_204",
    category: CATEGORIES.RULES,
    question: "How many demerit points do you get for failing to stop for a school bus?",
    options: ["3 points", "4 points", "6 points", "7 points"],
    correctAnswer: 2,
    explanation: "Failing to stop for a stopped school bus with flashing red lights results in 6 demerit points for a first offence, plus heavy fines."
  },
  {
    id: "rules_205",
    category: CATEGORIES.RULES,
    question: "When do school buses use their upper alternating red lights?",
    options: ["Always when moving", "Only at school zones", "When stopped for loading/unloading", "At railway crossings"],
    correctAnswer: 2,
    explanation: "School buses use upper alternating red flashing lights when stopped to load or unload passengers. You must stop when you see these lights."
  },
  {
    id: "rules_206",
    category: CATEGORIES.RULES,
    question: "Must you stop for a school bus on a road with a median strip if you're approaching from the front?",
    options: ["Yes, always", "No, only vehicles behind must stop", "Only during school hours", "Only if children are visible"],
    correctAnswer: 1,
    explanation: "On a road with a median strip (physical barrier), only vehicles coming from behind the bus must stop. However, always be cautious and watch for children."
  },
  {
    id: "rules_207",
    category: CATEGORIES.RULES,
    question: "At a pedestrian crossover, when can you proceed after pedestrians have crossed?",
    options: ["As soon as they're off your lane", "When they reach the other side", "Only when completely on sidewalk", "After 3 seconds"],
    correctAnswer: 2,
    explanation: "You must wait until pedestrians and school crossing guards have crossed and are safely on the sidewalk before proceeding."
  },
  {
    id: "rules_208",
    category: CATEGORIES.RULES,
    question: "Can you pass another vehicle within 30 metres of a pedestrian crossover?",
    options: ["Yes", "No", "Only if no pedestrians present", "Yes, if safe"],
    correctAnswer: 1,
    explanation: "You must not pass any vehicle within 30 metres of a pedestrian crossover for safety reasons."
  },
  {
    id: "rules_209",
    category: CATEGORIES.RULES,
    question: "At an uncontrolled intersection, if two vehicles arrive at the same time, who has the right-of-way?",
    options: ["Vehicle on the left", "Vehicle on the right", "Larger vehicle", "Vehicle going straight"],
    correctAnswer: 1,
    explanation: "At an uncontrolled intersection where vehicles arrive at the same time, the driver on the left must yield to the driver on the right."
  },
  {
    id: "rules_210",
    category: CATEGORIES.RULES,
    question: "What must you do when entering a road from a private driveway?",
    options: ["Sound horn", "Enter quickly", "Yield to all vehicles and pedestrians", "Take right-of-way"],
    correctAnswer: 2,
    explanation: "When entering a road from a private road or driveway, you must yield to vehicles on the road and pedestrians on the sidewalk."
  },
  {
    id: "rules_211",
    category: CATEGORIES.RULES,
    question: "At a controlled intersection with a green light that has been green for a while, what should you do?",
    options: ["Speed up", "Maintain speed", "Be prepared to stop when it turns yellow", "Stop immediately"],
    correctAnswer: 2,
    explanation: "If the light has been green for a while, be prepared to stop when it turns yellow. However, if you are too close to stop safely, proceed with caution."
  },
  {
    id: "rules_212",
    category: CATEGORIES.RULES,
    question: "Where there is no stop line, crosswalk, or sidewalk at an intersection with a stop sign, where must you stop?",
    options: ["Before the intersection", "At the edge of the intersection", "In the middle of the intersection", "After the intersection"],
    correctAnswer: 1,
    explanation: "If there is no stop line, crosswalk, or sidewalk, stop at the edge of the intersection and wait until the way is clear."
  },
  {
    id: "rules_213",
    category: CATEGORIES.RULES,
    question: "Must you stop at a railway crossing if there is a stop sign?",
    options: ["No, stop signs don't apply to railway crossings", "Yes, unless directed otherwise by a flagman", "Only if a train is visible", "No, only slow down"],
    correctAnswer: 1,
    explanation: "If you approach a railway crossing with a stop sign, you must stop unless otherwise directed by a flagman."
  },
  {
    id: "rules_214",
    category: CATEGORIES.RULES,
    question: "How long can it take a train to stop under full emergency braking?",
    options: ["100 metres", "500 metres", "1 kilometre", "Up to 2 kilometres"],
    correctAnswer: 3,
    explanation: "Remember it can take up to 2 kilometres for a train to stop under full emergency braking. Never try to race a train!"
  },
  {
    id: "rules_215",
    category: CATEGORIES.RULES,
    question: "What should you do if a railway crossing has flashing signal lights?",
    options: ["Slow down and proceed", "Stop and wait until lights stop flashing", "Speed up to cross quickly", "Proceed if no train visible"],
    correctAnswer: 1,
    explanation: "Wait until signal lights stop flashing and, if there's a gate or barrier, wait until it rises before crossing."
  },
  
  // ========== ADDITIONAL LICENSE & DOCUMENTS QUESTIONS ==========
  {
    id: "license_021",
    category: CATEGORIES.LICENSE,
    question: "Must you carry your driver's licence with you when driving?",
    options: ["No", "Yes", "Only on highways", "Only during day"],
    correctAnswer: 1,
    explanation: "You must carry your licence with you whenever you drive and produce it when a police officer requests it."
  },
  {
    id: "license_022",
    category: CATEGORIES.LICENSE,
    question: "Is it legal to lend your driver's licence to someone?",
    options: ["Yes, in emergencies", "Yes, for identification", "No, never permitted", "Yes, to learners"],
    correctAnswer: 2,
    explanation: "It is illegal to lend your driver's licence. You cannot lend it, let someone else use it, or use an altered licence."
  },
  {
    id: "license_023",
    category: CATEGORIES.LICENSE,
    question: "How many demerit points result in suspension for novice (G1/G2) drivers?",
    options: ["6 points", "9 points", "12 points", "15 points"],
    correctAnswer: 1,
    explanation: "Novice G1 and G2 drivers face a 60-day licence suspension if they accumulate 9 or more demerit points."
  },
  {
    id: "license_024",
    category: CATEGORIES.LICENSE,
    question: "How many demerit points result in suspension for fully licensed drivers?",
    options: ["9 points", "12 points", "15 points", "18 points"],
    correctAnswer: 2,
    explanation: "Fully licensed drivers face a 30-day suspension at 15 demerit points. The points are then reduced to 7 after the suspension."
  },
  {
    id: "license_025",
    category: CATEGORIES.LICENSE,
    question: "How long do demerit points stay on your driving record?",
    options: ["1 year", "2 years", "3 years", "5 years"],
    correctAnswer: 1,
    explanation: "Demerit points stay on your record for 2 years from the date of the offence."
  },
  {
    id: "license_026",
    category: CATEGORIES.LICENSE,
    question: "How many demerit points do you receive for careless driving?",
    options: ["3 points", "4 points", "6 points", "7 points"],
    correctAnswer: 2,
    explanation: "Careless driving results in 6 demerit points, one of the most serious driving offences in terms of demerit points."
  },
  {
    id: "license_027",
    category: CATEGORIES.LICENSE,
    question: "How many demerit points for exceeding the speed limit by 16-29 km/h?",
    options: ["2 points", "3 points", "4 points", "6 points"],
    correctAnswer: 1,
    explanation: "Exceeding the speed limit by 16 to 29 km/h results in 3 demerit points."
  },
  {
    id: "license_028",
    category: CATEGORIES.LICENSE,
    question: "How many demerit points for exceeding the speed limit by 30-49 km/h?",
    options: ["3 points", "4 points", "6 points", "7 points"],
    correctAnswer: 1,
    explanation: "Exceeding the speed limit by 30 to 49 km/h results in 4 demerit points."
  },
  {
    id: "license_029",
    category: CATEGORIES.LICENSE,
    question: "How many demerit points for exceeding the speed limit by 50 km/h or more?",
    options: ["4 points", "6 points", "7 points", "9 points"],
    correctAnswer: 1,
    explanation: "Exceeding the speed limit by 50 km/h or more results in 6 demerit points, the same as racing."
  },
  {
    id: "license_030",
    category: CATEGORIES.LICENSE,
    question: "How many demerit points for failing to remain at the scene of a collision?",
    options: ["4 points", "6 points", "7 points", "9 points"],
    correctAnswer: 2,
    explanation: "Failing to remain at the scene of a collision results in 7 demerit points, the highest number of points for any single offence."
  },
  {
    id: "license_031",
    category: CATEGORIES.LICENSE,
    question: "Within how many days must you notify MTO of a change of address?",
    options: ["3 days", "6 days", "10 days", "30 days"],
    correctAnswer: 1,
    explanation: "You must tell the Ministry of Transportation within 6 days of changing your name or address."
  },
  {
    id: "license_032",
    category: CATEGORIES.LICENSE,
    question: "How often must drivers aged 80 or older renew their licence?",
    options: ["Every year", "Every 2 years", "Every 3 years", "Every 5 years"],
    correctAnswer: 1,
    explanation: "Drivers aged 80 or older must renew their driver's licence every 2 years and undergo additional screening."
  },
  {
    id: "license_033",
    category: CATEGORIES.LICENSE,
    question: "How many demerit points for failing to stop for police?",
    options: ["4 points", "6 points", "7 points", "9 points"],
    correctAnswer: 2,
    explanation: "Failing to stop for police results in 7 demerit points, equal to failing to remain at a collision scene."
  },
  {
    id: "license_034",
    category: CATEGORIES.LICENSE,
    question: "How many demerit points for following too closely?",
    options: ["2 points", "3 points", "4 points", "6 points"],
    correctAnswer: 2,
    explanation: "Following too closely (tailgating) results in 4 demerit points."
  },
  {
    id: "license_035",
    category: CATEGORIES.LICENSE,
    question: "How many demerit points for using a hand-held device while driving?",
    options: ["2 points", "3 points", "4 points", "6 points"],
    correctAnswer: 1,
    explanation: "Using a hand-held wireless device while driving results in 3 demerit points plus substantial fines."
  },
  
  // ========== ADDITIONAL SAFETY QUESTIONS ==========
  {
    id: "safety_051",
    category: CATEGORIES.SAFETY,
    question: "To get your vehicle out of a skid, you should first:",
    options: ["Steer straight ahead", "Steer opposite to the skid", "Steer in the direction you want to go", "Apply brakes hard"],
    correctAnswer: 2,
    explanation: "To get out of a skid, steer in the direction you want to go. This helps regain control of the vehicle."
  },
  {
    id: "safety_052",
    category: CATEGORIES.SAFETY,
    question: "When the driver of another vehicle is about to overtake you, you must:",
    options: ["Speed up", "Move left to prevent passing", "Signal them not to pass", "Move to the right and let them pass"],
    correctAnswer: 3,
    explanation: "When being overtaken, you must move to the right and allow the vehicle to pass safely."
  },
  {
    id: "safety_053",
    category: CATEGORIES.SAFETY,
    question: "What is the proper braking technique?",
    options: ["Pump the brakes rapidly", "Press brake pedal firmly and evenly", "Use left foot for braking", "Apply brakes hard suddenly"],
    correctAnswer: 1,
    explanation: "Press the brake pedal firmly and evenly. Use your right foot for both brake and gas pedals."
  },
  {
    id: "safety_054",
    category: CATEGORIES.SAFETY,
    question: "In manual transmission, what should you do going down a long steep hill?",
    options: ["Stay in highest gear", "Shift into lower gear", "Coast in neutral", "Only use brakes"],
    correctAnswer: 1,
    explanation: "Shift into a lower gear going down long, steep hills. This helps control speed and reduces brake wear."
  },
  {
    id: "safety_055",
    category: CATEGORIES.SAFETY,
    question: "When should you downshift before going downhill?",
    options: ["After you start going downhill", "Before starting downhill", "In the middle of the hill", "At the bottom"],
    correctAnswer: 1,
    explanation: "Downshift before starting downhill since it may not be possible once you are going downhill."
  },
  {
    id: "safety_056",
    category: CATEGORIES.SAFETY,
    question: "Which pedal should you use for both braking and acceleration?",
    options: ["Left foot", "Right foot", "Either foot", "Both feet"],
    correctAnswer: 1,
    explanation: "Use your right foot for both brake and gas pedals so you won't step on both pedals at the same time."
  },
  {
    id: "safety_057",
    category: CATEGORIES.SAFETY,
    question: "What does being a predictable driver mean?",
    options: ["Driving slowly", "Doing what others expect", "Honking often", "Changing lanes frequently"],
    correctAnswer: 1,
    explanation: "Being predictable means doing what other road users expect you to do, helping traffic move safely."
  },
  {
    id: "safety_058",
    category: CATEGORIES.SAFETY,
    question: "What does courteous driving include?",
    options: ["Cutting off other drivers", "Giving space for lane changes", "Not signalling", "Speeding up to block merges"],
    correctAnswer: 1,
    explanation: "Courteous driving means giving other drivers space to change lanes, not cutting them off, and signalling properly."
  },
  {
    id: "safety_059",
    category: CATEGORIES.SAFETY,
    question: "Can you be found responsible for a collision even if someone else broke the law?",
    options: ["No, never", "Yes, if you could have avoided it", "Only if you also broke a law", "Only with witnesses"],
    correctAnswer: 1,
    explanation: "Even if someone else does something wrong, you may be found responsible if you could have done something to avoid the collision."
  },
  {
    id: "safety_060",
    category: CATEGORIES.SAFETY,
    question: "What is the major cause of collisions?",
    options: ["Vehicle defects", "Weather", "Breaking traffic laws", "Road conditions"],
    correctAnswer: 2,
    explanation: "Breaking the rules of the road is the major cause of collisions. Knowing and following traffic laws is essential."
  },
  
  // ========== ADDITIONAL MISCELLANEOUS QUESTIONS ==========
  {
    id: "misc_011",
    category: CATEGORIES.MISC,
    question: "How many demerit points for driver failing to wear a seatbelt?",
    options: ["1 point", "2 points", "3 points", "4 points"],
    correctAnswer: 1,
    explanation: "A driver failing to wear a seatbelt receives 2 demerit points. It's the law to wear seatbelts in Ontario."
  },
  {
    id: "misc_012",
    category: CATEGORIES.MISC,
    question: "How many demerit points for improper opening of a vehicle door?",
    options: ["1 point", "2 points", "3 points", "4 points"],
    correctAnswer: 2,
    explanation: "Improper opening of a vehicle door (dooring) results in 3 demerit points and can cause serious injury to cyclists."
  },
  {
    id: "misc_013",
    category: CATEGORIES.MISC,
    question: "Is it illegal to drive with a radar detector in Ontario?",
    options: ["Yes, 3 demerit points", "No, it's legal", "Only on highways", "Only for G1 drivers"],
    correctAnswer: 0,
    explanation: "Driving a vehicle equipped with a radar detector results in 3 demerit points. They are illegal in Ontario."
  },
  {
    id: "misc_014",
    category: CATEGORIES.MISC,
    question: "What are High Occupancy Vehicle (HOV) lanes for?",
    options: ["Emergency vehicles only", "Vehicles with multiple occupants", "Commercial trucks", "Motorcycles only"],
    correctAnswer: 1,
    explanation: "HOV lanes are reserved for vehicles with a minimum number of passengers. Improper use results in 3 demerit points."
  },
  {
    id: "misc_015",
    category: CATEGORIES.MISC,
    question: "How many demerit points for driving the wrong way on a one-way road?",
    options: ["2 points", "3 points", "4 points", "6 points"],
    correctAnswer: 1,
    explanation: "Going the wrong way on a one-way road results in 3 demerit points and is extremely dangerous."
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
