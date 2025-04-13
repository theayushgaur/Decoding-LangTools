
import { Code, Star, Lightbulb, MousePointer, Database, Braces, Brain, Info, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ComparisonTable from "@/components/ComparisonTable";

export default function ComparisonSection({ isVisible }: { isVisible: boolean }) {
  return (
    <section id="comparison" className={`py-16 md:py-24 bg-muted/30 transition-colors duration-300 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How They Compare</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Understanding when to use each technology is key to building effective LLM applications.
          </p>
        </div>
        
        <ComparisonTable />
        
        <div className="mt-12 p-6 border rounded-lg bg-card animate-zoom-in shadow-md">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Star className="h-5 w-5 text-primary animate-pulse-slow" />
            Key Takeaways
          </h3>
          <ul className="list-none pl-1 space-y-4 text-card-foreground">
            <li className="flex items-start gap-3 p-3 hover:bg-muted/30 rounded-lg transition-colors duration-300 cursor-pointer">
              <div className="bg-primary/10 p-2 rounded-full">
                <Star className="h-5 w-5 text-primary" />
              </div>
              <div>
                <strong className="text-lg">LangChain</strong> is your foundation for building LLM applications with reusable components
                <div className="mt-1 text-sm text-muted-foreground flex items-center gap-1">
                  <Info className="h-3.5 w-3.5" />
                  <span>Perfect for individual agents and basic applications</span>
                </div>
              </div>
            </li>
            
            <li className="flex items-start gap-3 p-3 hover:bg-muted/30 rounded-lg transition-colors duration-300 cursor-pointer">
              <div className="bg-primary/10 p-2 rounded-full">
                <Lightbulb className="h-5 w-5 text-primary" />
              </div>
              <div>
                <strong className="text-lg">LangGraph</strong> extends LangChain when you need stateful, complex agent workflows
                <div className="mt-1 text-sm text-muted-foreground flex items-center gap-1">
                  <Info className="h-3.5 w-3.5" />
                  <span>Enable multi-agent systems with sophisticated state management</span>
                </div>
              </div>
            </li>
            
            <li className="flex items-start gap-3 p-3 hover:bg-muted/30 rounded-lg transition-colors duration-300 cursor-pointer">
              <div className="bg-primary/10 p-2 rounded-full">
                <MousePointer className="h-5 w-5 text-primary" />
              </div>
              <div>
                <strong className="text-lg">LangSmith</strong> helps you debug, monitor, and improve your applications
                <div className="mt-1 text-sm text-muted-foreground flex items-center gap-1">
                  <Info className="h-3.5 w-3.5" />
                  <span>Works with both LangChain and LangGraph for complete visibility</span>
                </div>
              </div>
            </li>
            
            <li className="flex items-start gap-3 p-3 hover:bg-muted/30 rounded-lg transition-colors duration-300 cursor-pointer">
              <div className="bg-primary/10 p-2 rounded-full">
                <Code className="h-5 w-5 text-primary" />
              </div>
              <div>
                <strong className="text-lg">Combined Ecosystem</strong> provides the most powerful and maintainable agent systems
                <div className="mt-1 text-sm text-muted-foreground flex items-center gap-1">
                  <Info className="h-3.5 w-3.5" />
                  <span>Leverage all three technologies for production-grade applications</span>
                </div>
              </div>
            </li>
          </ul>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 hover-lift flex flex-col items-center text-center hover:border-primary/30 transition-colors duration-300 hover:bg-primary/5 cursor-pointer">
              <div className="bg-primary/10 p-2 rounded-full mb-2">
                <Database className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-medium">Start with LangChain</h4>
              <p className="text-sm text-muted-foreground mt-2">
                For simple applications and individual agents that need basic LLM interactions and tool use.
              </p>
              <Button variant="link" size="sm" className="mt-2" onClick={() => window.open("https://python.langchain.com/docs/get_started", "_blank")}>
                <span>Learn More</span>
                <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
            </Card>
            
            <Card className="p-4 hover-lift flex flex-col items-center text-center hover:border-primary/30 transition-colors duration-300 hover:bg-primary/5 cursor-pointer">
              <div className="bg-primary/10 p-2 rounded-full mb-2">
                <Braces className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-medium">Add LangGraph</h4>
              <p className="text-sm text-muted-foreground mt-2">
                When you need complex state management, multi-agent systems, and sophisticated workflows.
              </p>
              <Button variant="link" size="sm" className="mt-2" onClick={() => window.open("https://python.langchain.com/docs/langgraph", "_blank")}>
                <span>Learn More</span>
                <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
            </Card>
            
            <Card className="p-4 hover-lift flex flex-col items-center text-center hover:border-primary/30 transition-colors duration-300 hover:bg-primary/5 cursor-pointer">
              <div className="bg-primary/10 p-2 rounded-full mb-2">
                <Brain className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-medium">Use LangSmith</h4>
              <p className="text-sm text-muted-foreground mt-2">
                Throughout development for debugging, evaluating, and monitoring your LLM applications.
              </p>
              <Button variant="link" size="sm" className="mt-2" onClick={() => window.open("https://smith.langchain.com/", "_blank")}>
                <span>Learn More</span>
                <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
