import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import React from "react";
import { FormCard } from "./FormCard";

describe("FormCard", () => {
  const mockOnSubmit = vi.fn();
  const defaultProps = {
    title: "Request Time Off",
    onSubmit: mockOnSubmit,
  };

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  test("disables submit button when form is invalid", () => {
    render(<FormCard {...defaultProps} />);
    const submitBtn = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitBtn);
    expect(mockOnSubmit).not.toHaveBeenCalled();
    expect(submitBtn).toBeDisabled();
  });

  test("enables submit button when form is valid and fires event", () => {
    const mockOnSubmit = vi.fn();
    render(<FormCard title="Test Form" onSubmit={mockOnSubmit} />);

    const typeSelect = screen.getByTestId("type-select");
    fireEvent(
      typeSelect,
      new CustomEvent("ionChange", { detail: { value: "Vacation" } }),
    );

    const startDateInput = screen.getByTestId("start-date");
    fireEvent(
      startDateInput,
      new CustomEvent("ionChange", { detail: { value: "2025-10-20" } }),
    );

    const endDateInput = screen.getByTestId("end-date");
    fireEvent(
      endDateInput,
      new CustomEvent("ionChange", { detail: { value: "2025-10-22" } }),
    );

    const noteTextarea = screen.getByPlaceholderText(/reason for request/i);
    fireEvent(
      noteTextarea,
      new CustomEvent("ionChange", { detail: { value: "Family trip" } }),
    );

    const form = screen.getByRole("form");
    fireEvent.submit(form);

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith({
      startDate: "2025-10-20",
      endDate: "2025-10-22",
      type: "Vacation",
      note: "Family trip",
    });
  });
});
