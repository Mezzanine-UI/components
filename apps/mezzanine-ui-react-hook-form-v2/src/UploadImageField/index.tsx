import { CSSProperties, useCallback, useMemo } from 'react';
import {
  UploadPicture,
  UploadPictureProps,
  Message,
  cx,
} from '@mezzanine-ui/react';
import {
  useWatch,
  useFormState,
  useFormContext,
  FieldValues,
} from 'react-hook-form';
import { BaseField } from '../BaseField';
import { HookFormFieldComponent, HookFormFieldProps } from '../typing';
import classes from './index.module.scss';

export type UploadImageFieldProps<T extends FieldValues = FieldValues> =
  HookFormFieldProps<
    T,
    UploadPictureProps,
    {
      fileHost: string;
      fieldClassName?: string;
      width?: number;
      height?: number;
      objectFit?: 'contain' | 'cover';
      limit?: number;
      upload: (file: File) => Promise<{ id: string }>;
    }
  >;

export const UploadImageField: HookFormFieldComponent<
  UploadImageFieldProps
> = ({
  accept = '.jpg, .jpeg, .png',
  className,
  fieldClassName,
  control,
  defaultValue,
  disabled,
  disabledErrMsg,
  label,
  fileHost,
  width,
  height,
  objectFit = 'cover',
  name,
  registerName,
  remark,
  required,
  style,
  limit = 3,
  upload,
}) => {
  const styleVar = {
    '--object-fit': objectFit,
    ...style,
  } as CSSProperties;

  const { control: contextControl, setValue } = useFormContext();

  const watchValue = useWatch({
    control: control || contextControl,
    name: registerName as string,
    defaultValue,
  });

  const { errors } = useFormState({ control: control || contextControl });

  const onClear = useCallback(() => {
    setValue(registerName, '', { shouldDirty: true });
  }, [registerName, setValue]);

  const MAX_SIZE = useMemo(() => limit * 1024 * 1024, [limit]); // limit MB

  const onUpload = useCallback(
    async (file: File) => {
      if (file.size > MAX_SIZE) {
        Message.error(`${file.name} 上傳失敗 (檔案大小超過 ${limit} MB)`);
        throw new Error(`${file.name} 上傳失敗 (檔案大小超過 ${limit} MB)`);
      }

      return upload(file)
        .then((d) => {
          setValue(registerName, d.id, { shouldDirty: true });
          return `${fileHost}/${d.id}`;
        })
        .catch(() => {
          Message.error('上傳失敗');
          throw new Error('上傳失敗');
        });
    },
    [MAX_SIZE, upload, limit, setValue, registerName, fileHost],
  );

  return (
    <BaseField
      className={cx(classes.host, className)}
      fieldClassName={fieldClassName}
      name={registerName}
      disabledErrMsg={disabledErrMsg}
      errors={errors}
      style={style}
      required={required}
      remark={remark}
      disabled={disabled}
      label={name || label}
    >
      <UploadPicture
        className={classes.uploadPicture}
        accept={accept}
        onUpload={onUpload}
        onDelete={onClear}
        onUploadSuccess={() => {
          Message.success('成功新增圖片');
        }}
        style={{
          width,
          height,
          ...styleVar,
        }}
        disabled={disabled}
        defaultValue={watchValue ? `${fileHost}/${watchValue}` : undefined}
      />
    </BaseField>
  );
};
