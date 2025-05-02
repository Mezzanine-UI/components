import { CSSProperties } from 'react';
import { Textarea, TextareaProps, cx } from '@mezzanine-ui/react';
import {
  FieldValues,
  useFormContext,
  useFormState,
  useWatch,
} from 'react-hook-form';
import { BaseField } from '../BaseField';
import { HookFormFieldComponent, HookFormFieldProps } from '../typing';
import classes from './index.module.scss';

export type TextAreaFieldProps = HookFormFieldProps<
  FieldValues,
  TextareaProps,
  {
    width?: number;
    height?: number;
    inputClassName?: string;
  }
>;

export const TextAreaField: HookFormFieldComponent<TextAreaFieldProps> = ({
  autoComplete,
  className,
  inputClassName,
  clearable,
  control,
  defaultValue,
  disabled,
  width,
  height = 80,
  label,
  maxLength,
  minLength,
  name,
  placeholder = '輸入文字…',
  register,
  registerName,
  required,
  remark,
  disabledErrMsg,
  errorMsgRender,
  onChange: onChangeProp,
  horizontal,
  hints,
  ...props
}) => {
  const { control: contextControl, setValue, trigger } = useFormContext();

  const watchValue = useWatch({
    control: control || contextControl,
    name: registerName,
    defaultValue,
  });

  const { errors } = useFormState({ control: control || contextControl });

  const onChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    onChangeProp?.(e);

    if (e.type === 'change') {
      setValue(registerName, e.target.value, { shouldDirty: true });

      // eslint-disable-next-line no-underscore-dangle
      if (contextControl._options.mode === 'onChange') trigger(registerName);
    } else {
      setValue(registerName, '');
    }
  };

  return (
    <BaseField
      disabled={disabled}
      style={
        {
          '--height': `${height}px`,
        } as CSSProperties
      }
      label={label || name}
      name={registerName}
      errors={errors}
      remark={remark}
      required={required}
      className={cx(classes.host, width && classes.specifiedWidth, className)}
      width={width}
      disabledErrMsg={disabledErrMsg}
      errorMsgRender={errorMsgRender}
      horizontal={horizontal}
      hints={hints}
    >
      <Textarea
        {...props}
        fullWidth
        clearable={clearable}
        maxLength={maxLength}
        textareaProps={{
          autoComplete,
          id: registerName,
          name: registerName,
        }}
        className={cx(classes.input, inputClassName)}
        onChange={onChange}
        placeholder={placeholder}
        value={watchValue || ''}
      />
    </BaseField>
  );
};
