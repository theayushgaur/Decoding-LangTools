
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-bold text-xl gradient-heading">LLM Stack Explorer</span>
        </div>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Button variant="ghost" onClick={() => scrollToSection('overview')}>Overview</Button>
          <Button variant="ghost" onClick={() => scrollToSection('comparison')}>Comparison</Button>
          <Button variant="ghost" onClick={() => scrollToSection('agent-guide')}>Build an Agent</Button>
          <Button variant="outline" onClick={() => scrollToSection('resources')}>Resources</Button>
        </nav>
        
        {/* Mobile menu button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t animate-fade-in">
          <div className="container py-4 flex flex-col space-y-3">
            <Button variant="ghost" onClick={() => scrollToSection('overview')}>Overview</Button>
            <Button variant="ghost" onClick={() => scrollToSection('comparison')}>Comparison</Button>
            <Button variant="ghost" onClick={() => scrollToSection('agent-guide')}>Build an Agent</Button>
            <Button variant="outline" onClick={() => scrollToSection('resources')}>Resources</Button>
          </div>
        </div>
      )}
    </header>
  );
}
