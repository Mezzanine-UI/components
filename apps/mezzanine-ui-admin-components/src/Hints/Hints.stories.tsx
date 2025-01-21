import type { Meta, StoryObj } from '@storybook/react';
import { Hints } from './index';

const meta = {
  component: Hints,
} satisfies Meta<typeof Hints>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    hints: ['第一行', '第二行', '第三行'],
  },
  parameters: {
    controls: { include: ['hints'] },
  },
  render: function Render(args) {
    return <Hints {...args} />;
  },
};
