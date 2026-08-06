'use client';

import { Play, Quote } from 'lucide-react';

export default function SocialMediaSystem() {
  return (
    <div className="space-y-12">
      <div className="space-y-2">
        <h2 className="text-sm font-bold tracking-widest text-primary uppercase">9. Social Media</h2>
        <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-ink">Content Templates</h3>
        <p className="text-gray font-secondary max-w-2xl text-lg">
          Consistency is key to trust. Our social media templates are designed to be recognizable, educational, and clean.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Carousel Cover */}
        <div className="space-y-3">
          <div className="aspect-square bg-surface border border-border rounded-2xl p-6 flex flex-col relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -mr-10 -mt-10" />
            <div className="flex items-center gap-2 mb-auto text-primary">
              <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-bold">IM</div>
              <span className="text-xs font-bold tracking-wider uppercase">Study Tip</span>
            </div>
            
            <div>
              <h4 className="text-3xl font-bold text-ink leading-tight mb-2">How to Master<br/>Carbon Compounds</h4>
              <p className="text-sm text-gray font-secondary">Swipe to learn the 3-step method →</p>
            </div>
          </div>
          <p className="text-sm font-bold text-ink text-center">Carousel Cover</p>
        </div>

        {/* Reel Cover */}
        <div className="space-y-3">
          <div className="aspect-[9/16] max-h-[400px] mx-auto w-full bg-ink border border-border rounded-2xl p-6 flex flex-col justify-end relative overflow-hidden shadow-md">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
            <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] mix-blend-overlay" />
            
            <div className="relative z-20 space-y-4">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white mx-auto mb-8">
                <Play className="w-5 h-5 ml-1" />
              </div>
              <div className="bg-primary px-3 py-1 rounded text-[10px] font-bold text-white w-fit uppercase tracking-wider">Exam Alert</div>
              <h4 className="text-2xl font-bold text-white leading-tight">CBSE 2026 Board Dates Announced</h4>
            </div>
          </div>
          <p className="text-sm font-bold text-ink text-center">Reel Cover (9:16)</p>
        </div>

        {/* Quote / Testimonial */}
        <div className="space-y-3">
          <div className="aspect-square bg-primary border border-primary-dark rounded-2xl p-8 flex flex-col justify-center relative overflow-hidden shadow-sm">
            <Quote className="w-12 h-12 text-white/20 absolute top-8 left-8" />
            <div className="relative z-10">
              <p className="text-xl font-secondary text-white font-medium leading-relaxed mb-6">
                "The way concepts are broken down makes Science my favorite subject now. I finally understand the 'why' behind formulas."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20" />
                <div>
                  <p className="text-sm font-bold text-white">Rahul S.</p>
                  <p className="text-xs text-white/80 font-secondary">Class 10 Student</p>
                </div>
              </div>
            </div>
          </div>
          <p className="text-sm font-bold text-ink text-center">Quote / Testimonial</p>
        </div>
      </div>
    </div>
  );
}
