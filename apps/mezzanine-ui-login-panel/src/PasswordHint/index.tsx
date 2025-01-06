import { FC, ReactNode, useMemo } from 'react';
import { Typography, TypographyColor, Icon } from '@mezzanine-ui/react';
import {
  InfoCircleFilledIcon,
  TimesCircleFilledIcon,
  CheckCircleFilledIcon,
} from '@mezzanine-ui/icons';
import { generatePasswordRegRxp } from '../utils/validation';
import classes from './index.module.scss';

interface PasswordHintWithLimitProps {
  passwordValue: string;
  passwordLength: number;
  generationLimit: number;
  showGenerationLimitHint: boolean;
}

interface PasswordHintWithoutLimitProps {
  passwordValue: string;
  passwordLength: number;
  generationLimit?: undefined;
  showGenerationLimitHint?: false;
}

type PasswordHintProps =
  | PasswordHintWithLimitProps
  | PasswordHintWithoutLimitProps;

export const PasswordHint: FC<PasswordHintProps> = ({
  passwordValue,
  passwordLength,
  generationLimit,
  showGenerationLimitHint = false,
}) => {
  const ruleRegExp = useMemo(
    () => generatePasswordRegRxp(passwordLength),
    [passwordLength],
  );

  const color = useMemo((): TypographyColor => {
    if (!passwordValue) {
      return 'text-secondary';
    }

    if (ruleRegExp.test(passwordValue)) {
      return 'success';
    }

    return 'error';
  }, [passwordValue, ruleRegExp]);

  const icon = useMemo((): ReactNode => {
    if (!passwordValue) {
      return <Icon icon={InfoCircleFilledIcon} size={16} color="primary" />;
    }

    if (ruleRegExp.test(passwordValue)) {
      return <Icon icon={CheckCircleFilledIcon} size={16} color="success" />;
    }

    return <Icon icon={TimesCircleFilledIcon} size={16} color="error" />;
  }, [passwordValue, ruleRegExp]);

  return (
    <div className={classes.root}>
      <div className={classes.hintWrapper}>
        {icon}
        <Typography variant="caption" color={color}>
          {`至少 ${passwordLength} 位元、大寫字母、小寫字母、數字、符號`}
        </Typography>
      </div>
      {showGenerationLimitHint && (
        <div className={classes.hintWrapper}>
          <Icon icon={InfoCircleFilledIcon} size={16} color="primary" />
          <Typography variant="caption" color="text-secondary">
            {`不得使用前${generationLimit}次使用過的密碼`}
          </Typography>
        </div>
      )}
    </div>
  );
};
