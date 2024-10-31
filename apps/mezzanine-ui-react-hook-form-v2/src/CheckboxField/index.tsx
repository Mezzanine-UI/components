import { useCallback, ChangeEventHandler } from 'react';
import { Checkbox, Typography } from '@mezzanine-ui/react';
import {
  FieldValues,
  useFormContext,
  useFormState,
  useWatch,
} from 'react-hook-form';
import { HookFormFieldComponent, HookFormFieldProps } from '../typing';
import { BaseField } from '../BaseField';

export type CheckboxFieldProps = HookFormFieldProps<
  FieldValues,
  {
    name: string;
  }
>;

export const CheckboxField: HookFormFieldComponent<CheckboxFieldProps> = ({
  className,
  control,
  disabled,
  label,
  registerName,
  remark,
  required,
  style,
  disabledErrMsg,
  errorMsgRender,
  horizontal,
  hints,
  name,
}) => {
  const { control: contextControl, setValue } = useFormContext();

  const { errors } = useFormState({ control: control || contextControl });

  const value = useWatch({ name: registerName });

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setValue(registerName, e.target.checked, { shouldDirty: true });
    },
    [registerName, setValue],
  );

  return (
    <BaseField
      disabled={disabled}
      errors={errors}
      style={style}
      label={label}
      name={registerName}
      remark={remark}
      required={required}
      className={className}
      disabledErrMsg={disabledErrMsg}
      errorMsgRender={errorMsgRender}
      horizontal={horizontal}
      hints={hints}
    >
      <Checkbox disabled={disabled} checked={value} onChange={onChange}>
        <Typography
          variant="input2"
          color={disabled ? 'text-disabled' : 'text-primary'}
        >
          {name}
        </Typography>
      </Checkbox>
    </BaseField>
  );
};
