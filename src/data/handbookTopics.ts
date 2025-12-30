export interface HandbookSection {
  name: string;
  content?: string;
  keywords: string[];
  description?: string;
  topics?: {
    title: string;
    points: string[];
  }[];
}

export interface HandbookTopic {
  title: string;
  description: string;
  icon: string;
  sections: HandbookSection[];
  // topics?: HandbookTopic[];
}

export const handbookTopics: HandbookTopic[] = [
  {
    "title": "Introduction",
    "description": "What the Official MTO Driver’s Handbook is for, why safe driving matters, and how to use this guide responsibly.",
    "icon": "book-open",
    "sections": [
      {
        "name": "About this handbook",
        "description": "How to use the handbook for G1 study and road test preparation, and what it covers.",
        "keywords": ["handbook", "mto", "ontario", "g1", "knowledge test", "level 2 road test", "rules of the road", "safe driving practices"],
        "topics": [
          {
            "title": "What this guide helps you do",
            "points": [
              "Study for the G1 driver’s licence knowledge test.",
              "Review rules of the road and safe driving practices.",
              "Prepare for the Level Two (G2) road test."
            ]
          },
          {
            "title": "What it focuses on",
            "points": [
              "Driving a car, van, or small truck in Ontario.",
              "Building safe habits and understanding legal responsibilities."
            ]
          }
        ]
      },
      {
        "name": "Driving is a privilege, not a right",
        "description": "Safety-first mindset: your choices affect everyone on the road.",
        "keywords": ["privilege", "responsibility", "road safety", "risk", "new drivers"],
        "topics": [
          {
            "title": "Why this matters",
            "points": [
              "Most collisions come from driver error and risky behaviours.",
              "New drivers are more likely than experienced drivers to be involved in serious or fatal collisions.",
              "Safe driving is learned through practice in lower-risk environments and good habits."
            ]
          }
        ]
      },
      {
        "name": "Common collision-causing behaviours",
        "description": "Typical errors and behaviours that lead to crashes.",
        "keywords": ["following too closely", "speeding", "failure to yield", "improper turns", "red lights", "lane changes", "reckless driving"],
        "topics": [
          {
            "title": "High-risk behaviours to avoid",
            "points": [
              "Following too closely (tailgating).",
              "Speeding or driving too fast for conditions.",
              "Failing to yield the right-of-way.",
              "Improper turns and unsafe lane changes.",
              "Running red lights or ignoring traffic control devices.",
              "Intentionally reckless behaviour that puts others at risk."
            ]
          }
        ]
      },
      {
        "name": "Ontario road safety approach",
        "description": "Programs and systems designed to reduce collisions and build safer drivers.",
        "keywords": ["road safety leader", "graduated licensing system", "gls", "seatbelts", "child car seats", "drinking and driving", "aggressive driving"],
        "topics": [
          {
            "title": "What Ontario uses to improve safety",
            "points": [
              "Graduated Licensing System (GLS) to build skills progressively in lower-risk settings.",
              "Public safety campaigns (seatbelts, child seats, drinking and driving, aggressive driving).",
              "Ongoing measures to improve driver behaviour and reduce collisions."
            ]
          }
        ]
      },
      {
        "name": "This handbook is a guide (not the law)",
        "description": "Where to find official legal wording and how to treat handbook content.",
        "keywords": ["guide", "official purposes", "highway traffic act", "regulations", "laws"],
        "topics": [
          {
            "title": "How to interpret this handbook",
            "points": [
              "Use it as a study and learning guide.",
              "For official legal descriptions, consult Ontario laws and regulations (e.g., Highway Traffic Act and related acts).",
              "When unsure, rely on the official law and current official guidance."
            ]
          }
        ]
      },
      {
        "name": "Driver education and other handbooks",
        "description": "Approved training and where to learn about other vehicle licence types.",
        "keywords": ["beginner driver education", "ministry-approved", "driving schools", "motorcycle handbook", "truck handbook", "bus handbook", "air brake handbook"],
        "topics": [
          {
            "title": "Beginner Driver Education (BDE)",
            "points": [
              "If you take driver education, ensure the school is ministry-approved."
            ]
          },
          {
            "title": "Other vehicle handbooks",
            "points": [
              "Use the official Motorcycle, Truck, Bus, and Air Brake handbooks for other licence classes and vehicle types."
            ]
          }
        ]
      },
      {
        "name": "Accessibility and alternate formats",
        "description": "How to request an alternate format copy of the handbook.",
        "keywords": ["alternate format", "publications ontario", "serviceontario publications", "accessibility"],
        "topics": [
          {
            "title": "If you need an alternate format",
            "points": [
              "Request a copy in an alternate format through the listed Ontario publication contacts."
            ]
          }
        ]
      },
      {
        "name": "Quick takeaway",
        "content": "Drive safely. Build skill gradually, avoid high-risk behaviours, and treat this handbook as a learning guide while using Ontario law as the official reference.",
        "keywords": ["drive safely", "defensive driving", "risk management", "laws"],
        "topics": [
          {
            "title": "Remember",
            "points": [
              "Practice deliberately and build safe habits early.",
              "Avoid the common behaviours that cause collisions.",
              "Use official law for authoritative rules when it matters."
            ]
          }
        ]
      }
    ]
  },

  {
    "title": "Getting your driver’s licence",
    "description": "Licence requirements in Ontario, licence classes/endorsements, graduated licensing (G1/G2/G), how to apply, testing rules, new-resident exchanges, choosing a driving school, and fraud prevention.",
    "icon": "id-card",
    "sections": [
      {
        "name": "Requirements for driving in Ontario",
        "description": "Who can drive in Ontario and what you must have depending on your residency status.",
        "keywords": ["ontario", "requirements", "resident", "visitor", "16 years old", "valid licence", "international driver permit", "60 days"],
        "topics": [
          {
            "title": "Ontario residents",
            "points": [
              "You must be at least 16 years old.",
              "You must have a valid Ontario driver’s licence to drive.",
              "New Ontario residents can use an out-of-province/out-of-country licence for up to 60 days, then must apply for an Ontario licence to keep driving."
            ]
          },
          {
            "title": "Visitors to Ontario",
            "points": [
              "You must be at least 16 years old.",
              "You must have a valid licence from your home province/state/country.",
              "If visiting for more than 3 months, you must have an International Driver’s Permit from your own country.",
              "Visitors are not eligible for an Ontario driver’s licence."
            ]
          },
          {
            "title": "Ontario Photo Card rule",
            "points": [
              "You cannot hold both an Ontario Driver’s Licence and an Ontario Photo Card.",
              "If you have an Ontario Photo Card and apply for a driver’s licence, you must give up the Photo Card as part of the process."
            ]
          }
        ]
      },
      {
        "name": "Licence classes and what they allow",
        "description": "Ontario has multiple licence classes; your class must match the vehicle you drive.",
        "keywords": ["licence classes", "class g", "class g1", "class g2", "class m", "class a", "class b", "class c", "class d", "class e", "class f", "weight limits"],
        "topics": [
          {
            "title": "Key Class G limits (cars/vans/small trucks)",
            "points": [
              "Class G covers cars, vans, and small trucks (and certain combinations) up to 11,000 kg total, with towing limits (towed vehicle not over 4,600 kg).",
              "Class G1 is Level One (graduated licensing) with an accompanying fully licensed driver and additional conditions.",
              "Class G2 is Level Two (graduated licensing) allowing solo driving but with conditions."
            ]
          },
          {
            "title": "Motorcycle (Class M) note",
            "points": [
              "Motorcycles are licensed under Class M (with M1/M2 graduated levels).",
              "Motorcycle licensing can be pursued without first obtaining a Class G (exception to the general rule)."
            ]
          },
          {
            "title": "Other classes exist for larger vehicles",
            "points": [
              "Classes A/B/C/D/E/F cover tractor-trailers, buses, and heavier vehicles with specific limits and permissions.",
              "If you plan to drive these, consult the appropriate official handbook (truck, bus, air brake)."
            ]
          }
        ]
      },
      {
        "name": "Endorsements and special cases",
        "description": "Extra endorsements/restrictions that affect what you can operate.",
        "keywords": ["endorsement", "air brake", "z endorsement", "rv endorsement", "t endorsement", "q restriction"],
        "topics": [
          {
            "title": "Air brake endorsement (Z)",
            "points": [
              "A “Z” endorsement is required to operate any air-brake equipped motor vehicle."
            ]
          },
          {
            "title": "Recreational vehicle (RV) endorsement (T) and RV restriction (Q)",
            "points": [
              "An RV endorsement (“T”) may allow certain Class E/F/G drivers to operate an RV up to a specified weight threshold.",
              "A Class D with RV restriction (“Q”) allows operation of RVs but restricts other Class D driving privileges."
            ]
          }
        ]
      },
      {
        "name": "Graduated licensing (Class G)",
        "description": "Two-step learning process for new drivers, with minimum timelines and required tests.",
        "keywords": ["graduated licensing", "two-step", "20 months", "vision test", "knowledge test", "g1", "g2", "road tests"],
        "topics": [
          {
            "title": "How the system works",
            "points": [
              "New drivers enter graduated licensing after passing a vision test and a knowledge test.",
              "You start at Level One (G1), then pass a road test to reach Level Two (G2).",
              "You pass a second road test to get full Class G privileges.",
              "The process takes at least 20 months in total (minimum time), depending on eligibility and completion."
            ]
          }
        ]
      },
      {
        "name": "Level One (G1) rules",
        "description": "Restrictions and conditions for G1 drivers.",
        "keywords": ["g1", "level one", "zero blood alcohol", "accompanying driver", "front seat", "seatbelt", "high-speed roads", "midnight to 5am"],
        "topics": [
          {
            "title": "G1 restrictions (must-follow)",
            "points": [
              "Zero blood-alcohol level: do not drive after drinking alcohol.",
              "No driving alone: an accompanying driver must sit in the front passenger seat (and is the only person who can be in the front seat with you).",
              "Accompanying driver requirements: valid Class G (or higher), at least four years of driving experience, and under .05% BAC; their licence cannot be suspended.",
              "Everyone in the vehicle must have a working seatbelt.",
              "Road restrictions: you must not drive on specified high-speed highways/expressways unless your accompanying driver is a driving instructor.",
              "Time restriction: you must not drive between midnight and 5 a.m."
            ]
          },
          {
            "title": "Time in Level One",
            "points": [
              "Level One lasts 12 months (standard).",
              "Completing an approved driver-education course can reduce Level One time to 8 months."
            ]
          }
        ]
      },
      {
        "name": "Level Two (G2) rules",
        "description": "Privileges and restrictions at G2, including additional novice rules for younger drivers at night.",
        "keywords": ["g2", "level two", "zero blood alcohol", "seatbelt", "passenger limits", "midnight to 5am", "under 20", "under 19 passengers"],
        "topics": [
          {
            "title": "G2 general rules",
            "points": [
              "Zero blood-alcohol level: do not drive after drinking alcohol.",
              "Everyone in the vehicle must have a working seatbelt.",
              "Level Two lasts at least 12 months before you may attempt the final test for full Class G."
            ]
          },
          {
            "title": "Night passenger restrictions for young drivers",
            "points": [
              "For G2 drivers aged 19 and under, additional passenger restrictions apply between midnight and 5 a.m.",
              "In the first 6 months after receiving your G2: only 1 passenger aged 19 or under.",
              "After 6 months (until full G or age 20): up to 3 passengers aged 19 or under.",
              "Exemptions may apply when accompanied by a fully licensed driver in the front seat or when passengers are immediate family."
            ]
          },
          {
            "title": "Zero alcohol for drivers 21 and under",
            "points": [
              "Drivers aged 21 and under must have a zero blood-alcohol level regardless of licence class."
            ]
          }
        ]
      },
      {
        "name": "Applying for a licence",
        "description": "Where to apply, fees, medical questions, and required identity documents.",
        "keywords": ["apply", "drivetest centre", "travel point", "fees", "proof of identity", "legal name", "date of birth", "original documents", "medical conditions"],
        "topics": [
          {
            "title": "What you must bring/do",
            "points": [
              "Provide proof of legal name and complete date of birth (original, valid documents only; no photocopies or expired documents).",
              "Apply at a DriveTest Centre or Travel Point.",
              "Pay applicable fees (often includes knowledge test, first road test, and a licensing fee; additional fees for the second road test and retests)."
            ]
          },
          {
            "title": "Medical and vision requirements",
            "points": [
              "You must pass a vision test.",
              "You will be asked health questions; some conditions may prevent licensing for safety reasons.",
              "Report medical condition changes that may affect driving ability; doctors/optometrists have legal reporting obligations for certain conditions."
            ]
          }
        ]
      },
      {
        "name": "Proof of identification and photo standards",
        "description": "Accepted identity documents and what’s required for your licence photo.",
        "keywords": ["passport", "citizenship", "permanent resident", "immigration documents", "birth certificate", "name change", "photo standards", "neutral expression"],
        "topics": [
          {
            "title": "Identity document rules",
            "points": [
              "You must provide acceptable proof of legal name and complete date of birth.",
              "Additional documents are required if your primary document does not show all required details.",
              "If names differ between documents, provide legal-name change proof (e.g., marriage/change-of-name/adoption/divorce court order)."
            ]
          },
          {
            "title": "Licence photo requirements (practical checklist)",
            "points": [
              "Face must be fully visible with no obstructions.",
              "Neutral, relaxed expression (no smiling).",
              "Face straight to camera (not tilted).",
              "Hair must not cover eyes.",
              "Religious/medical headwear is permitted if it does not cover the face; other headwear/face wear may need to be removed for the photo.",
              "If the photo doesn’t meet standards, you may be required to retake it."
            ]
          }
        ]
      },
      {
        "name": "Test checklists (G1 knowledge / G1 exit / G2 exit)",
        "description": "What to bring and key pre-test requirements.",
        "keywords": ["checklist", "g1 knowledge test", "g1 exit test", "g2 exit test", "vehicle", "glasses", "appointment", "highway experience declaration"],
        "topics": [
          {
            "title": "G1 knowledge test checklist",
            "points": [
              "Study the Official MTO Driver’s Handbook.",
              "Bring two pieces of identification.",
              "Bring payment for test fees (cash/debit/credit as accepted).",
              "Bring glasses/contacts if required for driving."
            ]
          },
          {
            "title": "G1 exit test checklist",
            "points": [
              "Study the handbook thoroughly.",
              "Bring a vehicle in good working order.",
              "Bring payment for fees (if applicable).",
              "Bring glasses/contacts if required.",
              "Arrive at least 30 minutes before your appointment."
            ]
          },
          {
            "title": "G2 exit test checklist",
            "points": [
              "Get highway driving experience (highways with speed limits of at least 80 km/h).",
              "Complete a Declaration of Highway Driving Experience form before the test.",
              "Bring a vehicle in good working order, payment (if applicable), and glasses/contacts if required.",
              "Arrive at least 30 minutes before your appointment."
            ]
          }
        ]
      },
      {
        "name": "Road tests: what to expect",
        "description": "How road tests are run, what’s allowed, and what happens if you fail.",
        "keywords": ["road test", "examiner", "no passengers", "no pets", "driving aids", "retest", "10 days"],
        "topics": [
          {
            "title": "During the test",
            "points": [
              "Road tests evaluate safe driving practices and following rules of the road.",
              "No pets or passengers (other than the examiner) are allowed in the vehicle.",
              "The examiner will explain the test and give instructions but will not coach you while driving.",
              "You will not be asked to do anything illegal."
            ]
          },
          {
            "title": "Driving aids and technology",
            "points": [
              "Do not rely on electronic driving aids during the test (e.g., auto-parallel-parking, lane monitoring, cruise control, backup cameras).",
              "You must demonstrate core skills directly (mirror checks, shoulder checks, observation routines)."
            ]
          },
          {
            "title": "After the test",
            "points": [
              "You receive a report outlining your skills and mistakes.",
              "If you fail, the report shows what to improve; you can retest after more practice.",
              "You must wait at least 10 days between road tests."
            ]
          }
        ]
      },
      {
        "name": "Fees, cancellations, and out-of-order tests",
        "description": "What happens to your prepaid fees if you miss/cancel or your vehicle isn’t acceptable.",
        "keywords": ["fees", "cancellation", "48 hours", "no-show", "out-of-order", "vehicle standards", "credit"],
        "topics": [
          {
            "title": "Late cancellation / no-show",
            "points": [
              "If you cancel or reschedule with less than 48 hours notice, or fail to attend, the prepaid road-test fee is not refunded.",
              "In certain extenuating circumstances, the fee may remain as a credit on your driving record."
            ]
          },
          {
            "title": "Out-of-order road test",
            "points": [
              "If your vehicle doesn’t meet standards (or the test can’t be completed for certain reasons), the test may be declared out-of-order.",
              "An out-of-order test results in losing 50% of the road test fee; the remaining 50% stays as a credit for a future booking."
            ]
          }
        ]
      },
      {
        "name": "New Ontario residents and licence exchange",
        "description": "How experience and foreign licences may count toward Ontario licensing.",
        "keywords": ["new resident", "licence exchange", "reciprocating jurisdictions", "non-reciprocating", "foreign experience", "credit", "past three years"],
        "topics": [
          {
            "title": "Reciprocating jurisdictions (exchange agreements)",
            "points": [
              "Ontario has exchange agreements with all Canadian provinces/territories and certain countries/states.",
              "Eligible drivers may receive a full Class G if they have an equivalent licence class.",
              "With fewer than two years’ experience, you may get credit and enter Level Two; once you reach a total of two years, you may take the Level Two road test for full privileges."
            ]
          },
          {
            "title": "Non-reciprocating jurisdictions",
            "points": [
              "Applicants must present a valid foreign licence, pass vision and knowledge tests, pay fees, and provide acceptable ID.",
              "Applicants can obtain a G1 and may be eligible for reduced waiting periods based on credited experience and approved driver education.",
              "Adequate proof of foreign experience may be required; only experience within the past three years may be credited."
            ]
          },
          {
            "title": "Important mindset for experienced newcomers",
            "points": [
              "Driving customs vary; experienced drivers should still study Ontario-specific laws and practices.",
              "Use the handbook and official Ontario resources to close gaps in rules and road culture."
            ]
          }
        ]
      },
      {
        "name": "What tests may cover (study blueprint)",
        "description": "The types of knowledge and skills the handbook expects you to know.",
        "keywords": ["could you pass", "seatbelts", "signs", "lights", "emergency vehicles", "freeway", "school buses", "demerit points", "collision reporting"],
        "topics": [
          {
            "title": "Written test topics (examples)",
            "points": [
              "Seatbelts, traffic signs/lights, and headlight use.",
              "Speed limits, freeway entry/exit basics.",
              "What to do around streetcars, school buses, and emergency vehicles.",
              "Suspensions, demerit points, passing rules, collision reporting, and sharing the road."
            ]
          },
          {
            "title": "Road test skill areas (examples)",
            "points": [
              "Starting, stopping, turning, and intersection handling.",
              "Lane use and passing (including bicycles).",
              "Parallel parking and reversing (where applicable).",
              "Hazard awareness and readiness."
            ]
          }
        ]
      },
      {
        "name": "Choosing a driving school (BDE)",
        "description": "How ministry-approved driver education works and how to evaluate a school.",
        "keywords": ["driving school", "bde", "ministry-approved", "40 hours", "in-class", "in-vehicle", "flexible instruction", "licensed instructor"],
        "topics": [
          {
            "title": "BDE basics",
            "points": [
              "A ministry-approved Beginner Driver Education (BDE) course can teach skills and attitudes for safe driving.",
              "Completing an approved BDE course may reduce Level One time and can help with insurance premiums (varies).",
              "Ministry-approved BDE courses must be at least 40 hours (including classroom, in-vehicle, and flexible instruction)."
            ]
          },
          {
            "title": "What strong programs emphasize",
            "points": [
              "Strategic driving techniques and risk perception/management.",
              "Avoiding distractions, freeway driving, night driving, and adverse conditions.",
              "Positive driving attitudes and responsible behaviour."
            ]
          },
          {
            "title": "Driving school checklist",
            "points": [
              "Clear course information package and contract (all costs spelled out, including road test vehicle use).",
              "Instructor qualifications, progress/evaluation reports, and modern training materials.",
              "Adequate facilities, low student/teacher ratio, and up-to-date audiovisual tools.",
              "Receipts, consumer protection insurance, and a track record of respectful student treatment."
            ]
          }
        ]
      },
      {
        "name": "Protect yourself from fraud and identity theft",
        "description": "How to avoid scams related to licences and road tests.",
        "keywords": ["fraud", "identity theft", "drivetest", "ontario.ca", "scams", "guarantee", "fees"],
        "topics": [
          {
            "title": "Safety rules",
            "points": [
              "Do not share licence information with unauthorized people.",
              "Do not post images of your driver’s licence online.",
              "For accurate road test info, use official sources (ontario.ca and drivetest.ca)."
            ]
          },
          {
            "title": "Red flags (don’t trust services that)",
            "points": [
              "Promise a driver’s licence without testing.",
              "Guarantee successful road test results.",
              "Charge more than official fees or claim to charge “booking fees” to schedule tests."
            ]
          }
        ]
      },
      {
        "name": "Summary",
        "content": "By the end of this chapter, you should understand eligibility requirements, licence classifications, ID requirements, graduated licensing restrictions and test requirements, new resident exchange rules, how to choose a driving school, and how to avoid fraud.",
        "keywords": ["summary", "eligibility", "licence classes", "identification", "graduated licensing", "road tests", "driving school", "fraud prevention"]
      }
    ]
  },

  {
    "title": "Safe and Responsible Driving",
    "description": "The mindset and habits of safe driving: obey the law, protect others, be predictable and courteous, and use defensive (strategic) driving built on visibility, space, and communication.",
    "icon": "shield-check",
    "sections": [
      {
        "name": "Safe driving = knowledge + skill + attitude",
        "description": "Safe and responsible driving depends on understanding laws, driving skill, and the right attitude toward other road users.",
        "keywords": ["safe driver", "responsible driving", "knowledge", "skill", "attitude", "rules of the road", "collisions"],
        "topics": [
          {
            "title": "Core idea",
            "points": [
              "Being a safe driver takes knowledge, skill, and attitude.",
              "Knowing and following traffic laws helps traffic move safely.",
              "Breaking the rules of the road is a major cause of collisions."
            ]
          }
        ]
      },
      {
        "name": "Traffic laws and consequences",
        "description": "Traffic laws come from multiple government levels and can be enforced by police; violations can lead to serious penalties.",
        "keywords": ["traffic laws", "federal", "provincial", "municipal", "police enforcement", "fines", "jail", "licence suspension", "impound"],
        "topics": [
          {
            "title": "What can happen if you break the law",
            "points": [
              "Traffic laws are made by federal, provincial, and municipal governments.",
              "Police from each level can enforce traffic laws.",
              "Breaking a traffic law can lead to fines, jail, or losing your driver’s licence.",
              "Driving while your licence is suspended can result in your vehicle being impounded."
            ]
          }
        ]
      },
      {
        "name": "Shared responsibility for safety",
        "description": "Even if someone else makes a mistake, you can still be responsible if you could have avoided the collision.",
        "keywords": ["shared responsibility", "avoid collisions", "preventable", "responsibility in collisions", "risk awareness"],
        "topics": [
          {
            "title": "Collision responsibility mindset",
            "points": [
              "You must do more than obey rules—you must care about other people’s safety.",
              "Everyone shares responsibility for avoiding collisions.",
              "You may be found responsible if you could have done something to avoid a collision, even when someone else did something wrong."
            ]
          }
        ]
      },
      {
        "name": "Predictable and courteous driving",
        "description": "Help traffic flow safely by being predictable and considerate.",
        "keywords": ["predictable", "courteous", "co-operate", "space", "cutting off", "signals", "lane change", "turn signals"],
        "topics": [
          {
            "title": "Courteous driving behaviours",
            "points": [
              "Be predictable—do what other road users expect you to do.",
              "Be courteous—co-operate to keep traffic moving safely.",
              "Give others space to change lanes.",
              "Do not cut other drivers off.",
              "Signal turns and lane changes properly."
            ]
          }
        ]
      },
      {
        "name": "Defensive (strategic) driving",
        "description": "See hazards early and respond quickly to prevent collisions; training courses can help you practice.",
        "keywords": ["defensive driving", "strategic driving", "hazards", "collision avoidance", "response", "training courses"],
        "topics": [
          {
            "title": "What defensive driving means",
            "points": [
              "You must be able to see dangerous situations before they happen.",
              "Respond quickly and effectively to prevent hazards from becoming collisions.",
              "Collision-avoidance courses are available to practice these techniques."
            ]
          }
        ]
      },
      {
        "name": "The 3 foundations: visibility, space, communication",
        "description": "Defensive driving is built on seeing/being seen, managing space cushions, and communicating intentions clearly.",
        "keywords": ["visibility", "space", "communication", "scan", "mirrors", "five seconds", "signal lights", "cushion", "eye contact", "horn"],
        "topics": [
          {
            "title": "Visibility (see + be seen)",
            "points": [
              "Be aware of traffic in front, behind, and beside you.",
              "Keep your eyes moving: scan ahead/side and check mirrors about every five seconds.",
              "Look farther ahead to reduce surprises and give yourself time to avoid hazards.",
              "Use signal lights as required so other drivers can see your intentions."
            ]
          },
          {
            "title": "Space (time + room to avoid collisions)",
            "points": [
              "Leave a cushion of space ahead, behind, and to both sides.",
              "The greatest collision risk is in front of you—stay well back.",
              "Space improves visibility and gives time to react safely."
            ]
          },
          {
            "title": "Communication (make intentions obvious)",
            "points": [
              "Communicate so others see you and know what you’re doing.",
              "Make eye contact with pedestrians, cyclists, and drivers at intersections when appropriate.",
              "Signal whenever you want to slow down, stop, turn, or change lanes.",
              "Use your horn to get attention if needed."
            ]
          }
        ]
      },
      {
        "name": "Navigation to next driving skill chapters",
        "description": "This chapter leads into the practical driving skill chapters that apply defensive driving principles.",
        "keywords": ["getting ready to drive", "driving along", "sharing the road", "intersections", "stopping", "changing directions", "changing positions", "parking", "freeway"],
        "topics": [
          {
            "title": "Where these principles apply next",
            "points": [
              "Getting ready to drive",
              "Driving along",
              "Sharing the road with other road users",
              "Driving through intersections",
              "Stopping",
              "Changing directions",
              "Changing positions",
              "Parking along roadways",
              "Freeway driving",
              "Dealing with particular situations",
              "Driving at night and in bad weather",
              "Dealing with emergencies",
              "Driving efficiently"
            ]
          }
        ]
      }
    ]
  },

  {
    "title": "Getting ready to drive",
    "description": "Before driving, ensure you are fit to drive, know your vehicle, set a safe seating/mirror position, use seatbelts and child restraints properly, and use the right lighting for conditions.",
    "icon": "car",
    "sections": [
      {
        "name": "Be physically and mentally alert",
        "description": "Your physical, mental, and emotional state can change day to day and can seriously affect safe driving.",
        "keywords": ["fit to drive", "illness", "fatigue", "stress", "emotions", "alcohol", "drugs", "medication"],
        "topics": [
          {
            "title": "Don’t drive when you’re not fit",
            "points": [
              "If you have doubts about your physical, mental, or emotional state, don’t drive.",
              "Illness, fatigue, stress, and strong emotions can reduce your ability to think and react quickly.",
              "Do not drive after drinking alcohol or using drugs/medication that may impair driving."
            ]
          },
          {
            "title": "Fatigue is dangerous",
            "points": [
              "Tired driving can lead to falling asleep at the wheel.",
              "Even without falling asleep, fatigue slows thinking and reduces awareness.",
              "In emergencies, fatigue can cause wrong or delayed decisions."
            ]
          }
        ]
      },
      {
        "name": "Know your vehicle",
        "description": "Learn your vehicle’s controls, warning lights, and driver-assist features, and understand their limitations.",
        "keywords": ["vehicle controls", "owner’s manual", "anti-lock brakes", "four-wheel drive", "traction control", "stability control", "driver assist", "warning lights", "gauges"],
        "topics": [
          {
            "title": "Understand driver-assist technology",
            "points": [
              "Modern vehicles may include systems that assist steering, braking, and accelerating.",
              "You must understand how these systems work and their limitations (use the owner’s manual).",
              "You remain responsible for all driving tasks and must be ready to take over at any time."
            ]
          },
          {
            "title": "Control familiarity checklist",
            "points": [
              "Know where all controls and instruments are and what they do.",
              "Check that warning lights and gauges work.",
              "Learn to operate wipers/washers, headlights/high beams, heater/defroster without looking away from the road."
            ]
          }
        ]
      },
      {
        "name": "Get into position",
        "description": "Set up your seat and headrest so you have control, stability, and the best possible view.",
        "keywords": ["seating position", "visibility", "four metres", "elbows slightly bent", "pedals", "headrest", "head restraint", "driving space"],
        "topics": [
          {
            "title": "Safe seating position",
            "points": [
              "Sit high enough to see over the steering wheel and hood.",
              "You should be able to see the ground about four metres in front of the vehicle.",
              "Sit upright with elbows slightly bent and adjust the seat so your feet reach the pedals easily."
            ]
          },
          {
            "title": "Headrest and cabin space",
            "points": [
              "Adjust the headrest so the middle of the headrest is behind the back of your head.",
              "Ensure you have enough room in the front seat to drive safely.",
              "Do not overcrowd the driver area with passengers or property."
            ]
          }
        ]
      },
      {
        "name": "Keep a clear view",
        "description": "Do not obstruct your view; windows must not be coated or blocked in a way that prevents visibility.",
        "keywords": ["clear view", "windows", "windshield", "front door windows", "obstructions", "tinting", "visibility"],
        "topics": [
          {
            "title": "Visibility rules",
            "points": [
              "Do not place anything in windows that blocks your view.",
              "Vehicle windows must not be coated with materials that prevent you from seeing out in any direction.",
              "Windshield and front door windows must not be coated to prevent someone from seeing inside the vehicle."
            ]
          }
        ]
      },
      {
        "name": "Find your blind spots",
        "description": "Set mirrors to reduce blind spots and always shoulder-check before moving laterally.",
        "keywords": ["blind spots", "mirrors", "interior mirror", "outside mirrors", "overlap", "shoulder check", "cyclists"],
        "topics": [
          {
            "title": "Mirror setup to reduce blind spots",
            "points": [
              "Blind spots are typically back-left and back-right; in some vehicles they can be large.",
              "Set the interior mirror so it shows the centre of the rear window (for direct rear view).",
              "Set each side mirror so you can just see the rear of your vehicle when leaning toward the mirror side (minimizes overlap)."
            ]
          },
          {
            "title": "Shoulder checks are mandatory for blind spots",
            "points": [
              "Side mirrors show narrow angles—mirrors alone can’t eliminate blind spots.",
              "Turning your head (shoulder check) is the only way to confirm blind spots are clear before changing lanes or position.",
              "Learn your vehicle’s blind spots by having someone walk around the vehicle while you observe in mirrors."
            ]
          }
        ]
      },
      {
        "name": "Fasten your seatbelt",
        "description": "Seatbelts are required and must be worn correctly; drivers are responsible for ensuring required passengers are properly buckled.",
        "keywords": ["seatbelt", "buckled up", "demerit points", "fine", "under 16", "novice drivers", "airbags", "shoulder strap", "lap belt"],
        "topics": [
          {
            "title": "Seatbelt legal and safety basics",
            "points": [
              "You must wear a seatbelt in any vehicle equipped with seatbelts.",
              "All passengers must be buckled properly (seatbelt, child seat, or booster seat).",
              "Drivers can be fined and receive two demerit points for not buckling up."
            ]
          },
          {
            "title": "Driver responsibility for passengers",
            "points": [
              "Drivers may be fined and receive demerit points if passengers under 16 are not properly restrained.",
              "Novice drivers must have a working seatbelt for every passenger.",
              "Not ensuring a working seatbelt for every passenger can lead to licence loss for at least 30 days."
            ]
          },
          {
            "title": "Correct seatbelt fit",
            "points": [
              "Wear seatbelts snugly so they hold you in place during a collision.",
              "Never share one seatbelt between two people.",
              "Shoulder strap goes over the shoulder (never under the arm or behind the back).",
              "Lap belt goes low across the hips (not against the stomach).",
              "Airbags do not replace seatbelts; seatbelts position you so airbags can protect you properly."
            ]
          },
          {
            "title": "Passenger safety note",
            "points": [
              "The safest place to ride is inside a vehicle, properly buckled.",
              "Do not ride outside a vehicle (e.g., pickup bed) or in a towed trailer—being ejected in a collision is extremely dangerous."
            ]
          }
        ]
      },
      {
        "name": "Child safety (car seats and booster seats)",
        "description": "Children must be secured in the correct restraint for their age/height/weight; drivers are responsible for passengers under 16.",
        "keywords": ["child car seat", "booster seat", "seatbelt", "UAS", "tether", "rear-facing", "forward-facing", "airbag", "under 13", "145 cm", "36 kg", "8 years old"],
        "topics": [
          {
            "title": "Core child safety rules",
            "points": [
              "Children must be secured in a child seat, booster, or seatbelt depending on height/weight/age.",
              "Child car seats must meet Canadian Motor Vehicle Safety Standards.",
              "Drivers are responsible for ensuring passengers under 16 are properly restrained."
            ]
          },
          {
            "title": "Infants (under 9 kg / 20 lbs.)",
            "points": [
              "Use a rear-facing child car seat secured by seatbelt or UAS strap.",
              "Best practice: install rear-facing seats in the back seat.",
              "Never place a rear-facing child seat in a position with an active airbag."
            ]
          },
          {
            "title": "Toddlers (9–18 kg / 20–40 lbs.)",
            "points": [
              "Use a child car seat secured by seatbelt or UAS strap.",
              "Use the tether strap with the tether anchor (for applicable forward-facing seats).",
              "Children over 9 kg may remain rear-facing if the seat is designed for their height/weight."
            ]
          },
          {
            "title": "Booster seats (when required)",
            "points": [
              "Used after outgrowing a forward-facing child seat when under age 8, between 18–36 kg (40–80 lbs.), and under 145 cm (4'9\").",
              "Booster seats must be used with a lap/shoulder belt (not a lap belt alone).",
              "If the vehicle has lap belts only, secure the child with the lap belt only—do not use a booster with lap-only belts."
            ]
          },
          {
            "title": "When a child can use a seatbelt",
            "points": [
              "A child may use a seatbelt when it fits properly (lap belt across hips; shoulder belt across centre of chest and over shoulder).",
              "Seatbelt is allowed if any one is true: the child is 8 years old, or 36 kg (80 lbs.) or more, or 145 cm (4'9\") or taller.",
              "Do not place a child in front of an airbag unless it is turned off; safest place for children under 13 is the back seat."
            ]
          },
          {
            "title": "Installation and safety tips",
            "points": [
              "Secure loose objects so they cannot injure passengers in sudden stops or collisions.",
              "A properly installed child seat should move no more than 2.5 cm (1 inch) at the belt/UAS routing point.",
              "Use a locking clip where needed to keep the seatbelt locked (check your vehicle manual).",
              "Local public health units and car seat clinics can help ensure proper installation.",
              "Be cautious with used seats: ensure instructions/equipment are complete, no damage, no collision history, no recall, and not past useful life."
            ]
          }
        ]
      },
      {
        "name": "Turn on headlights at night and in poor conditions",
        "description": "Use the full lighting system correctly: headlights for visibility and being seen; high beams only when appropriate; don’t rely on parking lights or daytime running lights in poor visibility.",
        "keywords": ["headlights", "high beams", "low beams", "150 metres", "110 metres", "tail lights", "daytime running lights", "sunset", "sunrise", "fog", "snow", "rain", "automatic lighting"],
        "topics": [
          {
            "title": "Headlight and rear light requirements",
            "points": [
              "Headlights must shine white light visible at least 150 m ahead and strong enough to light objects 110 m away.",
              "You must have red rear lights visible from 150 m away.",
              "A white light must illuminate the rear licence plate when headlights are on."
            ]
          },
          {
            "title": "High beam vs low beam rules",
            "points": [
              "Switch to low beams within 150 m of an oncoming vehicle.",
              "Use low beams when you are less than 60 m behind another vehicle (unless passing).",
              "These rules apply on all roads, including divided highways."
            ]
          },
          {
            "title": "When headlights must be on",
            "points": [
              "Headlights are required from 30 minutes before sunset to 30 minutes after sunrise.",
              "Headlights are required any time poor light conditions prevent you from clearly seeing people or vehicles less than 150 m away (fog, snow, rain).",
              "Do not drive with one headlight or improperly aimed lights; keep lights clean and replace bulbs promptly."
            ]
          },
          {
            "title": "Parking lights and daytime running lights (DRLs)",
            "points": [
              "Parking lights are only for parking—use headlights in low light.",
              "Daytime running lights are not a substitute for headlights in poor conditions.",
              "DRLs may not activate tail lights or other required lighting; use full headlights when needed."
            ]
          },
          {
            "title": "Automatic lighting recommendation",
            "points": [
              "If your vehicle has automatic full lighting, using it is recommended.",
              "Even with automatic mode, you must monitor that the correct lights are operating."
            ]
          }
        ]
      },
      {
        "name": "Summary",
        "content": "By the end of this section, you should understand defensive driving concepts, how fitness-to-drive affects safety, how to learn vehicle controls and set seating/mirrors, legal requirements for seatbelts and child restraints, and how/when to use vehicle lighting properly.",
        "keywords": ["summary", "defensive driving", "fitness to drive", "vehicle controls", "seating position", "seatbelts", "child car seats", "booster seats", "headlights"]
      }
    ]
  },

  {
    "title": "Driving along",
    "description": "Core driving habits while moving: continuous scanning, smooth steering, clear signalling, correct lane positioning, legal/appropriate speed, obeying police, and maintaining safe following distance.",
    "icon": "steering-wheel",
    "sections": [
      {
        "name": "Awareness routine (scan + blind spots)",
        "description": "Build a constant observation routine for traffic ahead, behind, and beside you.",
        "keywords": ["awareness", "scan", "mirrors", "every five seconds", "blind spots", "shoulder check", "large vehicles", "dusk", "dawn"],
        "topics": [
          {
            "title": "What to do continuously",
            "points": [
              "Develop a routine for looking ahead, behind, and side-to-side.",
              "Check mirrors about every five seconds.",
              "Check blind spots by turning your head to look over your shoulder.",
              "Avoid driving in other vehicles’ blind spots and keep others out of yours by adjusting your speed.",
              "Be extra careful at dusk and dawn when light changes reduce visibility."
            ]
          },
          {
            "title": "Watch for hidden hazards",
            "points": [
              "Look well ahead for people in parked vehicles (doors opening or vehicles pulling out).",
              "Watch carefully for smaller vehicles, bicycles, and pedestrians.",
              "Be especially cautious around large commercial vehicles (bigger blind spots)."
            ]
          }
        ]
      },
      {
        "name": "Steer smoothly",
        "description": "Smooth, controlled steering improves stability and safety.",
        "keywords": ["steering", "smooth", "precise", "lane changes", "hands", "9 and 3", "straight line"],
        "topics": [
          {
            "title": "Steering fundamentals",
            "points": [
              "All steering should be smooth and precise.",
              "Do most steering and lane changes without taking either hand off the wheel.",
              "Be able to steer straight while shifting gears, adjusting controls, or checking blind spots.",
              "Hand position: imagine the wheel as a clock and place hands at 9 o’clock and 3 o’clock."
            ]
          }
        ]
      },
      {
        "name": "Use turn signals and brake lights",
        "description": "Signal early so others can predict your actions; signalling doesn’t replace checking that it’s safe.",
        "keywords": ["turn signals", "brake lights", "signal early", "lane change", "turn", "slow", "stop", "hand signals", "cyclists"],
        "topics": [
          {
            "title": "When to signal",
            "points": [
              "Signal before stopping, slowing down, turning, changing lanes, leaving the road, or moving out from a parked position.",
              "Give the correct signal well before taking the action and make sure others can see it.",
              "After signalling, move only when it is safe—signalling alone is not enough."
            ]
          },
          {
            "title": "If lights aren’t working",
            "points": [
              "If turn signals or brake lights fail, use hand and arm signals.",
              "Remember cyclists may signal a right turn by extending the right arm straight out."
            ]
          }
        ]
      },
      {
        "name": "Keep right (lane positioning)",
        "description": "Use the right side/right lane unless turning left or passing—especially if you’re slower than traffic.",
        "keywords": ["keep right", "right-hand lane", "multi-lane roads", "passing", "left turn", "slow traffic"],
        "topics": [
          {
            "title": "Lane use rule of thumb",
            "points": [
              "Keep to the right of the road or in the right-hand lane on multi-lane roads.",
              "Use the left lane mainly when turning left or passing.",
              "Keeping right is especially important if you are driving more slowly than other vehicles."
            ]
          }
        ]
      },
      {
        "name": "Obey speed limits (and drive for conditions)",
        "description": "Never exceed posted limits, and drive slower when conditions require it.",
        "keywords": ["speed limits", "safe speed", "bad weather", "heavy traffic", "construction zones", "school zones", "50 km/h", "80 km/h", "cruise control", "speed warning devices"],
        "topics": [
          {
            "title": "Speed basics",
            "points": [
              "Obey posted maximum speed limits.",
              "Drive at a speed that lets you stop safely—often below the maximum in bad weather, heavy traffic, or construction zones.",
              "Expect lower limits in school zones and construction zones."
            ]
          },
          {
            "title": "Default maximums where not posted",
            "points": [
              "50 km/h in cities, towns, and villages.",
              "80 km/h elsewhere."
            ]
          },
          {
            "title": "Cruise control cautions",
            "points": [
              "Cruise control can help fuel economy and prevent unintended speeding.",
              "Do not use cruise control on wet, icy, or slippery roads, in heavy traffic, or when fatigued."
            ]
          },
          {
            "title": "Illegal devices",
            "points": [
              "Speed measuring warning devices are illegal and can result in fines and demerit points."
            ]
          }
        ]
      },
      {
        "name": "Obey police directions",
        "description": "Police direction overrides signs/signals; pull over properly and provide documents immediately when requested.",
        "keywords": ["police", "directing traffic", "pull over", "complete stop", "driver’s licence", "vehicle permit", "insurance", "documents", "immediate", "suspension"],
        "topics": [
          {
            "title": "When police direct traffic",
            "points": [
              "Follow police directions even if they differ from traffic lights or signs."
            ]
          },
          {
            "title": "If signalled to pull over",
            "points": [
              "Pull over as far to the right as you safely can and come to a complete stop.",
              "Stay in your vehicle and wait for the officer.",
              "Provide your driver’s licence, vehicle permit (or copy), and insurance immediately when requested.",
              "Failing to pull over can lead to fines, licence suspension, or prison time."
            ]
          }
        ]
      },
      {
        "name": "Maintaining space (following distance)",
        "description": "Use the two-second rule as a minimum following distance in ideal conditions; increase space when conditions worsen.",
        "keywords": ["space cushion", "following distance", "two-second rule", "stopping distance", "bad weather", "motorcycles", "large trucks", "heavy load"],
        "topics": [
          {
            "title": "Why space matters",
            "points": [
              "Keep a cushion of space around your vehicle to be seen and to avoid collisions.",
              "You need enough space to stop safely if the vehicle ahead brakes suddenly.",
              "Do not block the normal and reasonable movement of traffic."
            ]
          },
          {
            "title": "Two-second rule (how to measure)",
            "points": [
              "Pick a fixed marker ahead (e.g., sign or pole).",
              "When the rear of the vehicle ahead passes the marker, count “one thousand and one, one thousand and two.”",
              "If your vehicle reaches the marker before you finish counting, you’re following too closely."
            ]
          },
          {
            "title": "When to add more space",
            "points": [
              "Use more than two seconds in bad weather.",
              "Use more space when following motorcycles or large trucks.",
              "Use more space when carrying a heavy load."
            ]
          }
        ]
      },
      {
        "name": "Summary",
        "content": "By the end of this section you should know: how to steer; how to use signals/hand signals; why space matters and how to measure following distance; where to position your vehicle; and how to obey speed limits and police.",
        "keywords": ["summary", "steering", "signals", "hand signals", "following distance", "keep right", "speed limits", "police"]
      }
    ]
  },

  {
    "title": "Sharing the road with other road users",
    "description": "How to safely share Ontario roads with pedestrians, cyclists, motorcycles, large commercial vehicles, buses, farm machinery, horse-drawn vehicles, and school buses.",
    "icon": "users",
    "sections": [
      {
        "name": "Overview: many road users, different speeds and space",
        "description": "Ontario roads include many types of users—drivers must anticipate different speeds, sizes, and movement patterns.",
        "keywords": ["sharing the road", "pedestrians", "cyclists", "motorcycles", "large trucks", "buses", "farm machinery", "space", "speed"],
        "topics": [
          {
            "title": "Core principle",
            "points": [
              "Be aware of other road users, the speed they travel, and the space they occupy.",
              "Adjust your driving to reduce conflict and prevent collisions."
            ]
          }
        ]
      },
      {
        "name": "Sharing the road with pedestrians",
        "description": "Drivers must use due diligence and typically yield; pedestrians must ensure drivers see them before entering the roadway.",
        "keywords": ["pedestrians", "due diligence", "yield", "eye contact", "crosswalk", "school crossing", "crossing guard", "community safety zone"],
        "topics": [
          {
            "title": "Shared responsibility + yielding",
            "points": [
              "Road safety is shared between pedestrians and drivers.",
              "Pedestrians should ensure drivers have seen them and are stopped (or about to stop) before stepping onto the roadway.",
              "Drivers must use due diligence and, in most cases, yield to pedestrians.",
              "Eye contact between pedestrian and driver is a key safety tool."
            ]
          },
          {
            "title": "Children: expect the unexpected",
            "points": [
              "Drive slowly and cautiously in school zones, residential areas, and anywhere children may be present.",
              "Do not assume children know traffic laws or will check for traffic.",
              "Watch for sudden movements like darting out between parked cars.",
              "Be extra cautious at twilight when children may be harder to see."
            ]
          },
          {
            "title": "Crosswalk awareness (marked and unmarked)",
            "points": [
              "Crosswalks may be marked with signs/lines/other markings.",
              "Do not pass a vehicle stopped at a crosswalk—someone may be crossing.",
              "Not all crosswalks are marked, but nearly all intersections have crosswalks."
            ]
          },
          {
            "title": "Crossing guards and pedestrian crossovers",
            "points": [
              "Drivers (including cyclists) must stop and yield the whole roadway at pedestrian crossovers, school crossings, and other locations with a crossing guard.",
              "Proceed only after pedestrians and the crossing guard are safely on the sidewalk."
            ]
          },
          {
            "title": "Special pedestrian situations to watch for",
            "points": [
              "Community safety zones: posted signs indicate special pedestrian risk areas.",
              "Slow pedestrians: be patient—some signal cycles may not allow enough time for slower walkers.",
              "Seniors and pedestrians with disabilities may need extra time and courtesy.",
              "People who are blind or visually impaired may use a white cane or guide dog—use extra caution.",
              "Hybrid/electric vehicles are quieter; vision-impaired pedestrians may rely on engine sound—use extra caution.",
              "Motorized wheelchairs and medical scooters are pedestrians.",
              "Streetcars: pass safety islands/zones at a reasonable speed and be ready for sudden pedestrian movement.",
              "Distracted pedestrians (texters/earbuds) may not hear horns or traffic noise—anticipate unpredictable movement.",
              "Pedestrians in dark clothing are hard to see at night—use extra care in low light.",
              "New transport devices (powered skateboards/scooters/roller devices/e-bikes) can propel users into the roadway—stay alert.",
              "Turning collisions: be extra cautious during turns; many pedestrian collisions occur when vehicles turn left because both parties are looking elsewhere."
            ]
          }
        ]
      },
      {
        "name": "Sharing the road with cyclists",
        "description": "Cyclists may ride near the right edge but can take the lane for safety; drivers must pass with at least 1 metre where practical and avoid right/left-turn conflicts.",
        "keywords": ["cyclists", "bike lane", "one metre passing law", "two demerit points", "fine", "blind spot", "right turn", "left turn", "bike box", "sharrow", "dooring"],
        "topics": [
          {
            "title": "Where cyclists ride (and why they may take the lane)",
            "points": [
              "Cyclists and mopeds travelling slower than traffic are expected to ride about one metre from the curb or parked cars (or as close as practical to the right edge where there is no curb).",
              "Cyclists can use any part of the lane if needed for safety, such as to:",
              "Avoid obstacles (puddles, ice, sand, debris, ruts, potholes, sewer grates).",
              "Cross railway/streetcar tracks at a 90° angle.",
              "Discourage passing when the lane is too narrow to be shared safely.",
              "Cyclists are not required to stay right when travelling at or faster than traffic, or when turning left or positioning for a left turn.",
              "Cyclists may use a left-turn lane to turn left where one exists."
            ]
          },
          {
            "title": "Passing cyclists safely (1 metre rule)",
            "points": [
              "When passing a cyclist, drivers must maintain a minimum distance of one metre where practical between the vehicle and the cyclist.",
              "Failure to keep this distance may result in a fine and two demerit points.",
              "Whenever possible, change lanes to pass.",
              "Do not follow too closely behind cyclists—they do not have brake lights."
            ]
          },
          {
            "title": "Intersection conflict prevention",
            "points": [
              "When turning right: signal and check mirrors and your right blind spot so you do not cut off a cyclist.",
              "When turning left: stop and wait for oncoming bicycles to pass before turning.",
              "When driving through an intersection: scan for cyclists waiting to turn left."
            ]
          },
          {
            "title": "Bike lanes, bike boxes, sharrows",
            "points": [
              "Bike lanes are reserved for cyclists and are typically marked by a solid white line.",
              "You may need to enter/cross a bike lane to turn right at a corner or driveway—do so only after ensuring it is safe, then complete the turn.",
              "Bike boxes: stop behind the box at a red light—do not stop in the bike box.",
              "Sharrows (shared lane markings): indicate the lane is shared; vehicle and bicycle traffic may both be in the lane—watch for cyclists."
            ]
          },
          {
            "title": "Cyclist signals and ‘dooring’ prevention",
            "points": [
              "Watch for cyclists’ hand signals (a cyclist may signal a right turn by extending the right arm).",
              "Try to make eye contact with cyclists when possible.",
              "Before opening a door from a parked position, check mirrors and blind spots for cyclists to avoid ‘dooring.’",
              "Be extra cautious with children cycling; they may lack training, awareness, and control (especially on oversized bikes)."
            ]
          },
          {
            "title": "Horn use near cyclists",
            "points": [
              "Do not sound your horn unnecessarily when overtaking a cyclist.",
              "If you must warn, tap the horn quickly and lightly while still some distance away."
            ]
          }
        ]
      },
      {
        "name": "Sharing the road with motorcycles and limited-speed motorcycles",
        "description": "Motorcycles are harder to see, may move suddenly, and need a full lane; don’t assume a turn signal means the rider will turn.",
        "keywords": ["motorcycles", "limited-speed motorcycles", "mopeds", "harder to see", "full lane", "turn signal", "uneven surfaces"],
        "topics": [
          {
            "title": "Key safety points",
            "points": [
              "Motorcycles, limited-speed motorcycles, mopeds, and bicycles are harder to see due to their size.",
              "Riders may make sudden moves because of uneven surfaces or poor weather.",
              "Motorcycles use a full lane—treat them like other vehicles.",
              "Be cautious turning left in front of an oncoming motorcycle with a signal on; some motorcycle signals don’t self-cancel, so confirm the rider is actually turning."
            ]
          }
        ]
      },
      {
        "name": "Sharing the road with large commercial vehicles",
        "description": "Large trucks/buses have big blind spots, long stopping distances, wide turns, roll-back risk, spray, and turbulence.",
        "keywords": ["large commercial vehicles", "tractor-trailer", "bus", "blind spots", "stopping distance", "wide turns", "roll back", "spray", "turbulence"],
        "topics": [
          {
            "title": "Blind spots",
            "points": [
              "Large commercial vehicles have big blind spots on both sides.",
              "Avoid tailgating; if you are directly behind, the driver may not see you and you have no escape if they stop suddenly.",
              "If you can’t see the driver’s face in the side-view mirror, the driver can’t see you."
            ]
          },
          {
            "title": "Stopping distance",
            "points": [
              "Large vehicles need a much longer distance to stop.",
              "When passing, do not cut in closely—this reduces their space cushion and is dangerous.",
              "Allow extra room when passing and when merging in front of a large vehicle."
            ]
          },
          {
            "title": "Wide turns",
            "points": [
              "Large vehicles may swing wide (often left) before making a right turn.",
              "Do not move into the space that opens up beside a large vehicle turning right—you could be squeezed between the vehicle/trailer and the curb.",
              "Stay well back until the large vehicle has cleared the lane.",
              "Similar squeeze risks can happen on ramps or multi-lane turns—don’t creep into adjacent lanes beside a turning truck."
            ]
          },
          {
            "title": "Rolling back",
            "points": [
              "Leave extra space when stopped behind a large vehicle; it may roll back when brakes are released."
            ]
          },
          {
            "title": "Spray and turbulence",
            "points": [
              "In bad weather, large vehicles can spray mud/snow/debris that may block your windshield temporarily.",
              "Large vehicles can create turbulence that may affect your control while passing."
            ]
          }
        ]
      },
      {
        "name": "Sharing the road with municipal buses",
        "description": "Bus bays and the rule to allow a bus back into traffic when it signals to leave.",
        "keywords": ["municipal buses", "bus bays", "indented bays", "left-turn signal", "allow bus to re-enter"],
        "topics": [
          {
            "title": "Bus bay rule",
            "points": [
              "Many roads have bus bays where passengers board/alight.",
              "When a bus in a bus bay flashes its left-turn signals to leave, and you are approaching in the adjacent lane, you must allow the bus to re-enter traffic."
            ]
          }
        ]
      },
      {
        "name": "Sharing the road with farm machinery",
        "description": "Farm machinery is slow, oversized, may turn unexpectedly into fields, and is common after dark during planting/harvest seasons.",
        "keywords": ["farm machinery", "slow-moving", "40 km/h", "oversized", "planting", "harvesting", "slow-moving sign"],
        "topics": [
          {
            "title": "How to handle farm equipment",
            "points": [
              "Farm machinery often travels under 40 km/h, especially when towing implements or wagons.",
              "Oversized width/length can make it hard for the operator to see behind.",
              "Farmers may turn directly into fields or shift lanes unexpectedly.",
              "Expect farm machinery after dark during peak planting and harvesting seasons.",
              "Farm machinery must display an orange/red slow-moving sign on the rear.",
              "If you see the slow-moving sign: slow down, stay well back, and do not pass until it is safe."
            ]
          }
        ]
      },
      {
        "name": "Sharing the road with horse-drawn vehicles",
        "description": "Horse-drawn vehicles are very slow and may use the shoulder or enter the lane where shoulders are narrow; passing too close can startle the horse.",
        "keywords": ["horse-drawn vehicles", "buggy", "slow-moving sign", "reflective tape", "shoulder", "bridge crossings", "startle horse"],
        "topics": [
          {
            "title": "Safe approach and passing",
            "points": [
              "Horse-drawn vehicles may travel on the shoulder but can straddle/enter the lane where shoulders are narrow or absent (e.g., bridges).",
              "They must display an orange/red slow-moving sign; many also have reflective tape.",
              "If you see one: slow down, be very cautious, and maintain a safe following distance.",
              "Pass only when safe and give as much distance as possible.",
              "When approaching from the opposite direction, move to the far right of your lane.",
              "Passing too closely can startle the horse, causing sudden movement into the roadway."
            ]
          }
        ]
      },
      {
        "name": "Sharing the road with school buses",
        "description": "Amber lights mean prepare to stop; red lights/stop arm means you must stop (median rules apply) and wait until safe signals end.",
        "keywords": ["school bus", "amber lights", "red lights", "stop arm", "median strip", "20 metres", "illegal to pass"],
        "topics": [
          {
            "title": "Amber overhead lights flashing",
            "points": [
              "Amber lights mean the bus is coming to a stop to pick up or drop off passengers.",
              "Slow down and prepare to stop whether you are behind or approaching the bus.",
              "On a road with a median strip, only vehicles approaching from the rear should prepare to stop."
            ]
          },
          {
            "title": "Red overhead lights flashing or stop arm activated",
            "points": [
              "You must stop whether you are behind or approaching the bus.",
              "On a roadway with a median strip, only vehicles approaching from the rear must stop.",
              "If approaching from the rear, stop at least 20 metres away.",
              "Do not proceed until the bus moves, red lights stop flashing, and the stop arm is no longer activated.",
              "Failing to stop for a stopped school bus with red lights/stop arm is dangerous and illegal."
            ]
          }
        ]
      },
      {
        "name": "Summary",
        "content": "By the end of this section, you should know the importance of sharing the road safely with pedestrians, cyclists, motorcycles, large vehicles, buses, farm machinery, horse-drawn vehicles, and school buses.",
        "keywords": ["summary", "sharing the road", "pedestrians", "cyclists", "motorcycles", "large vehicles", "school buses", "safe passing", "yielding"]
      }
    ]
  },

  {
    "title": "Driving through intersections",
    "description": "How to approach intersections safely, understand controlled vs uncontrolled intersections, and apply right-of-way (yielding) rules in common scenarios.",
    "icon": "git-merge",
    "sections": [
      {
        "name": "Approaching intersections safely",
        "description": "Intersections are high-risk areas—scan early and watch for vulnerable road users and traffic controls.",
        "keywords": ["intersections", "scan", "pedestrians", "cyclists", "sidewalks", "trails", "yield sign", "stop sign", "traffic lights", "children", "local bylaw"],
        "topics": [
          {
            "title": "Intersection scanning routine",
            "points": [
              "Be alert as you come to intersections and look carefully for pedestrians, cyclists, other vehicles, yield signs, stop signs, and traffic lights.",
              "Scan sidewalks and paths/trails as well as the roadway.",
              "Remember children may be unaware of traffic laws.",
              "Cycling on sidewalks may be permitted by local bylaw—watch for cyclists entering crossings."
            ]
          }
        ]
      },
      {
        "name": "Types of intersections",
        "description": "Intersections are either controlled (with signs/lights) or uncontrolled (no signs/lights).",
        "keywords": ["controlled intersections", "uncontrolled intersections", "traffic lights", "yield", "stop"],
        "topics": [
          {
            "title": "Two main types",
            "points": [
              "Controlled intersections use traffic lights, yield signs, or stop signs to control traffic.",
              "Uncontrolled intersections have no signs or lights and require extra caution."
            ]
          }
        ]
      },
      {
        "name": "Controlled intersections",
        "description": "How to proceed at green/yellow/red lights, and how to act at yield and stop signs.",
        "keywords": ["controlled", "green light", "yellow light", "red light", "blocked intersection", "yield sign", "stop sign", "complete stop", "steady speed"],
        "topics": [
          {
            "title": "Traffic lights (green / yellow / red)",
            "points": [
              "With a green light: drive carefully through at a steady speed.",
              "If the light has been green for a while, be prepared to stop when it turns yellow.",
              "If you are too close to stop safely when it turns yellow, proceed through with caution.",
              "With a red light: come to a complete stop and wait until it turns green."
            ]
          },
          {
            "title": "Don’t block the intersection",
            "points": [
              "If the intersection is blocked with traffic, stop before entering and wait until traffic ahead moves.",
              "Exception: this does not apply if you are turning left or right."
            ]
          },
          {
            "title": "Yield signs at controlled intersections",
            "points": [
              "Slow down or stop if necessary.",
              "Wait until the way is clear before driving through."
            ]
          },
          {
            "title": "Stop signs at controlled intersections",
            "points": [
              "Come to a complete stop.",
              "Proceed only when the way is clear."
            ]
          }
        ]
      },
      {
        "name": "Uncontrolled intersections",
        "description": "Extra caution is required; right-of-way depends on arrival order and the vehicle on the right.",
        "keywords": ["uncontrolled", "no signs", "no lights", "yielding", "right-of-way", "driver on the right", "same time"],
        "topics": [
          {
            "title": "Uncontrolled right-of-way basics",
            "points": [
              "Be extra careful at uncontrolled intersections (often in low-traffic areas).",
              "If two vehicles arrive at the same time from different roads, the driver on the left must yield to the driver on the right.",
              "Yielding the right-of-way means letting another driver go first."
            ]
          }
        ]
      },
      {
        "name": "Yielding the right-of-way (common rules)",
        "description": "Situations where you must yield: no-control intersections, all-way stops, turning, entering from driveways, and pedestrian crossovers/school crossings.",
        "keywords": ["yield", "right-of-way", "intersection without signs", "all-way stop", "turning left", "turning right", "pedestrians", "cyclists", "bike lane", "blind spot", "driveway", "private road", "pedestrian crossover", "crossing guard", "signalling"],
        "topics": [
          {
            "title": "Intersection with no signs or lights",
            "points": [
              "Yield to a vehicle that reaches the intersection before you.",
              "If you arrive at the same time, yield to the vehicle approaching from the right."
            ]
          },
          {
            "title": "All-way stop (stop signs at all corners)",
            "points": [
              "Yield to the first vehicle that comes to a complete stop.",
              "If two vehicles stop at the same time, the vehicle on the left yields to the vehicle on the right."
            ]
          },
          {
            "title": "Turning left or right",
            "points": [
              "When turning left: wait for approaching traffic to pass or turn, and for pedestrians in or approaching your path to cross.",
              "When turning right: wait for pedestrians to cross if they are in or approaching your path.",
              "Check your blind spot for cyclists approaching from behind, especially in a bike lane to your right or on a sidewalk/trail."
            ]
          },
          {
            "title": "Entering from a private road or driveway",
            "points": [
              "Yield to vehicles on the road.",
              "Yield to pedestrians on the sidewalk."
            ]
          },
          {
            "title": "Pedestrian crossovers and school crossings",
            "points": [
              "Yield the right-of-way and wait for pedestrians to completely cross the road at pedestrian crossovers.",
              "Yield at school crossings with crossing guards.",
              "Remember: signalling does not give you the right-of-way—you must ensure the way is clear."
            ]
          },
          {
            "title": "Yield sign meaning (reminder)",
            "points": [
              "A yield sign means you must slow down or stop if necessary and yield to traffic in the intersection or on the intersecting road."
            ]
          }
        ]
      },
      {
        "name": "Summary",
        "content": "By the end of this section you should know: the difference between controlled and uncontrolled intersections and how to safely navigate them; the concept of right-of-way and common situations where you must yield to other road users.",
        "keywords": ["summary", "controlled intersections", "uncontrolled intersections", "right-of-way", "yield"]
      }
    ]
  },

  {
    "title": "Stopping",
    "description": "How to stop smoothly and safely at stop signs/lights, railway crossings, school crossings, school buses, and pedestrian crossovers.",
    "icon": "hand",
    "sections": [
      {
        "name": "Stopping safely and smoothly",
        "description": "A safe stop starts early: scan, mirror-check, brake early, and stop smoothly with proper pedal control.",
        "keywords": ["stopping", "braking", "mirrors", "brake early", "smooth stop", "right foot", "manual transmission", "downshift"],
        "topics": [
          {
            "title": "Smooth stop routine",
            "points": [
              "See stops ahead, check mirrors, begin braking early, and stop smoothly.",
              "Use your right foot for both brake and gas pedals to avoid pressing both and to avoid unnecessary brake lights.",
              "Press the brake pedal firmly and evenly."
            ]
          },
          {
            "title": "Manual transmission hill control",
            "points": [
              "On long, steep downhill grades, downshift to a lower gear to help control speed.",
              "Downshift before starting downhill (it may be difficult once you’re already descending).",
              "As a guide, use the same gear going downhill as you would going uphill."
            ]
          }
        ]
      },
      {
        "name": "Where to stop at signs and lights",
        "description": "Correct stop position depends on whether a stop line, crosswalk, sidewalk edge, or intersection edge is present.",
        "keywords": ["stop line", "crosswalk", "sidewalk", "edge of intersection", "red light", "stop sign", "complete stop"],
        "topics": [
          {
            "title": "Stop position rules",
            "points": [
              "You must come to a complete stop for all stop signs and red traffic lights.",
              "Stop at the stop line if one is marked on the pavement.",
              "If there is no stop line, stop at the crosswalk (marked or not).",
              "If there is no crosswalk, stop at the edge of the sidewalk.",
              "If there is no sidewalk, stop at the edge of the intersection.",
              "Wait until the way is clear before entering the intersection."
            ]
          }
        ]
      },
      {
        "name": "Stopping at railway crossings",
        "description": "Railway crossings require early scanning and strict compliance with signals and gates—trains need long distances to stop.",
        "keywords": ["railway crossing", "X signs", "advance warning", "gates", "signal lights", "two kilometres", "private road", "stop sign", "flagman"],
        "topics": [
          {
            "title": "Railway crossing warning signs",
            "points": [
              "Public road railway crossings are marked with large red and white “X” signs.",
              "You may also see yellow advance warning signs and large “X” pavement markings before the crossing.",
              "Some crossings have flashing signal lights and gates/barriers; some less-travelled crossings may have stop signs.",
              "On private roads, crossings may not be marked—watch carefully."
            ]
          },
          {
            "title": "Railway crossing safety checklist",
            "points": [
              "Slow down, listen, and look both ways before crossing the tracks.",
              "If a train is coming, stop at least five metres from the nearest rail or gate.",
              "Never race a train to a crossing.",
              "If signal lights are flashing, wait until they stop flashing; if there is a gate/barrier, wait until it rises before crossing.",
              "Never drive around, under, or through a railway gate/barrier while it is down or moving—this is illegal and dangerous.",
              "Avoid stopping on the tracks—ensure you have enough space to cross completely before you start.",
              "Avoid shifting gears while crossing tracks."
            ]
          },
          {
            "title": "If trapped on a crossing",
            "points": [
              "Immediately get everyone out of the vehicle and away from the tracks.",
              "Move to a safe location, then contact authorities."
            ]
          },
          {
            "title": "Buses at railway crossings",
            "points": [
              "Most buses and other public vehicles must stop at railway crossings that are not protected by gates, signal lights, or a stop sign.",
              "School buses must stop at railway crossings whether or not the crossing is protected by gates or signal lights.",
              "Watch for buses stopping and be prepared to stop behind them."
            ]
          },
          {
            "title": "Stop sign at a railway crossing",
            "points": [
              "If there is a stop sign at a railway crossing, you must stop unless directed otherwise by a flagman."
            ]
          }
        ]
      },
      {
        "name": "Stopping at school crossings",
        "description": "When a school crossing guard displays a stop sign, you must stop and remain stopped until the roadway is fully clear.",
        "keywords": ["school crossing", "crossing guard", "stop sign", "remain stopped", "fine", "three demerit points"],
        "topics": [
          {
            "title": "School crossing stop requirements",
            "points": [
              "When a school-crossing guard displays a red and white stop sign, you must stop before reaching the crossing.",
              "Remain stopped until all people, including the school crossing guard, have cleared the entire roadway and it is safe to proceed.",
              "If you are unsure whether it is safe to proceed, wait until all children and the guard have cleared the crossing.",
              "Failure to follow these rules can result in a substantial fine and three demerit points."
            ]
          }
        ]
      },
      {
        "name": "Stopping for school buses",
        "description": "You must stop for a stopped school bus with its upper alternating red lights flashing (and stop arm), with special rules for roads with a median.",
        "keywords": ["school bus", "chrome yellow", "School Bus", "red flashing lights", "stop arm", "20 metres", "median strip", "six demerit points", "fine", "witness report"],
        "topics": [
          {
            "title": "When you must stop",
            "points": [
              "You must stop when approaching a stopped school bus with its upper alternating red lights flashing, whether you are behind it or approaching from the front.",
              "When approaching from the front, stop at a safe distance so children can get off and cross in front of you.",
              "When coming from behind the bus, stop at least 20 metres away.",
              "Do not proceed until the bus moves or the red lights stop flashing."
            ]
          },
          {
            "title": "Roads with a median strip",
            "points": [
              "On a road with a median strip (a physical barrier separating directions), only vehicles coming from behind the bus must stop."
            ]
          },
          {
            "title": "Stop arm rule",
            "points": [
              "School buses use a stop sign arm on the driver’s side that swings out after the red lights begin flashing.",
              "Remain stopped until the stop arm folds away and all red lights stop flashing."
            ]
          },
          {
            "title": "Penalties and enforcement",
            "points": [
              "It is illegal to fail to stop for a stopped school bus with red lights flashing.",
              "A first offence can result in a heavy fine and six demerit points.",
              "School bus drivers and witnesses can report vehicles that illegally pass a school bus.",
              "Registered owners may receive the fines even if demerit points/jail time do not apply to them."
            ]
          },
          {
            "title": "School buses at railway crossings (extra caution)",
            "points": [
              "School buses must stop at all railway crossings.",
              "For these railway-crossing stops, the upper alternating red lights are not used—be alert and be prepared to stop behind the bus."
            ]
          }
        ]
      },
      {
        "name": "Stopping for pedestrian crossovers",
        "description": "Pedestrian crossovers allow people to cross where there are no traffic lights—drivers (including cyclists) must yield and cannot pass within 30 m.",
        "keywords": ["pedestrian crossover", "overhead yellow lights", "yield", "wheelchairs", "eye contact", "30 metres", "school crossing guards"],
        "topics": [
          {
            "title": "Pedestrian crossover rules",
            "points": [
              "Pedestrian crossovers are designated crossings where there are no traffic lights.",
              "Always watch for pedestrians and people using wheelchairs at these crossings.",
              "Pedestrians may push a button to flash overhead yellow lights to warn drivers they will cross.",
              "Drivers (including cyclists) must yield the right-of-way to pedestrians in the crossover.",
              "Proceed only when pedestrians (and any school crossing guards) have crossed and are safely on the sidewalk.",
              "You must not pass any vehicle within 30 metres of a pedestrian crossover."
            ]
          }
        ]
      },
      {
        "name": "Summary",
        "content": "By the end of this section, you should know: where to stop at stop lights and stop signs; how to stop for railway crossings; how and when to stop for school crossings and school buses; and how and when to stop for pedestrian crossovers.",
        "keywords": ["summary", "stop line", "crosswalk", "railway crossing", "school crossing", "school bus", "pedestrian crossover", "30 metres"]
      }
    ]
  },

  {
    "title": "Changing directions",
    "description": "How to turn safely (right/left), use special turn lanes, handle red-light turns where permitted, navigate roundabouts, reverse safely, and turn around (U-turn and three-point turn).",
    "icon": "corner-down-right",
    "sections": [
      {
        "name": "Core rule before any direction change",
        "description": "Before turning, backing up, changing lanes, or turning around, confirm what’s beside/behind you and ensure enough space.",
        "keywords": ["changing directions", "mirrors", "shoulder check", "blind spots", "space", "before you move"],
        "topics": [
          {
            "title": "Safety checklist before moving laterally",
            "points": [
              "Check mirrors and over your shoulder to make sure the way is clear.",
              "Confirm you have enough space to complete the move safely."
            ]
          }
        ]
      },
      {
        "name": "Turning a corner",
        "description": "Signal early, choose the correct lane, finish braking before steering, and accelerate smoothly out of the turn.",
        "keywords": ["turning a corner", "signal", "proper lane", "brake before turning", "hand-over-hand steering", "skid"],
        "topics": [
          {
            "title": "Corner-turn fundamentals",
            "points": [
              "Signal well before the turn.",
              "Move into the proper lane when the way is clear (far right for right turns, far left in your direction for left turns).",
              "Look side to side and check blind spots before turning.",
              "Slow down before entering the turn; sharper turn = slower speed.",
              "Finish braking before turning the steering wheel (avoid braking and steering at the same time).",
              "Use “hand-over-hand steering” for sharp turns; avoid steering with one finger or palm.",
              "Gradually increase speed as you complete the turn."
            ]
          }
        ]
      },
      {
        "name": "Right turns",
        "description": "Right turns generally begin and end close to the right side of the road; scan thoroughly and yield to pedestrians and smaller road users.",
        "keywords": ["right turn", "right-hand lane", "yield", "pedestrians", "cyclists", "mopeds", "limited-speed motorcycles", "blind spot"],
        "topics": [
          {
            "title": "How to make a right turn",
            "points": [
              "Unless signs/markings tell you not to, begin and end a right turn close to the right side of the road.",
              "Signal well before the turn and move into the right-hand lane when safe.",
              "If the lane isn’t marked, keep as far right as possible.",
              "Look ahead, left, right, and left again; then check your right-rear blind spot.",
              "Let cyclists, limited-speed motorcycles, or mopeds go through the intersection before you turn.",
              "Complete your turn into the right-hand lane of the road you are entering."
            ]
          }
        ]
      },
      {
        "name": "Right turn on a red light",
        "description": "Permitted unless prohibited by a sign, but only after a complete stop and yielding to road users.",
        "keywords": ["right turn on red", "complete stop", "yield", "pedestrians", "red light"],
        "topics": [
          {
            "title": "Right-on-red rules",
            "points": [
              "Unless a sign tells you not to, you may turn right on a red light.",
              "You must first come to a complete stop.",
              "Proceed only when the way is clear.",
              "Signal your turn and yield to pedestrians and others using the road."
            ]
          }
        ]
      },
      {
        "name": "Left turns",
        "description": "Use the far-left lane in your direction unless markings say otherwise; keep wheels straight while waiting to turn; handle opposing left-turners safely.",
        "keywords": ["left turn", "far left lane", "centre line", "wheels straight", "oncoming traffic", "yield", "two vehicles turning left"],
        "topics": [
          {
            "title": "How to make a left turn",
            "points": [
              "Unless signs/markings tell you not to, begin and end a left turn in the far left lane in your direction.",
              "Signal well before the turn and move into the far left lane when safe.",
              "Look ahead, behind, left, right, left again; check blind spots.",
              "Turn only when the way is clear."
            ]
          },
          {
            "title": "Safe waiting position at an intersection",
            "points": [
              "If stopped waiting to turn left, do not turn your wheels left until you can complete the turn.",
              "If your wheels are turned left, a rear-end impact could push you into oncoming traffic."
            ]
          },
          {
            "title": "Two opposing left-turners",
            "points": [
              "When two vehicles from opposite directions are both turning left, each should turn to the left of the other after yielding to pedestrians and oncoming traffic."
            ]
          },
          {
            "title": "Left turns near smaller vehicles",
            "points": [
              "Motorcycles, bicycles, limited-speed motorcycles, and mopeds turn left like larger vehicles.",
              "If you are behind one of these vehicles, do not pull up beside it to turn at the same time.",
              "Stay behind and turn when the way is clear."
            ]
          }
        ]
      },
      {
        "name": "Left-turn patterns by road type",
        "description": "Match entry and exit lanes correctly on one-way and two-way roads.",
        "keywords": ["two-way", "one-way", "left turn patterns", "centre line", "left curb lane", "smooth arc"],
        "topics": [
          {
            "title": "Typical left-turn lane-to-lane rules",
            "points": [
              "Two-way → two-way: turn from lane closest to centre line into lane just right of centre line (smooth arc), then move to right curb lane when safe.",
              "Two-way → one-way: turn from lane closest to centre line into the left curb lane.",
              "One-way → two-way: turn from left curb lane into lane just right of centre line, then move to right curb lane when safe.",
              "One-way → one-way: turn from left curb lane into the left curb lane."
            ]
          }
        ]
      },
      {
        "name": "Left-turn lanes (dedicated and two-way centre lanes)",
        "description": "Use marked left-turn lanes properly; two-way left-turn lanes are for turning only, not passing.",
        "keywords": ["left-turn lane", "marked lane", "two-way left-turn lane", "centre lane", "not for passing", "driveway turn"],
        "topics": [
          {
            "title": "Dedicated left-turn lanes",
            "points": [
              "If left-turn lanes are marked, make your turn from the marked lane.",
              "Keep your lane position as you turn onto the other road."
            ]
          },
          {
            "title": "Two-way left-turn lane (centre lane) steps",
            "points": [
              "Signal and move into the centre lane shortly before your turn; slow down.",
              "Move forward to a spot opposite the road/driveway you want to turn into.",
              "Turn when the way is clear.",
              "Watch for vehicles from the opposite direction also using the lane.",
              "These centre lanes are not for passing."
            ]
          }
        ]
      },
      {
        "name": "Left turn on a red light",
        "description": "Allowed only in specific one-way to one-way situations, after stopping and yielding.",
        "keywords": ["left turn on red", "one-way to one-way", "complete stop", "yield", "pedestrians", "traffic"],
        "topics": [
          {
            "title": "Left-on-red rule",
            "points": [
              "You may turn left on a red light from a one-way road to a one-way road.",
              "You must first come to a complete stop.",
              "Proceed only when the way is clear.",
              "Yield to pedestrians and traffic."
            ]
          }
        ]
      },
      {
        "name": "Driving through roundabouts",
        "description": "Choose the correct lane early, yield to circulating traffic, keep moving, don’t change lanes inside, and signal your exit.",
        "keywords": ["roundabout", "yield line", "yield to the left", "counter-clockwise", "no lane changes", "signal exit", "splitter islands", "traffic circle"],
        "topics": [
          {
            "title": "Approach (before entering)",
            "points": [
              "Look for signs to choose your exit and lane.",
              "Use left lane to turn left or go straight; use right lane to turn right or go straight.",
              "Do not enter from the right lane if you intend to turn left.",
              "Slow down and watch for pedestrians near the yield line; stay in your lane.",
              "Cyclists may ride in the centre of the lane or dismount and use crosswalks like pedestrians."
            ]
          },
          {
            "title": "Enter (yield and gap selection)",
            "points": [
              "Check vehicles already circulating and those waiting to enter (including cyclists).",
              "Look left: circulating traffic has the right-of-way; stop at the yield sign if needed.",
              "Enter only when there is an adequate gap.",
              "Do not enter directly beside another vehicle already in the roundabout (it may be exiting)."
            ]
          },
          {
            "title": "Inside the roundabout",
            "points": [
              "Travel counter-clockwise and keep to the right of the central island.",
              "Do not stop except to avoid a collision.",
              "Do not change lanes while in the roundabout.",
              "If you miss your exit, continue around to your exit again."
            ]
          },
          {
            "title": "Exit",
            "points": [
              "Signal your exit and watch for pedestrians.",
              "Stay in your lane: if you entered from the left lane, stay left; if you entered from the right lane, stay right.",
              "After passing the exit before yours, use your right-turn signal to indicate your intent to exit.",
              "If exiting from the left lane, watch for vehicles on the right that continue circulating."
            ]
          }
        ]
      },
      {
        "name": "Roundabout special situations",
        "description": "Give large vehicles extra space; handle emergency vehicles correctly; understand differences between modern roundabouts and older traffic circles.",
        "keywords": ["roundabout", "large vehicles", "trucks", "buses", "apron", "emergency vehicles", "traffic circles", "splitter islands"],
        "topics": [
          {
            "title": "Large vehicles",
            "points": [
              "Allow extra room alongside trucks and buses; they may swing wide on approach or within the roundabout.",
              "Large vehicles may need the full width of the roadway and may use the apron if provided.",
              "A large vehicle may need to occupy both lanes before entering—give plenty of space."
            ]
          },
          {
            "title": "Emergency vehicles",
            "points": [
              "If you are in the roundabout when an emergency vehicle approaches, exit at your intended exit and proceed beyond the traffic island before pulling over.",
              "If you have not entered yet, pull over to the right (if possible) and wait until the emergency vehicle passes."
            ]
          },
          {
            "title": "Roundabouts vs older traffic circles",
            "points": [
              "Older traffic circles are larger and can involve higher speeds with merge/weave movements.",
              "Modern roundabouts are smaller and use splitter islands to slow traffic and provide pedestrian refuge.",
              "Modern roundabouts operate on a “yield to the left” principle: circulating traffic has the right-of-way over entering vehicles."
            ]
          }
        ]
      },
      {
        "name": "Backing up (reversing)",
        "description": "Reverse slowly with full head-and-shoulder checks; know legal limits for reversing on high-speed divided roads.",
        "keywords": ["backing up", "reversing", "look over shoulder", "children", "cyclists", "reverse gear", "illegal reverse", "80 km/h divided road"],
        "topics": [
          {
            "title": "Safe reversing routine",
            "points": [
              "Take extra care and move slowly when reversing.",
              "Before reversing, check that the way is clear behind you (especially for children and cyclists).",
              "Put the gear selector in reverse, turn sideways in your seat, and look over your shoulder in the direction you’re moving.",
              "If reversing straight back or to the right: look over your right shoulder.",
              "If reversing to the left: look over your left shoulder, and also check the opposite shoulder.",
              "If turning while reversing, ensure the front end does not hit anything."
            ]
          },
          {
            "title": "Seatbelt note while reversing",
            "points": [
              "You do not have to wear a seatbelt while backing up.",
              "If needed to see properly, you may remove your seatbelt while reversing, but buckle up again before moving forward."
            ]
          },
          {
            "title": "Legal restriction on reversing",
            "points": [
              "It is illegal to drive in reverse on a divided road with a speed limit over 80 km/h (including the shoulder).",
              "Exception: reversing may be permitted if you are trying to help someone in trouble."
            ]
          }
        ]
      },
      {
        "name": "Turning around (U-turns and three-point turns)",
        "description": "Choose the safest option (around the block) when possible; U-turns and three-point turns have visibility and location restrictions.",
        "keywords": ["turning around", "U-turn", "three-point turn", "150 metres", "illegal locations", "railway crossing", "hilltop", "bridge", "tunnel", "curve"],
        "topics": [
          {
            "title": "Safest option",
            "points": [
              "If possible, the simplest and safest way to turn around is to drive around the block."
            ]
          },
          {
            "title": "U-turn rules",
            "points": [
              "Check for signs prohibiting U-turns before attempting one.",
              "Do not make a U-turn on a curve, on or near a railway crossing or hilltop, or near a bridge/tunnel that blocks your view.",
              "Never make a U-turn unless you can see at least 150 metres in both directions.",
              "To perform: signal right, pull over to the right, stop; then signal left and turn quickly/sharply into the opposite lane when traffic is clear."
            ]
          },
          {
            "title": "Three-point turn steps (for narrow roads)",
            "points": [
              "Do not make a three-point turn on a curve, on or near a railway crossing or hilltop, or near a bridge/tunnel that blocks your view.",
              "Start from the far right side of the road.",
              "Signal left; when clear, move forward and turn sharply left toward the far curb; stop near the left side.",
              "Shift to reverse; signal right; when still clear, back up slowly turning sharply right to the other side; stop.",
              "Shift to forward gear; check traffic; when clear, drive forward."
            ]
          }
        ]
      },
      {
        "name": "Summary",
        "content": "By the end of this section, you should know: how to properly turn left or right at intersections; rules for turns on one-way streets; how to navigate roundabouts; how to reverse safely; and how to turn around using U-turns and three-point turns.",
        "keywords": ["summary", "right turns", "left turns", "one-way streets", "roundabouts", "backing up", "U-turns", "three-point turns"]
      }
    ]
  },

  {
    "title": "Changing positions",
    "description": "How to change lanes and pass safely: proper sequence, legal restrictions, special passing situations (night, streetcars), and how to cooperate when others pass you.",
    "icon": "move-horizontal",
    "sections": [
      {
        "name": "Overview: changing position safely",
        "description": "Changing position includes changing lanes and overtaking/passing—only do it when you have enough space and time.",
        "keywords": ["changing positions", "changing lanes", "passing", "space", "time", "safe move"],
        "topics": [
          {
            "title": "Core safety rule",
            "points": [
              "Before changing lanes or passing, make sure you have enough space and time to complete the move safely."
            ]
          }
        ]
      },
      {
        "name": "Changing lanes",
        "description": "Lane changes must be signalled and checked (mirrors + blind spot) before moving; avoid sudden or unnecessary lane changes.",
        "keywords": ["lane change", "signal", "mirrors", "blind spot", "shoulder check", "yield", "weaving", "intersection"],
        "topics": [
          {
            "title": "When you might need to change lanes",
            "points": [
              "To overtake another vehicle.",
              "To avoid a parked vehicle.",
              "When the vehicle ahead slows to turn at an intersection."
            ]
          },
          {
            "title": "Lane change steps (sequence)",
            "points": [
              "Check mirrors for a safe space in traffic.",
              "Check blind spot by looking over your shoulder in the direction of the lane change (watch for bicycles and small vehicles).",
              "Signal left or right.",
              "Check again to make sure the way is clear (watch for fast vehicles from behind or from two lanes over).",
              "Steer gradually into the new lane; do not slow down—maintain speed or gently increase it."
            ]
          },
          {
            "title": "Lane change cautions",
            "points": [
              "Never make sudden lane changes by cutting in front of another vehicle (including bicycles).",
              "Even if you signal, other drivers expect you to yield the right-of-way.",
              "Avoid unnecessary lane changes or weaving—risk increases in heavy traffic or bad weather.",
              "Don’t change lanes in or near an intersection."
            ]
          }
        ]
      },
      {
        "name": "Passing (overtaking)",
        "description": "Passing is changing lanes to move past a slower vehicle—only pass when you’re sure it can be done safely and legally.",
        "keywords": ["passing", "overtaking", "slower vehicle", "safe distance", "clear ahead", "snow plows", "don’t pass"],
        "topics": [
          {
            "title": "When passing might be considered",
            "points": [
              "Some road users are slower than through traffic (e.g., cyclists, road service vehicles, vehicles preparing to turn).",
              "You may want to pass slower moving vehicles when it’s safe and legal."
            ]
          },
          {
            "title": "Passing rule: safety first",
            "points": [
              "Never overtake and pass unless you are sure you can do so without danger to yourself or others.",
              "Don’t pass moving snow plows under any conditions.",
              "If in doubt, do not pass."
            ]
          },
          {
            "title": "Passing steps (sequence)",
            "points": [
              "Signal left and check that the way is clear ahead and behind before moving into the passing lane.",
              "Watch for bicycles or small vehicles hidden in front of the vehicle you’re passing.",
              "Watch for vehicles turning left ahead of you and vehicles/pedestrians entering from another road or driveway.",
              "After overtaking, signal right to return.",
              "Move back only when you can see the entire front of the vehicle you passed in your inside mirror.",
              "Do not cut off the vehicle by suddenly moving in front of it."
            ]
          },
          {
            "title": "If speeds change during a pass",
            "points": [
              "If the vehicle you are passing speeds up, do not race—return to your original lane.",
              "Do not speed up when another driver is trying to pass you; it is unlawful and dangerous."
            ]
          }
        ]
      },
      {
        "name": "Legal passing restrictions (where you must not pass)",
        "description": "Certain areas prohibit passing due to reduced sight lines and higher risk.",
        "keywords": ["no passing", "30 metres", "pedestrian crossover", "bridge", "viaduct", "tunnel", "crest of hill", "curve", "obstructed vision"],
        "topics": [
          {
            "title": "Passing prohibitions (key distances/places)",
            "points": [
              "Passing within 30 metres of a pedestrian crossover is not permitted.",
              "Passing left of a centreline is not permitted within 30 metres of a bridge, viaduct, or tunnel.",
              "Don’t pass when approaching the crest of a hill or on a curve where your view of oncoming traffic is obstructed.",
              "Don’t pass when there isn’t enough clear distance ahead to pass safely."
            ]
          }
        ]
      },
      {
        "name": "Passing parked vehicles and small road users",
        "description": "Parked vehicles and small vehicles add surprise hazards; don’t treat lane positioning changes as an invitation to pass in-lane.",
        "keywords": ["parked vehicles", "opening doors", "motorcycles", "bicycles", "mopeds", "limited-speed motorcycles", "same lane passing"],
        "topics": [
          {
            "title": "Parked-vehicle hazards",
            "points": [
              "When passing parked vehicles, watch for people suddenly opening doors or doors opened for loading/unloading."
            ]
          },
          {
            "title": "Motorcycles/bikes may shift within their lane",
            "points": [
              "Smaller vehicles may move within their lane to avoid hazards or to be seen.",
              "Do not take this as an invitation to pass within the same lane.",
              "If you want to pass motorcycles/bicycles/mopeds, do so by changing lanes."
            ]
          }
        ]
      },
      {
        "name": "When others want to pass you",
        "description": "Cooperate to reduce risk—move right and help the passing vehicle return safely.",
        "keywords": ["being passed", "move right", "undivided road", "oncoming traffic", "slow down", "truck passing lane"],
        "topics": [
          {
            "title": "Cooperative driving",
            "points": [
              "When faster traffic wants to pass you, move to the right and let it pass safely.",
              "If being passed on an undivided road (passer in opposite lane), pay attention to oncoming traffic and move closer to the right side of your lane.",
              "Be prepared to slow down to let the passing driver return in front of you more quickly to prevent a collision."
            ]
          },
          {
            "title": "High-speed multi-lane roads and trucks",
            "points": [
              "On many high-speed roads with 3+ lanes each direction, trucks are not allowed in the far left lane.",
              "The lane next to the far left can become the truck passing lane.",
              "If you are in that lane and a truck wants to pass, move into the right-hand lane as soon as you can."
            ]
          }
        ]
      },
      {
        "name": "Passing at night",
        "description": "Use high beams carefully to improve visibility without blinding others; time your lane changes based on mirror visibility.",
        "keywords": ["passing at night", "headlights", "low beams", "high beams", "rear view mirror", "signal"],
        "topics": [
          {
            "title": "Night passing steps",
            "points": [
              "Switch to low beams as you approach a vehicle from behind.",
              "Signal, check mirrors and blind spot, and pull out to pass.",
              "As you move alongside the vehicle, switch on high beams to see more of the road ahead.",
              "When you can see the entire front of the passed vehicle in your rear view mirror, signal and return to the right lane."
            ]
          }
        ]
      },
      {
        "name": "Passing and climbing lanes",
        "description": "Special lanes help faster traffic pass safely and allow slower vehicles to keep right; watch for lane-ending signs.",
        "keywords": ["passing lane", "climbing lane", "lane ending", "merge safely", "advance sign"],
        "topics": [
          {
            "title": "How to use passing/climbing lanes",
            "points": [
              "Some roads add a passing or climbing lane so slower vehicles can move into the right lane and faster vehicles can pass on the left.",
              "Advance signs warn of an upcoming passing opportunity.",
              "Another sign warns when the lane is ending so drivers can merge safely."
            ]
          }
        ]
      },
      {
        "name": "Passing on the shoulder",
        "description": "Shoulder passing is limited to specific situations and only on the right paved shoulder.",
        "keywords": ["passing on the shoulder", "right shoulder", "paved shoulder", "left shoulder not permitted"],
        "topics": [
          {
            "title": "Shoulder passing rule",
            "points": [
              "You may drive on the right shoulder only to pass a vehicle turning left, and only if the shoulder is paved.",
              "You may not pass on the left shoulder (paved or not)."
            ]
          }
        ]
      },
      {
        "name": "Passing on the right",
        "description": "Right-side passing is allowed in limited situations but is riskier; avoid sudden right passes.",
        "keywords": ["pass on the right", "multi-lane", "one-way", "streetcar", "left-turning vehicle", "dangerous", "sudden lane change"],
        "topics": [
          {
            "title": "When passing on the right is allowed",
            "points": [
              "On multi-lane roads or one-way roads.",
              "When overtaking a streetcar (unless on a one-way road).",
              "When passing a left-turning vehicle."
            ]
          },
          {
            "title": "Why it’s riskier",
            "points": [
              "Passing on the right can be more dangerous than passing on the left.",
              "Avoid sudden lane changes to pass on the right—drivers ahead may move right at the same time."
            ]
          }
        ]
      },
      {
        "name": "Passing streetcars",
        "description": "Pass streetcars on the right (except on one-way roads) and leave space for passengers at stops.",
        "keywords": ["streetcar", "pass on the right", "two metres", "rear doors", "passengers", "safety island", "reasonable speed"],
        "topics": [
          {
            "title": "Streetcar passing rules",
            "points": [
              "You must pass streetcars on the right unless you are driving on a one-way road.",
              "At streetcar stops, stay at least two metres behind the rear doors where passengers are getting on/off.",
              "This rule does not apply where a special passenger area is set aside.",
              "Pass these areas at a reasonable speed and be prepared for pedestrians to move suddenly."
            ]
          }
        ]
      },
      {
        "name": "Summary",
        "content": "By the end of this section, you should know: safety considerations and step-by-step sequences for changing lanes and passing, plus special passing situations (night, streetcars) and key legal restrictions (e.g., 30 m rules).",
        "keywords": ["summary", "changing lanes", "passing", "30 metres", "night passing", "streetcars", "shoulder passing"]
      }
    ]
  },

  {
    "title": "Parking along roadways",
    "description": "Parking rules and best practices: where you can’t park, how to avoid dooring cyclists (Dutch reach), accessible parking permits, parallel parking steps, hill parking wheel direction, and how to do a roadside stop and re-enter traffic safely.",
    "icon": "parking-square",
    "sections": [
      {
        "name": "Basic parking rules",
        "description": "General restrictions that often apply even if they aren’t all posted on signs.",
        "keywords": ["parking rules", "no parking", "125 metres", "fire hydrant", "intersection", "traffic lights", "railway crossing", "bridge", "sidewalk", "crosswalk", "snow clearing"],
        "topics": [
          {
            "title": "Where you must not park (high-level rules)",
            "points": [
              "Always obey signs for no stopping/standing/parking—parking rules vary by road and by-law.",
              "Never park on the travelled part of the road; if you must stop, pull onto the shoulder.",
              "Never park on a curve or hill, or anywhere you don’t have a clear view for at least 125 metres in both directions.",
              "Do not park where you block another parked vehicle, a sidewalk, crosswalk, pedestrian crossing, or road entrance.",
              "Do not park within 3 metres of a fire hydrant.",
              "Do not park on or within 100 metres of a bridge.",
              "Do not park within 6 metres of a public entrance to a hotel, theatre, or public hall when open to the public.",
              "Do not park within 9 metres of an intersection (or within 15 metres if controlled by traffic lights).",
              "Do not park within 15 metres of the nearest rail of a level railway crossing.",
              "Do not park where you interfere with traffic flow or snow clearing."
            ]
          }
        ]
      },
      {
        "name": "Opening doors safely (avoid ‘dooring’)",
        "description": "Dooring is preventable: check for cyclists and traffic before opening doors, especially on streets with curbside parking.",
        "keywords": ["dooring", "cyclists", "dutch reach", "shoulder check", "opening door", "parked cars"],
        "topics": [
          {
            "title": "Door safety rules",
            "points": [
              "Never open your door without first making sure it won’t endanger others or interfere with traffic.",
              "Use extra precautions to avoid opening a door into the path of cyclists riding close to parked cars.",
              "Use the Dutch reach method: open the driver’s door with your right hand to force a shoulder check.",
              "If you must open a door next to traffic, keep it open only as long as needed for loading/unloading."
            ]
          }
        ]
      },
      {
        "name": "After parking: secure the vehicle",
        "description": "Reduce theft risk and prevent rollaways; protect children and animals.",
        "keywords": ["turn off ignition", "remove key", "lock door", "theft", "children", "animals", "signal before pulling out"],
        "topics": [
          {
            "title": "Secure-and-leave checklist",
            "points": [
              "Turn off the ignition and lights, remove the key, and lock the doors.",
              "Do not leave children or animals in the vehicle.",
              "Before moving from a parked position, signal and check traffic; pull out only when it is safe."
            ]
          }
        ]
      },
      {
        "name": "Accessible parking permits",
        "description": "Who can use accessible parking spaces and how permits work.",
        "keywords": ["accessible parking permit", "disabled parking", "serviceontario", "permit types", "misuse", "fines", "revoked privileges"],
        "topics": [
          {
            "title": "What the permit allows",
            "points": [
              "An Accessible Parking Permit is displayed on the dashboard or turned-down sun visor.",
              "It allows the vehicle (when the permit holder is travelling in it) to park in designated disabled parking/standing/stopping areas.",
              "The permit is issued to the person, not to a specific vehicle."
            ]
          },
          {
            "title": "Eligibility and permit types",
            "points": [
              "The permit is issued free of charge to qualified individuals with certification from an approved health professional.",
              "There are four permit types: regular (blue), temporary (red), traveller (purple), and company (green), each with specific validity periods and rules."
            ]
          },
          {
            "title": "Misuse rules",
            "points": [
              "Never park in accessible spaces (or reserved curb areas) unless you display a valid permit that belongs to you or a passenger.",
              "Misuse/abuse should be reported to police.",
              "Misuse can result in fines and revoked privileges."
            ]
          }
        ]
      },
      {
        "name": "Parallel parking",
        "description": "Step-by-step method to parallel park safely and accurately.",
        "keywords": ["parallel parking", "one and a half times", "one metre", "reverse", "steering wheel", "parking brake", "manual transmission"],
        "topics": [
          {
            "title": "Parallel parking setup",
            "points": [
              "Parallel parking means parking with wheels parallel and next to the curb/side of road.",
              "Park on the right side in the direction of traffic (unless one-way rules/signs allow otherwise).",
              "Choose a space about one and a half times the length of your vehicle.",
              "Check traffic and signal; pull alongside the vehicle ahead of the space, leaving about one metre between vehicles.",
              "Stop when your rear bumper lines up with the other vehicle."
            ]
          },
          {
            "title": "Parallel parking steps (right side)",
            "points": [
              "Reverse slowly, turning the steering wheel fully toward the curb.",
              "When you can see the outside rear corner of the vehicle ahead of the space, straighten wheels while continuing to reverse.",
              "Turn the steering wheel fully toward the road to bring your vehicle in line with the curb.",
              "If you are not parallel, pull forward and straighten.",
              "Set the parking brake; shift to Park (or first/reverse for manual).",
              "Turn off engine, remove key, check traffic before opening door, lock vehicle."
            ]
          }
        ]
      },
      {
        "name": "Parking on a hill",
        "description": "Wheel direction matters to prevent rollaways depending on uphill/downhill and curb/no curb.",
        "keywords": ["hill parking", "wheel direction", "downhill", "uphill", "curb", "no curb", "parking brake", "manual transmission"],
        "topics": [
          {
            "title": "Wheel direction rules",
            "points": [
              "Facing downhill: turn front wheels toward the curb/right shoulder (so a roll moves into the curb/shoulder, not traffic).",
              "Facing uphill with a curb: turn wheels left (toward the road) so the tires catch the curb if the vehicle rolls back.",
              "Facing uphill without a curb: turn wheels sharply right so a roll moves off the road rather than into traffic."
            ]
          },
          {
            "title": "Hill parking secure checklist",
            "points": [
              "Always set the parking brake.",
              "Shift into Park (or first/reverse for manual).",
              "Turn off engine, remove key, check traffic before opening door, lock vehicle."
            ]
          }
        ]
      },
      {
        "name": "Roadside stop",
        "description": "How to pull over temporarily, stop parallel to the curb/edge, and use signals/hazards correctly.",
        "keywords": ["roadside stop", "shoulder", "hazard lights", "signal timing", "30 centimetres", "blind spot", "park", "neutral"],
        "topics": [
          {
            "title": "Pulling over for a short stop",
            "points": [
              "Before slowing, check mirrors and blind spot until the way is clear.",
              "Signal before slowing down, but avoid signalling too early if there are side roads/driveways (drivers may think you are turning).",
              "Steer to the side and reduce speed steadily; stop parallel to the curb/edge within about 30 cm.",
              "Do not stop where you block an entrance or other traffic.",
              "Turn off your signal and turn on hazard lights."
            ]
          },
          {
            "title": "Secure the vehicle for a roadside stop",
            "points": [
              "Automatic: shift to Park and set parking brake.",
              "Manual: set parking brake and shift to neutral if engine stays on, or low/reverse if engine off.",
              "On hills, position wheels against the curb appropriately to prevent rolling."
            ]
          }
        ]
      },
      {
        "name": "Pulling out from a roadside stop",
        "description": "Re-enter traffic safely with proper checks and smooth acceleration.",
        "keywords": ["pulling out", "re-enter traffic", "left signal", "blind spot", "cyclists", "accelerate smoothly", "blend"],
        "topics": [
          {
            "title": "Re-entering traffic steps",
            "points": [
              "Release parking brake and shift to Drive/first gear.",
              "Turn off hazard flashers and turn on left-turn signal.",
              "Just before pulling out, check mirrors and blind spot for vehicles and cyclists.",
              "Accelerate smoothly to blend with traffic (moderate in light traffic; quicker in heavy traffic as needed).",
              "Turn off left signal once you’re back on the road."
            ]
          }
        ]
      },
      {
        "name": "Summary",
        "content": "By the end of this section, you should know: basic parking rules (including distance restrictions), how to avoid dooring, accessible parking permit rules, how to parallel park, how to park on hills, and how to do a roadside stop and re-enter traffic safely.",
        "keywords": ["summary", "parking rules", "parallel parking", "hill parking", "dutch reach", "accessible parking permit", "roadside stop"]
      }
    ]
  },

  {
    "title": "Freeway driving",
    "description": "How to enter, drive on, and exit freeways safely, including lane discipline and High Occupancy Vehicle (HOV) lane rules.",
    "icon": "highway",
    "sections": [
      {
        "name": "What a freeway is",
        "description": "Freeways (expressways) are high-speed, multi-lane roads with separated directions and ramps for entry/exit.",
        "keywords": ["freeway", "expressway", "high-speed", "multi-lane", "separated directions", "ramps", "no intersections"],
        "topics": [
          {
            "title": "Freeway basics",
            "points": [
              "A freeway (expressway) is a high-speed, multi-lane road.",
              "Traffic in each direction is separated, and ramps let vehicles enter and exit.",
              "Freeway driving can be more demanding due to higher speeds.",
              "Because there are no intersections, bicycles, or pedestrians, freeway driving can be safer for experienced drivers."
            ]
          },
          {
            "title": "New driver note (G1)",
            "points": [
              "New drivers should learn low-speed driving with traffic first before trying freeway driving.",
              "Class G1 drivers may only drive on freeways with a licensed driving instructor."
            ]
          }
        ]
      },
      {
        "name": "Entering a freeway",
        "description": "Use the entrance ramp and acceleration lane to match speed and merge smoothly.",
        "keywords": ["entering freeway", "entrance ramp", "acceleration lane", "merge", "signal", "match speed", "left-side ramp"],
        "topics": [
          {
            "title": "Ramp + acceleration lane (how to merge)",
            "points": [
              "Freeway entrances usually have an entrance ramp and an acceleration lane.",
              "On the ramp, look ahead and check mirrors and blind spots to assess traffic and choose a safe gap.",
              "In the acceleration lane, increase speed to match freeway traffic before merging.",
              "Signal and merge smoothly into the nearest freeway lane.",
              "Drivers already on the freeway should move over (if safe) to leave room for merging vehicles."
            ]
          },
          {
            "title": "Left-side entrance ramps",
            "points": [
              "Some ramps enter from the left, meaning you join the fastest lane first.",
              "Use the acceleration lane to match traffic speed and be ready to accelerate more quickly."
            ]
          }
        ]
      },
      {
        "name": "Driving along a freeway",
        "description": "Drive steady, scan far ahead, keep right except to pass, and maintain extra space—especially near large vehicles.",
        "keywords": ["steady speed", "scan", "15 to 20 seconds", "keep right", "passing lane", "large vehicles", "space cushion", "lane change", "illegal cut-off"],
        "topics": [
          {
            "title": "Safe freeway habits",
            "points": [
              "Travel at a steady speed and anticipate what’s ahead.",
              "Keep scanning: look far ahead (about 15–20 seconds ahead, or as far as you can see) and check mirrors frequently.",
              "Keep to the right; use left lanes mainly for passing."
            ]
          },
          {
            "title": "Space + large vehicles",
            "points": [
              "Stay clear of large vehicles—they block your view more than other vehicles.",
              "Leave space around your vehicle so you can see clearly and have time/room to react."
            ]
          },
          {
            "title": "Lane changes and cutting off",
            "points": [
              "Do not cut off any vehicle when changing lanes or joining traffic.",
              "It is dangerous and illegal for a slower vehicle to cut in front of a faster-moving vehicle."
            ]
          },
          {
            "title": "Left lane discipline (including truck rule)",
            "points": [
              "Use the far-left lane to pass traffic moving slower than the speed limit—don’t stay there.",
              "Drive in the right-hand lane when possible.",
              "On many freeways with three or more lanes per direction, large trucks cannot use the far-left lane and must pass in the lane to the right—keep lanes clear for passing."
            ]
          }
        ]
      },
      {
        "name": "Leaving a freeway",
        "description": "Use the deceleration lane to slow down after exiting the main flow; avoid speed adaptation errors; never stop or reverse if you miss an exit.",
        "keywords": ["leaving freeway", "deceleration lane", "exit ramp", "intersection", "stop sign", "yield sign", "traffic light", "speed adaptation", "velocitization", "missed exit"],
        "topics": [
          {
            "title": "Exit sequence",
            "points": [
              "Freeway exits usually include: a deceleration lane, an exit ramp, and an intersection (stop/yield/light).",
              "Signal to move into the deceleration lane, but do not slow down until you are in that lane.",
              "Once in the deceleration lane, reduce speed gradually to the posted ramp speed.",
              "Check your speedometer—after high speeds, you may not realize how fast you’re going."
            ]
          },
          {
            "title": "Speed adaptation (velocitization) risk",
            "points": [
              "After driving at freeway speed, it can be harder to judge speed accurately when exiting.",
              "Be prepared to stop at the end of the exit ramp."
            ]
          },
          {
            "title": "If you miss an exit",
            "points": [
              "Do not stop or reverse on the freeway.",
              "Take the next exit."
            ]
          }
        ]
      },
      {
        "name": "High Occupancy Vehicle (HOV) lanes",
        "description": "HOV lanes are reserved for eligible vehicles with a minimum number of occupants; rules include buffer restrictions and exemptions.",
        "keywords": ["HOV lane", "high occupancy vehicle", "carpool", "transit", "striped buffer", "illegal to cross", "exempt", "buses", "emergency vehicles", "green plate", "taxis", "airport limousines", "6.5 metres"],
        "topics": [
          {
            "title": "What HOV lanes are for",
            "points": [
              "HOV lanes are designed for certain vehicles with a specified minimum number of occupants.",
              "They can save time and encourage carpooling and transit use.",
              "They are open 24 hours a day, seven days a week.",
              "They can move more people than a general traffic lane and can reduce congestion and emissions."
            ]
          },
          {
            "title": "Who can use provincial highway HOV lanes",
            "points": [
              "Typically reserved for vehicles carrying at least two people (driver + at least one passenger) in eligible vehicle types (e.g., cars, minivans, motorcycles, pickup trucks, buses).",
              "Commercial motor vehicles must have two or more people and be less than 6.5 metres in total length.",
              "Single-occupant taxis and airport limousines are permitted.",
              "Vehicles with “Green” licence plates are permitted with any number of occupants (eligible plug-in hybrids and full battery-electric vehicles)."
            ]
          },
          {
            "title": "Buffer zone rule",
            "points": [
              "HOV lanes are separated from general lanes by a striped buffer zone.",
              "It is illegal and unsafe to cross the striped buffer pavement markings."
            ]
          },
          {
            "title": "Exemptions and enforcement",
            "points": [
              "Buses can use HOV lanes at any time regardless of occupants.",
              "Emergency vehicles (police, fire, ambulance) are exempt.",
              "Improper use can result in being stopped and ticketed; you may be required to re-enter general lanes at the next entry/exit zone."
            ]
          }
        ]
      },
      {
        "name": "Summary",
        "content": "Know what a freeway is, safe practices for entering/driving/exiting, and what HOV lanes are and who can use them.",
        "keywords": ["summary", "freeway", "entering", "driving along", "exiting", "HOV lanes"]
      }
    ]
  },

  {
    "title": "Dealing with particular situations",
    "description": "How to handle higher-risk or unusual road situations: aggressive driving and road rage, street racing, drowsy driving, construction/work zones, animals on the road, distracted driving laws and tips, and reacting to emergency vehicles and stopped tow trucks.",
    "icon": "alert-triangle",
    "sections": [
      {
        "name": "Aggressive driving and road rage",
        "description": "Aggressive driving can trigger dangerous conflicts. Stay calm, drive courteously, and avoid escalating situations.",
        "keywords": ["aggressive driving", "road rage", "tailgating", "speeding", "failure to yield", "cutting off", "retaliation", "stress"],
        "topics": [
          {
            "title": "Avoid becoming angry on the road",
            "points": [
              "Recognize stress and reduce it (fresh air, slow deep breathing, relaxing music).",
              "Decide not to bring personal problems into your driving.",
              "On long trips, take breaks every few hours.",
              "Don’t compete with or retaliate against other drivers.",
              "Don’t try to “educate” other drivers—leave enforcement to police.",
              "Don’t take others’ mistakes personally.",
              "Avoid honking unless necessary; a light tap is usually enough.",
              "If you drive responsibly and courteously, you’re less likely to spark road rage."
            ]
          },
          {
            "title": "If you feel threatened by another driver",
            "points": [
              "Stay in your vehicle and lock the doors.",
              "Call police if you have a phone.",
              "Use horn and signals to attract attention.",
              "If you believe you’re being followed, don’t drive home—drive to a police station or a busy public place.",
              "Avoid eye contact and don’t gesture back; keep away from erratic drivers."
            ]
          }
        ]
      },
      {
        "name": "Street racing",
        "description": "Street racing is extremely dangerous and can lead to Criminal Code charges.",
        "keywords": ["street racing", "reckless", "criminal code", "serious risk", "injury", "death"],
        "topics": [
          {
            "title": "Why it’s serious",
            "points": [
              "Street racing shows a callous disregard for others and puts everyone at serious risk.",
              "Street racers may be charged under the Criminal Code of Canada."
            ]
          }
        ]
      },
      {
        "name": "Drowsy driving",
        "description": "Tired driving can impair you like alcohol; recognize warning signs and stop to rest.",
        "keywords": ["drowsy driving", "fatigue", "2 a.m. to 6 a.m.", "2 p.m. to 4 p.m.", "sleep disorders", "shift workers", "reaction time"],
        "topics": [
          {
            "title": "High-risk times and groups",
            "points": [
              "Collisions involving drowsiness often occur late night/early morning (2 a.m.–6 a.m.) or late afternoon (2 p.m.–4 p.m.).",
              "Shift workers, people with untreated sleep disorders, and commercial drivers are at greater risk."
            ]
          },
          {
            "title": "8 warning signs you’re too drowsy to drive",
            "points": [
              "Difficulty keeping your eyes open.",
              "Your head tilts forward despite trying to stay alert.",
              "Mind wanders; you can’t concentrate.",
              "Frequent yawning.",
              "You can’t remember details from the last few kilometres.",
              "Missing traffic lights and signals.",
              "Vehicle drifts into the next lane; you have to jerk it back.",
              "You drift off the road and narrowly avoid a crash."
            ]
          },
          {
            "title": "What to do if you’re drowsy",
            "points": [
              "Pull off the road and park in a safe, secure place (use well-lit rest stops or busy truck stops).",
              "Lock doors, roll up windows, and take a nap.",
              "Stimulants are not a substitute for sleep (caffeine, loud music, open window wear off quickly).",
              "You can fall asleep without realizing it—sleep is the only real fix."
            ]
          }
        ]
      },
      {
        "name": "Workers on the road (construction and work zones)",
        "description": "Work zones have extra hazards and lower speeds. Follow all directions, avoid lane changes, and be ready for sudden stops.",
        "keywords": ["construction zone", "work zone", "traffic-control person", "STOP sign", "SLOW sign", "doubled fines", "move over", "roadside assistance", "utility workers"],
        "topics": [
          {
            "title": "Work zone driving rules",
            "points": [
              "Proceed with caution and obey warning signs and any people/devices directing traffic.",
              "Expect lower speed limits when workers are present; hazards include uneven surfaces, gravel, narrowed lanes, and construction vehicles.",
              "In a construction zone: drive carefully, adjust to conditions, do not change lanes, be ready for sudden stops, and watch for workers/equipment.",
              "If safe, move over one lane when passing roadside hazards (e.g., disabled vehicles, roadside assistance, maintenance or utility workers)."
            ]
          },
          {
            "title": "Traffic-control workers",
            "points": [
              "Watch for traffic-control people day or night and follow their instructions.",
              "Be respectful and patient if traffic is delayed.",
              "If your lane is blocked and no one is directing traffic, yield to oncoming drivers taking turns through the detour, then proceed slowly when clear."
            ]
          },
          {
            "title": "Fines and offences",
            "points": [
              "Speeding fines are doubled in construction zones when workers are present.",
              "It is an offence to disobey STOP or SLOW signs displayed by a traffic-control person or firefighter."
            ]
          }
        ]
      },
      {
        "name": "Animals on the road",
        "description": "Animal collisions are common (especially deer/moose). Scan shoulders, slow down, and don’t swerve unpredictably.",
        "keywords": ["animals on the road", "deer", "moose", "animal crossing signs", "dusk to dawn", "high beams", "shining eyes", "horn", "report collision"],
        "topics": [
          {
            "title": "Prevention habits",
            "points": [
              "Scan the road ahead from shoulder to shoulder.",
              "Reduce speed in darkness, rain, and fog (reduced visibility).",
              "Stay alert—speed and inattention are common factors in animal collisions.",
              "Watch for shining eyes at the roadside; slow down and be ready to stop.",
              "Keep windshield clean and headlights properly adjusted.",
              "Use high beams when possible and safe, and scan both sides of the road."
            ]
          },
          {
            "title": "If you see an animal",
            "points": [
              "Slow down and sound your horn.",
              "Be alert for other animals travelling with it.",
              "Don’t try to drive around the animal—movements are unpredictable."
            ]
          },
          {
            "title": "If you want to watch an animal",
            "points": [
              "Pull completely off the road and park first.",
              "Do not park on the shoulder (other drivers may be distracted and hit you).",
              "Stay in your vehicle; getting out increases your risk of being hit by traffic."
            ]
          },
          {
            "title": "If you hit a deer or moose",
            "points": [
              "Report it to local police or the Ministry of Natural Resources.",
              "Do not try to move an injured animal."
            ]
          }
        ]
      },
      {
        "name": "Distracted driving (Ontario law + safe habits)",
        "description": "Driving requires full attention. Ontario prohibits certain device use even when stopped in traffic or at a red light.",
        "keywords": ["distracted driving", "handheld device", "texting", "dialing", "GPS", "display screens", "hands-free", "careless driving", "dangerous driving"],
        "topics": [
          {
            "title": "Illegal while driving (including at red lights)",
            "points": [
              "Texting or dialing on a hand-held phone (except calling 911 in an emergency).",
              "Using a hand-held entertainment device (tablet, portable gaming console).",
              "Viewing screens unrelated to driving (e.g., watching a video).",
              "Programming a GPS device (except by voice commands)."
            ]
          },
          {
            "title": "What is allowed",
            "points": [
              "Hands-free wireless communication using an earpiece, Bluetooth, or lapel button.",
              "Viewing a GPS screen if it’s built into the dashboard or securely mounted."
            ]
          },
          {
            "title": "Other distractions can still get you charged",
            "points": [
              "Eating, drinking, grooming, smoking, reading, or reaching for objects may not be specifically covered by the distracted driving law, but you can still be charged with careless or dangerous driving if you endanger others."
            ]
          },
          {
            "title": "Tips to avoid distracted driving",
            "points": [
              "Turn off your phone or switch it to silent before driving.",
              "Put the phone in the glove box or in a bag on the back seat.",
              "Use an outgoing message that you’re driving and will respond later.",
              "Use apps that block calls/texts or send automatic replies.",
              "Ask a passenger to handle calls/texts.",
              "If you must respond, pull over safely first.",
              "Silence notifications that tempt you to check the phone."
            ]
          },
          {
            "title": "Why it’s dangerous (key takeaways)",
            "points": [
              "Distracted driving causes serious injuries and deaths every year in Ontario.",
              "Texting/browsing takes eyes off the road and greatly increases crash risk.",
              "Young drivers (16–25) are more likely to drive distracted and face higher collision risk."
            ]
          }
        ]
      },
      {
        "name": "Emergency vehicles (moving and stopped) + tow trucks",
        "description": "You must stop for approaching emergency vehicles and slow down/move over for stopped emergency vehicles or tow trucks with flashing lights.",
        "keywords": ["emergency vehicles", "police", "fire", "ambulance", "siren", "red lights", "blue lights", "move over law", "tow truck amber lights", "150 metres", "intersection"],
        "topics": [
          {
            "title": "If an emergency vehicle approaches with lights/siren",
            "points": [
              "Bring your vehicle to an immediate stop when an emergency vehicle approaches from any direction with flashing red (or red/blue) lights or a siren/bell.",
              "Move as near as practical to the right-hand curb or edge of the roadway and stop parallel to the roadway.",
              "On a one-way road or divided highway with more than two lanes, move to the closest curb/edge.",
              "Stop clear of intersections, including highway on/off ramps.",
              "Do not stop on the shoulder if emergency vehicles may need to use it."
            ]
          },
          {
            "title": "How to pull over safely (don’t panic)",
            "points": [
              "Use extreme caution—other drivers may be reacting too.",
              "Check front/sides/rear; signal early; adjust speed gradually; avoid sudden braking or sharp moves.",
              "After the emergency vehicle passes, check that the way is clear and signal before merging back.",
              "Stay alert for additional emergency vehicles responding to the same call.",
              "It is illegal to follow within 150 metres of a fire vehicle responding to an alarm."
            ]
          },
          {
            "title": "If you’re in an intersection when it approaches",
            "points": [
              "Abandon the turn if needed and clear the intersection by proceeding straight when safe, then pull right and stop."
            ]
          },
          {
            "title": "Flashing green light (volunteer responders)",
            "points": [
              "Some firefighters/volunteer medical responders may display a flashing green light in their personal vehicle—yield the right-of-way to help them respond safely."
            ]
          },
          {
            "title": "If police signal YOU to pull over",
            "points": [
              "Follow the same general pull-over procedure, but stop outside traffic lanes and onto the shoulder where possible (or onto a side street if nearby).",
              "If the officer gives directions about where to stop, follow them."
            ]
          },
          {
            "title": "Approaching a stopped emergency vehicle or tow truck (move over + slow down)",
            "points": [
              "When approaching a stopped emergency vehicle with flashing red/red-blue lights, or a tow truck with flashing amber lights, reduce speed and proceed with caution.",
              "Brake early and gradually (match surrounding traffic and road conditions).",
              "If there are two or more lanes in your direction, move into a lane away from the stopped vehicle if safe, in addition to slowing down.",
              "Signal, check mirrors and blind spots, and change lanes well in advance of the stopped vehicle."
            ]
          },
          {
            "title": "Penalties for not responding properly",
            "points": [
              "Failing to respond to an approaching emergency vehicle can result in a fine and three demerit points for a first offence (higher penalties for additional offences, including possible jail).",
              "The same fines/penalties apply for failing to respond properly to a stopped tow truck with flashing amber lights on a highway."
            ]
          }
        ]
      },
      {
        "name": "Summary",
        "content": "By the end of this section, you should know: how to avoid and de-escalate aggressive driving/road rage; risks and warning signs of drowsy driving; how to drive in work zones; how to respond to animals on the road; Ontario distracted driving laws and prevention tips; and how to react to emergency vehicles and stopped tow trucks.",
        "keywords": ["summary", "road rage", "drowsy driving", "construction zones", "animals", "distracted driving", "emergency vehicles", "tow trucks"]
      }
    ]
  },

  {
    "title": "Dealing with particular situations",
    "description": "How to handle higher-risk or unusual situations: aggressive driving/road rage, street racing, drowsy driving, construction zones and roadside workers, animals on the road, distracted driving laws, and reacting to emergency vehicles and stopped tow trucks.",
    "icon": "alert-triangle",
    "sections": [
      {
        "name": "Aggressive driving and road rage",
        "description": "Aggressive behaviours can escalate conflict. Stay calm, be courteous, and never retaliate.",
        "keywords": ["aggressive driving", "road rage", "tailgating", "speeding", "failure to yield", "cutting off", "retaliation", "stress"],
        "topics": [
          {
            "title": "Avoid becoming angry on the road",
            "points": [
              "Recognize stress and reduce it (fresh air, slow deep breathing, relaxing music).",
              "Decide not to take personal problems with you when driving.",
              "On long trips, take breaks every few hours.",
              "Don’t compete with or retaliate against other drivers.",
              "Don’t try to “educate” other drivers—leave enforcement to police.",
              "Don’t take other drivers’ mistakes personally.",
              "Avoid honking unless necessary; a light tap is usually enough.",
              "Plan your route in advance—erratic driving is common when drivers are lost.",
              "Drive courteously: yield when appropriate, and let others merge when they signal.",
              "If you make a mistake, indicate you’re sorry—an apology can reduce conflict.",
              "Don’t return aggression: avoid eye contact and don’t gesture back; keep away from erratic drivers."
            ]
          },
          {
            "title": "If you feel threatened",
            "points": [
              "Stay in your vehicle and lock the doors.",
              "If you have a phone, call police.",
              "Use horn and signals to attract attention.",
              "If you believe you’re being followed, do not drive home—drive to a police station or a busy public place."
            ]
          }
        ]
      },
      {
        "name": "Street racing",
        "description": "Street racing is one of the most serious and reckless forms of aggressive driving and may lead to Criminal Code charges.",
        "keywords": ["street racing", "reckless", "criminal code", "injury", "death"],
        "topics": [
          {
            "title": "Key takeaways",
            "points": [
              "Street racing shows a callous disregard for other road users.",
              "It puts everyone at serious risk of injury or death.",
              "Street racers may be charged under the Criminal Code of Canada."
            ]
          }
        ]
      },
      {
        "name": "Drowsy driving",
        "description": "Tired drivers can be as impaired as drunk drivers; learn the warning signs and stop to rest.",
        "keywords": ["drowsy driving", "fatigue", "sleep", "2 a.m. to 6 a.m.", "2 p.m. to 4 p.m.", "reaction time"],
        "topics": [
          {
            "title": "When risk is higher",
            "points": [
              "Collisions involving drowsiness often occur late night/early morning (2 a.m.–6 a.m.) or late afternoon (2 p.m.–4 p.m.).",
              "Shift workers, people with undiagnosed/untreated sleep disorders, and commercial-vehicle operators are at higher risk."
            ]
          },
          {
            "title": "Warning signs you’re too drowsy to drive",
            "points": [
              "Difficulty keeping your eyes open.",
              "Head tilting forward despite trying to stay alert.",
              "Mind wandering; inability to concentrate.",
              "Frequent yawning.",
              "Can’t remember details from the last few kilometres.",
              "Missing traffic lights and signals.",
              "Vehicle drifts into another lane; you jerk it back.",
              "You drift off the road and narrowly avoid a crash."
            ]
          },
          {
            "title": "What to do",
            "points": [
              "Pull off the road and park in a safe, secure place (use well-lit rest stops or busy truck stops).",
              "Lock doors, roll up windows, and take a nap.",
              "Stimulants aren’t a substitute for sleep (caffeine, loud music, open windows wear off quickly).",
              "You can fall asleep without realizing it—sleep is the only real fix."
            ]
          }
        ]
      },
      {
        "name": "Workers on the road (construction/work zones)",
        "description": "Work zones add hazards and often lower speeds; follow all directions and drive predictably.",
        "keywords": ["construction zone", "work zone", "traffic-control person", "STOP", "SLOW", "doubled fines", "move over", "utility workers"],
        "topics": [
          {
            "title": "How to drive through work zones",
            "points": [
              "Proceed with caution and obey warning signs and any people/devices directing traffic.",
              "Expect lower speed limits and added hazards (construction vehicles, uneven/gravel surfaces, narrowed lanes).",
              "Do not change lanes in the construction zone; be ready for sudden stops.",
              "Watch for workers, construction vehicles, equipment, and roadside hazards (disabled vehicles, roadside assistance, surveyors, utility/maintenance workers).",
              "Slow down and pass with caution; if safe, move over a lane to increase space from the hazard."
            ]
          },
          {
            "title": "Traffic-control workers and one-lane detours",
            "points": [
              "Watch for traffic-control people day or night and follow instructions.",
              "Be respectful and patient if traffic is delayed.",
              "If your lane is blocked and no one is directing traffic, yield to oncoming drivers taking turns through the detour, then proceed slowly when clear."
            ]
          },
          {
            "title": "Fines and offences",
            "points": [
              "Speeding fines are doubled in construction zones when workers are present.",
              "It’s an offence to disobey STOP or SLOW signs displayed by a traffic-control person or firefighter."
            ]
          }
        ]
      },
      {
        "name": "Animals on the road",
        "description": "Animal collisions (especially deer/moose) are common; scan shoulders, slow down, and be prepared to stop.",
        "keywords": ["animals", "deer", "moose", "animal crossing signs", "dusk-to-dawn", "high beams", "shining eyes", "horn", "report collision"],
        "topics": [
          {
            "title": "Risk and awareness",
            "points": [
              "Animal collisions are a growing issue (many go unreported).",
              "Be especially cautious during dusk-to-dawn hours when wild animals are most active, and where animal-crossing signs are posted."
            ]
          },
          {
            "title": "Reduce your chance of hitting an animal",
            "points": [
              "Scan the road ahead from shoulder to shoulder.",
              "Reduce speed in darkness, rain, and fog (visibility is reduced).",
              "Stay alert—driver inattention and speed are common factors.",
              "Watch for shining eyes at the roadside; slow down and be ready to stop.",
              "Keep your windshield clean and headlights properly adjusted.",
              "Use high beams whenever possible and safe, and scan both sides of the road."
            ]
          },
          {
            "title": "If you see an animal",
            "points": [
              "Slow down and sound your horn.",
              "Be alert for other animals that may be travelling with it.",
              "Don’t try to drive around the animal—its movement can be unpredictable."
            ]
          },
          {
            "title": "If you want to watch an animal / if you hit one",
            "points": [
              "If you stop, pull completely off the road and park—do not park on the shoulder.",
              "Stay in your vehicle; getting out increases your risk of being hit.",
              "If you hit a deer or moose, report it to local police or the Ministry of Natural Resources.",
              "Do not try to move an injured animal."
            ]
          }
        ]
      },
      {
        "name": "Distracted driving (Ontario law + safer habits)",
        "description": "Ontario prohibits certain device use even when stopped at lights or in traffic; other distractions can still lead to careless/dangerous driving charges.",
        "keywords": ["distracted driving", "handheld", "texting", "dialing", "GPS", "display screens", "hands-free", "careless driving", "dangerous driving"],
        "topics": [
          {
            "title": "Illegal while driving (including stopped in traffic / at red lights)",
            "points": [
              "Texting or dialing on a handheld phone (except calling 911 in an emergency).",
              "Using a handheld entertainment device (tablet, portable gaming console).",
              "Viewing display screens unrelated to driving (e.g., watching a video).",
              "Programming a GPS device (except by voice commands)."
            ]
          },
          {
            "title": "Allowed",
            "points": [
              "Hands-free communication using an earpiece, lapel button, or Bluetooth.",
              "Viewing GPS screens if built into the dashboard or securely mounted."
            ]
          },
          {
            "title": "Still risky (and you can still be charged)",
            "points": [
              "Eating, drinking, grooming, smoking, reading, or reaching for objects may not be covered by the distracted driving law, but can still result in careless or dangerous driving charges if you endanger others.",
              "Distracted driving causes serious harm each year; vulnerable road users (pedestrians/cyclists) are heavily affected.",
              "Texting/browsing can dramatically increase crash risk and delay hazard response."
            ]
          },
          {
            "title": "Practical tips to avoid distracted driving",
            "points": [
              "Turn off your phone or switch it to silent before driving.",
              "Put the phone in the glove box or a bag on the back seat.",
              "Use an outgoing message that you’re driving and will respond later.",
              "Use apps that block calls/texts or auto-reply.",
              "Ask a passenger to handle calls/texts.",
              "If you must respond, pull over carefully to a safe area first.",
              "Silence notifications that tempt you to check your phone."
            ]
          }
        ]
      },
      {
        "name": "Emergency vehicles and stopped tow trucks",
        "description": "Pull over and stop for approaching emergency vehicles; slow down and move over (if possible) for stopped emergency vehicles and tow trucks with flashing lights.",
        "keywords": ["emergency vehicles", "police", "fire", "ambulance", "siren", "red lights", "blue lights", "flashing green", "tow truck", "amber lights", "move over", "150 metres"],
        "topics": [
          {
            "title": "Reacting to an approaching emergency vehicle",
            "points": [
              "When an emergency vehicle approaches from any direction with flashing red (or red/blue) lights or siren/bell, you must bring your vehicle to an immediate stop.",
              "Move as near as practical to the right-hand curb/edge and stop parallel to the roadway.",
              "On a one-way road or divided highway with more than two lanes, move to the closest curb/edge.",
              "Stop clear of intersections, including highway on/off ramps.",
              "Do not stop on the shoulder if emergency vehicles may be travelling along it.",
              "React quickly but calmly—don’t slam brakes or pull over suddenly; signal early and brake gradually."
            ]
          },
          {
            "title": "After it passes",
            "points": [
              "Check that the way is clear and signal before merging back.",
              "Stay alert for additional emergency vehicles responding to the same call.",
              "It’s illegal to follow within 150 metres of a fire vehicle responding to an alarm."
            ]
          },
          {
            "title": "Special notes",
            "points": [
              "If you’re in an intersection preparing to turn when an emergency vehicle approaches, abandon the turn if needed: clear the intersection by proceeding straight when safe, then pull right and stop.",
              "Some volunteer responders may display a flashing green light—yield to help them respond quickly and safely.",
              "If police/enforcement officers signal you to pull over, stop outside traffic lanes (onto the shoulder if possible) or on a nearby side street, and follow any directions."
            ]
          },
          {
            "title": "Reacting to a stopped emergency vehicle or tow truck",
            "points": [
              "If approaching a stopped emergency vehicle with flashing red/red-blue lights, or a tow truck with flashing amber lights, reduce speed and proceed with caution.",
              "Brake early and gradually; consider surrounding traffic speed and road conditions (fog, rain, snow).",
              "If there are two or more lanes in your direction, move into a lane away from the stopped vehicle if safe, in addition to slowing down.",
              "Signal before changing lanes and shoulder-check blind spots; change lanes well in advance."
            ]
          },
          {
            "title": "Penalties reminder",
            "points": [
              "Failing to stop for an approaching emergency vehicle can result in a fine and three demerit points for a first offence (higher penalties for repeat offences, including possible jail).",
              "The same fines/penalties apply for failing to respond properly to a stopped tow truck with flashing amber lights on a highway."
            ]
          }
        ]
      },
      {
        "name": "Summary",
        "content": "You should know how to handle construction zones, animals on the road, distractions and the law, and what to do when you encounter emergency vehicles or stopped tow trucks—plus how to avoid road rage and recognize drowsy driving.",
        "keywords": ["summary", "construction zones", "animals", "distracted driving", "emergency vehicles", "tow trucks", "road rage", "drowsy driving"]
      }
    ]
  },

  {
    "title": "Driving at night and in bad weather",
    "description": "How to manage reduced visibility and traction at night and in conditions like fog, rain, flooded roads, snow, whiteouts, and ice—including skid recovery, ABS/threshold braking, and safely sharing the road with snow plows.",
    "icon": "cloud-moon",
    "sections": [
      {
        "name": "Core principle: slow down when you can’t see as far",
        "description": "At night and in rain/snow/fog you can’t see as far ahead—even with headlights—so reduce speed to match visibility.",
        "keywords": ["night driving", "bad weather", "reduced visibility", "slow down", "unlit roads", "headlights"],
        "topics": [
          {
            "title": "Visibility rule of thumb",
            "points": [
              "Slow down when driving at night, especially on unlit roads.",
              "Slow down whenever weather conditions reduce your visibility."
            ]
          }
        ]
      },
      {
        "name": "Overdriving your headlights",
        "description": "Driving so fast that your stopping distance exceeds what your headlights illuminate is dangerous.",
        "keywords": ["overdriving headlights", "stopping distance", "headlight distance", "reflective signs", "misleading visibility"],
        "topics": [
          {
            "title": "What it is and why it’s risky",
            "points": [
              "You’re overdriving your headlights when you go so fast that your stopping distance is farther than you can see with your headlights.",
              "This is dangerous because you may not have enough room to stop safely.",
              "Reflective signs can mislead you into thinking you can see farther than you really can—be cautious."
            ]
          }
        ]
      },
      {
        "name": "Glare management (day and night)",
        "description": "Glare reduces awareness and visibility; use viewing technique, visors/sunglasses, and correct headlight use.",
        "keywords": ["glare", "bright headlights", "rear-view mirror glare", "sun visor", "sunglasses", "tunnel", "low beams", "high beams", "150 metres", "60 metres"],
        "topics": [
          {
            "title": "Night glare from oncoming headlights",
            "points": [
              "Look up and beyond and slightly to the right of the oncoming lights when meeting bright headlights."
            ]
          },
          {
            "title": "Daytime glare",
            "points": [
              "Use your sun visor or good quality sunglasses.",
              "When entering a tunnel on a bright day, slow down to let your eyes adjust, remove sunglasses, and turn on your headlights."
            ]
          },
          {
            "title": "Reduce glare by using proper headlight rules",
            "points": [
              "Use low beams within 150 metres of an oncoming vehicle.",
              "Use low beams when following within 60 metres.",
              "On country roads, switch to low beams at curves or hilltops so you can see oncoming headlights and avoid blinding others.",
              "If you can’t see any headlights, switch back to high beams."
            ]
          }
        ]
      },
      {
        "name": "Fog",
        "description": "Fog can reduce visibility quickly; the safest option is to avoid driving, or pull off the road if visibility becomes too poor.",
        "keywords": ["fog", "visibility", "delay trip", "pull off road", "low beams", "fog lights", "pavement markings", "right edge", "following distance", "emergency flashers"],
        "topics": [
          {
            "title": "Best option",
            "points": [
              "Avoid driving in fog when possible—check forecasts and delay travel if there’s a fog warning.",
              "If visibility decreases rapidly, move off the road into a safe parking area and wait for fog to lift."
            ]
          },
          {
            "title": "Fog DOs",
            "points": [
              "Slow down gradually and drive at a speed that suits conditions.",
              "Turn on your vehicle’s full lighting system.",
              "Use low-beam headlights (high beams reflect off moisture droplets and make it harder to see).",
              "Use fog lights if you have them (with low beams).",
              "Be patient: avoid passing, changing lanes, and crossing traffic.",
              "Use pavement markings for guidance—use the right edge of the road as a guide rather than the centre line.",
              "Increase following distance for safe braking.",
              "Look and listen for hazards ahead; keep looking as far ahead as possible.",
              "Reduce distractions (e.g., turn off the cell phone).",
              "Keep windows/mirrors clean; use defroster and wipers to maximize vision.",
              "If fog is too dense, pull completely off the road into a safe parking area; use emergency flashers plus low beams."
            ]
          },
          {
            "title": "Fog DON’Ts",
            "points": [
              "Don’t stop on the travelled portion of the road (risk of chain-reaction collisions).",
              "Don’t speed up suddenly even if fog seems to be clearing (you can quickly re-enter dense fog).",
              "Don’t speed up to pass a slow vehicle or to get away from a tailgater."
            ]
          },
          {
            "title": "Fog reminders",
            "points": [
              "Watch your speed—you may be going faster than you think; reduce speed gradually.",
              "Remain calm and patient; don’t pass or speed up suddenly.",
              "If visibility is dropping fast, pull off into a safe parking area and wait."
            ]
          }
        ]
      },
      {
        "name": "Rain and wet roads (including hydroplaning)",
        "description": "Rain reduces traction and visibility; the first rain can be especially slippery. Too much water + speed can cause hydroplaning.",
        "keywords": ["rain", "wet roads", "slippery", "hydroplaning", "tread", "wipers", "spray", "puddles", "visibility"],
        "topics": [
          {
            "title": "Rain traction + visibility effects",
            "points": [
              "Roads are slippery in rain, especially when the first drops fall.",
              "With more rain, tires make less contact with the road.",
              "If there’s too much water or you’re going too fast, tires can ride on top of water (hydroplaning), making control very difficult.",
              "Use good tires with deep tread and slow down on wet roads.",
              "Rain reduces visibility—drive slowly enough to stop within the distance you can see."
            ]
          },
          {
            "title": "Wet-weather driving habits",
            "points": [
              "Ensure windshield wipers are in good condition; replace streaking blades.",
              "Look ahead and plan; use smooth steering, braking, and acceleration to reduce skids.",
              "Leave more space in front for stopping and to reduce spray from the vehicle ahead.",
              "Avoid driving through puddles (can hide potholes, cause spray hazards, stall engine, and reduce brake effectiveness)."
            ]
          }
        ]
      },
      {
        "name": "Flooded roads and brake testing",
        "description": "Water can stop brakes from working properly; avoid flooded roads and test brakes afterward if you must drive through water.",
        "keywords": ["flooded roads", "brakes", "dry brakes", "50 km/h brake test", "spongy pedal", "pulling to one side", "repair"],
        "topics": [
          {
            "title": "Flooded-road rule",
            "points": [
              "Avoid driving on flooded roads—water may prevent your brakes from working.",
              "If you must drive through flooded road, test your brakes afterward to dry them out."
            ]
          },
          {
            "title": "Brake test procedure (when safe)",
            "points": [
              "Stop quickly and firmly at 50 km/h (only when safe to do so).",
              "Confirm the vehicle stops in a straight line without pulling to one side.",
              "Brake pedal should feel firm, not spongy; a spongy pedal is a sign of trouble.",
              "If pulling or spongy feel remains after drying, get the brakes repaired immediately."
            ]
          }
        ]
      },
      {
        "name": "Skids",
        "description": "Skids happen when tires lose grip, usually due to speed and harsh control inputs on slippery surfaces.",
        "keywords": ["skid", "loss of traction", "wet", "icy", "snow", "gravel", "too fast", "hard braking", "oversteer", "neutral"],
        "topics": [
          {
            "title": "Why skids happen",
            "points": [
              "Skids happen when one or more tires lose grip on the road.",
              "Common on wet, icy, snowy, or loose surfaces (gravel, etc.).",
              "Most skids result from driving too fast for conditions.",
              "Hard braking and aggressive turning or acceleration can trigger skids."
            ]
          },
          {
            "title": "How to avoid skids",
            "points": [
              "Reduce speed on slippery roads.",
              "Operate controls smoothly and conservatively.",
              "Avoid braking/accelerating while steering sharply (combined forces push tires toward skidding).",
              "Make turns gently and keep speed at a safe level."
            ]
          },
          {
            "title": "If you start to skid",
            "points": [
              "Don’t panic—control is often possible.",
              "Ease off the accelerator or brake.",
              "On very slippery surfaces, shift into neutral if you can.",
              "Steer in the direction you want to go (avoid oversteering).",
              "Once control returns, brake gently and smoothly as needed."
            ]
          }
        ]
      },
      {
        "name": "ABS and emergency braking",
        "description": "ABS helps prevent wheel lock and preserves steering control during hard braking, but doesn’t necessarily shorten stopping distance.",
        "keywords": ["ABS", "anti-lock brakes", "wheel lock", "pulsation", "steering control", "emergency braking", "practice"],
        "topics": [
          {
            "title": "ABS fundamentals",
            "points": [
              "ABS senses wheel speed during braking and reduces brake force to a wheel if it’s about to lock.",
              "This helps prevent tire skid and loss of steering control during heavy braking or poor traction.",
              "ABS does not necessarily shorten stopping distance."
            ]
          },
          {
            "title": "What ABS feels like",
            "points": [
              "You may feel pulsations in the brake pedal during hard braking.",
              "Know what to expect so you won’t release the pedal during emergency braking."
            ]
          },
          {
            "title": "Practice recommendation",
            "points": [
              "Practise emergency braking under controlled conditions with a qualified driving instructor to understand how your vehicle reacts."
            ]
          }
        ]
      },
      {
        "name": "Threshold braking (non-ABS)",
        "description": "A controlled braking technique for vehicles without ABS: modulate braking pressure to avoid lock-up—don’t pump.",
        "keywords": ["threshold braking", "non-ABS", "wheel lock", "release slightly", "re-apply", "don’t pump"],
        "topics": [
          {
            "title": "How to threshold brake",
            "points": [
              "Brake as hard as you can until a wheel begins to lock, then release pressure slightly to let it roll again.",
              "Re-apply braking force as much as possible without inducing a skid.",
              "If wheels begin to lock, release slightly and re-apply.",
              "Don’t pump the brakes—continue this controlled modulation until you slow to the desired speed."
            ]
          },
          {
            "title": "With ABS vehicles",
            "points": [
              "Press the brake pedal hard and allow the ABS system to control wheel lock-up automatically."
            ]
          }
        ]
      },
      {
        "name": "Snow",
        "description": "Snow surfaces vary; reduce speed, avoid cruise control, and use gentle control inputs to prevent skids.",
        "keywords": ["snow", "hard-packed", "rutted", "soft snow", "gullies", "slow down", "no cruise control"],
        "topics": [
          {
            "title": "Snow driving basics",
            "points": [
              "Snow may be hard-packed and as slippery as ice, rutted with tracks and gullies, or smooth and soft.",
              "Look ahead and anticipate; slow down on rutted snowy roads.",
              "Avoid sudden steering, braking, or accelerating that could cause a skid.",
              "Do not use cruise control during snow or other inclement weather."
            ]
          }
        ]
      },
      {
        "name": "Whiteouts (blowing snow)",
        "description": "Whiteouts can reduce visibility to near zero; delay travel when warnings exist and pull into a safe parking area if conditions worsen.",
        "keywords": ["whiteout", "blowing snow", "near zero visibility", "low beams", "fog lights", "don’t stop on road", "winter survival kit", "stay with vehicle"],
        "topics": [
          {
            "title": "When to avoid driving",
            "points": [
              "If blowing snow/whiteouts are forecast, drive only if necessary and with extreme caution.",
              "Check weather forecasts and road reports; delay trip until conditions improve if possible."
            ]
          },
          {
            "title": "Whiteout DOs",
            "points": [
              "Slow down gradually and drive for conditions.",
              "Turn on full lighting system; use low beams (high beams reflect off ice particles).",
              "Use fog lights if available (with low beams).",
              "Avoid passing, changing lanes, and crossing traffic.",
              "Increase following distance; keep looking as far ahead as possible.",
              "Reduce distractions; your full attention is required.",
              "Keep windows/mirrors clean; use defroster and wipers.",
              "Try to get off the road when visibility is near zero; pull into a safe parking area if possible."
            ]
          },
          {
            "title": "Whiteout DON’Ts",
            "points": [
              "Don’t stop on the travelled portion of the road (chain-reaction collision risk).",
              "Don’t attempt to pass slow vehicles or speed up to escape a tailgater."
            ]
          },
          {
            "title": "If stuck or stranded in severe weather",
            "points": [
              "Stay with your vehicle for warmth and safety until help arrives.",
              "Open a window slightly for ventilation.",
              "Run your motor sparingly.",
              "Use your emergency flashers.",
              "Carry a winter driving survival kit (warm clothing, non-perishable energy foods, flashlight, shovel, blanket)."
            ]
          }
        ]
      },
      {
        "name": "Ice and black ice",
        "description": "Wet roads can freeze as temperatures drop; shaded areas, bridges, and overpasses freeze first. Black ice can look like shiny black asphalt.",
        "keywords": ["ice", "black ice", "below freezing", "shaded areas", "bridges", "overpasses", "shiny asphalt", "gray-white"],
        "topics": [
          {
            "title": "Where and how ice forms",
            "points": [
              "As temperatures drop below freezing, wet roads can become icy.",
              "Shaded sections, bridges, and overpasses freeze first."
            ]
          },
          {
            "title": "Black ice cues",
            "points": [
              "If the road looks like black, shiny asphalt, be suspicious—it may be black ice.",
              "In winter, asphalt generally should look gray-white; if you suspect ice, slow down and be careful."
            ]
          }
        ]
      },
      {
        "name": "Snow plows (sharing the road)",
        "description": "Snow-removal vehicles use flashing blue lights and may be wider than expected; never pass between staggered plows on freeways.",
        "keywords": ["snow plows", "snow removal", "flashing blue lights", "150 metres", "wing plow", "three metres", "staggered plows", "don’t pass between"],
        "topics": [
          {
            "title": "How to recognize snow-removal vehicles",
            "points": [
              "Snow-removal vehicles are equipped with flashing blue lights visible from 150 metres.",
              "Blue lights warn of wide, slow-moving vehicles; some plows have a wing extending up to three metres to the right."
            ]
          },
          {
            "title": "Freeway plow formation warning",
            "points": [
              "On freeways, several plows may be staggered across lanes clearing all lanes at once.",
              "Do not try to pass between them—there is not enough room and the ridge of wet snow can push your vehicle out of control."
            ]
          }
        ]
      },
      {
        "name": "Summary",
        "content": "You should know how to manage reduced visibility at night and in fog/snow/rain; how rain, flooded roads, snow and ice affect traction and braking; how to respond to skids and brake properly (ABS vs threshold braking); what to do in whiteouts and around black ice; and how to share the road safely with snow plows.",
        "keywords": ["summary", "night driving", "fog", "rain", "hydroplaning", "flooded roads", "skids", "ABS", "threshold braking", "snow", "whiteouts", "black ice", "snow plows"]
      }
    ]
  },

  {
    "title": "Dealing with emergencies",
    "description": "What to do in common driving emergencies (component failures, trouble on freeways, leaving the pavement, tire blowouts) and the steps to take in collisions with or without injuries.",
    "icon": "life-buoy",
    "sections": [
      {
        "name": "If your brakes fail",
        "description": "Try to restore braking briefly, slow safely using the parking brake, and get help—do not continue driving after a full brake failure.",
        "keywords": ["brakes fail", "pump brake pedal", "hydraulic pressure", "parking brake", "emergency stop", "call for help"],
        "topics": [
          {
            "title": "What to do",
            "points": [
              "Try pumping the brake pedal to temporarily restore hydraulic brake pressure.",
              "If that doesn’t work, apply the parking brake gently but firmly while holding the release button.",
              "Practise a parking-brake emergency stop under controlled conditions with a qualified driving instructor (for new drivers).",
              "If you manage to stop after brake failure, do not drive away—call for help."
            ]
          }
        ]
      },
      {
        "name": "If your gas pedal sticks",
        "description": "Try to free it with your foot; if it remains stuck, warn others, shift to neutral, stop safely off the road, then shut off ignition and call for help.",
        "keywords": ["gas pedal sticks", "accelerator stuck", "hazard lights", "shift to neutral", "stop off road", "turn off ignition"],
        "topics": [
          {
            "title": "What to do",
            "points": [
              "Try lifting the pedal by slipping your foot under it (do not reach down with your hands while moving).",
              "If it doesn’t work, turn on hazard lights, shift to neutral, and stop as soon as it’s safe—preferably off the road.",
              "Turn off the ignition, do not drive away, and call for help."
            ]
          }
        ]
      },
      {
        "name": "If your headlights go out",
        "description": "Check the switch immediately; if lights stay out, stop safely off the road and call for help—driving at night without lights is illegal and dangerous.",
        "keywords": ["headlights out", "check switch", "hazard lights", "stop off road", "illegal to drive without lights"],
        "topics": [
          {
            "title": "What to do",
            "points": [
              "Check the headlight switch immediately.",
              "If the lights stay out, turn on hazard lights and bring your vehicle to a safe stop off the road.",
              "Call for help—driving at night without lights is dangerous and illegal."
            ]
          }
        ]
      },
      {
        "name": "If you have trouble on a freeway",
        "description": "Pull over at the first sign of trouble, never stop in travel lanes, and wait safely in the vehicle with doors locked while calling for help.",
        "keywords": ["freeway trouble", "pull over early", "hazard lights", "shoulder", "stay in vehicle", "doors locked", "OPP"],
        "topics": [
          {
            "title": "How to pull over and stay safe",
            "points": [
              "At the first sign of trouble, begin to pull over—don’t wait for the vehicle to stall.",
              "Check mirrors, turn on hazard lights, take your foot off the gas, and pull onto the nearest shoulder as quickly as possible.",
              "Never stop in the driving lanes.",
              "Be careful getting out; if possible, exit using the door away from traffic.",
              "Do not raise the hood.",
              "While waiting for help, stay in your vehicle with doors locked.",
              "If someone stops to help, ask them to call police or an automobile club, or call yourself if you have a phone.",
              "On major high-speed roads, the Ontario Provincial Police patrol and help will arrive."
            ]
          }
        ]
      },
      {
        "name": "If your wheels go off the pavement",
        "description": "Stay calm, slow down smoothly without heavy braking, and return to the pavement only when control is regained.",
        "keywords": ["wheels off pavement", "don’t panic", "firm grip", "ease off gas", "avoid heavy braking", "steer back"],
        "topics": [
          {
            "title": "Recovery steps",
            "points": [
              "Don’t panic; grip the steering wheel firmly.",
              "Take your foot off the gas to slow down.",
              "Avoid heavy braking.",
              "When the vehicle is under control, steer toward the pavement.",
              "Be prepared to correct steering and increase speed as your wheels fully return to the pavement."
            ]
          }
        ]
      },
      {
        "name": "If a tire blows out",
        "description": "Blowouts can cause strong vibration—steer firmly, ease off the gas, and stop off the road.",
        "keywords": ["tire blowout", "vibration", "ease off gas", "steer firmly", "stop off road"],
        "topics": [
          {
            "title": "What to do",
            "points": [
              "Don’t be alarmed by vibration; keep control.",
              "Take your foot off the gas to slow down.",
              "Steer firmly in the direction you want to go.",
              "Bring the vehicle to a stop off the road."
            ]
          }
        ]
      },
      {
        "name": "In a collision where someone is injured",
        "description": "You must remain at (or return to) the scene and provide assistance; call police when injuries occur or damage exceeds $2,000; protect the scene and help safely.",
        "keywords": ["collision with injuries", "must stay at scene", "report to police", "$2,000", "first aid kit", "fuel leak", "emergency flashers", "warning signals", "shock"],
        "topics": [
          {
            "title": "Legal duty + preparedness",
            "points": [
              "Drivers involved in a collision must stay at the scene (or return immediately) and provide all possible assistance.",
              "If you are not involved, you should stop to offer help if officials have not arrived.",
              "Carry a well-stocked first-aid kit and consider first-aid training."
            ]
          },
          {
            "title": "Steps to take (injuries / possible fuel leak / serious damage)",
            "points": [
              "Call for help (or have someone call). You must report to police when there are injuries or when damage exceeds $2,000.",
              "Turn off engines and turn on emergency flashers; set up warning signals/flares or have someone warn approaching drivers.",
              "Do not allow smoking, matches, or flares near vehicles if a fuel leak is possible.",
              "If a vehicle is on fire, get people out and well away.",
              "If there is no danger of fire/explosion, do not move injured people unless necessary—wait for trained medical help.",
              "If trained in first aid, treat injuries by urgency within your training (airway/breathing/bleeding control).",
              "If not trained, use common sense (e.g., cover for shock).",
              "Stay with injured people until help arrives."
            ]
          }
        ]
      },
      {
        "name": "In a collision where no one is injured",
        "description": "If safe and drivable, move vehicles off the road (“Steer it, Clear it”), call police when required, exchange information, and document the scene.",
        "keywords": ["collision no injuries", "steer it clear it", "move vehicles", "busy roads", "report $2,000", "exchange info", "witnesses", "photos", "tow truck"],
        "topics": [
          {
            "title": "Immediate safety",
            "points": [
              "If vehicles are drivable, move them as far off the road as possible (especially on busy/high-speed roads).",
              "In a minor collision with no injuries: if you can, “Steer it, Clear it.”",
              "If vehicles can’t be moved, set up warning signals/flares far enough back to give traffic time to slow or stop."
            ]
          },
          {
            "title": "Reporting and information exchange",
            "points": [
              "Call police (provincial or local depending on where the collision occurs).",
              "By law, you must report to police when there are injuries or damage exceeding $2,000.",
              "Provide all possible assistance to police and anyone whose vehicle was damaged.",
              "Exchange: your name/address; registered owner’s name/address; vehicle plate and permit number; liability insurance card.",
              "Get names, addresses, and phone numbers of witnesses.",
              "If damage is less than $2,000, you still must exchange information, but police reporting may not be required."
            ]
          },
          {
            "title": "Documentation and towing",
            "points": [
              "If safe, take photos of the scene with a camera/phone.",
              "If towing is required, get the tow operator/company name and licence number and confirm where the vehicle will be towed.",
              "Contact your insurance company as soon as possible if you intend to make a claim."
            ]
          }
        ]
      },
      {
        "name": "Summary",
        "content": "By the end of this section, you should know what to do during vehicle component failures, when you leave the pavement or have trouble on a freeway, and the required steps for collisions with or without injuries (including reporting thresholds and information exchange).",
        "keywords": ["summary", "emergencies", "brake failure", "stuck accelerator", "headlights out", "freeway breakdown", "wheels off road", "blowout", "collision", "$2,000"]
      }
    ]
  },

  {
    "title": "Driving efficiently",
    "description": "How driving affects air quality and climate, and practical steps to reduce fuel use and emissions before you drive, while driving, and through vehicle maintenance.",
    "icon": "leaf",
    "sections": [
      {
        "name": "How vehicles affect the environment",
        "description": "Vehicle emissions contribute to air pollution (smog), acid rain, and global warming; widespread car use makes cars a major contributor overall.",
        "keywords": [
          "air pollutants",
          "carbon monoxide",
          "oxides of nitrogen",
          "oxides of sulphur",
          "hydrocarbons",
          "soot",
          "smog",
          "ground-level ozone",
          "acid rain",
          "global warming",
          "carbon dioxide",
          "emissions"
        ],
        "topics": [
          {
            "title": "Key environmental impacts",
            "points": [
              "Gasoline and diesel vehicles emit pollutants (carbon, nitrogen, sulphur oxides, hydrocarbons, soot) that affect air quality, health, crops, and climate.",
              "Hydrocarbons + nitrogen oxides react in sunlight to create ground-level ozone (smog), a major health hazard.",
              "Sulphur and nitrogen oxides combine with water vapour to form acid rain, damaging lakes, forests, and crops.",
              "Global warming results when carbon dioxide and other gases trap heat in the atmosphere, potentially increasing temperatures and causing droughts, crop failures, lower water levels, and more severe storms."
            ]
          },
          {
            "title": "Cars vs other transport (per passenger context)",
            "points": [
              "A car can emit less CO₂ than larger vehicles (e.g., airplane, truck, bus, train), but high car ownership and frequent driving mean cars produce a large share of transportation CO₂ overall.",
              "High-capacity vehicles like buses produce less CO₂ per passenger than cars."
            ]
          }
        ]
      },
      {
        "name": "Before you drive",
        "description": "Plan trips to reduce total driving and avoid conditions that increase congestion and emissions.",
        "keywords": [
          "plan ahead",
          "combine errands",
          "rush hour",
          "off-peak",
          "smog alerts",
          "walking",
          "cycling",
          "public transit",
          "carpool",
          "carpool lots"
        ],
        "topics": [
          {
            "title": "Reduce the amount you drive",
            "points": [
              "Plan ahead and combine several errands into one trip.",
              "Avoid driving during rush hours; off-peak driving uses less fuel and produces fewer emissions.",
              "Pay attention to smog alerts and follow fuel/emissions-reduction tips especially on bad smog days.",
              "For short trips, consider walking or cycling.",
              "For longer trips, consider public transit instead of driving alone.",
              "Carpool whenever possible; use free carpool lots if meeting at a central location."
            ]
          }
        ]
      },
      {
        "name": "While driving",
        "description": "Drive in ways that reduce fuel consumption, avoid unnecessary idling, and keep your vehicle’s aerodynamics efficient.",
        "keywords": [
          "cold start",
          "idling",
          "10 seconds",
          "speed limits",
          "fuel efficiency",
          "overdrive",
          "cruise control",
          "unnecessary weight",
          "roof racks",
          "aerodynamics",
          "vents",
          "windows",
          "air conditioning",
          "top-off",
          "refueling vapours"
        ],
        "topics": [
          {
            "title": "Reduce emissions and fuel use on the road",
            "points": [
              "Avoid unnecessary starts—cold starts emit a large burst of pollutants.",
              "Turn off the engine if parked more than 10 seconds; even in cold weather engines warm up within about 30 seconds.",
              "Obey speed limits: high speed increases fuel use and increases the risk of serious collisions.",
              "On freeways, use overdrive gear and cruise control for better fuel efficiency (when conditions allow).",
              "Remove unnecessary weight (heavy baggage, wet snow, winter sand/salt).",
              "Maintain aerodynamics: remove roof racks/compartments when not in use; at high speeds use vents instead of opening windows.",
              "Use air conditioning wisely: use windows/vents in city stop-and-go; at high speeds A/C is often more efficient than open windows that increase drag.",
              "Do not “top-off” the tank when refueling; spilled fuel releases harmful vapours."
            ]
          }
        ]
      },
      {
        "name": "At the garage (maintenance for efficiency)",
        "description": "Regular maintenance improves fuel economy and reduces emissions; tire pressure, tune-ups, and fixing leaks matter.",
        "keywords": [
          "regular maintenance",
          "engine tune",
          "spark plugs",
          "dragging brakes",
          "transmission fluid",
          "high gear",
          "maintenance schedule",
          "fluid leaks",
          "tire pressure",
          "alignment",
          "tire wear",
          "fuel consumption"
        ],
        "topics": [
          {
            "title": "Maintenance checklist for fuel savings",
            "points": [
              "Maintain your vehicle regularly to reduce fuel costs and emissions.",
              "Keep the engine well tuned; worn spark plugs, dragging brakes, low transmission fluid, or a transmission not shifting into high gear can increase fuel use substantially.",
              "Follow the recommended maintenance schedule in the owner’s manual.",
              "Have fluid leaks checked by a specialist (prevents engine damage and environmental harm).",
              "Keep tires properly inflated to reduce fuel use, emissions, and tire wear.",
              "Have wheel alignment checked regularly to reduce uneven tire wear and reduce fuel consumption."
            ]
          }
        ]
      },
      {
        "name": "10 ways to help make Ontario’s roads safer",
        "description": "A quick safety checklist of the most important habits that reduce collisions and injuries.",
        "keywords": [
          "don’t drink and drive",
          "medication",
          "seatbelt",
          "child car seat",
          "booster seat",
          "speed limits",
          "poor conditions",
          "don’t take risks",
          "don’t cut off",
          "lane changes",
          "yellow lights",
          "don’t drive tired",
          "yield",
          "two-second rule",
          "distractions",
          "blind spot",
          "intersections",
          "sidewalks",
          "paths"
        ],
        "topics": [
          {
            "title": "Safety checklist (top habits)",
            "points": [
              "Don’t drink and drive; don’t drive when taking medication that affects driving.",
              "Always wear your seatbelt and ensure passengers use the correct child car seat, booster seat, or seatbelt.",
              "Obey speed limits; slow down when road and weather conditions are poor.",
              "Don’t take risks: don’t cut people off, make sudden lane changes, or run yellow lights.",
              "Don’t drive when tired, upset, or sick.",
              "When in doubt, yield the right-of-way and let the other driver go first.",
              "Keep at least a two-second space behind the vehicle ahead (measure using a fixed object).",
              "Cut distractions: don’t overcrowd the vehicle or play loud music.",
              "Always check blind spots: look in mirrors and over your shoulder before changing lanes.",
              "Check traffic in all directions, including sidewalks and paths/trails, before entering an intersection."
            ]
          }
        ]
      },
      {
        "name": "Summary",
        "content": "By the end of this section, you should know how passenger vehicles affect the environment, ways to reduce the amount you drive, and ways to conserve fuel and reduce emissions when you drive.",
        "keywords": ["summary", "environment", "reduce driving", "conserve fuel", "reduce emissions"]
      }
    ]
  },

  {
    "title": "Traffic signs and lights",
    "description": "An overview chapter covering the traffic control devices that tell drivers what they must do: signs, traffic lights, pedestrian signals, and pavement markings.",
    "icon": "traffic-cone",
    "sections": [
      {
        "name": "Chapter overview",
        "description": "Traffic laws include signs, lights, pedestrian signals, and pavement markings that direct drivers and other road users.",
        "keywords": [
          "traffic laws",
          "traffic signs",
          "traffic lights",
          "pedestrian signals",
          "pavement markings",
          "road users",
          "meaning",
          "what you must do"
        ],
        "topics": [
          {
            "title": "What this chapter covers",
            "points": [
              "Traffic signs and lights are part of traffic laws and tell drivers and other road users what they must do in certain situations.",
              "The chapter shows what many signs, lights, signals, and markings look like and explains what they mean to drivers.",
              "This chapter is organized into: Signs, Traffic lights, Pedestrian signals, and Pavement markings."
            ]
          }
        ]
      },
      {
        "name": "Signs",
        "description": "A section dedicated to the appearance and meaning of traffic signs for drivers.",
        "keywords": ["signs", "traffic signs", "meaning", "drivers"],
        "topics": [
          {
            "title": "Focus",
            "points": [
              "Learn what common traffic signs look like and what they mean.",
              "Use signs to understand required actions in different driving situations."
            ]
          }
        ]
      },
      {
        "name": "Traffic lights",
        "description": "A section dedicated to traffic light indications and what drivers must do.",
        "keywords": ["traffic lights", "signals", "meaning", "drivers"],
        "topics": [
          {
            "title": "Focus",
            "points": [
              "Learn how traffic light indications direct driver actions.",
              "Use traffic lights to determine when to stop, proceed, or prepare to stop in controlled intersections."
            ]
          }
        ]
      },
      {
        "name": "Pedestrian signals",
        "description": "A section explaining pedestrian signals and what they mean for both pedestrians and drivers.",
        "keywords": ["pedestrian signals", "crossing", "drivers", "road users"],
        "topics": [
          {
            "title": "Focus",
            "points": [
              "Understand pedestrian signals as a key part of traffic control devices.",
              "Use pedestrian signals to anticipate pedestrian movement and yield appropriately."
            ]
          }
        ]
      },
      {
        "name": "Pavement markings",
        "description": "A section explaining road markings and how they guide driver positioning and movement.",
        "keywords": ["pavement markings", "road markings", "lane guidance", "drivers"],
        "topics": [
          {
            "title": "Focus",
            "points": [
              "Recognize pavement markings used to guide drivers and manage traffic.",
              "Use markings to support lane positioning, turning, and other required movements."
            ]
          }
        ]
      }
    ]
  },

  {
    "title": "Signs",
    "description": "How Ontario traffic signs communicate laws, hazards, temporary conditions, and directions using standardized shapes, colours, and symbols.",
    "icon": "signpost",
    "sections": [
      {
        "name": "Why signs matter (shape, colour, symbols)",
        "description": "Traffic signs provide legal instructions, warnings, and navigation using recognizable shapes and colours.",
        "keywords": ["traffic signs", "law", "warning", "conditions", "symbols", "colours", "shapes", "easy identification"],
        "topics": [
          {
            "title": "What signs do",
            "points": [
              "Give important information about the law.",
              "Warn about dangerous or unusual conditions.",
              "Help you find your way (destinations, distances, services).",
              "Use symbols, colours, and shapes for quick identification."
            ]
          }
        ]
      },
      {
        "name": "Core sign examples (stop, school zone, yield, railway crossing)",
        "description": "High-frequency signs every driver must recognize immediately.",
        "keywords": ["stop sign", "eight-sided", "school zone", "five-sided", "yield sign", "triangle", "railway crossing", "X-shaped"],
        "topics": [
          {
            "title": "Stop sign (what it means + where to stop)",
            "points": [
              "Eight-sided, red background with white letters.",
              "You must come to a complete stop.",
              "Stop at the stop line if marked.",
              "If no stop line: stop at the crosswalk.",
              "If no crosswalk: stop at the edge of the sidewalk.",
              "If no sidewalk: stop at the edge of the intersection.",
              "Wait until the way is clear before entering."
            ]
          },
          {
            "title": "School zone sign",
            "points": [
              "Five-sided, fluorescent yellow/green background with black symbols.",
              "Warns you are coming to a school zone.",
              "Slow down, drive with extra caution, and watch for children."
            ]
          },
          {
            "title": "Yield sign",
            "points": [
              "Triangle with white background and red border.",
              "Let traffic in the intersection (or close to it) go first.",
              "Stop if necessary; go only when the way is clear."
            ]
          },
          {
            "title": "Railway crossing sign",
            "points": [
              "X-shaped with white background and red outline.",
              "Warns that railway tracks cross the road.",
              "Slow down, look both ways for trains, and be prepared to stop."
            ]
          }
        ]
      },
      {
        "name": "Regulatory signs",
        "description": "Signs that give directions you must obey (legal requirements and prohibitions).",
        "keywords": [
          "regulatory signs",
          "must obey",
          "rectangular",
          "square",
          "green circle",
          "red circle with slash",
          "do not",
          "permitted"
        ],
        "topics": [
          {
            "title": "How to interpret common regulatory sign formats",
            "points": [
              "Usually rectangular or square, with a white or black background and contrasting letters/symbols.",
              "A green circle indicates you may or must do the activity shown.",
              "A red circle with a diagonal slash indicates the activity shown is not allowed."
            ]
          },
          {
            "title": "Common regulatory examples (what they mean)",
            "points": [
              "Official bicycle route: watch for cyclists and be prepared to share the road.",
              "Snowmobiles may use this road.",
              "Do not enter (one-way restriction).",
              "No stopping / no standing / no parking: applies between paired/grouped signs with the posted times.",
              "No left turn / no right turn on red / no U-turn / no driving straight through / no left turn during the times shown.",
              "Accessible parking only: only vehicles displaying a valid Accessible Parking Permit may use the space.",
              "No bicycles allowed / no pedestrians allowed.",
              "Keep right of traffic island.",
              "Speed limit changes ahead.",
              "Do not pass.",
              "Slow traffic must keep right on multi-lane roads.",
              "Community safety zone: increased fines for traffic offences within the zone.",
              "Lower speed limit during school hours when yellow lights are flashing.",
              "Stop for school bus when signals are flashing (including the version used on multi-lane highways with no median divider).",
              "Lane-use signs above/painted before intersections: indicate required movement per lane (e.g., turn left / straight / turn right).",
              "One-way traffic only.",
              "Pedestrian crossover: be prepared to stop and yield to pedestrians.",
              "Two-way left-turn lane (centre lane) sign: lane is only for two-way left turns.",
              "Accessible passenger loading zone reserved for vehicles with a valid Accessible Parking Permit (pick-up/drop-off).",
              "Reserved lanes for specific vehicles (e.g., buses, taxis, vehicles with 3+ people, bicycles), all day or during certain hours.",
              "Keep right except when passing on two-lane sections where climbing/passing lanes are provided.",
              "Transit bus reminder: drivers approaching a bus stopped at a dedicated bus stop must yield when the bus signals to return.",
              "Road forks to the right.",
              "School bus loading/unloading zone where red alternating lights and stop arm are not used."
            ]
          },
          {
            "title": "HOV (High Occupancy Vehicle) signs",
            "points": [
              "HOV lanes are for public vehicles (such as buses) or passenger vehicles carrying a specified minimum number of people.",
              "Some HOV signs indicate you cannot change lanes into or out of the HOV lane within a buffer area."
            ]
          }
        ]
      },
      {
        "name": "Warning signs",
        "description": "Signs that warn of dangerous or unusual conditions ahead so you can slow down and prepare.",
        "keywords": [
          "warning signs",
          "diamond-shaped",
          "yellow background",
          "dangerous conditions",
          "curve",
          "intersection ahead",
          "roundabout",
          "lane ends",
          "slippery when wet"
        ],
        "topics": [
          {
            "title": "Warning sign basics",
            "points": [
              "Usually diamond-shaped with a yellow background and black symbols/letters.",
              "Warn of hazards ahead such as curves, turns, dips, sideroads, narrowing, merging, lights, hills, and crossings."
            ]
          },
          {
            "title": "Common warning examples (what they tell you to prepare for)",
            "points": [
              "Narrow bridge; pavement narrows; right lane ends (merge left safely).",
              "Road branching/sideroad; intersection ahead with right-of-way arrow.",
              "Roundabout ahead: reduce speed; arrows show counter-clockwise travel.",
              "Hidden intersection/limited view for drivers on sideroad.",
              "Curve/bend/winding road; chevrons guide around sharp curves; posted advisory speed for a curve.",
              "Paved surface ends; bump/uneven pavement; steep hill (may need lower gear).",
              "Stop sign ahead; traffic lights ahead (slow down).",
              "Divided highway begins/ends; keep to correct roadway.",
              "Merging traffic (two roads joining—both drivers share responsibility to merge safely).",
              "Underpass clearance for tall vehicles.",
              "Railway crossing ahead and track angle; be alert for trains.",
              "Slippery when wet; share the road with oncoming traffic / cyclists.",
              "Hazard near edge—markings show side to pass safely.",
              "Bicycle crossing; pedestrians ahead; deer crossing; fallen rock; water flowing over road.",
              "Snowmobile crossing.",
              "Truck entrance; bus entrance; fire truck entrance—be prepared to yield."
            ]
          },
          {
            "title": "School-related warnings",
            "points": [
              "School crossing warning signs: watch for children and follow directions of crossing guard/school safety patroller.",
              "Hidden school bus stop warning: slow down, drive with extra caution, and watch for children and a school bus with flashing red lights."
            ]
          }
        ]
      },
      {
        "name": "Temporary condition signs",
        "description": "Orange signs that warn about temporary situations like construction, detours, lane closures, and traffic control people.",
        "keywords": [
          "temporary condition",
          "orange",
          "construction",
          "road work",
          "detour",
          "lane closure",
          "traffic control person",
          "pilot vehicle",
          "pace vehicle",
          "doubled fines"
        ],
        "topics": [
          {
            "title": "Temporary sign basics",
            "points": [
              "Usually diamond-shaped with an orange background and black symbols/letters.",
              "Warn of unusual temporary conditions such as road work zones, diversions, detours, lane closures, and traffic-control people."
            ]
          },
          {
            "title": "Common temporary examples",
            "points": [
              "Construction/road work ahead; survey crew; traffic control person ahead (drive slowly and follow instructions).",
              "Entering a construction zone (expect lower speed limit; use extra caution).",
              "Temporary detour markers and arrows (follow until you return to normal route).",
              "Lane closed ahead / closed lane (merge as directed).",
              "Milled or grooved pavement (stopping ability affected; obey speed; motorcyclists may have reduced traction).",
              "Do not pass pilot/pace vehicle.",
              "Reduce speed and be prepared to stop.",
              "Construction-zone speeding fines doubled when workers are present."
            ]
          }
        ]
      },
      {
        "name": "Information and direction signs",
        "description": "Green and other-coloured guide signs that show destinations, distances, exits, and services/facilities.",
        "keywords": [
          "information signs",
          "direction signs",
          "green background",
          "white letters",
          "distances",
          "destinations",
          "freeway exit",
          "advance sign",
          "interchange numbers",
          "VIA",
          "variable message signs"
        ],
        "topics": [
          {
            "title": "What they look like and what they do",
            "points": [
              "Usually rectangular with a green background and white letters (other colours may guide to services/facilities/attractions).",
              "Show directions and distances to towns/cities and guide drivers on freeways."
            ]
          },
          {
            "title": "Freeway exit signs and lane guidance",
            "points": [
              "Overhead and ground-mounted signs help drivers choose correct lanes to exit or remain on the freeway.",
              "Advance signs use arrows to show which lanes lead to an exit; signs are also posted at the exit.",
              "Sometimes one or more lanes become exit-only; these lanes may be shown with arrows in a yellow box with the word “exit.”"
            ]
          },
          {
            "title": "Interchange numbers and calculating distance",
            "points": [
              "Interchange/exit numbers correspond to distance from the beginning of the freeway.",
              "Example: interchange 204 on Highway 401 is 204 km from Windsor (where the freeway begins).",
              "You can estimate distance between interchanges by subtracting one interchange number from another."
            ]
          },
          {
            "title": "Other guide sign conventions",
            "points": [
              "“VIA” indicates roads you must follow to reach a destination.",
              "Some signs show upcoming roundabout exits and destinations.",
              "Variable message signs change according to traffic conditions (delays, lane closures).",
              "Off-road facility signs guide to hospitals, airports, universities, carpool lots, railway stations, and accessible facilities."
            ]
          }
        ]
      },
      {
        "name": "Other signs (special-purpose)",
        "description": "Additional signs you may encounter, including slow-moving vehicle triangles, detour markers for closures, long commercial vehicle placards, emergency response route numbering, and bilingual signage.",
        "keywords": [
          "slow-moving vehicle",
          "40 km/h",
          "EDR",
          "highway closure",
          "OPP detour",
          "LCV",
          "long commercial vehicle",
          "40 metres",
          "emergency response numbering",
          "bilingual signs"
        ],
        "topics": [
          {
            "title": "Slow-moving vehicle sign",
            "points": [
              "Orange triangle with a red border.",
              "Warns that the vehicle ahead will travel at 40 km/h or less.",
              "Farm tractors/implements and vehicles not capable of sustaining speeds over 40 km/h must display it.",
              "If you see it: reduce speed and be prepared for slower traffic."
            ]
          },
          {
            "title": "EDR markers (Emergency Detour Route)",
            "points": [
              "Used during unscheduled closures of provincial highways when OPP detours traffic off the highway.",
              "Markers guide motorists along alternate routes and back onto the highway."
            ]
          },
          {
            "title": "LCV placard (Long Commercial Vehicle)",
            "points": [
              "Indicates a long commercial vehicle (double trailer) that can be up to 40 metres long.",
              "Recognize it by rear signage and anticipate extended length and limited speed when preparing to pass."
            ]
          },
          {
            "title": "Emergency response route numbering",
            "points": [
              "Some information signs include a numbering system along the bottom to help emergency vehicles and drivers determine appropriate routes."
            ]
          },
          {
            "title": "Bilingual signs",
            "points": [
              "Used in designated bilingual areas.",
              "Messages may appear together on one sign or on separate signs, with an English sign followed by a French sign."
            ]
          }
        ]
      },
      {
        "name": "Summary",
        "content": "By the end of this section, you should know the difference between regulatory, warning, temporary condition, and information/direction signs, and how to read common symbols and messages in each category.",
        "keywords": ["summary", "regulatory", "warning", "temporary condition", "information", "direction", "symbols", "messages"]
      }
    ]
  },

  {
    "title": "Traffic lights",
    "description": "What traffic light colours and special signals (arrows, advanced greens, flashing lights, beacons, and power outages) mean and what drivers must do at intersections and along roads.",
    "icon": "traffic-light",
    "sections": [
      {
        "name": "Purpose of traffic lights",
        "description": "Traffic lights control when road users must stop, go, turn, or use extra caution.",
        "keywords": ["traffic lights", "intersections", "stop", "go", "turn", "caution", "drivers", "pedestrians"],
        "topics": [
          {
            "title": "What traffic lights tell you",
            "points": [
              "When to stop and go.",
              "When and how to turn.",
              "When to drive with extra caution."
            ]
          }
        ]
      },
      {
        "name": "Green, yellow, and red lights",
        "description": "Standard signal meanings and the basic stop-line/crosswalk stopping rule.",
        "keywords": ["green light", "yellow light", "amber light", "red light", "yield", "stop line", "crosswalk", "sidewalk edge", "intersection edge", "right on red", "left on red one-way"],
        "topics": [
          {
            "title": "Green light",
            "points": [
              "You may turn left, go straight, or turn right after yielding to vehicles and pedestrians already in the intersection.",
              "When turning left or right, you must yield the right-of-way to pedestrians crossing the intersection."
            ]
          },
          {
            "title": "Yellow (amber) light",
            "points": [
              "The red light is about to appear.",
              "You must stop if you can do so safely; otherwise, proceed with caution."
            ]
          },
          {
            "title": "Red light + where to stop",
            "points": [
              "You must stop and bring your vehicle to a complete stop.",
              "Stop at the stop line if marked on the pavement.",
              "If there is no stop line: stop at the crosswalk (marked or unmarked).",
              "If there is no crosswalk: stop at the edge of the sidewalk.",
              "If there is no sidewalk: stop at the edge of the intersection.",
              "Wait until the light changes to green and the intersection is clear before moving through it."
            ]
          },
          {
            "title": "Turning on a red light (when permitted)",
            "points": [
              "Unless a sign tells you not to, you may turn right on a red light only after coming to a complete stop and waiting until the way is clear.",
              "You may also turn left on a red light if you are moving from a one-way road onto a one-way road, but you must come to a complete stop first and wait until the way is clear."
            ]
          }
        ]
      },
      {
        "name": "Lights and arrows for turning vehicles",
        "description": "Advanced greens and green arrows create protected turning opportunities; pedestrian crossings depend on pedestrian signals.",
        "keywords": ["advanced green", "flashing green", "green arrow", "left-turn arrow", "simultaneous left turn", "yellow arrow", "protected left turn", "pedestrian signal"],
        "topics": [
          {
            "title": "Advance green light or arrow",
            "points": [
              "When you face a flashing green light or a left-pointing green arrow with a green light, you may turn left, go straight, or turn right from the proper lane.",
              "This is an advanced green because oncoming traffic still faces a red light.",
              "Pedestrians must not cross on a flashing green light unless a pedestrian signal tells them to."
            ]
          },
          {
            "title": "Simultaneous left turn",
            "points": [
              "When a left-turn green arrow is shown with a red light, you may turn left from the left-turn lane.",
              "Vehicles turning left from the opposite direction may also be turning left (they face a left-turn green arrow too).",
              "After the green arrow, a yellow arrow may appear—do not start your left turn; stop if you can do so safely, otherwise complete your turn with caution.",
              "You can still turn left on a green light later, but only when the way is clear of traffic and pedestrians.",
              "If the light turns red when you are already in the intersection, complete your turn when it is safe.",
              "Pedestrians must not cross on a left-turn green arrow unless a pedestrian signal tells them to."
            ]
          },
          {
            "title": "Fully protected left turn",
            "points": [
              "Some intersections have separate traffic lights for left-turning traffic and for through/right-turn traffic.",
              "When a left-turn green arrow appears for the left-turn lane, through/right traffic usually faces a red light.",
              "After the left-turn green arrow, a yellow then red light may appear for left-turning vehicles only (while through/right traffic later gets a green).",
              "At these intersections, you may not begin turning left after the green light appears for through/right traffic.",
              "If the light turns yellow while you are in the intersection, complete your turn with caution."
            ]
          }
        ]
      },
      {
        "name": "Transit priority signals",
        "description": "A special signal that gives right-of-way to public transit vehicles; other traffic and pedestrians must yield.",
        "keywords": ["transit priority signal", "yield to transit", "white vertical bar", "dark background", "round signal"],
        "topics": [
          {
            "title": "How it works",
            "points": [
              "Traffic and pedestrians must yield to public transit vehicles at a transit priority signal.",
              "The round signal is on top of a regular traffic signal and shows a white vertical bar on a dark background.",
              "This allows transit vehicles to go through, turn right, or turn left while all conflicting traffic faces a red light."
            ]
          }
        ]
      },
      {
        "name": "Flashing lights and blank signals",
        "description": "Flashing red/yellow have stop-or-caution meanings; blank signals (power outage) are treated like an all-way stop intersection.",
        "keywords": ["flashing red", "flashing yellow", "blank traffic lights", "power outage", "all-way stop", "yield to right"],
        "topics": [
          {
            "title": "Flashing red light",
            "points": [
              "You must come to a complete stop.",
              "Move through the intersection only when it is safe."
            ]
          },
          {
            "title": "Flashing yellow light",
            "points": [
              "Drive with caution when approaching and moving through the intersection."
            ]
          },
          {
            "title": "Blank traffic lights (not operating)",
            "points": [
              "During a power loss, traffic lights may not work.",
              "Yield the right-of-way to vehicles already in the intersection and to vehicles entering from your right.",
              "Proceed cautiously and treat the intersection like an all-way stop."
            ]
          }
        ]
      },
      {
        "name": "Traffic beacons",
        "description": "A single flashing light above an intersection/sign/obstruction that adds stop or caution emphasis.",
        "keywords": ["traffic beacon", "single flashing light", "flashing red beacon", "flashing yellow beacon", "stop sign", "warning sign", "obstruction"],
        "topics": [
          {
            "title": "Flashing red beacon",
            "points": [
              "A flashing red beacon above an intersection or stop sign means you must come to a complete stop.",
              "Proceed only when it is safe to do so."
            ]
          },
          {
            "title": "Flashing yellow beacon",
            "points": [
              "A flashing yellow beacon above an intersection, above a warning sign, or on an obstruction warns you to drive with caution."
            ]
          }
        ]
      },
      {
        "name": "Summary",
        "content": "By the end of this section you should know: the different colours and symbols that appear on traffic lights and what those mean; how to navigate turns using advanced green lights and arrows; how to proceed when approaching flashing amber or red lights; and what to do when traffic lights are not operating.",
        "keywords": ["summary", "green", "yellow", "red", "advanced green", "arrows", "flashing lights", "power outage", "traffic beacons"]
      }
    ]
  },

  {
    "title": "Pedestrian signals",
    "description": "How pedestrian signals work at traffic-light intersections, what the walk/hand symbols mean, pedestrian right-of-way rules, and what to do at intersections that use pedestrian push-buttons.",
    "icon": "person-standing",
    "sections": [
      {
        "name": "Pedestrian signal symbols",
        "description": "Pedestrian signals use a white walking symbol for “walk” and an orange hand for “don’t start.”",
        "keywords": ["pedestrian signals", "walk symbol", "white walking symbol", "orange hand", "flashing hand", "steady hand"],
        "topics": [
          {
            "title": "What the symbols mean",
            "points": [
              "White walking symbol: pedestrians may cross in the direction of the signal.",
              "Flashing or steady orange hand: pedestrians must not begin to cross."
            ]
          }
        ]
      },
      {
        "name": "Right-of-way while pedestrians are crossing",
        "description": "Pedestrians who are crossing (or who began crossing on a walk signal) have the right-of-way over all vehicles.",
        "keywords": ["right-of-way", "pedestrians crossing", "vehicles must yield", "already in crosswalk"],
        "topics": [
          {
            "title": "Who has priority",
            "points": [
              "While pedestrians are crossing, they have the right-of-way over all vehicles.",
              "If the hand signal appears after a pedestrian has already started crossing, they should continue to a safe area as quickly as possible—and they still have the right-of-way while crossing."
            ]
          }
        ]
      },
      {
        "name": "Intersections without pedestrian signals",
        "description": "If there are traffic lights but no pedestrian signals, crossing rules depend on the vehicle light phase.",
        "keywords": ["no pedestrian signals", "green light", "flashing green", "left-turn green arrow"],
        "topics": [
          {
            "title": "When pedestrians may cross",
            "points": [
              "At traffic-light intersections with no pedestrian signals, pedestrians facing a green light may cross.",
              "Pedestrians may not cross on a flashing green light or on a left-turn green arrow."
            ]
          }
        ]
      },
      {
        "name": "Intersection pedestrian signals (push-button crossings)",
        "description": "Some intersections use pedestrian push-buttons to activate walk signals and stop main-road traffic to help people cross safely.",
        "keywords": ["intersection pedestrian signal", "push-button", "crosswalks", "walk", "don't walk", "main road traffic lights", "stop signs", "crossroad"],
        "topics": [
          {
            "title": "How these intersections are set up",
            "points": [
              "Pedestrian push-buttons are used to bring on the walk signal.",
              "These signals give pedestrians more time to cross than regular traffic lights.",
              "They typically include: one or more crosswalks, walk/don’t walk signals, pedestrian push-buttons, and traffic signal lights on the main road only.",
              "Stop signs control traffic on the smaller, less busy crossroad."
            ]
          },
          {
            "title": "How drivers should handle them",
            "points": [
              "Observe and obey all traffic rules and use safe driving skills when driving through these intersections.",
              "Be alert for pedestrians entering the crosswalk when the walk signal activates."
            ]
          }
        ]
      },
      {
        "name": "Summary",
        "content": "By the end of this section, you should know: what the symbols on pedestrian signals indicate, and what an intersection pedestrian signal is and what to do if you encounter one.",
        "keywords": ["summary", "pedestrian symbols", "walk", "hand symbol", "intersection pedestrian signal"]
      }
    ]
  },

  {
    "title": "Pavement markings",
    "description": "How road markings work with signs and lights to guide where you may travel, indicate passing rules, show lane changes/exits, and mark stops, crosswalks, pedestrian crossovers, and obstacles.",
    "icon": "route",
    "sections": [
      {
        "name": "What pavement markings tell you",
        "description": "Pavement markings provide direction, lane organization, turning guidance, crossing points, obstacles, and passing restrictions.",
        "keywords": [
          "pavement markings",
          "direction of traffic",
          "lanes",
          "turning lanes",
          "pedestrian crossings",
          "obstacles",
          "passing"
        ],
        "topics": [
          {
            "title": "How markings are used",
            "points": [
              "Work with road signs and traffic lights to give important information about direction of traffic and where you may/may not travel.",
              "Divide traffic lanes.",
              "Show turning lanes.",
              "Mark pedestrian crossings.",
              "Indicate obstacles and guide traffic around them.",
              "Tell you when it is not safe to pass."
            ]
          }
        ]
      },
      {
        "name": "Line colours: yellow vs white",
        "description": "Colour indicates whether traffic is moving in the same or opposite directions.",
        "keywords": ["yellow lines", "white lines", "opposite directions", "same direction"],
        "topics": [
          {
            "title": "Colour meaning",
            "points": [
              "Yellow lines separate traffic travelling in opposite directions.",
              "White lines separate traffic travelling in the same direction."
            ]
          }
        ]
      },
      {
        "name": "Passing rules: solid vs broken lines",
        "description": "Line type on the left side of your lane indicates whether passing is permitted or unsafe.",
        "keywords": ["solid line", "broken line", "unsafe to pass", "may pass", "left of lane"],
        "topics": [
          {
            "title": "Solid line (left of your lane)",
            "points": [
              "A solid line at the left of your lane means it is unsafe to pass."
            ]
          },
          {
            "title": "Broken line (left of your lane)",
            "points": [
              "A broken line at the left of your lane means you may pass if the way is clear.",
              "Only pass if there are enough broken lines ahead to complete the pass safely."
            ]
          }
        ]
      },
      {
        "name": "Continuity lines (lane ending/exiting guidance)",
        "description": "Wider, closer broken lines signal that a lane is ending/exiting or continuing, depending on which side they appear.",
        "keywords": ["continuity lines", "lane ending", "lane exiting", "change lanes", "left side", "right side"],
        "topics": [
          {
            "title": "How to interpret continuity lines",
            "points": [
              "Continuity lines are broken lines that are wider and closer together than regular broken lines.",
              "If continuity lines are on your left, it generally means your lane is ending or exiting—you must change lanes to continue in your current direction.",
              "If continuity lines are on your right, your lane will continue unaffected."
            ]
          }
        ]
      },
      {
        "name": "Stop lines and crosswalk markings",
        "description": "Stop lines and crosswalks show where you must stop; if markings are missing, you still follow the stop-position rules.",
        "keywords": ["stop line", "crosswalk", "where to stop", "sidewalk edge", "intersection edge", "unmarked crosswalk"],
        "topics": [
          {
            "title": "Stop line (where you must stop)",
            "points": [
              "A stop line is a single white line painted across the road at an intersection showing where you must stop.",
              "If there is no stop line, stop at the crosswalk (marked or not).",
              "If there is no crosswalk, stop at the edge of the sidewalk.",
              "If there is no sidewalk, stop at the edge of the intersection."
            ]
          },
          {
            "title": "Crosswalk markings",
            "points": [
              "A marked crosswalk is two parallel white lines painted across the road.",
              "Crosswalks at intersections are not always marked.",
              "If there is no stop line, stop at the crosswalk; if none, stop at the edge of sidewalk; if none, stop at the edge of the intersection."
            ]
          }
        ]
      },
      {
        "name": "Lane-direction arrows",
        "description": "Arrows painted in lanes restrict movement to the direction shown.",
        "keywords": ["lane arrow", "direction", "only", "painted arrow"],
        "topics": [
          {
            "title": "Arrow rule",
            "points": [
              "A white arrow painted on a lane means you may move only in the direction of the arrow."
            ]
          }
        ]
      },
      {
        "name": "Pedestrian crossovers (markings and driver duties)",
        "description": "Pedestrian crossovers use a distinctive combination of signs, overhead yellow lights, and special pavement markings; drivers and cyclists must stop and yield until pedestrians fully clear.",
        "keywords": ["pedestrian crossover", "double parallel lines", "X", "overhead yellow lights", "yield", "drivers and cyclists must stop"],
        "topics": [
          {
            "title": "How to recognize a pedestrian crossover",
            "points": [
              "Identified by specific signs and overhead yellow lights.",
              "Marked by two white double parallel lines across the road with an X in each lane approaching it."
            ]
          },
          {
            "title": "What drivers and cyclists must do",
            "points": [
              "Stop before the line.",
              "Yield to pedestrians until pedestrians have completely crossed the road and cleared the roadway."
            ]
          }
        ]
      },
      {
        "name": "Markings around fixed objects",
        "description": "Solid guide lines and object markings help steer traffic away from hazards like bridge piers and concrete islands.",
        "keywords": ["fixed objects", "bridge piers", "concrete islands", "two solid lines", "yellow and black markings"],
        "topics": [
          {
            "title": "Guidance and warnings",
            "points": [
              "Two solid lines painted on the pavement guide traffic away from fixed objects such as bridge piers or concrete islands.",
              "Yellow and black markings are often painted on the objects themselves as warnings."
            ]
          }
        ]
      },
      {
        "name": "Summary",
        "content": "By the end of this section, you should know: how pavement markings are used to control traffic, and what the different colours and types of markings are used to indicate.",
        "keywords": ["summary", "control traffic", "colours", "types of markings"]
      }
    ]
  },

  {
    "title": "Keeping your driver’s licence",
    "description": "How Ontario driver’s licences work: renewing, special renewal rules for senior drivers, graduated-licensing requalification, updating your name/address, licence-law offences, and the demerit point system (including thresholds and common point values).",
    "icon": "id-card",
    "sections": [
      {
        "name": "Ontario driver’s licence card basics",
        "description": "Ontario uses a one-piece driver’s licence card; you must carry it whenever you drive.",
        "keywords": ["one-piece licence", "photo", "signature", "carry licence", "produce to police"],
        "topics": [
          {
            "title": "What you must do",
            "points": [
              "Ontario has a one-piece driver’s licence with a photo and signature.",
              "You must carry your driver’s licence whenever you drive.",
              "You must produce your licence when a police officer requests it."
            ]
          }
        ]
      },
      {
        "name": "Renewing your licence",
        "description": "How the renewal process works and what happens if your licence is expired or has been suspended/cancelled for long periods.",
        "keywords": ["renew licence", "renewal notice", "ServiceOntario", "photo", "fee", "temporary licence", "expired licence", "reapply", "graduated licensing"],
        "topics": [
          {
            "title": "Standard renewal process",
            "points": [
              "You typically receive a renewal application form in the mail.",
              "Take the form to a ServiceOntario Centre: you sign, show identification, pay a fee, and have a photo taken.",
              "You receive a temporary licence on the spot (if documents are in order) and the permanent card is mailed to you."
            ]
          },
          {
            "title": "If you don’t receive a renewal notice",
            "points": [
              "If you don’t get a renewal form when it’s due, contact the Ministry of Transportation.",
              "You are responsible for ensuring you have a valid driver’s licence."
            ]
          },
          {
            "title": "Expired, suspended, cancelled",
            "points": [
              "You can renew an expired car or motorcycle driver’s licence within one year without taking any tests.",
              "If your licence has been suspended, cancelled, or expired for more than three years, you must re-apply in Ontario and meet graduated licensing requirements (including passing all required tests)."
            ]
          }
        ]
      },
      {
        "name": "Senior drivers (age 80+): renewal every two years",
        "description": "Extra renewal steps are required at age 80 or older to help identify unsafe driving and support continued mobility.",
        "keywords": ["senior drivers", "80 years", "renew every two years", "driving-record review", "vision test", "group education", "screening", "road test", "medical information"],
        "topics": [
          {
            "title": "What the 80+ renewal process includes",
            "points": [
              "Renew every two years.",
              "Driving-record review.",
              "Vision test.",
              "45-minute group education session plus an in-class screening component.",
              "You may be required to take a road test, or renew with a requirement to submit follow-up medical information."
            ]
          },
          {
            "title": "Fees",
            "points": [
              "There is no charge for the renewal requirements themselves.",
              "You still pay the licence-renewal fee."
            ]
          },
          {
            "title": "How aging can affect driving safety",
            "points": [
              "Reduced vision (especially at night).",
              "Difficulty judging distance and speed.",
              "Limited movement and range of motion.",
              "Slower reaction time.",
              "Difficulty focusing attention for long periods.",
              "Easily distracted.",
              "More time needed to understand what you see and hear.",
              "Increased use of prescription/over-the-counter drugs that may impair driving."
            ]
          },
          {
            "title": "How seniors can make driving safer",
            "points": [
              "Check with your doctor/pharmacist that medications (including over-the-counter and combinations) won’t impair driving.",
              "Report vision changes, unexplained dizziness/fainting spells, and frequent/chronic/severe pain to your doctor.",
              "Avoid driving if in pain (pain can reduce concentration and limit movement).",
              "Have hearing and eyes checked regularly (peripheral vision and depth perception can decline).",
              "Consider an exercise program to improve flexibility and strength.",
              "Consider a driver’s course to refresh rules and safe-driving practices."
            ]
          },
          {
            "title": "Self-check: ‘How’s my driving?’",
            "points": [
              "Am I having more near-collisions?",
              "Have I been involved in minor collisions?",
              "Do I have difficulty at intersections, judging distance, or seeing pedestrians/signs/vehicles?",
              "Do I have difficulty concentrating while driving?",
              "Do I get lost or disoriented on familiar roads?",
              "Do I have difficulty coordinating hand and foot movements?",
              "Am I having vision problems, especially at night?",
              "Do I get nervous behind the wheel?",
              "Do other motorists frequently honk at me?",
              "Do family members express concern about my driving ability?"
            ]
          }
        ]
      },
      {
        "name": "Graduated licensing requalification",
        "description": "If a novice licence is near expiry and you haven’t completed graduated licensing, requalification can let you keep the same class by passing a test and paying a fee.",
        "keywords": ["graduated licensing", "requalification", "G1", "G2", "M2", "expiry", "five years", "road tests", "mandatory time periods"],
        "topics": [
          {
            "title": "How requalification works",
            "points": [
              "Novice drivers (G1, G2, M1, M2) progress through a two-step process with mandatory time periods and required road tests (except M1 differs).",
              "Most novice drivers have five years to complete the process (except Class M1).",
              "If your G1, G2, or M2 is about to expire and you haven’t completed the process, you may regain/retain the same class by passing a test and paying the five-year licensing fee (‘requalification’).",
              "Notices are sent to G1, G2, and M2 drivers before expiry describing options.",
              "If you do not complete graduated licensing or requalify before your novice licence expires, you must reapply for a Level One licence."
            ]
          }
        ]
      },
      {
        "name": "Changing your name or address",
        "description": "You must notify the Ministry within a strict time limit and replace your licence card when details change.",
        "keywords": ["change address", "change name", "within six days", "new licence", "ServiceOntario website", "temporary licence", "destroy old licence"],
        "topics": [
          {
            "title": "Address change rules",
            "points": [
              "You must tell the Ministry of Transportation within six days of changing your address.",
              "You need a new licence when you change your address.",
              "You can change your address online via ServiceOntario or by submitting the change at a Driver and Vehicle Licence Issuing Office or by mail.",
              "When you receive the new licence, destroy the old one and carry the new one whenever you drive."
            ]
          },
          {
            "title": "Name change rules",
            "points": [
              "You must tell the Ministry of Transportation within six days of changing your name.",
              "You need a new licence when your name changes.",
              "Bring required documents and your current licence to a Driver and Vehicle Licence Issuing Office; a new photo will be taken.",
              "You receive a temporary licence until the permanent one is mailed.",
              "There is no charge for a new licence because you changed your name or address."
            ]
          }
        ]
      },
      {
        "name": "Driver’s licence laws (illegal uses)",
        "description": "Specific illegal actions involving licences that can lead to penalties.",
        "keywords": ["illegal", "lend licence", "altered licence", "fictitious licence", "imitation", "more than one licence"],
        "topics": [
          {
            "title": "It is illegal to",
            "points": [
              "Lend your licence.",
              "Let someone else use your licence.",
              "Use an altered licence.",
              "Use another licence as your own.",
              "Have more than one Ontario driver’s licence.",
              "Use a fictitious or imitation licence."
            ]
          }
        ]
      },
      {
        "name": "The demerit point system",
        "description": "Demerit points encourage safer driving; they stay on your record for two years and can trigger warnings and suspensions based on thresholds.",
        "keywords": ["demerit points", "two years", "warning letter", "suspension", "novice drivers", "fully licensed", "thresholds"],
        "topics": [
          {
            "title": "How demerit points work",
            "points": [
              "Driving-related convictions can add demerit points to your driving record.",
              "Demerit points stay on your record for two years from the date of the offence.",
              "If you accumulate too many points, your licence can be suspended."
            ]
          },
          {
            "title": "New drivers (Level One/Level Two): point thresholds",
            "points": [
              "2+ points: warning letter.",
              "6 points: second warning letter.",
              "9+ points: licence suspended for 60 days from the date you surrender it.",
              "If you fail to surrender your licence after suspension, you can lose it for up to two years.",
              "After a 9+ point suspension, points are reduced to 4; further points can trigger action again, and a second time reaching 9 points can mean a 6-month suspension."
            ]
          },
          {
            "title": "Novice condition violations (escalating sanctions note)",
            "points": [
              "If you are a novice driver and are convicted of violating any novice condition, or an offence associated with 4+ points, you may receive an escalating novice suspension.",
              "In that case, demerit points may be recorded as zero and not counted toward the accumulated demerit point system."
            ]
          },
          {
            "title": "Fully licensed drivers: point thresholds",
            "points": [
              "6 points: warning letter recommending improved driving skills.",
              "9 points: second warning letter encouraging improvement.",
              "15 points: licence suspended for 30 days from the date you surrender it.",
              "If you fail to surrender your licence after suspension, you can lose it for up to two years.",
              "After a 15-point suspension, points are reduced to 7; reaching 15 points again may result in a 6-month suspension."
            ]
          }
        ]
      },
      {
        "name": "Common offences and demerit point values (examples list)",
        "description": "A reference list showing how many points are assigned to common driving offences.",
        "keywords": ["table of offences", "7 points", "6 points", "5 points", "4 points", "3 points", "2 points", "careless driving", "racing", "school bus", "handheld device"],
        "topics": [
          {
            "title": "Seven points",
            "points": [
              "Failing to remain at the scene of a collision.",
              "Failing to stop for police."
            ]
          },
          {
            "title": "Six points",
            "points": [
              "Careless driving.",
              "Racing.",
              "Exceeding the speed limit by 40 km/h or more on roads with a speed limit less than 80 km/h.",
              "Exceeding the speed limit by 50 km/h or more.",
              "Failing to stop for a school bus."
            ]
          },
          {
            "title": "Five points",
            "points": [
              "Driver of bus failing to stop at an unprotected railway crossing."
            ]
          },
          {
            "title": "Four points",
            "points": [
              "Exceeding the speed limit by 30 to 49 km/h.",
              "Following too closely.",
              "Failing to stop at a pedestrian crossover."
            ]
          },
          {
            "title": "Three points",
            "points": [
              "Exceeding the speed limit by 16 to 29 km/h.",
              "Driving through, around, or under a railway crossing barrier.",
              "Driving while holding or using a handheld wireless communication/entertainment device or viewing a display screen unrelated to driving.",
              "Failing to yield the right-of-way.",
              "Failing to obey a stop sign, traffic light, or railway crossing signal.",
              "Failing to obey traffic-control stop/slow signs or a school crossing stop sign.",
              "Failing to obey directions of a police officer.",
              "Driving the wrong way on a divided road.",
              "Failing to report a collision to a police officer.",
              "Improper driving where a road is divided into lanes.",
              "Crowding the driver’s seat.",
              "Going the wrong way on a one-way road.",
              "Driving/operating a vehicle on a closed road.",
              "Crossing a divided road where no proper crossing is provided.",
              "Failing to slow and carefully pass a stopped emergency vehicle.",
              "Failing to move (where possible) into another lane when passing a stopped emergency vehicle.",
              "Driving a vehicle equipped with a radar detector.",
              "Improper use of an HOV lane.",
              "Improper opening of a vehicle door."
            ]
          },
          {
            "title": "Two points",
            "points": [
              "Failing to lower headlight beam.",
              "Prohibited turns.",
              "Towing people (e.g., on toboggans, bicycles, skis).",
              "Failing to obey signs.",
              "Failing to share the road.",
              "Improper right turn.",
              "Improper left turn.",
              "Failing to signal.",
              "Unnecessary slow driving.",
              "Reversing on a highway.",
              "Driver failing to wear a seatbelt.",
              "Driver failing to ensure infant/toddler/child passengers are properly secured.",
              "Driver failing to ensure a passenger under 16 wears a seatbelt or sits in a seat with a seatbelt."
            ]
          }
        ]
      }
    ]
  },

  {
    "title": "Other ways to lose your licence",
    "description": "How Ontario suspends or cancels licences beyond demerit points—covering escalating sanctions for novice drivers, zero BAC rules for young/novice drivers, medical suspensions, HTA and Criminal Code suspensions, administrative roadside suspensions (ADLS and warn-range), remedial programs, penalties for driving while suspended/prohibited, vehicle impoundment, and impaired driving enforcement and consequences.",
    "icon": "ban",
    "sections": [
      {
        "name": "Why this matters (strict safety laws)",
        "description": "Ontario uses strict laws and escalating sanctions to reduce high-risk driving (impaired, careless, stunt/racing, fleeing).",
        "keywords": [
          "strict laws",
          "impaired driving",
          "careless driving",
          "stunt driving",
          "street racing",
          "fleeing police",
          "fleeing collision scene",
          "escalating sanctions",
          "suspensions",
          "court sanctions"
        ],
        "topics": [
          {
            "title": "Big-picture consequences",
            "points": [
              "Sanctions can escalate quickly: lengthy suspensions, major fines, reinstatement fees, licence restrictions, lifetime bans, and even jail time."
            ]
          }
        ]
      },
      {
        "name": "Suspensions: major categories",
        "description": "Common reasons your licence can be suspended outside the demerit-point system.",
        "keywords": [
          "suspensions",
          "escalating sanctions",
          "zero BAC",
          "medical suspension",
          "discretionary HTA",
          "mandatory HTA",
          "ADLS",
          "warn-range",
          "novice-driver violations"
        ],
        "topics": [
          {
            "title": "Main suspension types in this section",
            "points": [
              "Escalating sanctions (novice drivers).",
              "Zero Blood-Alcohol Concentration (BAC) for novice and young drivers.",
              "Medical suspensions.",
              "Discretionary Highway Traffic Act (HTA) suspensions.",
              "Mandatory HTA suspensions.",
              "Administrative Driver’s Licence Suspension (ADLS).",
              "“Warn-range” suspensions.",
              "Novice-driver violations."
            ]
          }
        ]
      },
      {
        "name": "Escalating sanctions (novice drivers)",
        "description": "Within a five-year period, certain repeat or serious events trigger escalating sanctions.",
        "keywords": [
          "escalating sanctions",
          "novice drivers",
          "five-year period",
          "repeat violations",
          "4+ demerit points",
          "court-ordered suspension"
        ],
        "topics": [
          {
            "title": "Triggers within five years",
            "points": [
              "Repeat violations of novice restrictions.",
              "HTA convictions that carry four or more demerit points.",
              "Court-ordered licence suspensions."
            ]
          }
        ]
      },
      {
        "name": "Dangerous behaviours (stunt / street racing / aggressive driving)",
        "description": "High-speed and aggressive behaviours sharply increase fatal/serious injury risk and can lead to severe sanctions.",
        "keywords": [
          "stunt driving",
          "street racing",
          "aggressive driving",
          "speeding 40 km/h over",
          "speeding 50 km/h over",
          "prevent passing",
          "cutting off",
          "nitrous oxide system"
        ],
        "topics": [
          {
            "title": "Examples of aggressive/dangerous behaviours",
            "points": [
              "Driving 40 km/h or more over the posted limit on roads with a speed limit under 80 km/h.",
              "Driving 50 km/h or more over the posted limit.",
              "Driving to prevent another vehicle from passing.",
              "Intentionally cutting off another vehicle.",
              "Street racing and driving stunts.",
              "Using a connected nitrous-oxide system while driving on a highway is prohibited."
            ]
          }
        ]
      },
      {
        "name": "Careless driving sanctions",
        "description": "Careless driving is driving without due care/attention or reasonable consideration; convictions can carry tough sanctions.",
        "keywords": [
          "careless driving",
          "due care",
          "attention",
          "reasonable consideration",
          "aggressive driving",
          "sanctions"
        ],
        "topics": [
          {
            "title": "Definition (in plain terms)",
            "points": [
              "Careless driving means driving without due care and attention, or without reasonable consideration for others using the highway.",
              "If convicted, drivers can face tough sanctions."
            ]
          }
        ]
      },
      {
        "name": "Zero BAC for novice and young drivers (21 and under)",
        "description": "Ontario requires zero blood alcohol for all drivers 21 and under, regardless of licence class.",
        "keywords": [
          "zero BAC",
          "21 and under",
          "24-hour roadside suspension",
          "fine",
          "30-day suspension"
        ],
        "topics": [
          {
            "title": "Rule + immediate consequences",
            "points": [
              "All drivers aged 21 and under must have a BAC of zero when operating a motor vehicle (any licence class).",
              "If you violate this, you receive a 24-hour roadside driver’s-licence suspension.",
              "If convicted, you could face a fine and at least a 30-day licence suspension."
            ]
          }
        ]
      },
      {
        "name": "Medical suspension",
        "description": "Doctors must report certain medical conditions that can impair driving; the Ministry can suspend a licence until medical evidence shows it’s safe.",
        "keywords": [
          "medical suspension",
          "doctor reporting",
          "stroke",
          "heart condition",
          "dizziness",
          "medical evidence",
          "safety risk"
        ],
        "topics": [
          {
            "title": "How it works",
            "points": [
              "Doctors must report people aged 16+ with conditions that may affect safe driving.",
              "This information goes to the Ministry of Transportation and is not shared more widely.",
              "Your licence may be suspended until new medical evidence shows the condition doesn’t pose a safety risk."
            ]
          }
        ]
      },
      {
        "name": "Mandatory HTA suspensions",
        "description": "Certain HTA-related situations trigger mandatory suspensions (including failing to stop for police and unpaid court-ordered fines).",
        "keywords": ["mandatory HTA suspension", "fail to stop for police", "minimum five years", "unpaid traffic fine"],
        "topics": [
          {
            "title": "Examples listed in this section",
            "points": [
              "Failing to stop for a police officer (minimum five years).",
              "Not paying a traffic fine when ordered by the court."
            ]
          }
        ]
      },
      {
        "name": "Administrative Driver’s Licence Suspension (ADLS) — 90 days",
        "description": "Immediate 90-day roadside/police-station suspension for .08+ BAC or refusing/testing non-compliance; separate from criminal charges.",
        "keywords": [
          "ADLS",
          "90 days",
          ".08",
          "80 milligrams",
          "refuse breath sample",
          "blood sample",
          "oral fluid",
          "urine sample",
          "physical co-ordination tests",
          "drug evaluation",
          "separate from charges"
        ],
        "topics": [
          {
            "title": "Triggers for an immediate 90-day suspension",
            "points": [
              "BAC over 80 milligrams of alcohol in 100 millilitres of blood (.08).",
              "Failing or refusing to give a breath, blood, oral fluid, or urine sample when asked by police.",
              "Failing or refusing to perform physical co-ordination tests or submit to a drug evaluation when required."
            ]
          },
          {
            "title": "Important note",
            "points": [
              "ADLS takes effect immediately at the roadside or police station and is separate from any criminal charges/prosecution."
            ]
          }
        ]
      },
      {
        "name": "“Warn-range” suspension (.05 to .08)",
        "description": "Immediate roadside suspensions for warn-range BAC, with escalating lengths and required education/treatment for repeats.",
        "keywords": [
          "warn-range",
          ".05",
          ".08",
          "three days",
          "seven days",
          "remedial alcohol education",
          "increased penalties"
        ],
        "topics": [
          {
            "title": "Immediate roadside suspensions",
            "points": [
              "BAC in the warn range (.05 to .08) results in an immediate roadside suspension.",
              "First occurrence: 3-day suspension.",
              "Second occurrence: 7-day suspension plus a remedial alcohol-education program.",
              "Subsequent occurrences: substantially increased penalties and sanctions."
            ]
          }
        ]
      },
      {
        "name": "Novice-driver violations (graduated licensing conditions)",
        "description": "Violating any graduated-licensing condition triggers an immediate novice suspension.",
        "keywords": [
          "novice drivers",
          "graduated licensing conditions",
          "30-day suspension",
          "surrender licence",
          "up to two years"
        ],
        "topics": [
          {
            "title": "Immediate consequence",
            "points": [
              "If you violate any graduated-licensing condition, your licence is suspended for 30 days starting when you surrender your licence.",
              "If you fail to surrender it, you can lose your licence for up to two years."
            ]
          }
        ]
      },
      {
        "name": "Licence cancellation (non-suspension reasons)",
        "description": "Your licence can be cancelled in several administrative or re-exam situations.",
        "keywords": [
          "licence cancelled",
          "driver re-examination",
          "reinstatement fee",
          "administrative monetary penalty",
          "dishonoured cheque",
          "voluntary surrender",
          "returned by another jurisdiction"
        ],
        "topics": [
          {
            "title": "Reasons your licence may be cancelled",
            "points": [
              "Failing a driver’s re-examination.",
              "Not paying your reinstatement fee or administrative monetary penalty after a suspension.",
              "Your cheque for licence fees is not honoured by your bank.",
              "Voluntarily surrendering your licence to the Ministry (or it is surrendered/returned by another jurisdiction)."
            ]
          }
        ]
      },
      {
        "name": "Criminal Code suspensions",
        "description": "Criminal Code convictions can trigger a one-year suspension for a first offence and escalate to a lifetime ban; convictions stay on record for at least 10 years.",
        "keywords": [
          "Criminal Code suspension",
          "one-year suspension",
          "lifetime ban",
          "10 years on record",
          "impaired driving",
          "refuse breath test",
          "dangerous driving",
          "fail to remain",
          "fail to stop for police",
          "criminal negligence"
        ],
        "topics": [
          {
            "title": "How long and how it escalates",
            "points": [
              "First Criminal Code conviction: one-year licence suspension.",
              "Subsequent convictions: penalties increase substantially up to a lifetime driving ban.",
              "Convictions remain on your driver’s record for a minimum of 10 years."
            ]
          },
          {
            "title": "Examples of Criminal Code offences listed",
            "points": [
              "BAC over .08 (driving or having care and control, including boats).",
              "Refusing to submit to a breath test / failing or refusing roadside breath sample.",
              "Failing to remain at the scene of a collision.",
              "Dangerous driving.",
              "Causing death or bodily harm by criminal negligence.",
              "Failing to stop for police."
            ]
          }
        ]
      },
      {
        "name": "Remedial measures (Back on Track and driver-improvement interview)",
        "description": "Certain suspensions require completion of remedial programs before reinstatement.",
        "keywords": [
          "remedial measures",
          "Back on Track",
          "warn range conviction",
          "alcohol education",
          "alcohol treatment",
          "driver-improvement interview",
          "further suspended"
        ],
        "topics": [
          {
            "title": "Back on Track (mandatory)",
            "points": [
              "Mandatory for drivers convicted of impaired driving-related Criminal Code offences."
            ]
          },
          {
            "title": "Warn-range repeats",
            "points": [
              "Drivers with more than one warn-range conviction must take alcohol-education and/or alcohol-treatment programs."
            ]
          },
          {
            "title": "Reinstatement condition",
            "points": [
              "If suspended for a Criminal Code conviction, your licence remains suspended until you complete the required remedial measures."
            ]
          },
          {
            "title": "Driver-improvement interview (other Criminal Code offences)",
            "points": [
              "Applies to drivers convicted of non-drinking-and-driving Criminal Code driving offences who have no prior alcohol-related convictions.",
              "If you don’t complete the interview by the time your Criminal Code suspension expires, your licence is further suspended until completion.",
              "Also applies to Ontario residents convicted in other provinces/states (as described), and to out-of-province drivers convicted in Ontario."
            ]
          }
        ]
      },
      {
        "name": "Driving under suspension or prohibition",
        "description": "Driving while suspended/prohibited carries major fines, possible jail, and added suspension time.",
        "keywords": [
          "driving under suspension",
          "HTA offence",
          "Criminal Code offence",
          "thousands in fines",
          "tens of thousands",
          "up to six months jail",
          "added six months",
          "prohibition order"
        ],
        "topics": [
          {
            "title": "Driving while suspended (HTA)",
            "points": [
              "You may not drive under any circumstances if your licence is suspended.",
              "HTA suspended-driving conviction can bring fines in the thousands and up to six months in jail.",
              "Six months may be added to your current suspension."
            ]
          },
          {
            "title": "Driving while suspended (Criminal Code)",
            "points": [
              "If suspended for a Criminal Code offence, you can face fines of tens of thousands of dollars and jail time."
            ]
          },
          {
            "title": "Driving while prohibited",
            "points": [
              "A prohibition order is issued under the Criminal Code.",
              "Violating the order results in a one-year suspension for a first offence or two years for a subsequent offence."
            ]
          }
        ]
      },
      {
        "name": "Vehicle-Impoundment Program",
        "description": "Ontario uses impoundments to deter impaired/suspended driving; impoundments can apply even if the vehicle is borrowed or rented.",
        "keywords": [
          "vehicle impoundment",
          "seven-day impoundment",
          "45 days",
          "ignition interlock",
          "borrowed vehicle",
          "rented vehicle",
          "towing and storage",
          "verify licence",
          "driver abstract"
        ],
        "topics": [
          {
            "title": "When impoundment applies",
            "points": [
              "Seven-day vehicle impoundments can apply for: driving while under an HTA suspension; driving without required ignition interlock; BAC over .08 or failing/refusing Criminal Code demands.",
              "If caught driving while suspended for a Criminal Code offence, the vehicle may be impounded for at least 45 days."
            ]
          },
          {
            "title": "Owner responsibility",
            "points": [
              "Impoundment can apply even if the vehicle is borrowed from family/friends, an employer/business, or rented.",
              "The vehicle owner must pay towing and storage before release.",
              "Owners can verify licence validity by phone/online or obtain a driver’s abstract at ServiceOntario (fee applies)."
            ]
          }
        ]
      },
      {
        "name": "Impaired driving (alcohol and drugs): enforcement and consequences",
        "description": "Impaired driving is a Criminal Code offence; police can require breath/sobriety/drug evaluation and samples; penalties can be severe up to life imprisonment in fatal cases.",
        "keywords": [
          "impaired driving",
          "care and control",
          "Criminal Code",
          "breath samples",
          "sobriety tests",
          "drug recognition evaluation",
          "oral fluid",
          "urine",
          "blood samples",
          "refuse demand",
          "penalties",
          "$50,000",
          "ignition interlock",
          "insurance",
          "employment"
        ],
        "topics": [
          {
            "title": "Key legal points",
            "points": [
              "Driving while impaired by alcohol or drugs is a crime in Canada.",
              "Your vehicle does not have to be moving—being impaired behind the wheel can result in charges even if you haven’t started driving.",
              "Police can stop drivers to determine if alcohol or drug testing is required, including roadside spot checks.",
              "In suspected impairment cases (drugs or alcohol+drugs), police can require breath samples, field sobriety tests, a drug evaluation, and oral fluid/urine/blood samples.",
              "Failing or refusing to comply with demands can lead to Criminal Code charges."
            ]
          },
          {
            "title": "Young drivers reminder (again)",
            "points": [
              "If you are 21 and under, you must not drive after drinking alcohol—your BAC must be zero."
            ]
          },
          {
            "title": "Medication and over-the-counter drug cautions",
            "points": [
              "Ask your doctor about side effects (dizziness, blurred vision, nausea, drowsiness) if you take prescription meds or allergy shots.",
              "Read labels for over-the-counter medicine (cold/allergy/sedative/diet pills).",
              "Drugs plus any amount of alcohol can have dangerous effects, even days later—don’t take chances; ask your doctor or pharmacist."
            ]
          },
          {
            "title": "Consequences of impaired driving",
            "points": [
              "Ontario’s measures can include licence suspensions, heavy fines, vehicle impoundment, mandatory education/treatment programs, and ignition interlock.",
              "Depending on prior convictions, penalties can include fines up to $50,000, jail time, or permanent loss of licence.",
              "Impaired driving causing bodily harm can result in up to 14 years in prison; impaired driving causing death can result in life imprisonment.",
              "Insurance may not cover your medical/rehab costs or vehicle damage; premiums may rise significantly; you may face large legal costs.",
              "If you need a licence for work, suspension could mean losing employment."
            ]
          }
        ]
      },
      {
        "name": "Summary",
        "content": "You should know: circumstances where your licence can be cancelled or suspended (HTA, Criminal Code, medical, administrative roadside); special rules for novice/young drivers (including zero BAC and escalating sanctions); what happens if you drive while suspended/prohibited; how vehicle impoundments work; and how alcohol/drugs affect driving plus the legal and personal consequences of impaired driving.",
        "keywords": [
          "summary",
          "suspension",
          "cancellation",
          "ADLS",
          "warn-range",
          "zero BAC",
          "novice sanctions",
          "medical suspension",
          "Criminal Code",
          "impoundment",
          "impaired driving"
        ]
      }
    ]
  },

  {
    "title": "Your vehicle",
    "description": "Ontario rules and responsibilities for owning and operating a vehicle: your legal duty to register, insure, and maintain it to basic safety standards, plus key subtopics for maintenance, insurance/registration, buying/selling used vehicles, towing, and self-testing knowledge.",
    "icon": "car",
    "sections": [
      {
        "name": "Overview: vehicle responsibilities in Ontario",
        "description": "All motor vehicles on Ontario roads must meet legal requirements for registration, insurance, and maintenance. Vehicle owners (and buyers/sellers) are responsible for meeting these requirements.",
        "keywords": [
          "vehicle responsibilities",
          "registered",
          "insured",
          "maintained",
          "safety standards",
          "vehicle owner",
          "buying and selling vehicles",
          "Ontario roads"
        ],
        "topics": [
          {
            "title": "Core legal requirements",
            "points": [
              "All motor vehicles on Ontario roads must be registered, insured, and maintained to meet basic safety standards.",
              "If you own a vehicle, you are responsible for making sure it meets the requirements.",
              "People who buy and sell vehicles also have certain responsibilities."
            ]
          }
        ]
      },
      {
        "name": "Related handbook sections and resources",
        "description": "The handbook points you to the key pages that expand on vehicle ownership and operation obligations.",
        "keywords": [
          "maintaining your vehicle",
          "vehicle insurance",
          "vehicle registration",
          "buying used vehicle",
          "selling used vehicle",
          "towing",
          "knowledge test questions"
        ],
        "topics": [
          {
            "title": "Linked subtopics from this chapter",
            "points": [
              "Maintaining your vehicle.",
              "Vehicle insurance and registration.",
              "Buying or selling a used vehicle (Ontario guidance).",
              "Towing.",
              "Test yourself: sample knowledge test questions."
            ]
          }
        ]
      }
    ]
  },

  {
    "title": "Maintaining your vehicle",
    "description": "Why maintenance matters (safety, legality, cost, and environment), what officers/inspectors can check, daily driver habits, trip-prep checks, regular maintenance schedules, winter readiness, and tire safety standards and replacement rules.",
    "icon": "wrench",
    "sections": [
      {
        "name": "Why vehicle maintenance matters (legal + practical)",
        "description": "Keeping a vehicle in safe condition is required by law and also reduces costs and environmental impact.",
        "keywords": ["illegal to drive unsafe", "dangerous condition", "gas mileage", "resale value", "environment", "inspection", "unsafe vehicle taken off road"],
        "topics": [
          {
            "title": "Key reasons to maintain your vehicle",
            "points": [
              "It is illegal to drive a vehicle in a dangerous condition.",
              "Maintenance can improve gas mileage and resale value.",
              "Maintenance helps protect the environment.",
              "Police or Ministry of Transportation inspectors can examine your vehicle, its equipment, and any attached trailer at any time.",
              "If a vehicle is found unsafe, it may be taken off the road until fixed."
            ]
          }
        ]
      },
      {
        "name": "Driver habits (quick checks you do routinely)",
        "description": "Simple walk-around and in-cab checks help you catch problems early; consult the owner’s manual and get a mechanic if needed.",
        "keywords": ["driver habits", "walk-around", "owner manual", "qualified mechanic", "damage", "fluid leaks", "tires", "doors", "hood", "trunk", "unsecured load", "ice snow dirt"],
        "topics": [
          {
            "title": "Before you get in (approaching the vehicle)",
            "points": [
              "Look for fresh damage.",
              "Check for fluid leaks underneath.",
              "Check for under-inflated or flat tires.",
              "Check for ajar doors, hood, trunk, and fuel door/cap.",
              "Check for unsecured loads.",
              "Remove ice, snow, or dirt that could interfere with lighting, steering, or visibility, or could come loose and become a hazard."
            ]
          },
          {
            "title": "From the driver’s seat (before driving)",
            "points": [
              "Ensure you have unobstructed visibility around the entire vehicle.",
              "Check for burned-out or dim headlamps.",
              "Confirm dashboard warning lights illuminate during engine start and then go out.",
              "Secure loose objects in the vehicle."
            ]
          },
          {
            "title": "While driving (things to notice)",
            "points": [
              "Watch for unusual engine or exhaust noises.",
              "Pay attention to squeaking or grinding noises when braking.",
              "Respond to any dashboard warning lights that come on while driving."
            ]
          }
        ]
      },
      {
        "name": "Checks before an extended trip",
        "description": "Do deeper inspections before long drives, and consider a mechanic inspection for added confidence.",
        "keywords": ["extended trip", "wipers", "washer fluid", "tire pressure", "tire wear", "lights", "under the hood", "engine cold", "oil", "coolant", "belts", "hoses", "leaks", "mechanic inspection"],
        "topics": [
          {
            "title": "Trip-prep checklist",
            "points": [
              "Check windshield wipers and washer-fluid level.",
              "Check tire pressures, tire condition, and wear.",
              "Confirm all lights work.",
              "With the engine cold, check under the hood: oil and coolant levels; obvious defects in belts/hoses; possible leaks (use your owner’s manual for guidance).",
              "Consider a thorough inspection by a qualified mechanic."
            ]
          }
        ]
      },
      {
        "name": "Regular maintenance schedules",
        "description": "Follow the manufacturer schedule based on mileage or time (whichever comes first).",
        "keywords": ["regular maintenance", "manufacturer schedule", "mileage", "time intervals", "oil change", "filter change", "fluid checks", "air filter", "fuel filter", "tire rotation", "brake inspection", "timing belt"],
        "topics": [
          {
            "title": "Typical regular maintenance items",
            "points": [
              "Follow the maintenance schedule in your owner’s manual (based on mileage or time intervals).",
              "Common tasks include oil and filter changes, fluid checks/changes, air and fuel filter replacement, tire rotation, and brake inspection.",
              "Some vehicles require periodic major servicing (e.g., engine adjustments and timing-belt replacement)."
            ]
          }
        ]
      },
      {
        "name": "Winter maintenance",
        "description": "Prepare for winter driving with emergency supplies, washer fluid, and exhaust system checks.",
        "keywords": ["winter maintenance", "emergency supplies", "shovel", "booster cables", "flares", "warning lights", "blanket", "towing chain", "washer fluid", "faulty exhaust"],
        "topics": [
          {
            "title": "Winter readiness checklist",
            "points": [
              "Carry emergency supplies: shovel, booster cables, emergency flares or warning lights, a blanket, and a chain for towing.",
              "Carry extra windshield washer fluid and refill as needed.",
              "Check your exhaust system if it is noisy or rattles—faulty exhaust is especially dangerous in winter when windows/vents are often closed."
            ]
          }
        ]
      },
      {
        "name": "Tires",
        "description": "Tires must meet safety standards and be in safe condition. Replace worn/damaged/aged tires and choose appropriate winter traction.",
        "keywords": ["tires", "traction", "mileage", "safety", "Canadian Motor Vehicle Safety Act", "10 years", "tread 1.5 mm", "tread-wear indicators", "4,500 kg", "3 mm", "bulges", "exposed cords", "minimum size", "winter tires", "all-weather", "studded tires", "northern Ontario", "air pressure", "rotate tires"],
        "topics": [
          {
            "title": "Safety standards + age limits",
            "points": [
              "Tires must meet standards under the Canadian Motor Vehicle Safety Act.",
              "Tires deteriorate with age even when not used; aged tires have reduced traction, may crack, and may fail unexpectedly.",
              "Tires should not be older than 10 years."
            ]
          },
          {
            "title": "When to replace tires",
            "points": [
              "Replace tires when tread depth is less than 1.5 mm or when tread-wear indicators touch the road.",
              "Vehicles weighing more than 4,500 kg must replace front tires when tread is less than 3 mm.",
              "Replace tires with bumps, bulges, knots, exposed cords, or deep cuts that expose cords."
            ]
          },
          {
            "title": "Correct sizing and matching",
            "points": [
              "A tire must not be smaller than the manufacturer’s specified minimum size.",
              "A tire must not be so large that it touches the vehicle or affects safe operation.",
              "Use similar tires on all four wheels."
            ]
          },
          {
            "title": "Winter traction recommendations",
            "points": [
              "For best winter traction, equip your vehicle with four winter or all-weather tires with the same tread pattern.",
              "Studded tires are legally permitted in northern Ontario."
            ]
          },
          {
            "title": "Extend tire life (environment + cost)",
            "points": [
              "Scrap tires are an environmental concern—maintenance extends tire life and delays disposal.",
              "Maintain correct air pressure.",
              "Inspect tires for wear.",
              "Rotate tires regularly.",
              "Practise good driving habits."
            ]
          }
        ]
      }
    ]
  },

  {
    "title": "Vehicle insurance and registration",
    "description": "Ontario’s legal requirements for auto insurance and vehicle registration, what you need to register/renew, special rules for new residents, and practical steps to protect yourself from auto insurance fraud (especially after a collision).",
    "icon": "shield-check",
    "sections": [
      {
        "name": "Auto insurance (it’s the law)",
        "description": "Every registered vehicle in Ontario must be insured, and proof of insurance is required to register or renew registration.",
        "keywords": [
          "compulsory auto insurance",
          "proof of insurance",
          "register vehicle",
          "renew registration",
          "FSRA",
          "Financial Services Regulatory Authority of Ontario"
        ],
        "topics": [
          {
            "title": "Core rules",
            "points": [
              "Ontario has compulsory automobile insurance: every vehicle registered in Ontario must be insured.",
              "You must show proof of insurance coverage before you can register a vehicle or renew your registration.",
              "The Financial Services Regulatory Authority of Ontario (FSRA) regulates auto insurance in Ontario."
            ]
          }
        ]
      },
      {
        "name": "Registration basics",
        "description": "Vehicle registration includes licence plates and a vehicle permit, and Ontario uses a plate-to-owner system.",
        "keywords": [
          "vehicle registration",
          "licence plates",
          "vehicle permit",
          "plate-to-owner system",
          "remove plates",
          "ServiceOntario"
        ],
        "topics": [
          {
            "title": "What registration includes",
            "points": [
              "Vehicle registration includes licence plates and a vehicle permit."
            ]
          },
          {
            "title": "Plate-to-owner system (important)",
            "points": [
              "Licence plates in Ontario are tied to the owner, not the vehicle.",
              "When you sell or change vehicles, you must remove your plates.",
              "If you won’t use the plates on another vehicle, you may return them to a ServiceOntario centre."
            ]
          }
        ]
      },
      {
        "name": "New residents (registering a vehicle after moving to Ontario)",
        "description": "New Ontario residents have a time limit and must bring specific documents to ServiceOntario.",
        "keywords": [
          "new residents",
          "30 days",
          "register vehicle",
          "ServiceOntario",
          "safety standards certificate",
          "proof of insurance",
          "vehicle import forms",
          "vehicle permit ownership"
        ],
        "topics": [
          {
            "title": "Deadline + what to bring",
            "points": [
              "New Ontario residents have 30 days to register their vehicles.",
              "To get a permit and Ontario licence plates, go to a ServiceOntario centre.",
              "Bring: a safety standards certificate, proof of insurance, vehicle import forms (if imported), and the vehicle permit/ownership from your previous jurisdiction."
            ]
          }
        ]
      },
      {
        "name": "Protect yourself from auto insurance fraud",
        "description": "Use licensed providers and be careful after collisions—especially with referrals, forms, and billing.",
        "keywords": [
          "insurance fraud",
          "licensed insurer",
          "agent",
          "broker",
          "FSRA",
          "RIBO",
          "after collision",
          "tow truck referrals",
          "blank forms",
          "detailed bills",
          "photos",
          "collect information"
        ],
        "topics": [
          {
            "title": "When buying auto insurance",
            "points": [
              "Use a licensed insurance company, agent, or broker.",
              "Use FSRA resources to verify whether an insurance company or agent is licensed.",
              "Use RIBO resources to verify whether an insurance broker is licensed."
            ]
          },
          {
            "title": "After an auto collision (fraud-prevention checklist)",
            "points": [
              "Collect as much information as possible and take photos of the collision scene.",
              "Get names, addresses, phone numbers, licence plate numbers, driver’s licence numbers, and insurance information from everyone involved (including passengers in other vehicles).",
              "Be suspicious of referrals: be wary if a tow operator pressures you or offers money to go to a specific body shop, lawyer, paralegal, or health-care provider.",
              "Contact your insurance company for guidance on towing and where to take your vehicle for repairs.",
              "Refuse to sign blank forms in advance of receiving services or treatment.",
              "Demand detailed repair and medical bills and review them carefully."
            ]
          }
        ]
      },
      {
        "name": "Summary",
        "content": "You should know: Ontario requires auto insurance to register/renew; registration includes plates and a vehicle permit and plates belong to the owner; new residents have 30 days to register and must bring specific documents; and there are practical steps to reduce auto-insurance fraud risk—especially after collisions.",
        "keywords": [
          "summary",
          "compulsory insurance",
          "proof of insurance",
          "registration",
          "plate-to-owner",
          "new resident 30 days",
          "insurance fraud prevention"
        ]
      }
    ]
  },

  {
    "title": "Towing",
    "description": "What you need to tow a trailer behind a car/van/light truck in Ontario: licence and permit rules, trailer registration, equipment requirements (brakes, lights, mirrors, hitching), safe loading, and driving techniques (turning, stopping, passing, backing up, towing disabled vehicles).",
    "icon": "trailer",
    "sections": [
      {
        "name": "Overview: towing risks and readiness",
        "description": "Towing changes how your vehicle handles and increases collision risk; confirm your vehicle, trailer, and hitch are suitable before towing.",
        "keywords": [
          "towing",
          "unique challenges",
          "collision risk",
          "vehicle capability",
          "trailer",
          "hitch requirements",
          "recreational vehicle collisions",
          "lost control",
          "rear-end collisions"
        ],
        "topics": [
          {
            "title": "Before you attempt to tow",
            "points": [
              "Consider the size, power, and condition of your vehicle.",
              "Make sure your vehicle can tow both the trailer and the load you plan to carry.",
              "Make sure your trailer and hitch meet Ontario requirements.",
              "Towing has unique challenges; a large share of towing collisions involve single-vehicle loss of control or rear-end impacts."
            ]
          }
        ]
      },
      {
        "name": "Licence and permit requirements",
        "description": "Licence class depends on gross trailer weight; oversize/overweight setups may require higher-class licensing or a permit.",
        "keywords": [
          "licence class",
          "Class G1",
          "Class G2",
          "Class G",
          "gross vehicle weight",
          "4,600 kg",
          "oversize",
          "overweight",
          "permit"
        ],
        "topics": [
          {
            "title": "Licensing basics",
            "points": [
              "You must have a valid driver’s licence (Class G1, G2, or G) or higher to tow a trailer with a gross vehicle weight up to 4,600 kg.",
              "If the trailer and load exceed size/weight limits in the Highway Traffic Act, you may need a higher class of licence or an oversize vehicle permit."
            ]
          },
          {
            "title": "Important limit",
            "points": [
              "It is against the law for non-commercial vehicles to tow more than one trailer."
            ]
          }
        ]
      },
      {
        "name": "Registering your trailer",
        "description": "A trailer is a separate vehicle and must be registered before it can be towed on public roads.",
        "keywords": [
          "register trailer",
          "separate vehicle",
          "one-time fee",
          "ServiceOntario",
          "licence plate",
          "vehicle permit",
          "carry permit"
        ],
        "topics": [
          {
            "title": "Registration steps",
            "points": [
              "Register your trailer and pay a one-time registration fee at a ServiceOntario centre.",
              "You will receive a licence plate and vehicle permit.",
              "Attach the plate to the back of the trailer where it is clearly visible.",
              "Carry the permit (or a copy) and show it to police if asked."
            ]
          }
        ]
      },
      {
        "name": "Trailer condition and equipment requirements",
        "description": "Your trailer must be safe to operate and meet minimum equipment standards for brakes, lights, splash control, mirrors, and attachment redundancy.",
        "keywords": [
          "safe operating condition",
          "police remove trailer",
          "brakes",
          "1,360 kg",
          "lights",
          "reflectors",
          "clearance lights",
          "2.05 metres wide",
          "mud guards",
          "fenders",
          "flaps",
          "mirrors",
          "two separate attachments",
          "safety chains crossed"
        ],
        "topics": [
          {
            "title": "Safe condition (enforcement)",
            "points": [
              "Your trailer must be in safe operating condition.",
              "If it is unsafe, police may remove it from the road until it is made safe."
            ]
          },
          {
            "title": "Brakes (minimum requirement)",
            "points": [
              "If your trailer’s gross trailer weight (trailer + load) is 1,360 kg or more, it must have brakes strong enough to stop and hold the trailer."
            ]
          },
          {
            "title": "Required lights and reflectors",
            "points": [
              "A white licence-plate light.",
              "A red tail light.",
              "Two red reflectors at the rear, as far apart as possible."
            ]
          },
          {
            "title": "Extra requirements for wider trailers (over 2.05 m)",
            "points": [
              "Two yellow clearance lights at the front (one per side), as far apart as possible.",
              "Two red clearance lights or reflectors at the rear (one per side), as far apart as possible."
            ]
          },
          {
            "title": "Splash control and visibility",
            "points": [
              "Trailer must have mud guards/fenders/flaps or be designed so it does not spray/splash traffic behind.",
              "If your load blocks rear vision, you must have additional mirrors that give a clear view behind."
            ]
          },
          {
            "title": "Attachment redundancy (two separate attachments)",
            "points": [
              "Your trailer must have two separate ways of attaching to the vehicle so the trailer stays attached if one fails.",
              "If using safety chains: cross them under the tongue to prevent it from dropping if the hitch disconnects.",
              "Chain hooks must have latches/devices to prevent accidental detachment."
            ]
          }
        ]
      },
      {
        "name": "No passengers in trailers",
        "description": "Ontario prohibits carrying people in a trailer being towed.",
        "keywords": ["no passengers", "house trailer", "boat trailer", "prohibited"],
        "topics": [
          {
            "title": "Rule",
            "points": [
              "You may not carry any person in any trailer (including house or boat trailers) while it is being towed."
            ]
          }
        ]
      },
      {
        "name": "Trailer hitch selection and setup",
        "description": "Use the correct hitch class for the trailer weight, mount it correctly, keep the trailer level, and use safety chains/cables as a backup.",
        "keywords": [
          "trailer hitch",
          "good-quality",
          "hitch class",
          "gross trailer weight",
          "manufacturer recommendations",
          "hitch-ball",
          "level",
          "load-equalizing hitch",
          "safety chains",
          "cables"
        ],
        "topics": [
          {
            "title": "Hitch requirements",
            "points": [
              "Use a good-quality hitch and the correct hitch class for the gross trailer weight (trailer + load).",
              "Attach the hitch securely according to manufacturer recommendations.",
              "Install the hitch ball so the trailer sits level with no tilting when tightened.",
              "If the hitch pulls down the rear of your vehicle, consider a load-equalizing hitch.",
              "You may also be able to shift some load rearward in the trailer to reduce load on the rear of the towing vehicle (without creating poor balance).",
              "Use safety chains or cables strong enough to hold the trailer and load if the ball/hitch separates."
            ]
          }
        ]
      },
      {
        "name": "Loading your trailer (securement + balance)",
        "description": "Secure all cargo and distribute weight correctly; poor balance causes sway/fishtailing and can reduce steering control.",
        "keywords": [
          "load securement",
          "offence dislodged load",
          "do not overload",
          "weight distribution",
          "5 to 10 percent hitch weight",
          "sway",
          "fishtail",
          "rear-heavy",
          "steering affected",
          "headlights aim",
          "mirror alignment"
        ],
        "topics": [
          {
            "title": "Securement and overloading",
            "points": [
              "Strap everything down (inside and outside).",
              "It is an offence to have a load that may become dislodged or fall off.",
              "Do not overload the trailer—overload strains your vehicle and can damage tires, wheel bearings, and axle.",
              "If carrying a boat, don’t carry cargo in the boat unless the trailer is designed/equipped for the extra weight."
            ]
          },
          {
            "title": "Balance and hitch weight",
            "points": [
              "Generally, more load should be in front of the trailer axle than behind for proper hitch weight.",
              "About 5% to 10% of the trailer’s total weight should be supported on the hitch (within the hitch’s marked limit).",
              "Poor balance can cause sway/fishtailing and may lead to hitch separation (especially if rear-heavy).",
              "Heavy or poorly placed loads can pull down the rear of the towing vehicle, lift the front end, and reduce steering control—especially on wet/slippery roads.",
              "Rear sag can also mis-aim headlights (low beams may blind oncoming drivers) and affect mirror alignment."
            ]
          }
        ]
      },
      {
        "name": "Starting out and pre-trip checks",
        "description": "Check key systems before each trip and drive gently at the start.",
        "keywords": [
          "pre-trip checks",
          "hitch",
          "wheels",
          "tires",
          "lights",
          "load distribution",
          "load security",
          "tire pressure cold",
          "accelerate carefully"
        ],
        "topics": [
          {
            "title": "Before each trip",
            "points": [
              "Check the trailer hitch, wheels, tires, lights, load distribution, and load security.",
              "Check tire pressure with the trailer loaded while tires are still cold."
            ]
          },
          {
            "title": "Getting moving",
            "points": [
              "Accelerate carefully.",
              "Drive slowly and carefully."
            ]
          }
        ]
      },
      {
        "name": "Turning and curves",
        "description": "Trailer tracking changes your turning path; position and timing matter.",
        "keywords": ["curves", "turning", "stay centered", "right turn", "left turn", "mirror check", "signal", "swing wide"],
        "topics": [
          {
            "title": "Curves",
            "points": [
              "Stay close to the middle of your lane when taking a curve."
            ]
          },
          {
            "title": "Right turns with a trailer",
            "points": [
              "Check traffic, look in your right mirror, signal, and slow down.",
              "If the turn is sharp, move forward until your front wheels are well ahead of the curb before turning right."
            ]
          },
          {
            "title": "Left turns with a trailer",
            "points": [
              "Check traffic, signal, and proceed slowly.",
              "Swing wide by driving well into the intersection before turning left."
            ]
          }
        ]
      },
      {
        "name": "Slowing down and stopping",
        "description": "Stopping takes longer and sudden stops can jackknife the trailer or shift cargo—plan extra space.",
        "keywords": ["stopping distance", "sudden stop", "jackknife", "slide sideways", "load shift", "increase following distance", "smooth stops", "avoid fast lanes"],
        "topics": [
          {
            "title": "Smooth stopping strategy",
            "points": [
              "A sudden stop can cause the trailer to jackknife or slide sideways, or cause the load to shift.",
              "Increase following distance to avoid sudden stops.",
              "Keep out of fast lanes and maintain a speed that allows smooth slowing and stopping."
            ]
          }
        ]
      },
      {
        "name": "Passing and being passed",
        "description": "You need more time and room to pass; large vehicles passing you can create wind that pushes the trailer—don’t brake hard.",
        "keywords": ["passing", "longer vehicle length", "more room", "don’t cut back", "trailer sway", "being passed", "air disturbance", "wind", "don’t brake", "slight speed increase"],
        "topics": [
          {
            "title": "Passing other vehicles",
            "points": [
              "You can’t accelerate as quickly while towing.",
              "Because you’re longer, you need more space and time to complete a pass safely.",
              "After passing, leave extra room before moving back into your lane.",
              "Don’t cut back too soon—this can cause trailer sway and make control difficult."
            ]
          },
          {
            "title": "If you are being passed",
            "points": [
              "If you’re holding up traffic, signal, pull over, and let vehicles pass.",
              "Fast-moving trucks/buses can create a strong air disturbance that may whip your trailer to the side.",
              "If this happens, do not brake; carefully steer the vehicle/trailer back into position.",
              "A slight increase in speed may help regain stability."
            ]
          }
        ]
      },
      {
        "name": "Backing up with a trailer",
        "description": "Back slowly and use small corrections; steering inputs reverse trailer direction. Practise off-road first.",
        "keywords": ["backing up", "very slowly", "spotter", "small turns", "practise", "parking lot", "back to the right steer left", "back to the left steer right"],
        "topics": [
          {
            "title": "How to back up safely",
            "points": [
              "Back up very slowly.",
              "Have someone outside direct you when possible.",
              "Use a series of small turns to steer.",
              "Practise off-road in an empty parking lot until comfortable."
            ]
          },
          {
            "title": "Steering rule (trailer response)",
            "points": [
              "To back up to the right: steer left (front of trailer goes left; rear goes right).",
              "To back up to the left: steer right (front of trailer goes right; rear goes left)."
            ]
          }
        ]
      },
      {
        "name": "Towing disabled vehicles",
        "description": "Tow trucks are safest; if you must tow with another vehicle, secure the connection, use warning signals, and avoid towing vehicles that need power steering/brakes when the engine can’t run.",
        "keywords": [
          "towing disabled vehicles",
          "tow truck",
          "warning signals",
          "emergency flashers",
          "secure attachment",
          "tow cable tight",
          "power brakes",
          "power steering",
          "dangerous to push start"
        ],
        "topics": [
          {
            "title": "Safer approach",
            "points": [
              "Use a tow truck designed to tow vehicles whenever possible."
            ]
          },
          {
            "title": "If using another vehicle to tow",
            "points": [
              "Use warning signals or emergency flashers.",
              "Attach vehicles securely.",
              "Someone must sit in the disabled vehicle and use the brakes to keep the tow cable tight."
            ]
          },
          {
            "title": "Important cautions",
            "points": [
              "If the disabled vehicle’s engine cannot run, don’t tow vehicles with power braking and steering—without the engine, braking and steering are difficult and towing can lead to a collision.",
              "Trying to start a disabled vehicle by towing is dangerous and could damage both vehicles."
            ]
          }
        ]
      }
    ]
  },

  {
    "title": "Test yourself: Sample knowledge test questions",
    "description": "A small set of multiple-choice sample questions (with an answer key) that show the format and style of Ontario’s driver knowledge test.",
    "icon": "clipboard-check",
    "sections": [
      {
        "name": "How the knowledge test questions are formatted",
        "description": "All knowledge-test questions use a multiple-choice format; sample answers are provided.",
        "keywords": [
          "knowledge test",
          "multiple-choice",
          "sample questions",
          "answer key",
          "test format"
        ],
        "topics": [
          {
            "title": "What to expect",
            "points": [
              "The sample questions demonstrate the multiple-choice format used on the knowledge test.",
              "An answer key is provided for self-checking."
            ]
          }
        ]
      },
      {
        "name": "Sample questions (practice set)",
        "description": "Practice questions spanning skids, licence rules, right-of-way, lane changing, passing, U-turn decisions, night driving, and safe speed.",
        "keywords": [
          "skid recovery",
          "lend licence",
          "right-of-way",
          "private road",
          "driveway",
          "lane change",
          "signals",
          "overtake and pass",
          "U-turn",
          "night driving",
          "safe speed",
          "stopping distance"
        ],
        "topics": [
          {
            "title": "Questions 1–8",
            "points": [
              "Skids: What should you do first to recover from a skid?",
              "Driver’s licence: When (if ever) may you lend your driver’s licence?",
              "Entering a highway: What must you do before entering from a private road or driveway?",
              "Lane changes: What must you never do before changing lanes in traffic?",
              "Being passed: What must you do when another vehicle is about to overtake and pass?",
              "U-turn decision: What is your first consideration before making a U-turn?",
              "Night driving: Why is driving at the maximum speed limit more dangerous at night?",
              "Speed choice: What condition should your speed always allow you to do?"
            ]
          }
        ]
      },
      {
        "name": "Answer key (for self-checking)",
        "description": "Quick key to verify your choices after attempting the sample questions.",
        "keywords": ["answer key", "self-check", "practice"],
        "topics": [
          {
            "title": "Correct answers",
            "points": [
              "1-c",
              "2-c",
              "3-b",
              "4-b",
              "5-d",
              "6-a",
              "7-b",
              "8-d"
            ]
          }
        ]
      }
    ]
  },

  {
    "title": "The Level Two Road Test (G2)",
    "description": "A guide to the Level Two (G2) road test: what it evaluates, expressway experience requirements, what’s currently excluded from the G road test, and the driving tasks/examiner expectations across turns, intersections, freeway driving, lane changes, roadside stops, curves, and typical road environments.",
    "icon": "road",
    "sections": [
      {
        "name": "Why graduated licensing exists",
        "description": "New drivers are at higher collision risk; Ontario uses graduated licensing to build skills gradually with two road tests over at least 20 months.",
        "keywords": [
          "graduated licensing",
          "1994",
          "two-step system",
          "20 months",
          "two road tests",
          "new drivers",
          "collision risk",
          "G2",
          "Class G privileges"
        ],
        "topics": [
          {
            "title": "Key idea",
            "points": [
              "Graduated licensing helps drivers gain experience in lower-risk environments before full privileges.",
              "Passing the Level Two (G2) road test gives you full Class G driving privileges.",
              "Level One focuses on basic skills; Level Two focuses on advanced skills gained with experience."
            ]
          }
        ]
      },
      {
        "name": "Expressway driving requirement (Declaration of Highway Driving Experience)",
        "description": "The G2 test includes expressway driving; you must declare recent experience or the test can be cancelled as ‘out-of-order’ with a fee loss.",
        "keywords": [
          "expressway component",
          "Declaration of Highway Driving Experience",
          "three months",
          "freeway",
          "80 km/h or more",
          "out-of-order",
          "cancelled",
          "lose 50 percent fee",
          "reschedule"
        ],
        "topics": [
          {
            "title": "What you must declare",
            "points": [
              "You must complete and sign a Declaration of Highway Driving Experience to proceed with the expressway component.",
              "You indicate how many times in the last three months you drove on a freeway and/or a highway with a speed limit of at least 80 km/h.",
              "You indicate average trip length (e.g., under 5 km, 5–15 km, over 15 km)."
            ]
          },
          {
            "title": "If you don’t have enough experience",
            "points": [
              "If you lack sufficient highway driving experience, the examiner must declare the road test “out-of-order” and cancel it.",
              "You lose 50% of your prepaid road-test fee; to reschedule, you must pay the lost 50% again.",
              "Get the required highway experience before rescheduling."
            ]
          }
        ]
      },
      {
        "name": "What’s currently excluded from the G road test (notice)",
        "description": "Some elements covered in the G2 test are not included in the G test until further notice; core fundamentals still apply.",
        "keywords": [
          "until further notice",
          "G road test",
          "parallel parking",
          "roadside stops",
          "3-point turn",
          "residential neighbourhoods",
          "fundamental elements",
          "major roads",
          "expressways",
          "merging",
          "signalling",
          "lane changes",
          "intersections",
          "business areas"
        ],
        "topics": [
          {
            "title": "Not included (already in G2)",
            "points": [
              "Parallel parking.",
              "Roadside stops.",
              "3-point turn.",
              "Driving in residential neighbourhoods."
            ]
          },
          {
            "title": "Still included (fundamentals)",
            "points": [
              "Driving on major roads and expressways including merging on/off, maintaining appropriate speed and space, signalling, and more.",
              "Turns, curves, and lane changes.",
              "Intersections.",
              "Driving in business areas."
            ]
          }
        ]
      },
      {
        "name": "How examiners evaluate you",
        "description": "The examiner gives directions and checks whether you perform the required actions for each task.",
        "keywords": ["examiner directions", "driving tasks", "actions", "evaluation", "guide only"],
        "topics": [
          {
            "title": "General test approach",
            "points": [
              "The examiner will give directions during the test.",
              "They watch whether you successfully perform the actions associated with each driving task.",
              "This chapter is a guide; review earlier chapters for details on the skills."
            ]
          }
        ]
      },
      {
        "name": "Driving tasks: Left and right turns",
        "description": "What the examiner expects when approaching, stopping (if needed), making the turn, and completing the turn.",
        "keywords": [
          "left turn",
          "right turn",
          "approach",
          "traffic check",
          "lane",
          "signal",
          "speed",
          "space",
          "stop line",
          "crosswalk",
          "wheels straight",
          "both hands",
          "gears",
          "wide or short",
          "corresponding lane"
        ],
        "topics": [
          {
            "title": "Approach (before the intersection)",
            "points": [
              "Traffic check: look all around; check mirrors; check blind spot if changing lanes.",
              "Lane: move into the far left or far right lane when clear.",
              "Signal: signal before slowing unless vehicles are waiting at entrances between you and the intersection (signal after passing them).",
              "Speed: reduce steadily; manual transmission may downshift; do not coast with foot on clutch.",
              "Space: keep at least a two- to three-second distance behind the vehicle ahead."
            ]
          },
          {
            "title": "If you must stop",
            "points": [
              "Come to a complete stop; do not roll; if you stop past the stop line, do not back up.",
              "Leave enough space behind a vehicle ahead so you can pull around without backing up.",
              "Stop position: stop behind stop line; if none, stop at crosswalk; if none, edge of sidewalk; if none, edge of intersection.",
              "Wheel position: when waiting to turn left, keep wheels straight; when waiting to turn right, keep wheels straight if there’s risk of being pushed into pedestrians."
            ]
          },
          {
            "title": "Making the turn",
            "points": [
              "Traffic check: keep checking; just before entering, look left–ahead–right; make eye contact if right-of-way is unclear; check blind spot if someone could overtake you while turning.",
              "Use both hands on the wheel during the turn (unless disability prevents).",
              "Manual transmission: avoid shifting gears during the turn (exceptions noted for very wide intersections).",
              "Move within 4–5 seconds after it’s safe; turn at a steady speed; increase speed as you complete the turn without slowing others.",
              "Turn into the corresponding lane without crossing lane markings or hitting curbs."
            ]
          },
          {
            "title": "Completing the turn",
            "points": [
              "Finish in the lane that corresponds to your starting lane.",
              "After a left turn onto a multi-lane road, build speed then move to the curb lane when safe.",
              "Check mirrors as you return to normal speed.",
              "Accelerate smoothly to blend with traffic; manual transmission shifts as needed."
            ]
          }
        ]
      },
      {
        "name": "Driving tasks: Stop intersection",
        "description": "What to do when you must stop (stop sign or red light): approach, full stop, waiting, and proceeding through.",
        "keywords": [
          "stop intersection",
          "approach",
          "mirrors",
          "reduce speed",
          "complete stop",
          "no rolling",
          "space",
          "stop line",
          "crosswalk",
          "edge of sidewalk",
          "edge of intersection",
          "both hands",
          "no shifting in intersection"
        ],
        "topics": [
          {
            "title": "Approach",
            "points": [
              "Traffic check: check mirrors before slowing.",
              "Speed: reduce steadily; manual may downshift; do not coast with foot on clutch.",
              "Space: keep at least a two- to three-second gap behind the vehicle ahead."
            ]
          },
          {
            "title": "The stop",
            "points": [
              "Stop completely; do not roll forward/backward; if you stop past the stop line, do not back up.",
              "Leave enough space behind the vehicle ahead so you can pull out and pass without backing up.",
              "Stop position: behind stop line; if none, at crosswalk; if none, edge of sidewalk; if none, edge of intersection."
            ]
          },
          {
            "title": "Driving through",
            "points": [
              "Keep checking traffic while waiting; just before entering, look left–ahead–right; try eye contact if right-of-way is unclear.",
              "Keep both hands on the wheel while crossing.",
              "Manual: avoid shifting while crossing (limited exceptions).",
              "Move ahead within 4–5 seconds when safe; accelerate smoothly back to normal speed; check mirrors after crossing."
            ]
          }
        ]
      },
      {
        "name": "Driving tasks: Through intersection (may not need to stop)",
        "description": "How to approach and cross an intersection safely when you may proceed without stopping.",
        "keywords": [
          "through intersection",
          "look left and right",
          "hold foot over brake",
          "pedestrians",
          "edging vehicles",
          "no lane change in intersection"
        ],
        "topics": [
          {
            "title": "Approach and crossing",
            "points": [
              "Approach: look left and right for intersecting traffic; if you slow, check mirrors for traffic behind.",
              "Maintain speed unless there’s risk traffic may cross in front—then slow or cover the brake.",
              "Watch for pedestrians about to cross and vehicles edging in or approaching fast.",
              "Keep a two- to three-second following distance.",
              "Do not cross lane markings or change lanes in the intersection; if your lane is blocked, slow/stop instead of pulling out around."
            ]
          }
        ]
      },
      {
        "name": "Driving tasks: Freeway (entering, driving along, exiting)",
        "description": "What the examiner expects for merging, maintaining speed/space, scanning, and exiting safely.",
        "keywords": [
          "freeway",
          "entrance ramp",
          "acceleration lane",
          "merge",
          "blind spot",
          "signal",
          "match speed",
          "mirrors every 5 to 10 seconds",
          "12 to 15 seconds ahead",
          "exit lane",
          "do not slow before exit lane"
        ],
        "topics": [
          {
            "title": "Entering (ramp to merge)",
            "points": [
              "Traffic check: as soon as you can see freeway traffic, check mirrors and blind spot for a space; watch vehicles ahead on ramp; keep scanning until you can merge.",
              "Signal: turn on signal as soon as freeway traffic can see you on the ramp.",
              "Space: keep a 2–3 second gap on ramp/merge; avoid moving beside another vehicle or into someone’s blind spot; stay within lane markings.",
              "Speed: on ramp curve, keep speed low enough to avoid pushing occupants/objects; in acceleration lane, increase speed to match freeway traffic; blend smoothly.",
              "Merge: merge gradually into the centre of the nearest freeway lane; cancel signal after merging."
            ]
          },
          {
            "title": "Driving along (not merging/changing lanes/exiting)",
            "points": [
              "Traffic check: keep checking around you; look in mirrors every 5–10 seconds.",
              "Speed: avoid speeding or driving unreasonably slow; drive steady when possible; look 12–15 seconds ahead for hazards you can manage with speed changes.",
              "Space: keep at least a 2–3 second following distance; if tailgated, increase space ahead or change lanes; try to keep space on both sides; avoid driving in others’ blind spots; avoid staying behind large vehicles that block your view."
            ]
          },
          {
            "title": "Exiting (from right lane to end of exit ramp)",
            "points": [
              "Traffic check: before moving into exit lane, look left/right and check mirrors; check right blind spot if there’s a lane to your right (e.g., acceleration lane or paved shoulder).",
              "Signal before reaching the exit lane.",
              "Enter the exit lane early with a smooth, gradual movement; stay within lane markings; do not cross solid lines to change lanes.",
              "Do not slow before you are completely in the exit lane; then slow gradually to avoid piling traffic up behind you.",
              "On exit-ramp curves, slow enough to avoid pushing occupants/objects; manual may downshift while slowing.",
              "Keep 2–3 seconds behind the vehicle ahead; cancel signal once on the exit ramp."
            ]
          }
        ]
      },
      {
        "name": "Driving tasks: Lane change",
        "description": "Finding space, signalling, blind-spot checks, matching speed, and moving smoothly into the new lane.",
        "keywords": ["lane change", "mirrors", "blind spot", "signal timing", "match speed", "smooth movement", "centre of lane", "both hands"],
        "topics": [
          {
            "title": "Lane-change steps",
            "points": [
              "Traffic check: look all around; watch ahead, mirrors, and blind spot; also check traffic in any adjacent lane to avoid simultaneous lane-change conflicts.",
              "Signal when there is enough space (or earlier if traffic is heavy to indicate intent); check blind spot again just before moving.",
              "Maintain 2–3 seconds behind the vehicle ahead; avoid moving beside another vehicle or into its blind spot.",
              "Adjust speed to match traffic in the new lane.",
              "Move smoothly and gradually into the centre of the new lane.",
              "Keep both hands on the wheel; cancel signal after completing the lane change."
            ]
          }
        ]
      },
      {
        "name": "Driving tasks: Roadside stop",
        "description": "How to choose a safe/legal stopping spot, pull over, secure the vehicle, and re-enter traffic safely.",
        "keywords": [
          "roadside stop",
          "legal to stop",
          "150-metre gap",
          "right blind spot",
          "parallel to curb",
          "30 centimetres",
          "hazard lights",
          "parking brake",
          "hill parking",
          "resume",
          "left signal"
        ],
        "topics": [
          {
            "title": "Approach and stopping",
            "points": [
              "Traffic check: check mirrors and scan for signs to confirm it’s legal to stop; scan traffic front/rear; a ~150 m gap in both directions provides enough space.",
              "If traffic/pedestrians might overtake on your right, check right blind spot just before pulling over.",
              "Signal before slowing (unless passing entrances where signalling could confuse others).",
              "Reduce speed steadily; manual may downshift; don’t coast on the clutch.",
              "Stop parallel to the curb and within about 30 cm; if no curb, stop as far off the travelled road as possible; don’t block entrances or traffic."
            ]
          },
          {
            "title": "While stopped",
            "points": [
              "Turn off your signal and turn on hazard lights.",
              "Automatic: shift to park and set parking brake.",
              "Manual: set parking brake; shift to neutral if not turning off engine, or shift to low/reverse if turning off engine.",
              "On a hill, set wheels against the curb in the correct direction to prevent rolling."
            ]
          },
          {
            "title": "Resuming from the stop",
            "points": [
              "Start engine, release parking brake, select correct gear.",
              "Turn off hazards and turn on left signal.",
              "Check mirrors and left blind spot just before pulling away.",
              "Accelerate smoothly back to normal speed (may need faster acceleration in heavier traffic); cancel signal once back on the road."
            ]
          }
        ]
      },
      {
        "name": "Driving tasks: Curve",
        "description": "Selecting a safe speed, avoiding braking in the curve, maintaining lane-centre, and smooth acceleration out of the curve.",
        "keywords": [
          "curve",
          "safe speed",
          "advisory sign",
          "slow down before curve",
          "30 metres into curve",
          "blind curve",
          "steady speed",
          "no shifting in curve"
        ],
        "topics": [
          {
            "title": "Curve handling",
            "points": [
              "Determine a safe speed using clues (posted safe-speed sign, curve shape, road type).",
              "Slow to the safe speed by about 30 metres into the curve.",
              "In blind curves, drive more slowly in case oncoming traffic crosses centre line or the curve tightens unexpectedly.",
              "Slow down before the curve to avoid braking in it.",
              "Maintain steady speed through the curve; near the end, begin accelerating back to normal speed.",
              "Manual: do not shift gears in the curve; it increases control and reduces wheel-lock risk while downshifting.",
              "Look across/as far around the curve as possible to stay centred and reduce wandering within the lane."
            ]
          }
        ]
      },
      {
        "name": "Driving tasks: Business section",
        "description": "Driving through areas with many entrances and crossing points: frequent scanning, steady speed, safe lane choice, and spacing.",
        "keywords": [
          "business area",
          "entrances",
          "institutions",
          "construction sites",
          "pedestrian crossings",
          "railway crossings",
          "mirror check 5 to 10 seconds",
          "curb lane",
          "centre lane",
          "12 to 15 seconds ahead"
        ],
        "topics": [
          {
            "title": "What examiners look for",
            "points": [
              "Traffic check left/right at entrances and crossings where vehicles/pedestrians may enter.",
              "Mirror check every 5–10 seconds (more in heavy/mixed-speed traffic).",
              "Lane choice: usually curb lane, but use centre lane if curb lane is blocked or has many curbside hazards; keep centred in lane markings.",
              "Speed: avoid speeding or going unreasonably slow; keep steady when possible; look 12–15 seconds ahead for hazards you can manage by speed or lane changes.",
              "Space: maintain 2–3 seconds behind; increase if tailgated; try to keep space on both sides; avoid blind spots; avoid sitting behind large vehicles that block your view; stop with enough space to see rear wheels of the vehicle ahead or pull around without backing."
            ]
          }
        ]
      },
      {
        "name": "Driving tasks: Residential / rural section",
        "description": "Driving on straights in residential or rural areas: scanning for entrances and crossings, lane-centre discipline, and planning for limited sight distance.",
        "keywords": [
          "residential road",
          "rural road",
          "schools",
          "driveways",
          "sidewalks",
          "farms",
          "industrial sites",
          "no lane markings",
          "move right on hills/curves",
          "mirror check 5 to 10 seconds",
          "12 to 15 seconds ahead"
        ],
        "topics": [
          {
            "title": "What examiners look for",
            "points": [
              "Traffic check left/right at likely entry points (schools, crossings, driveways, sidewalks; or farms/business/industrial entrances in rural areas).",
              "Mirror check every 5–10 seconds (more in heavy/mixed-speed traffic).",
              "Lane: keep centred; if no lane markings, keep to centre of travelled road away from parked cars/pedestrians; move right when visibility is limited by curves/hills to avoid oncoming vehicles over centre.",
              "Speed: avoid speeding or going unreasonably slow; keep steady when possible; look 12–15 seconds ahead for hazards.",
              "Space: keep 2–3 seconds behind; increase if tailgated; avoid large vehicles blocking your view; stop with enough space to see rear wheels of the vehicle ahead or pull around without backing."
            ]
          }
        ]
      },
      {
        "name": "Driving tasks: Parallel park",
        "description": "Positioning, checking, backing in smoothly without contact, securing the vehicle, and pulling out safely.",
        "keywords": [
          "parallel park",
          "60 centimetres",
          "check blind spot",
          "reverse toward curb",
          "do not hit curb",
          "do not touch another vehicle",
          "parking brake",
          "resume"
        ],
        "topics": [
          {
            "title": "Approach and setup",
            "points": [
              "Check mirror for traffic behind before slowing; check blind spot before pulling into position.",
              "Signal before slowing unless passing entrances that could confuse others.",
              "Stop beside/parallel to the vehicle in front of the empty space, leaving at least 60 cm between vehicles.",
              "Stop when your vehicle is completely in front of the empty parking space."
            ]
          },
          {
            "title": "Parking in the space",
            "points": [
              "Before reversing, look around and check mirrors and both blind spots; don’t reverse until the way is clear or traffic stops to let you park.",
              "Reverse into the space, steering toward the curb; when halfway in, steer to align with the curb.",
              "Adjust forward/backward to fit within markings and allow room for other vehicles to pull out.",
              "Do not hit the curb or touch another vehicle; if no curb, park off the travelled part of the road."
            ]
          },
          {
            "title": "Securing and resuming",
            "points": [
              "Automatic: park + parking brake. Manual: parking brake + neutral (if staying on) or low/reverse (if turning off); on hills, turn wheels appropriately.",
              "To leave: start engine, release parking brake, select gear, signal, check mirrors + blind spot, accelerate smoothly to blend, cancel signal after leaving."
            ]
          }
        ]
      },
      {
        "name": "Driving tasks: Three-point turn",
        "description": "Safely stopping, checking, turning across the road, reversing once, and driving away in the opposite direction.",
        "keywords": [
          "three-point turn",
          "turn around",
          "pull over",
          "30 centimetres from curb",
          "signal",
          "reverse once",
          "do not reverse into curb",
          "do not reverse over shoulder"
        ],
        "topics": [
          {
            "title": "Approach",
            "points": [
              "Check traffic front and behind; check blind spot if needed before pulling over to the right to stop.",
              "Signal before slowing unless passing entrances that could confuse others.",
              "Reduce speed steadily; manual may downshift; don’t coast on the clutch.",
              "Stop parallel to curb and within about 30 cm; if no curb, stop as far off travelled road as possible; don’t block entrances or traffic."
            ]
          },
          {
            "title": "Turn around (steps)",
            "points": [
              "Check mirrors and blind spot just before starting; wait until clear or traffic stops to let you turn.",
              "Each time you stop while turning, re-check traffic both directions.",
              "Signal left before starting to turn.",
              "With wheel sharply left, move slowly across the road; stop at far left side; shift to reverse.",
              "With wheel sharply right, reverse so vehicle faces new direction; stop and shift to forward.",
              "Use the whole road; reverse only once; do not reverse over the edge/shoulder or into the curb."
            ]
          },
          {
            "title": "Resume",
            "points": [
              "Check mirrors before increasing speed.",
              "Accelerate smoothly to blend with traffic; manual shifts as you speed up."
            ]
          }
        ]
      }
    ]
  },

  {
    "title": "Off-road vehicles and snowmobiles",
    "description": "Ontario rules and safety guidance for snowmobiles and off-road vehicles (ORVs): licensing/age requirements, registration and insurance, where you can/can’t operate, safe trip preparation, protective gear, impaired driving enforcement, trail/traffic signs, and ethical responsibilities.",
    "icon": "snowflake",
    "sections": [
      {
        "name": "Introduction: what this chapter covers",
        "description": "Off-road vehicles and snowmobiles are not toys; this section summarizes Ontario laws and safe-operation tips for recreation and transportation.",
        "keywords": [
          "off-road vehicles",
          "snowmobiles",
          "not toys",
          "recreation",
          "remote areas",
          "emergencies",
          "Ontario laws",
          "safety tips",
          "guide only"
        ],
        "topics": [
          {
            "title": "Core message",
            "points": [
              "Off-road vehicles are intended for off-road use (dirt bikes cannot be driven on public roads in Ontario).",
              "Snowmobiles can be operated on public roads only in specific circumstances and areas.",
              "This chapter is a guide; for official requirements refer to applicable legislation (HTA, Motorized Snow Vehicles Act, Off-road Vehicles Act, Trespass to Property Act, Occupiers’ Liability Act)."
            ]
          }
        ]
      },

      {
        "name": "Driving a snowmobile: Getting ready",
        "description": "Licensing, registration, insurance, helmet/eye protection, pre-ride inspection, towing rules, and trip preparedness.",
        "keywords": [
          "snowmobile",
          "MSVOL",
          "motorized snow-vehicle operator’s licence",
          "age requirements",
          "register snowmobile",
          "ServiceOntario",
          "validation sticker",
          "liability insurance",
          "helmet",
          "goggles",
          "pre-trip check",
          "buddy system",
          "ice safety"
        ],
        "topics": [
          {
            "title": "Licensing requirements",
            "points": [
              "You can drive a snowmobile with a valid Ontario driver’s licence (any class).",
              "If you do not have a driver’s licence and are 12+ years old, you can drive on trails with a valid Motorized Snow-Vehicle Operator’s Licence (MSVOL).",
              "To drive along or across a public road where snowmobiles are allowed, you must be 16+ and have either a driver’s licence or an MSVOL (not both).",
              "Visitors must have a valid licence from their home jurisdiction that allows them to drive a snowmobile.",
              "Carry your driver’s licence or MSVOL when driving anywhere other than your own property; show it to police/conservation officers on request.",
              "If your driver’s licence or MSVOL is suspended, you may not drive any type of vehicle on or off roads or in any public place."
            ]
          },
          {
            "title": "Registering and insuring your snowmobile",
            "points": [
              "Snowmobiles must be registered through a ServiceOntario centre (new/used, including those previously registered elsewhere).",
              "If you buy a new snowmobile, it must be registered within six days of sale (dealers typically register new sales).",
              "For a used previously registered snowmobile, you generally need the signed snow-vehicle permit and a bill of sale to transfer registration.",
              "You pay a one-time registration fee and receive a permit plus a registration number decal to display.",
              "Decal placement: attach to each side of the cowling/engine cover; start of the number should be 10–15 cm from the rear of the cowling (or on the tunnel near the reflector if cowling placement isn’t possible).",
              "Unless exempt (e.g., certain northern Ontario situations), you must have a validation sticker on your registration decal and renew it annually.",
              "Carry proof of registration and your licence/MSVOL at all times (except certain own-property situations).",
              "You must have liability insurance to drive off your own property and carry the insurance card.",
              "If someone uses your snowmobile with your consent, both of you can be responsible for penalties/damages/injuries."
            ]
          },
          {
            "title": "Protective gear (helmet + eye/face protection)",
            "points": [
              "Helmet required whenever you drive or ride on a snowmobile or on any toboggan/sled towed by a snowmobile (recommended even on your own land).",
              "Helmet must meet approved standards (motorcycle or motor-assisted bicycle) and be properly fastened under the chin.",
              "Wear a face shield or goggles to prevent windburn/frostbite/sunblindness and protect eyes from branches/twigs.",
              "Choose shield/goggle tint to match conditions (avoid dark tint that restricts vision)."
            ]
          },
          {
            "title": "Snowmobile pre-trip mechanical check",
            "points": [
              "Check steering (smooth/unrestricted).",
              "Check drive belt condition/tension; replace if needed or uncertain.",
              "Check emergency switch, headlight, and tail light.",
              "Check battery solution level.",
              "Check throttle and brake levers (move freely).",
              "Check spark plugs and fuel level (no matches/lighters; never add fuel with motor running)."
            ]
          },
          {
            "title": "Towing behind a snowmobile",
            "points": [
              "Use a rigid tow bar and a safety chain when towing a toboggan/sled/vehicle.",
              "Towed vehicles must have reflective material on front sides, rear sides, and rear for visibility.",
              "Towing is generally not allowed on public roads except crossing at a 90-degree angle (exceptions include freeing a stuck vehicle, emergency rescue, or trail maintenance)."
            ]
          },
          {
            "title": "Trip preparation (survival + route planning)",
            "points": [
              "Check local weather forecasts and local ice conditions; conditions can change quickly.",
              "Avoid travelling on unmarked frozen lakes and rivers.",
              "Tell someone your route and expected return time.",
              "Use the buddy system (don’t ride alone); ride within your abilities and conditions.",
              "Carry essentials: first-aid kit, repair kit, extra key, drive belt, spark plugs, rope.",
              "For longer trips: map/compass or GPS (and know how to use), flashlight, knife/hatchet, extra fuel, waterproof matches, high-energy food.",
              "If travelling over frozen water: consider a buoyant suit and carry ice picks."
            ]
          }
        ]
      },

      {
        "name": "Driving a snowmobile: Safe and responsible snowmobiling",
        "description": "Where you may drive, trail permits, trespassing rules, speed limits, stopping for police, collision reporting, impairment laws, and practical safe-riding tips.",
        "keywords": [
          "where you can drive",
          "public highways",
          "crossing at 90 degrees",
          "freeways prohibited",
          "trail permit",
          "OFSC",
          "trespass",
          "speed limits",
          "report collisions",
          "do not drink and drive",
          "warn range",
          "ADLS",
          "ice hazards"
        ],
        "topics": [
          {
            "title": "Where you can and cannot drive",
            "points": [
              "You may drive a registered snowmobile on your own property, on private trails of organizations you belong to, on private property with owner permission, or in permitted public parks/conservation areas.",
              "Snowmobiles are generally only permitted on public highways when directly crossing; in some circumstances they can operate on the non-serviced portion of some highways and municipalities may regulate via bylaws.",
              "You may not drive on certain high-speed roads/freeways including the QEW, Ottawa Queensway, and Kitchener-Waterloo Expressway (fence line to fence line).",
              "Do not drive on the serviced section of a road (shoulder to shoulder) except to cross; when crossing: slow down, stop, then cross at a 90-degree angle.",
              "Group crossings: don’t wave the rider behind you through; each rider decides when it’s safe (you may wave ‘clear’ only if visibility is restricted after you’ve assessed).",
              "Except where prohibited, you may drive along public roads in the area between shoulder and fence line (as far away from the road as possible), subject to municipal bylaws.",
              "You may not drive on railway tracks without permission from the railway authority."
            ]
          },
          {
            "title": "Public trails and permits",
            "points": [
              "Many public trails are established/maintained by snowmobile clubs and may require a trail permit.",
              "For trails operated by the Ontario Federation of Snowmobile Clubs (OFSC), a displayed trail permit is required (some user groups are exempt but must carry proof).",
              "Trails may be patrolled by OPP, municipal police, conservation officers, and Snowmobile Trail Officer Patrol officers."
            ]
          },
          {
            "title": "Trespassing rules",
            "points": [
              "Driving on private property without permission is trespassing; owners don’t need to post ‘No Trespassing’ signs.",
              "If asked by police/owner/owner’s representative, you must stop and identify yourself; if told to leave, do so immediately.",
              "You may be fined and ordered to pay damages; in some cases you may be required to pay prosecution costs.",
              "If the driver is unknown, the owner may be charged if the snowmobile was used with the owner’s permission.",
              "Trespassing on railway tracks is also an offence under the Railway Safety Act."
            ]
          },
          {
            "title": "Speed limits (snowmobiles)",
            "points": [
              "Maximum 20 km/h in any public park/exhibition ground, or on any road where the posted limit for other vehicles is 50 km/h or less.",
              "Maximum 50 km/h on snowmobile trails or on any road where the posted limit for other vehicles is more than 50 km/h.",
              "Leave extra space behind the snowmobile ahead; slow down at night and don’t outrun your headlights.",
              "Municipalities may set other snowmobile speed limits within their boundaries."
            ]
          },
          {
            "title": "Stop for police and report collisions",
            "points": [
              "You must stop safely when requested by police; failing to stop can lead to fines/jail.",
              "If convicted of failing to stop and the court believes you wilfully avoided police during pursuit, your licence is suspended at least five years (up to 10 years if someone is killed or injured).",
              "You must report immediately to police any collision causing injury or property damage apparently exceeding $400."
            ]
          },
          {
            "title": "Alcohol/drugs and enforcement (snowmobiles)",
            "points": [
              "It is illegal to drive a snowmobile impaired by alcohol or drugs.",
              "Police may require roadside alcohol screening or physical co-ordination tests; refusal can lead to Criminal Code charges.",
              "If suspected drug impairment (or alcohol+drug), police can require evaluations and blood/oral fluid/urine samples; refusal can lead to Criminal Code charges.",
              "You can receive an immediate 90-day administrative suspension for BAC over .08 or refusal/failure to comply with demands.",
              "Warn-range (.05–.08) results in immediate suspensions: 3 days (first), 7 days + remedial education (second in 5 years), 30 days + remedial treatment + ignition interlock condition (third/subsequent in 5 years).",
              "Drivers 21 and under with a full licence and all novice drivers must have zero BAC (24-hour roadside suspension; if convicted, fines and longer suspensions apply)."
            ]
          },
          {
            "title": "Practical safe snowmobiling tips",
            "points": [
              "Practise until you can handle basic skills; keep full control of reflexes.",
              "Use body position/weight shifting for turns; sit/kneel on level ground, stand on running boards with knees bent on bumpy terrain.",
              "Plan your route; share route with group; if stopping on trail, pull right and stop where visible; in a group, park single-file and keep vehicles running to be visible at night.",
              "On hard-packed snow/ice, reduce speed and allow greater stopping/turning distance.",
              "If stuck in deep snow, turn off the motor before trying to free the snowmobile.",
              "Ice travel is risky—watch for pressure cracks (harder to spot at night); ask locals about ice hazards and listen for OPP warnings; consider buoyant suit.",
              "Watch for trail/highway signs and obey them; stay right on trails; use caution on hills/curves; be cautious at road/rail crossings (snow clouds from trucks/trains can reduce visibility).",
              "Carry a cell phone when riding."
            ]
          }
        ]
      },

      {
        "name": "Snowmobile signals and signs",
        "description": "Hand signals for trail communication plus common trail and traffic signs related to snowmobiles.",
        "keywords": [
          "hand signals",
          "left turn",
          "right turn",
          "stop",
          "slowing",
          "oncoming snowmobiles",
          "snowmobiles following",
          "last snowmobile",
          "trail signs",
          "snowmobiles permitted",
          "snowmobiles restricted",
          "snowmobiles crossing"
        ],
        "topics": [
          {
            "title": "Hand signals (nationally recognized)",
            "points": [
              "Left turn: extend left arm straight out, point in direction of turn.",
              "Right turn: raise left arm to shoulder height with elbow bent.",
              "Stop: extend right arm straight up over head with palm flat.",
              "Slowing/caution: extend left arm out and down; flap up and down.",
              "Oncoming snowmobiles: raise left arm (elbow bent) and motion left-to-right over head, pointing to right side of trail.",
              "Snowmobiles following: raise left arm (elbow bent) and motion front-to-back over shoulder with thumb (like hitchhiker).",
              "Last snowmobile in line: raise left forearm to shoulder height with elbow bent; clench fist."
            ]
          },
          {
            "title": "Trail signs (examples)",
            "points": [
              "Stop sign: eight-sided red sign; come to a complete stop.",
              "Stop ahead: be prepared to stop for a stop sign ahead.",
              "Snowmobiling permitted: green circle means the activity is allowed.",
              "Snowmobiling restricted: red circle with slash means activity not allowed.",
              "Direction signs: indicate which direction to travel on the trail (may vary in shape/colour)."
            ]
          },
          {
            "title": "Traffic signs specific to snowmobiles (when along/across roads)",
            "points": [
              "Snowmobiles permitted: snowmobiles are allowed on the road/highway where posted.",
              "Snowmobiles restricted: snowmobiles are not allowed on the road/highway where posted.",
              "Snowmobiles crossing: warns motorists that snowmobiles are allowed to cross the road."
            ]
          }
        ]
      },

      {
        "name": "Wind-chill factor and cold-weather risk",
        "description": "Wind chill can dramatically increase frostbite/hypothermia risk; dress in layers and protect exposed skin.",
        "keywords": [
          "wind chill",
          "frostbite",
          "hypothermia",
          "layering",
          "waterproof outer layer",
          "balaclava",
          "danger thresholds",
          "-25",
          "-35",
          "-60"
        ],
        "topics": [
          {
            "title": "What wind chill means",
            "points": [
              "Wind chill is the combined effect of wind and low temperature; it can feel much colder than the actual temperature.",
              "Example given: -10°C with 40 km/h wind can feel like -31°C."
            ]
          },
          {
            "title": "Practical clothing guidance",
            "points": [
              "Use waterproof outer layers and multiple under-layers for protection and flexibility.",
              "Ensure young passengers are properly dressed with hands/face protected.",
              "Wearing a balaclava reduces exposure risk.",
              "Prolonged exposure can lead to hypothermia."
            ]
          },
          {
            "title": "Approximate thresholds (risk reminders)",
            "points": [
              "Wind chill at or below -25°C: frostbite risk with prolonged exposure.",
              "Wind chill at or below -35°C: frostbite possible in ~10 minutes for warm, suddenly exposed skin.",
              "Wind chill at or below -60°C: frostbite possible in under ~2 minutes for warm, suddenly exposed skin."
            ]
          }
        ]
      },

      {
        "name": "Snowmobile driver training and code of ethics",
        "description": "When training is required and a code of conduct to keep snowmobiling safe, respectful, and environmentally responsible.",
        "keywords": [
          "snowmobile driver training course",
          "12 to 15",
          "MSVOL",
          "OFSC",
          "code of ethics",
          "conservation",
          "respect property",
          "help others",
          "search and rescue",
          "obey rules",
          "wildlife"
        ],
        "topics": [
          {
            "title": "Training course (MSVOL requirement)",
            "points": [
              "If you are 12–15, or 16+ without an Ontario driver’s licence, you must pass a snowmobile driver-training course to get an operator’s licence (MSVOL).",
              "Course is about six hours (often over three days) and covers safe practices, laws, vehicle knowledge/maintenance, driving positions, survival, first aid, night driving, trail signs, clothing, storage, and courteous driving habits."
            ]
          },
          {
            "title": "Snowmobiler’s Code of Ethics (high-level points)",
            "points": [
              "Be a good sportsperson and conservationist; recognize that your actions reflect on all snowmobilers.",
              "Do not litter or pollute; carry out what you carry in.",
              "Do not damage trees/shrubs or natural features; respect property and rights.",
              "Help people in distress; assist in search-and-rescue when needed.",
              "Do not interfere with or harass other winter recreation users; respect shared facilities.",
              "Know and obey rules regulating snowmobiles where you ride.",
              "Do not harass wildlife; avoid protected areas.",
              "Do not drive where snowmobiles are prohibited."
            ]
          }
        ]
      },

      {
        "name": "Driving an off-road vehicle (ORV): overview and getting ready",
        "description": "What qualifies as an ORV, minimum age rules, registration/insurance requirements, helmet/gear, and pre-trip checks.",
        "keywords": [
          "off-road vehicle",
          "ORV",
          "ATV",
          "UTV",
          "side-by-side",
          "amphibious ATV",
          "off-road motorcycle",
          "age 12",
          "register",
          "licence plate",
          "vehicle permit",
          "liability insurance",
          "helmet",
          "goggles",
          "pre-trip checks"
        ],
        "topics": [
          {
            "title": "What counts as an off-road vehicle (examples)",
            "points": [
              "ORVs include two- or three-wheeled motorized vehicles and certain vehicles with four or more wheels intended for recreation.",
              "Examples: ATVs (including two-up), side-by-side ATVs, UTVs, amphibious ATVs, off-road motorcycles, dune buggies.",
              "Not ORVs (cannot be registered as ORVs): many electric/motorized scooters (‘go-peds’) and pocket bikes; they also do not meet motorcycle standards."
            ]
          },
          {
            "title": "Age requirements to drive",
            "points": [
              "You must be at least 12 years old to drive an ORV, except on land occupied by the owner or under the close supervision of an adult (close supervision recommended)."
            ]
          },
          {
            "title": "Registering and insuring an ORV",
            "points": [
              "ORVs must be registered at a ServiceOntario centre (new and used).",
              "You must be 16+ to register an ORV and must prove ownership.",
              "New ORV: obtain a certificate of sale from the dealer.",
              "Used ORV transfer: present the signed vehicle portion of the permit from the previous owner.",
              "Register within six days of becoming the owner.",
              "You receive a vehicle permit and a licence plate; carry the permit unless operating on land occupied by the owner.",
              "Plate mounting: 2- or 3-wheeled ORV plate goes on the front; 4+ wheels plate goes on the rear.",
              "Address changes must be reported within six days (ServiceOntario, mail, or online).",
              "If operating anywhere other than the owner’s property, you must have liability insurance and carry the insurance card.",
              "If someone else uses your ORV with your consent, both of you may be responsible for penalties/damages/injuries.",
              "Certain vehicles do not need ORV registration (e.g., road-building machines, farm vehicles, golf carts, motorized wheelchairs), and some rally/competition participants may be exempt for the event."
            ]
          },
          {
            "title": "Helmet and protective gear",
            "points": [
              "You must wear a motorcycle helmet (HTA standard) when driving or riding on an ORV or any vehicle towed by an ORV (exception: on property of the ORV owner).",
              "Helmet must meet approved standards and be fastened properly under the chin.",
              "Wear face shield/goggles; wear long sleeves/pants/gloves and boots covering ankles.",
              "Wear brightly coloured clothing to improve visibility."
            ]
          },
          {
            "title": "ORV pre-trip mechanical check",
            "points": [
              "Check brake control (moves freely; adjust if needed).",
              "Check throttle opens/closes smoothly in all steering positions.",
              "Check tires for condition and proper pressure.",
              "Check fuel lines/connections for leaks.",
              "Check that you have enough fuel and oil.",
              "Check engine runs smoothly; ensure vehicle is in neutral before starting.",
              "Check lights are working.",
              "Read the owner’s manual before driving."
            ]
          },
          {
            "title": "Trip preparation (ORV)",
            "points": [
              "Check local weather forecasts.",
              "Tell someone where you’re travelling and when you’ll be back.",
              "Use the buddy system; don’t drive alone.",
              "Carry first-aid, repair kit, extra key, drive belt, spark plugs, rope; for long trips add map/compass or GPS, flashlight, knife/hatchet, extra fuel, waterproof matches."
            ]
          }
        ]
      },

      {
        "name": "Safe and responsible off-road vehicle driving",
        "description": "Where ORVs may/can’t operate on public roads, ATV-specific shoulder rules, care and attention offences, collision reporting thresholds, impaired driving enforcement, passenger rules, and practical safety skills.",
        "keywords": [
          "public roads restrictions",
          "directly across road",
          "farming hunting trapping exception",
          "provincial parks",
          "emergency personnel",
          "ATV shoulder",
          "municipal bylaw",
          "G2 or M2",
          "careless driving",
          "report collisions",
          "$2000",
          "warn range",
          "90-day suspension",
          "no passengers",
          "water hazards",
          "dunes flag mast"
        ],
        "topics": [
          {
            "title": "Where you can and cannot drive (general ORV rule + exceptions)",
            "points": [
              "Generally, you may not drive an ORV on most public roads in Ontario (including medians, shoulders, and ditches between property lines).",
              "Exceptions include: directly crossing some public roads; certain 3+ wheel ORVs used for farming, licensed hunting, or trapping (with size/weight limits); operating in provincial/public parks if permitted; emergency personnel performing duties.",
              "If you drive an ORV on or across a public road, you must be at least 16 and have a valid Ontario driver’s licence (Class G2, M2, or higher).",
              "You must not operate an ORV in a way that disrupts/destroys the natural environment (e.g., fish habitats, property, plants, trees)."
            ]
          },
          {
            "title": "ATV-specific shoulder access (where permitted)",
            "points": [
              "ATVs are ORVs with four wheels (all on the ground), handlebar steering, and a straddle seat.",
              "Some provincial highways allow eligible single-rider ATVs on the shoulder if they meet weight/width and safety standards and are designed to carry only a driver.",
              "Travel in the same direction as traffic; if no shoulder/obstructed shoulder/railway level crossing, you may use the paved part—keep as far right as safely possible.",
              "Municipal roads require a municipal bylaw allowing ATV access; without a bylaw you cannot drive an ATV on that road.",
              "Speed limits when permitted: 20 km/h or less where posted is 50 km/h or less; 50 km/h or less where posted is over 50 km/h.",
              "ATVs are generally not permitted on controlled-access highways (e.g., many 400-series) but may be allowed on some other highway series as described in the handbook."
            ]
          },
          {
            "title": "Obey rules, stop when signalled, and report collisions",
            "points": [
              "You must stop if a police officer signals you; a landowner can also stop you on private property—if signalled by an authorized person, you must stop and identify yourself if asked.",
              "Careless driving applies to ORV operation (without care/attention or reasonable consideration).",
              "Dangerous driving and alcohol-related offences also apply to ORV drivers; HTA offences apply when operating on a public road.",
              "You must report immediately to police any collision on a public highway involving injury or property damage apparently exceeding $2,000."
            ]
          },
          {
            "title": "Alcohol/drugs and enforcement (ORVs)",
            "points": [
              "It is illegal to drive an ORV when impaired by alcohol or drugs.",
              "Police may conduct roadside screening and physical co-ordination tests; refusal can lead to Criminal Code charges.",
              "For suspected drug impairment (or alcohol+drug), police can require evaluation and bodily fluid samples; refusal can lead to Criminal Code charges.",
              "Immediate 90-day administrative suspension applies for BAC over .08 or refusal/failure to comply with demands.",
              "Warn-range (.05–.08) roadside suspensions escalate (3 days first; 7 days + education second in 5 years; 30 days + treatment + ignition interlock condition third/subsequent in 5 years).",
              "Zero BAC rules apply to drivers 21 and under with full licences and to all novice drivers (Level One/Two)."
            ]
          },
          {
            "title": "Passenger and skill safety guidance",
            "points": [
              "Do not carry passengers on an ORV designed for one person; it changes weight distribution and reduces your ability to shift position for control and stability.",
              "Practise in an open area free of obstacles until you’re skilled; choose uniform terrain (dirt/sand/snow) and avoid paved surfaces.",
              "Keep both feet on footrests; don’t put a foot down to stop a tip—you could run over your foot/leg.",
              "Be extremely careful in water: check depth first and proceed slowly; hidden rocks/holes can cause serious injury or drowning.",
              "Use a flag mast when driving in dunes/hills; be cautious around pedestrians, riders, sunbathers, bicyclists."
            ]
          }
        ]
      }
    ]
  },
];
