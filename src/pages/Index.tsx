
import { useState, useEffect } from 'react';
import { ArrowRight, ChevronUp, ChevronDown } from "lucide-react";
import Header from "@/components/Header";
import HeroSection from "@/components/sections/HeroSection";
import OverviewSection from "@/components/sections/OverviewSection";
import ComparisonSection from "@/components/sections/ComparisonSection";
import AgentGuideSection from "@/components/sections/AgentGuideSection";
import ResourcesSection from "@/components/sections/ResourcesSection";
import Footer from "@/components/Footer";

export default function Index() {
  const [isVisible, setIsVisible] = useState({
    overview: false,
    comparison: false,
    agentGuide: false,
    resources: false
  });
  
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

    // Force visibility for agent-guide section to ensure it's always visible
    setIsVisible(prev => ({ ...prev, agentGuide: true }));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <HeroSection />
      <OverviewSection isVisible={isVisible.overview} />
      <ComparisonSection isVisible={isVisible.comparison} />
      <AgentGuideSection isVisible={isVisible.agentGuide} />
      <ResourcesSection isVisible={isVisible.resources} />
      <Footer />
    </div>
  );
}
