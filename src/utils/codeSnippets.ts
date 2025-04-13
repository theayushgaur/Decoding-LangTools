
// Collection of code snippets for the agent guide section
export const codeSnippets = {
  installationCode: `pip install langchain langchain-openai langchain-community langgraph langsmith`,

  basicAgentCode: `from langchain_core.prompts import ChatPromptTemplate
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
agent_executor.invoke({"input": "What is the current stock price of Apple?"})`,

  langGraphAgentCode: `from langchain_core.messages import AIMessage, HumanMessage
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
})`,

  langSmithCode: `import os
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
`,

  multiAgentExample: `from langchain_openai import ChatOpenAI
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
        print("-" * 50)`,

  advancedAgentCode: `from langchain_openai import ChatOpenAI
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
})`,

  advancedLangSmithCode: `import os
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
    print(f"View run details at: https://smith.langchain.com/runs/{run.id}")`
};
