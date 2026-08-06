'use client';

export default function IllustrationPhotography() {
  return (
    <div className="space-y-12">
      <div className="space-y-2">
        <h2 className="text-sm font-bold tracking-widest text-primary uppercase">13. Media Style</h2>
        <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-ink">Illustrations & Photography</h3>
        <p className="text-gray font-secondary max-w-2xl text-lg">
          Our media should feel authentic, academic, and calm. We avoid loud stock photography and cartoonish clip-art.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Illustrations */}
        <div className="space-y-6">
          <h4 className="text-xl font-bold text-ink">Illustration Rules</h4>
          <div className="aspect-[4/3] bg-surface border border-border rounded-3xl flex items-center justify-center p-8 relative overflow-hidden">
            {/* Minimal scientific diagram mockup */}
            <div className="relative w-48 h-48">
              <div className="absolute inset-0 border-2 border-primary rounded-full" />
              <div className="absolute inset-4 border-2 border-primary/30 rounded-full border-dashed animate-[spin_10s_linear_infinite]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-primary rounded-full" />
              <div className="absolute top-4 right-4 w-4 h-4 bg-accent rounded-full" />
            </div>
          </div>
          <ul className="space-y-2 text-sm text-gray font-secondary list-disc pl-4">
            <li>Minimal and educational, not decorative.</li>
            <li>Flat vector styles with mono-weight lines.</li>
            <li>Scientific or geometric forms preferred.</li>
            <li>Use the primary palette strictly.</li>
          </ul>
        </div>

        {/* Photography */}
        <div className="space-y-6">
          <h4 className="text-xl font-bold text-ink">Photography Rules</h4>
          <div className="aspect-[4/3] bg-[#E5E5E5] border border-border rounded-3xl overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent z-10" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-mono text-gray-500 bg-white/80 px-3 py-1 rounded backdrop-blur z-20">Photo Placeholder</span>
            </div>
            {/* Simulating natural light */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/40 blur-3xl rounded-full -mr-20 -mt-20 z-0" />
          </div>
          <ul className="space-y-2 text-sm text-gray font-secondary list-disc pl-4">
            <li>Real students in natural lighting.</li>
            <li>Authentic moments of collaboration or focus.</li>
            <li>No forced smiles or fake corporate stock.</li>
            <li>Warm, slightly desaturated tones.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
