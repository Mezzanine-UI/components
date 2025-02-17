import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ActivateForm } from './index';

const meta = {
  component: ActivateForm,
} satisfies Meta<typeof ActivateForm>;

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
    onChangePassword: async ({ values }) => {
      action('onChangePassword')(values);
      return true;
    },
    account: 'admin@rytass.com',
    onBack: action('onBack'),
  },
  parameters: {
    controls: {
      include: ['passwordLength', 'account'],
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
        <ActivateForm {...args} />
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
    onChangePassword: async ({ values }) => {
      action('onChangePassword')(values);
      return true;
    },
    account: 'admin@rytass.com',
    onBack: action('onBack'),
    customizedHint: '至少 8 字元、大寫字母、小寫字母',
    customizedRule: new RegExp(`^(?=.*[a-z])(?=.*[A-Z]).{8,}$`),
  },
  parameters: {
    controls: {
      include: ['account'],
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
        <ActivateForm {...args} />
      </div>
    );
  },
};
