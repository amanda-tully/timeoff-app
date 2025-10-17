import { users } from "../data/Users";

export type TimeOffType = "vacation" | "sick-day" | "personal";
export type TimeOffStatus = "pending" | "approved" | "rejected";

export interface TimeOffRequest {
  id: string; // uuid-like
  employeeId: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  type: TimeOffType;
  note?: string; // employee note
  status: TimeOffStatus;
  supervisorNote?: string;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = "timeoff_requests_v1";

function loadAll(): TimeOffRequest[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as TimeOffRequest[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveAll(list: TimeOffRequest[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export interface CreateRequestInput {
  startDate: string;
  endDate: string;
  type: TimeOffType;
  note?: string;
}

export const TimeOffAPI = {
  // Create a new request for an employee
  createRequest(employeeId: string, input: CreateRequestInput): TimeOffRequest {
    const now = new Date().toISOString();
    const all = loadAll();
    const request: TimeOffRequest = {
      id: uuid(),
      employeeId,
      startDate: input.startDate,
      endDate: input.endDate,
      type: input.type,
      note: input.note?.trim() || undefined,
      status: "pending",
      createdAt: now,
      updatedAt: now,
    };
    all.unshift(request);
    saveAll(all);
    return request;
  },

  // List requests created by a specific employee
  listForEmployee(employeeId: string): TimeOffRequest[] {
    return loadAll().filter((r) => r.employeeId === employeeId);
  },

  // List requests submitted by all direct reports for a supervisor
  listForSupervisor(supervisorId: string): TimeOffRequest[] {
    const supervisor = users.find((u) => u.id === supervisorId);
    if (!supervisor) return [];
    const teamIds = supervisor.employeesToSupervise || [];
    if (!teamIds.length) return [];
    return loadAll().filter((r) => teamIds.includes(r.employeeId));
  },

  // Update the status (approve/reject) of a request
  updateStatus(
    requestId: string,
    status: Exclude<TimeOffStatus, "pending">,
    supervisorNote?: string,
  ): TimeOffRequest | undefined {
    const all = loadAll();
    const idx = all.findIndex((r) => r.id === requestId);
    if (idx === -1) return undefined;
    const updated: TimeOffRequest = {
      ...all[idx],
      status,
      supervisorNote: supervisorNote?.trim() || undefined,
      updatedAt: new Date().toISOString(),
    };
    all[idx] = updated;
    saveAll(all);
    return updated;
  },

  // Utility for tests/demos
  clearAll() {
    saveAll([]);
  },
};

export type { users };
