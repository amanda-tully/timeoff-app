import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";
import { RequestList } from "../components/RequestList/RequestList";

const meta = {
  title: "Request List",
  component: RequestList,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
  tags: ["autodocs"],
  args: {
    handleAction: fn(),
  },
} satisfies Meta<typeof RequestList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    items: [
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
      },
      {
        id: "3",
        startDate: "2025-12-15",
        endDate: "2025-12-16",
        type: "personal",
        status: "rejected",
        requestNote: "Personal matters",
        responseNote: "Not enough notice",
      },
    ],
    view: "requests",
  },
};

export const ResponseView: Story = {
  args: {
    items: [
      {
        id: "4",
        startDate: "2025-10-25",
        endDate: "2025-10-26",
        type: "vacation",
        status: "pending",
        requestNote: "Short break",
        responseNote: "",
      },
      {
        id: "5",
        startDate: "2025-11-10",
        endDate: "2025-11-10",
        type: "sick-day",
        status: "pending",
        requestNote: "Doctor appointment",
        responseNote: "",
      },
    ],
    view: "response",
  },
};
