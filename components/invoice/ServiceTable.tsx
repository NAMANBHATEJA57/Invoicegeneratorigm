'use client';

import React from 'react';

export interface ServiceRow {
  id: string;
  description: string;
  qty: number;
  rate: number;
  total: number;
}

interface ServiceTableProps {
  services: ServiceRow[];
  onChange: (services: ServiceRow[]) => void;
}

function generateId() {
  return Math.random().toString(36).slice(2, 10);
}

export default function ServiceTable({ services, onChange }: ServiceTableProps) {
  const update = (index: number, field: keyof ServiceRow, value: string | number) => {
    const updated = services.map((row, i) => {
      if (i !== index) return row;
      const newRow = { ...row, [field]: value };
      if (field === 'qty' || field === 'rate') {
        newRow.total = Number(newRow.qty) * Number(newRow.rate);
      }
      return newRow;
    });
    onChange(updated);
  };

  const addRow = () => {
    onChange([
      ...services,
      { id: generateId(), description: '', qty: 1, rate: 0, total: 0 },
    ]);
  };

  const removeRow = (index: number) => {
    onChange(services.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      {/* Desktop column header */}
      <div className="hidden sm:flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">
        <span className="flex-1">Description</span>
        <span className="w-16 text-center">Qty</span>
        <span className="w-24 text-right">Rate (₹)</span>
        <span className="w-8" />
      </div>

      {services.map((row, index) => (
        <div key={row.id}>
          {/* ── Desktop row ── */}
          <div className="hidden sm:flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-3 py-2">
            <input
              className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all placeholder:text-gray-300"
              placeholder="e.g. Logo Design"
              value={row.description}
              onChange={(e) => update(index, 'description', e.target.value)}
            />
            <input
              className="w-16 border border-gray-200 rounded-lg px-2 py-1.5 text-sm text-center focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all"
              type="number"
              min={1}
              value={row.qty}
              onChange={(e) => update(index, 'qty', Number(e.target.value))}
            />
            <input
              className="w-24 border border-gray-200 rounded-lg px-2 py-1.5 text-sm text-right focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all"
              type="number"
              min={0}
              step={0.01}
              value={row.rate}
              onChange={(e) => update(index, 'rate', Number(e.target.value))}
            />
            <button
              type="button"
              onClick={() => removeRow(index)}
              className="w-8 h-8 flex items-center justify-center text-red-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
              title="Remove row"
              disabled={services.length === 1}
            >
              <span className="material-symbols-outlined text-[18px]">delete</span>
            </button>
          </div>

          {/* ── Mobile card ── */}
          <div className="sm:hidden bg-white border border-gray-100 rounded-2xl p-4 space-y-3">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Description</label>
              <input
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all placeholder:text-gray-300"
                placeholder="e.g. Logo Design"
                value={row.description}
                onChange={(e) => update(index, 'description', e.target.value)}
              />
            </div>
            <div className="flex gap-3 items-end">
              <div className="flex-1 space-y-1">
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Qty</label>
                <input
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base text-center focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all"
                  type="number"
                  min={1}
                  value={row.qty}
                  onChange={(e) => update(index, 'qty', Number(e.target.value))}
                />
              </div>
              <div className="flex-1 space-y-1">
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Rate (₹)</label>
                <input
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base text-right focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all"
                  type="number"
                  min={0}
                  step={0.01}
                  value={row.rate}
                  onChange={(e) => update(index, 'rate', Number(e.target.value))}
                />
              </div>
              <div className="w-11 shrink-0">
                <button
                  type="button"
                  onClick={() => removeRow(index)}
                  className="w-11 h-11 flex items-center justify-center text-red-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all border border-red-50"
                  title="Remove row"
                  disabled={services.length === 1}
                >
                  <span className="material-symbols-outlined text-[20px]">delete</span>
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center pt-1 border-t border-gray-50 text-xs text-gray-400">
              <span>Line Total</span>
              <span className="font-semibold text-gray-700">₹{row.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addRow}
        className="flex items-center gap-1 text-sm text-green-700 hover:text-green-900 font-medium mt-1 transition-colors"
      >
        <span className="material-symbols-outlined text-[18px]">add</span>
        Add line item
      </button>
    </div>
  );
}
