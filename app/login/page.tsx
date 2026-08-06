'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ArrowLeft, LockKeyhole } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        toast.success('Authentication successful');
        router.push('/dashboard');
        router.refresh();
      } else {
        toast.error('Invalid ID or Password');
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-canvas relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-brand-primary/5 blur-[120px]" />
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[40%] rounded-full bg-brand-primary/5 blur-[100px]" />
      </div>

      <div className="w-full max-w-[440px] px-6 relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[14px] font-medium text-muted hover:text-ink transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Brand Guidelines
        </Link>

        <div className="bg-white rounded-2xl border border-hairline p-8 md:p-10 shadow-card">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-surface-soft rounded-2xl flex items-center justify-center border border-hairline/50">
              <Image src="/only-icon.svg" alt="Inquisitive Mind Icon" width={32} height={40} className="w-auto h-8" />
            </div>
          </div>
          
          <div className="text-center mb-10">
            <h1 className="text-[24px] font-bold text-ink tracking-tight mb-2">Admin Portal</h1>
            <p className="text-[15px] text-body">Please sign in to access the Invoice Generator.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="block text-[13px] font-semibold text-ink uppercase tracking-wide">ID / Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your ID"
                className="w-full px-4 py-3 bg-surface border border-border focus:border-brand-primary focus:ring-1 focus:ring-brand-primary rounded-md text-[15px] outline-none transition-all"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-[13px] font-semibold text-ink uppercase tracking-wide">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 bg-surface border border-border focus:border-brand-primary focus:ring-1 focus:ring-brand-primary rounded-md text-[15px] outline-none transition-all"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-[14px] bg-brand-primary text-white text-[16px] font-semibold rounded-md hover:bg-brand-active transition-all mt-4 disabled:opacity-70 flex items-center justify-center"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
