'use client';

export default function BrandPhilosophy() {
  const values = [
    { title: 'Curiosity', desc: 'Encouraging students to ask "why" instead of just "what".' },
    { title: 'Clarity', desc: 'Simplifying complexity through clear communication and design.' },
    { title: 'Confidence', desc: 'Building self-belief through structured learning.' },
    { title: 'Consistency', desc: 'Providing reliable, high-quality experiences every single time.' },
    { title: 'Care', desc: 'Deeply supporting each student\'s unique journey.' },
  ];

  return (
    <div className="space-y-12">
      <div className="space-y-2">
        <h2 className="text-sm font-bold tracking-widest text-primary uppercase">2. Brand Philosophy</h2>
        <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-ink">Mission & Values</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-8 rounded-3xl bg-surface border border-border shadow-sm">
          <h4 className="text-lg font-bold text-ink mb-3">Vision</h4>
          <p className="text-gray font-secondary leading-relaxed">
            To become India's most trusted learning ecosystem for school students by combining exceptional teaching, technology, and beautifully designed learning experiences.
          </p>
        </div>
        <div className="p-8 rounded-3xl bg-surface border border-border shadow-sm">
          <h4 className="text-lg font-bold text-ink mb-3">Mission</h4>
          <p className="text-gray font-secondary leading-relaxed">
            Empower students through concept-based learning, structured resources, digital products, and mentorship that builds confidence beyond classrooms.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <h4 className="text-xl font-bold text-ink">Core Values</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {values.map((v, i) => (
            <div key={i} className="p-6 rounded-2xl bg-background border border-border/50 hover:border-primary/30 transition-colors">
              <h5 className="font-bold text-ink mb-2">{v.title}</h5>
              <p className="text-sm text-gray font-secondary leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
