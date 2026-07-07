export const BILLERS = [
  {
    id: 'rupali',
    name: 'Rupali Bhateja',
    tagline: 'The Inquisitive Mind',
    address: 'BC 2, West Shalimar Bagh, Delhi – 110088, India',
    email: 'rupali.piyush@gmail.com',
    phone: '+91 9899485651',
    pan: 'AJUPB8140M',
    bank: {
      name: 'HDFC Bank',
      branch: 'Adarsh Nagar',
      accountName: 'Piyush Bhateja HUF',
      accountNumber: '50200023785569',
      ifsc: 'HDFC0000391',
      upi: 'rupali.piyush@okaxis', // Dummy UPI based on email
    },
  },
  {
    id: 'piyush',
    name: 'Piyush Bhateja',
    tagline: '',
    address: 'BC 2 West Shalimar Bagh, North West Delhi\nCity: Delhi, Pincode: 110088, State: Delhi, India',
    email: 'theinquisitivemind15@gmail.com',
    phone: '+91 9899485651',
    pan: 'AAPHP5191Q',
    bank: {
      name: 'HDFC Bank',
      branch: 'Adarsh Nagar',
      accountName: 'Piyush Bhateja HUF',
      accountNumber: '50200023785569',
      ifsc: 'HDFC0000391',
      upi: 'theinquisitivemind15@okaxis',
    },
  }
];

export const BILLER = BILLERS[0];

export type BillerType = typeof BILLERS[0];
