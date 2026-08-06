'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import BrandHero from '@/components/brand/BrandHero';
import BrandIntro from '@/components/brand/BrandIntro';
import BrandPhilosophy from '@/components/brand/BrandPhilosophy';
import LogoSystem from '@/components/brand/LogoSystem';
import ColorSystem from '@/components/brand/ColorSystem';
import TypographyGuide from '@/components/brand/TypographyGuide';
import SpacingGuide from '@/components/brand/SpacingGuide';
import Iconography from '@/components/brand/Iconography';
import SocialMediaSystem from '@/components/brand/SocialMediaSystem';
import WebsiteComponents from '@/components/brand/WebsiteComponents';
import StudyNotesDesign from '@/components/brand/StudyNotesDesign';
import TeachingFramework from '@/components/brand/TeachingFramework';
import IllustrationPhotography from '@/components/brand/IllustrationPhotography';
import MotionGuidelines from '@/components/brand/MotionGuidelines';

import Changelog from '@/components/brand/Changelog';

const SECTIONS = [
  { id: 'intro', label: '1. Introduction' },
  { id: 'philosophy', label: '2. Brand Philosophy' },
  { id: 'logo', label: '3. Logo' },
  { id: 'color', label: '4. Color System' },
  { id: 'typography', label: '5. Typography' },
  { id: 'spacing', label: '6. Spacing' },
  { id: 'icons', label: '7. Icons' },
  { id: 'social', label: '8. Social Media' },
  { id: 'website', label: '9. Website' },
  { id: 'notes', label: '10. Study Notes' },
  { id: 'framework', label: '11. Teaching Framework' },
  { id: 'media', label: '12. Media & Style' },
  { id: 'motion', label: '13. Motion Guidelines' },

  { id: 'changelog', label: '15. Changelog' },
];

export default function BrandGuidelinesPage() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = SECTIONS.map(s => document.getElementById(s.id));
      const scrollPos = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(section.id);
          return;
        }
      }
      if (window.scrollY < 100) setActiveSection('hero');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-background text-text flex flex-col md:flex-row font-sans selection:bg-primary-light selection:text-primary-dark">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-[320px] h-screen sticky top-0 flex-col border-r border-border bg-surface p-6 z-40">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <img src="/logo.svg" alt="Inquisitive Mind Logo" className="h-8 w-auto object-contain" />
          </div>
          <p className="text-sm text-gray font-medium">Design System v1.0</p>
        </div>

        <nav className="flex-1 overflow-y-auto space-y-1 pb-10 pr-4 styled-scrollbar">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`w-full text-left px-3 py-2 rounded-md text-[14px] font-medium transition-all duration-200 flex items-center justify-between group ${
                activeSection === section.id
                  ? 'bg-primary-light text-primary-dark'
                  : 'text-gray hover:text-text hover:bg-gray-50'
              }`}
            >
              {section.label}
              {activeSection === section.id && (
                <motion.div layoutId="active-pill" className="w-1.5 h-1.5 rounded-full bg-primary-dark" />
              )}
            </button>
          ))}
        </nav>

        <div className="pt-4 border-t border-border mt-auto">
          <Link href="/dashboard" className="flex items-center justify-between px-3 py-2 bg-gray-50 text-text rounded-md text-[14px] font-semibold hover:bg-gray-100 transition-colors group">
            Go to Invoice Generator
            <ArrowRight className="w-4 h-4 text-gray group-hover:text-text transition-colors" />
          </Link>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-border px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="Inquisitive Mind Logo" className="h-8 w-auto object-contain" />
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 -mr-2 text-text"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Bottom Sheet Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-text/20 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 max-h-[85vh] bg-surface rounded-t-[24px] shadow-[0_-8px_30px_rgba(0,0,0,0.1)] z-50 md:hidden flex flex-col overflow-hidden border-t border-border"
            >
              <div className="w-full flex justify-center pt-3 pb-2">
                <div className="w-12 h-1.5 rounded-full bg-border" />
              </div>
              <div className="px-6 pb-4 pt-2">
                <h3 className="text-lg font-bold">Contents</h3>
              </div>
              <div className="flex-1 overflow-y-auto px-4 pb-10">
                <nav className="space-y-1">
                  {SECTIONS.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-[15px] font-medium transition-all ${
                        activeSection === section.id
                          ? 'bg-primary-light text-primary-dark'
                          : 'text-gray hover:bg-gray-50'
                      }`}
                    >
                      {section.label}
                    </button>
                  ))}
                  <div className="mt-6 pt-4 border-t border-border">
                    <Link href="/dashboard" className="flex items-center justify-between px-4 py-3 bg-gray-50 text-text rounded-xl text-[15px] font-semibold hover:bg-gray-100 transition-colors group">
                      Go to Invoice Generator
                      <ArrowRight className="w-4 h-4 text-gray group-hover:text-text transition-colors" />
                    </Link>
                  </div>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 bg-background relative pb-32">
        <BrandHero />
        
        <div className="max-w-[800px] mx-auto px-6 md:px-12 xl:px-20">
          <section id="intro" className="pt-24 pb-16 scroll-mt-10"><BrandIntro /></section>
          <div className="w-full h-px bg-border/50" />
          <section id="philosophy" className="py-16 scroll-mt-10"><BrandPhilosophy /></section>
          <div className="w-full h-px bg-border/50" />
          <section id="logo" className="py-16 scroll-mt-10"><LogoSystem /></section>
          <div className="w-full h-px bg-border/50" />
          <section id="color" className="py-16 scroll-mt-10"><ColorSystem /></section>
          <div className="w-full h-px bg-border/50" />
          <section id="typography" className="py-16 scroll-mt-10"><TypographyGuide /></section>
          <div className="w-full h-px bg-border/50" />
          <section id="spacing" className="py-16 scroll-mt-10"><SpacingGuide /></section>
          <div className="w-full h-px bg-border/50" />
          <section id="icons" className="py-16 scroll-mt-10"><Iconography /></section>
          <div className="w-full h-px bg-border/50" />
          <section id="social" className="py-16 scroll-mt-10"><SocialMediaSystem /></section>
          <div className="w-full h-px bg-border/50" />
          <section id="website" className="py-16 scroll-mt-10"><WebsiteComponents /></section>
          <div className="w-full h-px bg-border/50" />
          <section id="notes" className="py-16 scroll-mt-10"><StudyNotesDesign /></section>
          <div className="w-full h-px bg-border/50" />
          <section id="framework" className="py-16 scroll-mt-10"><TeachingFramework /></section>
          <div className="w-full h-px bg-border/50" />
          <section id="media" className="py-16 scroll-mt-10"><IllustrationPhotography /></section>
          <div className="w-full h-px bg-border/50" />
          <section id="motion" className="py-16 scroll-mt-10"><MotionGuidelines /></section>

          <div className="w-full h-px bg-border/50" />
          <section id="changelog" className="py-16 scroll-mt-10"><Changelog /></section>
        </div>
      </main>
    </div>
  );
}
