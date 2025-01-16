import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './index';

const meta = {
  component: Divider,
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  parameters: {
    controls: { include: [] },
  },
  render: function Render(args) {
    return <Divider {...args} />;
  },
};
