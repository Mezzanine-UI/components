import type { Meta, StoryObj } from '@storybook/react';
import { NavigationSubMenu, NavigationItem } from '@mezzanine-ui/react';
import {
  FormFieldsWrapper,
  InputField,
} from '@mezzanine-ui/react-hook-form-v2';
import { ChangePasswordFormValues } from '@mezzanine-ui/login-panel';
import { useForm } from 'react-hook-form';
import { useLayout } from '../layout/useLayout';
import { action } from '@storybook/addon-actions';
import { PageWrapper } from '../PageWrapper';
import { AuthorizedAdminPageWrapper } from './index';

const meta = {
  component: AuthorizedAdminPageWrapper,
} satisfies Meta<typeof AuthorizedAdminPageWrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

const args = {
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
    onChangePassword: async ({
      values,
    }: {
      values: ChangePasswordFormValues;
    }) => {
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
  onPush: (path: string) => action('onPush')(path),
};

export const Default: Story = {
  args,
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

const FormSample = () => {
  const methods = useForm({
    defaultValues: {
      sample: '',
    },
  });
  const { sidebarWidth, sidebarExpanded } = useLayout();

  return (
    <FormFieldsWrapper
      methods={methods}
      haveFooter
      cancelButtonText="取消"
      onSubmit={async (values) => {
        action('onSubmit')(values);
      }}
      onCancel={async (values) => {
        action('onCancel')(values);
      }}
      actionButtonText="儲存"
      onClickAction={async (values) => {
        action('onClickAction')(values);
      }}
      footerOffset={sidebarWidth}
      expanded={!sidebarExpanded}
    >
      <InputField label="範例" registerName="sample" />
    </FormFieldsWrapper>
  );
};
export const FormPage: Story = {
  args,
  parameters: {
    controls: { include: ['headerHeight', 'sidebarWidth', 'role', 'account'] },
  },
  render: function Render(args) {
    return (
      <AuthorizedAdminPageWrapper {...args}>
        <PageWrapper title="頁面標題" isFormPage>
          <FormSample />
        </PageWrapper>
      </AuthorizedAdminPageWrapper>
    );
  },
};
