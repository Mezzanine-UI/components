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
    keepPasswordDaysLimit: 60,
    generalLoginText: undefined,
    onLogin: async ({ values }) => {
      action('onLogin')(values);
    },
    onNeedChangePassword: async ({ values, account, oldPassword }) => {
      action('onNeedChangePassword')({ values, account, oldPassword });
      return true;
    },
    onSendForgotPassword: async ({ values }) => {
      action('onSendForgotPassword')(values);
      return true;
    },
  },
  parameters: {
    controls: {
      include: ['passwordLength', 'keepPasswordDaysLimit', 'generalLoginText'],
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

export const CustomizeWording: Story = {
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
    keepPasswordDaysLimit: 60,
    generalLoginText: undefined,
    onLogin: async ({ values }) => {
      action('onLogin')(values);
    },
    onNeedChangePassword: async ({ values, account, oldPassword }) => {
      action('onNeedChangePassword')({ values, account, oldPassword });
      return true;
    },
    onSendForgotPassword: async ({ values }) => {
      action('onSendForgotPassword')(values);
      return true;
    },
    accountFieldPlaceholder: '請輸入手機',
    forgetPasswordAccountFieldPlaceholder: '請輸入手機 e.g. 0912345678',
    forgetPasswordHint: `請輸入註冊時使用的手機號碼
密碼重置連結將發送至該手機`,
    forgetPasswordSuccessHint: `請於1小時內點擊連結設定密碼。
若未收到連結或遇連結失效請聯絡管理員。`,
  },
  parameters: {
    controls: {
      include: ['passwordLength', 'keepPasswordDaysLimit', 'generalLoginText'],
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

export const HaveNoForgotPassword: Story = {
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
    keepPasswordDaysLimit: 60,
    generalLoginText: undefined,
    onLogin: async ({ values }) => {
      action('onLogin')(values);
    },
    onNeedChangePassword: async ({ values, account, oldPassword }) => {
      action('onNeedChangePassword')({ values, account, oldPassword });
      return true;
    },
    customizedLoginPasswordHint: ['忘記密碼請聯繫管理員'],
    notShowForgotPassword: true,
  },
  parameters: {
    controls: {
      include: ['passwordLength', 'keepPasswordDaysLimit', 'generalLoginText'],
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
    keepPasswordDaysLimit: 60,
    generalLoginText: undefined,
    onLogin: async ({ values, needChangePassword }) => {
      action('onLogin')(values);
      needChangePassword({
        mode: NeedChangePasswordMode.FIRST,
      });
    },
    onNeedChangePassword: async ({ values, account, oldPassword }) => {
      action('onNeedChangePassword')({ values, account, oldPassword });
      return true;
    },
    onSendForgotPassword: async ({ values }) => {
      action('onSendForgotPassword')(values);
      return true;
    },
  },
  parameters: {
    controls: {
      include: ['passwordLength', 'keepPasswordDaysLimit', 'generalLoginText'],
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

export const NeedChangePasswordTooLong: Story = {
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
    generationLimit: 6,
    keepPasswordDaysLimit: 60,
    generalLoginText: undefined,
    onLogin: async ({ values, needChangePassword }) => {
      action('onLogin')(values);
      needChangePassword({
        mode: NeedChangePasswordMode.TOO_LONG,
      });
    },
    onNeedChangePassword: async ({ values, account, oldPassword }) => {
      action('onNeedChangePassword')({ values, account, oldPassword });
      return true;
    },
    onSendForgotPassword: async ({ values }) => {
      action('onSendForgotPassword')(values);
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
