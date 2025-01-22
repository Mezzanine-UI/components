import type { Meta, StoryObj } from '@storybook/react';
import { NavigationSubMenu, NavigationItem } from '@mezzanine-ui/react';
import { action } from '@storybook/addon-actions';
import { PageWrapper } from '../PageWrapper';
import { AuthorizedAdminPageWrapper } from './index';

const meta = {
  component: AuthorizedAdminPageWrapper,
} satisfies Meta<typeof AuthorizedAdminPageWrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    headerHeight: 64,
    sidebarWidth: 270,
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
    navigationChildren: (
      <>
        <NavigationSubMenu title="管理頁面">
          <NavigationItem key="/first-page" active>
            第一頁面
          </NavigationItem>
          <NavigationItem key="/second-page">第二頁面</NavigationItem>
        </NavigationSubMenu>
        <NavigationItem key="/manage-account">管理帳號</NavigationItem>
      </>
    ),
    onPush: (path) => action('onPush')(path),
  },
  parameters: {
    controls: { include: ['headerHeight', 'sidebarWidth', 'role', 'account'] },
  },
  render: function Render(args) {
    return (
      <AuthorizedAdminPageWrapper {...args}>
        <PageWrapper title="頁面標題">頁面</PageWrapper>
      </AuthorizedAdminPageWrapper>
    );
  },
};
