import { FC, useMemo } from 'react';
import { Typography, Icon, TypographyColor, cx } from '@mezzanine-ui/react';
import {
  InfoCircleFilledIcon,
  CheckCircleFilledIcon,
  ExclamationCircleFilledIcon,
  TimesCircleFilledIcon,
} from '@mezzanine-ui/icons';
import classes from './index.module.scss';

interface InformationProps {
  /**
   * 資訊模式，icon、顏色會不同
   */
  mode?: 'info' | 'success' | 'warning' | 'error';
  /**
   * 文字
   */
  text: string;
  /**
   * 兩行以上時，icon 是否對齊上方
   */
  alignStart?: boolean;
}

/**
 * 資訊文字
 */
export const Information: FC<InformationProps> = ({
  mode = 'info',
  text,
  alignStart = false,
}) => {
  const iconComponent = useMemo(() => {
    switch (mode) {
      case 'info':
        return <Icon icon={InfoCircleFilledIcon} size={16} color="primary" />;

      case 'success':
        return <Icon icon={CheckCircleFilledIcon} size={16} color="success" />;

      case 'warning':
        return (
          <Icon icon={ExclamationCircleFilledIcon} size={16} color="warning" />
        );

      case 'error':
        return <Icon icon={TimesCircleFilledIcon} size={16} color="error" />;

      default:
        return null;
    }
  }, [mode]);

  const textColor = useMemo((): TypographyColor => {
    switch (mode) {
      case 'info':
        return 'text-secondary';

      case 'success':
        return 'success';

      case 'warning':
        return 'warning';

      case 'error':
        return 'error';

      default:
        return 'text-secondary';
    }
  }, [mode]);

  return (
    <div
      className={cx(classes.host, {
        [classes.alignStart]: alignStart,
      })}
    >
      {iconComponent}
      <Typography variant="caption" color={textColor} className={classes.text}>
        {text}
      </Typography>
    </div>
  );
};

export interface HintsProps {
  hints: string[];
}

export const Hints: FC<HintsProps> = ({ hints }) => {
  return (
    <div className={classes.hints}>
      {hints.map((h, index) => (
        <Information key={index} text={h} />
      ))}
    </div>
  );
};
