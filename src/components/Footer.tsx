
import { Separator } from "@/components/ui/separator";
import { Twitter, Linkedin, Mail, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="py-8 md:py-10 border-t transition-colors duration-300">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <span className="font-bold gradient-heading">Decoding LangTools</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#overview" className="text-sm text-muted-foreground hover:text-foreground hover-lift">Overview</a>
            <Separator orientation="vertical" className="h-4" />
            <a href="#comparison" className="text-sm text-muted-foreground hover:text-foreground hover-lift">Comparison</a>
            <Separator orientation="vertical" className="h-4" />
            <a href="#agent-guide" className="text-sm text-muted-foreground hover:text-foreground hover-lift">Build an Agent</a>
          </div>
        </div>

        <div className="flex flex-col items-center border-t border-border/50 pt-6">
          <p className="text-center text-muted-foreground mb-4">
            Made with ❤️ by Ayush Gaur
          </p>
          
          <div className="flex items-center justify-center gap-4 mb-6">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10" asChild>
              <a href="https://twitter.com/theayushgaur" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10" asChild>
              <a href="https://www.linkedin.com/in/theayushgaur/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10" asChild>
              <a href="mailto:theayushgaur@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Email">
                <Mail className="h-5 w-5 text-muted-foreground hover:text-primary" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10" asChild>
              <a href="https://github.com/theayushgaur" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-5 w-5 text-muted-foreground hover:text-primary" />
              </a>
            </Button>
          </div>
          
          
        </div>
      </div>
    </footer>
  );
}
