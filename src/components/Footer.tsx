
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
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
  );
}
