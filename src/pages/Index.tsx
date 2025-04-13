
import { ArrowRight, BookOpen, Box, GitBranch, LineChart, MessagesSquare } from "lucide-react";
import Header from "@/components/Header";
import TechCard from "@/components/TechCard";
import CodeSnippet from "@/components/CodeSnippet";
import ComparisonTable from "@/components/ComparisonTable";
import StepCard from "@/components/StepCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Code snippets
const installationCode = `pip install langchain langchain-openai langchain-community langgraph langsmith`;

const basicAgentCode = `from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from langchain.agents import AgentExecutor, create_react_agent
from langchain_community.tools import DuckDuckGoSearchRun

# Define the LLM
llm = ChatOpenAI(model="gpt-3.5-turbo")

# Define tools
search_tool = DuckDuckGoSearchRun()
tools = [search_tool]

# Define the prompt template with the ReAct format
prompt = ChatPromptTemplate.from_template("""
You are a helpful assistant. Use the following tools to answer the user's question:
{tools}

Use the following format:
Question: the input question
Thought: you should always think about what to do
Action: the action to take, should be one of [{tool_names}]
Action Input: the input to the action
Observation: the result of the action
... (this Thought/Action/Action Input/Observation can repeat N times)
Thought: I now know the final answer
Final Answer: the final answer to the original user question

Question: {input}
Thought:
""")

# Create the agent
agent = create_react_agent(llm, tools, prompt)

# Create the agent executor
agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

# Run the agent
agent_executor.invoke({"input": "What is the current stock price of Apple?"})`;

const langGraphAgentCode = `from langchain_core.messages import AIMessage, HumanMessage
from langchain_openai import ChatOpenAI
from langgraph.graph import StateGraph, END

# Define the state
class AgentState(TypedDict):
    messages: List[Union[HumanMessage, AIMessage]]
    next: str

# Define the LLM node
def ai_response(state: AgentState) -> AgentState:
    llm = ChatOpenAI(model="gpt-3.5-turbo")
    messages = state["messages"]
    response = llm.invoke(messages)
    return {"messages": messages + [response], "next": "human"}

# Define the human node (in a real app, this would wait for user input)
def human_response(state: AgentState) -> AgentState:
    # For demo purposes, we just end after AI responds
    return {"messages": state["messages"], "next": END}

# Define conditional routing based on who should respond next
def router(state: AgentState) -> str:
    return state["next"]

# Build the graph
graph = StateGraph(AgentState)
graph.add_node("ai", ai_response)
graph.add_node("human", human_response)

# Add conditional edges
graph.add_conditional_edges("", router, {"ai": "ai", "human": "human"})
graph.add_edge("ai", "human")

# Compile the graph
chain = graph.compile()

# Run the conversation
chain.invoke({
    "messages": [HumanMessage(content="Tell me about LangGraph")],
    "next": "ai"
})`;

const langSmithCode = `import os
from langchain import ChatOpenAI
from langsmith import traceable

# Set your LangSmith API key
os.environ["LANGCHAIN_API_KEY"] = "your-langsmith-api-key"
os.environ["LANGCHAIN_TRACING_V2"] = "true"
os.environ["LANGCHAIN_PROJECT"] = "my-agent-project"

# Trace a function
@traceable(run_type="chain")
def process_user_query(query: str) -> str:
    llm = ChatOpenAI(temperature=0)
    response = llm.predict(f"User query: {query}. Respond briefly.")
    return response

# Use the function
result = process_user_query("Explain how LangSmith helps with debugging")
print(result)
`;

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-secondary/40 to-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 md:space-y-6 max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold gradient-heading leading-tight">
              Understanding the LangChain Ecosystem
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              Explore the differences between LangChain, LangGraph, and LangSmith and learn how to build powerful AI agents.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Button size="lg" onClick={() => document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' })}>
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => document.getElementById('agent-guide')?.scrollIntoView({ behavior: 'smooth' })}>
                Build an Agent
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Overview Section */}
      <section id="overview" className="py-16 md:py-24">
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
              icon={<BookOpen className="h-8 w-8" />}
              learnMoreUrl="https://www.langchain.com/"
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
              icon={<GitBranch className="h-8 w-8" />}
              learnMoreUrl="https://python.langchain.com/docs/langgraph"
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
              icon={<LineChart className="h-8 w-8" />}
              learnMoreUrl="https://smith.langchain.com/"
            />
          </div>
        </div>
      </section>
      
      {/* Comparison Section */}
      <section id="comparison" className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How They Compare</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Understanding when to use each technology is key to building effective LLM applications.
            </p>
          </div>
          
          <ComparisonTable />
          
          <div className="mt-12 p-6 border rounded-lg bg-card">
            <h3 className="text-xl font-bold mb-4">Key Takeaways</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>LangChain</strong> is your foundation for building LLM applications with reusable components</li>
              <li><strong>LangGraph</strong> extends LangChain when you need stateful, complex agent workflows</li>
              <li><strong>LangSmith</strong> helps you debug, monitor, and improve your applications, regardless of whether you're using LangChain or LangGraph</li>
              <li>All three can be used together for the most powerful and maintainable agent systems</li>
            </ul>
          </div>
        </div>
      </section>
      
      {/* Agent Guide Section */}
      <section id="agent-guide" className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Building Your First Agent</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Follow this step-by-step guide to create a basic agent using LangChain, and see how to extend it with LangGraph and LangSmith.
            </p>
          </div>
          
          <div className="space-y-8">
            <StepCard 
              step={1} 
              title="Set Up Your Environment" 
              description="Install the necessary packages and set up your environment."
            >
              <CodeSnippet 
                code={installationCode} 
                language="bash" 
                title="Installation"
              />
              <p className="mt-4 text-sm text-muted-foreground">
                You'll also need to set up your API keys for the language model (e.g., OpenAI) and LangSmith if you're using it.
              </p>
            </StepCard>
            
            <StepCard 
              step={2} 
              title="Create a Basic LangChain Agent" 
              description="Build a simple agent using LangChain's ReAct framework."
            >
              <CodeSnippet 
                code={basicAgentCode} 
                language="python" 
                title="Basic LangChain Agent"
              />
              <div className="mt-4 p-4 bg-secondary/30 rounded-lg border border-secondary">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <MessagesSquare className="h-5 w-5" />
                  What's happening here?
                </h4>
                <ol className="list-decimal pl-5 space-y-1 text-sm">
                  <li>We define an LLM (ChatOpenAI) that will power our agent</li>
                  <li>We provide a tool (DuckDuckGo search) that the agent can use</li>
                  <li>We create a prompt that follows the ReAct framework (Reasoning, Action, Observation)</li>
                  <li>We create the agent and an executor to run it</li>
                  <li>We invoke the agent with a query</li>
                </ol>
              </div>
            </StepCard>
            
            <StepCard 
              step={3} 
              title="Upgrade to a LangGraph Agent" 
              description="Enhance your agent with stateful workflow management using LangGraph."
            >
              <CodeSnippet 
                code={langGraphAgentCode} 
                language="python" 
                title="LangGraph Agent"
              />
              <div className="mt-4 p-4 bg-secondary/30 rounded-lg border border-secondary">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Box className="h-5 w-5" />
                  Key Differences from LangChain:
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Uses a graph structure with states and transitions</li>
                  <li>Supports conditional routing between different nodes</li>
                  <li>Maintains state between steps explicitly</li>
                  <li>Allows for cyclic execution patterns</li>
                  <li>Enables more complex multi-agent systems</li>
                </ul>
              </div>
            </StepCard>
            
            <StepCard 
              step={4} 
              title="Add Monitoring with LangSmith" 
              description="Debug and improve your agent with LangSmith tracing and observability."
            >
              <CodeSnippet 
                code={langSmithCode} 
                language="python" 
                title="LangSmith Integration"
              />
              <p className="mt-4 text-sm text-muted-foreground">
                After implementing this code, you can view detailed traces of your agent's execution in the LangSmith dashboard.
              </p>
            </StepCard>
          </div>
        </div>
      </section>
      
      {/* Resources Section */}
      <section id="resources" className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Additional Resources</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Explore these resources to deepen your understanding of the LangChain ecosystem.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">Official Documentation</h3>
                <ul className="space-y-2">
                  <li><a href="https://python.langchain.com/docs/get_started" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">LangChain Documentation</a></li>
                  <li><a href="https://python.langchain.com/docs/langgraph" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">LangGraph Documentation</a></li>
                  <li><a href="https://docs.smith.langchain.com/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">LangSmith Documentation</a></li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">Tutorials and Examples</h3>
                <ul className="space-y-2">
                  <li><a href="https://python.langchain.com/docs/use_cases/question_answering/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Question Answering with Sources</a></li>
                  <li><a href="https://python.langchain.com/docs/modules/agents/quick_start" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Agent Quick Start Guide</a></li>
                  <li><a href="https://python.langchain.com/docs/langgraph/how_to" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">LangGraph How-to Guides</a></li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-6 md:py-8 border-t">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <span className="font-bold gradient-heading">LLM Stack Explorer</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="#overview" className="text-sm text-muted-foreground hover:text-foreground">Overview</a>
              <Separator orientation="vertical" className="h-4" />
              <a href="#comparison" className="text-sm text-muted-foreground hover:text-foreground">Comparison</a>
              <Separator orientation="vertical" className="h-4" />
              <a href="#agent-guide" className="text-sm text-muted-foreground hover:text-foreground">Build an Agent</a>
            </div>
          </div>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            © 2025 LLM Stack Explorer. Created for educational purposes.
          </div>
        </div>
      </footer>
    </div>
  );
}
