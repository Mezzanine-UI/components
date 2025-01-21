import { FC, ReactNode } from 'react';
import classes from './index.module.scss';

/**
 * 未登入頁面佈局
 */
export const UnauthorizedAdminPageWrapper: FC<{ children?: ReactNode }> = ({
  children,
}) => {
  return (
    <div className={classes.host}>
      <div className={classes.unauthorizedPageWrapper}>{children}</div>
    </div>
  );
};
