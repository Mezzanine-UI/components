import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ChangePasswordForm } from './index';

const meta = {
  component: ChangePasswordForm,
} satisfies Meta<typeof ChangePasswordForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    logo: (
      <div
        style={{
          width: 134,
          height: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #212121',
        }}
      >
        Logo
      </div>
    ),
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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ChangePasswordForm {...args} />
      </div>
    );
  },
};

export const CustomizedRule: Story = {
  args: {
    logo: (
      <div
        style={{
          width: 134,
          height: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #212121',
        }}
      >
        Logo
      </div>
    ),
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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ChangePasswordForm {...args} />
      </div>
    );
  },
};
