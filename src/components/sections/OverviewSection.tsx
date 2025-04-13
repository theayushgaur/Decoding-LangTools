
import { useState } from 'react';
import { BookOpen, GitBranch, LineChart, Sparkles, CheckCircle, AlertCircle, ChevronUp, ChevronDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import TechCard from "@/components/TechCard";

export default function OverviewSection({ isVisible }: { isVisible: boolean }) {
  const [expandedSections, setExpandedSections] = useState({
    rapidDevelopment: false,
    modularArchitecture: false,
    modelAgnostic: false,
    observability: false,
    hallucinations: false,
    promptEngineering: false,
    debugging: false,
    costManagement: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev]
    }));
  };

  return (
    <section id="overview" className={`py-16 md:py-24 transition-colors duration-300 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What is the LangChain Ecosystem?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            The LangChain ecosystem consists of three main technologies that work together to help you build, orchestrate, and monitor LLM-powered applications.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <TechCard 
            title="LangChain" 
            description="A framework for developing applications powered by language models through composable components."
            keyFeatures={[
              "Chains for combining multiple components",
              "Agents for dynamic tool use",
              "Memory for contextual conversations",
              "Document loaders and retrievers for RAG",
              "Prompt management and templating",
              "Integration with 100+ tools and APIs"
            ]}
            icon={<BookOpen className="h-8 w-8 animate-float" />}
            learnMoreUrl="https://www.langchain.com/"
            className="hover-lift animate-slide-in-left"
            style={{animationDelay: '0.1s'}}
          />
          
          <TechCard 
            title="LangGraph" 
            description="An extension of LangChain that allows for complex, stateful multi-agent workflows."
            keyFeatures={[
              "Graph-based orchestration for agents",
              "Persistent state management",
              "Cyclic execution patterns",
              "Conditional routing logic",
              "Event-driven architecture",
              "Support for parallel execution"
            ]}
            icon={<GitBranch className="h-8 w-8 animate-float" />}
            learnMoreUrl="https://python.langchain.com/docs/langgraph"
            className="hover-lift animate-slide-in-left"
            style={{animationDelay: '0.3s'}}
          />
          
          <TechCard 
            title="LangSmith" 
            description="A developer platform for debugging, testing, evaluating, and monitoring LLM applications."
            keyFeatures={[
              "Detailed tracing of chains and agents",
              "Analysis of cost, latency, and token usage",
              "A/B testing of prompts and models",
              "Dataset creation and management",
              "Human feedback collection",
              "Performance monitoring and alerting"
            ]}
            icon={<LineChart className="h-8 w-8 animate-float" />}
            learnMoreUrl="https://smith.langchain.com/"
            className="hover-lift animate-slide-in-left"
            style={{animationDelay: '0.5s'}}
          />
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="hover-lift animate-slide-in-left bg-card text-card-foreground" style={{animationDelay: '0.7s'}}>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary animate-pulse-slow" />
                Key Benefits
              </h3>
              <ul className="space-y-3">
                <li>
                  <Collapsible open={expandedSections.rapidDevelopment}>
                    <CollapsibleTrigger 
                      className="flex items-start gap-2 w-full text-left cursor-pointer hover:bg-muted/40 p-2 rounded-md transition-colors"
                      onClick={() => toggleSection('rapidDevelopment')}
                    >
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div className="flex justify-between w-full items-center">
                        <span className="font-medium">Rapid Development</span>
                        {expandedSections.rapidDevelopment ? 
                          <ChevronUp className="h-4 w-4 text-muted-foreground" /> : 
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        }
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-7 pr-2 pt-2 text-muted-foreground animate-fade-in">
                      Build complex LLM applications in days instead of months with pre-built components, templates,
                      and integration patterns. Save development time by leveraging the ecosystem's standardized interfaces.
                    </CollapsibleContent>
                  </Collapsible>
                </li>
                
                <li>
                  <Collapsible open={expandedSections.modularArchitecture}>
                    <CollapsibleTrigger 
                      className="flex items-start gap-2 w-full text-left cursor-pointer hover:bg-muted/40 p-2 rounded-md transition-colors"
                      onClick={() => toggleSection('modularArchitecture')}
                    >
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div className="flex justify-between w-full items-center">
                        <span className="font-medium">Modular Architecture</span>
                        {expandedSections.modularArchitecture ? 
                          <ChevronUp className="h-4 w-4 text-muted-foreground" /> : 
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        }
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-7 pr-2 pt-2 text-muted-foreground animate-fade-in">
                      Swap components without rewriting your entire application. Change LLM providers, 
                      memory implementations, or tools with minimal code changes. This flexibility allows 
                      for rapid experimentation and optimization.
                    </CollapsibleContent>
                  </Collapsible>
                </li>
                
                <li>
                  <Collapsible open={expandedSections.modelAgnostic}>
                    <CollapsibleTrigger 
                      className="flex items-start gap-2 w-full text-left cursor-pointer hover:bg-muted/40 p-2 rounded-md transition-colors"
                      onClick={() => toggleSection('modelAgnostic')}
                    >
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div className="flex justify-between w-full items-center">
                        <span className="font-medium">Model Agnostic</span>
                        {expandedSections.modelAgnostic ? 
                          <ChevronUp className="h-4 w-4 text-muted-foreground" /> : 
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        }
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-7 pr-2 pt-2 text-muted-foreground animate-fade-in">
                      Use any LLM provider (OpenAI, Anthropic, Llama, etc.) with the same application logic.
                      Switch between different models to find the best balance of cost, performance, and capabilities
                      for your specific use case.
                    </CollapsibleContent>
                  </Collapsible>
                </li>
                
                <li>
                  <Collapsible open={expandedSections.observability}>
                    <CollapsibleTrigger 
                      className="flex items-start gap-2 w-full text-left cursor-pointer hover:bg-muted/40 p-2 rounded-md transition-colors"
                      onClick={() => toggleSection('observability')}
                    >
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div className="flex justify-between w-full items-center">
                        <span className="font-medium">Observability</span>
                        {expandedSections.observability ? 
                          <ChevronUp className="h-4 w-4 text-muted-foreground" /> : 
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        }
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-7 pr-2 pt-2 text-muted-foreground animate-fade-in">
                      Debug and optimize your applications with powerful tracing through LangSmith.
                      Understand exactly why your LLM applications behave the way they do, track costs,
                      and identify performance bottlenecks or reasoning failures.
                    </CollapsibleContent>
                  </Collapsible>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="hover-lift animate-slide-in-right bg-card text-card-foreground" style={{animationDelay: '0.7s'}}>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-primary animate-pulse-slow" />
                Common Challenges
              </h3>
              <ul className="space-y-3">
                <li>
                  <Collapsible open={expandedSections.hallucinations}>
                    <CollapsibleTrigger 
                      className="flex items-start gap-2 w-full text-left cursor-pointer hover:bg-muted/40 p-2 rounded-md transition-colors"
                      onClick={() => toggleSection('hallucinations')}
                    >
                      <AlertCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                      <div className="flex justify-between w-full items-center">
                        <span className="font-medium">Hallucinations</span>
                        {expandedSections.hallucinations ? 
                          <ChevronUp className="h-4 w-4 text-muted-foreground" /> : 
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        }
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-7 pr-2 pt-2 text-muted-foreground animate-fade-in">
                      LLMs can generate incorrect information that sounds plausible. Use techniques like
                      Retrieval Augmented Generation (RAG) and fact-checking tools to minimize this risk.
                      LangChain provides tools to ground responses in reliable sources.
                    </CollapsibleContent>
                  </Collapsible>
                </li>
                
                <li>
                  <Collapsible open={expandedSections.promptEngineering}>
                    <CollapsibleTrigger 
                      className="flex items-start gap-2 w-full text-left cursor-pointer hover:bg-muted/40 p-2 rounded-md transition-colors"
                      onClick={() => toggleSection('promptEngineering')}
                    >
                      <AlertCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                      <div className="flex justify-between w-full items-center">
                        <span className="font-medium">Prompt Engineering</span>
                        {expandedSections.promptEngineering ? 
                          <ChevronUp className="h-4 w-4 text-muted-foreground" /> : 
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        }
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-7 pr-2 pt-2 text-muted-foreground animate-fade-in">
                      Creating effective prompts requires expertise and experimentation. LangChain offers prompt
                      templates and optimization tools through LangSmith to help iterate and improve your prompts
                      more quickly based on real performance data.
                    </CollapsibleContent>
                  </Collapsible>
                </li>
                
                <li>
                  <Collapsible open={expandedSections.debugging}>
                    <CollapsibleTrigger 
                      className="flex items-start gap-2 w-full text-left cursor-pointer hover:bg-muted/40 p-2 rounded-md transition-colors"
                      onClick={() => toggleSection('debugging')}
                    >
                      <AlertCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                      <div className="flex justify-between w-full items-center">
                        <span className="font-medium">Debugging</span>
                        {expandedSections.debugging ? 
                          <ChevronUp className="h-4 w-4 text-muted-foreground" /> : 
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        }
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-7 pr-2 pt-2 text-muted-foreground animate-fade-in">
                      Understanding why an LLM application fails can be difficult. LangSmith's tracing capabilities
                      make complex chains and agents transparent by showing each step of reasoning, each tool call,
                      and each intermediate output in a visual debugging interface.
                    </CollapsibleContent>
                  </Collapsible>
                </li>
                
                <li>
                  <Collapsible open={expandedSections.costManagement}>
                    <CollapsibleTrigger 
                      className="flex items-start gap-2 w-full text-left cursor-pointer hover:bg-muted/40 p-2 rounded-md transition-colors"
                      onClick={() => toggleSection('costManagement')}
                    >
                      <AlertCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                      <div className="flex justify-between w-full items-center">
                        <span className="font-medium">Cost Management</span>
                        {expandedSections.costManagement ? 
                          <ChevronUp className="h-4 w-4 text-muted-foreground" /> : 
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        }
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-7 pr-2 pt-2 text-muted-foreground animate-fade-in">
                      API costs can escalate quickly with complex applications. LangChain helps optimize usage
                      with caching mechanisms and token counting, while LangSmith provides detailed cost analysis
                      to identify expensive components and optimize them.
                    </CollapsibleContent>
                  </Collapsible>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
