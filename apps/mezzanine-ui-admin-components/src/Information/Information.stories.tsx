import type { Meta, StoryObj } from '@storybook/react';
import { Information } from './index';

const meta = {
  component: Information,
} satisfies Meta<typeof Information>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    mode: 'info',
    text: '範例文字',
    alignStart: false,
  },
  parameters: {
    controls: { include: ['mode', 'text', 'alignStart'] },
  },
  render: function Render(args) {
    return <Information {...args} />;
  },
};

export const MoreText: Story = {
  args: {
    mode: 'info',
    text: `範例文字
範例文字`,
    alignStart: true,
  },
  parameters: {
    controls: { include: ['mode', 'text', 'alignStart'] },
  },
  render: function Render(args) {
    return <Information {...args} />;
  },
};
