'use client';

export default function Changelog() {
  const logs = [
    {
      version: 'v1.0.0',
      date: 'August 6, 2026',
      changes: [
        'Initial release of the Inquisitive Mind Design System.',
        'Established core color palette (Primary Green, Forest Green, Soft Sage, Academic Gold).',
        'Defined typography hierarchy using Manrope, Inter, and IBM Plex Mono.',
        'Created guidelines for Logo usage, Iconography, and Spacing.',
        'Added UI component showcases and Social Media templates.',
        'Documented the 6-step Teaching Framework.',
      ]
    }
  ];

  return (
    <div className="space-y-12">
      <div className="space-y-2">
        <h2 className="text-sm font-bold tracking-widest text-primary uppercase">16. Changelog</h2>
        <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-ink">Version History</h3>
        <p className="text-gray font-secondary max-w-2xl text-lg">
          Track updates, additions, and modifications to the design system over time.
        </p>
      </div>

      <div className="space-y-12">
        {logs.map((log) => (
          <div key={log.version} className="relative pl-8 md:pl-0">
            <div className="hidden md:block absolute left-[120px] top-2 bottom-[-48px] w-px bg-border last:bottom-0" />
            
            <div className="flex flex-col md:flex-row gap-4 md:gap-12">
              <div className="md:w-[120px] shrink-0 pt-1 relative">
                <div className="hidden md:block absolute right-[-5px] top-2 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-background z-10" />
                <h4 className="font-bold text-ink">{log.version}</h4>
                <p className="text-sm text-gray font-secondary mt-1">{log.date}</p>
              </div>
              
              <div className="flex-1 bg-surface border border-border rounded-3xl p-8 shadow-sm">
                <ul className="space-y-4">
                  {log.changes.map((change, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
                      <span className="text-gray font-secondary leading-relaxed">{change}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
