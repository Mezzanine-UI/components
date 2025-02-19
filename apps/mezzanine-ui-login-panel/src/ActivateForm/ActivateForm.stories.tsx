import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import * as Yup from 'yup';
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
    showBackButtonInPanel: false,
  },
  parameters: {
    controls: {
      include: ['passwordLength', 'account', 'showBackButtonInPanel'],
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

export const CustomizedFields: Story = {
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
    customizedSchema: Yup.object({
      name: Yup.string().required('必填欄位不可空白'),
    }),
    customizedFields: [
      {
        registerName: 'name',
        label: '姓名',
        required: true,
        placeholder: '請輸入姓名',
      },
    ],
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
