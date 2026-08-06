'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Box } from 'lucide-react';
import Link from 'next/link';

export default function BrandHero() {
  const cards = [
    'Brand Identity', 'Teaching Philosophy', 'Components',
    'Social Media', 'Website', 'Notes', 'Motion', 'Resources'
  ];

  return (
    <section id="hero" className="relative min-h-[90vh] flex flex-col justify-center items-center px-6 text-center overflow-hidden pt-20">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-light/30 to-background z-0" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl mix-blend-multiply opacity-50 animate-blob" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl mix-blend-multiply opacity-50 animate-blob animation-delay-2000" />
      
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-border text-xs font-semibold text-gray shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-success" />
          System v1.0
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-ink mb-6"
        >
          Designing Better<br />Learning Experiences.
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-gray max-w-2xl mx-auto mb-10 leading-relaxed font-secondary"
        >
          The Inquisitive Mind Design System is the single source of truth for our brand, products, teaching philosophy and digital experiences.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <button
            onClick={() => document.getElementById('intro')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Explore Design System
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="relative z-10 w-full max-w-5xl mx-auto mt-24 mb-10 flex flex-wrap justify-center gap-4"
      >
        {cards.map((card, i) => (
          <motion.div
            key={card}
            whileHover={{ y: -5, scale: 1.02 }}
            className="px-6 py-4 bg-surface/80 backdrop-blur-md rounded-2xl border border-border/50 shadow-sm font-medium text-ink flex items-center justify-center min-w-[140px]"
          >
            {card}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
