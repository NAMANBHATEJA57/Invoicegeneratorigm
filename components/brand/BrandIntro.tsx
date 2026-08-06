'use client';

export default function BrandIntro() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-sm font-bold tracking-widest text-primary uppercase">1. Introduction</h2>
        <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-ink">Why We Exist</h3>
      </div>
      
      <div className="prose prose-lg text-gray font-secondary leading-relaxed max-w-none">
        <p className="text-2xl text-ink font-medium leading-snug">
          Learning should never feel confusing.
        </p>
        <p>
          At Inquisitive Mind, we believe education becomes meaningful when students understand concepts instead of memorising answers.
        </p>
        <p>
          Every interaction, whether it's a classroom session, a PDF note, a social media post, or a website, should inspire curiosity, confidence, and clarity.
        </p>
        <p>
          This Design System ensures every experience reflects that exact philosophy. We are building a single visual language that communicates clearly and effectively across every medium.
        </p>
      </div>
    </div>
  );
}
