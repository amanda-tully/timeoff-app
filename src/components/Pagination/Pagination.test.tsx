import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { vi } from "vitest";
import { Pagination } from "./Pagination";

describe("Pagination", () => {
  test("renders nothing if totalPages is 1", () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} onPageChange={vi.fn()} />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  test("renders all page numbers if totalPages <= 5", () => {
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={vi.fn()} />,
    );
    for (let i = 1; i <= 5; i++) {
      expect(screen.getByText(i.toString())).toBeInTheDocument();
    }
    expect(screen.queryByText("…")).not.toBeInTheDocument();
  });

  test("renders ellipsis for many pages (first page)", () => {
    render(
      <Pagination currentPage={1} totalPages={10} onPageChange={vi.fn()} />,
    );
    expect(screen.getByText("…")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  test("renders ellipsis for many pages (middle page)", () => {
    render(
      <Pagination currentPage={5} totalPages={10} onPageChange={vi.fn()} />,
    );
    expect(screen.getAllByText("…").length).toBeGreaterThan(1);
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("6")).toBeInTheDocument();
  });

  test("disables Previous button on first page", () => {
    const mockPrevClick = vi.fn();
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockPrevClick}
      />,
    );
    const prevBtn = screen.getByLabelText(/previous page/i);
    expect(prevBtn).toBeDisabled();
  });

  test("disables Next button on last page", () => {
    render(
      <Pagination currentPage={5} totalPages={5} onPageChange={vi.fn()} />,
    );
    const nextBtn = screen.getByLabelText(/next page/i);
    expect(nextBtn).toBeDisabled();
  });

  test("calls onPageChange when clicking page number", () => {
    const onPageChange = vi.fn();
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />,
    );
    fireEvent.click(screen.getByText("3"));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  test("calls onPageChange when clicking Next/Previous", () => {
    const onPageChange = vi.fn();
    render(
      <Pagination currentPage={2} totalPages={5} onPageChange={onPageChange} />,
    );
    fireEvent.click(screen.getByLabelText(/previous page/i));
    expect(onPageChange).toHaveBeenCalledWith(1);
    fireEvent.click(screen.getByLabelText(/next page/i));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  test("does not call onPageChange when clicking current page", () => {
    const onPageChange = vi.fn();
    render(
      <Pagination currentPage={2} totalPages={5} onPageChange={onPageChange} />,
    );
    fireEvent.click(screen.getByText("2"));
    expect(onPageChange).not.toHaveBeenCalled();
  });
});
