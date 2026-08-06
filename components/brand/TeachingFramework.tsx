'use client';

import { motion } from 'framer-motion';

export default function TeachingFramework() {
  const steps = [
    { num: '01', title: 'Concept', desc: 'Break down the core idea into simple terms.' },
    { num: '02', title: 'Visualization', desc: 'Use diagrams and visual aids to build mental models.' },
    { num: '03', title: 'Real Life Example', desc: 'Connect the concept to everyday experiences.' },
    { num: '04', title: 'Practice', desc: 'Apply knowledge through structured problem solving.' },
    { num: '05', title: 'Revision', desc: 'Reinforce memory through spaced repetition.' },
    { num: '06', title: 'Mastery', desc: 'Achieve confidence to tackle any variation of the problem.' },
  ];

  return (
    <div className="space-y-12">
      <div className="space-y-2">
        <h2 className="text-sm font-bold tracking-widest text-primary uppercase">12. Teaching Framework</h2>
        <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-ink">The Learning Methodology</h3>
        <p className="text-gray font-secondary max-w-2xl text-lg">
          This 6-step framework is the foundation of all our content. Our design system exists to visually support this journey.
        </p>
      </div>

      <div className="relative pl-8 md:pl-0 max-w-3xl mx-auto">
        {/* Vertical Line */}
        <div className="absolute left-[39px] md:left-1/2 md:-ml-px top-0 bottom-0 w-0.5 bg-border" />

        <div className="space-y-12">
          {steps.map((step, i) => {
            const isEven = i % 2 === 0;
            return (
              <motion.div 
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                className={`relative flex flex-col md:flex-row items-start md:items-center ${isEven ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-[-32px] md:left-1/2 md:-ml-[20px] w-10 h-10 rounded-full bg-surface border-[3px] border-primary flex items-center justify-center text-xs font-bold text-primary shadow-sm z-10">
                  {step.num}
                </div>

                {/* Content Box */}
                <div className={`w-full md:w-1/2 ${isEven ? 'md:pl-16' : 'md:pr-16'}`}>
                  <div className="p-6 bg-surface border border-border rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="text-xl font-bold text-ink mb-2">{step.title}</h4>
                    <p className="text-gray font-secondary leading-relaxed text-sm">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
