import { FC, ReactNode, useMemo } from 'react';
import { Typography, TypographyColor, Icon } from '@mezzanine-ui/react';
import {
  InfoCircleFilledIcon,
  TimesCircleFilledIcon,
  CheckCircleFilledIcon,
} from '@mezzanine-ui/icons';
import { generatePasswordRegRxp } from '../utils/validation';
import classes from './index.module.scss';

interface PasswordHintProps {
  /**
   * 密碼值，若不符合規則會變為紅色文字
   */
  passwordValue: string;
  /**
   * 密碼至少需要的長度
   */
  passwordLength?: number;
  /**
   * 密碼不可與前 `number` 代重複
   */
  generationLimit?: number;
  /**
   * 是否顯示 `generationLimit`
   */
  showGenerationLimitHint?: boolean;
}

/**
 * 密碼規則提示，必須要有 `passwordLength` 個字，且包含至少一個大寫字母、小寫字母、數字、符號
 */
export const PasswordHint: FC<PasswordHintProps> = ({
  passwordValue,
  passwordLength,
  generationLimit,
  showGenerationLimitHint = false,
}) => {
  const ruleRegExp = useMemo(
    () => (passwordLength ? generatePasswordRegRxp(passwordLength) : null),
    [passwordLength],
  );

  const color = useMemo((): TypographyColor => {
    if (!passwordValue || !ruleRegExp) {
      return 'text-secondary';
    }

    if (ruleRegExp.test(passwordValue)) {
      return 'success';
    }

    return 'error';
  }, [passwordValue, ruleRegExp]);

  const icon = useMemo((): ReactNode => {
    if (!passwordValue || !ruleRegExp) {
      return <Icon icon={InfoCircleFilledIcon} size={16} color="primary" />;
    }

    if (ruleRegExp.test(passwordValue)) {
      return <Icon icon={CheckCircleFilledIcon} size={16} color="success" />;
    }

    return <Icon icon={TimesCircleFilledIcon} size={16} color="error" />;
  }, [passwordValue, ruleRegExp]);

  return (
    <div className={classes.root}>
      {!!passwordLength && (
        <div className={classes.hintWrapper}>
          {icon}
          <Typography variant="caption" color={color}>
            {`至少 ${passwordLength} 位元、大寫字母、小寫字母、數字、符號`}
          </Typography>
        </div>
      )}
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
