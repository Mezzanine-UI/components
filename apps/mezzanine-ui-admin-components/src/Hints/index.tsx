import { CSSProperties, FC, useMemo } from 'react';
import { Information } from '../Information';
import classes from './index.module.scss';

export interface HintsProps {
  /**
   * 文字條列
   */
  hints: string[];
  /**
   * 提示之間間距
   */
  gap?: number;
}

/**
 * 縱列提示文字
 */
export const Hints: FC<HintsProps> = ({ hints, gap = 4 }) => {
  const layoutStyleVar = useMemo(
    () =>
      ({
        '--hints-gap': `${gap}px`,
      }) as CSSProperties,
    [gap],
  );

  return (
    <div className={classes.hints} style={layoutStyleVar}>
      {hints.map((h, index) => (
        <Information key={index} text={h} />
      ))}
    </div>
  );
};
