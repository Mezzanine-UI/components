import { useEffect } from 'react';
import { FieldValues, useFormContext } from 'react-hook-form';
import { HookFormFieldComponent, HookFormFieldProps } from '../typing';

export type DefaultValueFieldProps = HookFormFieldProps<
  FieldValues,
  {
    defaultValue: any;
  }
>;

export const DefaultValueField: HookFormFieldComponent<
  DefaultValueFieldProps
> = ({ defaultValue, registerName }) => {
  const { setValue } = useFormContext();

  useEffect(() => {
    setValue(registerName, defaultValue, {
      shouldDirty: false,
      shouldTouch: false,
      shouldValidate: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
