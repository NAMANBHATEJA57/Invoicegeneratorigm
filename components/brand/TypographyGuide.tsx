'use client';

export default function TypographyGuide() {
  return (
    <div className="space-y-12">
      <div className="space-y-2">
        <h2 className="text-sm font-bold tracking-widest text-primary uppercase">5. Typography</h2>
        <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-ink">Brand Fonts</h3>
        <p className="text-gray font-secondary max-w-2xl text-lg">
          Typography should always carry more visual weight than graphics. We use three families to establish hierarchy and clarity.
        </p>
      </div>

      <div className="space-y-16">
        {/* Headings */}
        <div className="space-y-6">
          <div className="flex items-end justify-between border-b border-border pb-2">
            <h4 className="text-xl font-bold text-ink">Headings</h4>
            <span className="text-sm font-mono text-gray bg-gray-50 px-2 py-1 rounded">Manrope</span>
          </div>
          <div className="space-y-8 overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="w-24 text-sm font-mono text-gray shrink-0">Display</div>
              <div className="text-6xl md:text-7xl font-bold tracking-tight text-ink font-sans">Learn. Think. Grow.</div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="w-24 text-sm font-mono text-gray shrink-0">H1</div>
              <div className="text-4xl md:text-5xl font-bold tracking-tight text-ink font-sans">Designing Better Experiences</div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="w-24 text-sm font-mono text-gray shrink-0">H2</div>
              <div className="text-3xl font-bold tracking-tight text-ink font-sans">Brand Philosophy</div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="w-24 text-sm font-mono text-gray shrink-0">H3</div>
              <div className="text-xl font-bold text-ink font-sans">Core Values</div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="space-y-6">
          <div className="flex items-end justify-between border-b border-border pb-2">
            <h4 className="text-xl font-bold text-ink">Body & Interface</h4>
            <span className="text-sm font-mono text-gray bg-gray-50 px-2 py-1 rounded">Inter</span>
          </div>
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-24 text-sm font-mono text-gray shrink-0">Body Large</div>
              <div className="text-lg font-secondary text-gray max-w-2xl leading-relaxed">
                Empower students through concept-based learning, structured resources, digital products and mentorship that builds confidence beyond classrooms.
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-24 text-sm font-mono text-gray shrink-0">Body Base</div>
              <div className="text-base font-secondary text-gray max-w-2xl leading-relaxed">
                The interface itself should help people learn. Good hierarchy. Good colour usage. Good grouping. Good information architecture.
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="w-24 text-sm font-mono text-gray shrink-0">Button</div>
              <div className="text-sm font-semibold text-white bg-primary px-4 py-2 rounded-lg font-secondary">
                Get Started
              </div>
            </div>
          </div>
        </div>

        {/* Mono */}
        <div className="space-y-6">
          <div className="flex items-end justify-between border-b border-border pb-2">
            <h4 className="text-xl font-bold text-ink">Monospace</h4>
            <span className="text-sm font-mono text-gray bg-gray-50 px-2 py-1 rounded">IBM Plex Mono</span>
          </div>
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-24 text-sm font-mono text-gray shrink-0">Code snippet</div>
              <div className="p-4 bg-ink text-white rounded-xl font-mono text-sm max-w-2xl w-full">
                <span className="text-gray-400">{'// Primary configuration'}</span><br/>
                <span className="text-accent">const</span> theme = {'{'}<br/>
                &nbsp;&nbsp;colors: {'{'}<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;primary: <span className="text-primary-light">"#456D38"</span><br/>
                &nbsp;&nbsp;{'}'}<br/>
                {'}'};
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
