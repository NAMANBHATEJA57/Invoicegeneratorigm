'use client';

import React, { useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import ServiceTable, { ServiceRow } from './ServiceTable';
import InvoicePreview, { InvoiceData } from './InvoicePreview';
import { BILLERS } from '@/lib/biller';

interface Client {
  id: string;
  name: string;
  address: string;
  email?: string | null;
  phone?: string | null;
  gstin?: string | null;
  cin?: string | null;
  bankName?: string | null;
  accountName?: string | null;
  accountNumber?: string | null;
  ifsc?: string | null;
  branch?: string | null;
}

interface InvoiceFormProps {
  invoiceId?: string;          // if set → edit mode
  invoiceNumber?: string;      // pre-filled in edit
  initialData?: {
    clientId: string;
    date: string;
    dueDate: string;
    notes: string;
    showPan?: boolean;
    selectedPan?: string;
    showClientBankDetails?: boolean;
    billerId?: string;
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
  const [customInvoiceNumber, setCustomInvoiceNumber] = useState('');
  const [notes, setNotes] = useState('');
  const [billerId, setBillerId] = useState('rupali');
  const [showPan, setShowPan] = useState(true);
  const [selectedPan, setSelectedPan] = useState(BILLERS[0].pan);
  const [showClientBankDetails, setShowClientBankDetails] = useState(false);
  const [services, setServices] = useState<ServiceRow[]>([]);

  // Initialize on mount
  React.useEffect(() => {
    setClientId(initialData?.clientId ?? '');
    setDate(initialData?.date ?? new Date().toISOString().split('T')[0]);
    setCustomInvoiceNumber(invoiceNumber ?? '');
    
    if (initialData?.dueDate) {
      setDueDate(initialData.dueDate);
    } else {
      const d = new Date();
      d.setDate(d.getDate() + 7);
      setDueDate(d.toISOString().split('T')[0]);
    }
    
    setNotes(initialData?.notes ?? '');
    setBillerId(initialData?.billerId ?? 'rupali');
    if (initialData?.showPan !== undefined) setShowPan(initialData.showPan);
    setSelectedPan(initialData?.selectedPan ?? BILLERS[0].pan);
    setShowClientBankDetails(initialData?.showClientBankDetails ?? false);
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
  const [newClient, setNewClient] = useState({ name: '', address: '', email: '', phone: '', gstin: '', cin: '', bankName: '', accountName: '', accountNumber: '', ifsc: '', branch: '' });

  const selectedClient = clients.find((c) => c.id === clientId);
  const total = services.reduce((sum, s) => sum + s.total, 0);

  const invoiceData: InvoiceData = {
    invoiceNumber: customInvoiceNumber || (invoiceNumber ?? 'Auto-generated'),
    date,
    dueDate,
    notes,
    billerId,
    showPan,
    selectedPan,
    showClientBankDetails,
    client: {
      name: selectedClient?.name ?? '',
      address: selectedClient?.address ?? '',
      email: selectedClient?.email ?? '',
      phone: selectedClient?.phone ?? '',
      gstin: selectedClient?.gstin ?? '',
      cin: selectedClient?.cin ?? '',
      bankName: selectedClient?.bankName ?? '',
      accountName: selectedClient?.accountName ?? '',
      accountNumber: selectedClient?.accountNumber ?? '',
      ifsc: selectedClient?.ifsc ?? '',
      branch: selectedClient?.branch ?? '',
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
      setNewClient({ name: '', address: '', email: '', phone: '', gstin: '', cin: '', bankName: '', accountName: '', accountNumber: '', ifsc: '', branch: '' });
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
      const payload = { clientId, date, dueDate, notes, showPan, selectedPan, showClientBankDetails, billerId, services, customInvoiceNumber };
      const res = invoiceId
        ? await fetch(`/api/invoice/${invoiceId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        : await fetch('/api/invoice', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });

      if (!res.ok) throw new Error();
      toast.success(invoiceId ? 'Invoice updated successfully!' : 'Invoice created successfully!');
      router.refresh();
      router.push('/dashboard');
    } catch {
      setError('Failed to save invoice. Please try again.');
    } finally {
      setSaving(false);
    }
  }, [clientId, date, dueDate, notes, showPan, showClientBankDetails, billerId, services, invoiceId, router, customInvoiceNumber]);

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
      const payload = { clientId, date, dueDate, notes, showPan, selectedPan, showClientBankDetails, billerId, services, customInvoiceNumber };
      const res = await fetch('/api/invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      toast.success('Invoice duplicated successfully!');
      router.refresh();
      router.push('/dashboard');
    } catch {
      setError('Failed to duplicate invoice.');
    } finally {
      setSaving(false);
    }
  }, [clientId, date, dueDate, notes, showPan, showClientBankDetails, billerId, services, router, customInvoiceNumber]);

  // ─── Render ────────────────────────────────────────────────────────────────
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-gray-400 font-medium">Loading form...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-soft" suppressHydrationWarning>
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-canvas border-b border-hairline h-[80px] flex items-center" suppressHydrationWarning>
        <div className="w-full max-w-screen-xl mx-auto px-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <button onClick={() => router.push('/dashboard')} className="w-[32px] h-[32px] flex items-center justify-center bg-surface-strong text-ink rounded-full hover:bg-hairline-soft transition-colors">
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            </button>
            <h1 className="text-[21px] font-bold text-ink leading-[1.43] tracking-normal">
              {invoiceId ? `Edit — ${invoiceNumber}` : 'New Invoice'}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {invoiceId && (
              <button
                onClick={handleDuplicate}
                disabled={saving}
                className="hidden sm:flex items-center gap-1.5 px-[24px] py-[14px] text-[16px] font-medium text-ink bg-canvas border border-ink rounded-sm hover:bg-surface-soft transition-colors h-[48px]"
              >
                <span className="material-symbols-outlined text-[18px]">content_copy</span>
                Duplicate
              </button>
            )}
            {invoiceNumber && (
              <button
                onClick={handleDownload}
                className="hidden sm:flex items-center gap-1.5 px-[24px] py-[14px] text-[16px] font-medium text-ink bg-canvas border border-hairline rounded-sm hover:bg-surface-soft transition-colors h-[48px]"
              >
                <span className="material-symbols-outlined text-[18px]">download</span>
                PDF
              </button>
            )}
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center justify-center px-[24px] py-[14px] text-[16px] font-medium text-white bg-brand-primary rounded-sm hover:bg-brand-active transition-colors disabled:bg-brand-disabled h-[48px] w-[100px]"
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>

        {/* Mobile toggle */}
        <div className="lg:hidden flex border-t border-hairline w-full px-6">
          <button
            onClick={() => setMobileView('form')}
            className={`flex-1 py-4 text-[16px] font-medium transition-colors ${mobileView === 'form' ? 'text-ink border-b-2 border-ink' : 'text-muted'}`}
          >
            Form
          </button>
          <button
            onClick={() => setMobileView('preview')}
            className={`flex-1 py-4 text-[16px] font-medium transition-colors ${mobileView === 'preview' ? 'text-ink border-b-2 border-ink' : 'text-muted'}`}
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
            {/* Biller Selection */}
            <section className="bg-canvas rounded-md border border-hairline p-6 space-y-4 shadow-none">
              <h2 className="text-[14px] font-medium text-muted uppercase tracking-wide">Billed From</h2>
              <select
                value={billerId}
                onChange={(e) => {
                  setBillerId(e.target.value);
                  const newBiller = BILLERS.find(b => b.id === e.target.value);
                  if (newBiller) setSelectedPan(newBiller.pan);
                }}
                className="w-full border border-hairline rounded-sm px-[12px] py-[12px] text-ink focus:border-ink focus:border-2 focus:ring-0 outline-none transition-all bg-canvas appearance-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236a6a6a' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
              >
                {BILLERS.map((b) => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
            </section>

            {/* Client Selection */}
            <section className="bg-canvas rounded-md border border-hairline p-6 space-y-4 shadow-none">
              <h2 className="text-[14px] font-medium text-muted uppercase tracking-wide">Client</h2>
              <select
                value={clientId}
                onChange={(e) => {
                  if (e.target.value === 'new') {
                    setClientId('');
                    setShowNewClient(true);
                    return;
                  }
                  setClientId(e.target.value);
                  setShowNewClient(false);
                }}
                className="w-full border border-hairline rounded-sm px-[12px] py-[12px] text-ink focus:border-ink focus:border-2 focus:ring-0 outline-none transition-all bg-canvas appearance-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236a6a6a' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
              >
                <option value="">— Select client —</option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
                <option value="__new">+ Add new client</option>
              </select>

              {showNewClient && (
                <div className="space-y-3 pt-4 border-t border-hairline animate-in slide-in-from-top-2 duration-300">
                  <p className="text-[12px] font-bold text-muted uppercase tracking-wide">New client details</p>
                  <input
                    placeholder="Full name *"
                    value={newClient.name}
                    onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                    className="w-full border border-hairline rounded-sm px-[12px] py-[14px] text-ink focus:border-ink focus:border-2 focus:ring-0 outline-none transition-all placeholder:text-muted"
                  />
                  <textarea
                    placeholder="Address"
                    rows={2}
                    value={newClient.address}
                    onChange={(e) => setNewClient({ ...newClient, address: e.target.value })}
                    className="w-full border border-hairline rounded-sm px-[12px] py-[14px] text-ink focus:border-ink focus:border-2 focus:ring-0 outline-none transition-all resize-none placeholder:text-muted"
                  />
                  <input
                    placeholder="Email"
                    type="email"
                    value={newClient.email}
                    onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                    className="w-full border border-hairline rounded-sm px-[12px] py-[14px] text-ink focus:border-ink focus:border-2 focus:ring-0 outline-none transition-all placeholder:text-muted"
                  />
                  <input
                    placeholder="Phone"
                    value={newClient.phone}
                    onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                    className="w-full border border-hairline rounded-sm px-[12px] py-[14px] text-ink focus:border-ink focus:border-2 focus:ring-0 outline-none transition-all placeholder:text-muted"
                  />
                  <input
                    placeholder="GSTIN"
                    value={newClient.gstin}
                    onChange={(e) => setNewClient({ ...newClient, gstin: e.target.value })}
                    className="w-full border border-hairline rounded-sm px-[12px] py-[14px] text-ink focus:border-ink focus:border-2 focus:ring-0 outline-none transition-all placeholder:text-muted"
                  />
                  <input
                    placeholder="CIN Number"
                    value={newClient.cin}
                    onChange={(e) => setNewClient({ ...newClient, cin: e.target.value })}
                    className="w-full border border-hairline rounded-sm px-[12px] py-[14px] text-ink focus:border-ink focus:border-2 focus:ring-0 outline-none transition-all placeholder:text-muted"
                  />
                  <input
                    placeholder="Bank Name"
                    value={newClient.bankName}
                    onChange={(e) => setNewClient({ ...newClient, bankName: e.target.value })}
                    className="w-full border border-hairline rounded-sm px-[12px] py-[14px] text-ink focus:border-ink focus:border-2 focus:ring-0 outline-none transition-all placeholder:text-muted"
                  />
                  <input
                    placeholder="Account Name"
                    value={newClient.accountName}
                    onChange={(e) => setNewClient({ ...newClient, accountName: e.target.value })}
                    className="w-full border border-hairline rounded-sm px-[12px] py-[14px] text-ink focus:border-ink focus:border-2 focus:ring-0 outline-none transition-all placeholder:text-muted"
                  />
                  <input
                    placeholder="Account Number"
                    value={newClient.accountNumber}
                    onChange={(e) => setNewClient({ ...newClient, accountNumber: e.target.value })}
                    className="w-full border border-hairline rounded-sm px-[12px] py-[14px] text-ink focus:border-ink focus:border-2 focus:ring-0 outline-none transition-all placeholder:text-muted"
                  />
                  <input
                    placeholder="IFSC Code"
                    value={newClient.ifsc}
                    onChange={(e) => setNewClient({ ...newClient, ifsc: e.target.value })}
                    className="w-full border border-hairline rounded-sm px-[12px] py-[14px] text-ink focus:border-ink focus:border-2 focus:ring-0 outline-none transition-all placeholder:text-muted"
                  />
                  <input
                    placeholder="Branch"
                    value={newClient.branch}
                    onChange={(e) => setNewClient({ ...newClient, branch: e.target.value })}
                    className="w-full border border-hairline rounded-sm px-[12px] py-[14px] text-ink focus:border-ink focus:border-2 focus:ring-0 outline-none transition-all placeholder:text-muted"
                  />
                  <div className="flex gap-3 pt-3">
                    <button
                      type="button"
                      onClick={handleCreateClient}
                      className="flex-1 h-[48px] text-[16px] font-medium text-white bg-brand-primary rounded-sm hover:bg-brand-active transition-colors shadow-none"
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
            <section className="bg-canvas rounded-md border border-hairline p-6 space-y-4 shadow-none">
              <h2 className="text-[14px] font-medium text-muted uppercase tracking-wide">Dates</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[14px] font-medium text-muted mb-1">Invoice Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => handleDateChange(e.target.value)}
                    className="w-full border border-hairline rounded-sm px-[12px] py-[14px] text-ink focus:border-ink focus:border-2 focus:ring-0 outline-none transition-all bg-canvas"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[14px] font-medium text-muted mb-1">Due Date</label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full border border-hairline rounded-sm px-[12px] py-[14px] text-ink focus:border-ink focus:border-2 focus:ring-0 outline-none transition-all bg-canvas"
                  />
                </div>
              </div>
            </section>

            {/* Services */}
            <section className="bg-canvas rounded-md border border-hairline p-6 space-y-4 shadow-none">
              <h2 className="text-[14px] font-medium text-muted uppercase tracking-wide">Services</h2>
              <ServiceTable services={services} onChange={setServices} />
              <div className="flex justify-between items-center pt-3 border-t border-hairline text-[16px] font-semibold text-ink">
                <span>Total</span>
                <span className="text-[21px] font-bold">₹{total.toFixed(2)}</span>
              </div>
            </section>

            {/* Notes */}
            <section className="bg-canvas rounded-md border border-hairline p-6 shadow-none">
              <h2 className="text-[14px] font-medium text-muted uppercase tracking-wide mb-3">Notes</h2>
              <textarea
                rows={3}
                placeholder="Payment terms, thank you note, etc."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full border border-hairline rounded-sm px-[12px] py-[14px] text-ink focus:border-ink focus:border-2 focus:ring-0 outline-none transition-all resize-none placeholder:text-muted"
              />
            </section>

            {/* PAN Toggle */}
            <section className="bg-canvas rounded-md border border-hairline p-6 shadow-none">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-[16px] font-medium text-ink">Show PAN on Invoice</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPan((v) => !v)}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 ${
                    showPan ? 'bg-brand-primary' : 'bg-hairline'
                  }`}
                  aria-label="Toggle PAN visibility"
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      showPan ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
              {!showPan && (
                <p className="text-[14px] text-body mt-3 bg-surface-soft rounded-sm px-4 py-3 border border-hairline">
                  PAN will be hidden from the invoice preview and PDF.
                </p>
              )}
              {showPan && (
                <div className="mt-4 pt-4 border-t border-hairline">
                  <label className="block text-[14px] font-medium text-muted mb-2">Select PAN to use</label>
                  <select
                    value={selectedPan}
                    onChange={(e) => setSelectedPan(e.target.value)}
                    className="w-full border border-hairline rounded-sm px-[12px] py-[12px] text-ink focus:border-ink focus:border-2 focus:ring-0 outline-none transition-all bg-canvas appearance-none"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236a6a6a' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
                  >
                    {Array.from(new Set(BILLERS.map((b) => b.pan))).map((pan) => (
                      <option key={pan} value={pan}>{pan}</option>
                    ))}
                  </select>
                </div>
              )}
            </section>

            {/* Client Bank Details Toggle */}
            <section className="bg-canvas rounded-md border border-hairline p-6 shadow-none">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-[16px] font-medium text-ink">Show Client Bank Details</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setShowClientBankDetails((v) => !v)}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 ${
                    showClientBankDetails ? 'bg-brand-primary' : 'bg-hairline'
                  }`}
                  aria-label="Toggle client bank details visibility"
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      showClientBankDetails ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
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
          <div className="lg:sticky lg:top-24 bg-canvas rounded-md border border-hairline overflow-hidden shadow-none lg:shadow-none">
            <div className="bg-surface-soft px-4 py-2 border-b border-hairline flex justify-between items-center sm:hidden">
              <span className="text-[12px] font-bold text-muted uppercase tracking-widest">Live Preview</span>
              <span className="text-[10px] text-muted italic">Scale to fit</span>
            </div>
            <div className="overflow-auto p-4 flex justify-center bg-surface-strong min-h-[600px] lg:bg-transparent lg:p-0">
              <div 
                className="origin-top transition-transform duration-300 shadow-card lg:shadow-none mb-8 lg:mb-0" 
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
