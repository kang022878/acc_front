export type Account = {
  id: string;
  serviceName: string;
  serviceDomain: string;
  category: string;
  firstSeenDate: string;
  confirmed: boolean;
};

export type ScanResponse = {
  success: boolean;
  discoveredCount: number;
  accounts: Account[];
};
