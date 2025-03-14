import { Key, ReactNode, useMemo } from 'react';
import { compact } from 'lodash';
import { cx, Table, Tabs, TabPane, Tab, EmptyProps } from '@mezzanine-ui/react';
import {
  TableColumn,
  TableDataSourceWithID,
  TablePagination,
  TableDraggable,
  TableScrolling,
} from '@mezzanine-ui/core/table';
import { DropdownActions, DropdownItemsType } from '../DropdownActions';
import classes from './index.module.scss';

export type AdminTableProps<T extends TableDataSourceWithID> = {
  /**
   * 資料陣列
   */
  dataSource: T[];
  /**
   * Table 欄位設定
   */
  columns: TableColumn<T>[];
  /**
   * Table 滾動設定
   */
  scroll?: TableScrolling;
  /**
   * 自定義 Table Scroll 區 class
   */
  scrollContainerClassName?: string;
  /**
   * 若為 true，則顯示讀取狀態畫面
   */
  loading?: boolean;
  /**
   * Table 分頁設定
   */
  pagination?: TablePagination;
  /**
   * Table 拖拉功能設定
   */
  draggable?: TableDraggable;
  /**
   * Table Row 下拉選單設定
   */
  actions?: (source: T) => DropdownItemsType;
  /**
   * 下拉選單是否 disabled
   */
  actionsDisabled?: (source: T) => boolean;
  /**
   * 自定義 Table Header class
   */
  headerClassName?: string;
  /**
   * 自定義 Table class
   */
  className?: string;
  /**
   * 自定義 Table Body class
   */
  bodyClassName?: string;
  /**
   * 自定義 Table Body Row class
   */
  bodyRowClassName?: string;
  /**
   * 自定義 Table Placeholder
   */
  emptyProps?: EmptyProps;
  /**
   * 是否交換 tab 跟 filters 位置，預設：`tab 上; filters 下`
   */
  exchangeTabAndFilters?: boolean;
  /**
   * 自定義顯示 filters 元件
   */
  filtersComponent?: ReactNode;
  /**
   * 自定義 tabs
   */
  tabs?: { id: Key; name: string }[];
  /**
   * 當前激活狀態的 tab id
   */
  activeTabId?: Key;
  /**
   * 切換 tab 時觸發
   */
  onTabChange?: (tabId: Key) => void;
};

/**
 * 後台 Table 元件，包含自定義 filters 與 tabs
 */
export const AdminTable = <T extends TableDataSourceWithID>({
  dataSource,
  columns: columnsProps,
  scroll,
  scrollContainerClassName,
  loading,
  pagination,
  draggable,
  actions,
  actionsDisabled,
  headerClassName,
  className,
  bodyClassName,
  bodyRowClassName,
  emptyProps,
  exchangeTabAndFilters = false,
  // filters
  filtersComponent,
  // tabs
  tabs,
  activeTabId,
  onTabChange,
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
      {((tabs && tabs.length > 0) || !!filtersComponent) && (
        <div
          className={cx(classes.tabAndFiltersWrapper, {
            [classes.exchangeTabAndFilters]: exchangeTabAndFilters,
          })}
        >
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
        </div>
      )}
      <Table
        headerClassName={headerClassName}
        className={className}
        bodyClassName={bodyClassName}
        bodyRowClassName={bodyRowClassName}
        columns={columns}
        dataSource={dataSource}
        scroll={scroll}
        scrollContainerClassName={scrollContainerClassName}
        loading={loading}
        pagination={pagination}
        draggable={draggable}
        emptyProps={emptyProps}
      />
    </div>
  );
};
