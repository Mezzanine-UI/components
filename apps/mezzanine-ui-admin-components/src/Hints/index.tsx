import { FC } from 'react';
import { Information } from '../Information';
import classes from './index.module.scss';

export interface HintsProps {
  /**
   * 文字條列
   */
  hints: string[];
}

/**
 * 縱列提示文字
 */
export const Hints: FC<HintsProps> = ({ hints }) => {
  return (
    <div className={classes.hints}>
      {hints.map((h, index) => (
        <Information key={index} text={h} />
      ))}
    </div>
  );
};
