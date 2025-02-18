import { FC, ReactNode } from 'react';
import classes from './index.module.scss';

export interface UnauthorizedAdminPageWrapperProps {
  children?: ReactNode;
}

/**
 * 未登入頁面佈局
 */
export const UnauthorizedAdminPageWrapper: FC<
  UnauthorizedAdminPageWrapperProps
> = ({ children }) => {
  return (
    <div className={classes.host}>
      <div className={classes.unauthorizedPageWrapper}>{children}</div>
    </div>
  );
};
