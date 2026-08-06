'use client';

import { Download } from 'lucide-react';

export default function LogoSystem() {
  return (
    <div className="space-y-12">
      <div className="space-y-2">
        <h2 className="text-sm font-bold tracking-widest text-primary uppercase">3. Logo</h2>
        <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-ink">Brand Identity</h3>
        <p className="text-gray font-secondary max-w-2xl text-lg">
          The logo is the most recognizable asset of our brand. It should always be displayed with ample breathing room.
        </p>
      </div>

      {/* Primary Logo Placeholder */}
      <div className="space-y-4">
        <h4 className="text-lg font-bold text-ink">Primary Logo</h4>
        <div className="w-full h-[300px] rounded-3xl bg-surface border border-border flex flex-col items-center justify-center relative overflow-hidden">
          {/* Logo mockup using typography */}
          <div className="flex items-center justify-center">
            <img src="/logo.svg" alt="Inquisitive Mind Logo" className="h-16 w-auto object-contain" />
          </div>
          
          {/* Safe Area indicators */}
          <div className="absolute inset-8 border border-primary/20 border-dashed rounded-xl hidden md:block" />
          <div className="absolute top-4 left-4 text-xs font-mono text-gray">Safe Area: 2x</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Icon */}
        <div className="space-y-4">
          <h4 className="text-lg font-bold text-ink">Icon Only</h4>
          <div className="h-[240px] rounded-3xl bg-background border border-border flex items-center justify-center">
            <img src="/only-icon.svg" alt="Inquisitive Mind Icon" className="w-16 h-auto" />
          </div>
        </div>
        
        {/* Monochrome */}
        <div className="space-y-4">
          <h4 className="text-lg font-bold text-ink">Monochrome</h4>
          <div className="h-[240px] rounded-3xl bg-brand-primary border border-border flex items-center justify-center">
            <div className="flex items-center justify-center invert brightness-0">
              <img src="/logo.svg" alt="Inquisitive Mind Logo" className="h-10 w-auto object-contain" />
            </div>
          </div>
        </div>
      </div>

      {/* Incorrect Usage */}
      <div className="space-y-4">
        <h4 className="text-lg font-bold text-ink">Incorrect Usage</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Don't stretch", style: "scale-y-150" },
            { label: "Don't change colors", style: "hue-rotate-90" },
            { label: "Don't add shadows", style: "drop-shadow-xl" },
          ].map((item, i) => (
            <div key={i} className="h-[140px] rounded-2xl bg-surface border border-danger/30 flex flex-col items-center justify-center gap-3">
              <div className={`w-12 h-auto flex items-center justify-center ${item.style}`}>
                <img src="/only-icon.svg" alt="Icon" className="w-full h-auto" />
              </div>
              <span className="text-xs font-semibold text-danger">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Downloads */}
      <div className="pt-8 border-t border-border">
        <h4 className="text-lg font-bold text-ink mb-4">Downloads</h4>
        <div className="flex flex-wrap gap-4">
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-surface border border-border hover:bg-gray-50 transition-colors text-sm font-semibold">
            <Download className="w-4 h-4" /> SVG Pack
          </button>
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-surface border border-border hover:bg-gray-50 transition-colors text-sm font-semibold">
            <Download className="w-4 h-4" /> PNG Pack
          </button>
        </div>
      </div>
    </div>
  );
}
