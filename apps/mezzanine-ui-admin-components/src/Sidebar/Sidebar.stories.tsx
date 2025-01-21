import type { Meta, StoryObj } from '@storybook/react';
import { NavigationSubMenu, NavigationItem } from '@mezzanine-ui/react';
import { CSSProperties } from 'react';
import { action } from '@storybook/addon-actions';
import { Sidebar } from './index';

const meta = {
  component: Sidebar,
} satisfies Meta<typeof Sidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
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
    controls: { include: [] },
  },
  render: function Render(args) {
    const layoutStyleVar = {
      '--header-height': '0px',
      '--sidebar-width': '270px',
    } as CSSProperties;

    return (
      <div style={layoutStyleVar}>
        <Sidebar {...args} />
      </div>
    );
  },
};
