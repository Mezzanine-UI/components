import { useCallback, useMemo, useEffect } from 'react';
import { Icon, IconButton, Input, cx } from '@mezzanine-ui/react';
import { PlusIcon, MinusIcon } from '@mezzanine-ui/icons';
import { FieldValues, useFormContext, useWatch } from 'react-hook-form';
import { BaseField } from '../BaseField';
import { HookFormFieldComponent, HookFormFieldProps } from '../typing';
import classes from './index.module.scss';

export type NumberInputFieldProps<T extends FieldValues = FieldValues> =
  HookFormFieldProps<
    T,
    {
      maxValue?: number;
      minValue?: number;
      width?: number;
      counterClassName?: string;
      inputClassName?: string;
    }
  >;

export const NumberInputField: HookFormFieldComponent<
  NumberInputFieldProps
> = ({
  className,
  counterClassName,
  inputClassName,
  control,
  maxValue,
  minValue,
  disabled,
  disabledErrMsg,
  width,
  label,
  registerName,
  required,
  style,
  errorMsgRender,
  horizontal,
  hints,
}) => {
  const { control: contextControl, setValue } = useFormContext();

  const watchValue = useWatch({
    control: control || contextControl,
    name: registerName,
  });

  const numberValue = useMemo(
    () => (isNaN(Number(watchValue)) ? 0 : Number(watchValue)),
    [watchValue],
  );

  const isMax = useMemo(
    () => typeof maxValue === 'number' && numberValue >= maxValue,
    [maxValue, numberValue],
  );

  const isMin = useMemo(
    () => typeof minValue === 'number' && numberValue <= minValue,
    [minValue, numberValue],
  );

  const onPlus = useCallback(() => {
    if (!isMax) {
      setValue(registerName, numberValue + 1, {
        shouldDirty: true,
      });
    }
  }, [isMax, numberValue, registerName, setValue]);

  const onMinus = useCallback(() => {
    if (!isMin) {
      setValue(registerName, numberValue - 1, {
        shouldDirty: true,
      });
    }
  }, [isMin, numberValue, registerName, setValue]);

  useEffect(() => {
    if (isMax) {
      setValue(registerName, maxValue, {
        shouldDirty: true,
      });
    } else if (isMin) {
      setValue(registerName, minValue, {
        shouldDirty: true,
      });
    }
  }, [isMax, isMin, maxValue, minValue, registerName, setValue]);

  return (
    <BaseField
      className={cx(classes.host, width && classes.specifiedWidth, className)}
      name={registerName}
      disabledErrMsg={disabledErrMsg}
      style={style}
      required={required}
      disabled={disabled}
      label={label}
      width={width}
      errorMsgRender={errorMsgRender}
      horizontal={horizontal}
      hints={hints}
    >
      <div className={cx(classes.counterWrapper, counterClassName)}>
        <IconButton
          type="button"
          size="large"
          color="secondary"
          onClick={onMinus}
          disabled={isMin || disabled}
          className={classes.actionButton}
        >
          <Icon icon={MinusIcon} />
        </IconButton>
        <Input
          value={`${numberValue}`}
          size="large"
          inputProps={{ type: 'number' }}
          className={cx(classes.counterInput, inputClassName)}
          onChange={(e) => {
            setValue(registerName, Number(e.target.value), {
              shouldDirty: true,
            });
          }}
        />
        <IconButton
          type="button"
          size="large"
          color="secondary"
          onClick={onPlus}
          disabled={isMax || disabled}
          className={classes.actionButton}
        >
          <Icon icon={PlusIcon} />
        </IconButton>
      </div>
    </BaseField>
  );
};
