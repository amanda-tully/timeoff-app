import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { RequestList, RequestListItem } from "./RequestList";
import { vi } from "vitest";

const sampleItems: RequestListItem[] = [
  {
    id: "1",
    startDate: "2025-10-20",
    endDate: "2025-10-22",
    type: "vacation",
    status: "pending",
    requestNote: "Family trip",
    responseNote: "",
  },
  {
    id: "2",
    startDate: "2025-11-01",
    endDate: "2025-11-01",
    type: "sick-day",
    status: "approved",
    requestNote: "Flu",
    responseNote: "Get well soon!",
    employeeName: "Anna",
  },
];

describe("RequestList", () => {
  test("renders all request fields", () => {
    render(<RequestList items={sampleItems} view="requests" />);
    expect(screen.getByText(/Vacation Request/i)).toBeInTheDocument();
    expect(screen.getByTestId("start-value-1")).toHaveTextContent("2025-10-20");
    expect(screen.getByTestId("end-value-1")).toHaveTextContent("2025-10-22");
    expect(screen.getByTestId("status-value-1")).toHaveTextContent("Pending");
    expect(screen.getByTestId("request-note-value-1")).toHaveTextContent(
      "Family trip",
    );
    expect(screen.getByText(/Sick-day Request/i)).toBeInTheDocument();
    expect(screen.getByTestId("start-value-2")).toHaveTextContent("2025-11-01");
    expect(screen.getByTestId("end-value-2")).toHaveTextContent("2025-11-01");
    expect(screen.getByTestId("status-value-2")).toHaveTextContent("Approved");
    expect(screen.getByTestId("request-note-value-2")).toHaveTextContent("Flu");
    expect(screen.getByTestId("response-note-value-2")).toHaveTextContent(
      "Get well soon!",
    );
    expect(screen.getByTestId("employee-name-2")).toHaveText("Anna");
  });

  test("does not show action buttons in 'requests' view", () => {
    render(<RequestList items={sampleItems} view="requests" />);
    expect(screen.queryByText(/Approve/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Reject/i)).not.toBeInTheDocument();
  });

  test("shows action buttons in 'response' view", () => {
    render(
      <RequestList
        items={sampleItems}
        view="response"
        handleAction={vi.fn()}
      />,
    );
    expect(screen.getAllByText(/Process Request/i).length).toBe(2);
  });

  test("calls handleAction with correct arguments", () => {
    const handleAction = vi.fn();
    render(
      <RequestList
        items={sampleItems}
        view="response"
        handleAction={handleAction}
      />,
    );
    fireEvent.click(screen.getAllByText(/Process Request/i)[0]);
    expect(handleAction).toHaveBeenCalledWith(1);
  });

  test("renders empty list without crashing", () => {
    render(<RequestList items={[]} view="requests" />);
    expect(screen.queryByText(/Request/i)).not.toBeInTheDocument();
  });
});
