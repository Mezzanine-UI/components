import { useCallback, useState, useMemo, FC } from 'react';
import { get } from 'lodash';
import { UploadButton, Message, UploadResult, cx } from '@mezzanine-ui/react';
import { FieldValues, useFieldArray, useFormContext } from 'react-hook-form';
import { BaseField } from '../BaseField';
import { UploadFileFieldValues } from './typing';
import classes from './index.module.scss';
import { HookFormFieldProps } from '../typing';

export type UploadFileFieldProps<T extends FieldValues = FieldValues> =
  HookFormFieldProps<
    T,
    object,
    {
      setFileUrl: (fileId: string) => string;
      buttonText?: string;
      width?: number;
      multiple?: boolean;
      accept?: string;
      limit?: number;
      upload: (file: File) => Promise<{ id: string }>;
    }
  >;

export const UploadFileField: FC<UploadFileFieldProps> = ({
  registerName,
  accept,
  buttonText = '新增檔案',
  className,
  disabledErrMsg,
  setFileUrl,
  width,
  style,
  remark,
  label,
  required = false,
  multiple = false,
  errorMsgRender,
  horizontal,
  hints,
  limit = 5,
  upload,
  disabled = false,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: registerName,
  });

  const isError = useMemo(
    () => get(errors, registerName),
    [errors, registerName],
  );

  const MAX_SIZE = useMemo(() => limit * 1024 * 1024, [limit]); // limit MB

  const onUpload = useCallback(
    async (files: File[]) => {
      await files
        .filter((f) => f.size > MAX_SIZE)
        .reduce((promiseChain, f) => {
          return promiseChain.then(
            () =>
              new Promise((resolve) => {
                setTimeout(() => {
                  Message.error(
                    `${f.name} 上傳失敗 (檔案大小超過 ${limit} MB)`,
                  );
                  resolve();
                }, 10);
              }),
          );
        }, Promise.resolve());

      const targetFiles = files.filter((f) => f.size <= MAX_SIZE);

      targetFiles.forEach(async (f) => {
        try {
          setLoading(true);
          const { id } = await upload(f);

          const fileFormValue: UploadFileFieldValues = {
            fileId: id,
            fileName: f.name,
          };

          append(fileFormValue);
          setLoading(false);
        } catch (error) {
          Message.error(`${f.name} 上傳失敗（檔案格式錯誤）`);
        }
      });
    },
    [MAX_SIZE, limit, upload, append],
  );

  return (
    <BaseField
      className={cx(classes.host, width && classes.specifiedWidth, className)}
      name={registerName}
      disabledErrMsg={disabledErrMsg}
      style={style}
      required={required}
      remark={remark}
      disabled={disabled}
      label={label}
      width={width}
      errorMsgRender={errorMsgRender}
      horizontal={horizontal}
      hints={hints}
    >
      <div className={classes.fieldWrapper}>
        {fields.map((f, index) => {
          const field = f as Record<'id', string> & UploadFileFieldValues;

          return (
            <UploadResult
              key={field.id}
              status="done"
              size="large"
              name={field.fileName}
              onDownload={() => {
                window.open(setFileUrl(field.fileId), '_blank');
              }}
              onDelete={() => {
                remove(index);
              }}
            />
          );
        })}
        <UploadButton
          type="button"
          size="large"
          variant="outlined"
          className={classes.uploadButton}
          multiple={multiple}
          danger={!!isError}
          accept={accept}
          onUpload={onUpload}
          loading={loading}
          disabled={disabled}
        >
          {buttonText}
        </UploadButton>
      </div>
    </BaseField>
  );
};
