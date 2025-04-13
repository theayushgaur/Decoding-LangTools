
import { ArrowRight, BookOpen, Box, GitBranch, LineChart, MessagesSquare, Sparkles, Database, Brain, Tool, CheckCircle, AlertCircle, Code, Braces } from "lucide-react";
import Header from "@/components/Header";
import TechCard from "@/components/TechCard";
import CodeSnippet from "@/components/CodeSnippet";
import ComparisonTable from "@/components/ComparisonTable";
import StepCard from "@/components/StepCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

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

// Advanced examples
const advancedAgentCode = `from langchain_openai import ChatOpenAI
from langchain.agents import AgentExecutor
from langchain.agents.format_scratchpad import format_to_openai_function_messages
from langchain.agents.output_parsers import OpenAIFunctionsAgentOutputParser
from langchain_core.messages import AIMessage, HumanMessage
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_community.tools.tavily_search import TavilySearchResults
from langchain_community.utilities import SQLDatabase
from langchain_core.tools import Tool

# More sophisticated LLM
llm = ChatOpenAI(model="gpt-4-turbo", temperature=0)

# Define multiple tools
search = TavilySearchResults(max_results=3)
# Assume we have a SQL database
db = SQLDatabase.from_uri("sqlite:///data.db")

def run_query(query: str) -> str:
    """Run a SQL query against the database and return results."""
    try:
        return db.run(query)
    except Exception as e:
        return f"Error: {str(e)}"

tools = [
    Tool(
        name="search",
        description="Search the web for information",
        func=search.invoke,
    ),
    Tool(
        name="sql_query",
        description="Run SQL queries against a database",
        func=run_query,
    ),
]

# Advanced agent prompt with better system message and memory management
prompt = ChatPromptTemplate.from_messages([
    ("system", """You are an expert research agent that can search the web and query databases.
    Use the tools available to provide comprehensive, accurate answers.
    Always verify information from multiple sources when possible.
    If a database query fails, try to reformulate it or explain why it might have failed.
    For complex questions, break them down into steps and use tools for each step as needed."""),
    MessagesPlaceholder(variable_name="chat_history"),
    ("human", "{input}"),
    MessagesPlaceholder(variable_name="agent_scratchpad"),
])

# Create OpenAI functions agent
agent = (
    {
        "input": lambda x: x["input"],
        "chat_history": lambda x: x.get("chat_history", []),
        "agent_scratchpad": lambda x: format_to_openai_function_messages(x.get("intermediate_steps", [])),
    }
    | prompt
    | llm.bind_functions(tools)
    | OpenAIFunctionsAgentOutputParser()
)

# Create agent executor with memory
agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True, handle_parsing_errors=True)

# Example usage with chat history
chat_history = [
    HumanMessage(content="What's the current price of Tesla stock?"),
    AIMessage(content="As of today, Tesla (TSLA) stock is trading at $177.67 per share, down 0.8% from the previous close.")
]

agent_executor.invoke({
    "input": "How does that compare to its price 3 months ago?",
    "chat_history": chat_history
})`;

const multiAgentExample = `from langchain_openai import ChatOpenAI
from langgraph.graph import StateGraph, END
from langchain_core.messages import HumanMessage, AIMessage
from typing import Dict, List, TypedDict, Union, Annotated
import operator

# Define agent roles
class AgentState(TypedDict):
    messages: List[Union[HumanMessage, AIMessage]]
    next: str
    
# Create our LLMs with different system prompts/roles
researcher_llm = ChatOpenAI(model="gpt-4").bind(
    system_message="You are a research expert. Your job is to find information and facts. Be thorough and precise."
)

critic_llm = ChatOpenAI(model="gpt-4").bind(
    system_message="You are a critical thinker. Your job is to analyze information and identify potential inaccuracies or biases."
)

writer_llm = ChatOpenAI(model="gpt-4").bind(
    system_message="You are a technical writer. Your job is to synthesize information into clear, concise explanations."
)

# Define agent nodes
def researcher(state: AgentState) -> AgentState:
    """Research agent finds relevant information."""
    messages = state["messages"]
    response = researcher_llm.invoke(messages)
    updated_messages = messages + [AIMessage(content=f"[Researcher] {response.content}")]
    return {"messages": updated_messages, "next": "critic"}

def critic(state: AgentState) -> AgentState:
    """Critic agent evaluates the information."""
    messages = state["messages"]
    response = critic_llm.invoke(messages)
    updated_messages = messages + [AIMessage(content=f"[Critic] {response.content}")]
    return {"messages": updated_messages, "next": "writer"}

def writer(state: AgentState) -> AgentState:
    """Writer agent produces the final output."""
    messages = state["messages"]
    response = writer_llm.invoke(messages)
    updated_messages = messages + [AIMessage(content=f"[Writer] {response.content}")]
    return {"messages": updated_messages, "next": END}

# Define router for conditional paths
def router(state: AgentState) -> str:
    return state["next"]

# Build the multi-agent graph
workflow = StateGraph(AgentState)
workflow.add_node("researcher", researcher)
workflow.add_node("critic", critic)
workflow.add_node("writer", writer)

# Add conditional edges
workflow.add_conditional_edges("", router, {
    "researcher": "researcher",
    "critic": "critic",
    "writer": "writer"
})

# Set standard workflow: researcher → critic → writer
workflow.add_edge("researcher", "critic")
workflow.add_edge("critic", "writer")

# Compile the graph
chain = workflow.compile()

# Example execution
result = chain.invoke({
    "messages": [HumanMessage(content="Explain how LangGraph enables multi-agent systems")],
    "next": "researcher"
})

for message in result["messages"]:
    if isinstance(message, AIMessage):
        print(message.content)
        print("-" * 50)`;

// Advanced LangSmith usage
const advancedLangSmithCode = `import os
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from langchain.agents import AgentExecutor, create_openai_functions_agent
from langchain_community.tools.tavily_search import TavilySearchResults
from langsmith import Client, traceable, trace, RunEvaluator

# Set up environment variables
os.environ["LANGCHAIN_API_KEY"] = "your-langsmith-api-key"
os.environ["LANGCHAIN_TRACING_V2"] = "true"
os.environ["LANGCHAIN_PROJECT"] = "advanced-agent-monitoring"

# Create a LangSmith client
client = Client()

# Define a custom evaluator
@traceable
class FactualityEvaluator(RunEvaluator):
    """Evaluates factual accuracy of responses."""
    
    def evaluate_run(self, run):
        # Get the run output
        output = run.outputs["output"]
        
        # Use an LLM to check factuality
        llm = ChatOpenAI(temperature=0)
        prompt = ChatPromptTemplate.from_template(
            "You are evaluating the factual accuracy of the following statement. "
            "Rate it from 0 to 10, where 0 means completely inaccurate and 10 means completely accurate. "
            "Only respond with a number. Statement: {statement}"
        )
        chain = prompt | llm
        score = int(chain.invoke({"statement": output}))
        
        return {
            "score": score / 10,  # Normalize to 0-1
            "factuality_score": score
        }

# Create tools and agent
search = TavilySearchResults()
tools = [search]

llm = ChatOpenAI(model="gpt-4")
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant. Use tools when needed."),
    ("human", "{input}")
])
agent = create_openai_functions_agent(llm, tools, prompt)
agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

# Trace a run with additional metadata
with trace(
    name="Advanced Agent with Evaluation",
    run_type="chain",
    tags=["production", "factuality-evaluation"],
    metadata={"version": "1.0.2", "priority": "high"}
) as run:
    result = agent_executor.invoke({"input": "What are the latest developments in quantum computing?"})
    run.outputs = {"output": result["output"]}
    
    # Evaluate the run
    evaluator = FactualityEvaluator()
    evaluation = evaluator.evaluate_run(run)
    run.metadata["evaluation"] = evaluation
    
    # Add feedback
    client.create_feedback(
        run.id,
        "factuality",
        evaluation["score"],
        comment=f"Factuality score: {evaluation['factuality_score']}/10"
    )
    
    print(f"Result: {result['output']}")
    print(f"Factuality score: {evaluation['factuality_score']}/10")
    print(f"View run details at: https://smith.langchain.com/runs/{run.id}")`;

export default function Index() {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState({
    overview: false,
    comparison: false,
    agentGuide: false,
    resources: false
  });

  // Intersection Observer for animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const targetId = entry.target.id;
          setIsVisible(prev => ({ ...prev, [targetId]: true }));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    const sections = ['overview', 'comparison', 'agent-guide', 'resources'];
    sections.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-secondary/40 to-background transition-colors duration-300">
        <div className="container px-4 md:px-6">
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
      </section>
      
      {/* Overview Section */}
      <section id="overview" className={`py-16 md:py-24 transition-colors duration-300 ${isVisible.overview ? 'animate-fade-in' : 'opacity-0'}`}>
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
          
          {/* Additional Info */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="hover-lift animate-slide-in-left" style={{animationDelay: '0.7s'}}>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Key Benefits
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong>Rapid Development</strong>: Build complex LLM applications in days instead of months</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong>Modular Architecture</strong>: Swap components without rewriting your entire application</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong>Model Agnostic</strong>: Use any LLM provider (OpenAI, Anthropic, Llama, etc.)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong>Observability</strong>: Debug and optimize your applications with powerful tracing</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="hover-lift animate-slide-in-right" style={{animationDelay: '0.7s'}}>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-primary" />
                  Common Challenges
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                    <span><strong>Hallucinations</strong>: LLMs can generate incorrect information that sounds plausible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                    <span><strong>Prompt Engineering</strong>: Creating effective prompts requires expertise and experimentation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                    <span><strong>Debugging</strong>: Understanding why an LLM application fails can be difficult</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                    <span><strong>Cost Management</strong>: API costs can escalate quickly with complex applications</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Comparison Section */}
      <section id="comparison" className={`py-16 md:py-24 bg-muted/30 transition-colors duration-300 ${isVisible.comparison ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How They Compare</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Understanding when to use each technology is key to building effective LLM applications.
            </p>
          </div>
          
          <ComparisonTable />
          
          <div className="mt-12 p-6 border rounded-lg bg-card animate-zoom-in">
            <h3 className="text-xl font-bold mb-4">Key Takeaways</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>LangChain</strong> is your foundation for building LLM applications with reusable components</li>
              <li><strong>LangGraph</strong> extends LangChain when you need stateful, complex agent workflows</li>
              <li><strong>LangSmith</strong> helps you debug, monitor, and improve your applications, regardless of whether you're using LangChain or LangGraph</li>
              <li>All three can be used together for the most powerful and maintainable agent systems</li>
            </ul>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4 hover-lift flex flex-col items-center text-center">
                <Database className="h-8 w-8 text-primary mb-2" />
                <h4 className="font-medium">Start with LangChain</h4>
                <p className="text-sm text-muted-foreground">For simple applications and individual agents</p>
              </Card>
              
              <Card className="p-4 hover-lift flex flex-col items-center text-center">
                <Braces className="h-8 w-8 text-primary mb-2" />
                <h4 className="font-medium">Add LangGraph</h4>
                <p className="text-sm text-muted-foreground">When you need complex state management and workflows</p>
              </Card>
              
              <Card className="p-4 hover-lift flex flex-col items-center text-center">
                <Brain className="h-8 w-8 text-primary mb-2" />
                <h4 className="font-medium">Use LangSmith</h4>
                <p className="text-sm text-muted-foreground">Throughout development for debugging and monitoring</p>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/* Agent Guide Section */}
      <section id="agent-guide" className={`py-16 md:py-24 transition-colors duration-300 ${isVisible.agentGuide ? 'animate-fade-in' : 'opacity-0'}`}>
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
              className="hover-lift animate-slide-in-left"
            >
              <CodeSnippet 
                code={installationCode} 
                language="bash" 
                title="Installation"
              />
              <p className="mt-4 text-sm text-muted-foreground">
                You'll also need to set up your API keys for the language model (e.g., OpenAI) and LangSmith if you're using it.
              </p>
              <div className="mt-4 p-4 bg-secondary/30 rounded-lg border border-secondary">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Tool className="h-5 w-5" />
                  API Keys Setup
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>OpenAI API Key:</strong>
                    <pre className="bg-muted p-2 rounded mt-1 overflow-x-auto">
                      export OPENAI_API_KEY="your-api-key-here"
                    </pre>
                  </div>
                  <div>
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
              className="hover-lift animate-slide-in-right"
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
              
              <div className="mt-6 p-4 border border-primary/20 rounded-lg bg-primary/5">
                <h4 className="font-medium mb-2">Understanding the ReAct Framework</h4>
                <p className="text-sm">
                  The ReAct framework (Reasoning + Acting) is a powerful approach that enables LLMs to solve complex tasks by interleaving reasoning steps with actions. This framework helps the agent:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
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
              className="hover-lift animate-slide-in-left"
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
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg hover-lift">
                  <h4 className="font-medium mb-2">When to Use LangGraph</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>For multi-agent systems where agents need to communicate</li>
                    <li>When you need branching logic based on agent outputs</li>
                    <li>For workflows that require cycles or loops</li>
                    <li>When maintaining conversation state is critical</li>
                    <li>For implementing complex reasoning patterns</li>
                  </ul>
                </div>
                
                <div className="p-4 border rounded-lg hover-lift">
                  <h4 className="font-medium mb-2">Advanced Concepts</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li><strong>State Management</strong>: Explicitly tracking and updating state</li>
                    <li><strong>Node Types</strong>: Different types of processing units in the graph</li>
                    <li><strong>Conditional Edges</strong>: Dynamic routing based on state</li>
                    <li><strong>Cyclic Patterns</strong>: Allowing loops for iterative refinement</li>
                    <li><strong>Parallel Execution</strong>: Running multiple nodes simultaneously</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium mb-2">Example: Multi-Agent System with LangGraph</h4>
                <CodeSnippet 
                  code={multiAgentExample} 
                  language="python" 
                  title="Multi-Agent Collaboration"
                />
              </div>
            </StepCard>
            
            <StepCard 
              step={4} 
              title="Add Monitoring with LangSmith" 
              description="Debug and improve your agent with LangSmith tracing and observability."
              className="hover-lift animate-slide-in-right"
            >
              <CodeSnippet 
                code={langSmithCode} 
                language="python" 
                title="Basic LangSmith Integration"
              />
              <p className="mt-4 text-sm text-muted-foreground">
                After implementing this code, you can view detailed traces of your agent's execution in the LangSmith dashboard.
              </p>
              
              <div className="mt-6">
                <h4 className="font-medium mb-2">Advanced LangSmith Features</h4>
                <CodeSnippet 
                  code={advancedLangSmithCode} 
                  language="python" 
                  title="Advanced LangSmith Monitoring"
                />
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg hover-lift">
                  <h4 className="font-medium mb-2">Key LangSmith Features</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li><strong>Tracing</strong>: Visualize the execution of chains and agents</li>
                    <li><strong>Evaluation</strong>: Assess performance using automated metrics</li>
                    <li><strong>Feedback</strong>: Collect human feedback on model outputs</li>
                    <li><strong>Datasets</strong>: Create and manage test cases for your application</li>
                    <li><strong>Cost Analysis</strong>: Track token usage and API costs</li>
                  </ul>
                </div>
                
                <div className="p-4 border rounded-lg hover-lift">
                  <h4 className="font-medium mb-2">Best Practices</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
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
              className="hover-lift animate-zoom-in"
            >
              <CodeSnippet 
                code={advancedAgentCode} 
                language="python" 
                title="Advanced Agent Implementation"
              />
              
              <div className="mt-6 p-4 border border-primary/20 rounded-lg bg-primary/5">
                <h4 className="font-medium mb-2">Production Considerations</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="font-medium">1. Error Handling</h5>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>Implement robust error catching</li>
                      <li>Add fallback mechanisms</li>
                      <li>Use retry logic for temporary failures</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium">2. Performance</h5>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>Cache common queries and responses</li>
                      <li>Use streaming for better UX</li>
                      <li>Implement rate limiting</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium">3. Security</h5>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>Validate and sanitize inputs</li>
                      <li>Implement tool usage guardrails</li>
                      <li>Audit and log sensitive operations</li>
                    </ul>
                  </div>
                  <div>
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
      
      {/* Resources Section */}
      <section id="resources" className={`py-16 md:py-24 bg-muted/30 transition-colors duration-300 ${isVisible.resources ? 'animate-fade-in' : 'opacity-0'}`}>
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
      
      {/* Footer */}
      <footer className="py-6 md:py-8 border-t transition-colors duration-300">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <span className="font-bold gradient-heading">LLM Stack Explorer</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="#overview" className="text-sm text-muted-foreground hover:text-foreground hover-lift">Overview</a>
              <Separator orientation="vertical" className="h-4" />
              <a href="#comparison" className="text-sm text-muted-foreground hover:text-foreground hover-lift">Comparison</a>
              <Separator orientation="vertical" className="h-4" />
              <a href="#agent-guide" className="text-sm text-muted-foreground hover:text-foreground hover-lift">Build an Agent</a>
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
