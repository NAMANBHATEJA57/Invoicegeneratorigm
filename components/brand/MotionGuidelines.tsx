'use client';

import { motion } from 'framer-motion';

export default function MotionGuidelines() {
  return (
    <div className="space-y-12">
      <div className="space-y-2">
        <h2 className="text-sm font-bold tracking-widest text-primary uppercase">14. Motion</h2>
        <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-ink">Animation Principles</h3>
        <p className="text-gray font-secondary max-w-2xl text-lg">
          Animation should feel invisible but essential. We use motion to guide focus, indicate state changes, and provide delightful micro-interactions. No bouncy or aggressive physics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* State Changes */}
        <div className="space-y-6">
          <h4 className="text-xl font-bold text-ink">State Changes</h4>
          <div className="h-48 bg-surface border border-border rounded-3xl flex items-center justify-center p-8">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-primary text-white rounded-xl shadow-sm font-medium"
            >
              Hover & Tap Me
            </motion.button>
          </div>
          <p className="text-sm text-gray font-secondary leading-relaxed">
            Buttons and interactive elements scale slightly on hover (1.05x) and compress on tap (0.95x). This provides tactile feedback without distraction.
          </p>
        </div>

        {/* Page Transitions */}
        <div className="space-y-6">
          <h4 className="text-xl font-bold text-ink">Entrance Animations</h4>
          <div className="h-48 bg-surface border border-border rounded-3xl flex items-center justify-center p-8 overflow-hidden">
            <div className="flex gap-4">
              {[0, 1, 2].map((i) => (
                <motion.div 
                  key={i}
                  animate={{ y: [20, 0, 20], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
                  className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30"
                />
              ))}
            </div>
          </div>
          <p className="text-sm text-gray font-secondary leading-relaxed">
            Content blocks should fade in and translate upwards (20px to 0px) sequentially when entering the viewport. Use spring physics with low bounce.
          </p>
        </div>
      </div>
    </div>
  );
}
