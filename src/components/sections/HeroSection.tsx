
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RetroGrid } from "@/components/ui/retro-grid";

export default function HeroSection() {
  return (
    <RetroGrid 
      className="py-20 bg-gradient-to-b from-secondary/40 to-background transition-colors duration-300"
      gridOpacity={0.1}
    >
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center space-y-4 md:space-y-6 max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold gradient-heading leading-tight animate-pulse-slow">
            Understanding the LangChain Ecosystem
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl animate-fade-in">
            Explore the differences between LangChain, LangGraph, and LangSmith and learn how to build powerful AI agents.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-6 animate-fade-in" style={{animationDelay: '0.3s'}}>
            <Button size="lg" onClick={() => document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' })} className="hover-lift hover-shine">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => document.getElementById('agent-guide')?.scrollIntoView({ behavior: 'smooth' })} className="hover-lift hover-shine">
              Build an Agent
            </Button>
          </div>
        </div>
      </div>
    </RetroGrid>
  );
}
