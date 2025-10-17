import { useCallback, useEffect, useState } from "react";
import { TimeOffAPI, TimeOffRequest, TimeOffType } from "../api/timeoff";

export function useEmployeeRequests(employeeId: string) {
  const [requests, setRequests] = useState<TimeOffRequest[]>([]);

  const load = useCallback(() => {
    const list = TimeOffAPI.listForEmployee(employeeId);
    setRequests(list);
  }, [employeeId]);

  useEffect(() => {
    load();
  }, [load]);

  const create = useCallback(
    (input: {
      startDate: string;
      endDate: string;
      type: string;
      note?: string;
    }) => {
      // normalize type
      const type = input.type.toLowerCase() as TimeOffType;
      TimeOffAPI.createRequest(employeeId, {
        startDate: input.startDate,
        endDate: input.endDate,
        type,
        note: input.note,
      });
      load();
    },
    [employeeId, load],
  );

  return { requests, reload: load, create };
}

export function useSupervisorRequests(supervisorId: string) {
  const [requests, setRequests] = useState<TimeOffRequest[]>([]);

  const load = useCallback(() => {
    const list = TimeOffAPI.listForSupervisor(supervisorId);
    setRequests(list);
  }, [supervisorId]);

  useEffect(() => {
    load();
  }, [load]);

  const approve = useCallback(
    (id: string, note?: string) => {
      TimeOffAPI.updateStatus(id, "approved", note);
      load();
    },
    [load],
  );

  const reject = useCallback(
    (id: string, note?: string) => {
      TimeOffAPI.updateStatus(id, "rejected", note);
      load();
    },
    [load],
  );

  return { requests, reload: load, approve, reject };
}
