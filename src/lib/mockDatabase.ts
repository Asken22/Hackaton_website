export type VerificationStatus = 'None' | 'Self Verified' | 'FPO Verified' | 'AGMARK Verified';
export type BidStatus = 'Pending' | 'Accepted' | 'Rejected';
export type RequestStatus = 'Pending' | 'Approved' | 'Rejected';
export type UserRole = 'farmer' | 'buyer' | 'fpo' | null;

export interface Listing {
  id: string;
  farmerId: string;
  farmerName: string;
  crop: string;
  quantity: number;
  expectedPrice: number;
  harvestDate: string;
  description: string;
  images: string[];
  location: string;
  verificationStatus: VerificationStatus;
  createdAt: string;
}

export interface Bid {
  id: string;
  listingId: string;
  buyerId: string;
  buyerName: string;
  offerPrice: number;
  requestedQuantity: number;
  message: string;
  status: BidStatus;
  createdAt: string;
}

export interface VerificationRequest {
  id: string;
  listingId: string;
  farmerId: string;
  farmerName: string;
  type: 'FPO' | 'AGMARK';
  status: RequestStatus;
  documents: string[]; // Base64 or mock URLs
  createdAt: string;
}

export interface VirtualLot {
  id: string;
  crop: string;
  targetQuantity: number;
  currentQuantity: number;
  farmerIds: string[];
  status: 'Forming' | 'Ready' | 'Sold';
}

const STORAGE_KEYS = {
  LISTINGS: 'agrilink_listings',
  BIDS: 'agrilink_bids',
  VERIFICATIONS: 'agrilink_verifications',
  VIRTUAL_LOTS: 'agrilink_virtual_lots',
  CURRENT_USER: 'agrilink_current_user'
};

// Initial Demo Data
const demoListings: Listing[] = [
  {
    id: "lst_1",
    farmerId: "f1",
    farmerName: "Ramesh Kumar",
    crop: "Basmati Rice",
    quantity: 50,
    expectedPrice: 3200,
    harvestDate: "2024-05-10",
    description: "Premium quality long-grain basmati.",
    images: [],
    location: "Karnal, Haryana",
    verificationStatus: 'FPO Verified',
    createdAt: new Date().toISOString()
  },
  {
    id: "lst_2",
    farmerId: "f2",
    farmerName: "Amit Singh",
    crop: "Wheat (Lokwan)",
    quantity: 120,
    expectedPrice: 2400,
    harvestDate: "2024-04-20",
    description: "Dry and clean wheat ready for transport.",
    images: [],
    location: "Pune, Maharashtra",
    verificationStatus: 'Self Verified',
    createdAt: new Date().toISOString()
  }
];

const demoBids: Bid[] = [
  {
    id: "bid_1",
    listingId: "lst_1",
    buyerId: "b1",
    buyerName: "FreshKart Organics",
    offerPrice: 3100,
    requestedQuantity: 50,
    message: "Ready to buy immediately.",
    status: 'Pending',
    createdAt: new Date().toISOString()
  }
];

export const mockDB = {
  initialize: () => {
    if (!localStorage.getItem(STORAGE_KEYS.LISTINGS)) {
      localStorage.setItem(STORAGE_KEYS.LISTINGS, JSON.stringify(demoListings));
    }
    if (!localStorage.getItem(STORAGE_KEYS.BIDS)) {
      localStorage.setItem(STORAGE_KEYS.BIDS, JSON.stringify(demoBids));
    }
    if (!localStorage.getItem(STORAGE_KEYS.VERIFICATIONS)) {
      localStorage.setItem(STORAGE_KEYS.VERIFICATIONS, JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.VIRTUAL_LOTS)) {
      localStorage.setItem(STORAGE_KEYS.VIRTUAL_LOTS, JSON.stringify([]));
    }
  },

  // Listings
  getListings: (): Listing[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.LISTINGS) || '[]'),
  getListing: (id: string): Listing | undefined => mockDB.getListings().find(l => l.id === id),
  addListing: (listing: Listing) => {
    const listings = mockDB.getListings();
    localStorage.setItem(STORAGE_KEYS.LISTINGS, JSON.stringify([listing, ...listings]));
  },
  updateListing: (id: string, updates: Partial<Listing>) => {
    const listings = mockDB.getListings().map(l => l.id === id ? { ...l, ...updates } : l);
    localStorage.setItem(STORAGE_KEYS.LISTINGS, JSON.stringify(listings));
  },

  // Bids
  getBids: (): Bid[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.BIDS) || '[]'),
  getBidsForListing: (listingId: string): Bid[] => mockDB.getBids().filter(b => b.listingId === listingId),
  getBidsByBuyer: (buyerId: string): Bid[] => mockDB.getBids().filter(b => b.buyerId === buyerId),
  addBid: (bid: Bid) => {
    const bids = mockDB.getBids();
    localStorage.setItem(STORAGE_KEYS.BIDS, JSON.stringify([bid, ...bids]));
  },
  updateBidStatus: (id: string, status: BidStatus) => {
    const bids = mockDB.getBids().map(b => b.id === id ? { ...b, status } : b);
    localStorage.setItem(STORAGE_KEYS.BIDS, JSON.stringify(bids));
  },

  // Verifications
  getVerificationRequests: (): VerificationRequest[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.VERIFICATIONS) || '[]'),
  addVerificationRequest: (req: VerificationRequest) => {
    const reqs = mockDB.getVerificationRequests();
    localStorage.setItem(STORAGE_KEYS.VERIFICATIONS, JSON.stringify([req, ...reqs]));
  },
  updateVerificationRequestStatus: (id: string, status: RequestStatus) => {
    const reqs = mockDB.getVerificationRequests().map(r => r.id === id ? { ...r, status } : r);
    localStorage.setItem(STORAGE_KEYS.VERIFICATIONS, JSON.stringify(reqs));
  },

  // Virtual Lots
  getVirtualLots: (): VirtualLot[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.VIRTUAL_LOTS) || '[]'),
  addVirtualLot: (lot: VirtualLot) => {
    const lots = mockDB.getVirtualLots();
    localStorage.setItem(STORAGE_KEYS.VIRTUAL_LOTS, JSON.stringify([lot, ...lots]));
  },
  updateVirtualLot: (id: string, updates: Partial<VirtualLot>) => {
    const lots = mockDB.getVirtualLots().map(l => l.id === id ? { ...l, ...updates } : l);
    localStorage.setItem(STORAGE_KEYS.VIRTUAL_LOTS, JSON.stringify(lots));
  }
};
