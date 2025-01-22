import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { TableColumn, TableDataSourceWithID } from '@mezzanine-ui/core/table';
import { AdminTable } from './index';

const meta = {
  component: AdminTable,
} satisfies Meta<typeof AdminTable>;

export default meta;

type Story = StoryObj<typeof meta>;

type DataSourceType = {
  id: string;
  name: string;
  account: string;
  phone: string;
} & TableDataSourceWithID;

const dataSource: DataSourceType[] = [
  {
    id: '1',
    name: 'ting ting',
    account: 'ting@rytass.com',
    phone: '091234567',
  },
  {
    id: '2',
    name: 'marshall',
    account: 'marshall@rytass.com',
    phone: '091234567',
  },
  {
    id: '3',
    name: 'rosie',
    account: 'rosie@rytass.com',
    phone: '091234567',
  },
  {
    id: '4',
    name: 'syu',
    account: 'syu@rytass.com',
    phone: '091234567',
  },
  {
    id: '5',
    name: 'martin',
    account: 'martin@rytass.com',
    phone: '091234567',
  },
  {
    id: '6',
    name: 'chi',
    account: 'chi@rytass.com',
    phone: '091234567',
  },
];

const columns: TableColumn<DataSourceType>[] = [
  {
    title: '姓名',
    render: (source) => source.name,
  },
  {
    title: '帳號',
    width: 200,
    render: (source) => source.account,
  },
  {
    title: '手機',
    width: 200,
    align: 'center',
    render: (source) => source.phone,
  },
];

export const Default: Story = {
  args: {
    dataSource,
    columns,
    loading: false,
    pagination: {
      current: 1,
      total: dataSource.length,
      onChange: action('onChange'),
      options: {
        pageSize: 4,
      },
    },
  },
  parameters: {
    controls: { include: ['loading', 'pagination'] },
  },
  render: function Render(args) {
    return <AdminTable {...args} />;
  },
};

export const WithFilters: Story = {
  args: {
    dataSource,
    columns,
    filtersComponent: (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: 16,
        }}
      >
        <div>filter1</div>
        <div>filter2</div>
        <div>filter3</div>
      </div>
    ),
  },
  parameters: {
    controls: { include: [] },
  },
  render: function Render(args) {
    return <AdminTable {...args} />;
  },
};

export const WithTab: Story = {
  args: {
    dataSource,
    columns,
    activeTabId: 'tabA',
    onTabChange: action('onTabChange'),
    tabs: [
      {
        id: 'tabA',
        name: 'tabA',
      },
      {
        id: 'tabB',
        name: 'tabB',
      },
      {
        id: 'tabC',
        name: 'tabC',
      },
    ],
  },
  parameters: {
    controls: { include: ['activeTabId'] },
  },
  render: function Render(args) {
    return <AdminTable {...args} />;
  },
};

export const WithBoth: Story = {
  args: {
    dataSource,
    columns,
    filtersComponent: (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: 16,
        }}
      >
        <div>filter1</div>
        <div>filter2</div>
        <div>filter3</div>
      </div>
    ),
    activeTabId: 'tabA',
    onTabChange: action('onTabChange'),
    tabs: [
      {
        id: 'tabA',
        name: 'tabA',
      },
      {
        id: 'tabB',
        name: 'tabB',
      },
      {
        id: 'tabC',
        name: 'tabC',
      },
    ],
  },
  parameters: {
    controls: { include: ['activeTabId'] },
  },
  render: function Render(args) {
    return <AdminTable {...args} />;
  },
};

export const Scroll: Story = {
  args: {
    dataSource,
    columns,
    scroll: {
      y: 280,
    },
  },
  parameters: {
    controls: { include: ['scroll'] },
  },
  render: function Render(args) {
    return <AdminTable {...args} />;
  },
};

export const Draggable: Story = {
  args: {
    dataSource,
    columns,
    draggable: {
      enabled: true,
      onDragEnd: action('onDragEnd'),
    },
  },
  parameters: {
    controls: { include: ['draggable'] },
  },
  render: function Render(args) {
    return <AdminTable {...args} />;
  },
};
