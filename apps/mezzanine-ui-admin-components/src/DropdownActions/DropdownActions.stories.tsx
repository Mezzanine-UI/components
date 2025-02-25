import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { DropdownActions } from './index';

const meta = {
  component: DropdownActions,
} satisfies Meta<typeof DropdownActions>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      {
        text: '普通',
        onClick: action('點擊普通'),
      },
      {
        isDivider: true,
      },
      {
        text: '危險',
        danger: true,
        onClick: action('點擊危險'),
      },
      {
        text: '不能點',
        disabled: true,
        onClick: action('不能點'),
      },
      {
        text: '藏起來',
        hidden: true,
        onClick: action('點擊藏起來'),
      },
    ],
    placement: 'bottom-end',
    disabled: false,
  },
  parameters: {
    controls: { include: ['items', 'placement', 'disabled'] },
  },
  render: function Render(args) {
    return <DropdownActions {...args} />;
  },
};
