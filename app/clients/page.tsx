'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { ArrowLeft, UserPlus, Users, Edit2, Trash2, Mail, Phone, FileText, MapPin, PlusCircle, X } from 'lucide-react';

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

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [formData, setFormData] = useState({ name: '', address: '', email: '', phone: '', gstin: '', cin: '', bankName: '', accountName: '', accountNumber: '', ifsc: '', branch: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await fetch('/api/client');
      const data = await res.json();
      setClients(data);
    } catch (error) {
      toast.error('Failed to load clients');
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (client: Client) => {
    setEditingClient(client);
    setFormData({
      name: client.name,
      address: client.address,
      email: client.email || '',
      phone: client.phone || '',
      gstin: client.gstin || '',
      cin: client.cin || '',
      bankName: client.bankName || '',
      accountName: client.accountName || '',
      accountNumber: client.accountNumber || '',
      ifsc: client.ifsc || '',
      branch: client.branch || '',
    });
    setShowAddModal(true);
  };

  const handleDeleteClient = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}?`)) return;
    try {
      const res = await fetch(`/api/client/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      toast.success('Client deleted');
      fetchClients();
    } catch (error) {
      toast.error('Failed to delete client');
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;
    setSaving(true);
    try {
      const url = editingClient ? `/api/client/${editingClient.id}` : '/api/client';
      const method = editingClient ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error();
      
      toast.success(editingClient ? 'Client updated successfully' : 'Client added successfully');
      setFormData({ name: '', address: '', email: '', phone: '', gstin: '', cin: '', bankName: '', accountName: '', accountNumber: '', ifsc: '', branch: '' });
      setEditingClient(null);
      setShowAddModal(false);
      fetchClients();
    } catch (error) {
      toast.error(editingClient ? 'Failed to update client' : 'Failed to add client');
    } finally {
      setSaving(false);
    }
  };

  const openNewModal = () => {
    setEditingClient(null);
    setFormData({ name: '', address: '', email: '', phone: '', gstin: '', cin: '', bankName: '', accountName: '', accountNumber: '', ifsc: '', branch: '' });
    setShowAddModal(true);
  };

  return (
    <div className="min-h-screen bg-canvas">
      <header className="bg-canvas border-b border-hairline h-[80px] flex items-center">
        <div className="w-full max-w-5xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="w-[32px] h-[32px] flex items-center justify-center bg-gray-100 text-text rounded-full hover:bg-gray-200 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-[21px] font-bold text-ink leading-[1.43] tracking-normal">Clients</h1>
            </div>
          </div>
          <button
            onClick={openNewModal}
            className="flex items-center gap-2 px-[24px] py-[14px] bg-brand-primary text-white text-[16px] font-medium leading-[1.25] rounded-sm hover:bg-brand-active transition-colors"
          >
            <UserPlus className="w-5 h-5" />
            <span className="hidden sm:inline">New Client</span>
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-16">
        {loading ? (
          <div className="flex justify-center py-24">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary"></div>
          </div>
        ) : clients.length === 0 ? (
          <div className="text-center py-24 bg-canvas rounded-md border border-hairline">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-surface-soft rounded-full mb-4">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-[20px] font-semibold text-ink leading-[1.20] tracking-[-0.18px] mb-1">No clients yet</h2>
            <p className="text-[16px] text-body leading-[1.5] mb-6">Add your first client to start creating invoices.</p>
            <button
              onClick={openNewModal}
              className="inline-flex items-center justify-center px-[24px] py-[14px] bg-brand-primary text-white text-[16px] font-medium rounded-sm hover:bg-brand-active transition-colors h-[48px]"
            >
              Add Client
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {clients.map((client) => (
              <div
                key={client.id}
                className="bg-canvas rounded-md border border-hairline p-6 hover:shadow-card transition-shadow duration-200 group relative"
              >
                {/* Actions */}
                <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => handleEditClick(client)}
                    className="w-8 h-8 rounded-full bg-surface-strong text-ink hover:bg-hairline-soft flex items-center justify-center transition-colors"
                    title="Edit Client"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDeleteClient(client.id, client.name)}
                    className="w-8 h-8 rounded-full bg-surface-strong text-ink hover:bg-brand-disabled hover:text-brand-active flex items-center justify-center transition-colors"
                    title="Delete Client"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Avatar + Name */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-surface-strong flex items-center justify-center flex-shrink-0">
                    <span className="text-[16px] font-bold text-ink">
                      {client.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="min-w-0 pr-12">
                    <p className="text-[16px] font-medium text-ink truncate">{client.name}</p>
                  </div>
                </div>

                <div className="space-y-2 text-[14px] text-body">
                  {client.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray flex-shrink-0" />
                      <span className="truncate">{client.email}</span>
                    </div>
                  )}
                  {client.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray flex-shrink-0" />
                      <span>{client.phone}</span>
                    </div>
                  )}
                  {client.gstin && (
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray flex-shrink-0" />
                      <span>GSTIN: {client.gstin}</span>
                    </div>
                  )}
                  {client.address && (
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-gray flex-shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{client.address}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            <button
              onClick={openNewModal}
              className="bg-canvas rounded-md border border-hairline p-6 flex flex-col items-center justify-center gap-2 text-muted hover:border-ink hover:text-ink transition-all duration-200 min-h-[160px]"
            >
              <PlusCircle className="w-8 h-8" />
              <span className="text-[14px] font-medium">Add Client</span>
            </button>
          </div>
        )}
      </main>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-stretch sm:justify-end overflow-hidden">
          <div className="bg-canvas rounded-t-[24px] sm:rounded-none w-full sm:w-[640px] sm:max-w-[90vw] shadow-card flex flex-col max-h-[90vh] sm:max-h-full sm:h-full animate-in slide-in-from-bottom-full sm:slide-in-from-right-full duration-300">
            <div className="px-6 py-5 border-b border-hairline flex justify-between items-center flex-shrink-0 sticky top-0 bg-canvas z-10 rounded-t-[24px] sm:rounded-none">
              <div>
                <h3 className="text-[20px] font-semibold text-ink leading-[1.2]">
                  {editingClient ? 'Edit Client' : 'Add New Client'}
                </h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 flex items-center justify-center bg-canvas rounded-full text-ink hover:bg-surface-strong transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-y-auto flex-1">
              <form onSubmit={handleFormSubmit} className="p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                <label className="block text-[14px] font-medium text-muted mb-1">Full Name</label>
                <input
                  autoFocus
                  required
                  placeholder="e.g. SkillBytes LLC"
                  className="w-full border border-hairline rounded-sm px-[12px] py-[14px] h-[56px] text-ink focus:ring-0 focus:border-ink focus:border-2 outline-none transition-all placeholder:text-muted"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[14px] font-medium text-muted mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="contact@company.com"
                      className="w-full border border-hairline rounded-sm px-[12px] py-[14px] h-[56px] text-ink focus:ring-0 focus:border-ink focus:border-2 outline-none transition-all placeholder:text-muted"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[14px] font-medium text-muted mb-1">Phone Number</label>
                    <input
                      placeholder="+1 (555) 000-0000"
                      className="w-full border border-hairline rounded-sm px-[12px] py-[14px] h-[56px] text-ink focus:ring-0 focus:border-ink focus:border-2 outline-none transition-all placeholder:text-muted"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[14px] font-medium text-muted mb-1">GSTIN</label>
                    <input
                      placeholder="e.g. 29ABCDE1234F1Z5"
                      className="w-full border border-hairline rounded-sm px-[12px] py-[14px] h-[56px] text-ink focus:ring-0 focus:border-ink focus:border-2 outline-none transition-all placeholder:text-muted"
                      value={formData.gstin}
                      onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="block text-[14px] font-medium text-muted mb-1">Address</label>
                    <textarea
                      required
                      rows={2}
                      placeholder="Company HQ Address..."
                      className="w-full border border-hairline rounded-sm px-[12px] py-[14px] text-ink focus:ring-0 focus:border-ink focus:border-2 outline-none transition-all resize-none placeholder:text-muted"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                  </div>
                </div>

              {/* Bank Details Section */}
              <div className="pt-6 mt-6 border-t border-hairline">
                <h4 className="text-[16px] font-bold text-ink mb-4">Bank Details (Optional)</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="block text-[14px] font-medium text-muted mb-1">CIN Number</label>
                    <input
                      placeholder="e.g. U12345DL2023PTC123456"
                      className="w-full border border-hairline rounded-sm px-[12px] py-[14px] h-[56px] text-ink focus:ring-0 focus:border-ink focus:border-2 outline-none transition-all placeholder:text-muted"
                      value={formData.cin}
                      onChange={(e) => setFormData({ ...formData, cin: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[14px] font-medium text-muted mb-1">Bank Name</label>
                    <input
                      placeholder="e.g. HDFC Bank"
                      className="w-full border border-hairline rounded-sm px-[12px] py-[14px] h-[56px] text-ink focus:ring-0 focus:border-ink focus:border-2 outline-none transition-all placeholder:text-muted"
                      value={formData.bankName}
                      onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[14px] font-medium text-muted mb-1">Account Name</label>
                    <input
                      placeholder="Company Account Name"
                      className="w-full border border-hairline rounded-sm px-[12px] py-[14px] h-[56px] text-ink focus:ring-0 focus:border-ink focus:border-2 outline-none transition-all placeholder:text-muted"
                      value={formData.accountName}
                      onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[14px] font-medium text-muted mb-1">Account Number</label>
                    <input
                      placeholder="Account Number"
                      className="w-full border border-hairline rounded-sm px-[12px] py-[14px] h-[56px] text-ink focus:ring-0 focus:border-ink focus:border-2 outline-none transition-all placeholder:text-muted"
                      value={formData.accountNumber}
                      onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[14px] font-medium text-muted mb-1">IFSC Code</label>
                    <input
                      placeholder="IFSC Code"
                      className="w-full border border-hairline rounded-sm px-[12px] py-[14px] h-[56px] text-ink focus:ring-0 focus:border-ink focus:border-2 outline-none transition-all placeholder:text-muted"
                      value={formData.ifsc}
                      onChange={(e) => setFormData({ ...formData, ifsc: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[14px] font-medium text-muted mb-1">Branch</label>
                    <input
                      placeholder="Branch Name"
                      className="w-full border border-hairline rounded-sm px-[12px] py-[14px] h-[56px] text-ink focus:ring-0 focus:border-ink focus:border-2 outline-none transition-all placeholder:text-muted"
                      value={formData.branch}
                      onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                    />
                  </div>
                </div>
              </div>
                <button
                  disabled={saving}
                  type="submit"
                  className="w-full h-[48px] bg-brand-primary text-white text-[16px] font-medium rounded-sm hover:bg-brand-active transition-colors disabled:bg-brand-disabled mt-4"
                >
                  {saving ? (editingClient ? 'Updating...' : 'Adding...') : (editingClient ? 'Update Client' : 'Add Client')}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
