import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Button } from '@mezzanine-ui/react';
import { PageWrapper } from './index';

const meta = {
  component: PageWrapper,
} satisfies Meta<typeof PageWrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '管理帳號',
    isFormPage: false,
    children: (
      <div
        style={{
          width: '100%',
          height: 350,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #212121',
        }}
      >
        頁面 Body
      </div>
    ),
  },
  parameters: {
    controls: { include: ['title'] },
  },
  render: function Render(args) {
    return <PageWrapper {...args} />;
  },
};

export const WithCreateButton: Story = {
  args: {
    title: '管理帳號',
    isFormPage: false,
    createText: '新增帳號',
    onCreate: action('onCreate'),
    createButtonDisabled: false,
    children: (
      <div
        style={{
          width: '100%',
          height: 350,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #212121',
        }}
      >
        頁面 Body
      </div>
    ),
  },
  parameters: {
    controls: { include: ['title', 'createButtonDisabled'] },
  },
  render: function Render(args) {
    return <PageWrapper {...args} />;
  },
};

export const WithCustomizeActionComponent: Story = {
  args: {
    title: '管理帳號',
    isFormPage: false,
    customizeActionComponent: (
      <Button
        type="button"
        variant="contained"
        size="large"
        onClick={action('onCustomized')}
      >
        自定義按鈕
      </Button>
    ),
    children: (
      <div
        style={{
          width: '100%',
          height: 350,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #212121',
        }}
      >
        頁面 Body
      </div>
    ),
  },
  parameters: {
    controls: { include: ['title'] },
  },
  render: function Render(args) {
    return <PageWrapper {...args} />;
  },
};

export const WithBoth: Story = {
  args: {
    title: '管理帳號',
    isFormPage: false,
    customizeActionComponent: (
      <Button
        type="button"
        variant="contained"
        size="large"
        onClick={action('onCustomized')}
      >
        自定義按鈕
      </Button>
    ),
    createText: '新增帳號',
    onCreate: action('onCreate'),
    createButtonDisabled: false,
    children: (
      <div
        style={{
          width: '100%',
          height: 350,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #212121',
        }}
      >
        頁面 Body
      </div>
    ),
  },
  parameters: {
    controls: { include: ['title', 'createButtonDisabled'] },
  },
  render: function Render(args) {
    return <PageWrapper {...args} />;
  },
};
