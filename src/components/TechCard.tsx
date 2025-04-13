
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

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

  return (
    <Card className={`transition-all duration-300 hover:shadow-lg border border-border/60 h-full ${className || ''}`} style={style}>
      <CardHeader className="space-y-1">
        <div className="flex items-center space-x-2">
          <div className="text-primary h-8 w-8">
            {icon}
          </div>
          <CardTitle className="text-2xl">{title}</CardTitle>
        </div>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className={`space-y-2 transition-all duration-300 ${isExpanded ? 'max-h-[500px]' : 'max-h-[100px] overflow-hidden'}`}>
          <h4 className="font-medium text-sm text-muted-foreground">Key Features</h4>
          <ul className="list-disc pl-5 space-y-1">
            {keyFeatures.map((feature, index) => (
              <li key={index} className="text-sm">{feature}</li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? 'Show Less' : 'Show More'}
        </Button>
        <Button variant="outline" onClick={() => window.open(learnMoreUrl, '_blank')}>
          Learn More
        </Button>
      </CardFooter>
    </Card>
  );
}
