export const codeSnippets = {
  installationCode: `> pnpm dlx shadcn@latest init
✓ Preflight checks.
✓ Verifying framework. Found Next.js.
✓ Validating Tailwind CSS.
✓ Validating import alias.
✓ Writing components.json.
✓ Checking registry.
✓ Updating tailwind.config.ts
✓ Updating app/globals.css
✓ Installing dependencies.
i Updated 1 file:
  - lib/utils.ts
Success! Project initialization completed.
You may now add components.`,

  basicAgentCode: `from langchain.agents import Tool, AgentExecutor, load_tools
from langchain.agents.format_scratchpad import format_to_openai_function_messages
from langchain.agents.output_parsers import OpenAIFunctionsAgentOutputParser
from langchain.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.tools import DuckDuckGoSearchRun

# Define the language model
llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0)

# Define the tools
search = DuckDuckGoSearchRun()
tools = [
    Tool(
        name="Search",
        func=search.run,
        description="useful for when you need to answer questions about current events or the current state of the world"
    ),
]

# Create the prompt
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant that answers questions."),
    ("user", "{input}"),
    MessagesPlaceholder(variable_name="agent_scratchpad"),
])

# Create the agent
agent = {
    "input": lambda x: x["input"],
    "agent_scratchpad": lambda x: format_to_openai_function_messages(x["intermediate_steps"])
} | prompt | llm | OpenAIFunctionsAgentOutputParser()

# Create the agent executor
agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

# Run the agent
response = agent_executor.invoke({"input": "What is the latest news about AI?"})
print(response["output"])`,

  langGraphAgentCode: `from langchain_core.messages import HumanMessage, AIMessage, SystemMessage
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_openai import ChatOpenAI
from langgraph.graph import END, StateGraph
from langchain_core.tools import tool
from typing import TypedDict, List, Union, Dict, Annotated, Sequence

# Define the state type
class AgentState(TypedDict):
    messages: List[Union[HumanMessage, AIMessage, SystemMessage]]
    tools_output: str

# Define a tool
@tool
def search(query: str) -> str:
    """Search for information about a topic."""
    # In a real implementation, this would perform a search
    return f"Here is information about {query}..."

# Define the nodes in the graph
def run_llm(state: AgentState):
    """Run the LLM with the given state."""
    messages = state["messages"]
    model = ChatOpenAI(model="gpt-3.5-turbo")
    response = model.invoke(messages)
    return {"messages": messages + [response]}

def call_tool(state: AgentState):
    """Call the tool based on the last message."""
    last_message = state["messages"][-1]
    action = "search"  # In a real implementation, parse the action from the message
    query = "AI advances"  # In a real implementation, parse the query from the message
    result = search(query)
    return {"tools_output": result}

def add_tool_result(state: AgentState):
    """Add the tool result to the messages."""
    tool_result = state["tools_output"]
    new_message = AIMessage(content=f"Tool result: {tool_result}")
    return {"messages": state["messages"] + [new_message]}

# Create the graph
workflow = StateGraph(AgentState)

# Add the nodes
workflow.add_node("run_llm", run_llm)
workflow.add_node("call_tool", call_tool)
workflow.add_node("add_tool_result", add_tool_result)

# Add the edges
workflow.add_edge("run_llm", "call_tool")
workflow.add_edge("call_tool", "add_tool_result")
workflow.add_edge("add_tool_result", "run_llm")

# Add conditional edges
def should_continue(state: AgentState) -> str:
    """Determine whether to continue or end."""
    last_message = state["messages"][-1]
    # In a real implementation, check if the LLM wants to use more tools
    return "call_tool" if "I need more information" in last_message.content else END

workflow.add_conditional_edges("run_llm", should_continue)

# Compile the graph
app = workflow.compile()

# Run the graph
inputs = {
    "messages": [HumanMessage(content="What are the latest developments in AI?")]
}
for output in app.stream(inputs):
    for key, value in output.items():
        # Process and display the streaming output
        pass`,

  multiAgentExample: `from langchain_core.messages import HumanMessage, AIMessage
from langchain_openai import ChatOpenAI
from langgraph.graph import StateGraph, END
from typing import Dict, List, Tuple, TypedDict, Annotated, Sequence, Any

# Define agent types
class Researcher:
    def __init__(self):
        self.llm = ChatOpenAI(model="gpt-3.5-turbo")
    
    def run(self, state):
        messages = state["messages"]
        research_prompt = f"You are a researcher. Research this topic: {messages[-1].content}"
        response = self.llm.invoke([HumanMessage(content=research_prompt)])
        return {"research_output": response.content}

class Writer:
    def __init__(self):
        self.llm = ChatOpenAI(model="gpt-3.5-turbo")
    
    def run(self, state):
        research = state["research_output"]
        write_prompt = f"You are a writer. Create content based on this research: {research}"
        response = self.llm.invoke([HumanMessage(content=write_prompt)])
        return {"content_output": response.content}

class Editor:
    def __init__(self):
        self.llm = ChatOpenAI(model="gpt-3.5-turbo")
    
    def run(self, state):
        content = state["content_output"]
        edit_prompt = f"You are an editor. Edit and improve this content: {content}"
        response = self.llm.invoke([HumanMessage(content=edit_prompt)])
        final_message = AIMessage(content=response.content)
        return {"messages": state["messages"] + [final_message]}

# Define the state
class AgentState(TypedDict):
    messages: List[HumanMessage | AIMessage]
    research_output: str
    content_output: str

# Create the multi-agent system
agents = {
    "researcher": Researcher(),
    "writer": Writer(),
    "editor": Editor()
}

# Create the graph
workflow = StateGraph(AgentState)

# Add nodes
workflow.add_node("researcher", agents["researcher"].run)
workflow.add_node("writer", agents["writer"].run)
workflow.add_node("editor", agents["editor"].run)

# Add edges
workflow.add_edge("researcher", "writer")
workflow.add_edge("writer", "editor")
workflow.add_edge("editor", END)

# Compile the graph
app = workflow.compile()

# Run the system
inputs = {
    "messages": [HumanMessage(content="Tell me about the future of autonomous vehicles.")]
}
result = app.invoke(inputs)
print(result["messages"][-1].content)`,

  langSmithCode: `import os
from langchain import LangChain
from langsmith import Client

# Set your LangSmith API key
os.environ["LANGCHAIN_API_KEY"] = "your-langsmith-api-key"
os.environ["LANGCHAIN_TRACING_V2"] = "true"
os.environ["LANGCHAIN_PROJECT"] = "My Agent Project"

# Initialize LangSmith client
client = Client()

# The rest of your agent code would go here...
# When you run your agent, LangSmith will automatically capture traces

# You can also create a trace manually
with client.trace("agent_execution") as trace:
    # Your agent code here
    pass`,

  advancedLangSmithCode: `import os
from langchain import LangChain
from langsmith import Client, trace
from langsmith.evaluation import EvaluationResults, run_evaluator

# Set your LangSmith API key
os.environ["LANGCHAIN_API_KEY"] = "your-langsmith-api-key"
os.environ["LANGCHAIN_TRACING_V2"] = "true"
os.environ["LANGCHAIN_PROJECT"] = "Advanced Agent Project"

# Initialize LangSmith client
client = Client()

# Create a dataset for testing
dataset = client.create_dataset("test_queries", description="Test queries for my agent")

# Add examples to the dataset
client.create_example(
    inputs={"query": "What is the capital of France?"},
    outputs={"answer": "The capital of France is Paris."},
    dataset_id=dataset.id
)

# Create a custom evaluator
@run_evaluator
def accuracy_evaluator(run, example):
    """Evaluate if the answer is accurate."""
    prediction = run.outputs["answer"]
    reference = example.outputs["answer"]
    score = 1.0 if prediction.lower() == reference.lower() else 0.0
    return {"score": score}

# Run evaluation
evaluation_results = client.run_evaluation(
    evaluator=accuracy_evaluator,
    dataset_name="test_queries",
    llm_or_chain=my_agent,  # Your agent would be defined here
    project_name="Agent Evaluation"
)

# Analyze results
print(f"Average accuracy: {evaluation_results.get_average_score()}")

# Add custom metadata to traces
@trace(name="complex_query_handler")
def handle_complex_query(query: str):
    # Your complex query handling logic
    result = "Processed result"
    return result`,

  advancedAgentCode: `import logging
from langchain.agents import AgentExecutor, create_openai_tools_agent
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.memory import ConversationBufferWindowMemory
from langchain.tools import DuckDuckGoSearchRun, WikipediaQueryRun
from langchain.tools.retriever import create_retriever_tool
from langchain.chat_models import ChatOpenAI
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import OpenAIEmbeddings
from langchain_core.documents import Document
from langsmith import Client
from tenacity import retry, stop_after_attempt, wait_exponential
import os

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize LangSmith
os.environ["LANGCHAIN_API_KEY"] = "your-langsmith-api-key"
os.environ["LANGCHAIN_TRACING_V2"] = "true"
os.environ["LANGCHAIN_PROJECT"] = "Production Agent"
client = Client()

# Set up vector database
documents = [
    Document(page_content="Important domain knowledge here", metadata={"source": "knowledge_base"}),
    # Add more documents as needed
]
embeddings = OpenAIEmbeddings()
vectorstore = Chroma.from_documents(documents, embeddings)
retriever = vectorstore.as_retriever(
    search_type="similarity",
    search_kwargs={"k": 3}
)

# Create tools with error handling
@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=2, max=10))
def search_with_retry(query):
    try:
        search = DuckDuckGoSearchRun()
        return search.run(query)
    except Exception as e:
        logger.error(f"Search error: {e}")
        return "Sorry, I couldn't perform the search. Please try again."

search_tool = {
    "name": "Search",
    "description": "Search the web for information",
    "func": search_with_retry
}

knowledge_tool = create_retriever_tool(
    retriever,
    "Knowledge Base",
    "Search the internal knowledge base for information"
)

wiki_tool = WikipediaQueryRun()

tools = [search_tool, knowledge_tool, wiki_tool]

# Create memory
memory = ConversationBufferWindowMemory(
    return_messages=True,
    memory_key="chat_history",
    k=5
)

# Create the prompt
prompt = ChatPromptTemplate.from_messages([
    ("system", """You are an advanced AI assistant with access to various tools.
    Follow these guidelines:
    1. Use tools appropriately based on the question
    2. Be concise in your responses
    3. Cite sources when providing factual information
    4. If you don't know something, say so
    5. Prioritize the knowledge base for domain-specific queries
    """),
    MessagesPlaceholder(variable_name="chat_history"),
    ("human", "{input}"),
    MessagesPlaceholder(variable_name="agent_scratchpad"),
])

# Create LLM with caching
llm = ChatOpenAI(
    model="gpt-4-turbo",
    temperature=0.1,
    streaming=True,
    cache=True
)

# Create the agent
agent = create_openai_tools_agent(llm, tools, prompt)

# Create the executor with monitoring
agent_executor = AgentExecutor(
    agent=agent,
    tools=tools,
    memory=memory,
    verbose=True,
    return_intermediate_steps=True,
    max_iterations=5,
    early_stopping_method="generate",
    handle_parsing_errors=True
)

# Example usage with metadata
def process_query(query, user_id=None, session_id=None):
    metadata = {
        "user_id": user_id,
        "session_id": session_id,
        "query_type": "customer_service" if "help" in query.lower() else "general"
    }
    
    try:
        with client.trace("agent_execution", metadata=metadata) as trace:
            result = agent_executor.invoke({"input": query})
            return {
                "answer": result["output"],
                "steps": result["intermediate_steps"],
                "success": True
            }
    except Exception as e:
        logger.error(f"Agent error: {e}")
        return {
            "answer": "I encountered an error while processing your request.",
            "success": False,
            "error": str(e)
        }`,

  flutterInstallation: `dependencies:
  flutter:
    sdk: flutter
  langchain_flutter: ^0.0.3
  langchain: ^0.0.6
  langchain_openai: ^0.0.6
  http: ^1.1.0
  flutter_dotenv: ^5.1.0`,

  flutterBasicAgent: `import 'package:flutter/material.dart';
import 'package:langchain/langchain.dart';
import 'package:langchain_openai/langchain_openai.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

Future<void> main() async {
  // Load environment variables
  await dotenv.load(fileName: ".env");
  
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'LangChain Flutter Demo',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: const AgentScreen(),
    );
  }
}

class AgentScreen extends StatefulWidget {
  const AgentScreen({super.key});

  @override
  State<AgentScreen> createState() => _AgentScreenState();
}

class _AgentScreenState extends State<AgentScreen> {
  final TextEditingController _queryController = TextEditingController();
  String _response = "";
  bool _isLoading = false;

  @override
  void dispose() {
    _queryController.dispose();
    super.dispose();
  }

  Future<void> _runAgent() async {
    final query = _queryController.text;
    
    if (query.isEmpty) return;

    setState(() {
      _isLoading = true;
      _response = "";
    });

    try {
      // Initialize OpenAI language model
      final llm = ChatOpenAI(
        apiKey: dotenv.env['OPENAI_API_KEY'],
        model: 'gpt-3.5-turbo',
        temperature: 0,
      );
      
      // Create a simple conversational chain
      final chain = LLMChain(
        llm: llm,
        prompt: PromptTemplate.fromTemplate(
          'You are a helpful assistant. Answer the following question: {question}'
        ),
      );
      
      // Call the chain
      final result = await chain.call({'question': query});
      final answer = result['text'] as String;
      
      setState(() {
        _response = answer;
      });
    } catch (e) {
      setState(() {
        _response = "Error: \${e.toString()}";
      });
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('LangChain Agent'),
        backgroundColor: Theme.of(context).colorScheme.primaryContainer,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            TextField(
              controller: _queryController,
              decoration: const InputDecoration(
                labelText: 'Ask a question',
                border: OutlineInputBorder(),
              ),
              maxLines: 3,
            ),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: _isLoading ? null : _runAgent,
              child: _isLoading
                  ? const CircularProgressIndicator()
                  : const Text('Submit'),
            ),
            const SizedBox(height: 24),
            const Text(
              'Response:',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
            ),
            const SizedBox(height: 8),
            Expanded(
              child: Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  border: Border.all(color: Colors.grey),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: SingleChildScrollView(
                  child: Text(_response),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}`,

  flutterAdvancedAgent: `import 'package:flutter/material.dart';
import 'package:langchain/langchain.dart';
import 'package:langchain_openai/langchain_openai.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

class AdvancedAgentScreen extends StatefulWidget {
  const AdvancedAgentScreen({super.key});

  @override
  State<AdvancedAgentScreen> createState() => _AdvancedAgentScreenState();
}

class _AdvancedAgentScreenState extends State<AdvancedAgentScreen> {
  final TextEditingController _queryController = TextEditingController();
  List<Message> _messages = [];
  bool _isLoading = false;

  @override
  void dispose() {
    _queryController.dispose();
    super.dispose();
  }

  // Define tools that our agent can use
  List<BaseTool> _getTools() {
    return [
      // Calculator tool
      DynamicTool(
        name: "calculator",
        description: "Useful for performing mathematical calculations",
        func: (String input) async {
          try {
            // Parse and evaluate the mathematical expression
            // This is a simple implementation - you might want to use a proper expression parser
            final result = _evaluateExpression(input);
            return "The result of $input is $result";
          } catch (e) {
            return "Error calculating: \${e.toString()}";
          }
        },
      ),
      
      // Current time tool
      DynamicTool(
        name: "get_current_time",
        description: "Gets the current time",
        func: (String _) async {
          final now = DateTime.now();
          return "The current time is \${now.toString()}";
        },
      ),
    ];
  }

  // Simple expression evaluator (for demo purposes)
  double _evaluateExpression(String expression) {
    // In a real app, use a proper expression parser/evaluator
    // This is just a simplified example for demo purposes
    expression = expression.replaceAll(' ', '');
    if (expression.contains('+')) {
      final parts = expression.split('+');
      return double.parse(parts[0]) + double.parse(parts[1]);
    } else if (expression.contains('-')) {
      final parts = expression.split('-');
      return double.parse(parts[0]) - double.parse(parts[1]);
    } else if (expression.contains('*')) {
      final parts = expression.split('*');
      return double.parse(parts[0]) * double.parse(parts[1]);
    } else if (expression.contains('/')) {
      final parts = expression.split('/');
      return double.parse(parts[0]) / double.parse(parts[1]);
    }
    return double.parse(expression);
  }

  Future<void> _runAgent() async {
    final query = _queryController.text;
    
    if (query.isEmpty) return;

    setState(() {
      _isLoading = true;
      _messages.add(HumanMessage(content: query));
    });
    
    try {
      // Initialize OpenAI language model
      final llm = ChatOpenAI(
        apiKey: dotenv.env['OPENAI_API_KEY'],
        model: 'gpt-3.5-turbo',
        temperature: 0,
      );
      
      // Create an agent with tools
      final agent = createOpenAIToolsAgent(
        llm: llm,
        tools: _getTools(),
        systemMessage: SystemMessage(
          content: "You are a helpful assistant that can use tools to answer questions.",
        ),
      );
      
      // Create an agent executor
      final agentExecutor = AgentExecutor(
        agent: agent,
        tools: _getTools(),
      );
      
      // Run the agent
      final result = await agentExecutor.invoke({
        "input": query,
      });
      
      final answer = result["output"] as String;
      
      setState(() {
        _messages.add(AIMessage(content: answer));
        _queryController.clear();
      });
    } catch (e) {
      setState(() {
        _messages.add(AIMessage(content: "Error: \${e.toString()}"));
      });
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Advanced LangChain Agent'),
        backgroundColor: Theme.of(context).colorScheme.primaryContainer,
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: _messages.length,
              itemBuilder: (context, index) {
                final message = _messages[index];
                final isUser = message is HumanMessage;
                
                return Align(
                  alignment: isUser 
                      ? Alignment.centerRight 
                      : Alignment.centerLeft,
                  child: Container(
                    margin: const EdgeInsets.only(bottom: 12),
                    padding: const EdgeInsets.all(12),
                    constraints: BoxConstraints(
                      maxWidth: MediaQuery.of(context).size.width * 0.75,
                    ),
                    decoration: BoxDecoration(
                      color: isUser 
                          ? Theme.of(context).colorScheme.primary
                          : Theme.of(context).colorScheme.primaryContainer,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Text(
                      message.content,
                      style: TextStyle(
                        color: isUser 
                            ? Colors.white 
                            : Theme.of(context).colorScheme.onSurface,
                      ),
                    ),
                  ),
                );
              },
            ),
          ),
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Theme.of(context).scaffoldBackgroundColor,
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.05),
                  offset: const Offset(0, -1),
                  blurRadius: 3,
                ),
              ],
            ),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _queryController,
                    decoration: const InputDecoration(
                      hintText: 'Type a message...',
                      border: OutlineInputBorder(),
                    ),
                    onSubmitted: (_) => _runAgent(),
                  ),
                ),
                const SizedBox(width: 8),
                IconButton(
                  onPressed: _isLoading ? null : _runAgent,
                  icon: _isLoading
                      ? const CircularProgressIndicator()
                      : const Icon(Icons.send),
                  color: Theme.of(context).colorScheme.primary,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}`,

  flutterCustomTool: `// Define a custom web search tool
class WebSearchTool extends BaseTool {
  WebSearchTool()
      : super(
          name: "web_search",
          description: "Search the web for information",
        );

  @override
  Future<String> call(String input) async {
    try {
      // In a real app, you would implement an actual web search
      // This is a mock implementation for demonstration
      await Future.delayed(const Duration(seconds: 1));
      
      return "Search results for '$input':\\n"
          "1. First relevant result about $input\\n"
          "2. Second relevant result about $input\\n"
          "3. Third relevant result about $input";
    } catch (e) {
      return "Error searching the web: \${e.toString()}";
    }
  }
}`,

  flutterAppStructure: `project_root/
├── android/                 # Android-specific files
├── ios/                     # iOS-specific files
├── lib/
│   ├── main.dart            # App entry point
│   ├── screens/
│   │   ├── agent_screen.dart
│   │   └── chat_screen.dart
│   ├── services/
│   │   └── langchain_service.dart
│   ├── models/
│   │   └── message.dart
│   └── utils/
│       └── env_loader.dart
├── .env                     # Environment variables (API keys)
└── pubspec.yaml             # Project dependencies
`,

  flutterEnvSetup: `# Create a .env file in your project root
OPENAI_API_KEY=your-openai-api-key-here
LANGCHAIN_API_KEY=your-langsmith-api-key-here
LANGCHAIN_PROJECT=my-flutter-agent

# Make sure to add the .env file to .gitignore to keep your API keys secure
echo ".env" >> .gitignore`,

};
