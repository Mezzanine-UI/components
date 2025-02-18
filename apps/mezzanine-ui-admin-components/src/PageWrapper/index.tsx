import { FC, ReactNode } from 'react';
import { Typography, Button, Icon, cx } from '@mezzanine-ui/react';
import { PlusIcon } from '@mezzanine-ui/icons';
import classes from './index.module.scss';

interface PageWrapperProps {
  children: ReactNode;
  /**
   * 大標題
   */
  title?: string;
  /**
   * 是否為表單頁面，若為 true，頁面下方 padding 會更大
   */
  isFormPage?: boolean;
  /**
   * 自定義元件
   */
  customizeActionComponent?: ReactNode;
  /**
   * 新增按鈕點擊時觸發
   */
  onCreate?: VoidFunction;
  /**
   * 新增按鈕是否 disabled
   */
  createButtonDisabled?: boolean;
  /**
   * 新增按鈕名稱
   */
  createText?: string;
}

export const PageWrapper: FC<PageWrapperProps> = ({
  children,
  title,
  isFormPage = false,
  customizeActionComponent,
  onCreate,
  createButtonDisabled,
  createText,
}) => {
  return (
    <div
      className={cx(classes.root, {
        [classes.isFormPage]: isFormPage,
      })}
    >
      <div className={classes.titleWrapper}>
        <Typography variant="h1" color="text-primary">
          {title}
        </Typography>
        <div className={classes.actionsWrapper}>
          {customizeActionComponent}
          {onCreate && (
            <Button
              type="button"
              variant="contained"
              size="large"
              onClick={onCreate}
              prefix={<Icon icon={PlusIcon} />}
              disabled={createButtonDisabled}
            >
              {createText}
            </Button>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};
