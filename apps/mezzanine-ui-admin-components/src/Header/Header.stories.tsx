import type { Meta, StoryObj } from '@storybook/react';
import { CSSProperties } from 'react';
import { action } from '@storybook/addon-actions';
import { Button } from '@mezzanine-ui/react';
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
    name: 'Ting',
    role: '管理員',
    account: 'root@rytass.com',
    onLogout: async () => {
      action('onLogout')();
    },
    changePasswordModalConfig: {
      passwordLength: 10,
      generationLimit: undefined,
      onChangePassword: async ({ values }) => {
        action('onChangePassword')(values);
        return true;
      },
      onBack: action('onBack'),
    },
  },
  parameters: {
    controls: { include: ['name', 'role', 'account'] },
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

export const CustomizedRule: Story = {
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
    name: 'Ting',
    role: '管理員',
    account: 'root@rytass.com',
    onLogout: async () => {
      action('onLogout')();
    },
    changePasswordModalConfig: {
      customizedHint: '至少 8 字元、大寫字母、小寫字母',
      customizedRule: new RegExp(`^(?=.*[a-z])(?=.*[A-Z]).{8,}$`),
      onChangePassword: async ({ values }) => {
        action('onChangePassword')(values);
        return true;
      },
      onBack: action('onBack'),
    },
  },
  parameters: {
    controls: { include: ['name', 'role', 'account'] },
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

export const CustomizedButton: Story = {
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
    name: 'Ting',
    role: '管理員',
    account: 'root@rytass.com',
    onLogout: async () => {
      action('onLogout')();
    },
    changePasswordModalConfig: {
      passwordLength: 10,
      generationLimit: undefined,
      onChangePassword: async ({ values }) => {
        action('onChangePassword')(values);
        return true;
      },
      onBack: action('onBack'),
    },
    customizedButton: (
      <Button
        type="button"
        variant="outlined"
        size="large"
        onClick={action('onCustomized')}
      >
        編輯個人資料
      </Button>
    ),
  },
  parameters: {
    controls: { include: ['name', 'role', 'account'] },
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

export const CustomizedComponent: Story = {
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
    name: 'Ting',
    role: '管理員',
    account: 'root@rytass.com',
    onLogout: async () => {
      action('onLogout')();
    },
    customizedComponent: <div>自定義元件區</div>,
    changePasswordModalConfig: {
      passwordLength: 10,
      generationLimit: undefined,
      onChangePassword: async ({ values }) => {
        action('onChangePassword')(values);
        return true;
      },
      onBack: action('onBack'),
    },
    customizedButton: (
      <Button
        type="button"
        variant="outlined"
        size="large"
        onClick={action('onCustomized')}
      >
        編輯個人資料
      </Button>
    ),
  },
  parameters: {
    controls: { include: ['name', 'role', 'account'] },
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
