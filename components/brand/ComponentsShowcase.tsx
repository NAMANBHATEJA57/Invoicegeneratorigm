'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Check, ChevronDown, Bell, BookOpen } from 'lucide-react';

export default function ComponentsShowcase() {
  const [activeTab, setActiveTab] = useState('buttons');
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <div className="space-y-12">
      <div className="space-y-2">
        <h2 className="text-sm font-bold tracking-widest text-primary uppercase">8. Components</h2>
        <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-ink">Interface Elements</h3>
        <p className="text-gray font-secondary max-w-2xl text-lg">
          Our UI elements are built to feel premium, accessible, and highly responsive. Elements should look at home on an Apple device while maintaining academic warmth.
        </p>
      </div>

      <div className="border border-border rounded-3xl overflow-hidden bg-background">
        <div className="flex border-b border-border bg-surface px-2 overflow-x-auto styled-scrollbar">
          {['buttons', 'cards', 'inputs', 'alerts'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-4 text-sm font-medium capitalize relative whitespace-nowrap transition-colors ${
                activeTab === tab ? 'text-ink' : 'text-gray hover:text-ink'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          ))}
        </div>

        <div className="p-8 md:p-12 min-h-[400px] flex items-center justify-center bg-[#F9FAFB]">
          <AnimatePresence mode="wait">
            {activeTab === 'buttons' && (
              <motion.div key="buttons" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col sm:flex-row gap-6">
                <button className="px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-all shadow-sm hover:shadow active:scale-95">
                  Primary Button
                </button>
                <button className="px-6 py-3 bg-surface text-ink border border-border font-medium rounded-xl hover:bg-gray-50 transition-all shadow-sm hover:shadow active:scale-95">
                  Secondary
                </button>
                <button className="px-6 py-3 text-gray font-medium rounded-xl hover:bg-gray-100 transition-all active:scale-95">
                  Ghost Button
                </button>
              </motion.div>
            )}

            {activeTab === 'cards' && (
              <motion.div key="cards" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
                <div className="p-6 bg-surface rounded-3xl border border-border shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-primary-light text-primary-dark flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-ink mb-2">Class 10 Science</h4>
                  <p className="text-sm text-gray leading-relaxed mb-4">Complete concept notes, revision charts, and practice questions for board prep.</p>
                  <div className="text-xs font-semibold text-primary uppercase tracking-wider">Explore Course →</div>
                </div>
                
                <div className="border border-border rounded-3xl bg-surface overflow-hidden shadow-sm">
                  <div className="h-24 bg-primary" />
                  <div className="p-6">
                    <h4 className="font-bold text-ink mb-1">Mathematics Masterclass</h4>
                    <p className="text-sm text-gray mb-4">By Rupali Bhateja</p>
                    <button className="w-full py-2 bg-background border border-border rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">View Details</button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'inputs' && (
              <motion.div key="inputs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="w-full max-w-md space-y-6">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-ink">Email Address</label>
                  <input type="email" placeholder="student@example.com" className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-ink placeholder:text-gray/50" />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-ink">Learning Goal</label>
                  <div 
                    onClick={() => setAccordionOpen(!accordionOpen)}
                    className="w-full px-4 py-3 bg-surface border border-border rounded-xl cursor-pointer flex items-center justify-between hover:border-gray-400 transition-colors"
                  >
                    <span className="text-ink">Select a goal...</span>
                    <ChevronDown className={`w-4 h-4 text-gray transition-transform ${accordionOpen ? 'rotate-180' : ''}`} />
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'alerts' && (
              <motion.div key="alerts" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="w-full max-w-lg space-y-4">
                <div className="p-4 rounded-2xl bg-[#E0F2FE] border border-[#bae6fd] flex gap-3 text-[#0369a1]">
                  <Bell className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-semibold text-sm mb-1">New Notes Available</h5>
                    <p className="text-sm opacity-90">Class 10 Science Chapter 4 has been uploaded to the dashboard.</p>
                  </div>
                </div>
                
                <div className="p-4 rounded-2xl bg-primary-light border border-primary/20 flex gap-3 text-primary-dark">
                  <Check className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-semibold text-sm mb-1">Payment Successful</h5>
                    <p className="text-sm opacity-90">Your invoice has been generated and sent to the client.</p>
                  </div>
                </div>
                
                <div className="p-4 rounded-2xl bg-[#FEE2E2] border border-[#fecaca] flex gap-3 text-[#B91C1C]">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-semibold text-sm mb-1">Action Required</h5>
                    <p className="text-sm opacity-90">Please complete your profile information to continue.</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
