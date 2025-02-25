import { FC } from 'react';
import { cx } from '@mezzanine-ui/react';
import classes from './index.module.scss';

export interface DividerProps {
  /**
   * 如果為 true，則沒有上下 margin
   */
  isPure?: boolean;
}

/**
 * 分隔線
 */
export const Divider: FC<DividerProps> = ({ isPure = false }) => {
  return (
    <div
      className={cx(classes.host, {
        [classes.isPure]: isPure,
      })}
    />
  );
};
