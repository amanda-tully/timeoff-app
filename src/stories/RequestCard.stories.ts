import type { Meta, StoryObj } from "@storybook/react-vite";
// import { fn } from "storybook/test";
import { RequestCard } from "../components/RequestCard/RequestCard";

const meta = {
  title: "Request Card",
  component: RequestCard,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
  tags: ["autodocs"],
} satisfies Meta<typeof RequestCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
