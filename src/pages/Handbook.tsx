import { useState, Children, isValidElement } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  BookOpen,
  Search,
  ExternalLink,
  FileText,
  Car,
  AlertTriangle,
  Navigation,
  Users,
  Shield,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ReactMarkdown from "react-markdown";
import { handbookTopics, type HandbookTopic } from "../data/handbookTopics";

const getTextFromChildren = (text: React.ReactNode) => {
  return typeof text === "number"
    ? String(text)
    : Array.isArray(text)
      ? text.join("\n")
      : React.isValidElement(text)
        ? Children.map(text, (child) => getTextFromChildren(child))
        : String(text);
};

const HighlightedText = ({ text, searchQuery }: { text: React.ReactNode; searchQuery: string }) => {
  console.log({ text });
  if (!searchQuery.trim()) {
    return <>{text}</>;
  }

  const txt = getTextFromChildren(text);
  const parts = txt.split(new RegExp(`(${searchQuery})`, "gi"));

  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === searchQuery.toLowerCase() ? (
          <mark key={index} className="bg-yellow-300 dark:bg-yellow-600 text-foreground rounded px-0.5">
            {part}
          </mark>
        ) : (
          <span key={index}>{part}</span>
        ),
      )}
    </>
  );
};

const RenderIcon = ({ iconName }: { iconName: string }) => {
  switch (iconName) {
    case "ArrowLeft":
      return <ArrowLeft className="w-5 h-5" />;
    case "BookOpen":
      return <BookOpen className="w-5 h-5" />;
    case "Search":
      return <Search className="w-5 h-5" />;
    case "ExternalLink":
      return <ExternalLink className="w-5 h-5" />;
    case "FileText":
      return <FileText className="w-5 h-5" />;
    case "Car":
      return <Car className="w-5 h-5" />;
    case "AlertTriangle":
      return <AlertTriangle className="w-5 h-5" />;
    case "Navigation":
      return <Navigation className="w-5 h-5" />;
    case "Users":
      return <Users className="w-5 h-5" />;
    case "Shield":
      return <Shield className="w-5 h-5" />;
    default:
      return <Car className="w-5 h-5" />;
  }
};

const Handbook = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTopics = handbookTopics
    .map((topic) => {
      if (!searchQuery) return topic;

      const query = searchQuery.toLowerCase();
      const matchingSections = topic.sections.filter(
        (section) =>
          section.name.toLowerCase().includes(query) ||
          section.keywords.some((keyword) => keyword.toLowerCase().includes(query)) ||
          section.content.toLowerCase().includes(query),
      );

      return matchingSections.length > 0 ? { ...topic, sections: matchingSections } : null;
    })
    .filter(Boolean) as HandbookTopic[];

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
                <Button variant="outline" size="sm" onClick={() => setSearchQuery("")} className="mt-3">
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
                    <RenderIcon iconName={topic.icon} />
                    {topic.title}
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">{topic.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <Accordion type="single" collapsible className="space-y-2">
                    {topic.sections.map((section, sectionIndex) => (
                      <AccordionItem
                        key={section.name}
                        value={`${topic.title}-${sectionIndex}`}
                        className="border rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors px-3"
                      >
                        <AccordionTrigger className="text-xs sm:text-sm font-medium hover:no-underline py-3">
                          <div className="flex items-center justify-between w-full pr-2">
                            <span>{section.name}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-xs sm:text-sm text-muted-foreground pb-3 pt-1">
                          <div className="prose prose-sm dark:prose-invert max-w-none leading-relaxed">
                            <ReactMarkdown
                              components={{
                                p: ({ children }) => (
                                  <p>
                                    <HighlightedText text={children} searchQuery={searchQuery} />
                                  </p>
                                ),
                                li: ({ children }) => (
                                  <li>
                                    <HighlightedText text={children} searchQuery={searchQuery} />
                                  </li>
                                ),
                                strong: ({ children }) => (
                                  <strong>
                                    <HighlightedText text={children} searchQuery={searchQuery} />
                                  </strong>
                                ),
                                em: ({ children }) => (
                                  <em>
                                    <HighlightedText text={children} searchQuery={searchQuery} />
                                  </em>
                                ),
                              }}
                            >
                              {section.content}
                            </ReactMarkdown>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Help Text */}
        <Card className="mt-4 sm:mt-6 bg-accent/5 border-accent/20 animate-slide-up" style={{ animationDelay: "0.5s" }}>
          <CardContent className="p-4 sm:p-6">
            <p className="text-xs sm:text-sm text-muted-foreground">
              💡 <strong>Tip:</strong> Use the search bar above to quickly find information about specific topics. When
              you encounter a confusing question, search for the related topic to learn more from the official handbook.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Handbook;
