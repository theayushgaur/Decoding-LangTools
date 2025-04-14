import { MessagesSquare, Box, Wrench } from "lucide-react";
import StepCard from "@/components/StepCard";
import CodeSnippet from "@/components/CodeSnippet";

// Import code snippets from a central location
import { codeSnippets } from "@/utils/codeSnippets";

export default function AgentGuideSection({ isVisible }: { isVisible: boolean }) {
  return (
    <section 
      id="agent-guide" 
      className={`py-16 md:py-24 transition-colors duration-300 bg-background/90 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-foreground">Building Your First Agent</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Follow this step-by-step guide to create a basic agent using LangChain, and see how to extend it with LangGraph and LangSmith.
          </p>
        </div>
        
        <div className="space-y-8">
          <StepCard 
            step={1} 
            title="Set Up Your Environment" 
            description="Install the necessary packages and set up your environment."
            className="hover-lift animate-slide-in-left border-primary/20 shadow-md"
          >
            <CodeSnippet 
              code={codeSnippets.installationCode} 
              language="bash" 
              title="Installation"
            />
            <p className="mt-4 text-sm text-foreground">
              You'll also need to set up your API keys for the language model (e.g., OpenAI) and LangSmith if you're using it.
            </p>
            <div className="mt-4 p-4 bg-secondary/30 rounded-lg border border-secondary">
              <h4 className="font-medium mb-2 flex items-center gap-2 text-foreground">
                <Wrench className="h-5 w-5 text-primary" />
                API Keys Setup
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="text-foreground">
                  <strong>OpenAI API Key:</strong>
                  <pre className="bg-muted p-2 rounded mt-1 overflow-x-auto">
                    export OPENAI_API_KEY="your-api-key-here"
                  </pre>
                </div>
                <div className="text-foreground">
                  <strong>LangSmith API Key:</strong>
                  <pre className="bg-muted p-2 rounded mt-1 overflow-x-auto">
                    export LANGCHAIN_API_KEY="your-langsmith-key"
                  </pre>
                </div>
              </div>
            </div>
          </StepCard>
          
          <StepCard 
            step={2} 
            title="Create a Basic LangChain Agent" 
            description="Build a simple agent using LangChain's ReAct framework."
            className="hover-lift animate-slide-in-right border-primary/20 shadow-md"
          >
            <CodeSnippet 
              code={codeSnippets.basicAgentCode} 
              language="python" 
              title="Basic LangChain Agent"
            />
            <div className="mt-4 p-4 bg-secondary/30 rounded-lg border border-secondary">
              <h4 className="font-medium mb-2 flex items-center gap-2 text-foreground">
                <MessagesSquare className="h-5 w-5 text-primary" />
                What's happening here?
              </h4>
              <ol className="list-decimal pl-5 space-y-1 text-sm text-foreground">
                <li>We define an LLM (ChatOpenAI) that will power our agent</li>
                <li>We provide a tool (DuckDuckGo search) that the agent can use</li>
                <li>We create a prompt that follows the ReAct framework (Reasoning, Action, Observation)</li>
                <li>We create the agent and an executor to run it</li>
                <li>We invoke the agent with a query</li>
              </ol>
            </div>
            
            <div className="mt-6 p-4 border border-primary/20 rounded-lg bg-primary/5">
              <h4 className="font-medium mb-2 text-foreground">Understanding the ReAct Framework</h4>
              <p className="text-sm text-foreground">
                The ReAct framework (Reasoning + Acting) is a powerful approach that enables LLMs to solve complex tasks by interleaving reasoning steps with actions. This framework helps the agent:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-foreground">
                <li><strong>Think step-by-step</strong> about the problem</li>
                <li><strong>Use tools</strong> to gather information</li>
                <li><strong>Observe</strong> the results of tool usage</li>
                <li><strong>Reason</strong> about these observations</li>
                <li><strong>Formulate</strong> a final answer based on reasoning and observations</li>
              </ul>
            </div>
          </StepCard>
          
          <StepCard 
            step={3} 
            title="Upgrade to a LangGraph Agent" 
            description="Enhance your agent with stateful workflow management using LangGraph."
            className="hover-lift animate-slide-in-left border-primary/20 shadow-md"
          >
            <CodeSnippet 
              code={codeSnippets.langGraphAgentCode} 
              language="python" 
              title="LangGraph Agent"
            />
            <div className="mt-4 p-4 bg-secondary/30 rounded-lg border border-secondary">
              <h4 className="font-medium mb-2 flex items-center gap-2 text-foreground">
                <Box className="h-5 w-5 text-primary" />
                Key Differences from LangChain:
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-sm text-foreground">
                <li>Uses a graph structure with states and transitions</li>
                <li>Supports conditional routing between different nodes</li>
                <li>Maintains state between steps explicitly</li>
                <li>Allows for cyclic execution patterns</li>
                <li>Enables more complex multi-agent systems</li>
              </ul>
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg hover-lift bg-card text-card-foreground">
                <h4 className="font-medium mb-2 text-foreground">When to Use LangGraph</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-foreground">
                  <li>For multi-agent systems where agents need to communicate</li>
                  <li>When you need branching logic based on agent outputs</li>
                  <li>For workflows that require cycles or loops</li>
                  <li>When maintaining conversation state is critical</li>
                  <li>For implementing complex reasoning patterns</li>
                </ul>
              </div>
              
              <div className="p-4 border rounded-lg hover-lift bg-card text-card-foreground">
                <h4 className="font-medium mb-2 text-foreground">Advanced Concepts</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-foreground">
                  <li><strong>State Management</strong>: Explicitly tracking and updating state</li>
                  <li><strong>Node Types</strong>: Different types of processing units in the graph</li>
                  <li><strong>Conditional Edges</strong>: Dynamic routing based on state</li>
                  <li><strong>Cyclic Patterns</strong>: Allowing loops for iterative refinement</li>
                  <li><strong>Parallel Execution</strong>: Running multiple nodes simultaneously</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium mb-2 text-foreground">Example: Multi-Agent System with LangGraph</h4>
              <CodeSnippet 
                code={codeSnippets.multiAgentExample} 
                language="python" 
                title="Multi-Agent Collaboration"
              />
            </div>
          </StepCard>
          
          <StepCard 
            step={4} 
            title="Add Monitoring with LangSmith" 
            description="Debug and improve your agent with LangSmith tracing and observability."
            className="hover-lift animate-slide-in-right border-primary/20 shadow-md"
          >
            <CodeSnippet 
              code={codeSnippets.langSmithCode} 
              language="python" 
              title="Basic LangSmith Integration"
            />
            <p className="mt-4 text-sm text-foreground">
              After implementing this code, you can view detailed traces of your agent's execution in the LangSmith dashboard.
            </p>
            
            <div className="mt-6">
              <h4 className="font-medium mb-2 text-foreground">Advanced LangSmith Features</h4>
              <CodeSnippet 
                code={codeSnippets.advancedLangSmithCode} 
                language="python" 
                title="Advanced LangSmith Monitoring"
              />
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg hover-lift bg-card text-card-foreground">
                <h4 className="font-medium mb-2 text-foreground">Key LangSmith Features</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-foreground">
                  <li><strong>Tracing</strong>: Visualize the execution of chains and agents</li>
                  <li><strong>Evaluation</strong>: Assess performance using automated metrics</li>
                  <li><strong>Feedback</strong>: Collect human feedback on model outputs</li>
                  <li><strong>Datasets</strong>: Create and manage test cases for your application</li>
                  <li><strong>Cost Analysis</strong>: Track token usage and API costs</li>
                </ul>
              </div>
              
              <div className="p-4 border rounded-lg hover-lift bg-card text-card-foreground">
                <h4 className="font-medium mb-2 text-foreground">Best Practices</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-foreground">
                  <li>Use tags to categorize different types of runs</li>
                  <li>Include metadata to provide context for debugging</li>
                  <li>Create datasets from production queries for testing</li>
                  <li>Implement custom evaluators for domain-specific metrics</li>
                  <li>Set up monitoring for critical production applications</li>
                </ul>
              </div>
            </div>
          </StepCard>
          
          <StepCard 
            step={5} 
            title="Building a Production-Ready Agent" 
            description="Scale your agent for real-world usage with advanced patterns and optimizations."
            className="hover-lift animate-zoom-in border-primary/20 shadow-md"
          >
            <CodeSnippet 
              code={codeSnippets.advancedAgentCode} 
              language="python" 
              title="Advanced Agent Implementation"
            />
            
            <div className="mt-6 p-4 border border-primary/20 rounded-lg bg-primary/5">
              <h4 className="font-medium mb-2 text-foreground">Production Considerations</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="text-foreground">
                  <h5 className="font-medium">1. Error Handling</h5>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>Implement robust error catching</li>
                    <li>Add fallback mechanisms</li>
                    <li>Use retry logic for temporary failures</li>
                  </ul>
                </div>
                <div className="text-foreground">
                  <h5 className="font-medium">2. Performance</h5>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>Cache common queries and responses</li>
                    <li>Use streaming for better UX</li>
                    <li>Implement rate limiting</li>
                  </ul>
                </div>
                <div className="text-foreground">
                  <h5 className="font-medium">3. Security</h5>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>Validate and sanitize inputs</li>
                    <li>Implement tool usage guardrails</li>
                    <li>Audit and log sensitive operations</li>
                  </ul>
                </div>
                <div className="text-foreground">
                  <h5 className="font-medium">4. Monitoring</h5>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>Set up alerts for failures</li>
                    <li>Monitor performance metrics</li>
                    <li>Track usage patterns</li>
                  </ul>
                </div>
              </div>
            </div>
          </StepCard>
        </div>
      </div>
    </section>
  );
}
