import { useCallback, useEffect, useState } from "react";
import { TimeOffAPI, TimeOffRequest, TimeOffType } from "../api/timeoff";

const MOCK_DELAY_MS = 600;
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export function useEmployeeRequests(employeeId: string, employeeName: string) {
  const [requests, setRequests] = useState<TimeOffRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [creating, setCreating] = useState<boolean>(false);

  const load = useCallback(async () => {
    setLoading(true);
    await delay(MOCK_DELAY_MS);
    const list = TimeOffAPI.listForEmployee(employeeId);
    setRequests(list);
    setLoading(false);
  }, [employeeId]);

  useEffect(() => {
    load();
  }, [load]);

  const create = useCallback(
    async (input: {
      startDate: string;
      endDate: string;
      type: string;
      note?: string;
    }) => {
      setCreating(true);
      // normalize type
      const type = input.type.toLowerCase() as TimeOffType;
      await delay(MOCK_DELAY_MS);
      TimeOffAPI.createRequest(employeeId, employeeName, {
        startDate: input.startDate,
        endDate: input.endDate,
        type,
        note: input.note,
      });
      await load();
      setCreating(false);
    },
    [employeeId, employeeName, load],
  );

  return { requests, loading, creating, reload: load, create };
}

export function useSupervisorRequests(supervisorId: string) {
  const [requests, setRequests] = useState<TimeOffRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [updating, setUpdating] = useState<boolean>(false);

  const load = useCallback(async () => {
    setLoading(true);
    await delay(MOCK_DELAY_MS);
    const list = TimeOffAPI.listForSupervisor(supervisorId);
    setRequests(list);
    setLoading(false);
  }, [supervisorId]);

  useEffect(() => {
    load();
  }, [load]);

  const approve = useCallback(
    async (id: string, note?: string) => {
      setUpdating(true);
      await delay(MOCK_DELAY_MS);
      TimeOffAPI.updateStatus(id, "approved", note);
      await load();
      setUpdating(false);
    },
    [load],
  );

  const reject = useCallback(
    async (id: string, note?: string) => {
      setUpdating(true);
      await delay(MOCK_DELAY_MS);
      TimeOffAPI.updateStatus(id, "rejected", note);
      await load();
      setUpdating(false);
    },
    [load],
  );

  return { requests, loading, updating, reload: load, approve, reject };
}
