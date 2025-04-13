
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";

interface TechCardProps {
  title: string;
  description: string;
  keyFeatures: string[];
  icon: React.ReactNode;
  learnMoreUrl: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function TechCard({ title, description, keyFeatures, icon, learnMoreUrl, className, style }: TechCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className={`transition-all duration-300 hover:shadow-lg border border-border/60 h-full ${className || ''}`} 
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="space-y-1">
        <div className="flex items-center space-x-2">
          <div className={`text-primary h-8 w-8 transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}>
            {icon}
          </div>
          <CardTitle className="text-2xl">{title}</CardTitle>
        </div>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Collapsible 
          open={isExpanded} 
          onOpenChange={setIsExpanded}
          className="transition-all duration-300"
        >
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-muted-foreground">Key Features</h4>
            <CollapsibleContent className="overflow-hidden space-y-1">
              <ul className="list-disc pl-5 space-y-1">
                {keyFeatures.map((feature, index) => (
                  <li key={index} className="text-sm animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>{feature}</li>
                ))}
              </ul>
            </CollapsibleContent>
            {!isExpanded && (
              <ul className="list-disc pl-5 space-y-1 max-h-[70px] overflow-hidden">
                {keyFeatures.slice(0, 2).map((feature, index) => (
                  <li key={index} className="text-sm">{feature}</li>
                ))}
                {keyFeatures.length > 2 && <li className="text-sm text-muted-foreground italic">...and {keyFeatures.length - 2} more</li>}
              </ul>
            )}
          </div>
          <CollapsibleTrigger asChild className="mt-2">
            <Button variant="ghost" className="w-full flex justify-center items-center gap-1 py-1">
              {isExpanded ? (
                <>
                  <ChevronUp className="h-4 w-4" />
                  <span>Show Less</span>
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4" />
                  <span>Show More</span>
                </>
              )}
            </Button>
          </CollapsibleTrigger>
        </Collapsible>
      </CardContent>
      <CardFooter className="pt-0">
        <Button 
          variant="outline" 
          onClick={() => window.open(learnMoreUrl, '_blank')}
          className="w-full hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
        >
          Learn More
        </Button>
      </CardFooter>
    </Card>
  );
}
