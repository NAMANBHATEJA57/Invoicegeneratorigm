'use client';

import { 
  BookOpen, Calculator, GraduationCap, LayoutDashboard, 
  Settings, Users, FileText, Compass, Lightbulb, 
  CheckCircle2, AlertCircle, PlayCircle
} from 'lucide-react';

export default function Iconography() {
  const icons = [
    { icon: <BookOpen className="w-6 h-6" />, name: 'BookOpen' },
    { icon: <GraduationCap className="w-6 h-6" />, name: 'GraduationCap' },
    { icon: <Calculator className="w-6 h-6" />, name: 'Calculator' },
    { icon: <LayoutDashboard className="w-6 h-6" />, name: 'LayoutDashboard' },
    { icon: <Users className="w-6 h-6" />, name: 'Users' },
    { icon: <FileText className="w-6 h-6" />, name: 'FileText' },
    { icon: <Compass className="w-6 h-6" />, name: 'Compass' },
    { icon: <Lightbulb className="w-6 h-6" />, name: 'Lightbulb' },
    { icon: <PlayCircle className="w-6 h-6" />, name: 'PlayCircle' },
    { icon: <Settings className="w-6 h-6" />, name: 'Settings' },
    { icon: <CheckCircle2 className="w-6 h-6" />, name: 'CheckCircle' },
    { icon: <AlertCircle className="w-6 h-6" />, name: 'AlertCircle' },
  ];

  return (
    <div className="space-y-12">
      <div className="space-y-2">
        <h2 className="text-sm font-bold tracking-widest text-primary uppercase">7. Icons</h2>
        <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-ink">Lucide Icons</h3>
        <p className="text-gray font-secondary max-w-2xl text-lg">
          We use Lucide Icons. Stroke width must always be exactly 2px with rounded caps and joins to match our friendly, approachable typography.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {icons.map((item, i) => (
          <div key={i} className="flex flex-col items-center justify-center p-6 bg-surface border border-border rounded-2xl hover:border-primary/30 hover:bg-background transition-colors group cursor-default">
            <div className="text-ink group-hover:text-primary transition-colors mb-3">
              {item.icon}
            </div>
            <span className="text-xs font-mono text-gray">{item.name}</span>
          </div>
        ))}
      </div>

      <div className="p-6 bg-primary-light/30 border border-primary/20 rounded-2xl flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
        <div className="space-y-1">
          <h4 className="font-bold text-ink">Icon Guidelines</h4>
          <ul className="text-sm text-gray font-secondary space-y-1 list-disc pl-4">
            <li>Never use filled icons unless representing active state.</li>
            <li>Default size is 24x24px (w-6 h-6).</li>
            <li>Stroke width strictly 2px.</li>
          </ul>
        </div>
        <div className="flex items-center gap-4 text-primary">
          <BookOpen className="w-12 h-12 stroke-[2px]" />
          <span className="text-2xl opacity-50">+</span>
          <GraduationCap className="w-12 h-12 stroke-[2px]" />
        </div>
      </div>
    </div>
  );
}
