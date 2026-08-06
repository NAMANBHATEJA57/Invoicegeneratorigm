'use client';

export default function StudyNotesDesign() {
  return (
    <div className="space-y-12">
      <div className="space-y-2">
        <h2 className="text-sm font-bold tracking-widest text-primary uppercase">11. Study Notes</h2>
        <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-ink">PDF & Print Materials</h3>
        <p className="text-gray font-secondary max-w-2xl text-lg">
          Our study materials are our flagship product. They must be beautiful, readable, and perfectly structured to aid memory retention.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
          <div className="p-6 bg-surface border border-border rounded-3xl space-y-4">
            <h4 className="font-bold text-ink">Document Structure</h4>
            <ul className="space-y-3 font-secondary text-sm text-gray">
              <li className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-gray-200 border border-gray-300" /> Chapter Cover (Visual)</li>
              <li className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-gray-200 border border-gray-300" /> Theory & Concepts</li>
              <li className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-primary-light border border-primary/30" /> Real-life Examples</li>
              <li className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-accent/20 border border-accent/30" /> Formula Boxes</li>
              <li className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-gray-200 border border-gray-300" /> Practice Questions</li>
              <li className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-gray-200 border border-gray-300" /> Chapter Summary</li>
            </ul>
          </div>
          
          <div className="p-6 bg-primary border border-primary-dark rounded-3xl text-white">
            <h4 className="font-bold mb-2">Typography Rules for Print</h4>
            <p className="text-sm font-secondary opacity-90 leading-relaxed">
              Use Inter for all body copy. Ensure 1.5x line height for readability. Important keywords should be bolded, not highlighted with garish colors.
            </p>
          </div>
        </div>

        {/* Note Page Mockup */}
        <div className="aspect-[1/1.4] bg-white border border-gray-300 shadow-xl rounded-md p-8 md:p-12 relative flex flex-col">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full" />
          
          <div className="flex justify-between items-start mb-12">
            <div>
              <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Chapter 4</p>
              <h2 className="text-2xl font-bold text-ink">Carbon and its<br/>Compounds</h2>
            </div>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-[8px]">IM</div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="w-full h-3 bg-gray-100 rounded-full" />
            <div className="w-5/6 h-3 bg-gray-100 rounded-full" />
            <div className="w-full h-3 bg-gray-100 rounded-full" />
            <div className="w-4/5 h-3 bg-gray-100 rounded-full" />
          </div>

          {/* Callout box */}
          <div className="p-4 bg-primary/5 border-l-4 border-primary rounded-r-lg mb-8">
            <div className="w-1/2 h-4 bg-primary/20 rounded mb-2" />
            <div className="w-full h-2 bg-gray-200 rounded mb-1" />
            <div className="w-3/4 h-2 bg-gray-200 rounded" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-square bg-gray-50 border border-gray-200 rounded-lg" />
            <div className="aspect-square bg-gray-50 border border-gray-200 rounded-lg" />
          </div>

          <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between text-[8px] text-gray-400 font-secondary">
            <span>Inquisitive Mind © 2026</span>
            <span>Page 14</span>
          </div>
        </div>
      </div>
    </div>
  );
}
