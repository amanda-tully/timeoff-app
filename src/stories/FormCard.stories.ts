import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";
import { FormCard } from "../components/FormCard/FormCard";

const meta = {
  title: "Request Form Card",
  component: FormCard,
  argTypes: {
    title: { control: "text" },
  },
  tags: ["autodocs"],
  args: { onSubmit: fn(), title: "New Request" },
} satisfies Meta<typeof FormCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
