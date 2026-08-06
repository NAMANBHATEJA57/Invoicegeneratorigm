'use client';

import React from 'react';
import { Trash2, Plus } from 'lucide-react';

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
      <div className="hidden sm:flex items-center gap-2 text-[12px] font-bold text-muted uppercase tracking-wide px-1">
        <span className="flex-1 pl-[12px]">Description</span>
        <span className="w-16 text-center">Qty</span>
        <span className="w-24 text-right pr-[12px]">Rate (₹)</span>
        <span className="w-8" />
      </div>

      {services.map((row, index) => (
        <div key={row.id}>
          {/* ── Desktop row ── */}
          <div className="hidden sm:flex items-center gap-2 px-1 py-1">
            <input
              className="flex-1 border border-hairline rounded-sm px-[12px] py-[10px] text-ink focus:border-ink focus:border-2 focus:ring-0 outline-none transition-all placeholder:text-muted"
              placeholder="e.g. Logo Design"
              value={row.description}
              onChange={(e) => update(index, 'description', e.target.value)}
            />
            <input
              className="w-16 border border-hairline rounded-sm px-[12px] py-[10px] text-ink focus:border-ink focus:border-2 focus:ring-0 outline-none transition-all text-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [appearance:textfield]"
              type="number"
              min={1}
              value={row.qty}
              onChange={(e) => update(index, 'qty', Number(e.target.value))}
            />
            <input
              className="w-24 border border-hairline rounded-sm px-[12px] py-[10px] text-ink focus:border-ink focus:border-2 focus:ring-0 outline-none transition-all text-right [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [appearance:textfield]"
              type="number"
              min={0}
              step={0.01}
              value={row.rate}
              onChange={(e) => update(index, 'rate', Number(e.target.value))}
            />
            <button
              type="button"
              onClick={() => removeRow(index)}
              className="w-8 h-8 flex items-center justify-center text-gray hover:text-danger hover:bg-gray-50 rounded-full transition-all"
              title="Remove row"
              disabled={services.length === 1}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {/* ── Mobile card ── */}
          <div className="sm:hidden space-y-3 py-4 border-b border-hairline last:border-0">
            <div className="space-y-1">
              <label className="text-[14px] font-medium text-muted">Description</label>
              <input
                className="w-full border border-hairline rounded-sm px-[12px] py-[10px] text-ink focus:border-ink focus:border-2 focus:ring-0 outline-none transition-all placeholder:text-muted"
                placeholder="e.g. Logo Design"
                value={row.description}
                onChange={(e) => update(index, 'description', e.target.value)}
              />
            </div>
            <div className="flex gap-3 items-end">
              <div className="flex-1 space-y-1">
                <label className="block text-[14px] font-medium text-muted">Qty</label>
                <input
                  className="w-full border border-hairline rounded-sm px-[12px] py-[10px] text-ink focus:border-ink focus:border-2 focus:ring-0 outline-none transition-all text-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [appearance:textfield]"
                  type="number"
                  min={1}
                  value={row.qty}
                  onChange={(e) => update(index, 'qty', Number(e.target.value))}
                />
              </div>
              <div className="flex-1 space-y-1">
                <label className="block text-[14px] font-medium text-muted">Rate (₹)</label>
                <input
                  className="w-full border border-hairline rounded-sm px-[12px] py-[10px] text-ink focus:border-ink focus:border-2 focus:ring-0 outline-none transition-all text-right [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [appearance:textfield]"
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
                  className="w-11 h-11 flex items-center justify-center text-gray hover:text-danger hover:bg-gray-50 rounded-full transition-all border border-transparent"
                  title="Remove row"
                  disabled={services.length === 1}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-hairline text-[14px] text-muted">
              <span>Line Total</span>
              <span className="font-semibold text-ink">₹{row.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addRow}
        className="flex items-center gap-1 text-[14px] text-primary hover:text-primary-dark font-medium mt-2 transition-colors"
      >
        <Plus className="w-4 h-4" />
        Add line item
      </button>
    </div>
  );
}
