'use client';

import React, { forwardRef } from 'react';
import { BILLER } from '@/lib/invoice';
import { LOGO_PNG_B64 as LOGO_B64 } from '@/lib/assets';
import type { ServiceRow } from './ServiceTable';

export interface InvoiceData {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  notes?: string;
  showPan?: boolean;
  showClientBankDetails?: boolean;
  client: {
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
  };
  services: ServiceRow[];
}

interface InvoicePreviewProps {
  data: InvoiceData;
  unmasked?: boolean;
}

const InvoicePreview = forwardRef<HTMLDivElement, InvoicePreviewProps>(({ data, unmasked = false }, ref) => {
  const total = data.services.reduce((sum, s) => sum + s.total, 0);

  const fmt = (d: string) => {
    if (!d) return '—';
    const date = new Date(d);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div
      ref={ref}
      style={{
        width: '210mm',
        height: '297mm',
        padding: '10mm 14mm',
        background: '#fff',
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        fontSize: '9.5pt',
        color: '#222222',
        boxSizing: 'border-box',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* ── HEADER ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '5mm' }}>
        <h1 style={{ fontSize: '28pt', fontWeight: 700, margin: 0, color: '#000', letterSpacing: '-0.02em' }}>INVOICE</h1>
        <div style={{ textAlign: 'right' }}>
          <img
            src={LOGO_B64}
            alt="Logo"
            style={{ width: '100px', height: '60px', objectFit: 'contain' }}
          />
        </div>
      </div>

      {/* ── BILLED SECTION ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4mm' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, marginBottom: '1.5mm', color: '#1a1a1a', fontSize: '10.5pt' }}>Billed to</div>
          <div style={{ fontWeight: 600, marginBottom: '0.5mm' }}>{data.client.name || 'Client Name'}</div>
          <div style={{ color: '#555', fontSize: '8.5pt', lineHeight: '1.4', whiteSpace: 'pre-line', maxWidth: '80mm' }}>
            {data.client.address || 'Client Address'}
          </div>
          {data.client.email && (
            <div style={{ color: '#555', fontSize: '8.5pt', marginTop: '1mm' }}>
              Email: {data.client.email}
            </div>
          )}
          {data.client.phone && (
            <div style={{ color: '#555', fontSize: '8.5pt' }}>
              Contact: {data.client.phone}
            </div>
          )}
          {data.client.gstin && (
            <div style={{ color: '#555', fontSize: '8.5pt' }}>
              GSTIN: {data.client.gstin}
            </div>
          )}
          {data.showClientBankDetails && (
            <div style={{ marginTop: '2mm', paddingTop: '2mm', borderTop: '1px solid #eee' }}>
              <div style={{ fontWeight: 600, fontSize: '9pt', color: '#333', marginBottom: '1mm' }}>Client Bank Details</div>
              {data.client.cin && <div style={{ color: '#555', fontSize: '8.5pt' }}>CIN: {data.client.cin}</div>}
              {data.client.bankName && <div style={{ color: '#555', fontSize: '8.5pt' }}>Bank Name: {data.client.bankName}</div>}
              {data.client.accountName && <div style={{ color: '#555', fontSize: '8.5pt' }}>Account Name: {data.client.accountName}</div>}
              {data.client.accountNumber && <div style={{ color: '#555', fontSize: '8.5pt' }}>Account No.: {data.client.accountNumber}</div>}
              {data.client.ifsc && <div style={{ color: '#555', fontSize: '8.5pt' }}>IFSC Code: {data.client.ifsc}</div>}
              {data.client.branch && <div style={{ color: '#555', fontSize: '8.5pt' }}>Branch: {data.client.branch}</div>}
            </div>
          )}
        </div>
        <div style={{ flex: 1, textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <div style={{ fontWeight: 700, marginBottom: '1.5mm', color: '#1a1a1a', fontSize: '10.5pt' }}>Billed From</div>
          <div style={{ fontWeight: 600, marginBottom: '0.5mm' }}>{BILLER.name}</div>
          <div style={{ color: '#555', fontSize: '8.5pt', lineHeight: '1.4', maxWidth: '80mm' }}>
            {BILLER.address}
          </div>
          <div style={{ color: '#555', fontSize: '8.5pt', marginTop: '1mm' }}>
            Email: {BILLER.email}
          </div>
          <div style={{ color: '#555', fontSize: '8.5pt' }}>
            Mobile: {BILLER.phone}
          </div>
          {data.showPan !== false && (
            <div style={{ color: '#555', fontSize: '8.5pt' }}>
              PAN: {BILLER.pan}
            </div>
          )}
        </div>
      </div>

      <div style={{ borderTop: '1px solid #eee', marginBottom: '5mm' }} />

      {/* ── MAIN CONTENT (SIDEBAR + TABLE) ── */}
      <div style={{ display: 'flex', gap: '10mm', marginBottom: '4mm' }}>
        {/* Sidebar */}
        <div style={{ width: '40mm', flexShrink: 0 }}>
          <div style={{ marginBottom: '6mm' }}>
            <div style={{ fontWeight: 700, color: '#333', marginBottom: '0.5mm', fontSize: '9pt', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Invoice #</div>
            <div style={{ fontSize: '10pt', color: '#1a1a1a' }}>{data.invoiceNumber || 'RB/1026/09'}</div>
          </div>
          <div style={{ marginBottom: '6mm' }}>
            <div style={{ fontWeight: 700, color: '#333', marginBottom: '0.5mm', fontSize: '9pt', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Invoice date</div>
            <div style={{ fontSize: '10pt', color: '#1a1a1a' }}>{fmt(data.date) || '23 March 2026'}</div>
          </div>
          <div style={{ marginBottom: '6mm' }}>
            <div style={{ fontWeight: 700, color: '#333', marginBottom: '0.5mm', fontSize: '9pt', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Due date</div>
            <div style={{ fontSize: '10pt', color: '#1a1a1a' }}>{fmt(data.dueDate) || '30 March 2026'}</div>
          </div>
        </div>

        {/* Services Table */}
        <div style={{ flex: 1 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #E5E7EB', borderRadius: '4px', overflow: 'hidden' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #E5E7EB', backgroundColor: '#fff' }}>
                <th style={{ textAlign: 'left', padding: '3mm', color: '#555', fontWeight: 600, fontSize: '9pt' }}>Services</th>
                <th style={{ textAlign: 'center', padding: '3mm', color: '#555', fontWeight: 600, fontSize: '9pt' }}>Qty</th>
                <th style={{ textAlign: 'center', padding: '3mm', color: '#555', fontWeight: 600, fontSize: '9pt' }}>Rate</th>
                <th style={{ textAlign: 'right', padding: '3mm', color: '#555', fontWeight: 600, fontSize: '9pt' }}>Line total</th>
              </tr>
            </thead>
            <tbody>
              {data.services.map((s, i) => (
                <tr key={s.id} style={{ borderBottom: i === data.services.length - 1 ? 'none' : '1px solid #F3F4F6' }}>
                  <td style={{ padding: '4mm 3mm', verticalAlign: 'top' }}>
                    <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '0.5mm' }}>{s.description}</div>
                  </td>
                  <td style={{ padding: '4mm 3mm', textAlign: 'center', verticalAlign: 'top', color: '#444' }}>{s.qty}</td>
                  <td style={{ padding: '4mm 3mm', textAlign: 'center', verticalAlign: 'top', color: '#444' }}>
                    ₹{s.rate.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </td>
                  <td style={{ padding: '4mm 3mm', textAlign: 'right', verticalAlign: 'top', color: '#444' }}>
                    ₹{s.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
              {/* Limited spacer rows */}
              {data.services.length < 3 && Array.from({ length: 3 - data.services.length }).map((_, i) => (
                <tr key={`spacer-${i}`}>
                   <td style={{ padding: '3mm 3mm' }}>&nbsp;</td>
                   <td></td>
                   <td></td>
                   <td></td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ backgroundColor: '#F7F7F7' }}>
                <td colSpan={2} style={{ padding: '3.5mm 3mm', color: '#222222', fontWeight: 700, fontSize: '10pt' }}>Total due</td>
                <td colSpan={2} style={{ padding: '3.5mm 3mm', textAlign: 'right', color: '#222222', fontWeight: 700, fontSize: '11pt' }}>
                  INR ₹ {total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* ── BOTTOM SECTION: REMARKS ── */}
      <div style={{ marginBottom: '4mm' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2mm', marginBottom: '1.5mm' }}>
          <div style={{ width: '10px', height: '10px', backgroundColor: '#9CA3AF', borderRadius: '2px' }} />
          <div style={{ fontSize: '9pt', color: '#555' }}>
            Total Amount Payable in words: Rupees {numberToWords(total)} Only
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2mm' }}>
          <div style={{ width: '10px', height: '10px', backgroundColor: '#9CA3AF', borderRadius: '2px' }} />
          <div style={{ fontSize: '9pt', color: '#555' }}>
            Full payment to be made within 7 days from the date of invoice via bank transfer or UPI.
          </div>
        </div>
      </div>

      {/* ── BANK DETAILS & SIGNATURE ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '5mm' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, color: '#000', marginBottom: '2mm', fontSize: '10.5pt' }}>Bank Details</div>
          <div style={{ fontSize: '9pt', color: '#555', lineHeight: '1.5' }}>
            <div>Account Name: {BILLER.bank.accountName}</div>
            <div>Bank: {BILLER.bank.name}</div>
            <div>Branch Name: {BILLER.bank.branch}</div>
            <div>Account No.: {unmasked ? BILLER.bank.accountNumber : ('*'.repeat(BILLER.bank.accountNumber.length - 4) + BILLER.bank.accountNumber.slice(-4))}</div>
            <div>IFSC Code: {unmasked ? BILLER.bank.ifsc : (BILLER.bank.ifsc.slice(0, 4) + '****' + BILLER.bank.ifsc.slice(-3))}</div>
          </div>
        </div>

        <div style={{ width: '70mm', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ height: '20mm', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', marginBottom: '1mm' }}>
            <img
              src="/Sign.svg"
              alt="Signature"
              style={{ maxWidth: '180px', maxHeight: '70px', width: 'auto', height: 'auto', objectFit: 'contain', display: 'block' }}
            />
          </div>
          <div style={{ width: '100%', borderTop: '1px solid #000', paddingTop: '1.5mm' }}>
             <div style={{ fontWeight: 700, fontSize: '10pt', color: '#000' }}>{BILLER.name}</div>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div style={{ marginTop: 'auto' }}>
         <div style={{ fontSize: '7.5pt', color: '#9DA3AF', marginBottom: '4mm', lineHeight: '1.5', textAlign: 'justify' }}>
           Notes / Legal Clauses: 1. The content created under this invoice is for educational and promotional purposes only as mutually agreed. 2. Intellectual Property Rights: Ownership of the final videos transfers to SkillBytes LLC only after full payment is received. 3. Until the payment is completed, all deliverables remain the exclusive property of Rupali Bhateja. 4. Any revisions, edits, or additional versions beyond the agreed two reels will be billed separately. 5. Payment once made is non-refundable. 6. Rupali Bhateja retains the right to include the content in her personal portfolio or showreel unless otherwise agreed in writing. 7. This invoice and related transactions are governed by the laws of India, and any disputes shall be subject to the jurisdiction of Delhi courts only.
         </div>
         <div style={{ borderTop: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', padding: '3.5mm 0', fontSize: '10pt', color: '#6B7280' }}>
             <div>{BILLER.phone}</div>
             <div>Email: {BILLER.email}</div>
         </div>
      </div>

    </div>
  );
});

// Converts a number to words using Indian numbering system
function numberToWords(num: number): string {
  if (num === 0) return 'Zero';

  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
    'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  function belowHundred(n: number): string {
    if (n < 20) return ones[n];
    return (tens[Math.floor(n / 10)] + (n % 10 ? ' ' + ones[n % 10] : ''));
  }

  function belowThousand(n: number): string {
    if (n < 100) return belowHundred(n);
    return ones[Math.floor(n / 100)] + ' Hundred' + (n % 100 ? ' ' + belowHundred(n % 100) : '');
  }

  const parts: string[] = [];
  const intNum = Math.floor(num);

  const crore = Math.floor(intNum / 10000000);
  const lakh  = Math.floor((intNum % 10000000) / 100000);
  const thousand = Math.floor((intNum % 100000) / 1000);
  const rest = intNum % 1000;

  if (crore)   parts.push(belowThousand(crore) + ' Crore');
  if (lakh)    parts.push(belowHundred(lakh) + ' Lakh');
  if (thousand) parts.push(belowHundred(thousand) + ' Thousand');
  if (rest)    parts.push(belowThousand(rest));

  return parts.join(' ');
}

InvoicePreview.displayName = 'InvoicePreview';
export default InvoicePreview;
