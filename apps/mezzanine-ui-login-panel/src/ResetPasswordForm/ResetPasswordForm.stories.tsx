import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ResetPasswordForm } from './index';

const meta = {
  component: ResetPasswordForm,
} satisfies Meta<typeof ResetPasswordForm>;

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
    onChangePassword: async (values) => {
      action('onChangePassword')(values);
      return true;
    },
    account: 'admin@rytass.com',
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
        <ResetPasswordForm {...args} />
      </div>
    );
  },
};
