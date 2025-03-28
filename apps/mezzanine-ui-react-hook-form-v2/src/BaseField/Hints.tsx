import { FC } from 'react';
import { Icon, Typography } from '@mezzanine-ui/react';
import {
  InfoCircleFilledIcon,
  CheckCircleFilledIcon,
  ExclamationCircleFilledIcon,
  TimesCircleFilledIcon,
} from '@mezzanine-ui/icons';
import { Severity } from '@mezzanine-ui/system/severity';
import classes from './index.module.scss';

interface HintsProps {
  hints: string[] | { severity: Severity | 'info'; text: string }[];
}

const hintIcons = {
  info: InfoCircleFilledIcon,
  success: CheckCircleFilledIcon,
  warning: ExclamationCircleFilledIcon,
  error: TimesCircleFilledIcon,
} as const;

const hintIconColors = {
  info: 'primary',
  success: 'success',
  warning: 'warning',
  error: 'error',
} as const;

const hintTextColors = {
  info: 'text-secondary',
  success: 'success',
  warning: 'warning',
  error: 'error',
} as const;

const Hints: FC<HintsProps> = ({ hints }) => {
  return (
    <div className={classes.hintsWrapper}>
      {hints.map((hint) => {
        if (typeof hint === 'string') {
          return (
            <div key={hint} className={classes.hintWrapper}>
              <Icon
                icon={hintIcons['info']}
                size={16}
                color={hintIconColors['info']}
              />
              <Typography variant="caption" color={hintTextColors['info']}>
                {hint}
              </Typography>
            </div>
          );
        }

        return (
          <div key={hint.text} className={classes.hintWrapper}>
            <Icon
              icon={hintIcons[hint.severity]}
              size={16}
              color={hintIconColors[hint.severity]}
            />
            <Typography variant="caption" color={hintTextColors[hint.severity]}>
              {hint.text}
            </Typography>
          </div>
        );
      })}
    </div>
  );
};

export default Hints;
