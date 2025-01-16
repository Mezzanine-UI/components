import type { Meta, StoryObj } from '@storybook/react';
import { PasswordHint } from './index';

const meta = {
  component: PasswordHint,
} satisfies Meta<typeof PasswordHint>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    passwordValue: 'qweR1234!@#$',
    passwordLength: 10,
    generationLimit: 6,
    showGenerationLimitHint: true,
  },
  parameters: {
    controls: {
      include: [
        'passwordValue',
        'passwordLength',
        'generationLimit',
        'showGenerationLimitHint',
      ],
    },
  },
  render: function Render(args) {
    return <PasswordHint {...args} />;
  },
};
