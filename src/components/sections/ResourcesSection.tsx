
import { BookOpen, Code, Sparkles, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function ResourcesSection({ isVisible }: { isVisible: boolean }) {
  return (
    <section id="resources" className={`py-16 md:py-24 bg-muted/30 transition-colors duration-300 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Additional Resources</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Explore these resources to deepen your understanding of the LangChain ecosystem.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover-lift animate-slide-in-left" style={{animationDelay: '0.1s'}}>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Official Documentation
              </h3>
              <ul className="space-y-2">
                <li><a href="https://python.langchain.com/docs/get_started" className="text-primary hover:underline flex items-center gap-1" target="_blank" rel="noopener noreferrer">
                  <ArrowRight className="h-3 w-3" /> LangChain Documentation
                </a></li>
                <li><a href="https://python.langchain.com/docs/langgraph" className="text-primary hover:underline flex items-center gap-1" target="_blank" rel="noopener noreferrer">
                  <ArrowRight className="h-3 w-3" /> LangGraph Documentation
                </a></li>
                <li><a href="https://docs.smith.langchain.com/" className="text-primary hover:underline flex items-center gap-1" target="_blank" rel="noopener noreferrer">
                  <ArrowRight className="h-3 w-3" /> LangSmith Documentation
                </a></li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="hover-lift animate-slide-in-left" style={{animationDelay: '0.3s'}}>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                Tutorials and Examples
              </h3>
              <ul className="space-y-2">
                <li><a href="https://python.langchain.com/docs/use_cases/question_answering/" className="text-primary hover:underline flex items-center gap-1" target="_blank" rel="noopener noreferrer">
                  <ArrowRight className="h-3 w-3" /> Question Answering with Sources
                </a></li>
                <li><a href="https://python.langchain.com/docs/modules/agents/quick_start" className="text-primary hover:underline flex items-center gap-1" target="_blank" rel="noopener noreferrer">
                  <ArrowRight className="h-3 w-3" /> Agent Quick Start Guide
                </a></li>
                <li><a href="https://python.langchain.com/docs/langgraph/how_to" className="text-primary hover:underline flex items-center gap-1" target="_blank" rel="noopener noreferrer">
                  <ArrowRight className="h-3 w-3" /> LangGraph How-to Guides
                </a></li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="hover-lift animate-slide-in-left" style={{animationDelay: '0.5s'}}>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Community Resources
              </h3>
              <ul className="space-y-2">
                <li><a href="https://github.com/langchain-ai/langchain" className="text-primary hover:underline flex items-center gap-1" target="_blank" rel="noopener noreferrer">
                  <ArrowRight className="h-3 w-3" /> LangChain GitHub Repository
                </a></li>
                <li><a href="https://discord.gg/6adMQxSpJS" className="text-primary hover:underline flex items-center gap-1" target="_blank" rel="noopener noreferrer">
                  <ArrowRight className="h-3 w-3" /> LangChain Discord Community
                </a></li>
                <li><a href="https://www.youtube.com/c/LangChain" className="text-primary hover:underline flex items-center gap-1" target="_blank" rel="noopener noreferrer">
                  <ArrowRight className="h-3 w-3" /> LangChain YouTube Channel
                </a></li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-12 p-6 border rounded-lg bg-card animate-zoom-in">
          <h3 className="text-xl font-bold mb-4">Recommended Learning Path</h3>
          <ol className="list-decimal pl-6 space-y-4">
            <li className="pl-2">
              <strong>Start with LangChain Basics</strong>
              <p className="mt-1 text-sm text-muted-foreground">Learn the fundamentals of LangChain components like prompts, models, and chains.</p>
            </li>
            <li className="pl-2">
              <strong>Build Simple Agents</strong>
              <p className="mt-1 text-sm text-muted-foreground">Create basic agents that can use tools and follow a specific reasoning pattern.</p>
            </li>
            <li className="pl-2">
              <strong>Explore LangGraph</strong>
              <p className="mt-1 text-sm text-muted-foreground">Learn how to create more complex, stateful workflows using LangGraph.</p>
            </li>
            <li className="pl-2">
              <strong>Integrate LangSmith</strong>
              <p className="mt-1 text-sm text-muted-foreground">Add observability and evaluation to your agents to improve their performance.</p>
            </li>
            <li className="pl-2">
              <strong>Advanced Patterns</strong>
              <p className="mt-1 text-sm text-muted-foreground">Explore multi-agent systems, custom tools, and production deployment patterns.</p>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
