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
    logo: <div>logo</div>,
    passwordLength: 10,
    onChangePassword: async (values) => {
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
