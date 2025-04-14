
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Toggle } from "@/components/ui/toggle";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle 
            variant="outline" 
            size="sm" 
            pressed={theme === 'dark'} 
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full transition-all hover:bg-primary/10"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Moon className="h-5 w-5 text-yellow-400 transition-all" />
            ) : (
              <Sun className="h-5 w-5 text-yellow-500 transition-all" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>
          <p>Switch to {theme === 'dark' ? 'light' : 'dark'} mode</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
