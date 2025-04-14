
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RetroGrid } from "@/components/ui/retro-grid";
import { useIsMobile } from "@/hooks/use-mobile";

export default function HeroSection() {
  const isMobile = useIsMobile();
  
  return (
    <RetroGrid 
      className="py-12 md:py-16 bg-gradient-to-b from-secondary/40 to-background transition-colors duration-300"
      gridOpacity={0.1}
    >
      <div className="container px-3 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center space-y-3 md:space-y-5 max-w-3xl mx-auto">
          <h1 className="text-2xl md:text-4xl font-bold gradient-heading leading-tight animate-pulse-slow">
            Understanding the LangChain Ecosystem
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl animate-fade-in">
            Explore the differences between LangChain, LangGraph, and LangSmith and learn how to build powerful AI agents.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 mt-4 animate-fade-in" style={{animationDelay: '0.3s'}}>
            <Button 
              size={isMobile ? "default" : "lg"} 
              onClick={() => document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' })} 
              className="hover-lift hover-shine"
            >
              Get Started <ArrowRight className="ml-1 h-3 w-3 md:h-4 md:w-4" />
            </Button>
            <Button 
              size={isMobile ? "default" : "lg"} 
              variant="outline" 
              onClick={() => document.getElementById('agent-guide')?.scrollIntoView({ behavior: 'smooth' })} 
              className="hover-lift hover-shine"
            >
              Build an Agent
            </Button>
          </div>
        </div>
      </div>
    </RetroGrid>
  );
}
