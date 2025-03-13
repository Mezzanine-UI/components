import { FC, CSSProperties } from 'react';
import { cx } from '@mezzanine-ui/react';
import classes from './index.module.scss';

export interface DividerProps {
  /**
   * 如果為 true，則沒有上下 margin
   */
  isPure?: boolean;
  /**
   * divider 顏色
   */
  color?:
    | 'divider'
    | 'border'
    | 'primary'
    | 'secondary'
    | 'warning'
    | 'success'
    | 'error';
}

/**
 * 分隔線
 */
export const Divider: FC<DividerProps> = ({
  isPure = false,
  color = 'divider',
}) => {
  const colorStyleVar = {
    '--divider-color': `var(--mzn-color-${color})`,
  } as CSSProperties;

  return (
    <div
      style={colorStyleVar}
      className={cx(classes.host, {
        [classes.isPure]: isPure,
      })}
    />
  );
};
