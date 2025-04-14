import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RetroGrid as UIRetroGrid } from "@/components/ui/retro-grid";
import { useIsMobile } from "@/hooks/use-mobile";

export default function HeroSection() {
  const isMobile = useIsMobile();
  
  return (
    <UIRetroGrid 
      className="py-12 md:py-20 bg-gradient-to-b from-secondary/40 to-background transition-colors duration-300"
      gridOpacity={0.1}
    >
      <div className="container px-4 md:px-6 relative z-10 pt-8 md:pt-6">
        <div className="flex flex-col items-center text-center space-y-4 md:space-y-5 max-w-3xl mx-auto">
          <h1 className="text-2xl md:text-4xl font-bold gradient-heading leading-tight animate-pulse-slow px-2 md:px-0 pt-6 md:pt-2">
            Understanding the LangChain Ecosystem
          </h1>
          <p className="text-sm md:text-lg text-muted-foreground max-w-lg md:max-w-2xl animate-fade-in px-3 md:px-0 pb-3 md:pb-2">
            Explore the differences between LangChain, LangGraph, and LangSmith while learning to build powerful AI agents seamlessly integrated with Flutter.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 animate-fade-in w-full px-6 md:px-0 md:w-auto py-2" style={{animationDelay: '0.3s'}}>
            <Button 
              size="lg"
              onClick={() => document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' })} 
              className="hover-lift hover-shine text-sm md:text-base w-full sm:w-auto"
            >
              Get Started <ArrowRight className="ml-1 h-3 w-3 md:h-4 md:w-4" />
            </Button>
            <Button 
              size="lg"
              variant="outline" 
              onClick={() => document.getElementById('agent-guide')?.scrollIntoView({ behavior: 'smooth' })} 
              className="hover-lift hover-shine text-sm md:text-base w-full sm:w-auto"
            >
              Build an Agent
            </Button>
          </div>
        </div>
      </div>
    </UIRetroGrid>
  );
}
