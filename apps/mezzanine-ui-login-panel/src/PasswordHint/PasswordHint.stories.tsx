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
  },
  parameters: {
    controls: {
      include: ['passwordValue', 'passwordLength', 'generationLimit'],
    },
  },
  render: function Render(args) {
    return <PasswordHint {...args} />;
  },
};

export const CustomizedRule: Story = {
  args: {
    passwordValue: 'qweR1234!@#$',
    generationLimit: 6,
    customizedHint: '至少 8 字元、大寫字母、小寫字母',
    customizedRule: new RegExp(`^(?=.*[a-z])(?=.*[A-Z]).{8,}$`),
  },
  parameters: {
    controls: {
      include: ['passwordValue', 'generationLimit', 'customizedHint'],
    },
  },
  render: function Render(args) {
    return <PasswordHint {...args} />;
  },
};
