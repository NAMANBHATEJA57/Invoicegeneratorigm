'use client';

export default function SpacingGuide() {
  const spacings = [
    { name: 'space-1', value: '4px', desc: 'Inner component spacing' },
    { name: 'space-2', value: '8px', desc: 'Tight item grouping' },
    { name: 'space-4', value: '16px', desc: 'Standard gap, padding' },
    { name: 'space-6', value: '24px', desc: 'Card padding, section gap' },
    { name: 'space-8', value: '32px', desc: 'Loose grouping' },
    { name: 'space-12', value: '48px', desc: 'Section spacing (mobile)' },
    { name: 'space-16', value: '64px', desc: 'Section spacing (desktop)' },
  ];

  return (
    <div className="space-y-12">
      <div className="space-y-2">
        <h2 className="text-sm font-bold tracking-widest text-primary uppercase">6. Spacing</h2>
        <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-ink">The 4pt / 8pt Grid</h3>
        <p className="text-gray font-secondary max-w-2xl text-lg">
          We use a strict 4pt baseline grid for micro-spacing and an 8pt grid for layout. This ensures mathematical rhythm and visual consistency.
        </p>
      </div>

      <div className="bg-surface border border-border rounded-3xl p-8 overflow-hidden relative">
        {/* Grid background for visual effect */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '8px 8px' }}
        />
        
        <div className="relative z-10 space-y-6">
          {spacings.map((space) => (
            <div key={space.name} className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="w-32 shrink-0">
                <div className="text-sm font-mono font-bold text-ink">{space.value}</div>
                <div className="text-xs text-gray">{space.name}</div>
              </div>
              <div className="flex-1 flex items-center gap-4">
                <div 
                  className="bg-primary/20 border border-primary/40 rounded-sm"
                  style={{ width: space.value, height: '24px' }}
                />
                <div className="text-sm text-gray font-secondary hidden md:block">{space.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
