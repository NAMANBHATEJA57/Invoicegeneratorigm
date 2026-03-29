'use client';

import React, { useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import ServiceTable, { ServiceRow } from './ServiceTable';
import InvoicePreview, { InvoiceData } from './InvoicePreview';

interface Client {
  id: string;
  name: string;
  address: string;
  email?: string;
  phone?: string;
  gstin?: string;
}

interface InvoiceFormProps {
  invoiceId?: string;          // if set → edit mode
  invoiceNumber?: string;      // pre-filled in edit
  initialData?: {
    clientId: string;
    date: string;
    dueDate: string;
    notes: string;
    services: ServiceRow[];
  };
  clients: Client[];
}

function generateId() {
  return Math.random().toString(36).slice(2, 10);
}

export default function InvoiceForm({ invoiceId, invoiceNumber, initialData, clients: initialClients }: InvoiceFormProps) {
  const router = useRouter();
  const previewRef = useRef<HTMLDivElement>(null);
  const pdfRef = useRef<HTMLDivElement>(null);

  const [clients, setClients] = useState<Client[]>(initialClients);
  const [showNewClient, setShowNewClient] = useState(false);
  const [mobileView, setMobileView] = useState<'form' | 'preview'>('form');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  // Form state
  const [clientId, setClientId] = useState('');
  const [date, setDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [notes, setNotes] = useState('');
  const [services, setServices] = useState<ServiceRow[]>([]);

  // Initialize on mount
  React.useEffect(() => {
    setClientId(initialData?.clientId ?? '');
    setDate(initialData?.date ?? new Date().toISOString().split('T')[0]);
    
    if (initialData?.dueDate) {
      setDueDate(initialData.dueDate);
    } else {
      const d = new Date();
      d.setDate(d.getDate() + 7);
      setDueDate(d.toISOString().split('T')[0]);
    }
    
    setNotes(initialData?.notes ?? '');
    setServices(initialData?.services ?? [{ id: generateId(), description: '', qty: 1, rate: 0, total: 0 }]);
    setMounted(true);
  }, [initialData]);

  // Update due date when date changes
  const handleDateChange = (newDate: string) => {
    setDate(newDate);
    const d = new Date(newDate);
    d.setDate(d.getDate() + 7);
    setDueDate(d.toISOString().split('T')[0]);
  };

  // New client state
  const [newClient, setNewClient] = useState({ name: '', address: '', email: '', phone: '', gstin: '' });

  const selectedClient = clients.find((c) => c.id === clientId);
  const total = services.reduce((sum, s) => sum + s.total, 0);

  const invoiceData: InvoiceData = {
    invoiceNumber: invoiceNumber ?? '',
    date,
    dueDate,
    notes,
    client: {
      name: selectedClient?.name ?? '',
      address: selectedClient?.address ?? '',
      email: selectedClient?.email ?? '',
      phone: selectedClient?.phone ?? '',
      gstin: selectedClient?.gstin ?? '',
    },
    services,
  };

  // ─── Create new client ─────────────────────────────────────────────────────
  const handleCreateClient = async () => {
    if (!newClient.name.trim()) return;
    try {
      const res = await fetch('/api/client', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newClient),
      });
      if (!res.ok) throw new Error();
      const created: Client = await res.json();
      setClients((prev) => [...prev, created]);
      setClientId(created.id);
      setShowNewClient(false);
      setNewClient({ name: '', address: '', email: '', phone: '', gstin: '' });
    } catch {
      setError('Failed to create client.');
    }
  };

  // ─── Save invoice ──────────────────────────────────────────────────────────
  const handleSave = useCallback(async () => {
    if (!clientId) { setError('Please select or create a client.'); return; }
    if (services.some((s) => !s.description.trim())) { setError('All service rows need a description.'); return; }
    setError('');
    setSaving(true);
    try {
      const payload = { clientId, date, dueDate, notes, services };
      const res = invoiceId
        ? await fetch(`/api/invoice/${invoiceId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        : await fetch('/api/invoice', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });

      if (!res.ok) throw new Error();
      toast.success(invoiceId ? 'Invoice updated successfully!' : 'Invoice created successfully!');
      router.push('/dashboard');
    } catch {
      setError('Failed to save invoice. Please try again.');
    } finally {
      setSaving(false);
    }
  }, [clientId, date, dueDate, notes, services, invoiceId, router]);

  // ─── Download PDF ──────────────────────────────────────────────────────────
  const handleDownload = () => {
    if (!pdfRef.current) return;

    const origin = window.location.origin;
    const content = pdfRef.current!.outerHTML.replace(
      /src="(\/[^"]+)"/g,
      `src="${origin}$1"`
    );
    const filename = (invoiceNumber || 'invoice') + '.pdf';

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>${filename}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #fff; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    @page { margin: 0; size: A4 portrait; }
  </style>
</head>
<body>
  ${content}
  <script>
    (function() {
      var images = Array.from(document.querySelectorAll('img'));
      var total = images.length;
      var resolved = 0;
      function onDone() {
        resolved++;
        if (resolved >= total) { setTimeout(function() { window.print(); }, 400); }
      }
      if (total === 0) { setTimeout(function() { window.print(); }, 400); return; }
      images.forEach(function(img) {
        if (img.complete && img.naturalWidth !== 0) { onDone(); }
        else { img.addEventListener('load', onDone); img.addEventListener('error', onDone); }
      });
    })();
  <\/script>
</body>
</html>`;

    // Use a hidden iframe to trigger print dialog directly (no popup window)
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const iframe = document.createElement('iframe');
    iframe.style.cssText = 'position:fixed;left:-9999px;top:-9999px;width:0;height:0;border:none;';
    iframe.src = url;
    document.body.appendChild(iframe);
    iframe.onload = () => {
      // Give images inside iframe time to render
      setTimeout(() => {
        try { iframe.contentWindow?.print(); } catch {}
        setTimeout(() => {
          document.body.removeChild(iframe);
          URL.revokeObjectURL(url);
        }, 1000);
      }, 500);
    };
  };

  // ─── Duplicate ─────────────────────────────────────────────────────────────
  const handleDuplicate = useCallback(async () => {
    setSaving(true);
    try {
      const payload = { clientId, date, dueDate, notes, services };
      const res = await fetch('/api/invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      toast.success('Invoice duplicated successfully!');
      router.push('/dashboard');
    } catch {
      setError('Failed to duplicate invoice.');
    } finally {
      setSaving(false);
    }
  }, [clientId, date, dueDate, notes, services, router]);

  // ─── Render ────────────────────────────────────────────────────────────────
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-gray-400 font-medium">Loading form...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" suppressHydrationWarning>
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200" suppressHydrationWarning>
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button onClick={() => router.push('/dashboard')} className="text-gray-400 hover:text-gray-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <h1 className="font-semibold text-gray-800 text-sm sm:text-base">
              {invoiceId ? `Edit — ${invoiceNumber}` : 'New Invoice'}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {invoiceId && (
              <button
                onClick={handleDuplicate}
                disabled={saving}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Duplicate
              </button>
            )}
            {invoiceNumber && (
              <button
                onClick={handleDownload}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-gray-700 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                PDF
              </button>
            )}
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-60"
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>

        {/* Mobile toggle */}
        <div className="lg:hidden flex border-t border-gray-200">
          <button
            onClick={() => setMobileView('form')}
            className={`flex-1 py-2 text-xs font-medium transition-colors ${mobileView === 'form' ? 'text-green-700 border-b-2 border-green-600 bg-green-50' : 'text-gray-500'}`}
          >
            Form
          </button>
          <button
            onClick={() => setMobileView('preview')}
            className={`flex-1 py-2 text-xs font-medium transition-colors ${mobileView === 'preview' ? 'text-green-700 border-b-2 border-green-600 bg-green-50' : 'text-gray-500'}`}
          >
            Preview
          </button>
        </div>
      </header>

      {error && (
        <div className="max-w-screen-xl mx-auto px-4 pt-3">
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-2">{error}</div>
        </div>
      )}

      <div className="max-w-screen-xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-8">
        {/* ── FORM ── */}
        <div className={`w-full lg:w-[420px] xl:w-[480px] flex-shrink-0 space-y-5 ${mobileView === 'preview' ? 'hidden lg:block' : ''}`}>
          <div className="flex flex-col gap-8">
            {/* Client Selection */}
            <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 shadow-sm">
              <h2 className="text-sm font-bold text-gray-700 uppercase tracking-widest ml-1">Client</h2>
              <select
                value={clientId}
                onChange={(e) => {
                  if (e.target.value === '__new') { setShowNewClient(true); return; }
                  setClientId(e.target.value);
                  setShowNewClient(false);
                }}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base sm:text-sm focus:ring-4 focus:ring-green-100 focus:border-green-500 outline-none transition-all"
              >
                <option value="">— Select client —</option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
                <option value="__new">+ Add new client</option>
              </select>

              {showNewClient && (
                <div className="space-y-3 pt-4 border-t border-gray-100 animate-in slide-in-from-top-2 duration-300">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest ml-1">New client details</p>
                  <input
                    placeholder="Full name *"
                    value={newClient.name}
                    onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base sm:text-sm focus:ring-4 focus:ring-green-100 focus:border-green-500 outline-none transition-all placeholder:text-gray-300"
                  />
                  <textarea
                    placeholder="Address"
                    rows={2}
                    value={newClient.address}
                    onChange={(e) => setNewClient({ ...newClient, address: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base sm:text-sm focus:ring-4 focus:ring-green-100 focus:border-green-500 outline-none transition-all resize-none placeholder:text-gray-300"
                  />
                  <input
                    placeholder="Email"
                    type="email"
                    value={newClient.email}
                    onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base sm:text-sm focus:ring-4 focus:ring-green-100 focus:border-green-500 outline-none transition-all placeholder:text-gray-300"
                  />
                  <input
                    placeholder="Phone"
                    value={newClient.phone}
                    onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base sm:text-sm focus:ring-4 focus:ring-green-100 focus:border-green-500 outline-none transition-all placeholder:text-gray-300"
                  />
                  <input
                    placeholder="GSTIN"
                    value={newClient.gstin}
                    onChange={(e) => setNewClient({ ...newClient, gstin: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base sm:text-sm focus:ring-4 focus:ring-green-100 focus:border-green-500 outline-none transition-all placeholder:text-gray-300"
                  />
                  <div className="flex gap-3 pt-1">
                    <button
                      type="button"
                      onClick={handleCreateClient}
                      className="flex-1 py-3 text-sm font-bold text-white bg-green-600 rounded-xl hover:bg-green-700 transition-colors shadow-lg shadow-green-100"
                    >
                      Save Client
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowNewClient(false)}
                      className="px-4 py-3 text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </section>

            {/* Dates */}
            <section className="bg-white rounded-xl border border-gray-200 p-6 space-y-4 shadow-sm">
              <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Dates</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-tight ml-1">Invoice Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => handleDateChange(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base sm:text-sm focus:ring-4 focus:ring-green-100 focus:border-green-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-tight ml-1">Due Date</label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base sm:text-sm focus:ring-4 focus:ring-green-100 focus:border-green-500 outline-none transition-all"
                  />
                </div>
              </div>
            </section>

            {/* Services */}
            <section className="bg-white rounded-xl border border-gray-200 p-6 space-y-4 shadow-sm">
              <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Services</h2>
              <ServiceTable services={services} onChange={setServices} />
              <div className="flex justify-between items-center pt-3 border-t border-gray-100 text-sm font-semibold text-gray-700">
                <span>Total</span>
                <span className="text-lg text-green-700 font-bold">₹{total.toFixed(2)}</span>
              </div>
            </section>

            {/* Notes */}
            <section className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Notes</h2>
              <textarea
                rows={3}
                placeholder="Payment terms, thank you note, etc."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base sm:text-sm focus:ring-4 focus:ring-green-100 focus:border-green-500 outline-none transition-all resize-none placeholder:text-gray-400"
              />
            </section>

            {/* Mobile action buttons */}
            <div className="lg:hidden flex flex-col gap-2 pb-8">
              {invoiceNumber && (
                <button
                  onClick={handleDownload}
                  className="flex items-center justify-center gap-2 py-3 text-sm font-semibold text-white bg-gray-700 rounded-xl hover:bg-gray-800 transition-colors shadow-lg"
                >
                  Download PDF
                </button>
              )}
              {invoiceId && (
                <button
                  onClick={handleDuplicate}
                  disabled={saving}
                  className="flex items-center justify-center gap-2 py-3 text-sm font-medium text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
                >
                  Duplicate Invoice
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── PREVIEW ── */}
        <div className={`flex-1 ${mobileView === 'form' ? 'hidden lg:block' : ''}`}>
          <div className="lg:sticky lg:top-24 bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm lg:shadow-none">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-100 flex justify-between items-center sm:hidden">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Live Preview</span>
              <span className="text-[10px] text-gray-400 italic">Scale to fit</span>
            </div>
            <div className="overflow-auto p-4 flex justify-center bg-gray-100/50 min-h-[600px] lg:bg-transparent lg:p-0">
              <div 
                className="origin-top transition-transform duration-300 shadow-2xl lg:shadow-none mb-8 lg:mb-0" 
                style={{ 
                  width: '210mm',
                }}
              >
                <InvoicePreview data={invoiceData} ref={previewRef} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden unmasked preview for PDF generation */}
      <div style={{ position: 'absolute', left: '-9999px', top: 0, pointerEvents: 'none' }}>
        <InvoicePreview data={invoiceData} ref={pdfRef} unmasked />
      </div>
    </div>
  );
}
