
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function ComparisonTable() {
  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableCaption>Comparison of LangChain, LangGraph, and LangSmith</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Feature</TableHead>
            <TableHead>LangChain</TableHead>
            <TableHead>LangGraph</TableHead>
            <TableHead>LangSmith</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Primary Purpose</TableCell>
            <TableCell>Building LLM applications with composable components</TableCell>
            <TableCell>Orchestrating complex multi-agent workflows with state management</TableCell>
            <TableCell>Debugging, monitoring, and improving LLM applications</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Use Case</TableCell>
            <TableCell>Single-agent applications, RAG systems, structured outputs</TableCell>
            <TableCell>Multi-agent systems, complex workflows with state persistence</TableCell>
            <TableCell>Observability, evaluation, and testing</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Key Features</TableCell>
            <TableCell>
              <ul className="list-disc pl-5 space-y-1">
                <li>Chain and agent abstractions</li>
                <li>Document loaders and transformers</li>
                <li>Prompt templates</li>
                <li>Output parsers</li>
              </ul>
            </TableCell>
            <TableCell>
              <ul className="list-disc pl-5 space-y-1">
                <li>Stateful graph-based workflows</li>
                <li>Event-driven architecture</li>
                <li>Cyclic execution patterns</li>
                <li>Conditional routing</li>
              </ul>
            </TableCell>
            <TableCell>
              <ul className="list-disc pl-5 space-y-1">
                <li>Tracing and logging</li>
                <li>Testing frameworks</li>
                <li>Prompt management</li>
                <li>Human feedback collection</li>
              </ul>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Relationship</TableCell>
            <TableCell>
              <Badge variant="outline" className="mr-2">Foundation</Badge>
              Base framework
            </TableCell>
            <TableCell>
              <Badge variant="outline" className="mr-2">Extension</Badge>
              Built on top of LangChain
            </TableCell>
            <TableCell>
              <Badge variant="outline" className="mr-2">Platform</Badge>
              Works with both LangChain and LangGraph
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Best For</TableCell>
            <TableCell>Developers building standard LLM pipelines</TableCell>
            <TableCell>Complex agent architectures requiring state management</TableCell>
            <TableCell>Monitoring and improving application performance</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
