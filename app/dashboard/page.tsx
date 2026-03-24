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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Invoices</h1>
            <p className="text-xs text-gray-400 mt-0.5">The Inquisitive Mind</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/clients"
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-600 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">group</span>
              <span className="hidden sm:inline">Clients</span>
            </Link>
            <Link
              href="/new"
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-xl hover:bg-green-700 transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              <span className="hidden sm:inline">New Invoice</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {invoices.length === 0 ? (
          <div className="text-center py-24">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-gray-700 mb-1">No invoices yet</h2>
            <p className="text-sm text-gray-400 mb-6">Create your first invoice to get started.</p>
            <Link
              href="/new"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white text-sm font-semibold rounded-xl hover:bg-green-700 transition-colors"
            >
              Create Invoice
            </Link>
          </div>
        ) : (
          <>
            {/* Stats bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-xl border border-gray-200 px-5 py-4">
                <p className="text-xs text-gray-400 uppercase tracking-wide">Total Invoices</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{invoices.length}</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 px-5 py-4">
                <p className="text-xs text-gray-400 uppercase tracking-wide">Total Revenue</p>
                <p className="text-2xl font-bold text-green-700 mt-1">
                  ₹{invoices.reduce((s, i) => s + i.totalAmount, 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 px-5 py-4 hidden sm:block">
                <p className="text-xs text-gray-400 uppercase tracking-wide">Latest</p>
                <p className="text-lg font-bold text-gray-900 mt-1">{invoices[0].invoiceNumber}</p>
              </div>
            </div>

            {/* Invoice Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {invoices.map((invoice) => (
                <Link
                  key={invoice.id}
                  href={`/invoice/${invoice.id}`}
                  className="group bg-white rounded-2xl border border-gray-200 p-5 hover:border-green-300 hover:shadow-md transition-all duration-200"
                >
                  {/* Top row: Invoice # + Date */}
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-sm font-bold text-green-700 group-hover:text-green-800 font-mono bg-green-50 px-2.5 py-1 rounded-lg">
                      {invoice.invoiceNumber}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(invoice.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
                  </div>

                  {/* Client name */}
                  <p className="text-base font-semibold text-gray-800 truncate mb-4">{invoice.client.name}</p>

                  {/* Bottom: Amount + arrow */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-lg font-bold text-gray-900">
                      ₹{invoice.totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </span>
                    <span className="text-gray-300 group-hover:text-green-400 transition-colors">
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
