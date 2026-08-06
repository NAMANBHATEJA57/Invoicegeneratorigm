export interface Client {
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
  createdAt: Date;
}

export interface Service {
  id: string;
  invoiceId: string;
  description: string;
  qty: number;
  rate: number;
  total: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientId: string;
  client?: Client;
  date: Date;
  dueDate: Date;
  totalAmount: number;
  notes?: string | null;
  showPan: boolean;
  selectedPan?: string | null;
  showClientBankDetails: boolean;
  billerId: string;
  createdAt: Date;
  services?: Service[];
}

// In-memory static mock data
export const MOCK_CLIENTS: Client[] = [
  {
    id: 'c1',
    name: 'Tech Solutions Inc',
    address: '123 Tech Lane, Silicon Valley, CA 94025',
    email: 'contact@techsolutions.com',
    phone: '+1 (555) 123-4567',
    createdAt: new Date(),
  },
  {
    id: 'c2',
    name: 'Creative Studio',
    address: '456 Art Blvd, New York, NY 10001',
    email: 'hello@creativestudio.design',
    createdAt: new Date(),
  }
];

export const MOCK_INVOICES: Invoice[] = [
  {
    id: 'inv1',
    invoiceNumber: 'INV-2026-001',
    clientId: 'c1',
    date: new Date(),
    dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
    totalAmount: 1500,
    notes: 'Thank you for your business.',
    showPan: true,
    showClientBankDetails: false,
    billerId: 'rupali',
    createdAt: new Date(),
  },
  {
    id: 'inv2',
    invoiceNumber: 'INV-2026-002',
    clientId: 'c2',
    date: new Date(),
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    totalAmount: 3200.50,
    showPan: true,
    showClientBankDetails: false,
    billerId: 'rupali',
    createdAt: new Date(),
  }
];

// Helper functions that mimic Prisma's basic functionality
export const db = {
  client: {
    findMany: async (args?: any) => {
      // Simulate DB delay
      await new Promise(r => setTimeout(r, 100));
      let clients = [...MOCK_CLIENTS];
      
      // Simple sorting simulation
      if (args?.orderBy?.name) {
        clients.sort((a, b) => a.name.localeCompare(b.name));
      }
      
      return clients;
    },
    findUnique: async (args: { where: { id: string } }) => {
      return MOCK_CLIENTS.find(c => c.id === args.where.id) || null;
    },
    create: async (args: { data: Omit<Client, 'id' | 'createdAt'> }) => {
      const newClient = {
        ...args.data,
        id: `c${Date.now()}`,
        createdAt: new Date(),
      };
      MOCK_CLIENTS.push(newClient as Client);
      return newClient;
    },
    update: async (args: { where: { id: string }, data: Partial<Client> }) => {
      const idx = MOCK_CLIENTS.findIndex(c => c.id === args.where.id);
      if (idx === -1) throw new Error('Client not found');
      MOCK_CLIENTS[idx] = { ...MOCK_CLIENTS[idx], ...args.data };
      return MOCK_CLIENTS[idx];
    },
    delete: async (args: { where: { id: string } }) => {
      const idx = MOCK_CLIENTS.findIndex(c => c.id === args.where.id);
      if (idx !== -1) MOCK_CLIENTS.splice(idx, 1);
      return true;
    }
  },
  invoice: {
    findMany: async (args?: any) => {
      await new Promise(r => setTimeout(r, 100));
      let invoices = [...MOCK_INVOICES];
      
      // Basic join simulation
      if (args?.include?.client) {
        invoices = invoices.map(inv => ({
          ...inv,
          client: MOCK_CLIENTS.find(c => c.id === inv.clientId)
        }));
      }
      
      if (args?.orderBy?.createdAt === 'desc') {
        invoices.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      }
      
      return invoices;
    },
    findUnique: async (args: { where: { id: string }, include?: any }) => {
      let invoice = MOCK_INVOICES.find(inv => inv.id === args.where.id) || null;
      if (invoice && args.include?.client) {
        invoice = { ...invoice, client: MOCK_CLIENTS.find(c => c.id === invoice!.clientId) };
      }
      if (invoice && args.include?.services) {
        // Mock empty services if not present
        invoice = { ...invoice, services: invoice.services || [] };
      }
      return invoice;
    },
    create: async (args: { data: any, include?: any }) => {
      const newInvoice = {
        ...args.data,
        id: `inv${Date.now()}`,
        createdAt: new Date(),
      };
      MOCK_INVOICES.push(newInvoice);
      return newInvoice;
    },
    update: async (args: { where: { id: string }, data: any, include?: any }) => {
      const idx = MOCK_INVOICES.findIndex(i => i.id === args.where.id);
      if (idx === -1) throw new Error('Invoice not found');
      MOCK_INVOICES[idx] = { ...MOCK_INVOICES[idx], ...args.data };
      return MOCK_INVOICES[idx];
    },
    delete: async (args: { where: { id: string } }) => {
      const idx = MOCK_INVOICES.findIndex(i => i.id === args.where.id);
      if (idx !== -1) MOCK_INVOICES.splice(idx, 1);
      return true;
    }
  },
  service: {
    deleteMany: async (args: { where: { invoiceId: string } }) => {
      return true; // Simple mock
    }
  },
  $transaction: async (callback: (tx: any) => Promise<any>) => {
    // Just run the callback with the db object itself since it's a mock
    return callback(db);
  }
};
