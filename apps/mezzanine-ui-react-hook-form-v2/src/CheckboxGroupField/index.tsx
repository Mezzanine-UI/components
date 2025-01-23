import {
  CheckboxGroup,
  CheckboxGroupOption,
  CheckboxGroupProps,
  cx,
} from '@mezzanine-ui/react';
import { Orientation } from '@mezzanine-ui/system/orientation';
import {
  FieldValues,
  useFormContext,
  useFormState,
  useWatch,
} from 'react-hook-form';
import classes from './index.module.scss';
import { HookFormFieldComponent, HookFormFieldProps } from '../typing';
import { BaseField } from '../BaseField';

export type CheckboxGroupFieldProps = HookFormFieldProps<
  FieldValues,
  Omit<CheckboxGroupProps, 'defaultValue'>,
  {
    options: CheckboxGroupOption[];
    orientation: Orientation;
    defaultValue?: string[];
    fieldClassName?: string;
    width?: number;
  }
>;

export const CheckboxGroupField: HookFormFieldComponent<
  CheckboxGroupFieldProps
> = ({
  className,
  fieldClassName,
  control,
  defaultValue,
  disabled,
  label,
  options,
  width,
  fullWidth,
  orientation,
  registerName,
  remark,
  style,
  disabledErrMsg,
  errorMsgRender,
  onChange: onChangeProp,
  required,
  horizontal,
  hints,
  ...props
}) => {
  const { control: contextControl, setValue, clearErrors } = useFormContext();

  const watchValue = useWatch({ name: registerName, defaultValue });

  const { errors } = useFormState({ control: control || contextControl });

  const onChange: (
    value: string[],
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void = (newValues, e) => {
    if (errors?.[registerName]) clearErrors(registerName);
    setValue(registerName, newValues, { shouldValidate: true });
    onChangeProp?.(newValues, e);
  };

  return (
    <BaseField
      disabled={disabled}
      errors={errors}
      label={label}
      required={required}
      remark={remark}
      name={registerName}
      style={style}
      className={className}
      width={width}
      fullWidth={fullWidth}
      disabledErrMsg={disabledErrMsg}
      errorMsgRender={errorMsgRender}
      horizontal={horizontal}
      hints={hints}
    >
      <CheckboxGroup
        {...props}
        orientation={orientation}
        options={options}
        defaultValue={defaultValue}
        className={cx(classes.host, fieldClassName)}
        value={watchValue}
        onChange={onChange}
      />
    </BaseField>
  );
};
