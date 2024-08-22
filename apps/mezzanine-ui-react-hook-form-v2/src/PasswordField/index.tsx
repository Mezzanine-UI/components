import { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@mezzanine-ui/icons';
import { Icon, Typography } from '@mezzanine-ui/react';
import { InputField, InputFieldProps } from '../InputField';
import { HookFormFieldComponent, HookFormFieldProps } from '../typing';
import { FieldValues } from 'react-hook-form';
import classes from './index.module.scss';

export type PassWordFieldProps = HookFormFieldProps<
  FieldValues,
  Omit<InputFieldProps, 'clearable'>,
  {
    remarkText?: string;
  }
>;

export const PasswordField: HookFormFieldComponent<PassWordFieldProps> = ({
  register,
  remark,
  remarkText,
  ...props
}) => {
  const [passwordMasking, setPasswordMasking] = useState(true);

  const renderRemark =
    remark ??
    (!remarkText ? null : (
      <Typography color="text-secondary" variant="caption">
        {remarkText}
      </Typography>
    ));

  const renderSuffix = (
    <Icon
      onClick={() => setPasswordMasking((prev) => !prev)}
      className={classes.icon}
      icon={passwordMasking ? EyeSlashIcon : EyeIcon}
    />
  );

  return (
    <InputField
      {...props}
      clearable={false}
      type={passwordMasking ? 'password' : undefined}
      suffix={renderSuffix}
      remark={renderRemark}
    />
  );
};
