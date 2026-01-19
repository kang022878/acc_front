export type Account = {
  id: string;
  serviceName: string;
  serviceDomain: string;
  category: string; // signup | receipt | authentication | 기타
  firstSeenDate: string;
  lastActivityDate?: string;
  inactivityDays?: number;
  confirmed: boolean;
  status?: string;
};
