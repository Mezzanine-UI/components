import type { Meta, StoryObj } from '@storybook/react';
import { UnauthorizedAdminPageWrapper } from './index';

const meta = {
  component: UnauthorizedAdminPageWrapper,
} satisfies Meta<typeof UnauthorizedAdminPageWrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  parameters: {
    controls: { include: [''] },
  },
  render: function Render(args) {
    return (
      <UnauthorizedAdminPageWrapper>
        <div
          style={{
            width: 482,
            height: 500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #212121',
          }}
        >
          Login Panel
        </div>
      </UnauthorizedAdminPageWrapper>
    );
  },
};
