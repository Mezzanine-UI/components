import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ChangePasswordModal } from './index';

const meta = {
  component: ChangePasswordModal,
} satisfies Meta<typeof ChangePasswordModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    passwordLength: 10,
    generationLimit: undefined,
    onChangePassword: async ({ values }) => {
      action('onChangePassword')(values);
      return true;
    },
    account: 'admin@rytass.com',
    onCancel: action('onCancel'),
    onBack: action('onBack'),
  },
  parameters: {
    controls: {
      include: ['passwordLength', 'generationLimit', 'account'],
    },
  },
  render: function Render(args) {
    return (
      <div
        style={{
          width: 576,
        }}
      >
        <ChangePasswordModal {...args} />
      </div>
    );
  },
};

export const CustomizedRule: Story = {
  args: {
    generationLimit: undefined,
    onChangePassword: async ({ values }) => {
      action('onChangePassword')(values);
      return true;
    },
    account: 'admin@rytass.com',
    onCancel: action('onCancel'),
    onBack: action('onBack'),
    customizedHint: '至少 8 字元、大寫字母、小寫字母',
    customizedRule: new RegExp(`^(?=.*[a-z])(?=.*[A-Z]).{8,}$`),
  },
  parameters: {
    controls: {
      include: ['generationLimit', 'account'],
    },
  },
  render: function Render(args) {
    return (
      <div
        style={{
          width: 576,
        }}
      >
        <ChangePasswordModal {...args} />
      </div>
    );
  },
};
