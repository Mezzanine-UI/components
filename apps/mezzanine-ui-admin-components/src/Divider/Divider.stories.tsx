import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from '@mezzanine-ui/react';
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
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Typography variant="h2" color="primary">
          上文
        </Typography>
        <Divider {...args} />
        <Typography variant="h2" color="primary">
          下文
        </Typography>
      </div>
    );
  },
};

export const Pure: Story = {
  args: {
    isPure: true,
  },
  parameters: {
    controls: { include: ['isPure'] },
  },
  render: function Render(args) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Typography variant="h2" color="primary">
          上文
        </Typography>
        <Divider {...args} />
        <Typography variant="h2" color="primary">
          下文
        </Typography>
      </div>
    );
  },
};
