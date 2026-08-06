'use client';

export default function WebsiteComponents() {
  return (
    <div className="space-y-12">
      <div className="space-y-2">
        <h2 className="text-sm font-bold tracking-widest text-primary uppercase">10. Website</h2>
        <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-ink">Structural Blocks</h3>
        <p className="text-gray font-secondary max-w-2xl text-lg">
          Websites should feel like premium software. We prioritize readability, clear call-to-actions, and elegant spacing over dense information architecture.
        </p>
      </div>

      <div className="space-y-12">
        {/* Mock Hero Section */}
        <div className="border border-border rounded-3xl overflow-hidden bg-background shadow-sm">
          <div className="bg-surface border-b border-border px-4 py-2 flex gap-2">
            <div className="w-3 h-3 rounded-full bg-danger/50" />
            <div className="w-3 h-3 rounded-full bg-warning/50" />
            <div className="w-3 h-3 rounded-full bg-success/50" />
          </div>
          <div className="p-12 md:p-24 flex flex-col items-center text-center bg-gradient-to-b from-primary-light/20 to-background">
            <div className="inline-block px-3 py-1 rounded-full bg-surface border border-border text-xs font-semibold text-primary mb-6 shadow-sm">
              New Course Available
            </div>
            <h4 className="text-4xl md:text-5xl font-bold text-ink max-w-2xl leading-tight mb-6">
              Master Science with Confidence
            </h4>
            <p className="text-lg text-gray font-secondary max-w-xl mb-10">
              Join thousands of students learning concepts the right way. No rote memorisation, just pure understanding.
            </p>
            <div className="flex gap-4">
              <div className="w-32 h-12 rounded-xl bg-primary" />
              <div className="w-32 h-12 rounded-xl bg-surface border border-border" />
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-8 rounded-3xl bg-surface border border-border">
              <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center mb-6">
                <div className="w-6 h-6 rounded bg-primary/20" />
              </div>
              <h5 className="font-bold text-ink mb-2">Feature Block {i}</h5>
              <p className="text-sm text-gray font-secondary leading-relaxed">
                Clear description of the feature emphasizing the benefit to the student's learning journey.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
