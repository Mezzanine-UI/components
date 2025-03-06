import type { Meta, StoryObj } from '@storybook/react';
import { CSSProperties } from 'react';
import { action } from '@storybook/addon-actions';
import { Button, Typography } from '@mezzanine-ui/react';
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

export const CustomizedSpacing: Story = {
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
    horizontalPadding: 40,
    menuLogoSpacing: 16,
    memberIconsSpacing: 8,
  },
  parameters: {
    controls: {
      include: ['horizontalPadding', 'menuLogoSpacing', 'memberIconsSpacing'],
    },
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

export const CustomizedColor: Story = {
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
    customizedSystemName: (
      <Typography variant="input3" color="text-primary">
        TingTing / 廣告物管理系統 - Rytass 部門
      </Typography>
    ),
    iconColor: 'action-active',
  },
  argTypes: {
    iconColor: {
      control: {
        type: 'radio',
      },
      options: ['action-active', 'success', 'secondary', 'surface'],
    },
  },
  parameters: {
    controls: { include: ['name', 'role', 'account', 'iconColor'] },
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
    customizedButton: (close) => (
      <Button
        type="button"
        variant="outlined"
        size="large"
        onClick={() => {
          close();
          action('onCustomized')();
        }}
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
    customizedComponent: (close) => (
      <Button type="button" variant="text" size="large" onClick={close}>
        自定義元件
      </Button>
    ),
    changePasswordModalConfig: {
      passwordLength: 10,
      generationLimit: undefined,
      onChangePassword: async ({ values }) => {
        action('onChangePassword')(values);
        return true;
      },
      onBack: action('onBack'),
    },
    customizedButton: (close) => (
      <Button
        type="button"
        variant="outlined"
        size="large"
        onClick={() => {
          close();
          action('onCustomized')();
        }}
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
