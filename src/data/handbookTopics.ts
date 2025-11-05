export interface HandbookSection {
  name: string;
  content: string;
  keywords: string[];
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
  sectionsDescription?: string;
}

export const handbookTopics: HandbookTopic[] = [
  {
    title: "Getting Your License",
    description: "Learn about the graduated licensing system and requirements",
    icon: "FileText",
    sectionsDescription: "Ontario uses a graduated licensing system with three levels: G1, G2, and full G license.",
    sections: [
      {
        name: "Graduated Licensing System (G1, G2, G)",
        keywords: ["license", "g1", "g2", "graduated", "requirements", "age", "test"],
        topics: [
          {
            title: "G1 License (Beginner)",
            points: [
              "Must be at least 16 years old",
              "Pass a written knowledge test covering road signs and rules",
              "Zero blood alcohol level - no drinking and driving at all",
              "Must be accompanied by a licensed driver with at least 4 years of experience",
              "Cannot drive on 400-series highways or high-speed expressways",
              "Cannot drive between midnight and 5 a.m.",
              "All passengers must wear seatbelts (limited by number of working seatbelts)",
              "Must hold G1 for at least 12 months (8 months if completed approved driver education course)",
            ],
          },
          {
            title: "G2 License (Intermediate)",
            points: [
              "Pass a road test demonstrating basic driving skills",
              "Zero blood alcohol level if under 21 years old",
              "Can drive alone without supervision",
              "Can drive on all roads including highways",
              "Passenger restrictions apply if under 20 years old and during first 6 months",
              "Must hold G2 for at least 12 months before taking full G test",
            ],
          },
          {
            title: "Full G License",
            points: [
              "Pass an advanced road test",
              "No restrictions",
              "Can drive any time, anywhere with full privileges",
            ],
          },
        ],
        content: `Ontario uses a graduated licensing system with three levels: G1, G2, and full G license.

**G1 License (Beginner):**
- Must be at least 16 years old
- Pass a written knowledge test covering road signs and rules
- Zero blood alcohol level - no drinking and driving at all
- Must be accompanied by a licensed driver with at least 4 years of experience
- Cannot drive on 400-series highways or high-speed expressways
- Cannot drive between midnight and 5 a.m.
- All passengers must wear seatbelts (limited by number of working seatbelts)
- Must hold G1 for at least 12 months (8 months if completed approved driver education course)

**G2 License (Intermediate):**
- Pass a road test demonstrating basic driving skills
- Zero blood alcohol level if under 21 years old
- Can drive alone without supervision
- Can drive on all roads including highways
- Passenger restrictions apply if under 20 years old and during first 6 months
- Must hold G2 for at least 12 months before taking full G test

**Full G License:**
- Pass an advanced road test
- No restrictions
- Can drive any time, anywhere with full privileges`,
      },
      {
        name: "Vision Requirements",
        keywords: ["vision", "eyesight", "test", "glasses", "contacts", "visual acuity"],
        content: `All drivers must meet minimum vision standards to drive safely in Ontario.

**Vision Standards:**
- Visual acuity of at least 20/50 with both eyes open (with corrective lenses if needed)
- Horizontal visual field of at least 120 degrees continuous
- Regular vision tests may be required as you age

**If You Wear Glasses or Contact Lenses:**
- Must wear them while driving if required to meet vision standards
- License will indicate if corrective lenses are required
- Always carry a spare pair in your vehicle

**Vision-Related Driving Tips:**
- Have your eyes checked regularly by an eye care professional
- Clean your windshield and mirrors regularly
- Adjust your driving if vision is affected by weather, sun glare, or darkness
- If you notice any changes in your vision, see an eye care professional immediately`,
      },
      {
        name: "Fees and Renewals",
        keywords: ["fee", "cost", "renewal", "expire", "price", "payment"],
        content: `Understanding licensing fees and renewal requirements.

**G1 Knowledge Test:**
- Written test fee applies
- Valid for 5 years from date of passing
- If G1 expires, must retake written test

**G2 Road Test:**
- Road test fee applies
- Can book test once minimum waiting period is met
- Failed tests require waiting period and rebooking fee

**License Renewal:**
- Driver's licenses expire on your birthday every 5 years
- Renewal notice sent by mail before expiration
- Can renew up to 12 months before expiry
- May require vision test at renewal
- Fees apply for renewal

**Important Notes:**
- Driving with an expired license is illegal
- Set reminders for renewal dates
- Update address with MTO within 6 days of moving
- Fees are subject to change - check ServiceOntario for current rates`,
      },
    ],
  },
  {
    title: "Road Signs & Signals",
    description: "Understanding traffic signs, signals, and road markings",
    icon: "AlertTriangle",
    sections: [
      {
        name: "Regulatory Signs",
        keywords: ["stop", "yield", "speed limit", "no entry", "regulatory", "must", "required"],
        content: `Regulatory signs tell you about traffic laws and regulations you must obey.

**Stop Signs:**
- Octagonal red sign with white letters
- Must come to a complete stop at the stop line or before the intersection
- Yield right-of-way to pedestrians and vehicles already in intersection
- Proceed only when safe

**Yield Signs:**
- Downward-pointing triangle with red border and white background
- Slow down and be prepared to stop
- Give right-of-way to traffic and pedestrians
- Proceed when safe without stopping if way is clear

**Speed Limit Signs:**
- White rectangular signs with black numbers
- Maximum speed allowed under ideal conditions
- Must reduce speed in poor weather, heavy traffic, or poor visibility
- Different limits may apply in school zones and construction zones

**No Entry / Do Not Enter:**
- Red circle with white horizontal bar
- Indicates road is one-way against you or entrance is prohibited
- Do not proceed - find alternate route

**One-Way Signs:**
- Rectangular with black arrow on white background
- All traffic must travel in direction shown
- Watch for these at intersections`,
      },
      {
        name: "Warning Signs",
        keywords: ["warning", "curve", "deer", "school zone", "construction", "caution", "ahead"],
        content: `Warning signs alert you to potential hazards or changes in road conditions ahead.

**Common Warning Signs:**

**Curve Ahead:**
- Yellow diamond with black curved arrow
- Reduce speed before entering curve
- Stay in your lane throughout the curve

**Steep Hill:**
- Yellow diamond with black downward arrow and percentage
- Use lower gear going downhill
- Watch for slow-moving vehicles going uphill

**School Zone:**
- Yellow with crossing figures
- Reduced speed limits during school hours
- Watch for children crossing
- Be extra cautious and prepared to stop

**Construction Zone:**
- Orange diamond shape
- Slow down and watch for workers, equipment, and changed traffic patterns
- Fines are doubled in construction zones
- Follow instructions from traffic control persons

**Animal Crossings:**
- Yellow diamond with animal silhouette (deer, moose, etc.)
- Common in rural areas
- More active at dawn and dusk
- Scan roadsides for animals

**Railway Crossing:**
- Large X with two Rs
- Slow down, look both ways
- Never stop on tracks
- Trains always have right-of-way`,
      },
      {
        name: "Information Signs",
        keywords: ["information", "direction", "hospital", "parking", "services", "guide"],
        content: `Information and guide signs provide helpful information about directions, services, and points of interest.

**Types of Information Signs:**

**Direction Signs:**
- Green rectangular signs
- Show route numbers, directions, and distances to cities
- Help plan your route and lane positioning

**Service Signs:**
- Blue rectangular signs
- Indicate nearby services: gas, food, lodging, hospitals
- Show distance to services

**Hospital Signs:**
- Blue with white H
- Show direction and distance to medical facilities
- Important for emergencies

**Parking Signs:**
- Various colors and formats
- Indicate parking rules, time limits, and restrictions
- May show times when parking is allowed or prohibited
- Green P typically indicates parking is available

**Tourist Information:**
- Blue signs with white symbols
- Show attractions, parks, and points of interest
- Help visitors navigate to destinations

**Exit Numbers:**
- Help identify specific highway exits
- Correspond to distance markers
- Important for navigation and meeting points`,
      },
      {
        name: "Traffic Lights",
        keywords: ["traffic light", "red", "yellow", "green", "signal", "intersection", "arrow"],
        content: `Understanding traffic signals is crucial for safe intersection navigation.

**Green Light:**
- Proceed through intersection when safe
- Yield to pedestrians and vehicles already in intersection
- Green arrow means protected turn - oncoming traffic stopped

**Yellow Light:**
- Light is about to turn red
- Stop if you can do so safely
- If you're too close to stop safely, proceed with caution
- Do not speed up to "beat" the red light

**Red Light:**
- Come to a complete stop at stop line or before entering intersection
- Remain stopped until light turns green
- Right turns on red are permitted after complete stop unless sign prohibits
- Must yield to pedestrians and cross traffic

**Flashing Red:**
- Treat as a stop sign
- Stop completely, yield right-of-way, proceed when safe

**Flashing Yellow:**
- Proceed with caution
- Slow down and watch for hazards

**Advance Green Arrow (Flashing):**
- Also called protected left turn
- Oncoming traffic facing red light
- Complete turn before light changes
- Yield to pedestrians

**Transit Signals:**
- White vertical bar for go, horizontal bar for stop
- Apply only to public transit vehicles
- Other vehicles follow regular traffic signals`,
      },
      {
        name: "Pavement Markings",
        keywords: ["lines", "yellow line", "white line", "crosswalk", "markings", "lane", "solid", "broken"],
        content: `Pavement markings guide traffic and indicate where you can and cannot drive.

**Yellow Lines:**
- Separate traffic traveling in opposite directions
- Solid yellow line: no passing allowed on your side
- Broken yellow line: passing permitted when safe
- Double solid yellow lines: passing prohibited both directions
- Solid and broken yellow: only broken side may pass

**White Lines:**
- Separate traffic traveling in same direction
- Solid white line: lane changes discouraged
- Broken white line: lane changes permitted when safe
- Double white lines: lane changes prohibited

**Edge Lines:**
- White line at right edge of road
- Yellow line at left edge on divided highways
- Help guide you, especially at night and in poor weather

**Stop Lines:**
- Solid white line across lane before intersection
- Stop before this line at stop signs and red lights
- If no stop line, stop before entering crosswalk

**Crosswalks:**
- Marked with white lines (parallel lines or zebra stripes)
- Yield to pedestrians in crosswalks
- Some crosswalks are unmarked at intersections

**HOV Lane Markings:**
- Diamond symbol painted in lane
- Reserved for High Occupancy Vehicles (usually 2+ people)
- Check signs for specific requirements and hours

**Arrows:**
- Show required or permitted direction of travel in lane
- Must follow arrow direction when in that lane`,
      },
    ],
  },
  {
    title: "Rules of the Road",
    description: "Traffic laws, right-of-way, and safe driving practices",
    icon: "Car",
    sections: [
      {
        name: "Speed Limits",
        keywords: ["speed", "limit", "maximum", "minimum", "kmh", "fast", "slow"],
        content: `Speed limits are the maximum legal speeds under ideal conditions. Adjust speed for conditions.

**Default Speed Limits in Ontario:**
- 50 km/h in cities, towns, and villages
- 80 km/h on rural roads (outside built-up areas)
- 100 km/h on most provincial highways
- Posted speed limits override these defaults

**Special Speed Zones:**
- School zones: 40 km/h when children are present (watch for signs)
- Construction zones: Reduced limits posted, fines doubled
- Community safety zones: Fines doubled or tripled

**Speed Limit Principles:**
- Posted limits are maximums under ideal conditions
- Must reduce speed in: rain, snow, fog, heavy traffic, poor road conditions
- Drive at speed comfortable for conditions
- Driving too slowly can also be dangerous - maintain reasonable speed with traffic flow

**Penalties for Speeding:**
- Fines increase with speed over limit
- Demerit points added to license
- Insurance rates may increase
- Severe speeding (50+ km/h over) can result in license suspension and vehicle impoundment
- Stunt driving charges for excessive speed

**Safe Speed Guidelines:**
- Follow the 2-second rule (3-4 seconds in poor conditions)
- Watch speedometer regularly
- Be aware of sudden changes in speed limits
- Slow down before curves, not during`,
      },
      {
        name: "Right-of-Way Rules",
        keywords: ["right of way", "yield", "intersection", "priority", "who goes first"],
        content: `Right-of-way rules determine who has priority at intersections and other situations.

**At Intersections:**
- Vehicle on the right has right-of-way when two vehicles arrive at same time
- If you're turning left, yield to oncoming traffic and pedestrians
- If you're turning right, yield to pedestrians crossing
- Yield to traffic already in intersection or roundabout

**At Stop Signs:**
- Four-way stop: First vehicle to stop has right-of-way
- If arriving simultaneously, vehicle on right goes first
- If opposite each other, vehicle going straight or turning right has right-of-way over left-turning vehicle

**At Yield Signs:**
- Slow down or stop to give right-of-way to cross traffic and pedestrians
- Merge smoothly into traffic when safe

**Pedestrians:**
- Always yield to pedestrians in crosswalks (marked or unmarked)
- Yield to pedestrians when turning at intersections
- Pedestrians with white canes or guide dogs always have right-of-way
- Stop for school crossing guards

**Emergency Vehicles:**
- Pull to right and stop for vehicles with flashing lights and sirens
- Don't move until emergency vehicle has passed
- Yield at intersections even if you have green light
- Never follow closer than 150 meters

**School Buses:**
- Stop when red lights flashing (both directions on undivided road)
- Stop at least 20 meters away
- Don't proceed until lights stop flashing
- Failure to stop results in heavy fines and license suspension

**Funeral Processions:**
- Yield right-of-way to funeral processions
- Don't cut between vehicles in procession`,
      },
      {
        name: "Passing and Lane Use",
        keywords: ["passing", "overtaking", "lane", "left lane", "passing zone", "no passing"],
        content: `Rules for safe and legal passing maneuvers and proper lane usage.

**When Passing is Allowed:**
- Broken yellow center line on your side
- Sufficient clear distance ahead
- Not on curves, hills, or where vision is obstructed
- Not at intersections, railway crossings, or bridge approaches
- Not in school zones or playground zones when children present
- Not where signs prohibit passing

**How to Pass Safely:**
1. Check mirrors and blind spots
2. Signal your intention
3. Check again before moving into passing lane
4. Accelerate smoothly and pass quickly
5. Maintain safe distance from vehicle being passed
6. Signal before returning to lane
7. Return only when you can see passed vehicle in rearview mirror

**Never Pass:**
- Where solid yellow line on your side
- Where "Do Not Pass" sign posted
- On curves or hilltops with limited visibility
- Within 30 meters of pedestrian crossover
- Within 100 meters of bridge, viaduct, or tunnel with limited view
- At railway crossings
- At intersections

**Being Passed:**
- Stay in your lane and maintain speed
- Don't speed up when being passed
- Move right if safe to allow faster traffic to pass

**Lane Usage:**
- Keep right except when passing on multi-lane roads
- Left lane is for passing, not cruising
- Choose lane for your destination and speed
- Don't weave between lanes
- Signal all lane changes
- Check blind spots before changing lanes`,
      },
      {
        name: "Turning and Signals",
        keywords: ["turn", "left turn", "right turn", "signal", "indicator", "blinker"],
        content: `Proper turning techniques and signal usage for safe maneuvering.

**Turn Signals:**
- Signal at least 30 meters (100 feet) before turning
- Keep signal on throughout turn
- Cancel signal after completing turn
- Use signals for all turns and lane changes
- Broken signal light doesn't excuse not signaling - use hand signals

**Hand Signals (if signals not working):**
- Left turn: arm straight out left window
- Right turn: arm out with forearm up
- Slowing/stopping: arm out with forearm down

**Right Turns:**
- Signal 30 meters before turn
- Move into right lane
- Stay close to right curb
- Slow down as you approach
- Check for pedestrians and cyclists
- Turn into right lane of new road
- Yield to pedestrians crossing

**Left Turns:**
- Signal 30 meters before turn
- Move into left lane (or center of single lane)
- Enter intersection when light green and way is clear
- Yield to oncoming traffic and pedestrians
- Turn when safe, entering left lane of new road
- Don't cut corner - turn from center of intersection

**Left Turns at Traffic Lights:**
- Pull forward into intersection when light is green
- Yield to oncoming traffic
- Complete turn when safe, even if light turns yellow/red while in intersection
- Flashing green arrow means protected turn

**Making a U-Turn:**
- Only where permitted (no signs prohibiting)
- Not at controlled intersections unless sign permits
- Not on curves, hills, or where visibility is limited
- Yield to all traffic and pedestrians
- Use left turn techniques`,
      },
      {
        name: "Stopping and Parking",
        keywords: ["parking", "stop", "prohibited", "no parking", "no stopping", "fire hydrant"],
        content: `Rules for legal and safe parking and stopping.

**Where You Cannot Park:**
- Within 9 meters of fire hydrant
- Within 3 meters of fire station entrance
- Within 100 meters of fire when attending
- In front of driveway
- On sidewalk
- Within 3 meters of pedestrian crossover
- Within 6 meters of stop sign, yield sign, or traffic light at side of roadway
- Within 9 meters of intersection
- On curves or hilltops with limited visibility
- Where signs prohibit parking
- In designated disabled parking spaces (without valid permit)
- In bicycle lanes
- Blocking traffic

**Parking Rules:**
- Park parallel to curb, within 30 cm
- Park in direction of traffic
- Set parking brake
- Turn wheels to curb on hills (toward curb facing downhill, away from curb facing uphill)
- Turn off engine
- Lock vehicle
- Check for cyclists before opening door

**Parking Signs:**
- Green P: parking permitted
- Red circle with line through P: no parking
- Time limits shown on signs
- Read all signs carefully - multiple restrictions may apply

**Stopping vs. Parking:**
- Stopping: temporarily halting (with driver present)
- Parking: leaving vehicle unattended
- Some areas allow stopping but not parking

**Rush Hour Regulations:**
- Watch for time-specific restrictions
- "No Stopping" during rush hours on major routes
- Times posted on signs

**Parking Lots:**
- Follow marked lanes and directions
- Park within marked spaces
- Watch for pedestrians
- Disabled parking requires valid permit
- Note time limits

**Fire Routes:**
- Designated by signs
- No stopping or parking at any time
- Heavy fines and towing enforced`,
      },
    ],
  },
  {
    title: "Sharing the Road",
    description: "Interacting safely with other road users",
    icon: "Users",
    sections: [
      {
        name: "Pedestrians",
        keywords: ["pedestrian", "crosswalk", "sidewalk", "walker", "crossing", "yield"],
        content: `Drivers must watch for and yield to pedestrians to keep everyone safe.

**Pedestrian Right-of-Way:**
- Always yield to pedestrians in marked or unmarked crosswalks
- Yield when turning at intersections (even on green light)
- Stop for pedestrians with white canes or guide dogs
- Stop for school crossing guards
- Be especially careful in school zones and playgrounds

**At Crosswalks:**
- Slow down and be prepared to stop
- Stop before entering crosswalk if pedestrian present
- Don't pass vehicles stopped at crosswalks
- Wait until pedestrian completely crosses your half of road
- Be patient - don't honk or rush pedestrians

**Pedestrian Crossovers:**
- Marked with overhead yellow X
- Must stop for pedestrians pushing button or waiting to cross
- Remain stopped until pedestrians completely clear roadway
- Don't pass other vehicles stopped at crossover

**School Zones:**
- Reduced speed limits when children present
- Watch for children crossing unexpectedly
- Be extra alert during school start and end times
- School buses stopping mean children may be crossing

**Special Considerations:**
- Children may be unpredictable - be extra cautious
- Seniors may move slowly - be patient
- People with disabilities may need extra time
- In bad weather, pedestrians may be harder to see
- At night, watch for pedestrians in dark clothing

**When Backing Up:**
- Always check behind vehicle before backing
- Watch for pedestrians, especially children
- Use mirrors and turn your head to look
- Back up slowly
- Have someone guide you if visibility limited`,
      },
      {
        name: "Cyclists and Bicycle Safety",
        keywords: ["bicycle", "cyclist", "bike", "cycling", "bike lane"],
        content: `Cyclists have the same rights and responsibilities as drivers. Share the road safely.

**Cyclists' Rights:**
- Entitled to use roads (except highways where prohibited)
- May use full lane when necessary for safety
- Protected by same traffic laws as vehicles
- Have right to designated bike lanes

**How to Share the Road:**
- Give cyclists space - at least 1 meter when passing
- Check blind spots for cyclists before turning or changing lanes
- Don't honk unnecessarily - may startle cyclist
- Be patient - don't tailgate or rush cyclists
- Watch for cyclists when opening car doors

**Bike Lanes:**
- Designated lanes for cyclists (marked with white lines and bike symbols)
- Don't drive, stop, or park in bike lanes
- Check bike lanes before turning right
- Yield to cyclists when crossing bike lanes
- Watch for parked cars opening doors into bike lane

**Turning with Cyclists:**
- Check mirrors and blind spots before turning
- Shoulder check for cyclists on right before right turns
- Allow cyclists to clear intersection before turning
- Signal intentions clearly and early
- Yield to cyclists going straight when you're turning

**Special Situations:**
- Wet roads: cyclists need more distance to stop
- Streetcar tracks: cyclists must cross at angles, give them space
- Hills: cyclists move slowly uphill, fast downhill
- Gravel or potholes: cyclists may swerve to avoid hazards
- Groups of cyclists: pass entire group at once when safe

**At Intersections:**
- Cyclists may position in center of lane at lights
- Don't squeeze past cyclists at intersections
- Watch for cyclists going straight as you turn
- Cyclists may filter forward at red lights - allow space`,
      },
      {
        name: "Motorcycles and Scooters",
        keywords: ["motorcycle", "motorbike", "rider", "scooter", "two wheels"],
        content: `Motorcycles are smaller and less visible but have the same road rights as cars.

**Why Motorcycles are Different:**
- Smaller and harder to see
- Can accelerate quickly and stop faster than cars
- More affected by weather and road conditions
- No protection in crashes - extreme vulnerability
- Can fit in smaller spaces

**Seeing Motorcycles:**
- Check blind spots carefully - motorcycles easily hidden
- Double-check before changing lanes or merging
- Look for motorcycles at intersections
- Use entire visual field when scanning traffic
- Don't rely solely on mirrors

**Following Distance:**
- Maintain same following distance as for cars (2-second rule minimum)
- Motorcycles may stop faster than cars - allow extra room
- Don't tailgate - intimidating and dangerous for riders
- In poor weather, increase following distance

**Passing Motorcycles:**
- Give full lane width when passing
- Don't squeeze past in same lane
- Return to lane only when motorcycle visible in rearview mirror
- Be aware of wind blast from large vehicles affecting motorcycles

**Lane Splitting:**
- Motorcycles driving between lanes is illegal in Ontario
- Don't move over to share lane with motorcycle
- Give motorcycles full lane width

**At Intersections:**
- Look for motorcycles before turning
- Difficult to judge motorcycle speed and distance
- Motorcycles can fit into smaller gaps - don't assume space empty
- Yield right-of-way to motorcycles like any vehicle

**Special Conditions:**
- Wind: motorcycles affected by strong winds and wind blast from large vehicles
- Rain: reduced traction affects motorcycles more
- Gravel: motorcycles must slow for loose gravel
- Railroad tracks: riders may change position to cross safely`,
      },
      {
        name: "Large Vehicles and Trucks",
        keywords: ["truck", "bus", "large vehicle", "blind spot", "commercial", "tractor trailer"],
        content: `Large vehicles require special consideration due to their size, weight, and limited visibility.

**Blind Spots (No-Zones):**
- Large areas where truck driver cannot see other vehicles
- Directly in front (up to 6 meters)
- Directly behind (up to 9 meters)
- Along both sides, especially right side
- **Rule: If you can't see truck's mirrors, driver can't see you**

**How to Stay Safe:**
- Avoid lingering in blind spots
- Pass quickly and safely
- Don't cut in front closely after passing
- Be visible - don't tailgate
- Give extra space in poor weather

**Passing Large Vehicles:**
- Pass on left when possible
- Ensure you can see driver in mirror before passing
- Signal early and clearly
- Pass completely - don't linger beside truck
- Return to lane only when you can see entire front of truck in mirror
- Expect slower acceleration on hills

**Being Passed by Trucks:**
- Maintain steady speed
- Stay in your lane
- Give truck plenty of room to merge back

**Following Large Vehicles:**
- Maintain greater following distance (4-5 seconds)
- Trucks block your view ahead
- Trucks may stop suddenly
- Cargo may fall from vehicles
- Don't tailgate - truck driver can't see you

**Turning with Trucks:**
- Trucks need extra space to turn
- May swing wide or use multiple lanes
- Never squeeze between truck and curb
- Don't try to pass turning truck
- Truck may appear to turn one way before going another

**Stopping:**
- Trucks take longer to stop (up to twice the distance)
- Don't cut in front of trucks
- Don't make sudden stops in front of trucks
- Extra stopping distance needed on wet roads

**Sharing the Highway:**
- Trucks may travel slower uphill
- Trucks gain speed downhill
- Give trucks space to merge
- Don't brake suddenly in front of trucks`,
      },
      {
        name: "Emergency Vehicles",
        keywords: ["ambulance", "police", "fire truck", "emergency", "siren", "flashing lights"],
        content: `You must yield right-of-way to emergency vehicles with flashing lights and sirens.

**Types of Emergency Vehicles:**
- Police cars
- Fire trucks
- Ambulances
- Emergency medical services
- Public safety vehicles
- Tow trucks at collision scenes

**What to Do When Approaching:**
- Pull to right side of road and stop
- Stop even if emergency vehicle is on opposite side of divided highway
- Stay stopped until emergency vehicle passes
- Check for additional emergency vehicles before proceeding
- Don't stop in intersection - clear it first, then pull over

**On Multi-Lane Roads:**
- Move to right lanes if possible
- Stop if emergency vehicle in your lane
- Don't block intersections
- Create clear path for emergency vehicle

**At Intersections:**
- Don't enter intersection even if light is green
- If already in intersection, clear it safely then pull over
- Yield right-of-way until emergency vehicle passes

**What NOT to Do:**
- Don't follow emergency vehicles (must stay 150 meters back)
- Don't speed up or race emergency vehicles
- Don't block emergency vehicle path
- Don't stop suddenly - may cause rear-end collision
- Don't proceed through red light (unless directed by police)

**Move Over Law:**
- When passing stopped emergency vehicle with lights flashing:
  - Move to far lane if safe to do so
  - If can't move over, slow down and pass with caution
- Applies to police, fire, ambulance, and tow trucks
- Heavy fines for violations

**Tow Trucks:**
- Slow down and move over for tow trucks with flashing lights at collision scenes
- Watch for workers on roadway
- Be prepared for debris on road

**Penalties:**
- Failing to yield to emergency vehicle: heavy fines and demerit points
- Move over law violations: significant fines
- May face additional charges if collision results`,
      },
    ],
  },
  {
    title: "Driving Techniques",
    description: "Essential skills for safe and defensive driving",
    icon: "Navigation",
    sections: [
      {
        name: "Defensive Driving",
        keywords: ["defensive", "anticipate", "safe following distance", "awareness", "prevention"],
        content: `Defensive driving means anticipating problems and taking action to avoid collisions.

**Key Principles:**
- Always expect the unexpected
- Assume other drivers may make mistakes
- Maintain escape routes
- Stay alert and focused
- Control your speed
- Be visible to others
- Stay sober and well-rested

**The 2-Second Rule:**
- Choose fixed object ahead
- When vehicle ahead passes it, begin counting "one thousand and one, one thousand and two"
- You should reach object after 2 seconds
- Increase to 3-4 seconds in poor conditions
- Increase to 4-5 seconds behind large vehicles

**Scanning Techniques:**
- Look 12-15 seconds ahead
- Check mirrors every 5-8 seconds
- Scan sides of road for potential hazards
- Check blind spots before changing lanes
- Be aware of vehicles in peripheral vision

**Common Defensive Techniques:**
- Maintain space cushion on all sides
- Position away from other vehicles when possible
- Avoid driving in blind spots of other vehicles
- Stay in center of lane away from road edges
- Keep wheels straight when stopped (easier to avoid rear collision)
- Have escape route planned

**Avoiding Distractions:**
- Don't use handheld devices (illegal in Ontario)
- Adjust mirrors, seats, climate before driving
- Program GPS before starting trip
- Avoid eating while driving
- Minimize conversations with passengers
- Keep music at reasonable volume

**Anticipating Other Drivers:**
- Watch for turn signals and brake lights
- Notice drivers who seem impaired or aggressive
- Be extra cautious at intersections
- Watch for vehicles pulling out from parking spaces or driveways
- Expect pedestrians at crosswalks
- Assume others may not see you

**Managing Risk:**
- Don't drive when tired, emotional, or impaired
- Adjust driving for weather and traffic
- Know your vehicle's capabilities and limits
- Plan trips and allow extra time
- Take breaks on long trips`,
      },
      {
        name: "Intersections",
        keywords: ["intersection", "crossing", "junction", "right of way", "traffic light"],
        content: `Intersections are where most collisions occur. Approach them with extra caution.

**Approaching Intersections:**
- Slow down and scan in all directions
- Check for traffic, pedestrians, and cyclists
- Identify intersection type and controls (signs, lights, uncontrolled)
- Check for emergency vehicles
- Be prepared to stop
- Don't assume other drivers will stop or yield

**Controlled Intersections (Traffic Lights):**
- Approach on green: scan for vehicles running red light
- Yellow light: stop if safe to do so
- Red light: come to complete stop
- Right on red: stop first, yield to traffic and pedestrians, proceed when clear
- Green arrow: protected turn but still check for hazards

**Stop Signs:**
- Come to complete stop (wheels must stop rotating)
- Stop at stop line, crosswalk, or before entering intersection
- Look left, right, and left again
- Yield to traffic and pedestrians
- Proceed only when clear and safe

**Four-Way Stops:**
- First vehicle to arrive and stop has right-of-way
- If arriving simultaneously, vehicle on right goes first
- If facing each other, straight/right turns before left turns
- Don't proceed until certain of right-of-way
- Make eye contact with other drivers

**Uncontrolled Intersections:**
- No signs or signals
- Slow down and be prepared to stop
- Yield to traffic on right
- Yield to traffic already in intersection
- Proceed with extreme caution

**Making Turns at Intersections:**
- Signal 30 meters before intersection
- Move into proper lane before intersection
- Check for pedestrians and cyclists
- Left turns: yield to oncoming traffic
- Complete turn into proper lane
- Watch for vehicles turning from opposite direction

**Railroad Crossings:**
- Slow down at all crossings
- Look both directions
- Never stop on tracks
- Don't shift gears while crossing
- If vehicle stalls, get everyone out immediately
- If train approaching, run away from tracks at 45-degree angle

**School Crossings:**
- Watch for crossing guards
- Stop when signaled by guard
- Watch for children crossing
- Be extra cautious near schools during school hours`,
      },
      {
        name: "Highway Driving",
        keywords: ["highway", "freeway", "expressway", "merging", "401", "fast", "high speed"],
        content: `Highway driving requires different skills than city driving due to higher speeds and traffic volume.

**Entering Highway (Merging):**
- Use acceleration lane to match highway speed
- Signal your intention to merge
- Check mirrors and blind spot
- Find gap in traffic
- Merge smoothly when safe
- Never stop in acceleration lane unless absolutely necessary
- Cancel signal after merging

**Highway Lane Use:**
- Right lane: for normal travel and slower vehicles
- Left lane: for passing only, not cruising
- Center lanes: for through travel
- Choose lane based on speed and destination
- Stay in one lane - don't weave
- Signal all lane changes well in advance

**Passing on Highway:**
- Check mirrors and blind spots
- Signal left and move to passing lane
- Pass at safe speed (don't exceed limit)
- Return to right lane when safe
- Signal right before returning
- Never pass on right shoulder

**Safe Following Distance:**
- Minimum 2 seconds in good conditions
- 3-4 seconds in poor conditions or heavy traffic
- 4-5 seconds behind large vehicles
- Increase distance at higher speeds

**Exiting Highway:**
- Know your exit in advance
- Move to right lane well before exit
- Signal before entering deceleration lane
- Slow down in deceleration lane, not on highway
- Check speedometer - you may be going faster than you think
- Watch for reduced speed limits on exit ramps

**Highway Speed:**
- Match flow of traffic (within speed limit)
- Drive at speed comfortable for conditions
- Reduce speed in poor weather
- Watch for sudden slowdowns ahead
- Don't drive too slowly - impedes traffic flow

**Common Highway Hazards:**
- Reduced traction on wet roads at high speeds
- Hydroplaning in heavy rain
- Wind affecting vehicle control
- Glare from sun or headlights
- Fatigue on long trips
- Aggressive drivers
- Debris on roadway

**Long Distance Highway Driving:**
- Plan route and stops in advance
- Take breaks every 2 hours
- Stay alert for signs of fatigue
- Keep to right except when passing
- Use cruise control on long straight sections
- Maintain focus despite monotony`,
      },
      {
        name: "Night Driving",
        keywords: ["night", "dark", "headlights", "visibility", "low light"],
        content: `Night driving presents unique challenges due to reduced visibility and increased risk.

**Visibility Challenges:**
- Reduced depth perception and peripheral vision
- Harder to judge speed and distance
- Pedestrians and cyclists less visible
- More glare from oncoming headlights
- Eyes need time to adjust to darkness
- Fatigue more common at night

**Headlight Use:**
- Turn on headlights 30 minutes before sunset
- Use low beams in cities and when following other vehicles
- Use high beams on rural roads when no oncoming traffic
- Dim high beams at least 150 meters before meeting oncoming vehicle
- Dim when following within 60 meters of another vehicle
- Don't use parking lights while driving

**Dealing with Oncoming Headlights:**
- Don't look directly at oncoming headlights
- Look to right edge of road
- Use right edge line as guide
- Slow down if blinded
- Don't retaliate with high beams

**Seeing and Being Seen:**
- Clean headlights, taillights, and all windows regularly
- Replace burned-out bulbs immediately
- Aim headlights properly
- Reduce dashboard light brightness
- Turn on lights in parking lots and poorly lit areas
- Wear reflective clothing if walking at night

**Adjusting Your Driving:**
- Reduce speed - stopping distance same but seeing distance less
- Increase following distance
- Use lane markings as guide
- Watch for animals on rural roads
- Be extra alert for pedestrians and cyclists
- Don't overdrive your headlights (can't stop within visible distance)

**Avoiding Fatigue:**
- Don't drive when tired
- Take breaks every 2 hours on long trips
- Stop and rest if drowsy
- Share driving if possible
- Avoid heavy meals before driving
- Don't rely on coffee to stay awake

**Special Night Hazards:**
- Impaired drivers more common
- Animals more active (especially deer at dawn and dusk)
- Pedestrians harder to see, especially in dark clothing
- Construction zones may have poor lighting
- Reduced ability to see road conditions and hazards`,
      },
      {
        name: "Winter Driving",
        keywords: ["winter", "snow", "ice", "cold weather", "slippery", "skid"],
        content: `Winter driving requires special skills and vehicle preparation for safe travel in snow and ice.

**Vehicle Preparation:**
- Install winter tires on all four wheels (required by law in some areas)
- Check tire tread depth and pressure (drops in cold)
- Top up washer fluid with winter formula
- Ensure battery is in good condition
- Check heater and defroster operation
- Keep gas tank at least half full
- Carry winter emergency kit

**Winter Emergency Kit:**
- Ice scraper and snow brush
- Blanket and extra warm clothing
- Flashlight with extra batteries
- Shovel
- Traction aids (sand, salt, kitty litter)
- Jumper cables
- First aid kit
- Non-perishable snacks and water
- Emergency reflective triangles

**Before Driving:**
- Clear all snow and ice from entire vehicle (windows, lights, roof, hood)
- Let engine warm up briefly
- Ensure all windows completely defrosted
- Check that lights and signals visible
- Plan route and check weather and road conditions

**Winter Driving Techniques:**
- Slow down - stopping distance up to 10 times greater on ice
- Accelerate and brake gently
- Increase following distance to 8-10 seconds
- Leave more room for stopping at intersections
- Start slowing down well before stops
- Anticipate actions well in advance
- Avoid sudden steering movements

**Handling Skids:**
- Don't panic or overreact
- Take foot off accelerator
- Steer in direction you want to go (don't overcorrect)
- Don't brake suddenly
- For anti-lock brakes (ABS): press firmly and hold
- For non-ABS: pump brakes gently
- Stay calm and regain control gradually

**Black Ice:**
- Invisible ice, often on bridges and shaded areas
- Forms when temperature near freezing
- Very dangerous - no traction
- If you hit black ice, don't brake or steer suddenly
- Lift off accelerator gently and keep steering wheel straight
- Wait until you're on clear pavement to brake or steer

**Driving in Snow:**
- Deep snow: use lower gear, keep moving slowly and steadily
- Don't stop if possible - difficult to get moving again
- If stuck: don't spin tires - gently rock vehicle forward and backward
- Snow-covered roads: triple normal following distance
- Can't see lane markings: follow tracks of vehicle ahead carefully

**Limited Visibility:**
- Heavy snow reduces visibility dramatically
- Use low-beam headlights
- Don't use high beams - reflects off snow
- Increase following distance
- If visibility too poor, pull off road safely and wait
- Keep windows clear - use defroster and wipers

**Other Winter Hazards:**
- Snowplows: give them plenty of room, don't pass
- Slush: causes hydroplaning like water
- Freeze-thaw cycles: create ice patches
- Sun glare off snow: wear sunglasses, use visor
- Shortened daylight hours: more driving in darkness`,
      },
    ],
  },
  {
    title: "Safety Equipment",
    description: "Vehicle safety features and requirements",
    icon: "Shield",
    sections: [
      {
        name: "Seat Belts",
        keywords: ["seat belt", "safety belt", "restraint", "buckle up"],
        content: `Seat belts are your most important safety feature and are required by law in Ontario.

**Seat Belt Laws:**
- Driver and all passengers must wear seat belts
- Driver responsible for passengers under 16
- Applies to all seating positions with belts
- Fines and demerit points for violations
- Few medical exemptions exist (requires certificate)

**Why Seat Belts Save Lives:**
- Prevent ejection from vehicle (most fatal crash outcome)
- Spread crash forces over stronger body parts
- Help maintain body position for airbag protection
- Reduce collision with interior and other passengers
- Keep you in control of vehicle
- Reduce injury severity by up to 50%

**Proper Seat Belt Use:**
- Lap belt low across hips, not stomach
- Shoulder belt across chest and over shoulder
- Belt should be snug but comfortable
- Don't tuck shoulder belt under arm or behind back
- One person per belt - never share
- Don't use if twisted or damaged

**Pregnant Women:**
- Must wear seat belts
- Lap belt below belly, across hips
- Shoulder belt between breasts, away from belly
- Adjust seat position for comfort and safety
- Consult doctor if concerns

**Common Excuses (All Wrong):**
- "Short trip": Most collisions occur close to home
- "Low speed": Serious injuries occur even at low speeds
- "I'm a good driver": Can't control other drivers' actions
- "Uncomfortable": Adjust for proper fit
- "Airbags enough": Airbags designed to work with seat belts
- "Better thrown clear": Ejection usually fatal

**Seat Belt Maintenance:**
- Check for wear, cuts, and fraying
- Ensure buckles click and release properly
- Replace after any collision
- Don't use belt clips or positioning aids
- Have damaged belts replaced immediately`,
      },
      {
        name: "Child Safety Seats",
        keywords: ["child", "car seat", "booster", "infant", "toddler", "child restraint"],
        content: `Children require proper restraints based on their age, weight, and height for maximum protection.

**Legal Requirements (Ontario):**
- Infants under 1 year: rear-facing car seat
- Toddlers 1-4 years and over 9 kg: forward-facing car seat with harness
- Children 4-8 years, under 36 kg, and under 145 cm: booster seat
- Children 8+ years, over 36 kg, or over 145 cm: seat belt
- Heavy fines for non-compliance

**Rear-Facing Seats (Birth to at least 1 year):**
- Safest position for infants
- Keep rear-facing as long as possible (many seats allow to 2+ years)
- Never place in front seat with active airbag
- Install at correct angle (usually 45 degrees)
- Harness straps at or below shoulders
- Harness snug - only one finger fits between harness and child

**Forward-Facing Seats (Toddlers):**
- Use after outgrowing rear-facing seat (weight and height)
- Install in back seat
- Use top tether strap if available
- Harness straps at or above shoulders
- Harness snug with chest clip at armpit level
- Follow manufacturer's weight and height limits

**Booster Seats (Preschool to Early Elementary):**
- Use when child outgrows forward-facing seat
- Positions vehicle seat belt properly on child's body
- Continue until child fits adult belt properly
- Two types: high-back and backless
- Use vehicle lap and shoulder belt

**When Child Ready for Adult Seat Belt:**
- At least 8 years old, OR
- At least 36 kg (80 lbs), OR
- At least 145 cm (4'9") tall
- Can sit with back against seat
- Knees bend at edge of seat
- Feet touch floor
- Lap belt across hips, shoulder belt across chest

**Installation Tips:**
- Read car seat and vehicle manuals
- Seat shouldn't move more than 2.5 cm side-to-side or front-to-back
- Use LATCH system or seat belt (not both)
- Have installation checked at inspection station
- Register car seat for recall notices
- Replace after collision or if expired

**Common Mistakes:**
- Using seat past expiration date (usually 6-10 years)
- Incorrect installation (too loose)
- Harness not tight enough
- Moving to next stage too soon
- Using second-hand seat with unknown history
- Placing rear-facing seat in front with active airbag`,
      },
      {
        name: "Airbags",
        keywords: ["airbag", "srs", "supplemental restraint", "safety"],
        content: `Airbags provide supplemental protection but only work properly when combined with seat belts.

**How Airbags Work:**
- Sensors detect collision
- Airbag inflates in milliseconds
- Cushions occupant during impact
- Deflates quickly after deployment
- One-time use - must be replaced after deployment

**Types of Airbags:**
- Front airbags: driver and passenger (standard in most vehicles)
- Side airbags: protect torso in side impacts
- Curtain airbags: protect head in side impacts and rollovers
- Knee airbags: protect lower legs

**Why Seat Belts Are Essential:**
- Airbags deploy at 200+ km/h
- Designed to work with seat belts, not replace them
- Without belt, can be thrown into inflating airbag (serious injury)
- Seat belt keeps you in position for airbag protection
- Airbag alone can cause injury to unbelted occupants

**Front Seat Safety:**
- Sit at least 25 cm from steering wheel/dashboard
- Adjust seat position to maintain distance
- Tilt steering wheel toward chest, not head
- Keep hands on sides of steering wheel (not over airbag)
- Don't lean forward while driving

**Children and Airbags:**
- Never place rear-facing car seat in front seat with active airbag
- Children under 12 should ride in back seat
- Front passenger airbag can seriously injure children
- Some vehicles allow passenger airbag to be deactivated

**Airbag Warning Light:**
- Lights up briefly when starting vehicle (self-test)
- Should turn off after few seconds
- If stays on or flashes: airbag system problem
- Have checked by qualified technician immediately
- System may not work in collision

**What to Do After Deployment:**
- Stay calm and assess injuries
- Exit vehicle if safe to do so
- Airbag dust may irritate eyes and breathing (not dangerous)
- Have vehicle towed - don't drive with deployed airbags
- Have entire system inspected and replaced
- Other airbags may have deployed or been damaged

**Airbag Myths:**
- Myth: Airbags dangerous and cause injury
  - Truth: Save thousands of lives annually; injuries rare and minor compared to alternatives
- Myth: Don't need seat belt if have airbags
  - Truth: Airbags designed to work with seat belts
- Myth: All airbags same
  - Truth: Different types for different crash scenarios
- Myth: Airbags deploy in all collisions
  - Truth: Only deploy in moderate to severe frontal or side impacts`,
      },
      {
        name: "Vehicle Lights and Signals",
        keywords: ["headlight", "brake light", "turn signal", "hazard", "lights", "lamps"],
        content: `Proper use and maintenance of vehicle lights is essential for seeing and being seen.

**Headlights:**
- Use from 30 minutes before sunset to 30 minutes after sunrise
- Use any time visibility reduced (rain, snow, fog)
- Low beams in cities and towns
- Low beams when following another vehicle within 60 meters
- High beams on dark rural roads with no oncoming traffic
- Dim high beams 150 meters before meeting oncoming vehicle

**Daytime Running Lights (DRL):**
- Automatic lights that come on when vehicle running
- Not as bright as regular headlights
- Don't activate taillights - must manually turn on headlights
- Don't provide adequate lighting in reduced visibility

**Taillights:**
- Red lights at rear of vehicle
- Come on with headlights
- Make vehicle visible from behind
- Must be visible from 150 meters
- Keep clean and ensure working

**Brake Lights:**
- Brighter red lights activated by brake pedal
- Warn following drivers you're slowing/stopping
- Check regularly - others can't see if not working
- Third brake light (center high-mounted) required on newer vehicles

**Turn Signals:**
- Indicate intention to turn or change lanes
- Flashing amber lights (front and rear)
- Signal at least 30 meters (100 feet) before turn
- Keep on throughout maneuver
- Cancel after completing turn
- Don't rely on automatic cancellation

**Hazard Lights:**
- All four turn signals flashing simultaneously
- Use when vehicle disabled or emergency
- Use to warn of hazard ahead on highway
- Don't use while driving in poor weather (confusing)
- Don't use instead of proper signaling

**Parking Lights:**
- Small lights front and rear
- Not sufficient for driving
- Never drive with only parking lights on
- Use when parked on roadway (if necessary)

**Fog Lights:**
- Auxiliary lights mounted low on front
- Help visibility in fog, snow, and heavy rain
- Aim down and wide
- Don't use in clear conditions (blind other drivers)

**License Plate Light:**
- White light illuminating rear plate
- Must work at all times
- Often overlooked in maintenance

**Light Maintenance:**
- Check all lights monthly
- Clean lenses regularly
- Replace burned-out bulbs immediately
- Check aim of headlights
- Ensure all lenses intact (not cracked)
- Clear snow and ice from all lights

**Legal Requirements:**
- Working lights required at all times
- Fines for non-working lights
- May be deemed unsafe to drive
- Can result in vehicle inspection order

**Emergency/Service Vehicles:**
- Red lights: emergency vehicles, fire trucks
- Blue lights: police, snow plows
- Amber/yellow lights: tow trucks, construction vehicles
- Green lights: volunteer firefighters
- Flashing lights mean yield right-of-way and/or slow down and move over`,
      },
      {
        name: "Mirrors and Blind Spots",
        keywords: ["mirror", "blind spot", "rear view", "side mirror", "check", "shoulder check"],
        content: `Proper mirror use and blind spot checking are essential for safe lane changes and turns.

**Types of Mirrors:**
- Interior rearview mirror: shows traffic directly behind
- Left side mirror: shows left side and traffic in left lanes
- Right side mirror: shows right side and traffic in right lanes
- Convex mirrors: provide wider view but make objects appear farther

**Proper Mirror Adjustment:**
- Rearview: centered on rear window, full view behind
- Side mirrors: should see small portion of your vehicle's side
- Adjust to minimize blind spots
- Set mirrors while sitting in normal driving position
- Don't set to show side of your own vehicle only

**Blind Spots:**
- Areas not visible in any mirror
- Largest areas beside and slightly behind vehicle
- Vary based on vehicle size and mirror adjustment
- Motorcycles and cyclists easily hidden in blind spots
- Large vehicles have much larger blind spots

**Checking Blind Spots:**
- Turn head to look over shoulder
- Quick glance - keep eyes on road ahead
- Check before: changing lanes, merging, turning, backing up, pulling away from curb
- Don't rely solely on mirrors
- Check both sides before making maneuvers

**Mirror Checking Routine:**
- Check rearview mirror every 5-8 seconds
- Check side mirrors before changing lanes or turning
- Check mirrors before slowing down or stopping
- Scan all mirrors regularly to maintain awareness
- Adjust checking frequency in heavy traffic

**Blind Spot Monitoring Systems:**
- Electronic warning of vehicles in blind spots
- Indicator light or warning when vehicle detected
- Helpful but don't replace shoulder checks
- Can fail or have limited detection range
- Still must check mirrors and shoulder check

**Minimizing Blind Spots:**
- Adjust mirrors properly (reduce overlap)
- Keep head upright and centered
- Some suggest "BGE" mirror setting (blind spot and glare elimination)
- Modern technology: blind spot detection, 360° cameras

**Special Situations:**
- Large vehicles: much larger blind spots - if you can't see driver in truck's mirror, they can't see you
- Backing up: use mirrors but also turn and look directly
- Parking: use mirrors and turn to look
- Towing trailer: adjust mirrors or add extensions

**Common Mistakes:**
- Only checking mirrors, not blind spots
- Not checking before every lane change
- Relying on passenger to check
- Not adjusting mirrors properly
- Forgetting to check when distracted
- Moving into lane before checking

**Night Driving:**
- Use rearview mirror night setting to reduce glare
- Side mirrors may be more difficult to use
- Headlights help identify vehicles in mirrors
- Extra caution needed for checking blind spots`,
      },
    ],
  },
];
