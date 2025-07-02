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

const DEFAULT_MESSAGES = {
  UPLOAD_FILE_EXCEEDED_LIMIT: (file: File, limit: number) =>
    `${file.name} 上傳失敗 (檔案大小超過 ${limit} MB)`,
  UPLOAD_FAILED: '上傳失敗',
  UPLOAD_SUCCESS: '成功新增圖片',
};

export type UploadImageFieldProps<T extends FieldValues = FieldValues> =
  HookFormFieldProps<
    T,
    UploadPictureProps,
    {
      setFileUrl: (fileId: string) => string;
      fieldClassName?: string;
      width?: number;
      height?: number;
      objectFit?: 'contain' | 'cover';
      limit?: number;
      upload: (file: File) => Promise<{ id: string }>;
      messages?: {
        uploadFileExceededLimit?: (file: File, limit: number) => string;
        uploadFileFailed?: string;
        uploadSuccess?: string;
      };
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
  setFileUrl,
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
  horizontal,
  hints,
  defaultUploadLabel,
  defaultUploadingLabel,
  defaultUploadErrorLabel,
  messages = {
    uploadFileExceededLimit: (file, limit) =>
      DEFAULT_MESSAGES.UPLOAD_FILE_EXCEEDED_LIMIT(file, limit),
    uploadFileFailed: DEFAULT_MESSAGES.UPLOAD_FAILED,
    uploadSuccess: DEFAULT_MESSAGES.UPLOAD_SUCCESS,
  },
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
        const uploadFileExceededLimitMessage = messages?.uploadFileExceededLimit
          ? messages.uploadFileExceededLimit(file, limit)
          : DEFAULT_MESSAGES.UPLOAD_FILE_EXCEEDED_LIMIT(file, limit);

        Message.error(uploadFileExceededLimitMessage);
        throw new Error(uploadFileExceededLimitMessage);
      }

      return upload(file)
        .then((d) => {
          setValue(registerName, d.id, { shouldDirty: true });
          return setFileUrl(d.id);
        })
        .catch(() => {
          const errorMessage = messages?.uploadFileFailed
            ? messages.uploadFileFailed
            : DEFAULT_MESSAGES.UPLOAD_FAILED;

          Message.error(errorMessage);
          throw new Error(errorMessage);
        });
    },
    [MAX_SIZE, upload, limit, setValue, registerName, setFileUrl, messages],
  );

  const onUploadSuccess = useCallback(() => {
    const uploadSuccessMessage = messages?.uploadSuccess
      ? messages.uploadSuccess
      : DEFAULT_MESSAGES.UPLOAD_SUCCESS;

    Message.success(uploadSuccessMessage);
  }, [messages]);

  return (
    <BaseField
      className={cx(classes.host, className, 'mzn-rhf-upload-image-field')}
      fieldClassName={fieldClassName}
      name={registerName}
      disabledErrMsg={disabledErrMsg}
      errors={errors}
      style={style}
      required={required}
      remark={remark}
      disabled={disabled}
      label={name || label}
      horizontal={horizontal}
      hints={hints}
    >
      <UploadPicture
        className={classes.uploadPicture}
        accept={accept}
        onUpload={onUpload}
        onDelete={onClear}
        onUploadSuccess={onUploadSuccess}
        defaultUploadLabel={defaultUploadLabel}
        defaultUploadingLabel={defaultUploadingLabel}
        defaultUploadErrorLabel={defaultUploadErrorLabel}
        style={{
          width,
          height,
          ...styleVar,
        }}
        disabled={disabled}
        defaultValue={watchValue ? setFileUrl(watchValue) : undefined}
      />
    </BaseField>
  );
};
