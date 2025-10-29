import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, BookOpen, Search, ExternalLink, FileText, Car, AlertTriangle, Navigation, Users, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface HandbookTopic {
  title: string;
  description: string;
  icon: React.ReactNode;
  sections: {
    name: string;
    keywords: string[];
  }[];
}

const Handbook = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handbookTopics: HandbookTopic[] = [
    {
      title: "Getting Your License",
      description: "Learn about the graduated licensing system and requirements",
      icon: <FileText className="w-5 h-5" />,
      sections: [
        { name: "Graduated Licensing (G1, G2, G)", keywords: ["license", "g1", "g2", "graduated", "requirements"] },
        { name: "Vision Requirements", keywords: ["vision", "eyesight", "test"] },
        { name: "Fees and Renewals", keywords: ["fee", "cost", "renewal", "expire"] },
      ]
    },
    {
      title: "Road Signs & Signals",
      description: "Understanding traffic signs, signals, and road markings",
      icon: <AlertTriangle className="w-5 h-5" />,
      sections: [
        { name: "Regulatory Signs", keywords: ["stop", "yield", "speed limit", "no entry", "regulatory"] },
        { name: "Warning Signs", keywords: ["warning", "curve", "deer", "school zone", "construction"] },
        { name: "Information Signs", keywords: ["information", "direction", "hospital", "parking"] },
        { name: "Traffic Lights", keywords: ["traffic light", "red", "yellow", "green", "signal"] },
        { name: "Pavement Markings", keywords: ["lines", "yellow line", "white line", "crosswalk"] },
      ]
    },
    {
      title: "Rules of the Road",
      description: "Traffic laws, right-of-way, and safe driving practices",
      icon: <Car className="w-5 h-5" />,
      sections: [
        { name: "Speed Limits", keywords: ["speed", "limit", "maximum", "minimum"] },
        { name: "Right-of-Way Rules", keywords: ["right of way", "yield", "intersection", "priority"] },
        { name: "Passing and Lane Use", keywords: ["passing", "overtaking", "lane", "left lane"] },
        { name: "Turning and Signals", keywords: ["turn", "left turn", "right turn", "signal"] },
        { name: "Stopping and Parking", keywords: ["parking", "stop", "prohibited", "no parking"] },
      ]
    },
    {
      title: "Sharing the Road",
      description: "Interacting safely with other road users",
      icon: <Users className="w-5 h-5" />,
      sections: [
        { name: "Pedestrians", keywords: ["pedestrian", "crosswalk", "sidewalk", "walker"] },
        { name: "Cyclists", keywords: ["bicycle", "cyclist", "bike", "cycling"] },
        { name: "Motorcycles", keywords: ["motorcycle", "motorbike", "rider"] },
        { name: "Large Vehicles", keywords: ["truck", "bus", "large vehicle", "blind spot"] },
        { name: "Emergency Vehicles", keywords: ["ambulance", "police", "fire truck", "emergency"] },
      ]
    },
    {
      title: "Driving Techniques",
      description: "Essential skills for safe and defensive driving",
      icon: <Navigation className="w-5 h-5" />,
      sections: [
        { name: "Defensive Driving", keywords: ["defensive", "anticipate", "safe following distance"] },
        { name: "Intersections", keywords: ["intersection", "crossing", "junction"] },
        { name: "Highway Driving", keywords: ["highway", "freeway", "expressway", "merging"] },
        { name: "Night Driving", keywords: ["night", "dark", "headlights", "visibility"] },
        { name: "Winter Driving", keywords: ["winter", "snow", "ice", "cold weather"] },
      ]
    },
    {
      title: "Safety Equipment",
      description: "Vehicle safety features and requirements",
      icon: <Shield className="w-5 h-5" />,
      sections: [
        { name: "Seat Belts", keywords: ["seat belt", "safety belt", "restraint"] },
        { name: "Child Safety Seats", keywords: ["child", "car seat", "booster"] },
        { name: "Airbags", keywords: ["airbag", "srs", "supplemental restraint"] },
        { name: "Lights and Signals", keywords: ["headlight", "brake light", "turn signal", "hazard"] },
        { name: "Mirrors and Blind Spots", keywords: ["mirror", "blind spot", "rear view"] },
      ]
    },
  ];

  const filteredTopics = handbookTopics.map(topic => {
    if (!searchQuery) return topic;
    
    const query = searchQuery.toLowerCase();
    const matchingSections = topic.sections.filter(section =>
      section.name.toLowerCase().includes(query) ||
      section.keywords.some(keyword => keyword.toLowerCase().includes(query))
    );

    return matchingSections.length > 0 ? { ...topic, sections: matchingSections } : null;
  }).filter(Boolean) as HandbookTopic[];

  const openOfficialHandbook = () => {
    window.open("https://www.ontario.ca/document/official-mto-drivers-handbook", "_blank");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-secondary p-4 sm:p-6 text-primary-foreground">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="mb-3 sm:mb-4 text-primary-foreground hover:bg-primary-foreground/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex items-center gap-3 mb-3">
            <BookOpen className="w-7 h-7 sm:w-8 sm:h-8" />
            <h1 className="text-2xl sm:text-3xl font-bold">Driver's Handbook</h1>
          </div>
          <p className="text-sm sm:text-base text-primary-foreground/90">
            Quick reference to Ontario's official driving guide
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-3 sm:px-4 -mt-4">
        {/* Official Handbook Link */}
        <Card className="mb-4 sm:mb-6 bg-gradient-to-br from-primary/10 to-transparent border-primary/30 animate-slide-up">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-base sm:text-lg mb-1">Official Ontario Driver's Handbook</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Access the complete, official handbook from the Ministry of Transportation of Ontario
                </p>
              </div>
              <Button onClick={openOfficialHandbook} className="w-full sm:w-auto gap-2">
                Open Handbook
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Search */}
        <Card className="mb-4 sm:mb-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <CardContent className="p-4 sm:p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search topics (e.g., speed limit, yield, parking...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            {searchQuery && (
              <p className="mt-2 text-xs text-muted-foreground">
                {filteredTopics.reduce((sum, topic) => sum + topic.sections.length, 0)} results found
              </p>
            )}
          </CardContent>
        </Card>

        {/* Topics */}
        <div className="space-y-3 sm:space-y-4">
          {filteredTopics.length === 0 ? (
            <Card className="animate-slide-up">
              <CardContent className="p-6 sm:p-8 text-center">
                <p className="text-muted-foreground">No topics found matching "{searchQuery}"</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchQuery("")}
                  className="mt-3"
                >
                  Clear search
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredTopics.map((topic, index) => (
              <Card
                key={topic.title}
                className="animate-slide-up hover:shadow-lg transition-shadow"
                style={{ animationDelay: `${0.1 + index * 0.05}s` }}
              >
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                    {topic.icon}
                    {topic.title}
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    {topic.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="space-y-2">
                    {topic.sections.map((section) => (
                      <div
                        key={section.name}
                        className="flex items-center justify-between p-2.5 sm:p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <span className="text-xs sm:text-sm font-medium">{section.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {section.keywords.length} topics
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Help Text */}
        <Card className="mt-4 sm:mt-6 bg-accent/5 border-accent/20 animate-slide-up" style={{ animationDelay: "0.5s" }}>
          <CardContent className="p-4 sm:p-6">
            <p className="text-xs sm:text-sm text-muted-foreground">
              💡 <strong>Tip:</strong> Use the search bar above to quickly find information about specific topics. 
              When you encounter a confusing question, search for the related topic to learn more from the official handbook.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Handbook;
