import Link from 'next/link';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function DashboardPage() {
  const invoices = await prisma.invoice.findMany({
    orderBy: { createdAt: 'desc' },
    include: { client: { select: { name: true } } },
  });

  return (
    <div className="min-h-screen bg-canvas">
      {/* Header */}
      <header className="bg-canvas border-b border-hairline h-[80px] flex items-center">
        <div className="w-full max-w-5xl mx-auto px-6 flex items-center justify-between">
          <div>
            <h1 className="text-[21px] font-bold text-ink leading-[1.43] tracking-normal">Invoices</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/clients"
              className="flex items-center gap-2 px-[23px] py-[13px] bg-canvas border border-ink text-ink text-[16px] font-medium leading-[1.25] rounded-sm hover:bg-surface-soft transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">group</span>
              <span className="hidden sm:inline">Clients</span>
            </Link>
            <Link
              href="/new"
              className="flex items-center gap-2 px-[24px] py-[14px] bg-brand-primary text-white text-[16px] font-medium leading-[1.25] rounded-sm hover:bg-brand-active transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              <span className="hidden sm:inline">New Invoice</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-16">
        {invoices.length === 0 ? (
          <div className="text-center py-24">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-surface-soft rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-[20px] font-semibold text-ink leading-[1.20] tracking-[-0.18px] mb-1">No invoices yet</h2>
            <p className="text-[16px] text-body leading-[1.5] mb-6">Create your first invoice to get started.</p>
            <Link
              href="/new"
              className="inline-flex items-center justify-center px-[24px] py-[14px] bg-brand-primary text-white text-[16px] font-medium rounded-sm hover:bg-brand-active transition-colors h-[48px]"
            >
              Create Invoice
            </Link>
          </div>
        ) : (
          <>
            {/* Stats bar */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-canvas rounded-md border border-hairline px-6 py-6 shadow-none hover:shadow-card transition-shadow">
                <p className="text-[14px] text-muted font-medium uppercase tracking-wide">Total Invoices</p>
                <p className="text-[28px] font-bold text-ink mt-2 leading-[1.43]">{invoices.length}</p>
              </div>
              <div className="bg-canvas rounded-md border border-hairline px-6 py-6 shadow-none hover:shadow-card transition-shadow">
                <p className="text-[14px] text-muted font-medium uppercase tracking-wide">Latest</p>
                <p className="text-[22px] font-medium text-ink mt-2 tracking-[-0.44px] leading-[1.18]">{invoices[0].invoiceNumber}</p>
              </div>
            </div>

            {/* Invoice Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {invoices.map((invoice) => (
                <Link
                  key={invoice.id}
                  href={`/invoice/${invoice.id}`}
                  className="group bg-canvas rounded-md border border-hairline p-6 hover:shadow-card transition-shadow duration-200"
                >
                  {/* Top row: Invoice # + Date */}
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-[11px] font-semibold text-ink bg-surface-soft px-[10px] py-[4px] rounded-full uppercase tracking-widest">
                      {invoice.invoiceNumber}
                    </span>
                    <span className="text-[14px] text-muted">
                      {new Date(invoice.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
                  </div>

                  {/* Client name */}
                  <p className="text-[16px] font-medium text-ink truncate mb-4">{invoice.client.name}</p>

                  {/* Bottom: Amount + arrow */}
                  <div className="flex items-center justify-between pt-4 border-t border-hairline">
                    <span className="text-[21px] font-bold text-ink">
                      ₹{invoice.totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </span>
                    <span className="text-muted group-hover:text-brand-primary transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
