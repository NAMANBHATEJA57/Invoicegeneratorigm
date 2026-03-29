'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';

interface Client {
  id: string;
  name: string;
  address: string;
  email?: string;
  phone?: string;
  gstin?: string;
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [formData, setFormData] = useState({ name: '', address: '', email: '', phone: '', gstin: '' });
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
      setFormData({ name: '', address: '', email: '', phone: '', gstin: '' });
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
    setFormData({ name: '', address: '', email: '', phone: '', gstin: '' });
    setShowAddModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-gray-400 hover:text-gray-600 transition-colors">
              <span className="material-symbols-outlined">arrow_back</span>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Clients</h1>
              <p className="text-xs text-gray-400 mt-0.5">Manage your customer database</p>
            </div>
          </div>
          <button
            onClick={openNewModal}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-xl hover:bg-green-700 transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">person_add</span>
            <span className="hidden sm:inline">New Client</span>
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center py-24">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          </div>
        ) : clients.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl border border-dashed border-gray-300">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-green-50 rounded-2xl mb-4">
              <span className="material-symbols-outlined text-[28px] text-green-600">group</span>
            </div>
            <h2 className="text-lg font-semibold text-gray-700 mb-1">No clients yet</h2>
            <p className="text-sm text-gray-400 mb-6">Add your first client to start creating invoices.</p>
            <button
              onClick={openNewModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white text-sm font-semibold rounded-xl hover:bg-green-700 transition-colors"
            >
              Add Client
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {clients.map((client) => (
              <div
                key={client.id}
                className="bg-white rounded-2xl border border-gray-200 p-5 hover:border-green-200 hover:shadow-md transition-all duration-200 group relative"
              >
                {/* Actions */}
                <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => handleEditClick(client)}
                    className="w-8 h-8 rounded-lg bg-gray-50 text-gray-400 hover:bg-green-50 hover:text-green-600 flex items-center justify-center transition-colors"
                    title="Edit Client"
                  >
                    <span className="material-symbols-outlined text-[16px]">edit</span>
                  </button>
                  <button 
                    onClick={() => handleDeleteClient(client.id, client.name)}
                    className="w-8 h-8 rounded-lg bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition-colors"
                    title="Delete Client"
                  >
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                  </button>
                </div>

                {/* Avatar + Name */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-base font-bold text-green-700">
                      {client.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="min-w-0 pr-12">
                    <p className="text-sm font-bold text-gray-900 truncate">{client.name}</p>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-gray-500">
                  {client.email && (
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[14px] text-gray-300 flex-shrink-0">mail</span>
                      <span className="truncate">{client.email}</span>
                    </div>
                  )}
                  {client.phone && (
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[14px] text-gray-300 flex-shrink-0">call</span>
                      <span>{client.phone}</span>
                    </div>
                  )}
                  {client.gstin && (
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[14px] text-gray-300 flex-shrink-0">receipt_long</span>
                      <span>GSTIN: {client.gstin}</span>
                    </div>
                  )}
                  {client.address && (
                    <div className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-[14px] text-gray-300 flex-shrink-0 mt-0.5">location_on</span>
                      <span className="line-clamp-2">{client.address}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            <button
              onClick={openNewModal}
              className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-5 flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-green-300 hover:text-green-600 transition-all duration-200 min-h-[160px]"
            >
              <span className="material-symbols-outlined text-[28px]">add_circle</span>
              <span className="text-sm font-semibold">Add Client</span>
            </button>
          </div>
        )}
      </main>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {editingClient ? 'Edit Client' : 'Add New Client'}
                </h3>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">
                  {editingClient ? 'Update information' : 'Customer Information'}
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleFormSubmit} className="p-6 sm:p-8 space-y-5">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-tight ml-1">Full Name</label>
                <input
                  autoFocus
                  required
                  placeholder="e.g. SkillBytes LLC"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base sm:text-sm focus:ring-4 focus:ring-green-100 focus:border-green-500 outline-none transition-all placeholder:text-gray-300"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-tight ml-1">Email Address</label>
                <input
                  type="email"
                  placeholder="contact@company.com"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base sm:text-sm focus:ring-4 focus:ring-green-100 focus:border-green-500 outline-none transition-all placeholder:text-gray-300"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-tight ml-1">Phone Number</label>
                <input
                  placeholder="+1 (555) 000-0000"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base sm:text-sm focus:ring-4 focus:ring-green-100 focus:border-green-500 outline-none transition-all placeholder:text-gray-300"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-tight ml-1">GSTIN</label>
                <input
                  placeholder="e.g. 29ABCDE1234F1Z5"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base sm:text-sm focus:ring-4 focus:ring-green-100 focus:border-green-500 outline-none transition-all placeholder:text-gray-300"
                  value={formData.gstin}
                  onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-tight ml-1">Address</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Company HQ Address..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base sm:text-sm focus:ring-4 focus:ring-green-100 focus:border-green-500 outline-none transition-all resize-none placeholder:text-gray-300"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>
              <button
                disabled={saving}
                type="submit"
                className="w-full py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors shadow-lg shadow-green-200 disabled:opacity-50"
              >
                {saving ? (editingClient ? 'Updating...' : 'Adding...') : (editingClient ? 'Update Client' : 'Add Client')}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
