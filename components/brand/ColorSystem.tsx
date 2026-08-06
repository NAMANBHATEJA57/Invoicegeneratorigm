'use client';

import { Copy } from 'lucide-react';
import { toast } from 'sonner';

export default function ColorSystem() {
  const colors = [
    { name: 'Primary Green', hex: '#456D38', usage: 'Primary CTAs, Brand identity, Active states' },
    { name: 'Forest Green', hex: '#26472B', usage: 'Hover states, High emphasis elements' },
    { name: 'Soft Sage', hex: '#DDE8D7', usage: 'Subtle backgrounds, Selected states, Tags' },
    { name: 'Academic Gold', hex: '#D4A017', usage: 'Accents, Highlights, Achievement badges' },
    { name: 'Background', hex: '#FAFAF8', usage: 'Main page background (warm white)' },
    { name: 'Surface (White)', hex: '#FFFFFF', usage: 'Cards, Modals, Popovers' },
    { name: 'Text (Ink)', hex: '#18181B', usage: 'Primary text, Headings, High contrast' },
    { name: 'Gray', hex: '#71717A', usage: 'Secondary text, Muted icons, Borders' },
  ];

  const copyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    toast.success(`Copied ${hex}`);
  };

  return (
    <div className="space-y-12">
      <div className="space-y-2">
        <h2 className="text-sm font-bold tracking-widest text-primary uppercase">4. Color System</h2>
        <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-ink">Palette</h3>
        <p className="text-gray font-secondary max-w-2xl text-lg">
          Our colors are calm, academic, and purposeful. Do not introduce unnecessary colors. Every page should feel calm before colourful.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {colors.map((color) => {
          const isLight = ['#DDE8D7', '#FAFAF8', '#FFFFFF'].includes(color.hex);
          return (
            <div key={color.hex} className="group flex flex-col rounded-3xl overflow-hidden border border-border bg-surface shadow-sm hover:shadow-md transition-shadow">
              <div 
                className="h-32 w-full relative flex items-end justify-between p-4"
                style={{ backgroundColor: color.hex }}
              >
                <span className={`font-mono text-sm font-medium ${isLight ? 'text-ink' : 'text-white'}`}>
                  {color.hex}
                </span>
                <button 
                  onClick={() => copyHex(color.hex)}
                  className={`opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full backdrop-blur-md bg-white/20 hover:bg-white/40 ${isLight ? 'text-ink' : 'text-white'}`}
                  title="Copy HEX"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h4 className="font-bold text-ink mb-1">{color.name}</h4>
                <p className="text-xs text-gray font-secondary mt-auto leading-relaxed">{color.usage}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
