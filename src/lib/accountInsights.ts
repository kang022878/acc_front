import type { Account } from "./types";

export type CleanupItem = {
  id: string;
  serviceName: string;
  serviceDomain: string;
  inactivityDays: number;
  label: string; // "N일 미사용" 같은 UI 문구
};

export type CategoryDonut = {
  key: string;
  label: string;
  count: number;
  percent: number; // 0~100
};

function mapCategoryToLabel(cat: string) {
  switch (cat) {
    case "signup":
      return "회원가입";
    case "receipt":
      return "결제/영수증";
    case "authentication":
      return "인증/보안";
    default:
      return "기타";
  }
}

export function buildCategoryDonuts(accounts: Account[]): CategoryDonut[] {
  const total = accounts.length || 1;

  const counts = new Map<string, number>();
  for (const a of accounts) {
    const key = mapCategoryToLabel(a.category);
    counts.set(key, (counts.get(key) || 0) + 1);
  }

  const keys = ["회원가입", "결제/영수증", "인증/보안", "기타"];
  return keys.map((label) => {
    const count = counts.get(label) || 0;
    return {
      key: label,
      label,
      count,
      percent: Math.round((count / total) * 100),
    };
  });
}

export function buildCleanupTop2(accounts: Account[]): CleanupItem[] {
  // inactivityDays가 없을 수도 있으니 lastActivityDate/firstSeenDate로 계산
  const now = Date.now();

  const withInactivity = accounts.map((a) => {
    const base = a.lastActivityDate || a.firstSeenDate;
    const days = Math.max(
      0,
      Math.floor((now - new Date(base).getTime()) / (1000 * 60 * 60 * 24))
    );
    return { ...a, _days: a.inactivityDays ?? days };
  });

  withInactivity.sort((a, b) => b._days - a._days);

  return withInactivity.slice(0, 2).map((a) => ({
    id: a.id,
    serviceName: a.serviceName,
    serviceDomain: a.serviceDomain,
    inactivityDays: a._days,
    label: `${a._days}일 미사용`,
  }));
}
