import { Key, ReactNode, useMemo } from 'react';
import { compact } from 'lodash';
import { Table, Tabs, TabPane, Tab } from '@mezzanine-ui/react';
import {
  TableColumn,
  TableDataSourceWithID,
  TablePagination,
  TableDraggable,
  TableScrolling,
} from '@mezzanine-ui/core/table';
import { DropdownActions, DropdownItemsType } from '../DropdownActions';
import classes from './index.module.scss';

interface AdminTableWithoutTabsProps<T extends TableDataSourceWithID> {
  dataSource: T[];
  columns: TableColumn<T>[];
  scroll?: TableScrolling;
  loading?: boolean;
  pagination?: TablePagination;
  draggable?: TableDraggable;
  actions?: (source: T) => DropdownItemsType;
  actionsDisabled?: (source: T) => boolean;
  className?: string;
  bodyRowClassName?: string;
  // filters
  filtersComponent?: ReactNode;
  // tabs
  activeTabId?: undefined;
  onTabChange?: undefined;
  tabs?: undefined;
}

interface AdminTableWithTabsProps<T extends TableDataSourceWithID> {
  dataSource: T[];
  columns: TableColumn<T>[];
  scroll?: TableScrolling;
  loading?: boolean;
  pagination?: TablePagination;
  draggable?: TableDraggable;
  actions?: (source: T) => DropdownItemsType;
  actionsDisabled?: (source: T) => boolean;
  className?: string;
  bodyRowClassName?: string;
  // filters
  filtersComponent?: ReactNode;
  // tabs
  activeTabId: Key;
  onTabChange: (tabId: Key) => void;
  tabs: { id: Key; name: string }[];
}

export type AdminTableProps<T extends TableDataSourceWithID> =
  | AdminTableWithTabsProps<T>
  | AdminTableWithoutTabsProps<T>;

/**
 * 後台 Table 元件，包含自定義 filters 與 tabs
 */
export const AdminTable = <T extends TableDataSourceWithID>({
  dataSource,
  columns: columnsProps,
  scroll,
  loading,
  pagination,
  draggable,
  actions,
  actionsDisabled,
  className,
  bodyRowClassName,
  // filters
  filtersComponent,
  // tabs
  activeTabId,
  onTabChange,
  tabs,
}: AdminTableProps<T>): JSX.Element => {
  const columns = useMemo(
    (): TableColumn<T>[] =>
      compact([
        ...columnsProps,
        actions && {
          title: '',
          width: 82,
          align: 'end',
          render: (source) => (
            <DropdownActions
              disabled={actionsDisabled?.(source)}
              items={actions(source)}
            />
          ),
        },
      ]),
    [columnsProps, actions, actionsDisabled],
  );

  return (
    <div className={classes.root}>
      {tabs && tabs.length > 0 && (
        <Tabs
          activeKey={activeTabId}
          tabBarClassName={classes.tabBar}
          onChange={onTabChange}
        >
          {tabs.map((tab) => {
            return (
              <TabPane
                key={tab.id}
                className={classes.tabPane}
                tab={<Tab>{tab.name}</Tab>}
              />
            );
          })}
        </Tabs>
      )}
      {filtersComponent}
      <Table
        className={className}
        bodyRowClassName={bodyRowClassName}
        columns={columns}
        dataSource={dataSource}
        scroll={scroll}
        loading={loading}
        pagination={pagination}
        draggable={draggable}
      />
    </div>
  );
};
