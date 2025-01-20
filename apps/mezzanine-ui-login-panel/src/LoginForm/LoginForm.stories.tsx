import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { LoginForm } from './index';
import { NeedChangePasswordMode } from './typing';

const meta = {
  component: LoginForm,
} satisfies Meta<typeof LoginForm>;

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
    keepPasswordDaysLimit: 60,
    generalLoginText: undefined,
    onLogin: async ({ values }) => {
      action('onLogin')(values);
    },
    onNeedChangePassword: async ({ values, account, oldPassword }) => {
      action('onNeedChangePassword')({ values, account, oldPassword });
      return true;
    },
    onSendForgetAccount: async ({ values }) => {
      action('onSendForgetAccount')(values);
      return true;
    },
  },
  parameters: {
    controls: {
      include: [
        'passwordLength',
        'generationLimit',
        'keepPasswordDaysLimit',
        'generalLoginText',
      ],
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
        <LoginForm {...args} />
      </div>
    );
  },
};

export const NeedChangePasswordFirstActivate: Story = {
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
    keepPasswordDaysLimit: 60,
    generalLoginText: undefined,
    onLogin: async ({ values, needChangePassword }) => {
      needChangePassword({
        account: values.account,
        password: values.password,
        mode: NeedChangePasswordMode.FIRST,
      });
    },
    onNeedChangePassword: async ({ values, account, oldPassword }) => {
      action('onNeedChangePassword')({ values, account, oldPassword });
      return true;
    },
    onSendForgetAccount: async ({ values }) => {
      action('onSendForgetAccount')(values);
      return true;
    },
  },
  parameters: {
    controls: {
      include: [
        'passwordLength',
        'generationLimit',
        'keepPasswordDaysLimit',
        'generalLoginText',
      ],
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
        <LoginForm {...args} />
      </div>
    );
  },
};
