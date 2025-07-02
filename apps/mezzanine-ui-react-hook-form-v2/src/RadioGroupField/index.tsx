import { ChangeEventHandler, useCallback } from 'react';
import { RadioGroup, RadioGroupProps, cx } from '@mezzanine-ui/react';
import { FieldValues, useWatch, useFormContext } from 'react-hook-form';
import { BaseField } from '../BaseField';
import { HookFormFieldComponent, HookFormFieldProps } from '../typing';
import classes from './index.module.scss';

export type RadioGroupFieldProps<T extends FieldValues = FieldValues> =
  HookFormFieldProps<
    T,
    RadioGroupProps,
    {
      groupClassName?: string;
    }
  >;

export const RadioGroupField: HookFormFieldComponent<RadioGroupFieldProps> = ({
  label,
  required,
  defaultValue,
  disabled,
  children,
  orientation,
  registerName,
  size,
  className,
  groupClassName,
  horizontal,
  hints,
}) => {
  const { setValue } = useFormContext();

  const watchValue = useWatch({
    name: registerName,
    defaultValue,
  });

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => setValue(registerName, e.target.value, { shouldDirty: true }),
    [registerName, setValue],
  );

  return (
    <BaseField
      disabled={disabled}
      label={label}
      className={className}
      name={registerName}
      required={required}
      horizontal={horizontal}
      hints={hints}
    >
      <RadioGroup
        defaultValue={defaultValue}
        disabled={disabled}
        onChange={onChange}
        orientation={orientation}
        className={cx(
          classes.radioGroup,
          groupClassName,
          'mzn-rhf-radio-group',
        )}
        size={size}
        value={watchValue}
      >
        {children}
      </RadioGroup>
    </BaseField>
  );
};
