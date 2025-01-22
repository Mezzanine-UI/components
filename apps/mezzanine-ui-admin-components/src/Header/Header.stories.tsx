import type { Meta, StoryObj } from '@storybook/react';
import { CSSProperties } from 'react';
import { action } from '@storybook/addon-actions';
import ModalProvider from '../modal/ModalProvider';
import { Header } from './index';

const meta = {
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    logo: (
      <div
        style={{
          width: 184,
          height: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #212121',
        }}
      >
        Logo
      </div>
    ),
    role: '管理員',
    account: 'root@rytass.com',
    onLogout: async () => {
      action('onLogout')();
    },
    changePasswordModalConfig: {
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
      showGenerationLimitHint: false,
      onChangePassword: async ({ values }) => {
        action('onChangePassword')(values);
        return true;
      },
      onBack: action('onBack'),
    },
  },
  parameters: {
    controls: { include: ['role', 'account'] },
  },
  render: function Render(args) {
    const layoutStyleVar = {
      '--header-height': '64px',
    } as CSSProperties;

    return (
      <ModalProvider>
        <div style={layoutStyleVar}>
          <Header {...args} />
        </div>
      </ModalProvider>
    );
  },
};
